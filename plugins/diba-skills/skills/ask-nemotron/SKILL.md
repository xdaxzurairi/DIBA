---
name: ask-nemotron
description: 'Route query ke Nemotron AI via OpenRouter. Trigger: nm:, nemotron:, #nm dalam prompt, atau auto-route task heavy-code. Response inline berlabel [Nemotron].'
---

# Ask Nemotron — DIBA × Nemotron Integration

Second AI untuk DIBA. Nemotron (NVIDIA via OpenRouter) dipanggil inline dan respond berlabel `[Nemotron]`.

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

```bash
node C:/Users/BSM/XDIBAX/scripts/ask-nemotron.js "<query>"
```

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
| `OPENROUTER_API_KEY` | `war-room/.env` | (wajib isi) |
| `NEMOTRON_MODEL` | `war-room/.env` | `nvidia/nemotron-3-super-120b-a12b:free` |

## Peraturan

- JANGAN block conversation Abam jika Nemotron gagal
- JANGAN hantar sensitive info (API keys, credentials) sebagai query
- Nemotron tidak ada memory — setiap call adalah fresh context
- Guna bahasa yang sama dengan Abam dalam query

## Level History
- **Lv.1** — Base: keyword trigger (nm:, nemotron:, #nm), script call, inline response, error handling. (Origin: 2026-06-29 — integrasi DIBA × Nemotron via OpenRouter)
