---
name: save-diary
description: 'Save session to daily diary. Use when user says: "save diary", "log this session", "document this", "save to diary". Also auto-triggered after every successful code change. Appends structured entry to daily-diary/current/YYYY-MM-DD.md with monthly auto-archival.'
---

# Save Diary System

Automated daily session documentation with monthly archival.

## Trigger

### Auto (WAJIB)
Aktifkan **AUTOMATIK** selepas SETIAP perubahan kod yang berjaya (bug fix, feature, optimization, refactor). Tidak perlu user minta. Urutan: Verify fix → Save diary → Learn → Report to user.

### Manual
Aktifkan juga bila pengguna kata: "save diary", "log this session", "document this", "save to diary".

## Direktori

```
daily-diary/
├── current/                     # Entry bulan semasa
│   ├── 2026-03-17.md
│   └── 2026-03-30.md
├── archived/                    # Bulan-bulan lepas
│   ├── 2026-02/
│   │   └── 2026-02-27.md
│   └── 2025-03/
│       └── 2025-03-02.md
└── daily-diary-protocol.md      # Rujukan format entry
```

## Protokol

### Langkah 1: Auto-Archive Bulan Lepas

**SEBELUM** menulis entry baru, semak jika ada fail bulan lama dalam `daily-diary/current/`:

1. Baca semua fail dalam `daily-diary/current/`
2. Jika ada fail dengan bulan **berbeza** dari bulan semasa:
   - Cipta `daily-diary/archived/YYYY-MM/` untuk bulan fail tersebut
   - Pindah fail ke folder arkib yang betul
3. Teruskan ke Langkah 2

### Langkah 2: Tulis Entry

Append satu entry ke `daily-diary/current/YYYY-MM-DD.md` (cipta fail jika perlu).

### Struktur Entry

Setiap entry MESTI ada:

1. **Timestamp** — ISO 8601 (contoh: `2026-03-30T14:30:00+08:00`)
2. **Session summary** — 1–3 ayat: apa yang dibincang/dilakukan
3. **Key decisions** — Keputusan yang dibuat (bullet list)
4. **Fail yang diubah** — Senarai fail + ringkasan perubahan
5. **Follow-ups** — Item terbuka atau langkah seterusnya
6. **Tags** — `#topic` untuk carian (contoh: `#bug-fix #performance`)

### Format Entry

```markdown
---

## YYYY-MM-DD (Time of Day - HH:mm) - Session Title

### Session summary
1-3 ayat ringkasan.

### Key decisions
- Keputusan 1
- Keputusan 2

### Fail yang diubah
- `path/to/file.php` — Apa yang diubah
- `path/to/other.php` — Apa yang diubah

### Follow-ups
- Item terbuka atau langkah seterusnya

### Tags
#tag1 #tag2
```

### Format Fail Harian

- **Satu fail sehari:** `daily-diary/current/YYYY-MM-DD.md`
- **Append-only:** Entry baru ditambah di hujung; jangan tulis semula entry sebelum
- **Pemisah:** Setiap entry dipisah dengan `---`
- **Tajuk fail (entry pertama sahaja):** `# DIBA Session Diary - Month DD, YYYY`

### Auto-Archive Overflow

Bila fail melebihi **1000 baris**, arkibkan ke `daily-diary/archived/YYYY-MM/` dan mulakan fail baru.

### Langkah 3: Kemaskini Session Memory (Lv.2 — wajib)

Selepas tulis entry, kemaskini `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` dengan **recap** ringkas:
- **Topik:** satu baris
- **Keputusan:** bullet ringkas
- **Fail terakhir diubah:** senarai path
- **Follow-up terbuka:** item belum selesai (jika ada)

Supaya `session-briefing`, `diba?`, dan `echo-recall` boleh rujuk tanpa baca diari penuh.

### Langkah 4: Telegram Diary Penuh (Lv.4 — WAJIB, project-only filter)

**Hantar ke Telegram HANYA jika sesi berkaitan projek registered.**

#### Projek Registered (send Telegram)
Sesi yang melibatkan projek dalam `Project-AI-MemoryCore/projects/active/` — contoh: eWorks, DevAtlas, BFM, RuangNiaga, Webs-150, EA New v3, atau mana-mana projek yang didaftarkan.

#### Kerja XDIBAX Internal (SKIP Telegram)
Sesi yang hanya melibatkan infrastruktur XDIBAX sendiri — contoh: war-room, skills, memory core, hooks, diary system, DIBA config, scripts. **Jangan send ke Telegram.**

#### Cara tentukan
Semak tag dan fail yang diubah dalam entry diary:
- Jika fail yang diubah berada dalam path projek luar (contoh: `C:/Users/BSM/pwa_eworks/`, `C:/Apache24/htdocs/`, projek lain) → **SEND**
- Jika fail yang diubah hanya dalam `C:/Users/BSM/XDIBAX/` (war-room, .claude, .cursor, .gemini, scripts, Project-AI-MemoryCore) → **SKIP**
- Jika mixed (ada projek + XDIBAX internal) → **SEND** (projek menang)

#### Cara hantar (bila eligible)

```powershell
node C:/Users/BSM/XDIBAX/scripts/send-diary-telegram.js
```

Atau jika War Room server jalan:

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/api/send-diary-telegram
```

**Credential:** `C:/Users/BSM/XDIBAX/war-room/.env` → `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

**Verify:** Console/API mesti `ok` + bilangan mesej/chars. Jika gagal, lapor Abam — jangan claim diary+telegram siap.

**Bila SKIP:** Log dalam diary entry: `> Telegram: skipped (XDIBAX internal)`

## Peraturan

- **JANGAN** tulis semula entry sebelum — append sahaja
- **JANGAN** reka fakta — log hanya apa yang sebenar berlaku dalam sesi
- Entry ringkas: 50–150 baris per sesi
- Guna Bahasa Melayu dengan istilah teknikal Inggeris
- Cipta fail/folder automatik jika belum wujud

## Level History
- **Lv.1** — Base: auto/manual trigger, monthly archive, structured diary entry, append-only.
- **Lv.2** — Session Sync: Langkah 3 wajib kemaskini `main/current-session.md` selepas setiap entry. (Origin: 2026-05-22 — naikkan skill batch)
- **Lv.3** — Telegram Full: Langkah 4 wajib hantar diary PENUH ke Telegram via `scripts/send-diary-telegram.js` setiap save; IDE-agnostic. (Origin: 2026-06-19 — arahan Abam)
- **Lv.4** — Project-only filter: Telegram send hanya untuk sesi projek registered. Kerja XDIBAX internal (war-room, skills, memory, infra) di-skip. (Origin: 2026-06-22 — arahan Abam)
