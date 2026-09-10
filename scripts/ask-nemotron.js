#!/usr/bin/env node
/**
 * ask-nemotron.js — DIBA × Multi-LLM Chat (OpenRouter + xAI direct)
 * Usage:
 *   node ask-nemotron.js                          → interactive chat mode
 *   node ask-nemotron.js "<prompt>"               → one-shot answer
 *   node ask-nemotron.js "review #file:src/a.js"  → inject file content
 *
 * Commands (interactive mode):
 *   !model                → senarai curated models
 *   !model all            → SEMUA free models dari OpenRouter
 *   !model search <query> → cari model (nama / tag / provider)
 *   !model <n>            → tukar ke model nombor n
 *   !refresh              → refresh senarai model dari OpenRouter API
 *   !run                  → jalankan bash command terakhir dari AI
 *   !run <cmd>            → jalankan command terus
 *   !cwd [path]           → show / set project root
 *   !save <path>          → simpan code block AI ke fail
 *   !read <path>          → baca & print fail
 *   exit / quit           → keluar
 */

const https    = require('https');
const fs       = require('fs');
const path     = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

// ─── ANSI Colors ─────────────────────────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  cyan:    '\x1b[36m',
  bcyan:   '\x1b[96m',
  green:   '\x1b[32m',
  bgreen:  '\x1b[92m',
  yellow:  '\x1b[33m',
  byellow: '\x1b[93m',
  blue:    '\x1b[34m',
  bblue:   '\x1b[94m',
  magenta: '\x1b[35m',
  red:     '\x1b[31m',
  white:   '\x1b[97m',
};

// ─── Load .env ───────────────────────────────────────────────────────────────
const ENV_PATH = path.join(__dirname, '../war-room/.env');
let API_KEY = '', XAI_KEY = '', MODEL = 'qwen/qwen3-coder:free';

try {
  fs.readFileSync(ENV_PATH, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    const key = (k || '').trim();
    const val = v.join('=').trim();
    if (key === 'OPENROUTER_API_KEY') API_KEY = val;
    if (key === 'XAI_API_KEY')        XAI_KEY = val;
    if (key === 'NEMOTRON_MODEL')     MODEL = val || MODEL;
  });
} catch {}

if (!API_KEY) {
  console.log('[AI] OPENROUTER_API_KEY belum dikonfigurasi dalam war-room/.env');
  process.exit(0);
}

const SYSTEM_PROMPT = 'You are an AI assistant integrated with DIBA (a developer workspace). Answer directly and concisely — NO internal monologue, NO "let me think", NO "the user said". Just give the answer immediately. When given file content, analyze it thoroughly. Respond in the same language as the user.';

// activeModel needs global scope — sendMessage modifies it during fallback
let activeModel = MODEL;

// Project root — changes with !cwd; #file: resolves relative to this
let projectRoot = process.cwd();

// Last AI code block — used by !save
let lastCodeBlock = '';
// Last AI bash block — used by !run
let lastBashBlock = '';

// ─── File system helpers ──────────────────────────────────────────────────────
const IGNORE_DIRS = new Set([
  'node_modules','.git','dist','.next','build','.vite',
  '__pycache__','.cache','vendor','coverage','.turbo',
]);

function walkDir(dir, maxDepth = 8, depth = 0) {
  if (depth > maxDepth) return [];
  const results = [];
  try {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (IGNORE_DIRS.has(e.name) || e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      e.isDirectory() ? results.push(...walkDir(full, maxDepth, depth + 1)) : results.push(full);
    }
  } catch {}
  return results;
}

const BINARY_EXT = new Set([
  '.png','.jpg','.jpeg','.gif','.ico','.svg','.webp',
  '.woff','.woff2','.ttf','.eot','.otf',
  '.mp4','.mp3','.wav','.pdf','.zip','.tar','.gz','.exe','.dll',
]);

function grepFiles(searchStr, baseDir) {
  const dir  = baseDir ? path.resolve(projectRoot, baseDir) : projectRoot;
  const lq   = searchStr.toLowerCase();
  const out  = [];
  for (const file of walkDir(dir)) {
    if (BINARY_EXT.has(path.extname(file).toLowerCase())) continue;
    try {
      const lines   = fs.readFileSync(file, 'utf8').split('\n');
      const matches = lines
        .map((text, i) => ({ line: i + 1, text: text.trimEnd() }))
        .filter(({ text }) => text.toLowerCase().includes(lq));
      if (matches.length) out.push({ file: path.relative(projectRoot, file).replace(/\\/g, '/'), matches });
    } catch {}
  }
  return out;
}

function findFiles(pattern, baseDir) {
  const dir  = baseDir ? path.resolve(projectRoot, baseDir) : projectRoot;
  const lp   = pattern.toLowerCase();
  const ext  = lp.startsWith('*.') ? lp.slice(1) : '';
  return walkDir(dir).filter(f => {
    const rel = path.relative(projectRoot, f).replace(/\\/g, '/').toLowerCase();
    return ext ? rel.endsWith(ext) : (rel.includes(lp) || path.basename(f).toLowerCase().includes(lp));
  });
}

// ─── File injection ───────────────────────────────────────────────────────────
function resolveFilePath(filePath) {
  if (path.isAbsolute(filePath)) return filePath;
  return path.join(projectRoot, filePath);
}

