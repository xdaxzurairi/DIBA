---
name: tech-debt-tracker
description: "MUST use when Abam sebut 'tech debt', 'hutang teknikal', 'apa patut
             refactor dulu', 'prioritize cleanup', atau bila DIBA sendiri perasan
             pattern messy berulang dalam kod semasa kerja lain."
---

# Tech Debt Tracker — Scan, Prioritize, Trend
*Hutang teknikal yang tak ditrack hanya bertambah senyap-senyap.*

## Activation

Bila skill ini aktif, output:

`📊 Tech Debt scan — [scope]`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta scan/prioritize tech debt** | ACTIVE — penuh protokol |
| **DIBA perasan pattern messy berulang semasa kerja lain** | ACTIVE — tawar log ringkas, jangan interrupt kerja utama |
| **Kerja fokus fix/feature biasa tanpa isu struktur** | DORMANT |

## Protocol

### Step 1: Scan
- [ ] Kenal pasti kawasan berisiko: fail besar tak diselenggara, TODO/FIXME comment lama, kod duplicate, pattern inconsistent antara fail sama fungsi
- [ ] Catat setiap item: lokasi, jenis (duplication/complexity/outdated pattern/missing test), impak kalau tak dibetulkan

### Step 2: Prioritize (WSJF-ringkas)
- [ ] Untuk setiap item, nilai: **Cost of Delay** (kesan kalau lambat dibetulkan — bug risk, kelajuan kerja masa depan) vs **Job Size** (usaha nak fix)
- [ ] Skor mudah = Cost of Delay ÷ Job Size — tinggi = prioriti dulu
- [ ] Elak dua perangkap: analysis paralysis (jangan skor semua item sampai sesi habis) dan perfectionism (tak semua debt perlu fix — sesetengah "cukup baik untuk sekarang")

### Step 3: Dashboard Ringkas
- [ ] Senarai top-5 item ikut skor, dengan status: New / Tracked / Resolved
- [ ] Simpan trend: item baru dikesan vs item resolved sejak scan lepas (kalau ada rekod sebelumnya dalam sesi/projek)

### Step 4: Laporkan
- [ ] Cadangkan 1-3 item untuk ditangani sekarang, dengan sebab (bukan senarai penuh — recommend, don't enumerate)

## Mandatory Rules

1. **Bukan semua debt perlu fix** — DIBA prioritize, tak assume semua item automatik jadi kerja
2. **Jangan interrupt kerja utama** — kalau debt dikesan semasa fix/feature lain, tawar log untuk lain kali, jangan pesong fokus semasa
3. **Skor mesti ada asas** — setiap prioriti tunjuk cost-of-delay & job-size ringkas, bukan agak

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Projek tiada tech-debt log sedia ada** | Cadang mula senarai ringkas dalam projek berkaitan (`projects/active/[nama]/tech-debt.md` jika Abam nak) |
| **Debt terlalu besar untuk fix cepat (major refactor)** | Cadang pecah jadi kerja berperingkat, rujuk `orchestrate` jika perlu koordinasi multi-langkah |
| **Item debt lama tak disentuh berbulan** | Tanya Abam: masih relevan atau boleh drop dari senarai |

## Level History
- **Lv.1** — Base: scan kawasan berisiko, prioritize WSJF-ringkas, dashboard trend top-5. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/skills/tech-debt-tracker`, dipermudah dari tool-driven scan+dashboard penuh ke protokol reasoning yang scan semasa kerja sebenar dijalankan)
