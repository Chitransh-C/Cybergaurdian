import dotenv from 'dotenv';
dotenv.config();

const base = process.env.VITE_API_URL || 'http://localhost:5000/api';
const res = await fetch(`${base}/mentor/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Why is chmod 777 dangerous?',
    moduleTitle: 'Filesystem Navigation & Orientation',
    taskText: 'Reveal hidden dotfiles',
    taskHint: 'Use ls -la'
  })
});
const data = await res.json();
console.log('status', res.status);
console.log('source', data.source, data.model);
console.log('text', data.text);
console.log('ends_ok', /[.!?)]$/.test(String(data.text || '').trim()));
if (!data.text || /[`"'(\[{]$/.test(data.text.trim())) process.exit(1);
