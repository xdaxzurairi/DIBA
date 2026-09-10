---
name: auto-learn
description: "Proses signal-buffer.md jadi pengetahuan kekal (facts/cases/rules) dan
             kemaskini learned-index.md. Trigger: 'extract lessons', 'process buffer',
             'learn from today', 'what did we learn', 'update learned'. Auto-chain
             selepas 'eod' atau 'save diary'."
---

# Auto Learn — Signal-to-Knowledge Loop
*Signal dikutip sepanjang sesi; auto-learn tukar jadi ingatan yang boleh dipakai semula.*

## Activation

Bila skill ini aktif, proses `main/signal-buffer.md` sepenuhnya — jangan tinggal separuh.

---

## Context Guard

| Context | Status |
|---------|--------|
| **"extract lessons" / "process buffer" / "learn from today"** | ACTIVE — full extraction |
| **"what did we learn" / "update learned"** | ACTIVE — full extraction |
| **"eod" / "save diary" selesai** | ACTIVE — auto-chain lepas save |
| **signal-buffer.md kosong** | DORMANT — laporkan "tiada signal baru", jangan reka |
| **Mid-sesi tanpa trigger** | DORMANT — signal terus capture (micro), tiada processing berat |

---

## Protocol

### Step 1: Baca Buffer
- [ ] Baca `main/signal-buffer.md` — format baris: `| [timestamp] | [type] | [raw signal] |`
- [ ] Kosong → laporkan ringkas, stop di sini

### Step 2: Klasifikasi Setiap Signal
Untuk setiap baris, tentukan destinasi:

| Type signal | Destinasi |
|---|---|
| Koreksi Abam ("jangan buat X") | `library/learned/rules.md` |
| Setuju non-obvious ("betul tu, teruskan") | `library/learned/rules.md` |
| Fakta baru tentang projek/sistem | `library/learned/facts.md` |
| Kes konkrit (bug + fix, insiden) | `library/learned/cases.md` |
| Tool fail / uncertain language DIBA | `library/learned/rules.md` (self-correction) |

### Step 3: Tulis ke Semantic Store
- [ ] Append entri baharu ke fail sasaran dalam `library/learned/` — format ringkas: `- [tarikh] [signal diringkas] — [why/kesan]`
- [ ] Jangan duplicate — semak entri sedia ada dahulu, gabung jika overlap
- [ ] Kekalkan ringkas — satu baris satu pengajaran, bukan esei

### Step 4: Kemaskini In-Context Index
- [ ] Kemaskini `main/learned-index.md` — **had 80 baris**, ini yang di-load setiap sesi
- [ ] Jika melebihi had, buang entri paling lama/kurang relevan dahulu (bukan potong entri baru)
- [ ] Index = ringkasan pointer, bukan kandungan penuh — rujuk fail `library/learned/*.md` untuk detail

### Step 5: Bersihkan Buffer
- [ ] Selepas semua signal diproses dan disahkan tertulis → kosongkan `main/signal-buffer.md`
- [ ] Jangan clear buffer sebelum tulis berjaya disahkan

### Step 6: Laporkan
```
Auto-learn selesai — [N] signal diproses
→ rules.md: [n] · facts.md: [n] · cases.md: [n]
learned-index.md: [baris semasa]/80
```

---

## Mandatory Rules

1. **Jangan proses buffer separuh** — habiskan semua baris atau nyatakan sebab tak boleh
2. **Jangan duplicate entri** — semak dahulu sebelum tulis
3. **Index ada had ketat 80 baris** — pointer sahaja, bukan dump kandungan
4. **Jangan clear buffer sebelum confirm tulis berjaya**
5. **Buffer kosong ≠ error** — laporkan terus, jangan reka signal

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `save-diary` | Signal capture berlaku sepanjang sesi; auto-learn chain lepas save-diary/eod |
| `echo-recall` | `learned-index.md` di-load Priority 0 setiap sesi via echo-recall/session start |
| `discipline` | Pelanggaran undang-undang berulang → jadi signal untuk auto-learn (rules.md) |
| `forge-skill` | Pattern dalam rules.md berulang 3+ kali → cadangkan forge-skill buat skill baharu |

---

## Level History
- **Lv.1** — Base: baca signal-buffer.md, klasifikasi ke facts/cases/rules, kemaskini learned-index.md (had 80 baris), clear buffer selepas confirm. (Origin: 2026-08-01 — CLAUDE.md rujuk auto-learn sebagai skill aktif tapi fail tiada, dicipta untuk tutup gap)
- **Lv.2** — Proactive Mid-Session Flush: bila signal-buffer capai ambang (~15 baris) sebelum eod, auto-tawar proses awal, bukan tunggu explicit trigger. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
- **Lv.3** — Cross-Reference Dedup: semak rules.md/facts.md/cases.md merentas ketiga fail (bukan hanya fail sasaran) untuk elak overlap/kontradiksi antara kategori. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
- **Lv.4** — Forge-Skill Bridge (dua-hala): pattern rules.md berulang 3+ kali auto-trigger cadangan `forge-skill`, bukan hanya rujukan pasif dalam Integrasi table. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
