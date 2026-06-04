---
name: save-diary
description: "MUST use when user says 'save diary', 'log this session', 'document this',
             'save to diary', or when a significant code change completes successfully.
             Auto-triggers after every successful code change. Append-only session documentation."
---

# Save Diary — Session Documentation
*Pen menyentuh kertas. Kisah hari ini terbentuk.*

## Activation

When this skill activates, output nothing — terus execute protocol.

Manual trigger: `save diary`, `log this session`, `document this`, `save to diary`

Auto trigger: selepas setiap perubahan kod yang berjaya — tanpa perlu Abam minta.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "save diary" / "log this session"** | ACTIVE — full diary write |
| **Perubahan kod berjaya (fix, feature, refactor)** | ACTIVE — auto-document |
| **Abam kata "review diary"** | ACTIVE — baca dan paparkan entry terkini |
| **Mid-conversation tanpa trigger** | DORMANT — tiada diary action |
| **Entry sudah ditulis untuk sesi ini** | DORMANT — skip melainkan ada kandungan baru |

---

## Protocol

### Step 1: Monthly Archive Check

- [ ] Scan `C:/Users/BSM/XDIBAX/daily-diary/current/` untuk fail dari bulan sebelumnya
- [ ] Untuk setiap fail di mana bulan != bulan semasa:
  - Cipta `daily-diary/archived/YYYY-MM/` jika belum wujud
  - Pindah fail ke `archived/YYYY-MM/`
- [ ] Teruskan ke Step 2

---

### Step 2: Open Follow-Up Check

Sebelum tulis entry baru, semak follow-ups terbuka:

- [ ] Baca entry terkini dalam fail diary hari ini atau semalam
- [ ] Extract item dalam `### Follow-ups` yang belum diselesaikan
- [ ] Jika ada follow-up terbuka — catat dalam entry baru sebagai "Carry forward dari [tarikh]"
- [ ] Jangan tanya Abam — teruskan sahaja (save-diary tidak interrupt)

---

### Step 3: Find or Create Today's File

- [ ] Semak jika `daily-diary/current/YYYY-MM-DD.md` wujud
- [ ] Jika wujud → append ke fail sedia ada
- [ ] Jika tidak wujud → cipta fail baru dengan header:
  ```markdown
  # DIBA Session Diary - [Month DD, YYYY]
  ```

---

### Step 4: Compose Entry

Analisa sesi semasa dan tulis entry berstruktur:

```markdown
---

## YYYY-MM-DD (Time of Day - HH:mm) - [Session Title]

### Session summary
[1–3 ayat ringkasan — apa yang dibincang atau dilakukan]

### Key decisions
- [Keputusan 1]
- [Keputusan 2]

### Fail yang diubah
- `path/to/file` — [Apa yang diubah]

### Follow-ups
- [Item terbuka atau langkah seterusnya]

### Tags
#tag1 #tag2
```

**Composition rules:**
- Timestamp: dapatkan masa semasa via `date +"%H:%M"` (bash) atau `Get-Date -Format "HH:mm"` (PowerShell)
- Session title: ringkas, deskriptif — nama task atau topik utama
- Summary: fakta sahaja — apa yang berlaku, bukan apa yang dirancang
- Key decisions: keputusan yang dibuat, bukan keputusan yang pending
- Fail yang diubah: senarai eksplisit — bukan "beberapa fail"
- Follow-ups: item yang perlu dibuat dalam sesi akan datang
- Tags: kebolehan carian — topik, sistem, jenis kerja

---

### Step 5: Append to File

- [ ] Append entry ke hujung fail — **jangan overwrite**
- [ ] Pastikan ada pemisah `---` sebelum entry baru
- [ ] Verify entry ditulis dengan betul

---

### Step 6: Update current-session.md

- [ ] Buka `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md`
- [ ] Kemaskini dengan recap ringkas sesi ini:
  - Topik terakhir
  - Keputusan terakhir
  - Fail terakhir diubah
  - Next step jika ada
- [ ] Format: overwrite keseluruhan fail dengan recap terkini

---

### Step 7: DIBA Hub Sync

- [ ] Jalankan: `node C:/Users/BSM/XDIBAX/diba-hub/cli/diary-sync.js`
- [ ] Jika sync gagal atau tidak wujud → skip senyap, teruskan
- [ ] Jangan report error sync kepada Abam — ini background operation

