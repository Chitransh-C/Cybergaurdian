import dotenv from 'dotenv';
dotenv.config();

const base = process.env.VITE_API_URL || 'http://localhost:5000/api';

async function req(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text.slice(0, 200) }; }
  return { status: res.status, body };
}

const health = await req('/health');
console.log('health', health.status, health.body?.database?.success ?? health.body);

const login = await req('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: 'neo@cyberguard.academy', password: 'cybercadet2026' })
});
console.log('login', login.status, !!login.body?.token, login.body?.user?.callsign || login.body?.message);

const mentor = await req('/mentor/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: 'In one short sentence, why do parameterized queries stop SQL injection?',
    moduleTitle: 'SQL Injection',
    taskText: 'Review the secure parameterized implementation',
    taskHint: 'Compare string concat vs prepared statements'
  })
});
console.log('mentor', mentor.status, mentor.body?.source, mentor.body?.model, String(mentor.body?.text || mentor.body?.message || '').slice(0, 160));

if (!health.body?.database?.success || !login.body?.token || !mentor.body?.text) {
  process.exit(1);
}
console.log('API smoke OK');