function injectFiles(query) {
  const filePattern = /#file:([^\s#]+)/g;
  const files = [];
  let match;
  while ((match = filePattern.exec(query)) !== null) files.push(match[1]);
  if (files.length === 0) return { cleanQuery: query, context: '' };

  const cleanQuery = query.replace(/#file:[^\s#]+/g, '').trim();
  const contextParts = files.map(f => {
    const resolved = resolveFilePath(f);
    try {
      const content = fs.readFileSync(resolved, 'utf8');
      return `### File: ${f} (${content.split('\n').length} lines)\n\`\`\`\n${content}\n\`\`\``;
    } catch (e) {
      return `### File: ${f}\n[ERROR: ${e.message}]`;
    }
  });
  return { cleanQuery, context: contextParts.join('\n\n'), fileNames: files };
}

function buildUserContent(query) {
  const { cleanQuery, context, fileNames } = injectFiles(query);
  if (!context) return { content: query, injected: [] };
  return {
    content: `${context}\n\n---\n${cleanQuery || 'Analyze the file(s) above.'}`,
    injected: fileNames || [],
  };
}

// ─── Curated model list ───────────────────────────────────────────────────────
// api: 'openrouter' | 'xai'
// tools: true = supports function calling / agentic AI
const CHAT_MODELS = [
  // ── OpenAI OSS ───────────────────────────────────────────────────────────
  { label: 'gpt-oss-120b',     id: 'openai/gpt-oss-120b:free',                           provider: 'OpenAI',    tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'gpt-oss-20b',      id: 'openai/gpt-oss-20b:free',                            provider: 'OpenAI',    tag: 'fast',   api: 'openrouter', tools: true  },
  // ── Qwen ─────────────────────────────────────────────────────────────────
  { label: 'qwen3-coder',      id: 'qwen/qwen3-coder:free',                              provider: 'Qwen',      tag: 'code',   api: 'openrouter', tools: true  },
  { label: 'qwen3-next-80b',   id: 'qwen/qwen3-next-80b-a3b-instruct:free',              provider: 'Qwen',      tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'qwen2.5-72b',      id: 'qwen/qwen-2.5-72b-instruct:free',                   provider: 'Qwen',      tag: 'chat',   api: 'openrouter', tools: true  },
  // ── xAI Grok (direct API) ────────────────────────────────────────────────
  { label: 'grok-3-mini',      id: 'x-ai/grok-3-mini-beta',  xaiId: 'grok-3-mini-beta', provider: 'xAI',       tag: 'reason', api: 'xai',        tools: true  },
  { label: 'grok-2-mini',      id: 'x-ai/grok-2-mini-beta',  xaiId: 'grok-2-mini-beta', provider: 'xAI',       tag: 'fast',   api: 'xai',        tools: true  },
  // ── Meta Llama ───────────────────────────────────────────────────────────
  { label: 'llama-3.3-70b',    id: 'meta-llama/llama-3.3-70b-instruct:free',             provider: 'Meta',      tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'llama-3.2-3b',     id: 'meta-llama/llama-3.2-3b-instruct:free',              provider: 'Meta',      tag: 'fast',   api: 'openrouter', tools: false },
  // ── DeepSeek ─────────────────────────────────────────────────────────────
  { label: 'deepseek-r1',      id: 'deepseek/deepseek-r1:free',                          provider: 'DeepSeek',  tag: 'reason', api: 'openrouter', tools: false },
  { label: 'deepseek-v3',      id: 'deepseek/deepseek-v3-0324:free',                     provider: 'DeepSeek',  tag: 'chat',   api: 'openrouter', tools: true  },
  // ── Google ───────────────────────────────────────────────────────────────
  { label: 'gemini-2.0-flash', id: 'google/gemini-2.0-flash-exp:free',                   provider: 'Google',    tag: 'fast',   api: 'openrouter', tools: true  },
  { label: 'gemma-4-31b',      id: 'google/gemma-4-31b-it:free',                         provider: 'Google',    tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'gemma-4-26b',      id: 'google/gemma-4-26b-a4b-it:free',                    provider: 'Google',    tag: 'chat',   api: 'openrouter', tools: true  },
  // ── Nvidia Nemotron ──────────────────────────────────────────────────────
  { label: 'nemotron-550b',    id: 'nvidia/nemotron-3-ultra-550b-a55b:free',              provider: 'Nvidia',    tag: 'heavy',  api: 'openrouter', tools: true  },
  { label: 'nemotron-120b',    id: 'nvidia/nemotron-3-super-120b-a12b:free',              provider: 'Nvidia',    tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'nemotron-30b',     id: 'nvidia/nemotron-3-nano-30b-a3b:free',                 provider: 'Nvidia',    tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'nemotron-30b-r',   id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',  provider: 'Nvidia',    tag: 'reason', api: 'openrouter', tools: true  },
  { label: 'nemotron-12b-vl',  id: 'nvidia/nemotron-nano-12b-v2-vl:free',                 provider: 'Nvidia',    tag: 'chat',   api: 'openrouter', tools: true  },
  { label: 'nemotron-9b',      id: 'nvidia/nemotron-nano-9b-v2:free',                     provider: 'Nvidia',    tag: 'fast',   api: 'openrouter', tools: true  },
  // ── Microsoft ────────────────────────────────────────────────────────────
  { label: 'phi-4',            id: 'microsoft/phi-4:free',                               provider: 'Microsoft', tag: 'chat',   api: 'openrouter', tools: true  },
  // ── Liquid AI ────────────────────────────────────────────────────────────
  { label: 'lfm-thinking',     id: 'liquid/lfm-2.5-1.2b-thinking:free',                  provider: 'Liquid',    tag: 'reason', api: 'openrouter', tools: false },
  { label: 'lfm-instruct',     id: 'liquid/lfm-2.5-1.2b-instruct:free',                  provider: 'Liquid',    tag: 'fast',   api: 'openrouter', tools: false },
  // ── Nous Hermes ──────────────────────────────────────────────────────────
  { label: 'hermes-405b',      id: 'nousresearch/hermes-3-llama-3.1-405b:free',           provider: 'Nous',      tag: 'chat',   api: 'openrouter', tools: true  },
  // ── Mistral ──────────────────────────────────────────────────────────────
  { label: 'mistral-7b',       id: 'mistralai/mistral-7b-instruct:free',                 provider: 'Mistral',   tag: 'fast',   api: 'openrouter', tools: false },
];

// ─── Status & color helpers ───────────────────────────────────────────────────
function modelStatus(m) {
  if (m.api === 'xai') return XAI_KEY ? 'xAI' : 'FREE?';
  return 'FREE';
}

function statusColor(s) {
  if (s === 'FREE')  return C.bgreen;
  if (s === 'xAI')   return C.bcyan;
  return C.byellow;
}

const PROV_COLOR = {
  'OpenAI':    C.bgreen,
  'Qwen':      C.bblue,
  'xAI':       C.bcyan,
  'Meta':      C.bgreen,
  'DeepSeek':  C.magenta,
  'Google':    C.yellow,
  'Nvidia':    C.bgreen,
  'Microsoft': C.cyan,
  'Liquid':    C.bcyan,
  'Nous':      C.white,
  'Mistral':   C.blue,
};

// ─── Dynamic model fetch & cache ─────────────────────────────────────────────
const CACHE_PATH = path.join(__dirname, '../.diba-models.json');
const CACHE_TTL  = 86_400_000; // 24 hours

let extraModels = []; // fetched from OpenRouter, not in CHAT_MODELS

function loadModelCache() {
  try {
    const { ts, models } = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    if (Date.now() - ts < CACHE_TTL) return models;
  } catch {}
  return null;
}

function saveModelCache(models) {
  try { fs.writeFileSync(CACHE_PATH, JSON.stringify({ ts: Date.now(), models }), 'utf8'); }
  catch {}
}

function tagFromId(id) {
  const s = id.toLowerCase();
  if (/coder|code/.test(s))              return 'code';
  if (/r1|think|reason|reflect/.test(s)) return 'reason';
  if (/vl|vision|image/.test(s))         return 'vision';
  if (/nano|mini|1b|3b|7b/.test(s))      return 'fast';
  return 'chat';
}

function providerFromId(id) {
  const raw = (id.split('/')[0] || '').replace(/-/g, ' ');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function fetchFreeModels(cb) {
  const opts = {
    hostname: 'openrouter.ai',
    path:     '/api/v1/models',
    method:   'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer':  'https://github.com/xdaxzurairi/DIBA',
      'X-Title':       'DIBA War Room',
    },
  };
  const req = https.request(opts, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      try {
        const data = JSON.parse(raw).data || [];
        const free = data
          .filter(m => {
            const pr = m.pricing || {};
            return parseFloat(pr.prompt || '1') === 0 && parseFloat(pr.completion || '1') === 0;
          })
          .map(m => ({
            id:       m.id,
            label:    (m.id.split('/')[1] || m.id).replace(/:.*$/, ''),
            provider: providerFromId(m.id),
            tag:      tagFromId(m.id),
            context:  m.context_length || 0,
            api:      'openrouter',
            tools:    Array.isArray(m.supported_parameters) && m.supported_parameters.includes('tools'),
          }));
        cb(null, free);
      } catch (e) { cb(e); }
    });
  });
  req.on('error', cb);
  req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  req.end();
}

