---
name: weekly-review
description: "MUST use when Abam minta 'GTD review', 'audit komitmen', 'apa yang
             stalled', 'clear semua open loop', atau 'trusted system check'. Ini
             audit peribadi gaya GTD (get clear/current/creative) — BERBEZA dari
             chief-of-staff 'weekly review' (brief prioriti projek). Guna skill ni
             bila Abam explicitly nak audit sistem sendiri, bukan sekadar brief."
---

# Weekly Review — GTD Trusted-System Audit
*Bukan brief projek — ini audit sama ada sistem "ingat semua benda" masih boleh dipercayai.*

## Activation

Bila skill ini aktif, output:

`🔄 Weekly Review (GTD) — Get Clear → Get Current → Get Creative`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam explicitly minta GTD-style audit komitmen** | ACTIVE — penuh protokol |
| **Abam minta "weekly review" biasa (brief projek)** | DORMANT — itu chief-of-staff punya, bukan skill ini |
| **Sesi kerja biasa tanpa audit diminta** | DORMANT |

## Protocol

### Step 1: Get Clear
- [ ] Scan semua "open loop" — reminders.md, current-session.md, decisions.md pending, projects/active — apa-apa item separuh siap
- [ ] Senaraikan tanpa proses dulu — kumpul semua dulu sebelum susun

### Step 2: Get Current
- [ ] Untuk setiap item, semak status sebenar (bukan andaian): STALLED (tiada progress 14+ hari), NO-NEXT-ACTION (item wujud tapi tiada langkah seterusnya jelas), atau OK
- [ ] Kira health score kasar 0-100 berdasarkan nisbah item OK vs STALLED/NO-NEXT-ACTION → label: HEALTHY (≥70), DRIFTING (40-69), OVERCOMMITTED (<40)

### Step 3: Get Creative
- [ ] Untuk item STALLED — tanya: still relevant? butuh unblock apa? patut jadi SOMEDAY (parking) atau drop terus?
- [ ] Cadangkan 1-3 tindakan konkrit untuk minggu depan berdasarkan gap yang ditemui

### Step 4: Gate (wajib, bukan self-certify)
- [ ] Semak 10 kawasan: reminders, projek aktif, decisions pending, post-mortems terbuka, current-session carry-over, routines, library items tak diproses, signal-buffer belum di-process, diary entries minggu ini, dan komitmen luar sistem (kalau Abam sebut)
- [ ] Setiap kawasan yang tak lengkap disemak → nyatakan nama gap eksplisit, JANGAN self-certify "semua OK" tanpa bukti
- [ ] Exit hanya "COMPLETE" bila semua 10 kawasan disemak; kalau tidak — "INCOMPLETE: [senarai gap]"

## Mandatory Rules

1. **Tiga fasa GTD berurutan** — Clear sebelum Current sebelum Creative, jangan skip terus ke cadangan tanpa audit dulu
2. **Health score perlu bukti** — nisbah item OK/STALLED, bukan agakan "rasa OK je"
3. **Tiada self-certification** — gate mesti nyatakan gap sebenar kalau ada, tak boleh declare "COMPLETE" tanpa semua 10 kawasan disemak

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Abam sebut "weekly review" tanpa konteks GTD eksplisit** | Default ke `chief-of-staff` punya weekly review (brief projek) — skill ini hanya bila diminta khusus audit peribadi |
| **Item OVERCOMMITTED health score** | Nyatakan terus terang, cadang drop/park beberapa item, jangan cuba muat semua |
| **Tiada data 14 hari (projek baru)** | Nyatakan "belum cukup data untuk staleness check", jangan reka status |

## Level History
- **Lv.1** — Base: GTD 3-phase (Clear/Current/Creative), commitment auditor (STALLED/NO-NEXT-ACTION/health score), 10-area gate tanpa self-certification. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `productivity/weekly-review`, dipisahkan eksplisit dari `chief-of-staff` punya weekly review supaya tiada trigger-phrase collision — ini audit sistem peribadi, bukan brief prioriti projek)
