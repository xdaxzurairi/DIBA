# Echo Recall System

**Status:** Active  
**Skill:** `echo-recall`  
**Versi:** Lv.2 — Superultra Edition

## Tujuan

Sistem recall ingatan yang mencari diary entries lalu dan mempersembahkan hasilnya sebagai **perbualan semula jadi** — bukan output database. Memberi DIBA "long-term memory" yang merentasi context window.

Prinsip utama: **search sebelum cakap, narrate dari bukti, tanya bila tidak pasti.**

---

## Cara Kerja

```
Abam tanya tentang perkara lalu
→ Extract keywords dari soalan
→ Search diary: current/ → archived/ → decisions.md → current-session.md
→ Jumpa match → Narrate sebagai bahasa semula jadi
→ Tiada match → Tanya Abam untuk clarify
→ Post-recall: link seed atau surface follow-up jika berkaitan
```

---

## Three-Level System

| Level | Nama | Tindakan |
|-------|------|----------|
| **1** | Search & Narrate | Cari keyword dalam diary, papar sebagai naratif |
| **2** | Uncertainty Guard | Tidak pasti = nyatakan, bukan fabricate |
| **3** | Ask-User Fallback | Tiada hasil = tanya Abam untuk narrow down |

---

## Search Priority

| Priority | Lokasi | Keterangan |
|----------|--------|------------|
| 1 | `daily-diary/current/*.md` | Entry terkini — paling relevan |
| 2 | `daily-diary/archived/YYYY-MM/*.md` | Bulan-bulan lepas |
| 3 | `main/decisions.md` | Keputusan penting yang dilog |
| 4 | `main/current-session.md` | Recap sesi terkini |

---

## Output Format

### Satu match
```
Ya, ingat. Pada [tarikh], kita [summary ringkas].
[Keputusan atau insight utama].
[Soalan sambungan jika relevan]
```

### Beberapa match
```
Ada [N] sesi berkaitan:
[Tarikh 1] — [summary]
[Tarikh 2] — [summary]

Yang paling dekat nampaknya [tarikh]. Nak DIBA detail lebih?
```

### Tiada match
```
Tak jumpa catatan tentang itu. Ingat projek mana atau kira-kira bila?
```

---

## Output Kuat vs Lemah

| Lemah | Kuat |
|-------|------|
| "Search result 1: line 42..." | "Pada 15 Mac, kita debug timeout dalam auth..." |
| "Ya, pernah buat tu." (tanpa bukti) | "Jumpa dalam diary 15 Mac — [summary]" |
| "Tak ingat." | "Tak jumpa dalam log. Abam ingat projek mana?" |
| List semua match | Tunjuk 1–3 yang paling relevan |

---

## Triggers

| Trigger | Contoh |
|---------|--------|
| `do you remember...` | "Do you remember when we fixed the login bug?" |
| `Diba ingat tak...` | "Diba ingat tak kita buat apa dengan auth?" |
| `when did we...` | "When did we set up the CI pipeline?" |
| `recall...` | "Recall our API discussion" |
| `what did we decide about...` | "What did we decide about the database?" |
| `last time we...` | "Last time we touched this file..." |
| `cari dalam diary` | "Cari dalam diary pasal eWorks" |

---

## Hubungan Skill

| Skill | Hubungan |
|-------|----------|
| `save-diary` | Sumber utama — kualiti recall bergantung pada kualiti entry |
| `session-briefing` | Brief surface sesi terkini; echo-recall untuk recall mendalam |
| `resonance` | Link hasil recall kepada seed jika berkaitan |
| `diba-recall` | Handoff bila recall perlu scope lebih luas |
| `log-decision` | Semak decisions.md bila soalan tentang keputusan penting |

---

## Keperluan

- `daily-diary/` dengan entry bertarikh — diperlukan
- Kualiti recall bergantung pada kualiti entry diary — entry yang lebih kaya memberi recall yang lebih baik
- Install `save-diary` dahulu untuk hasil terbaik

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/echo-recall.md`
2. Pastikan `daily-diary/` ada dengan entry bertarikh
3. Verify: tanya "Do you remember..." — DIBA patut search diary sebelum jawab


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