function initExtraModels() {
  const cached     = loadModelCache();
  const curatedIds = new Set(CHAT_MODELS.map(m => m.id));

  if (cached) {
    extraModels = cached.filter(m => !curatedIds.has(m.id));
    return;
  }

  // Fetch silently in background — don't block startup
  fetchFreeModels((err, fetched) => {
    if (err || !fetched) return;
    saveModelCache(fetched);
    extraModels = fetched.filter(m => !curatedIds.has(m.id));
  });
}

function getAllModels() {
  return [...CHAT_MODELS, ...extraModels];
}

function refreshModels(onDone) {
  process.stdout.write(C.dim + '[AI] Mengambil senarai model dari OpenRouter...' + C.reset + '\n');
  fetchFreeModels((err, fetched) => {
    if (err) {
      console.log(C.red + '[AI] Gagal: ' + err.message + C.reset);
      onDone();
      return;
    }
    saveModelCache(fetched);
    const curatedIds = new Set(CHAT_MODELS.map(m => m.id));
    extraModels = fetched.filter(m => !curatedIds.has(m.id));
    console.log(
      C.bgreen + `[AI] ${fetched.length} model ditemui \u2014 ` +
      `${CHAT_MODELS.length} curated + ${extraModels.length} extra dari OpenRouter` + C.reset
    );
    onDone();
  });
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────
function httpPost(hostname, urlPath, headers, body, cb) {
  const opts = { hostname, path: urlPath, method: 'POST', headers };
  const req = https.request(opts, (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => cb(null, res.statusCode, raw));
  });
  req.on('error', err => cb(err));
  req.setTimeout(60000, () => { req.destroy(new Error('timeout')); });
  req.write(body);
  req.end();
}

