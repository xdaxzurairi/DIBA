---
name: ask-nemotron
description: 'Route query ke Nemotron AI via OpenRouter, DIBA-aligned. Trigger: nm:,
             nemotron:, #nm dalam prompt, auto-route task heavy-code, atau bila Abam
             sebut "claude limit", "nemotron takeover", "guna nemotron je". Response
             inline berlabel [Nemotron]. Termasuk protokol handoff bila Claude hampir
             kena usage limit — checkpoint + fallback chat script.'
---

# Ask Nemotron — DIBA × Nemotron Integration

Second AI untuk DIBA. Nemotron (NVIDIA via OpenRouter) dipanggil inline dan respond berlabel `[Nemotron]`. Setiap call adalah **DIBA-aligned** — bawa context, bukan cold query (lihat Lv.4).

## Trigger

### Manual (keyword)
- `nm: <query>` — contoh: `nm: refactor fungsi login ini`
- `nemotron: <query>` — contoh: `nemotron: explain MoE architecture`
- `<query> #nm` — contoh: `debug fungsi ni #nm`

### Auto-route (heavy-code)
DIBA cadangkan Nemotron bila prompt Abam mengandungi:
- `refactor` + kod panjang
- `second opinion`
- `debug kompleks` / `trace bug`
- `optimize` + algoritma
- `code review`
- `analyze code`

Auto-route adalah cadangan — DIBA tanya Abam dulu sebelum route, kecuali Abam dah explicit guna keyword.

## Protokol Eksekusi

### Langkah 1: Kesan trigger
- Semak sama ada prompt ada keyword `nm:`, `nemotron:`, atau `#nm`
- Jika ya → extract query, terus ke Langkah 2
- Jika tidak + heavy-code pattern → cadang kepada Abam: "Nak hantar ke Nemotron juga?"

### Langkah 2: Extract query
- Strip prefix: `nm:` / `nemotron:` → ambil teks selepasnya
- Strip suffix: `#nm` → ambil teks sebelumnya
- Trim whitespace

### Langkah 3: Call script

Script canonical dalam repo ini — `scripts/ask-nemotron.js` (relatif kepada root vault DIBA):

```bash
node "${DIBA_NEMOTRON_SCRIPT:-scripts/ask-nemotron.js}" "<query>"
```

- Default: `scripts/ask-nemotron.js` (dalam repo, jalan di semua mesin)
- Override: set env var `DIBA_NEMOTRON_SCRIPT` jika guna script lain
- Output script: baris pertama `[model: <id>]`, kemudian response — guna untuk label Super/Nano
- Key belum diset → script print setup instruction (exit 0) — tunjuk kepada Abam, teruskan respond sendiri

### Langkah 4: Inject response inline

Format output dalam conversation:

```
[Nemotron Super]
<response dari Nemotron>
```

Jika fallback ke Nano model (rate limit):
```
[Nemotron Nano]
<response>
```

### Langkah 5: Verify gate

- Exit 0 + response ada → inject, teruskan sesi
- Exit 0 + mesej key belum ada → tunjuk setup instruction kepada Abam
- Exit 1 (error) → tunjuk error, jangan block DIBA daripada terus respond

## Config

