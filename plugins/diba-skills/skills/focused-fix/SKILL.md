---
name: focused-fix
description: "MUST use when Abam minta betulkan bug/feature yang rosak dalam kod sedia
             ada — trigger pada 'fix bug ni', 'kenapa X tak jalan', 'repair this feature',
             'ada something wrong dengan', atau bila code-sharp/systematic-debugging
             sudah confirm root cause tapi fix belum ditulis. Disiplin scope-trace-diagnose-fix-verify
             untuk elak fix cetek yang patch simptom je."
---

# Focused Fix — Disiplin Scope→Trace→Diagnose→Fix→Verify
*Fix yang betul-betul selesaikan punca, bukan tampal simptom.*

## Activation

Bila skill ini aktif, output:

`🔧 Focused Fix — scope dulu sebelum sentuh kod.`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam laporkan bug/feature rosak yang perlu fix** | ACTIVE — penuh protokol |
| **Root cause dah confirm (dari systematic-debugging) tapi fix belum ditulis** | ACTIVE |
| **Kerja baru (feature belum wujud)** | DORMANT — bukan repair, guna code-sharp terus |
| **Refactor tanpa bug** | DORMANT |

## Protocol

### Step 1: SCOPE
- [ ] Nyatakan dengan tepat apa yang patut jadi vs apa yang jadi sekarang
- [ ] Kenal pasti fail/fungsi yang disyaki terlibat — jangan buka semua fail sekali
- [ ] Tolak scope creep — kalau Abam sebut isu lain semasa fix ni, catat berasingan, jangan gabung

### Step 2: TRACE
- [ ] Ikut aliran data/kawalan sebenar dari trigger sampai output rosak (bukan agak)
- [ ] Guna Grep/Read untuk sahkan setiap lonjakan andaian — jangan cakap "mungkin sebab X" tanpa baca kod X

### Step 3: DIAGNOSE
- [ ] Nyatakan punca akar (root cause) dalam satu ayat — bukan simptom
- [ ] Label risiko fix yang dicadang: **HIGH** (sentuh logik teras/data), **MED** (sentuh flow tapi isolated), **LOW** (fail tunggal, efek terhad)
- [ ] Kalau selepas trace masih tak jumpa punca — declare strike, jangan teka-teka rambang

### Step 4: FIX
- [ ] Fix punca akar, bukan gejala — kalau fix hanya sorok simptom, kembali ke Step 2
- [ ] Fix sekecil mungkin yang selesaikan punca — tiada refactor tambahan tanpa diminta

### Step 5: VERIFY
- [ ] Jalankan/test semula senario yang gagal asal — sahkan betul-betul selesai
- [ ] Semak tiada regresi pada flow berkaitan berdekatan
- [ ] Confirm ke Abam dengan bukti (test result/output), bukan tanggapan

## Mandatory Rules

1. **Iron Law**: tiada fix ditulis sebelum Scope → Trace → Diagnose selesai
2. **3-strike rule**: 3 percubaan diagnose gagal tanpa punca jelas → stop, laporkan pada Abam apa yang sudah disiasat dan kenapa masih buntu — jangan terus cuba fix rawak
3. **Tiada retroactive rationalization** — kalau fix "berjaya" tapi sebab tak jelas kenapa ia berjaya, itu bukan fix, itu nasib. Verify punca, bukan hasil sahaja

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Bug tak dapat direproduce** | Minta Abam untuk langkah reproduce tepat sebelum scope — jangan agak |
| **Fix memerlukan sentuh banyak fail** | Naikkan risiko ke HIGH, beritahu Abam sebelum proceed, cadang worktree berasingan jika besar |
| **Root cause di luar kawalan (third-party/API)** | Nyatakan dengan jelas, cadang mitigation/workaround, bukan fix ilusi |
| **Fix berjaya tapi punca masih tak jelas** | Jangan tutup — flag sebagai risiko regresi masa depan |

## Level History
- **Lv.1** — Base: disiplin Scope→Trace→Diagnose→Fix→Verify, 3-strike escalation, risk labelling. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/skills/focused-fix`, disesuaikan sebagai protokol reasoning bercek, bukan command-pipeline berasingan)
