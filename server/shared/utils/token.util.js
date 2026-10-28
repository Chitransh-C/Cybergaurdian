import crypto from 'crypto';
import config from '../../config/env.config.js';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function signToken(user) {
  const body = Buffer.from(JSON.stringify({
    sub: user.id,
    email: user.email,
    exp: Date.now() + WEEK_MS
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', config.security.jwtSecret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = crypto.createHmac('sha256', config.security.jwtSecret).update(body).digest('base64url');
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;

  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!data?.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
