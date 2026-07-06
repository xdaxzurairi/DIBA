#!/usr/bin/env node
/**
 * diba-fallback-chat.js — DIBA Fallback Chat (auto-pick backend)
 *
 * Bila Claude kena usage limit, jalankan dari root vault DIBA:
 *     node scripts/diba-fallback-chat.js
 *
 * Backend auto-detect (ikut turutan):
 *   1. OLLAMA (local, percuma, offline)  — http://localhost:11434
 *      Guna model dari DIBA_LOCAL_MODEL, atau model pertama yang installed.
 *   2. OPENROUTER (cloud Nemotron)       — perlu OPENROUTER_API_KEY
 *   3. Tiada kedua-dua → tunjuk setup instruction.
 *
 * Paksa backend:  node scripts/diba-fallback-chat.js --backend=ollama|openrouter
 *
 * Apa dia buat:
 *   1. Load memory DIBA (main/main-memory.md + main/current-session.md + reminders)
 *   2. Chat loop interaktif — model respond SEBAGAI DIBA (persona v3)
 *   3. Transcript → daily-diary/current/YYYY-MM-DD-fallback.md
 *      supaya Claude-DIBA catch up (echo-recall) bila limit habis
 *
 * Env:  OLLAMA_HOST              (default: http://localhost:11434)
 *       DIBA_LOCAL_MODEL         (default: model pertama dalam `ollama list`)
 *       OPENROUTER_API_KEY       (untuk backend cloud — jangan commit)
 *       NEMOTRON_MODEL           (default: nvidia/nemotron-3-super-120b-a12b:free)
 *       NEMOTRON_FALLBACK_MODEL  (default: nvidia/nemotron-3-nano-30b-a3b:free)
 * Arahan dalam chat:  /exit (keluar + save)   /save (save tanpa keluar)
 * Zero dependency — Node 18+.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const VAULT = path.resolve(__dirname, "..");

// Load .env dari root vault (zero-dependency dotenv)
try {
  const envPath = path.join(VAULT, ".env");
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch { /* .env tiada — okay, guna env sistem */ }
const OLLAMA = (process.env.OLLAMA_HOST || "http://localhost:11434").replace(/\/$/, "");
const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const OR_PRIMARY = process.env.NEMOTRON_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
const OR_FALLBACK = process.env.NEMOTRON_FALLBACK_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free";
const MAX_FILE_CHARS = 6000;

// ---------- memory / persona ----------

function readMemory(rel) {
  try {
    const raw = fs.readFileSync(path.join(VAULT, rel), "utf8");
    return raw.length > MAX_FILE_CHARS ? raw.slice(0, MAX_FILE_CHARS) + "\n[...dipotong...]" : raw;
  } catch {
    return "";
  }
}

function buildSystemPrompt() {
  return [
    "Kau adalah DIBA (Deep Insight & Betterment Assistant) — chief of staff Zuex (panggil dia Abam).",
    "Mod sekarang: FALLBACK — Claude sedang kena usage limit, kau ambil alih sementara.",
    "Persona v3: Santai, Sharp, Padu. Rojak Malay/English ikut Abam. Lead dengan finding/keputusan,",
    "evidence before claim, zero filler, recommendation + tradeoff bukan senarai options.",
    "Jujur: kau tak boleh edit fail, run command, atau akses tool — kau chat sahaja.",
    "Kalau Abam minta kerja yang perlukan tools, jawab analisa/draf/plan, dan tanda item tu",
    "sebagai 'untuk Claude-DIBA sambung' supaya masuk transcript.",
    "",
    "=== MEMORY: main/main-memory.md ===",
    readMemory("main/main-memory.md") || "(tiada)",
    "",
    "=== SESSION RAM: main/current-session.md ===",
    readMemory("main/current-session.md") || "(tiada)",
    "",
    "=== REMINDERS: main/reminders.md ===",
    readMemory("main/reminders.md") || "(tiada)",
  ].join("\n");
}

// ---------- backends ----------

async function fetchJson(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return { res };
  } catch (e) {
    return { err: e.name === "AbortError" ? "timeout" : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

async function detectOllama() {
  const { res, err } = await fetchJson(`${OLLAMA}/api/tags`, {}, 2500);
  if (err || !res.ok) return null;
  const data = await res.json().catch(() => null);
  const models = (data?.models || []).map((m) => m.name);
  if (!models.length) return null;
  const wanted = process.env.DIBA_LOCAL_MODEL;
  const model = wanted && models.some((m) => m.startsWith(wanted)) ? wanted : models[0];
  if (wanted && model !== wanted) {
    console.log(`[nota] DIBA_LOCAL_MODEL=${wanted} tak jumpa — guna ${model}`);
  }
  return { kind: "ollama", model };
}

async function callOllama(model, messages) {
  const { res, err } = await fetchJson(
    `${OLLAMA}/api/chat`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, stream: false }),
    },
    300_000 // model local mungkin slow pada first load
  );
  if (err) return { error: `Ollama: ${err}` };
  if (!res.ok) return { error: `Ollama HTTP ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}` };
  const data = await res.json().catch(() => null);
  const text = data?.message?.content;
  return text ? { text } : { error: "Ollama: empty response" };
}

