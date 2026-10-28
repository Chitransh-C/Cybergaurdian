import dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error('No GEMINI_API_KEY');
  process.exit(1);
}

const models = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
  'gemini-1.5-flash'
];

async function tryGenerate(model, useHeader) {
  const base = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const url = useHeader ? base : `${base}?key=${encodeURIComponent(key)}`;
  const headers = { 'Content-Type': 'application/json' };
  if (useHeader) headers['x-goog-api-key'] = key;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Reply with exactly OK' }] }],
      generationConfig: { maxOutputTokens: 32, temperature: 0 }
    })
  });
  const text = await res.text();
  return { status: res.status, body: text.slice(0, 220).replace(/\s+/g, ' ') };
}

const list = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`
);
const listText = await list.text();
console.log('list', list.status, listText.slice(0, 120).replace(/\s+/g, ' '));

for (const model of models) {
  const q = await tryGenerate(model, false);
  console.log('query', model, q.status, q.body);
  const h = await tryGenerate(model, true);
  console.log('header', model, h.status, h.body);
}