| Key | Lokasi | Nilai default |
|-----|--------|---------------|
| `OPENROUTER_API_KEY` | env var (JANGAN commit) | (wajib isi — https://openrouter.ai/keys) |
| `NEMOTRON_MODEL` | env var | `nvidia/nemotron-3-super-120b-a12b:free` |
| `NEMOTRON_FALLBACK_MODEL` | env var | `nvidia/nemotron-3-nano-30b-a3b:free` |
| `DIBA_NEMOTRON_SCRIPT` | env var (opsyenal) | `scripts/ask-nemotron.js` |

## Lv.4 — DIBA Alignment & Limit Handoff

### A. DIBA-aligned query (setiap call)

Nemotron tiada memory — jadi DIBA WAJIB bina query yang self-contained:

1. **Prefix context ringkas** (2–4 baris): projek semasa, fail/fungsi terlibat, apa yang dah dicuba
2. **Query Abam** (verbatim atau diperjelas)
3. **Arahan output**: "jawab dalam bahasa yang sama, direct, no filler" — supaya reply Nemotron sepadan persona DIBA

Contoh: Abam taip `nm: kenapa query ni slow` → DIBA hantar:
```
Konteks: projek eWorks (PHP/MySQL), fail lap_inisiatifstaf.php, query JOIN 3 table ~200k rows.
Soalan: kenapa query ni slow — [query]. Jawab direct, bahasa Melayu, cadangan + tradeoff.
```

DIBA kemudian **synthesize** — bukan paste mentah: label `[Nemotron]`, tapis yang tak relevan, tambah pandangan DIBA jika berbeza.

### B. Pre-limit handoff (bila Claude hampir limit)

Bila DIBA nampak usage-limit warning dari harness, ATAU Abam kata "claude limit" / "nemotron takeover" / "guna nemotron je":

1. **Checkpoint dulu** — trigger token-guard checkpoint + update `main/current-session.md` (state, next step)
2. **Commit** — auto-commit memory files
3. **Bagi arahan switch** (1 blok):
   ```
   Claude hampir limit. Sambung dengan Nemotron:
   node scripts/diba-nemotron-chat.js
   ```
4. Fallback chat tu load memory DIBA + persona v3, dan save transcript ke `daily-diary/current/YYYY-MM-DD-nemotron.md`

### C. Catch-up (bila Claude balik)

Di session start, jika wujud `daily-diary/current/*-nemotron.md` untuk 1–2 hari terakhir:
- Baca transcript, cari tanda "untuk Claude-DIBA sambung"
- Surface dalam brief: "Masa limit tadi, Abam sembang dengan Nemotron — ada [N] follow-up"
- Laksanakan follow-up yang jelas; tanya untuk yang ambiguous

### Had jujur (WAJIB faham)

Bila Claude **dah kena limit penuh**, tiada skill boleh auto-fire — Claude terus senyap.
Sebab tu handoff adalah (a) proaktif SEBELUM limit, dan (b) satu-command manual selepas.
JANGAN claim "auto-switch dalam chat yang sama" — itu bukan kuasa harness.

## Peraturan

- JANGAN block conversation Abam jika Nemotron gagal
- JANGAN hantar sensitive info (API keys, credentials) sebagai query
- Nemotron tidak ada memory — setiap call WAJIB self-contained (Lv.4A)
- Guna bahasa yang sama dengan Abam dalam query
- Synthesize response — jangan paste mentah tanpa label dan tapisan

## Level History
- **Lv.1** — Base: keyword trigger (nm:, nemotron:, #nm), script call, inline response, error handling. (Origin: 2026-06-29 — integrasi DIBA × Nemotron via OpenRouter)
- **Lv.2** — Portability: script path via env var `DIBA_NEMOTRON_SCRIPT` (hardcoded `C:/Users/BSM/...` dibuang); PARKED behavior bila env belum diset. (Origin: CTO Phase 2, 2026-07-04)
- **Lv.3** — Self-contained: script `scripts/ask-nemotron.js` masuk repo (zero-dependency, Node 18+, fallback Nano bila rate-limit, setup message bila key tiada). Hanya `OPENROUTER_API_KEY` diperlukan per mesin. (Origin: 2026-07-04, arahan Abam)
- **Lv.4** — DIBA Alignment & Limit Handoff: DIBA-aligned query protocol (context prefix + synthesize), pre-limit handoff (checkpoint → commit → switch arahan), fallback chat `scripts/diba-nemotron-chat.js` (Nemotron jadi DIBA, memory loaded, transcript ke diary), catch-up protocol di session start. Had jujur didokumen: tiada auto-fire selepas limit penuh. (Origin: 2026-07-04, arahan Abam — "nemotron align dgn diba, auto masuk bila claude limit")
