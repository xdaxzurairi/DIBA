---
name: usage-tracker
description: "MUST use to track Claude Code token usage and estimated cost — see where the
             AI budget is going. Auto-triggers on 'ccusage', 'usage', 'berapa token',
             'kos token', 'token cost', 'budget AI', 'usage report', 'berapa habis',
             'track spending', 'cost estimate'. Reports tokens per session/model and
             estimated MYR/USD cost, and flags expensive patterns. Distinct from token-guard
             (which manages the live context window) — this one tracks spend over time."
---

# Usage Tracker — DIBA AI Budget Meter
*Ke mana token pergi. Berapa habis. Jimat dengan bukti, bukan agak.*

## Activation

Bila skill aktif, output: `"Usage Tracker aktif — mengira token & anggaran kos."`

Kemudian laksana Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **"ccusage", "usage report", "berapa token", "kos token"** | ACTIVE — full report |
| **"Budget AI", "berapa habis", "track spending"** | ACTIVE — cost estimate |
| **Hujung sesi berat (banyak tool call)** | ACTIVE — log usage sesi |
| **"Usage status"** | ACTIVE — quick meter 3 baris |
| **Sesi ringan biasa** | DORMANT — jangan ganggu |
| **"Usage tracker off"** | EXIT — deaktif |

---

## Pricing Reference (per 1M token, USD)

> Kadar rasmi Anthropic berubah — sahkan dengan skill `claude-api` bila perlu ketepatan tinggi. Nilai ini untuk anggaran belanjawan.

| Model | Input | Output | Guna DIBA |
|-------|-------|--------|-----------|
| **Fable 5** | ~$5 | ~$25 | Task berat / orchestration |
| **Sonnet 5** | ~$3 | ~$15 | Kerja harian (Medium tier) |
| **Haiku 4.5** | ~$1 | ~$5 | Lookup / Simple tier |
| **Opus 4.8** | ~$15 | ~$75 | Strategik / fast mode |

Prompt cache: read ~10% harga input; cache write ~125%. FX lalai: **1 USD ≈ 4.7 MYR** (Abam boleh override).

---

## Protocol

### Step 1: Gather
- [ ] Anggar token sesi: input (fail dibaca + prompt) + output (respons)
- [ ] Estimasi: ~1 token / 4 aksara, atau ~0.75 token / perkataan
- [ ] Kenal pasti model digunakan (chain `smart-effort` tier jika ada)
- [ ] Kira tool call count sebagai proksi keamatan

### Step 2: Compute Cost
- [ ] `kos = (input_tok/1M × harga_in) + (output_tok/1M × harga_out)`
- [ ] Ambil kira cache jika applicable (read 10%)
- [ ] Tukar ke MYR guna FX

### Step 3: Log
- [ ] Append ke `memories/usage/usage-log.jsonl` (satu baris/sesi):

```json
{"date":"YYYY-MM-DD","session":"[id/tajuk]","model":"sonnet-5","in_tok":45000,"out_tok":12000,"tool_calls":38,"cost_usd":0.315,"cost_myr":1.48}
```

### Step 4: Report
```
Usage — [sesi/tempoh]
────────────────────
Model:   [model]  (tier: [smart-effort])
Tokens:  in ~[N] · out ~[N]  (tool calls: [N])
Kos:     ~$[USD]  (~RM[MYR])
Tempoh:  hari ini RM[X] · bulan ini RM[Y]
```

### Step 5: Flag Waste
Kesan pola mahal & cadang jimat:

| Pola | Kesan | Cadangan |
|------|-------|----------|
| Baca fail besar berulang | Input token tinggi | Chain `project-map` / targeted read |
| Output panjang berulang | Output token tinggi (5× input!) | Chain `token-guard` compact |
| Model berat untuk task ringan | Kos 5–15× | Chain `smart-effort` → haiku |
| Tiada cache reuse | Bayar penuh input | Kekalkan konteks stabil |

### Step 6: Confirm
- [ ] Report meter 3 baris + 1 cadangan jimat teratas (jika ada waste)

---

## Mandatory Rules

