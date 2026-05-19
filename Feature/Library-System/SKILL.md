---
name: library
description: "MUST use when saving to the library, loading from the library,
             searching for existing knowledge, installing pre-made items,
             or when about to create a new library entry. Also triggers when
             user says 'save library', 'load library', 'check library',
             'search library', 'install item', 'install library item',
             'do we have', 'is there a pattern for', 'find in library',
             or when the AI independently decides to save reusable knowledge."
---

# Library — Knowledge Guardian Skill
*Simpan sekali, guna selama-lamanya. Jangan selesaikan masalah yang sama dua kali.*

## Activation

When this skill activates, output:

"Knowledge recalled. Scanning the shelves..."

Then immediately execute Dynamic Library Scanning before any save operation.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "save library", "save to library"** | ACTIVE — search + save protocol |
| **Abam kata "load library", "check library"** | ACTIVE — search + load protocol |
| **Abam kata "install item [name]"** | ACTIVE — item install protocol |
| **Abam kata "do we have", "is there a pattern for"** | ACTIVE — search sahaja |
| **Abam kata "search library", "find in library"** | ACTIVE — search sahaja |
| **AI kenal pasti knowledge reusable yang bernilai** | ACTIVE — cadang save |
| **Perbualan biasa tanpa context library** | DORMANT — tiada tindakan library |
| **Library directory tidak ditemui** | EXIT — warn Abam, skip semua operasi library |

---

## Dynamic Library Scanning

Sentiasa discover struktur library pada runtime — **jangan hardcode** sections atau entries:

1. **Scan** `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/library/` untuk semua subdirectories (kecuali `formats/`) — ini adalah sections
2. **Scan** setiap section untuk `*.md` files (kecuali README.md) — ini adalah entries
3. **Count** jumlah entries dan sections secara dinamik
4. **Report** struktur sebelum sebarang operasi save

Sections dan entries baru dikesan secara automatik — tiada konfigurasi diperlukan.

---

## Protocol

### Step 1: Determine Operation
- [ ] Parse arahan Abam — Save, Load, Search, atau Install?
- [ ] Kalau **Save** → Execute Search Protocol dahulu (WAJIB sebelum save)
- [ ] Kalau **Load** → Execute Search Protocol, kemudian load entry yang paling relevan
- [ ] Kalau **Search** → Execute Search Protocol sahaja, report findings
- [ ] Kalau **Install** → Execute Item Install Protocol
- [ ] Kalau **AI-suggested save** → Bentangkan cadangan kepada Abam, tunggu approval sebelum proceed

### Step 2: Search Protocol (WAJIB sebelum sebarang Save)
- [ ] Extract keywords dari topik yang akan disimpan atau dicari
- [ ] Dynamic scan — senaraikan SEMUA sections dan entries semasa
- [ ] Match keywords terhadap filenames entries dan nama sections yang sedia ada
- [ ] Baca top matches (sehingga 3) untuk semak content overlap
- [ ] Report findings dalam format:

```
Library Search Results
----------------------

Keywords: [extracted keywords]
Library: [count] entries merentas [count] sections
Projek Semasa: [nama projek + tech stack]

Matches Ditemui (Sesuai):
- library/section/entry-name.md — [kenapa sesuai untuk projek ini]

Matches Ditemui (Tidak Sesuai):
- library/section/entry-name.md — [kenapa tidak sesuai: scale/domain/stack mismatch]

Tiada Match Dalam:
- [sections tanpa entries relevan]

Recommendation:
- [CREATE NEW / UPDATE EXISTING / REFERENCE ONLY]
- [IMPLEMENT / SKIP — untuk cadangan project-specific]
```

### Step 3: Project-Aware Assessment
- [ ] Kenal pasti projek semasa — tech stack, domain, skala
- [ ] Nilai setiap entry yang match terhadap projek semasa:

| Faktor | Semakan |
|--------|---------|
| **Tech stack** | Adakah entry match? (Laravel entry untuk Laravel project, bukan Spring Boot) |
| **Domain** | Adakah business domain sejajar? (payment pattern untuk e-commerce, bukan static site) |
| **Skala** | Adakah sesuai untuk saiz projek? (Kafka untuk 50 users adalah overkill) |
| **Complexity** | Adakah ia akan over-engineer penyelesaian? |

