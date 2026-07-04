---
name: auto-idle-save-recall
description: "MUST use when session idle for 20 min, or when user says 'hi diba'. Triggers auto-save diary on idle, and auto-recall last session if greeted."
---

# Auto Idle Save & Recall — DIBA Skill
*Auto-save diary jika idle, auto-recall bila disapa*

## Activation

- Aktif jika tiada aktiviti selama 20 minit (idle session)
- Aktif jika pengguna tulis 'hi diba' atau sapaan serupa

## Context Guard

| Context | Status |
|---------|--------|
| **Idle 20 minit** | ACTIVE — auto-save diary |
| **User greet: 'hi diba'** | ACTIVE — recall last session |
| **Aktiviti aktif <20 minit** | DORMANT |
| **Bukan sapaan** | DORMANT |

## Protocol

### Step 1: Idle Auto-Save
- [ ] Jika tiada aktiviti selama 20 minit, auto-save diary harian
- [ ] Gunakan format dan lokasi diary semasa (current/YYYY-MM-DD.md)
- [ ] Rekod ringkasan aktiviti terakhir sebelum idle

### Step 2: Recall on Greet
- [ ] Jika pengguna tulis 'hi diba', cari dan recall entri diary terakhir
- [ ] Paparkan ringkasan naratif sesi terakhir kepada pengguna

### Step 3: Confirm
- [ ] Papar notifikasi auto-save atau recall kepada pengguna
- [ ] Laporkan tindakan yang telah dibuat

## Mandatory Rules
1. Jangan pernah overwrite entri diary lama — hanya append.
2. Jangan recall jika tiada entri diary terakhir.
3. Sentiasa utamakan privasi dan tidak paparkan maklumat sensitif tanpa kebenaran.

---

## Lv.2 — Time-Aware Greeting

- "hi diba" dan variasi ("morning diba", "diba", "assalamualaikum diba", "yo diba") → greeting ikut waktu tempatan (pagi/tengah hari/petang/malam)
- Malam lewat (> 11pm) + sesi panjang → selit nota `break-reminder` ringkas, jangan berleter

## Lv.3 — Checkpoint on Idle

- Idle save bukan diary sahaja: jika sesi tengah kerja aktif (ada task belum siap) → tulis juga checkpoint ringkas ke `main/current-session.md` (apa sedang buat, langkah seterusnya)
- Chain `token-guard` checkpoint format — sesi terputus selepas idle boleh resume tepat

## Lv.4 — Idle Heuristics

Bukan semua senyap = idle:
| Situasi | Tindakan |
|---------|----------|
| Idle 20 min, tiada task tergantung | Auto-save diary biasa |
| Idle tapi task masih berjalan (background/tool panjang) | JANGAN save — tunggu task selesai |
| Idle < 20 min | DORMANT |
| Idle berulang kali dalam satu sesi | Save sekali sahaja per gap — jangan spam entri |

## Lv.5 — Recall Depth

"hi diba" recall bukan dump — mini-brief bertingkat:
1. 1 baris greeting ikut waktu
2. 2-3 baris: sesi lepas buat apa (dari diary/current-session)
3. 1 baris open loop paling penting (reminder overdue ATAU carry-over)
4. Habis. Abam nak lebih → "brief penuh" trigger `chief-of-staff`

## Lv.6 — Open-Loops Continuity

- Setiap idle save sertakan seksyen `**Open loops:**` — senarai pendek benda belum habis (max 3)
- Greet recall berikutnya baca open loops dari entri terakhir → surface terus: "tadi tengah [X], nak sambung?"
- Loop yang disambung dan siap → tanda selesai dalam entri baru; jangan biar loop zombie berulang

---

## Level History
- **Lv.1** — Base: idle 20-min auto-save diary, greet recall, confirm notification, append-only rules. (Origin: skill asal, dipindah ke dir sendiri 2026-07-04 CTO Phase 2)
- **Lv.2** — Time-Aware Greeting: variasi sapaan + waktu tempatan + nota break malam. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Checkpoint on Idle: current-session checkpoint bila ada task tergantung. (Origin: 2026-07-04)
- **Lv.4** — Idle Heuristics: bezakan idle sebenar vs task berjalan; anti-spam entri. (Origin: 2026-07-04)
- **Lv.5** — Recall Depth: mini-brief 4-baris bertingkat, chain chief-of-staff untuk penuh. (Origin: 2026-07-04)
- **Lv.6** — Open-Loops Continuity: open loops dalam setiap save, surface pada greet, tiada loop zombie. (Origin: 2026-07-04)
