#!/usr/bin/env node
/**
 * Notify War Room from DIBA chat / terminal
 *
 * Usage:
 *   node bridge-notify.mjs skill orchestrate active "Deploying parallel audit"
 *   node bridge-notify.mjs chat diba "MAESTRO routing ke CIPHER + GRID"
 *   node bridge-notify.mjs chat user "Abam minta audit keseluruhan"
 */
const PORT = 8765;
const BASE = `http://localhost:${PORT}/api`;

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}

const [, , cmd, ...rest] = process.argv;

if (!cmd) {
  console.log(`Usage:
  node bridge-notify.mjs skill <skillId> <status> [message]
  node bridge-notify.mjs chat <role> <message...>
`);
  process.exit(1);
}

try {
  if (cmd === 'skill') {
    const [skillId, status = 'active', ...msgParts] = rest;
    const out = await post('/skill', { skillId, status, message: msgParts.join(' ') || undefined });
    console.log('OK skill', out.skill);
  } else if (cmd === 'chat') {
    const [role = 'diba', ...msgParts] = rest;
    const out = await post('/chat', { role, text: msgParts.join(' ') });
    console.log('OK chat', out.line);
  } else {
    throw new Error('Unknown cmd: ' + cmd);
  }
} catch (e) {
  console.error('Bridge error:', e.message);
  console.error('Pastikan War Room server jalan: cd war-room && node serve.mjs');
  process.exit(1);
}