### Step 4: Execute Decision
- [ ] Ikut decision rules berdasarkan hasil search:

| Scenario | Recommendation |
|----------|---------------|
| Tiada filename/keyword match | **CREATE NEW** entry |
| Filename serupa tetapi scope berbeza | **CREATE NEW** (catat entry yang berkaitan) |
| Content overlap signifikan | **UPDATE EXISTING** entry |
| Content sudah diliputi sepenuhnya | **REFERENCE ONLY** — skip save |
| Entry wujud tetapi scale/domain salah | **SKIP** — tidak sesuai untuk projek semasa |
| Entry wujud dan sesuai | **IMPLEMENT** — guna pattern ini |

- [ ] Bentangkan recommendation kepada Abam
- [ ] Tunggu kelulusan sebelum save atau update

### Step 5: Format-Aware Save (jika CREATE NEW)
- [ ] Auto-determine section berdasarkan jenis content:

| Content Keywords | Section |
|-----------------|---------|
| System design, patterns, diagrams, architecture | `architecture` |
| UI components, Vue/React, reusable elements | `component` |
| Schema, migrations, queries, relationships | `database` |
| Flowcharts, sequence diagrams, visual flows | `diagram` |
| Third-party API, SDK, webhook, external service | `integration` |
| Auth, RBAC, encryption, guards, middleware | `security` |
| Colors, CSS, Tailwind, glassmorphism, fonts | `theme` |
| CI/CD, deployment, pipelines, automation | `workflow` |

- [ ] Load format template dari `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/library/formats/[section]-format.md`
- [ ] Apply template structure — ikut Required Fields, Section Order, dan Template skeleton
- [ ] Kalau format file tidak wujud — guna generic markdown (title + overview + content + examples)
- [ ] Write entry ke `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/library/[section]/[entry-name].md`
- [ ] Verify fail berjaya ditulis

### Step 6: Commit Chain
- [ ] Selepas save atau update, trigger `auto-commit` jika dipasang
- [ ] Kalau `auto-commit` tidak dipasang — maklum Abam untuk commit secara manual
- [ ] Library save = commit entrance. Tiada knowledge entry yang dibiarkan tanpa commit.

### Step 7: Confirm
- [ ] Report kepada Abam:

```
Library [Action]
----------------
Entry: [nama entry]
Section: [section name]
Path: library/[section]/[filename].md
Status: Saved / Updated / Referenced / Skipped

[Catatan jika ada — section baru, format generic digunakan, dsb.]
```

---

## Item Install Protocol

Bila memasang pre-made library entry dari katalog `library-items/`:

### Trigger Commands
- `"install item [name]"` — install item spesifik mengikut nama
- `"install library item [name]"` — install item library eksplisit
- `"add item from catalog"` — browse dan pilih item

### Install Steps
- [ ] Parse nama item dari command Abam
- [ ] Scan `library-items/` untuk entry yang match — cari mengikut keyword filename merentas semua section folders
- [ ] Kalau ditemui — tunjuk maklumat item (nama, section, preview beberapa baris pertama)
- [ ] Kalau pelbagai matches — senaraikan semua dan minta Abam pilih
- [ ] Semak duplicate dalam `library/[section]/` Abam — match mengikut filename
- [ ] Kalau tiada duplicate — copy dari `library-items/[section]/[filename].md` ke `library/[section]/[filename].md`
- [ ] Kalau duplicate wujud — alert Abam: overwrite atau skip?
- [ ] Trigger `auto-commit` selepas install berjaya

```
Item Install
------------
Item: [nama item]
Section: [nama section]
Source: library-items/[section]/[filename].md
Target: library/[section]/[filename].md
Status: Installed / Skipped (duplicate) / Not found

Items tersedia dalam katalog:
- [section]/[item-name] — [deskripsi baris pertama]
```

---

## Mandatory Rules

