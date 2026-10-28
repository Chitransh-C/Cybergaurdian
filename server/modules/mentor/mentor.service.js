import config from '../../config/env.config.js';
import { answerLocally, GUARDIAN_SYSTEM_PROMPT } from '../../../shared/guardian-engine.js';

const GEMINI_MODELS = [
  config.ai.model,
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite'
].filter(Boolean).filter((value, index, arr) => arr.indexOf(value) === index);

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts
    .filter((part) => typeof part.text === 'string' && part.text.trim() && !part.thought)
    .map((part) => part.text)
    .join('')
    .trim();
}

function looksTruncated(text, finishReason) {
  if (!text) return true;
  if (finishReason === 'MAX_TOKENS') return true;
  const trimmed = text.trim();
  if (/[`"'(\[{]$/.test(trimmed)) return true;
  if (/\b(when you use|for example|such as|because)\s*$/i.test(trimmed)) return true;
  return false;
}

async function askGemini(message, context) {
  const prompt = [
    GUARDIAN_SYSTEM_PROMPT,
    'Answer in 4-8 complete sentences. Finish every sentence. Do not cut off mid-word or mid-code.',
    `Current module: ${context.moduleTitle || 'unknown'}`,
    context.taskText ? `Active task: ${context.taskText}` : '',
    context.taskHint ? `Hint already available to the student: ${context.taskHint}` : '',
    `Student: ${message}`
  ].filter(Boolean).join('\n');

  let lastError = 'No Gemini model succeeded';
  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': config.ai.apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
          // Gemini 2.5 thinking otherwise consumes the output budget and truncates replies.
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      lastError = data?.error?.message || `Gemini HTTP ${res.status} (${model})`;
      // Older models reject thinkingConfig — retry once without it.
      if (String(lastError).toLowerCase().includes('thinking')) {
        const retry = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': config.ai.apiKey
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 2048 }
          })
        });
        const retryData = await retry.json().catch(() => ({}));
        if (retry.ok) {
          const text = extractText(retryData);
          const finishReason = retryData?.candidates?.[0]?.finishReason;
          if (text && !looksTruncated(text, finishReason)) {
            return { text, model };
          }
          if (text) lastError = `Truncated response (${model})`;
          else lastError = `Empty model response (${model})`;
        } else {
          lastError = retryData?.error?.message || lastError;
        }
      }
      continue;
    }

    const text = extractText(data);
    const finishReason = data?.candidates?.[0]?.finishReason;
    if (!text) {
      lastError = `Empty model response (${model})`;
      continue;
    }
    if (looksTruncated(text, finishReason)) {
      lastError = `Truncated response (${model})`;
      continue;
    }
    return { text, model };
  }

  throw new Error(lastError);
}

async function askOpenAI(message, context) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.ai.apiKey}`
    },
    body: JSON.stringify({
      model: config.ai.model || 'gpt-4o-mini',
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        { role: 'system', content: GUARDIAN_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Module: ${context.moduleTitle || 'unknown'}\nTask: ${context.taskText || ''}\nHint: ${context.taskHint || ''}\n\n${message}`
        }
      ]
    })
  });

  if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('Empty model response');
  return { text, model: config.ai.model || 'gpt-4o-mini' };
}

export async function replyToCadet({ message, moduleTitle, taskText, taskHint }) {
  const local = answerLocally({ message, moduleTitle, taskHint, taskText });
  if (local.refused || !config.ai.apiKey) return local;

  try {
    const result = config.ai.provider === 'openai'
      ? await askOpenAI(message, { moduleTitle, taskText, taskHint })
      : await askGemini(message, { moduleTitle, taskText, taskHint });
    return {
      text: result.text,
      refused: false,
      source: config.ai.provider || 'gemini',
      model: result.model
    };
  } catch (err) {
    console.warn('[GuardianAI] model fallback:', err.message);
    return {
      ...local,
      source: 'local',
      notice: 'Model unavailable, answered from the lab tutor.'
    };
  }
}