// ─── Tool definitions (function calling / agentic AI) ────────────────────────
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'read_file',
      description: 'Baca kandungan fail. Guna untuk tengok kod, config, atau teks.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Path fail (relative ke project root atau absolute)' },
        },
        required: ['path'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'write_file',
      description: 'Tulis atau buat fail. Guna untuk simpan kod baru atau update yang sedia ada.',
      parameters: {
        type: 'object',
        properties: {
          path:    { type: 'string', description: 'Path fail untuk ditulis' },
          content: { type: 'string', description: 'Kandungan fail' },
        },
        required: ['path', 'content'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_files',
      description: 'Cari fail berdasarkan nama atau pattern (contoh: "Login", "*.tsx", "auth").',
      parameters: {
        type: 'object',
        properties: {
          pattern: { type: 'string', description: 'Nama fail, substring, atau *.ext' },
          dir:     { type: 'string', description: 'Subfolder untuk dicari (optional)' },
        },
        required: ['pattern'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'grep_files',
      description: 'Cari string dalam kandungan semua fail. Guna untuk find usage, import, function calls.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'String untuk dicari' },
          dir:   { type: 'string', description: 'Subfolder untuk dicari (optional)' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_dir',
      description: 'Senarai fail dan folder dalam direktori.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Path direktori (default: project root)' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'run_command',
      description: 'Jalankan shell command. Guna untuk build, test, install, git, npm, dll.',
      parameters: {
        type: 'object',
        properties: {
          command: { type: 'string', description: 'Command untuk dijalankan' },
        },
        required: ['command'],
      },
    },
  },
];

// ─── API callers ──────────────────────────────────────────────────────────────
function callOpenRouter(messages, modelId, cb, tools) {
  const bodyObj = { model: modelId, messages, max_tokens: 4096 };
  if (tools?.length) bodyObj.tools = tools;
  const body = JSON.stringify(bodyObj);
  httpPost('openrouter.ai', '/api/v1/chat/completions', {
    'Authorization':  `Bearer ${API_KEY}`,
    'Content-Type':   'application/json',
    'Content-Length': Buffer.byteLength(body),
    'HTTP-Referer':   'https://github.com/xdaxzurairi/DIBA',
    'X-Title':        'DIBA War Room',
  }, body, cb);
}

function callXAI(messages, xaiModelId, cb) {
  const body = JSON.stringify({ model: xaiModelId, messages, max_tokens: 4096 });
  httpPost('api.x.ai', '/v1/chat/completions', {
    'Authorization':  `Bearer ${XAI_KEY}`,
    'Content-Type':   'application/json',
    'Content-Length': Buffer.byteLength(body),
  }, body, cb);
}

function callModel(messages, modelId, cb, tools) {
  const m = getAllModels().find(x => x.id === modelId);
  if (m?.api === 'xai' && XAI_KEY) return callXAI(messages, m.xaiId || modelId, cb);
  return callOpenRouter(messages, modelId, cb, tools);
}

function getModelLabel(modelId) {
  const m = getAllModels().find(x => x.id === modelId);
  if (m) return m.label;
  return (modelId.split('/')[1] || modelId).replace(':free', '');
}

// ─── sendMessage with auto-fallback ──────────────────────────────────────────
function sendMessage(messages, model, tried, onDone) {
  callModel(messages, model, (err, status, raw) => {
    if (err) { onDone(null, `Error: ${err.message}`); return; }

    let json;
    try { json = JSON.parse(raw); } catch {
      onDone(null, `Parse error: ${raw.slice(0, 200)}`); return;
    }

    const needsFallback = status === 429 ||
      (json.error && (
        (json.error.message || '').includes('ResourceExhausted') ||
        (json.error.message || '').includes('limit') ||
        (json.error.message || '').includes('Provider returned error')
      ));

    if (needsFallback) {
      const nowTried = new Set([...tried, model]);
      const next = getAllModels().find(m => !nowTried.has(m.id));
      if (next) {
        activeModel = next.id;
        process.stderr.write(`${C.byellow}[AI] ${getModelLabel(model)} unavailable \u2014 switch ke ${next.label}${C.reset}\n`);
        return sendMessage(messages, next.id, nowTried, onDone);
      }
      onDone(null, 'Semua model tidak available. Cuba lagi kemudian.');
      return;
    }

    if (json.error) {
      onDone(null, `API error: ${json.error.message || JSON.stringify(json.error)}`);
      return;
    }

    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) { onDone(null, 'Respons kosong.'); return; }

    onDone(text, null, getModelLabel(model));
  });
}

// ─── Extract code/bash blocks from AI text ───────────────────────────────────
function extractLastBlocks(text) {
  const bb = [...text.matchAll(/```(?:bash|sh|shell|powershell|ps1|cmd)\n([\s\S]*?)```/g)];
  if (bb.length) lastBashBlock = bb[bb.length - 1][1].trimEnd();
  const cb = [...text.matchAll(/```(?:\w*\n)?([\s\S]*?)```/g)];
  if (cb.length) lastCodeBlock = cb[cb.length - 1][1].trimEnd();
}

// ─── Tool executor ────────────────────────────────────────────────────────────
function executeToolCb(name, args, cb) {
  switch (name) {
    case 'read_file': {
      const p = resolveFilePath(args.path || '');
      try {
        const content = fs.readFileSync(p, 'utf8');
        cb(`${args.path} (${content.split('\n').length} baris):\n\`\`\`\n${content}\n\`\`\``);
      } catch (e) { cb(`Error: ${e.message}`); }
      break;
    }
    case 'write_file': {
      const p = resolveFilePath(args.path || '');
      try {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, args.content || '', 'utf8');
        lastCodeBlock = args.content || '';
        cb(`Berjaya tulis: ${args.path}`);
      } catch (e) { cb(`Error: ${e.message}`); }
      break;
    }
    case 'find_files': {
      const files = findFiles(args.pattern || '', args.dir);
      if (!files.length) { cb('Tiada fail ditemui.'); break; }
      const list = files.slice(0, 50)
        .map(f => path.relative(projectRoot, f).replace(/\\/g, '/'))
        .join('\n');
      cb(`${files.length} fail:\n${list}`);
      break;
    }
    case 'grep_files': {
      const results = grepFiles(args.query || '', args.dir);
      if (!results.length) { cb(`Tiada padanan untuk "${args.query}"`); break; }
      const out = [];
      for (const { file, matches } of results.slice(0, 15)) {
        out.push(`${file}:`);
        for (const { line, text } of matches.slice(0, 5))
          out.push(`  ${line}: ${text}`);
      }
      if (results.length > 15) out.push(`... +${results.length - 15} fail lagi`);
      cb(out.join('\n'));
      break;
    }
    case 'list_dir': {
      const dir = args.path ? resolveFilePath(args.path) : projectRoot;
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        const list = entries
          .filter(e => !IGNORE_DIRS.has(e.name) && !e.name.startsWith('.'))
          .map(e => e.isDirectory() ? `[dir] ${e.name}/` : `      ${e.name}`)
          .join('\n');
        cb(list || '(kosong)');
      } catch (e) { cb(`Error: ${e.message}`); }
      break;
    }
    case 'run_command': {
      const cmd   = args.command || '';
      const isWin = process.platform === 'win32';
      const sh    = isWin ? 'powershell.exe' : '/bin/bash';
      const sArgs = isWin ? ['-NoProfile', '-Command', cmd] : ['-c', cmd];
      let   out   = '';
      const proc  = spawn(sh, sArgs, { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
      proc.stdout.on('data', d => { process.stdout.write(d); out += d; });
      proc.stderr.on('data', d => { process.stderr.write(C.dim + d + C.reset); out += d; });
      proc.on('close', code => cb(`Exit ${code}\n${out}`.trim()));
      proc.on('error', e => cb(`Error: ${e.message}`));
      break;
    }
    default:
      cb(`Unknown tool: ${name}`);
  }
}

// ─── Agentic loop — AI boleh call tools sendiri sampai selesai ───────────────
function agentLoop(done) {
  const modelObj     = getAllModels().find(m => m.id === activeModel);
  const supportsTools = modelObj?.tools === true;
  const tools        = supportsTools ? TOOLS : null;

  callModel([...history], activeModel, (err, status, raw) => {
    process.stdout.write('\x1b[1A\x1b[2K'); // clear "..."

    if (err) {
      console.log(C.red + '[AI] ' + err.message + C.reset);
      history.pop();
      done();
      return;
    }

    let json;
    try { json = JSON.parse(raw); } catch {
      console.log(C.red + '[AI] Parse error' + C.reset);
      history.pop();
      done();
      return;
    }

    // Rate limit / unavailable — fallback to next model
    const needsFallback = status === 429 ||
      (json.error && /ResourceExhausted|limit|Provider returned error/i.test(json.error.message || ''));
    if (needsFallback) {
      const tried = new Set([activeModel]);
      const next  = getAllModels().find(m => !tried.has(m.id));
      if (next) {
        process.stderr.write(`${C.byellow}[AI] ${getModelLabel(activeModel)} unavailable \u2014 switch ke ${next.label}${C.reset}\n`);
        activeModel = next.id;
        process.stdout.write(C.dim + '[AI] ...' + C.reset + '\n');
        agentLoop(done);
        return;
      }
    }

    if (json.error) {
      console.log(C.red + '[AI] ' + (json.error.message || JSON.stringify(json.error)) + C.reset);
      history.pop();
      done();
      return;
    }

    const choice = json.choices?.[0];
    if (!choice) { done(); return; }

    const { finish_reason, message } = choice;
    history.push(message);

    // Tool calls — AI nak guna tools
    if ((finish_reason === 'tool_calls' || message.tool_calls?.length) && message.tool_calls?.length) {
      let pending = message.tool_calls.length;

      for (const call of message.tool_calls) {
        const name    = call.function?.name || '';
        const argsStr = call.function?.arguments || '{}';
        let   args;
        try { args = JSON.parse(argsStr); } catch { args = {}; }

        const preview = Object.entries(args)
          .map(([k, v]) => `${k}="${String(v).slice(0, 50)}"`)
          .join(', ');
        console.log(`  ${C.bcyan}\u2699\ufe0f ${C.bold}${name}${C.reset}${C.dim}(${preview})${C.reset}`);

        executeToolCb(name, args, (result) => {
          const brief = String(result).split('\n').slice(0, 2).join(' ').slice(0, 100);
          console.log(C.dim + `  \u2192 ${brief}${result.length > 100 ? '...' : ''}` + C.reset + '\n');

          history.push({ role: 'tool', tool_call_id: call.id, content: String(result) });
          pending--;

          if (pending === 0) {
            process.stdout.write(C.dim + '[AI] ...' + C.reset + '\n');
            agentLoop(done); // recurse — AI mungkin nak call lagi
          }
        });
      }
      return;
    }

    // Final text response
    const text = (typeof message.content === 'string' ? message.content : '').trim();
    if (text) {
      console.log(C.dim + '[' + getModelLabel(activeModel) + ']' + C.reset + '\n' + text);
      extractLastBlocks(text);
    }
    done();
  }, tools);
}

// ─── ONE-SHOT MODE ────────────────────────────────────────────────────────────
const oneShot = process.argv.slice(2).join(' ').trim();
if (oneShot) {
  const { content, injected } = buildUserContent(oneShot);
  if (injected.length > 0) process.stderr.write(`[AI] Inject ${injected.length} file(s): ${injected.join(', ')}\n`);
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content }];
  sendMessage(messages, MODEL, new Set(), (text, err, label) => {
    if (err) { console.error(`[AI] ${err}`); process.exit(1); }
    console.log(`[${label}]\n${text}`);
    process.exit(0);
  });
  return;
}

