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

## Peraturan

- **JANGAN** tulis semula entry sebelum — append sahaja
- **JANGAN** reka fakta — log hanya apa yang sebenar berlaku dalam sesi
- Entry ringkas: 50–150 baris per sesi
- Guna Bahasa Melayu dengan istilah teknikal Inggeris
- Cipta fail/folder automatik jika belum wujud

## Level History
- **Lv.1** — Base: auto/manual trigger, monthly archive, structured diary entry, append-only.
- **Lv.2** — Session Sync: Langkah 3 wajib kemaskini `main/current-session.md` selepas setiap entry. (Origin: 2026-05-22 — naikkan skill batch)
