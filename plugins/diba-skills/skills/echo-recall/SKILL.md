---
name: echo-recall
description: 'Search and recall past sessions, decisions, and project memory with
             narrative answers. Use when user says: "Do you remember...", "When did
             we...", "Recall...", "ingat semula", "load context", "What did we decide
             about...", "Last time we...", "Earlier you said...", or "Diba ingat
             tak...". Also handles workspace recall — loading project-specific memory
             via projects/registry.md when working outside the DIBA vault.'
---

# Echo Recall — Memory Search & Narrate
*Mencari dalam ingatan. Kisah lama hidup semula.*

## Activation

When this skill activates, output nothing — terus execute protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **"Do you remember..." / "Diba ingat tak..."** | ACTIVE — full recall search |
| **"When did we..." / "Bila kita..."** | ACTIVE — full recall search |
| **"Recall..." / "ingat semula" / "What did we decide about..."** | ACTIVE — full recall search |
| **"Last time we..." / "Earlier you said..."** | ACTIVE — full recall search |
| **"check our history" / "cari dalam diary"** | ACTIVE — full recall search |
| **"load context" / session start di workspace luar** | ACTIVE — workspace recall (Step 0) |
| **Mid-conversation tanpa trigger** | DORMANT — tiada recall action |

---

## Protocol

### Step 0: Workspace Recall (bila di luar vault DIBA)

Bila DIBA bekerja dalam workspace lain dan context projek belum diload:

- [ ] Detect working directory semasa (environment / git root)
- [ ] Lookup `projects/registry.md` dalam vault DIBA — match nama folder dengan entri registry (`| nama-folder | path-memory |`)
- [ ] Match jumpa → load dari path memory projek (jika wujud): `current-session.md`, `work-protocol.md`, `identity-core.md`/`master-memory.md`
- [ ] Selalu load global memory serentak: `main/current-session.md`, `main/reminders.md`
- [ ] Tiada match penuh → cuba partial match; masih tiada → global memory sahaja + inform Abam projek belum didaftar, tawar untuk daftar
- [ ] Respond recap ringkas (max 8 baris): projek dikesan, sesi lepas, reminder terbuka, "Nak sambung dari mana?"

Untuk soalan recall biasa (bukan workspace loading), skip ke Step 1.

### Step 1: Extract Keywords

- [ ] Kenal pasti kata kunci dari soalan Abam:
  - Nama projek, sistem, atau fail
  - Topik teknikal (cth: "auth", "API", "login")
  - Tarikh atau period masa jika disebut
  - Nama keputusan atau feature
- [ ] Susun keywords dari yang paling spesifik ke paling umum
- [ ] Jika soalan kabur → skip ke Step 5 (Ask User)

---

### Step 2: Search Memory (Priority Order)

Semua path relatif kepada root vault DIBA:

| Priority | Lokasi | Sebab |
|----------|--------|-------|
| 1 | `daily-diary/current/*.md` | Entry terkini — paling relevan |
| 2 | `daily-diary/archived/YYYY-MM/*.md` | Bulan-bulan lepas |
| 3 | `main/decisions.md` | Keputusan penting yang dilog |
| 4 | `main/current-session.md` | Recap sesi terkini |
| 5 | `projects/registry.md` → memory projek aktif | Bila workspace/projek dikenal pasti |

Protokol rujukan: `daily-diary/daily-diary-protocol.md`

**Cara carian:**
- [ ] Grep keyword dalam fail — cari dalam `### Session summary`, `### Key decisions`, `### Tags`
- [ ] Jika jumpa match → extract tarikh, tajuk sesi, summary, dan keputusan berkaitan
- [ ] Jika keyword pertama tiada hasil → cuba keyword lebih umum
- [ ] Stop bila jumpa 3 match yang relevan — jangan teruskan carian tanpa had
- [ ] Gabungkan bukti dari pelbagai sumber ke dalam satu naratif; nyatakan sumber (diari vs keputusan vs sesi semasa)

---

### Step 3: Narrate Results

Paparkan hasil sebagai **bahasa semula jadi**, bukan dump mentah:

**Satu match:**
```
Ya, ingat. Pada [tarikh], kita [summary ringkas].
[Keputusan atau insight utama dari sesi itu].
[Soalan sambungan jika relevan]
```

**Beberapa match:**
```
Ada [N] sesi berkaitan:

[Tarikh 1] — [summary ringkas]
[Tarikh 2] — [summary ringkas]

Yang paling dekat nampaknya [tarikh] — [kenapa]. Nak DIBA detail lebih?
```

**Match tidak pasti:**
```
Jumpa sesuatu yang mungkin berkaitan — [tarikh], topik: [tajuk].
Tapi tak 100% pasti ini yang Abam maksudkan. Boleh clarify sikit?
```

---

### Step 4: Uncertainty Guard

**WAJIB:** Jangan fabricate. Jika tidak jumpa bukti diary:

```
Tak jumpa catatan tentang itu dalam diary.
[Pilih satu:]
- "Ingat hari atau projek mana?"
- "Mungkin berlaku sebelum diary sistem dipasang?"
- "Nak DIBA semak dalam [lokasi lain]?"
```