// ─── INTERACTIVE CHAT ─────────────────────────────────────────────────────────
let history = [{ role: 'system', content: SYSTEM_PROMPT }];

initExtraModels(); // load from cache or fetch silently in bg

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function showWelcome() {
  const col = { n: 2, label: 16, prov: 10, tag: 6, status: 6, fn: 2 };

  const inner = '  XDIBAX Innovation  \u00d7  DIBA AI Chat v2.1  \u00d7  OpenRouter  ';
  const W = inner.length;
  console.log('');
  console.log(C.bcyan + '  \u2554' + '\u2550'.repeat(W) + '\u2557' + C.reset);
  console.log(C.bcyan + '  \u2551' + C.bold + C.white + inner + C.reset + C.bcyan + '\u2551' + C.reset);
  console.log(C.bcyan + '  \u255a' + '\u2550'.repeat(W) + '\u255d' + C.reset);
  console.log('');
  console.log('  ' + C.bgreen + C.bold + 'Welcome back, Abam!' + C.reset);
  console.log('');

  const pipe = C.dim + ' \u2502 ' + C.reset;
  const tip  = (k, v) => C.bcyan + k + C.reset + C.dim + ' ' + v + C.reset;
  console.log('  ' + [
    tip('#file:path',    'inject fail'),
    tip('!grep <str>',   'cari + AI'),
    tip('!find <name>',  'cari fail + AI'),
    tip('!run [cmd]',    'exec bash'),
    tip('!cwd <path>',   'project root'),
    tip('!save <path>',  'simpan code'),
  ].join(pipe));
  console.log('');

  const hLine = (l, m, r, fill) =>
    '  ' + l +
    fill.repeat(col.n + 2) + m +
    fill.repeat(col.label + 2) + m +
    fill.repeat(col.prov + 2) + m +
    fill.repeat(col.tag + 2) + m +
    fill.repeat(col.status + 2) + m +
    fill.repeat(col.fn + 2) + r;

  const row = (n, label, prov, tag, status, fn) =>
    C.dim + '  \u2502' + C.reset +
    ' ' + String(n).padStart(col.n) + ' ' +
    C.dim + '\u2502' + C.reset + ' ' +
    label + ' ' +
    C.dim + '\u2502' + C.reset + ' ' +
    prov + ' ' +
    C.dim + '\u2502' + C.reset + ' ' +
    tag + ' ' +
    C.dim + '\u2502' + C.reset + ' ' +
    status + ' ' +
    C.dim + '\u2502' + C.reset + ' ' +
    fn + ' ' +
    C.dim + '\u2502' + C.reset;

  console.log(C.dim + hLine('\u250c', '\u252c', '\u2510', '\u2500') + C.reset);
  console.log(row(
    C.bold + ' #' + C.reset,
    C.bold + 'Model'.padEnd(col.label) + C.reset,
    C.bold + 'Provider'.padEnd(col.prov) + C.reset,
    C.bold + 'Tag'.padEnd(col.tag) + C.reset,
    C.bold + 'Status'.padEnd(col.status) + C.reset,
    C.bold + 'Fn'.padEnd(col.fn) + C.reset,
  ));
  console.log(C.dim + hLine('\u251c', '\u253c', '\u2524', '\u2500') + C.reset);

  CHAT_MODELS.forEach((m, i) => {
    const isDefault  = m.id === MODEL;
    const labelText  = (isDefault ? m.label + ' *' : m.label).padEnd(col.label);
    const labelCell  = isDefault ? C.bgreen + C.bold + labelText + C.reset : labelText;
    const provCell   = (PROV_COLOR[m.provider] || C.reset) + m.provider.padEnd(col.prov) + C.reset;
    const tagCell    = C.dim + m.tag.padEnd(col.tag) + C.reset;
    const st         = modelStatus(m);
    const statusCell = statusColor(st) + st.padEnd(col.status) + C.reset;
    const fnCell     = m.tools ? C.bgreen + '\u26a1' + C.reset + ' ' : C.dim + '\u00b7 ' + C.reset;
    console.log(row(i + 1, labelCell, provCell, tagCell, statusCell, fnCell));
  });

  console.log(C.dim + hLine('\u2514', '\u2534', '\u2518', '\u2500') + C.reset);

  if (extraModels.length > 0) {
    console.log(C.dim + `\n  + ${extraModels.length} model lagi dari OpenRouter \u00b7 guna !model all atau !model search <q>` + C.reset);
  } else {
    console.log(C.dim + '\n  Guna !refresh untuk load semua free models dari OpenRouter' + C.reset);
  }
  console.log('');

  const leg = (color, sym, desc) => color + sym + C.reset + C.dim + ' ' + desc + C.reset;
  console.log('  ' + C.dim + '* default' + C.reset + '   ' + [
    leg(C.bgreen,  'FREE',   '= OpenRouter free tier'),
    leg(C.bcyan,   'xAI',    '= Direct xAI API'),
    leg(C.byellow, 'FREE?',  '= xAI key tidak dikonfigurasi'),
    leg(C.bgreen,  '\u26a1', '= Fn: support tool calling (agentic AI)'),
  ].join('   '));
  console.log('');
}

