---
name: echo-recall
description: 'Search and recall past sessions from diary with narrative answers. Use
             when user says: "Do you remember...", "When did we...", "Recall...",
             "What did we decide about...", "Last time we...", "Earlier you said...",
             or "Diba ingat tak...".'
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
| **"Recall..." / "What did we decide about..."** | ACTIVE — full recall search |
| **"Last time we..." / "Earlier you said..."** | ACTIVE — full recall search |
| **"check our history" / "cari dalam diary"** | ACTIVE — full recall search |
| **Perbualan menyentuh topik yang mungkin ada rekod diary** | ACTIVE-PROBE — hint ada memory (Lv.3) |
| **Mid-conversation tanpa topik berkaitan** | DORMANT — tiada recall action |

---

## Protocol

### Step 1: Extract Keywords

- [ ] Kenal pasti kata kunci dari soalan Abam:
  - Nama projek, sistem, atau fail
  - Topik teknikal (cth: "auth", "API", "login")
  - Tarikh atau period masa jika disebut
  - Nama keputusan atau feature
- [ ] Susun keywords dari yang paling spesifik ke paling umum
- [ ] Jika soalan kabur → skip ke Step 4 (Ask User)

---

### Step 2: Search Diary (Priority Order)

Cari dalam urutan berikut:

| Priority | Lokasi | Sebab |
|----------|--------|-------|
| 1 | `C:/Users/BSM/XDIBAX/daily-diary/current/*.md` | Entry terkini — paling relevan |
| 2 | `C:/Users/BSM/XDIBAX/daily-diary/archived/YYYY-MM/*.md` | Bulan-bulan lepas |
| 3 | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md` | Keputusan penting yang dilog |
| 4 | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` | Recap sesi terkini |

**Cara carian:**
- [ ] Grep keyword dalam fail — cari dalam `### Session summary`, `### Key decisions`, `### Tags`
- [ ] Jika jumpa match → extract tarikh, tajuk sesi, summary, dan keputusan berkaitan
- [ ] Jika keyword pertama tiada hasil → cuba keyword lebih umum
- [ ] Stop bila jumpa 3 match yang relevan — jangan teruskan carian tanpa had

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

### Step 3.5: Proactive Echo (Lv.3)

Bila perbualan menyentuh topik yang mungkin ada rekod — tanpa trigger eksplisit:

- [ ] Kenal pasti topik utama yang sedang dibincangkan
- [ ] Quick-scan keyword dalam `daily-diary/current/` (max 3 fail terkini sahaja — jangan full scan)
- [ ] Jika ada match: hint secara natural, jangan interrupt:
  ```
  Topik ni ada kaitan dengan sesi [tarikh] — nak saya recall detail?
  ```
- [ ] Jika tiada match dalam 3 fail: kekal senyap — jangan disturb perbualan
- [ ] **Maksimum 1 hint per topik** dalam satu sesi — jangan repeat
- [ ] Confidence gauge sebelum hint:
  | Confidence | Syarat | Output |
  |------------|--------|--------|
  | Tinggi | Exact keyword match dalam tajuk atau summary | Hint terus |
  | Sederhana | Keyword match dalam body text | Hint dengan "mungkin berkaitan" |
  | Rendah | Vague match sahaja | Kekal senyap — jangan disturb |

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

---

## Integrasi Skill

| Skill | Hubungan | Tindakan |
|-------|----------|----------|
| `save-diary` | Sumber utama data recall | Kualiti recall bergantung pada kualiti entry diary |
| `session-briefing` | Brief surface "last session" | echo-recall untuk recall mendalam di luar sesi terkini |
| `resonance` | Seeds dari sesi lama | Link hasil recall kepada seed jika berkaitan |
| `diba-recall` | Deep workspace recall | Handoff ke diba-recall untuk recall scope yang lebih luas |
| `log-decision` | Keputusan dalam decisions.md | Semak decisions.md bila soalan berkaitan keputusan penting |

---

## Level History

- **Lv.1** — Base: Three-level recall (search+narrate, uncertainty guard, ask-user fallback), keyword search merentasi current/ dan archived/, narrative output, jangan fabricate. (Origin: Echo Memory Recall System, DIBA)
- **Lv.2** — Superultra: Step 1 keyword extraction explicit, Step 2 search priority table dengan decisions.md dan current-session.md, Step 6 Post-Recall Follow-Up (seed link + follow-up surface), output quality table (lemah vs kuat), edge cases tambahan, integrasi skill lengkap, mandatory rules dikembangkan, search stop condition. (2026-05-19)
- **Lv.3** — SuperUltraLord: Step 3.5 Proactive Echo — passive topic monitoring mid-conversation, quick-scan 3 fail terkini tanpa explicit trigger, confidence gauge (Tinggi/Sederhana/Rendah) sebelum hint, max 1 hint per topik per sesi, kekal senyap untuk confidence rendah. (2026-05-29)