1. **Sentiasa scan sebelum save** — JANGAN SEKALI-KALI buat library entry tanpa semak dahulu
2. **Dynamic discovery** — jangan hardcode sections atau bilangan entries
3. **Keyword extraction** — derive dari context topik, bukan sekadar perkataan tepat
4. **Baca matches** — jangan sekadar match filenames, baca content top matches
5. **Project-aware** — sentiasa pertimbangkan projek semasa bila cadang suitability
6. **Clear recommendation** — sentiasa akhiri dengan cadangan actionable
7. **Tunggu approval** — bentangkan findings dan tunggu keputusan Abam sebelum save
8. **Format-aware saves** — sentiasa load template format yang sesuai sebelum buat entry baru
9. **Append untuk update** — kalau UPDATE EXISTING, baca fail sedia ada dahulu sebelum tulis
10. **Jangan padam** — entries library adalah append-friendly; jangan padam knowledge lama

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tiada library/ directory** | Warn: "Library directory tidak ditemui. Jalankan install protocol dahulu." |
| **Library kosong (tiada entries)** | Skip search, terus ke recommendation CREATE NEW |
| **Format template missing** | Guna generic markdown (title + overview + content + examples), catat dalam report |
| **Entry name collision** | Tambah numeric suffix (contoh: `pattern-name-2.md`), maklum Abam |
| **Abam mahu section baru** | Buat folder, catat bahawa format template belum wujud untuk section tersebut |
| **Content merentas pelbagai sections** | Pilih section utama, catat relevansi secondary dalam entry |
| **Item tidak ditemui dalam katalog** | Senaraikan semua items tersedia dari `library-items/` |
| **Library tidak dipasang** | Warn: "Library directory tidak ditemui. Pasang Library System dahulu." |
| **Item sudah dalam library** | Tanya Abam: overwrite entry sedia ada atau skip? |
| **Library ada entries tetapi tiada yang match** | Report "tiada match" dengan jelas, cadang CREATE NEW |
| **Multiple entries overlap** | Report semua yang overlap, biar Abam decide mana untuk update atau create baru |
| **Entry dalam bahasa berbeza** | Accept dalam bahasa yang diberi, save dalam bahasa yang sama |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `auto-commit` | Selepas save/update/install berjaya | Chain commit untuk preserve library change |
| `observation` | Semasa investigate/audit | Link findings ke library entries yang relevan |
| `resonance` | Bila seed HARVESTED | Save seed matang sebagai knowledge entry |
| `forge-skill` | Bila pattern boleh dijadikan skill | Cadang forge daripada knowledge yang disimpan |
| `log-decision` | Bila pattern penting disimpan | Log keputusan untuk implement pattern dari library |
| `session-briefing` | Awal sesi dengan projek baru | Surface library entries yang relevan dengan projek |

---

## Level History

- **Lv.1** — Base: Dynamic library scanning + keyword matching + deduplication prevention. Scan `library/` pada runtime, extract keywords dari topik, match terhadap filenames dan section names, baca top matches untuk semak overlap, report findings. (Origin: Knowledge reuse system untuk AI companions)
- **Lv.2** — Project-Aware: Tambah suitability assessment — pertimbangkan tech stack, domain, scale, dan complexity bila recommend library entries untuk projek semasa. Entries yang wujud tetapi tidak sesuai diflag secara berasingan dari matches.
- **Lv.3** — Commit Chain: Selepas save/update library entries, auto-trigger Auto-Commit skill (jika dipasang) untuk commit semua perubahan. Library save exit menjadi commit entrance.
- **Lv.4** — Format-Aware Save: Auto-determine library section dari content keywords, load matching format template dari `library/formats/[section]-format.md`, apply template structure ke entries baru. Trust-based section selection (tiada approval gate). Formats diload on-demand, tidak embedded.
- **Lv.5** — Item Install: Install pre-made library entries dari katalog `library-items/`. Commands baru: "install item [name]", "install library item", "add item from catalog". Scan katalog mengikut filename keyword, tunjuk preview, semak duplicates dalam library Abam, copy ke section betul, chain commit. (Origin: Public knowledge sharing untuk AI MemoryCore community)
- **Lv.6** — Superultra: Protocol dikembangkan kepada 7 langkah bernombor dengan checklist, Context Guard ditambah EXIT row, edge cases dikembangkan kepada 12 baris, Mandatory Rules dikembangkan kepada 10 peraturan, Integrasi Skill table ditambah dengan 6 integrasi, path memori dikemaskini kepada absolute paths. (2026-05-19)
