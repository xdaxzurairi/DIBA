#!/usr/bin/env node
/**
 * DIBA War Room server + Live Chat Bridge
 * - Static files
 * - POST /api/skill — update NPC status from DIBA chat
 * - POST /api/chat — push chat line to War Room feed
 * - POST /api/invoke — queue prompt for Cursor chat (clipboard file)
 * - GET  /api/events — SSE live stream
 * - GET  /api/status — full bridge state
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8765;
const BRIDGE_FILE = path.join(__dirname, 'live-bridge.json');
const INVOKE_FILE = path.join(__dirname, 'invoke-queue.txt');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const sseClients = new Set();

function defaultBridge() {
  return {
    connected: true,
    updatedAt: new Date().toISOString(),
    skills: {},
    chatLog: [],
    invokeQueue: [],
  };
}

function loadBridge() {
  try {
    if (fs.existsSync(BRIDGE_FILE)) {
      return { ...defaultBridge(), ...JSON.parse(fs.readFileSync(BRIDGE_FILE, 'utf8')) };
    }
  } catch (_) {}
  return defaultBridge();
}

function saveBridge(state) {
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(BRIDGE_FILE, JSON.stringify(state, null, 2));
}

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) {
    try { res.write(payload); } catch (_) { sseClients.delete(res); }
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 1e6) reject(new Error('too large')); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(obj));
}

function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return true;
  }

  if (url === '/api/status' && req.method === 'GET') {
    json(res, 200, loadBridge());
    return true;
  }

  if (url === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(`event: hello\ndata: ${JSON.stringify({ ok: true, t: Date.now() })}\n\n`);
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return true;
  }

  if (url === '/api/skill' && req.method === 'POST') {
    readBody(req).then((body) => {
      const data = JSON.parse(body || '{}');
      const skillId = data.skillId || data.id;
      if (!skillId) return json(res, 400, { error: 'skillId required' });
      const state = loadBridge();
      state.skills[skillId] = {
        status: data.status || 'active',
        message: data.message || '',
        at: new Date().toISOString(),
      };
      if (data.message) {
        state.chatLog.push({
          role: 'diba',
          skillId,
          text: data.message,
          at: new Date().toISOString(),
        });
        state.chatLog = state.chatLog.slice(-100);
      }
      saveBridge(state);
      broadcast('skill', { skillId, ...state.skills[skillId] });
      if (data.message) broadcast('chat', state.chatLog[state.chatLog.length - 1]);
      json(res, 200, { ok: true, skill: state.skills[skillId] });
    }).catch((e) => json(res, 400, { error: e.message }));
    return true;
  }

  if (url === '/api/chat' && req.method === 'POST') {
    readBody(req).then((body) => {
      const data = JSON.parse(body || '{}');
      if (!data.text) return json(res, 400, { error: 'text required' });
      const state = loadBridge();
      const line = {
        role: data.role || 'user',
        skillId: data.skillId || null,
        text: data.text,
        at: new Date().toISOString(),
      };
      state.chatLog.push(line);
      state.chatLog = state.chatLog.slice(-100);
      saveBridge(state);
      broadcast('chat', line);
      json(res, 200, { ok: true, line });
    }).catch((e) => json(res, 400, { error: e.message }));
    return true;
  }

  if (url === '/api/invoke' && req.method === 'POST') {
    readBody(req).then((body) => {
      const data = JSON.parse(body || '{}');
      const prompt = data.prompt || data.text;
      if (!prompt) return json(res, 400, { error: 'prompt required' });
      const state = loadBridge();
      const item = {
        prompt,
        skillId: data.skillId || null,
        npcName: data.npcName || null,
        at: new Date().toISOString(),
        consumed: false,
      };
      state.invokeQueue.push(item);
      state.invokeQueue = state.invokeQueue.slice(-20);
      saveBridge(state);
      fs.appendFileSync(INVOKE_FILE, `[${item.at}] ${prompt}\n`, 'utf8');
      broadcast('invoke', item);
      json(res, 200, { ok: true, item, hint: 'Paste prompt dalam Cursor chat (Ctrl+V)' });
    }).catch((e) => json(res, 400, { error: e.message }));
    return true;
  }

  if (url === '/api/invoke/latest' && req.method === 'GET') {
    const state = loadBridge();
    const latest = [...state.invokeQueue].reverse().find((i) => !i.consumed) || null;
    json(res, 200, { latest });
    return true;
  }

  if (url === '/api/invoke/next' && req.method === 'GET') {
    const state = loadBridge();
    const next = state.invokeQueue.find((i) => !i.consumed) || null;
    if (next) {
      next.consumed = true;
      saveBridge(state);
      broadcast('invoke-consumed', { id: next.at, prompt: next.prompt });
    }
    json(res, 200, { item: next });
    return true;
  }

  return false;
}

function serveStatic(req, res, url) {
  let filePath = url === '/' ? '/index.html' : url.split('?')[0];
  const file = path.join(__dirname, path.normalize(filePath).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(__dirname)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url?.split('?')[0] || '/';
  if (url.startsWith('/api/')) {
    if (handleApi(req, res, url)) return;
    json(res, 404, { error: 'not found' });
    return;
  }
  serveStatic(req, res, url);
});

if (!fs.existsSync(BRIDGE_FILE)) saveBridge(defaultBridge());

server.listen(PORT, () => {
  console.log(`DIBA War Room: http://localhost:${PORT}`);
  console.log(`Live Bridge API: http://localhost:${PORT}/api/status`);
  console.log('Tekan Ctrl+C untuk stop');
});
