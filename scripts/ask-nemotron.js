#!/usr/bin/env node
/**
 * ask-nemotron.js — DIBA × Nemotron via OpenRouter
 *
 * Usage:   node scripts/ask-nemotron.js "your query"
 * Env:     OPENROUTER_API_KEY        (required — never commit this)
 *          NEMOTRON_MODEL            (default: nvidia/nemotron-3-super-120b-a12b:free)
 *          NEMOTRON_FALLBACK_MODEL   (default: nvidia/nemotron-3-nano-30b-a3b:free)
 *
 * Output:  first line "[model: <id>]", then the response text.
 * Exit:    0 = response printed OR setup message shown; 1 = hard error.
 * No dependencies — needs Node 18+ (built-in fetch).
 */

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const PRIMARY = process.env.NEMOTRON_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
const FALLBACK = process.env.NEMOTRON_FALLBACK_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free";
const TIMEOUT_MS = 90_000;

async function callModel(apiKey, model, query) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/xdaxzurairi/DIBA",
        "X-Title": "DIBA ask-nemotron",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: query }],
      }),
    });
    if (res.status === 429) return { rateLimited: true };
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { error: `HTTP ${res.status} from OpenRouter (${model}): ${body.slice(0, 300)}` };
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return { error: `Empty response from ${model}` };
    return { text };
  } catch (e) {
    return { error: e.name === "AbortError" ? `Timeout after ${TIMEOUT_MS / 1000}s (${model})` : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.error('Usage: node scripts/ask-nemotron.js "your query"');
    process.exit(1);
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    // Exit 0 by design: the skill shows this setup instruction instead of blocking DIBA.
    console.log(
      "OPENROUTER_API_KEY belum diset. Setup:\n" +
        "  1. Dapatkan key di https://openrouter.ai/keys\n" +
        "  2. Set env var: export OPENROUTER_API_KEY=sk-or-...  (atau setx pada Windows)\n" +
        "  3. Cuba semula: nm: <soalan>"
    );
    return;
  }

  let result = await callModel(apiKey, PRIMARY, query);
  let modelUsed = PRIMARY;
  if (result.rateLimited) {
    result = await callModel(apiKey, FALLBACK, query);
    modelUsed = FALLBACK;
  }

  if (result.error || result.rateLimited) {
    console.error(result.error || "Rate-limited on both primary and fallback models.");
    process.exit(1);
  }

  console.log(`[model: ${modelUsed}]`);
  console.log(result.text);
}

main();
