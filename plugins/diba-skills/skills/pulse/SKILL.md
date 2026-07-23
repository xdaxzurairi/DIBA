---
name: pulse
description: "MUST use when Abam minta 'apa yang orang cakap pasal X sekarang',
             'sentiment terkini', 'trend minggu ni', 'check reddit/HN pasal', atau
             'quick research recency' — carian pantas merentas sumber dalam tempoh
             masa tertentu (default 30 hari). Berbeza dari deep-research (lebih ringan,
             fokus recency/sentiment, bukan penyiasatan menyeluruh)."
---

# Pulse — Recency & Sentiment Research
*Apa yang sedang dicakapkan sekarang, bukan kebenaran sejarah menyeluruh.*

## Activation

Bila skill ini aktif, output:

`📡 Pulse — [topik] (tempoh: [window])`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta sentiment/trend/recency check pantas** | ACTIVE |
| **Abam minta penyiasatan mendalam bertingkat (multi-source triangulation)** | DORMANT — guna `deep-research` |
| **Soalan fakta statik (bukan "apa yang tengah berlaku")** | DORMANT |

## Protocol

### Step 1: Intake (max 4 soalan, satu-satu, hanya bila perlu)
- [ ] Topik cukup spesifik? Kalau terlalu luas, tanya nak fokus apa
- [ ] Ada angle tertentu (sentiment/kontroversi/gunaan praktikal)?
- [ ] Tempoh masa — default 30 hari kalau tak dinyatakan
- [ ] Platform scope — Reddit/HN/Web umum/X jika ada akses

### Step 2: Search Loop
- [ ] Guna WebSearch/WebFetch merentas sumber yang dibenarkan — catat setiap query dihantar
- [ ] Kumpul sumber yang benar-benar dalam tempoh window (buang yang lapuk)

### Step 3: Citation Audit (3-count)
- [ ] Berapa query dihantar
- [ ] Berapa sumber diterima/dibaca
- [ ] Berapa sumber benar-benar dipetik dalam sintesis akhir
- [ ] Nyatakan ketiga-tiga angka ini secara jujur — jangan tunjuk lebih sumber daripada yang benar dibaca

### Step 4: Sintesis
- [ ] Ringkaskan: konsensus (apa majoriti setuju), kontroversi (mana ada perbezaan pendapat), pain points, excitement/hype, trend baru muncul
- [ ] Setiap poin sintesis ada sumber rujukan

### Step 5: Never Fail Silent
- [ ] Kalau carian gagal/tak jumpa cukup sumber — laporkan dengan jujur ("hanya jumpa X sumber, kualiti data terhad"), JANGAN hantar hasil kosong tanpa penjelasan

## Mandatory Rules

1. **Citation audit wajib setiap kali** — 3 angka (sent/received/cited) mesti dilaporkan, bukan hanya hasil akhir
2. **Tiada fabrication sumber** — setiap klaim dalam sintesis mesti boleh dikesan ke sumber sebenar dibaca
3. **Max 4 soalan intake, satu-satu** — jangan bombard Abam dengan borang soalan sekali gus
4. **Jangan hantar fail/output kosong** — kalau gagal, laporkan sebab gagal

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Topik terlalu niche — sumber sangat sedikit** | Laporkan had data terus terang, jangan paksa sintesis dari sumber tak mencukupi |
| **X/Twitter tak accessible** | Skip platform tu, nyatakan dalam citation audit yang platform ni tak discan |
| **Abam nak penyiasatan lebih dalam selepas pulse** | Cadang eskalasi ke `deep-research` |

## Level History
- **Lv.1** — Base: 4-question intake, multi-source search loop, 3-count citation audit, konsensus/kontroversi/trend synthesis, never-fail-silent rule. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `research/pulse`, dipetakan ke WebSearch/WebFetch DIBA sedia ada tanpa Reddit/HN API khusus)
