# Save Diary System

**Status:** Active  
**Skill:** `save-diary`  
**Versi:** Lv.2 — Superultra Edition

## Tujuan

Sistem dokumentasi sesi automatik yang menulis entry berstruktur ke diary harian — ditrigger secara automatik selepas setiap perubahan kod berjaya, atau secara manual bila Abam minta.

Save Diary bukan sekadar log — ia adalah **curated session record** yang menangkap keputusan, fail yang diubah, dan follow-ups dalam format yang boleh dicari dan dirujuk semula.

---

## Cara Kerja

```
Kod berjaya / Abam kata "save diary"
→ Check archive bulan lepas
→ Carry forward follow-ups terbuka
→ Buka atau cipta fail hari ini
→ Compose entry berstruktur
→ Append ke fail (tidak overwrite)
→ Kemas kini current-session.md
→ Sync DIBA Hub (background)
```

---

## Format Entry

```markdown
---

## YYYY-MM-DD (Pagi/Tengah hari/Petang - HH:mm) - Session Title

### Session summary
1–3 ayat ringkasan fakta.

### Key decisions
- Keputusan yang dibuat

### Fail yang diubah
- `path/to/file` — Apa yang diubah

### Follow-ups
- Item terbuka untuk sesi akan datang

### Tags
#topik #sistem #jenis-kerja
```

---

## Entry Kuat vs Lemah

| Lemah | Kuat |
|-------|------|
| "Beberapa fail diubah" | "`auth.js`, `session.js` — fix timeout logic" |
| "Pelbagai perkara dibincang" | "Dibincang: strategi lazy-load untuk dashboard" |
| "Masalah diselesaikan" | "Bug login timeout — root cause: token expiry race condition" |
| Summary 20 baris | Trim ke 3 ayat maksimum |

---

## Direktori

```
daily-diary/
├── current/                    # Entry bulan semasa
│   ├── 2026-05-18.md
│   └── 2026-05-19.md
├── archived/                   # Bulan-bulan lepas (auto-arkib)
│   ├── 2026-04/
│   └── 2026-03/
└── daily-diary-protocol.md     # Format rujukan
```

**Auto-archive:** Bila bulan bertukar, fail bulan lama dipindah ke `archived/YYYY-MM/` secara automatik sebelum entry baru ditulis.

**Overflow:** Bila fail > 1000 baris, arkib dan mulakan fail baru.

---

## Triggers

| Trigger | Tindakan |
|---------|----------|
| Kod berjaya diubah | Auto-write entry ringkas |
| `save diary` | Full entry write |
| `log this session` | Full entry write |
| `document this` | Full entry write |
| `review diary` | Baca dan papar 3 entry terkini |

---

## Follow-Up Carry Forward

Sebelum tulis entry baru, save-diary semak follow-ups terbuka dari entry sebelumnya dan carry forward secara automatik — tiada follow-up yang hilang antara sesi.

---

## Lifecycle

```
TRIGGER → ARCHIVE CHECK → FOLLOW-UP CHECK → COMPOSE → APPEND → SYNC → DONE
```

---

## Fail

| Fail | Tujuan |
|------|--------|
| `SKILL.md` | Skill definition — deploy ke `~/.claude/commands/save-diary.md` |
| `install-save-diary.md` | Panduan install |

---

## Hubungan Skill

| Skill | Hubungan |
|-------|----------|
| `session-briefing` | Baca `current-session.md` untuk "last session" dalam brief |
| `echo-recall` | Cari entry lama — diary adalah sumber utama |
| `resonance` | Seeds yang ditanam dilog dalam follow-ups |
| `log-decision` | Key decisions dalam diary selaras dengan decisions.md |
| `auto-commit` | save-diary auto-trigger selepas commit berjaya |

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/save-diary.md`
2. Pastikan `daily-diary/current/` dan `daily-diary/archived/` wujud
3. Verify: taip `save diary` — entry patut ditulis ke fail hari ini