async function callOpenRouter(apiKey, model, messages) {
  const { res, err } = await fetchJson(
    OR_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/xdaxzurairi/DIBA",
        "X-Title": "DIBA fallback chat",
      },
      body: JSON.stringify({ model, messages }),
    },
    120_000
  );
  if (err) return { error: `OpenRouter: ${err}` };
  if (res.status === 429) return { rateLimited: true };
  if (!res.ok) return { error: `OpenRouter HTTP ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}` };
  const data = await res.json().catch(() => null);
  const text = data?.choices?.[0]?.message?.content;
  return text ? { text } : { error: "OpenRouter: empty response" };
}

async function pickBackend(forced) {
  if (forced === "ollama" || !forced) {
    const local = await detectOllama();
    if (local) return local;
    if (forced === "ollama") return { kind: "none", reason: "Ollama tak jalan / tiada model installed." };
  }
  if (process.env.OPENROUTER_API_KEY) return { kind: "openrouter", model: OR_PRIMARY };
  return { kind: "none" };
}

// ---------- transcript ----------

function saveTranscript(turns, backendLabel) {
  if (!turns.length) return null;
  const ymd = new Date().toISOString().slice(0, 10);
  const file = path.join(VAULT, "daily-diary", "current", `${ymd}-fallback.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  let block = `\n## Fallback session (${backendLabel}) — ${stamp}\n`;
  block += `*Claude limit — model lain took over. Claude-DIBA: baca dan sambung follow-up di bawah.*\n\n`;
  for (const t of turns) {
    block += `**${t.role === "user" ? "Abam" : "DIBA[" + backendLabel + "]"}:** ${t.content}\n\n`;
  }
  fs.appendFileSync(file, block, "utf8"); // append-only
  return file;
}

// ---------- main ----------

async function main() {
  const forced = (process.argv.find((a) => a.startsWith("--backend=")) || "").split("=")[1] || null;
  const backend = await pickBackend(forced);

  if (backend.kind === "none") {
    console.log(backend.reason || "Tiada backend fallback tersedia. Pilih satu (atau kedua-dua):");
    console.log("");
    console.log("  LOCAL (percuma, offline) — cadangan:");
    console.log("    1. Install Ollama: https://ollama.com/download");
    console.log("    2. ollama pull qwen2.5:3b   (ringan, ~2GB, ok untuk rojak Malay)");
    console.log("    3. Jalankan semula script ini — auto-detect.");
    console.log("");
    console.log("  CLOUD (Nemotron via OpenRouter):");
    console.log("    1. https://openrouter.ai/keys");
    console.log("    2. export OPENROUTER_API_KEY=sk-or-...  (atau setx pada Windows)");
    return;
  }

  const label = backend.kind === "ollama" ? `local:${backend.model}` : "Nemotron";
  const system = buildSystemPrompt();
  const history = [{ role: "system", content: system }];
  const turns = [];

  console.log("— DIBA Fallback Chat —");
  console.log(`Backend: ${backend.kind} (${backend.model})`);
  console.log("Memory loaded. /exit untuk keluar+save, /save untuk save sahaja.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let stdinClosed = false;
  rl.on("close", () => {
    stdinClosed = true;
  });
  // Bila stdin habis (Ctrl+D / piped input), treat macam /exit — transcript tetap saved
  const ask = (q) => new Promise((res) => (stdinClosed ? res("/exit") : rl.question(q, res)));

  for (;;) {
    const input = (await ask("Abam> ")).trim();
    if (!input) continue;
    if (input === "/exit") break;
    if (input === "/save") {
      const f = saveTranscript(turns, label);
      console.log(f ? `Saved → ${path.relative(VAULT, f)}` : "Tiada apa nak disave lagi.");
      continue;
    }

    history.push({ role: "user", content: input });
    turns.push({ role: "user", content: input });

    let result;
    if (backend.kind === "ollama") {
      result = await callOllama(backend.model, history);
    } else {
      result = await callOpenRouter(process.env.OPENROUTER_API_KEY, OR_PRIMARY, history);
      if (result.rateLimited) result = await callOpenRouter(process.env.OPENROUTER_API_KEY, OR_FALLBACK, history);
      if (result.rateLimited) result = { error: "Rate-limited pada kedua-dua model OpenRouter." };
    }

    if (result.error) {
      console.error(`[error] ${result.error}`);
      history.pop();
      turns.pop();
      continue;
    }

    console.log(`\nDIBA[${label}]> ${result.text}\n`);
    history.push({ role: "assistant", content: result.text });
    turns.push({ role: "assistant", content: result.text });
  }

  if (!stdinClosed) rl.close();
  const f = saveTranscript(turns, label);
  if (f) console.log(`Transcript saved → ${path.relative(VAULT, f)}`);
  console.log("Bila Claude limit habis, buka sesi DIBA — dia akan catch up dari diary.");
}

main();