1. **Anggaran, bukan bil rasmi** — sentiasa label "~anggaran"; sahkan kadar dengan `claude-api` untuk ketepatan
2. **Output token mahal** — ingatkan output ~5× harga input; ringkas = jimat besar
3. **Log append-only** — `usage-log.jsonl` tidak ditulis semula; satu baris/sesi
4. **FX boleh override** — Abam set kadar MYR; jangan hardcode buta
5. **Bukan token-guard** — skill ini jejak *belanja tempoh*; token-guard urus *tetingkap konteks langsung*
6. **Cadang jimat konkrit** — setiap waste flag mesti ada skill chain penyelesaian
7. **Privasi** — log simpan angka & tajuk sahaja, bukan kandungan sensitif

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Token sebenar tak diketahui | Guna anggaran aksara/perkataan; label "~est" |
| Kadar harga berubah | Sahkan dengan `claude-api`; update jadual pricing |
| Berbilang model satu sesi | Kira per-model, jumlahkan; tunjuk pecahan |
| Abam nak laporan bulanan | Aggregate `usage-log.jsonl` ikut bulan |
| Cache hit tinggi | Diskaun input ke ~10%; nota penjimatan cache |
| Tiada log lepas (sesi pertama) | Cipta log; report sesi semasa sahaja |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `smart-effort` | Setiap sesi | Tier model = input untuk pengiraan kos |
| `token-guard` | Usage tinggi dikesan | Cadang compact mode untuk potong output token |
| `project-map` | Baca fail berulang mahal | Ganti dengan query map |
| `claude-api` | Perlu kadar/pricing tepat | Rujuk model id + harga rasmi |
| `save-diary` | Hujung sesi | Sertakan ringkasan usage dalam diari sesi berat |

---

## Lv.2 — Auto-Log di EOD

- Chain dari `chief-of-staff` EOD wrap: log usage sesi automatik tanpa diminta — satu baris jsonl, senyap
- Sesi tanpa EOD (terputus) → log pada sesi berikutnya dengan tag `"recovered":true`
- Manual "log usage" tetap ada untuk mid-session

## Lv.3 — Trend Reports

- `usage minggu ini` / `usage bulan ini` → aggregate `usage-log.jsonl`:
  - Jumlah kos MYR/USD, pecahan per model, purata per sesi
  - **Top-3 sesi termahal** dengan sebab (tool calls tinggi? output panjang? model berat?)
  - Banding tempoh sebelum: `↑12%` / `↓8%` — 1 baris
- Tiada data cukup → kata terus, jangan extrapolate dari 2 data point

## Lv.4 — Budget Alerts

- Abam set budget: "budget AI RM[X] sebulan" → simpan dalam `memories/usage/budget.md`
- Setiap log baru semak kumulatif bulan:
  - ≥ 70% → 1 baris nota dalam report seterusnya
  - ≥ 90% → warning proaktif + cadang mode jimat (haiku tier, compact, local fallback)
  - ≥ 100% → sebut setiap sesi sehingga bulan baru / budget diubah
- Tiada budget diset → tiada alert; jangan cipta budget sendiri

## Lv.5 — Efficiency Score

Kos bersendirian tak bermakna — ukur nilai:
- Per sesi: kos ÷ output konkrit (commit, fail diubah, keputusan dilog, PR)
- Weekly: `RM[X] / [N] commits` — trend naik = makin mahal per hasil → siasat kenapa
- Sesi mahal TANPA artifact → flag jujur: "RM[X] habis, tiada output konkrit — sesi explore/debug?"
- Jangan gamify — score ini isyarat siasatan, bukan KPI untuk dikejar buta

## Lv.6 — Advisor Mode

- Data usage masuk `chief-of-staff` weekly review automatik: belanja minggu, trend, 1 cadangan jimat teratas
- Cadangan sentiasa konkrit + boleh diambil tindakan: "sesi eWorks banyak baca fail besar berulang — buat project-map sekali, jimat ~RM[X]/minggu"
- Pattern belanja berubah mendadak (3× purata) → siasat dan report punca, bukan hanya angka
- Local fallback (`diba-fallback-chat.js`) digunakan → nota penjimatan berbanding cloud

---

## Level History

- **Lv.1** — Base: token estimate (in/out), pricing reference multi-model, cost compute USD+MYR, log ke `memories/usage/usage-log.jsonl`, waste flagging dengan skill chain, FX override. (Origin: 2026-07-03 — isi jurang "ccusage")
- **Lv.2** — Auto-Log: log automatik di EOD wrap via chief-of-staff. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Trend Reports: aggregate mingguan/bulanan + top-3 termahal. (Origin: 2026-07-04)
- **Lv.4** — Budget Alerts: threshold 70/90/100% budget Abam. (Origin: 2026-07-04)
- **Lv.5** — Efficiency Score: kos per artifact, flag sesi mahal tanpa output. (Origin: 2026-07-04)
- **Lv.6** — Advisor Mode: feed weekly review + cadangan konkrit + anomali siasat. (Origin: 2026-07-04)

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