showWelcome();

// ─── Active model display ─────────────────────────────────────────────────────
function showActiveModel(m) {
  console.log(
    '  Model aktif: ' + C.bold + C.bgreen + m.label + C.reset +
    C.dim + '  [' + m.provider + ' \u00b7 ' + m.tag + ']' + C.reset
  );
  console.log(C.dim + '  !model \u2191\u2193 pilih  \u00b7  !model search <q>  \u00b7  !model all  \u00b7  #file:path inject  \u00b7  exit' + C.reset);
  console.log('');
}

const defaultModel = CHAT_MODELS[0];
activeModel = defaultModel.id;
showActiveModel(defaultModel);

// ─── Model table helper ───────────────────────────────────────────────────────
function showModelTable(models, title) {
  if (models.length === 0) {
    console.log(C.byellow + '  Tiada model ditemui.' + C.reset);
    return;
  }
  console.log('\n  ' + C.bold + title + C.reset + '\n');
  models.forEach((m, i) => {
    const isActive = m.id === activeModel;
    const n        = String(i + 1).padStart(3);
    const st       = modelStatus(m);
    const labelStr = (m.label || m.id).padEnd(24);
    const provStr  = (m.provider || '?').padEnd(11);
    const prov     = (PROV_COLOR[m.provider] || '') + provStr + C.reset;
    const fn       = m.tools ? C.bgreen + '\u26a1' + C.reset : C.dim + '\u00b7' + C.reset;
    const active   = isActive ? C.bgreen + ' \u2190 aktif' + C.reset : '';

    if (isActive) {
      process.stdout.write(
        '  ' + C.bgreen + n + ')' + C.reset +
        ' ' + C.bgreen + C.bold + labelStr + C.reset +
        ' ' + prov +
        ' ' + statusColor(st) + st + C.reset +
        ' ' + fn + active + '\n'
      );
    } else {
      process.stdout.write(
        '  ' + C.dim + n + ')' + C.reset +
        ' ' + labelStr +
        ' ' + prov +
        ' ' + statusColor(st) + st + C.reset +
        ' ' + fn + '\n'
      );
    }
  });
  console.log(C.dim + '\n  \u26a1 = tool calling  \u00b7  guna !model <nombor> untuk tukar\n' + C.reset);
}

// ─── Arrow-key interactive model selector ────────────────────────────────────
function selectModelInteractive(models, title, cb) {
  if (models.length === 0) {
    console.log(C.byellow + '  Tiada model ditemui.' + C.reset + '\n');
    cb(null);
    return;
  }

  const VISIBLE = Math.min(models.length, 14);
  let cur = Math.max(0, models.findIndex(m => m.id === activeModel));
  let top = Math.max(0, Math.min(cur - Math.floor(VISIBLE / 2), models.length - VISIBLE));
  let lineCount = 0;

  function clearLines() {
    if (lineCount > 0) {
      process.stdout.write(`\x1b[${lineCount}A\x1b[0J`);
      lineCount = 0;
    }
  }

  function writeln(s) {
    process.stdout.write(s + '\n');
    lineCount++;
  }

  function render() {
    clearLines();
    top = Math.max(0, Math.min(top, models.length - VISIBLE));

    writeln('');
    writeln(
      `  ${C.bold}${title}${C.reset}  ` +
      C.dim + '\u2191\u2193 navigasi  \u00b7  Enter pilih  \u00b7  Esc batal' + C.reset
    );
    writeln('');

    if (top > 0) writeln(`  ${C.dim}\u2191 ${top} model lagi di atas${C.reset}`);

    for (let i = top; i < Math.min(top + VISIBLE, models.length); i++) {
      const m     = models[i];
      const st    = modelStatus(m);
      const sel   = i === cur;
      const act   = m.id === activeModel;
      const lbl   = (m.label || m.id).padEnd(26);
      const prov  = (m.provider || '?').padEnd(11);
      const provC = PROV_COLOR[m.provider] || '';
      const mark  = act ? C.dim + ' \u2190' + C.reset : '';
      const fn    = m.tools ? C.bgreen + '\u26a1' + C.reset : C.dim + '\u00b7' + C.reset;

      if (sel) {
        writeln(
          `  ${C.bgreen}${C.bold}\u276f ${lbl}${C.reset}` +
          ` ${provC}${prov}${C.reset}` +
          ` ${statusColor(st)}${st}${C.reset}` +
          ` ${fn}${mark}`
        );
      } else {
        writeln(
          `  ${C.dim}  ${C.reset}${lbl}` +
          ` ${provC}${prov}${C.reset}` +
          ` ${statusColor(st)}${st}${C.reset}` +
          ` ${fn}${mark}`
        );
      }
    }

    const below = models.length - (top + VISIBLE);
    if (below > 0) writeln(`  ${C.dim}\u2193 ${below} model lagi di bawah${C.reset}`);
    writeln('');
  }

  render();
  process.stdout.write('\x1b[?25l'); // hide cursor

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  function finish(chosen) {
    process.stdin.setRawMode(false);
    process.stdin.removeListener('data', onKey);
    clearLines();
    process.stdout.write('\x1b[?25h'); // show cursor
    cb(chosen);
  }

  function onKey(key) {
    switch (key) {
      case '\x1b[A':  // up
        cur = Math.max(0, cur - 1);
        if (cur < top) top = cur;
        render(); break;
      case '\x1b[B':  // down
        cur = Math.min(models.length - 1, cur + 1);
        if (cur >= top + VISIBLE) top++;
        render(); break;
      case '\x1b[5~': // Page Up
        cur = Math.max(0, cur - VISIBLE);
        top = Math.max(0, top - VISIBLE);
        render(); break;
      case '\x1b[6~': // Page Down
        cur = Math.min(models.length - 1, cur + VISIBLE);
        top = Math.min(models.length - VISIBLE, top + VISIBLE);
        render(); break;
      case '\x1b[H':  // Home
        cur = 0; top = 0;
        render(); break;
      case '\x1b[F':  // End
        cur = models.length - 1;
        top = Math.max(0, models.length - VISIBLE);
        render(); break;
      case '\r':
      case '\n':
        finish(models[cur]); break;
      case '\x1b':
      case 'q':
        finish(null); break;
      case '\x03':    // Ctrl+C
        finish(null);
        process.exit(0);
    }
  }

  process.stdin.on('data', onKey);
}

