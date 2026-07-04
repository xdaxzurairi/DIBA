#!/usr/bin/env node
/**
 * diba-nemotron-chat.js — DIBA Fallback Chat (Nemotron takeover)
 *
 * Bila Claude kena usage limit, jalankan ini dari root vault DIBA:
 *     node scripts/diba-nemotron-chat.js
 *
 * Apa dia buat:
 *   1. Load memory DIBA (main/main-memory.md + main/current-session.md + reminders)
 *   2. Buka chat loop interaktif — Nemotron respond SEBAGAI DIBA (persona v3)
 *   3. Simpan transcript ke daily-diary/current/YYYY-MM-DD-nemotron.md
 *      supaya Claude-DIBA boleh catch up (echo-recall) bila limit habis
 *
 * Env:   OPENROUTER_API_KEY        (wajib)
 *        NEMOTRON_MODEL            (default: nvidia/nemotron-3-super-120b-a12b:free)
 *        NEMOTRON_FALLBACK_MODEL   (default: nvidia/nemotron-3-nano-30b-a3b:free)
 * Arahan dalam chat:  /exit (keluar + save)   /save (save tanpa keluar)
 * Zero dependency — Node 18+.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const VAULT = path.resolve(__dirname, "..");
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const PRIMARY = process.env.NEMOTRON_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
const FALLBACK = process.env.NEMOTRON_FALLBACK_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free";
const MAX_FILE_CHARS = 6000; // per memory file — jaga context Nemotron

function readMemory(rel) {
  try {
    const raw = fs.readFileSync(path.join(VAULT, rel), "utf8");
    return raw.length > MAX_FILE_CHARS ? raw.slice(0, MAX_FILE_CHARS) + "\n[...dipotong...]" : raw;
  } catch {
    return "";
  }
}

function buildSystemPrompt() {
  const mainMemory = readMemory("main/main-memory.md");
  const session = readMemory("main/current-session.md");
  const reminders = readMemory("main/reminders.md");
  return [
    "Kau adalah DIBA (Deep Insight & Betterment Assistant) — chief of staff Zuex (panggil dia Abam).",
    "Mod sekarang: FALLBACK — Claude sedang kena usage limit, kau (Nemotron) ambil alih sementara.",
    "Persona v3: Santai, Sharp, Padu. Rojak Malay/English ikut Abam. Lead dengan finding/keputusan,",
    "evidence before claim, zero filler, recommendation + tradeoff bukan senarai options.",
    "Jujur: kau tak boleh edit fail, run command, atau akses tool — kau chat sahaja.",
    "Kalau Abam minta kerja yang perlukan tools, jawab analisa/draf/plan, dan tanda item tu",
    "sebagai 'untuk Claude-DIBA sambung' supaya masuk transcript.",
    "",
    "=== MEMORY: main/main-memory.md ===",
    mainMemory || "(tiada)",
    "",
    "=== SESSION RAM: main/current-session.md ===",
    session || "(tiada)",
    "",
    "=== REMINDERS: main/reminders.md ===",
    reminders || "(tiada)",
  ].join("\n");
}

async function callModel(apiKey, model, messages) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/xdaxzurairi/DIBA",
        "X-Title": "DIBA fallback chat",
      },
      body: JSON.stringify({ model, messages }),
    });
    if (res.status === 429) return { rateLimited: true };
    if (!res.ok) return { error: `HTTP ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}` };
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return text ? { text } : { error: "Empty response" };
  } catch (e) {
    return { error: e.name === "AbortError" ? "Timeout 120s" : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

function transcriptPath() {
  const d = new Date();
  const ymd = d.toISOString().slice(0, 10);
  return path.join(VAULT, "daily-diary", "current", `${ymd}-nemotron.md`);
}

function saveTranscript(turns) {
  if (!turns.length) return null;
  const file = transcriptPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  let block = `\n## Nemotron fallback session — ${stamp}\n`;
  block += `*Claude limit — Nemotron took over. Claude-DIBA: baca dan sambung follow-up di bawah.*\n\n`;
  for (const t of turns) {
    block += `**${t.role === "user" ? "Abam" : "DIBA[Nemotron]"}:** ${t.content}\n\n`;
  }
  fs.appendFileSync(file, block, "utf8"); // append-only — jangan overwrite diary
  return file;
}

async function main() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.log(
      "OPENROUTER_API_KEY belum diset. Setup:\n" +
        "  1. https://openrouter.ai/keys\n" +
        "  2. export OPENROUTER_API_KEY=sk-or-...  (atau setx pada Windows)\n" +
        "  3. Jalankan semula."
    );
    return;
  }

  const system = buildSystemPrompt();
  const history = [{ role: "system", content: system }];
  const turns = []; // untuk transcript (tanpa system prompt)

  console.log("— DIBA Fallback Chat (Nemotron) —");
  console.log(`Model: ${PRIMARY} (fallback: ${FALLBACK})`);
  console.log("Memory loaded. /exit untuk keluar+save, /save untuk save sahaja.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  for (;;) {
    const input = (await ask("Abam> ")).trim();
    if (!input) continue;
    if (input === "/exit") break;
    if (input === "/save") {
      const f = saveTranscript(turns);
      console.log(f ? `Saved → ${path.relative(VAULT, f)}` : "Tiada apa nak disave lagi.");
      continue;
    }

    history.push({ role: "user", content: input });
    turns.push({ role: "user", content: input });

    let result = await callModel(apiKey, PRIMARY, history);
    let label = "Super";
    if (result.rateLimited) {
      result = await callModel(apiKey, FALLBACK, history);
      label = "Nano";
    }
    if (result.error || result.rateLimited) {
      console.error(`[error] ${result.error || "Rate-limited pada kedua-dua model."}`);
      history.pop(); // jangan simpan turn gagal dalam history
      turns.pop();
      continue;
    }

    console.log(`\nDIBA[Nemotron ${label}]> ${result.text}\n`);
    history.push({ role: "assistant", content: result.text });
    turns.push({ role: "assistant", content: result.text });
  }

  rl.close();
  const f = saveTranscript(turns);
  if (f) console.log(`Transcript saved → ${path.relative(VAULT, f)}`);
  console.log("Bila Claude limit habis, buka sesi DIBA — dia akan catch up dari diary.");
}

main();