- [ ] Jangan andaikan "ya pernah buat" tanpa bukti
- [ ] Jangan reka tarikh, keputusan, atau petikan
- [ ] Jika uncertain → nyatakan uncertain, bukan confident palsu

---

### Step 5: Ask-User Fallback

Bila soalan terlalu kabur atau tiada hasil langsung:

- [ ] Tanya untuk narrow down:
  ```
  Tak jumpa dalam log. Boleh Abam ingat:
  - Projek mana? / Kira-kira bila?
  - Apa yang berlaku atau diputuskan?
  ```
- [ ] Jangan kekal senyap atau jawab "tak tahu" sahaja — bagi Abam jalan untuk bantu

---

### Step 6: Post-Recall Follow-Up

Selepas recall berjaya:

- [ ] Jika recall berkaitan seed dalam `mind-tree.md` → link kepada seed: "Ini ada kaitan dengan seed [tajuk] — nak sambung?"
- [ ] Jika ada follow-up dari entry yang dijumpai → surface: "Sesi tu ada follow-up [item] — masih relevan?"
- [ ] Jangan surface lebih dari 2 follow-up — bukan interrupt, hanya hint

---

## Mandatory Rules

1. **Search dahulu** — jangan jawab soalan recall tanpa semak diary
2. **Jangan fabricate** — tiada bukti = nyatakan tiada rekod, bukan reka
3. **Narrate, bukan dump** — output sebagai bahasa semula jadi, bukan raw search result
4. **Max 3 matches** — jika lebih, tunjuk yang paling relevan sahaja
5. **Ask bila kabur** — soalan kabur = minta clarify, bukan assume
6. **Stop bila cukup** — jangan teruskan carian merentasi semua fail jika match dah jumpa
7. **Truth-first** — uncertain match lebih baik dari confident fabrication
8. **Path portable** — semua carian relatif kepada vault; tiada hardcoded machine path

---

## Output Quality

| Output Lemah | Output Kuat |
|-------------|-------------|
| "Search result 1: 2026-03-15.md line 42..." | "Pada 15 Mac, kita debug timeout issue dalam auth middleware..." |
| "Ya, pernah buat tu." (tanpa bukti) | "Jumpa dalam diary 15 Mac — [summary]" |
| "Tak ingat." | "Tak jumpa dalam log. Abam ingat projek mana?" |
| List semua match tanpa filter | Tunjuk 1–3 yang paling relevan sahaja |
| Jawab tanpa cari diary | Search dulu, baru jawab |

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Keyword terlalu umum (cth: "the bug") | Tanya Abam untuk spesifik dulu |
| Match dalam arkib bulan yang lama | Paparkan — nyatakan tarikh dengan jelas |
| Beberapa match yang sama relevan | Tunjuk semua (max 3), tanya Abam mana yang dimaksudkan |
| Soalan tentang sesi sebelum diary dipasang | Nyatakan had — diary bermula dari [tarikh pertama dalam current/] |
| Abam tanya tentang keputusan spesifik | Semak `decisions.md` dahulu sebelum diary |
| Match dalam `current-session.md` | Paparkan — ini recap paling terkini |
| Recall dalam tengah sesi aktif | Cari, narrate, kemudian sambung semula sesi |
| Abam tanya perkara yang DIBA rasa pernah dibuat tapi tiada rekod | Jangan andaikan — nyatakan "tak jumpa rekod" |
| Workspace tak dikenali (Step 0) | Global memory sahaja + tawar daftar dalam registry |

---

## Integrasi Skill

| Skill | Hubungan | Tindakan |
|-------|----------|----------|
| `save-diary` | Sumber utama data recall | Kualiti recall bergantung pada kualiti entry diary |
| `session-briefing` | Brief surface "last session" | echo-recall untuk recall mendalam di luar sesi terkini |
| `chief-of-staff` | Forward view guna data sama | echo-recall = backward search; chief-of-staff = agenda |
| `resonance` | Seeds dari sesi lama | Link hasil recall kepada seed jika berkaitan |
| `log-decision` | Keputusan dalam decisions.md | Semak decisions.md bila soalan berkaitan keputusan penting |
| `manage-project` | Registry + project memory | Step 0 workspace recall guna `projects/registry.md` |

---

## Level History

- **Lv.1** — Base: Three-level recall (search+narrate, uncertainty guard, ask-user fallback), keyword search merentasi current/ dan archived/, narrative output, jangan fabricate. (Origin: Echo Memory Recall System, DIBA)
- **Lv.2** — Superultra: keyword extraction explicit, search priority table dengan decisions.md dan current-session.md, Post-Recall Follow-Up, output quality table, edge cases, integrasi skill lengkap. (2026-05-19)
- **Lv.3** — Consolidation: absorb diba-recall (Step 0 workspace recall via `projects/registry.md`); repair unresolved merge conflict yang committed dalam fail ini; semua hardcoded `C:/Users/...` path ditukar kepada path relatif vault. (Origin: CTO Phase 2, 2026-07-04)