// ─── First question ───────────────────────────────────────────────────────────
function promptFirstQuestion() {
  rl.question(C.bcyan + 'Apa yang Abam nak bincang hari ni?' + C.reset + '\n' + C.bold + '> ' + C.reset, (firstInput) => {
    const msg = firstInput.trim();
    if (!msg || msg.toLowerCase() === 'exit') {
      console.log('\n' + C.dim + '[AI] Ok, jumpa lagi Abam.' + C.reset + '\n');
      process.exit(0);
    }
    handleInput(msg, () => {
      rl.setPrompt(C.bold + '\nAbam: ' + C.reset);
      rl.prompt();
    });
  });
}

promptFirstQuestion();

// ─── Core input handler ───────────────────────────────────────────────────────
function handleInput(msg, done) {

  // !refresh — fetch fresh model list from OpenRouter
  if (msg === '!refresh') {
    refreshModels(done);
    return;
  }

  // !grep <string> [dir] — cari string dalam semua fail, inject ke AI
  if (msg.startsWith('!grep ')) {
    const parts  = msg.slice(6).trim().split(' ');
    const query  = parts[0];
    const subdir = parts[1] || '';
    if (!query) { console.log(C.byellow + '  Guna: !grep <string> [subfolder]' + C.reset + '\n'); done(); return; }

    process.stdout.write(C.dim + `[AI] Mencari "${query}" dalam ${subdir || 'project root'}...\r` + C.reset);
    const results = grepFiles(query, subdir);
    process.stdout.write('\x1b[2K');

    if (results.length === 0) {
      console.log(C.byellow + `\n  Tiada padanan untuk "${query}"\n` + C.reset);
      done(); return;
    }

    // Build context
    const MAX_FILES = 15, MAX_LINES = 5;
    const shown  = results.slice(0, MAX_FILES);
    let context  = `### Grep: "${query}" — ${results.length} fail\n\n`;
    for (const { file, matches } of shown) {
      context += `#### ${file}\n`;
      for (const { line, text } of matches.slice(0, MAX_LINES))
        context += `  ${String(line).padStart(4)}: ${text}\n`;
      if (matches.length > MAX_LINES) context += `  ... +${matches.length - MAX_LINES} baris lagi\n`;
      context += '\n';
    }
    if (results.length > MAX_FILES) context += `... dan ${results.length - MAX_FILES} fail lagi\n`;

    // Print summary
    console.log(`\n  ${C.bold}Grep "${query}"${C.reset} — ${C.bgreen}${results.length} fail${C.reset}\n`);
    for (const { file, matches } of shown.slice(0, 8))
      console.log(`  ${C.dim}${file}${C.reset}  ${C.bcyan}${matches.length} padanan${C.reset}`);
    if (results.length > 8) console.log(C.dim + `  ... +${results.length - 8} fail lagi` + C.reset);
    console.log('');

    // Inject ke AI → agentLoop (boleh drill down lagi jika AI nak)
    history.push({ role: 'user', content: context });
    process.stdout.write(C.dim + '[AI] ...' + C.reset + '\n');
    agentLoop(done);
    return;
  }

  // !find <pattern> [dir] — cari fail, inject content ke AI
  if (msg.startsWith('!find ')) {
    const parts   = msg.slice(6).trim().split(' ');
    const pattern = parts[0];
    const subdir  = parts[1] || '';
    if (!pattern) { console.log(C.byellow + '  Guna: !find <pattern> [subfolder]' + C.reset + '\n'); done(); return; }

    process.stdout.write(C.dim + `[AI] Mencari fail "${pattern}"...\r` + C.reset);
    const files = findFiles(pattern, subdir);
    process.stdout.write('\x1b[2K');

    if (files.length === 0) {
      console.log(C.byellow + `\n  Tiada fail sepadan "${pattern}"\n` + C.reset);
      done(); return;
    }

    console.log(`\n  ${C.bold}Find "${pattern}"${C.reset} — ${C.bgreen}${files.length} fail${C.reset}\n`);
    files.slice(0, 20).forEach((f, i) =>
      console.log(`  ${C.dim}${String(i+1).padStart(3)})${C.reset} ${path.relative(projectRoot,f).replace(/\\/g,'/')}`)
    );
    if (files.length > 20) console.log(C.dim + `  ... +${files.length - 20} lagi` + C.reset);
    console.log('');

    let context = `### Find "${pattern}" — ${files.length} fail ditemui\n\n`;
    for (const f of files.slice(0, 5)) {
      const rel = path.relative(projectRoot, f).replace(/\\/g, '/');
      try {
        const lines = fs.readFileSync(f, 'utf8').split('\n');
        const body  = lines.slice(0, 200).join('\n');
        context += `#### ${rel} (${lines.length} baris)\n\`\`\`\n${body}${lines.length > 200 ? '\n...' : ''}\n\`\`\`\n\n`;
      } catch (e) { context += `#### ${rel}\n[ERROR: ${e.message}]\n\n`; }
    }

    history.push({ role: 'user', content: context });
    process.stdout.write(C.dim + '[AI] ...' + C.reset + '\n');
    agentLoop(done);
    return;
  }

  // !run — execute bash command terus dari chat
  if (msg === '!run' || msg.startsWith('!run ')) {
    const arg = msg.slice(5).trim();
    const cmd = arg || lastBashBlock;

    if (!cmd) {
      console.log(C.byellow + '\n  Tiada command. Minta AI bagi bash command atau: !run <cmd>\n' + C.reset);
      done();
      return;
    }

    console.log(
      '\n  ' + C.dim + '\u2500'.repeat(48) + C.reset + '\n' +
      '  ' + C.byellow + '$ ' + C.reset + C.bold + cmd + C.reset + '\n' +
      '  ' + C.dim + '\u2500'.repeat(48) + C.reset + '\n'
    );

    const isWin = process.platform === 'win32';
    const shell  = isWin ? 'powershell.exe' : '/bin/bash';
    const args   = isWin ? ['-NoProfile', '-Command', cmd] : ['-c', cmd];

    const proc = spawn(shell, args, {
      cwd:   projectRoot,
      stdio: ['inherit', 'pipe', 'pipe'],
    });

    let output = '';
    proc.stdout.on('data', d => { process.stdout.write(d); output += d; });
    proc.stderr.on('data', d => { process.stderr.write(C.dim + d + C.reset); output += d; });

    proc.on('close', code => {
      if (code === 0) {
        console.log('\n  ' + C.bgreen + '\u2714 Siap (exit 0)' + C.reset + '\n');
      } else {
        console.log('\n  ' + C.red + '\u2718 Exit code: ' + code + C.reset + '\n');
      }
      // Add output to history so AI knows what happened
      if (output.trim()) {
        history.push({
          role:    'user',
          content: `[Command output]\n\`\`\`\n$ ${cmd}\n${output.trim()}\n\`\`\``,
        });
      }
      done();
    });

    proc.on('error', err => {
      console.log(C.red + '  Gagal jalankan: ' + err.message + C.reset + '\n');
      done();
    });
    return;
  }

  // !cwd — show / set project root for #file: resolution
  if (msg === '!cwd' || msg.startsWith('!cwd ')) {
    const arg = msg.slice(5).trim();
    if (!arg) {
      console.log('\n  ' + C.bold + 'Project root semasa:' + C.reset);
      console.log('  ' + C.bgreen + projectRoot + C.reset + '\n');
      console.log(C.dim + '  !cwd <path>  tukar root\n' + C.reset);
    } else {
      const target = path.resolve(arg);
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        projectRoot = target;
        console.log('\n  ' + C.bgreen + C.bold + 'Root ditukar:' + C.reset + ' ' + projectRoot + '\n');
      } else {
        console.log(C.red + '\n  Folder tidak wujud: ' + target + C.reset + '\n');
      }
    }
    done();
    return;
  }

  // !save — write last AI code block to file
  if (msg.startsWith('!save ')) {
    const target = msg.slice(6).trim();
    if (!target) {
      console.log(C.byellow + '  Guna: !save <path>' + C.reset + '\n');
      done();
      return;
    }
    if (!lastCodeBlock) {
      console.log(C.byellow + '  Tiada code block dari AI lagi.' + C.reset + '\n');
      done();
      return;
    }
    const filePath = resolveFilePath(target);
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, lastCodeBlock, 'utf8');
      console.log('\n  ' + C.bgreen + C.bold + 'Disimpan:' + C.reset + ' ' + filePath + '\n');
    } catch (e) {
      console.log(C.red + '  Gagal simpan: ' + e.message + C.reset + '\n');
    }
    done();
    return;
  }

  // !read — read file and print (confirm file accessible)
  if (msg.startsWith('!read ')) {
    const target = resolveFilePath(msg.slice(6).trim());
    try {
      const content = fs.readFileSync(target, 'utf8');
      const lines   = content.split('\n');
      console.log('\n  ' + C.dim + target + C.reset + C.dim + '  (' + lines.length + ' baris)' + C.reset + '\n');
      console.log(content);
    } catch (e) {
      console.log(C.red + '  Fail tidak ditemui: ' + target + C.reset + '\n');
    }
    done();
    return;
  }

  // !model — list / search / switch  (arrow keys jika TTY, nombor jika tidak)
  if (msg === '!model' || msg.startsWith('!model ')) {
    const arg = msg.slice(7).trim();
    const all = getAllModels();

    // Direct number selection — always works
    const n = parseInt(arg);
    if (!isNaN(n) && arg !== '') {
      const idx = n - 1;
      if (idx < 0 || idx >= all.length) {
        console.log(C.byellow + `  Nombor tidak sah. Guna !model 1\u2013${all.length}` + C.reset);
      } else {
        const chosen = all[idx];
        activeModel  = chosen.id;
        console.log(
          '\n  ' + C.bgreen + C.bold + 'Model ditukar: ' + chosen.label + C.reset +
          C.dim + '  [' + (chosen.provider || '?') + ' \u00b7 ' + (chosen.tag || '?') + ']' + C.reset + '\n'
        );
      }
      done();
      return;
    }

    // Determine model list + title
    let models, title;
    if (!arg) {
      models = CHAT_MODELS;
      title  = `Curated Models (${CHAT_MODELS.length})`;
    } else if (arg === 'all') {
      models = all;
      title  = `Semua Free Models (${all.length})`;
    } else if (arg.startsWith('search ')) {
      const q = arg.slice(7).toLowerCase().trim();
      models  = all.filter(m =>
        (m.label    || '').toLowerCase().includes(q) ||
        (m.id       || '').toLowerCase().includes(q) ||
        (m.provider || '').toLowerCase().includes(q) ||
        (m.tag      || '').toLowerCase().includes(q)
      );
      title = `Carian "${q}" \u2014 ${models.length} ditemui`;
    } else {
      console.log(C.dim + '  !model · !model all · !model search <q> · !model <n>' + C.reset + '\n');
      done();
      return;
    }

    // Arrow-key interactive selector (TTY only)
    if (process.stdin.isTTY) {
      rl.pause();
      selectModelInteractive(models, title, (chosen) => {
        rl.resume();
        if (chosen) {
          activeModel = chosen.id;
          console.log(
            '\n  ' + C.bgreen + C.bold + 'Model ditukar: ' + chosen.label + C.reset +
            C.dim + '  [' + (chosen.provider || '?') + ' \u00b7 ' + (chosen.tag || '?') + ']' + C.reset + '\n'
          );
        } else {
          console.log(C.dim + '  [batal]\n' + C.reset);
        }
        done();
      });
    } else {
      // Fallback: static table + nombor
      showModelTable(models, title);
      if (!arg && extraModels.length > 0) {
        console.log(C.dim + `  + ${extraModels.length} model lagi \u00b7 guna !model all atau !model search <q>` + C.reset + '\n');
      }
      done();
    }
    return;
  }

  const { content, injected } = buildUserContent(msg);
  if (injected.length > 0) {
    process.stdout.write(C.dim + '[AI] Inject ' + injected.length + ' fail: ' + injected.join(', ') + C.reset + '\n');
  }

  history.push({ role: 'user', content });
  process.stdout.write(C.dim + '[AI] ...' + C.reset + '\n');
  agentLoop(done);
}

// ─── readline loop ────────────────────────────────────────────────────────────
rl.setPrompt(C.bold + '\nAbam: ' + C.reset);

rl.on('line', (input) => {
  const msg = input.trim();
  if (!msg) { rl.prompt(); return; }
  if (msg.toLowerCase() === 'exit' || msg.toLowerCase() === 'quit') {
    console.log('\n' + C.dim + '[AI] Selamat tinggal, Abam.' + C.reset + '\n');
    process.exit(0);
  }
  handleInput(msg, () => rl.prompt());
});

rl.on('close', () => {
  console.log('\n' + C.dim + '[AI] Sesi tamat.' + C.reset + '\n');
  process.exit(0);
});