---

### Step 8: Overflow Check

- [ ] Semak bilangan baris dalam fail diary hari ini
- [ ] Jika > 1000 baris:
  - Arkib fail semasa ke `daily-diary/archived/YYYY-MM/`
  - Cipta fail baru untuk tarikh yang sama dengan header baru
  - Nota dalam fail baru: "Sambungan dari fail overflow"

---

## Mandatory Rules

1. **Append-only** — jangan overwrite entry yang sedia ada
2. **Satu fail sehari** — semua entry hari yang sama dalam satu fail
3. **Timestamp benar** — dapatkan masa sebenar, bukan andaian
4. **Archive dulu** — jalankan monthly check sebelum setiap write
5. **Fakta sahaja** — log apa yang berlaku, bukan apa yang dirancang
6. **Senyap** — auto-trigger tidak perlu announcement, terus tulis
7. **Skip jika kosong** — jangan tulis entry jika tiada kandungan bermakna
8. **current-session.md wajib dikemas kini** — selepas setiap diary write

---

## Drift Prevention

Entry yang lemah vs entry yang kuat:

| Lemah | Kuat |
|-------|------|
| "Beberapa fail diubah" | "`auth.js`, `session.js` — fix timeout logic" |
| "Pelbagai perkara dibincang" | "Dibincang: strategi lazy-load untuk dashboard" |
| "Masalah diselesaikan" | "Bug login timeout diselesaikan — root cause: token expiry race condition" |
| "Akan buat X" | X masuk Follow-ups — bukan summary |
| Summary panjang 20 baris | Trim ke 3 ayat maksimum |

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Entry pertama hari ini | Cipta fail baru dengan header, tulis entry pertama |
| Entry kedua+ hari yang sama | Append dengan pemisah `---` |
| Tiada kandungan bermakna | Skip — jangan tulis entry kosong atau generik |
| `daily-diary/` tidak wujud | Cipta `current/` dan `archived/` dahulu, teruskan |
| `current-session.md` tidak wujud | Cipta fail baru, tulis recap |
| DIBA Hub sync gagal | Skip senyap — jangan block diary write |
| Fail > 1000 baris | Arkib dan mulakan fail baru (Step 8) |
| Auto-trigger selepas kod berjaya | Tulis entry ringkas — fokus pada fail yang diubah dan keputusan teknikal |
| Abam kata "review diary" | Baca 3 entry terkini dari current/ dan paparkan |
| Follow-up dari sesi lepas masih terbuka | Carry forward dalam Follow-ups entry baru — jangan hilang |

---

## Review Mode (bila trigger "review diary")

- [ ] Baca fail terkini dalam `daily-diary/current/`
- [ ] Extract 3 entry terakhir
- [ ] Paparkan dalam format compact:
  ```
  [Tarikh - Tajuk]
  Summary: [1 ayat]
  Follow-ups: [N item]
  ```
- [ ] Tanya Abam: "Nak dive lebih dalam mana-mana sesi?"

---

## Integrasi Skill

| Skill | Hubungan | Tindakan |
|-------|----------|----------|
| `session-briefing` | Source untuk "last session" dalam brief | current-session.md dikemas kini selepas setiap save |
| `echo-recall` | Cari entry lama dari diary | Diary adalah sumber utama echo-recall |
| `resonance` | Seeds dan idea dari sesi resonance | Log seeds yang ditanam dalam follow-ups |
| `log-decision` | Keputusan penting | Key decisions dalam diary selaras dengan decisions.md |
| `auto-commit` | Commit code changes | save-diary auto-trigger selepas commit berjaya |
| `check-reminders` | Reminder dari follow-ups | Follow-ups diary boleh jadi reminders jika kritikal |

---

## Level History

- **Lv.1** — Base: 4-step protocol (archive check, find/create file, compose entry, update session memory), append-only, monthly archival, timestamp benar, existing protocol reference. (Origin: Production diary system DIBA)
- **Lv.2** — Superultra: Step 2 Follow-Up Carry Forward, Step 7 DIBA Hub Sync, Step 8 Overflow Check, drift prevention table, review mode, integrasi skill lengkap, edge cases tambahan, mandatory rules dikembangkan, composition rules eksplisit, entry format distandard ikut DIBA convention. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
