# 📖 DIBA Manual — Setup & Cara Penggunaan
*Dokumentasi penuh DIBA OS v3 · Dikemaskini: 2026-07-04 (selepas PR #16–#18)*

Manual ini untuk Abam (dan mana-mana PC baru). Semua yang dibina dalam DIBA v3 — apa dia, macam mana setup, macam mana guna hari-hari.

---

## 1. Apa Itu DIBA v3 (Gambaran 1 Minit)

DIBA = **Deep Insight & Betterment Assistant** — chief of staff Abam, berjalan atas Claude Code dalam vault ini.

```
┌──────────────────────────────────────────────────────┐
│ FALLBACK      Ollama local / Nemotron — bila Claude  │
│               kena limit                              │
├──────────────────────────────────────────────────────┤
│ PROACTIVE     hooks (auto-install skill, auto-commit)│
│               chief-of-staff (brief/agenda/eod)      │
├──────────────────────────────────────────────────────┤
│ SKILLS        30 plugin skills (semua Lv.4+),        │
│               9 feature gap-fill = 39 aktif          │
├──────────────────────────────────────────────────────┤
│ MEMORY        main/ (identity, session RAM, reminders│
│               decisions) · daily-diary/ · projects/  │
├──────────────────────────────────────────────────────┤
│ KERNEL        CLAUDE.md — auto-load SETIAP sesi,     │
│               tak perlu taip "DIBA" lagi             │
└──────────────────────────────────────────────────────┘
```

**Prinsip utama:** memory DIBA ialah fail markdown — sebab tu mana-mana model (Claude, Nemotron, model local) boleh jadi DIBA, dan sebab tu setiap perubahan memory di-commit ke git (tak pernah hilang).

Rujukan mendalam: [[plans/DIBA-v3-Blueprint|Blueprint]] · [[plans/CTO-AUDIT-2026-07-04|Audit CTO]]

---

## 2. Setup Satu Kali (Per PC)

### 2.1 Asas (wajib)

```bash
# 1. Clone vault
git clone https://github.com/xdaxzurairi/DIBA.git
cd DIBA

# 2. Buka Claude Code dalam folder ni — SIAP.
claude
```

Itu sahaja yang wajib. Bila Claude Code buka dalam vault ni:
- `CLAUDE.md` (kernel) auto-load → DIBA aktif terus dengan identity + memory protocol
- Hook `SessionStart` auto-install semua skill ke `~/.claude/skills/` (nampak: `DIBA: 39 skills active`)
- Hook `PostToolUse` auto-commit setiap perubahan fail memory (`main/`, `daily-diary/`, `projects/`, `plans/`, `company/`)

> **Nota Windows:** hooks jalan via `bash` (Git Bash — datang dengan Git). Kalau tak jalan, rujuk `.claude/hooks/README.md` untuk fallback PowerShell.

### 2.2 Fallback local model (disyorkan — percuma & offline)

Untuk DIBA terus hidup bila Claude kena usage limit:

```bash
# 1. Install Ollama → https://ollama.com/download
# 2. Pull model ringan (~2GB; RAM 16GB+ boleh ambil qwen2.5:7b)
ollama pull qwen2.5:3b
# 3. Test
node scripts/diba-fallback-chat.js
```

### 2.3 Nemotron cloud (opsyenal — second AI + lapisan fallback kedua)

```bash
# Key dari https://openrouter.ai/keys — JANGAN commit dalam vault
export OPENROUTER_API_KEY=sk-or-...     # Linux/Mac
setx OPENROUTER_API_KEY sk-or-...       # Windows (kekal)
```

### 2.4 Env var rujukan (semua opsyenal)

| Env var | Guna | Default |
|---|---|---|
| `OPENROUTER_API_KEY` | Nemotron cloud (nm: + fallback) | — |
| `OLLAMA_HOST` | Lokasi Ollama | `http://localhost:11434` |
| `DIBA_LOCAL_MODEL` | Model local pilihan | Model pertama dalam `ollama list` |
| `NEMOTRON_MODEL` | Model Nemotron utama | `nvidia/nemotron-3-super-120b-a12b:free` |
| `DIBA_NEMOTRON_SCRIPT` | Override path script nm: | `scripts/ask-nemotron.js` |

---

## 3. Penggunaan Harian

### 3.1 Buka sesi

Buka Claude Code dalam vault → DIBA bagi **session brief automatik** (max 12 baris): recap sesi lepas, reminder urgent, projek aktif, fokus hari ini. Tak nak brief? Buka terus dengan task — DIBA baca memory senyap dan terus kerja. Atau taip `skip brief`.

### 3.2 Ritma harian (chief-of-staff)

| Taip | Dapat |
|---|---|
| `morning brief` / `brief pagi` | Gambaran hari penuh: overdue → top 3 priority (dengan sebab) → carry-over → perangkap relevan → cadangan mula |
| `agenda` / `apa plan hari ni` | Versi padat — priority je, bila-bila masa |
| `hi diba` | Mini-brief 4 baris + open loop terakhir ("tadi tengah X, nak sambung?") |
| `eod` / `wrap up` / `habis kerja` | Tutup hari: ringkasan → update session RAM → reminder housekeeping → diary → commit → cadangan esok |
| `weekly review` / `review minggu` | Retrospektif berbukti (git log + diary): wins, projek stalled, keputusan tergantung, minggu depan |

### 3.3 Memory — simpan & ingat

| Taip | Dapat |
|---|---|
| `save` / `save memory` | Simpan progress ke fail memory |
| `save diary` | Entry diary sesi (auto jugak selepas setiap perubahan kod & bila idle 20 min) |
| `Diba ingat tak [X]` / `recall [X]` | Cari dalam diary + decisions + sesi → jawapan naratif dengan tarikh |
| `remind me [X]` | Reminder kekal merentas sesi — naik sendiri dalam brief |
| `check reminders` | Senarai reminder terbuka |
| `log decision` | Rekod keputusan + rationale (auto jugak untuk keputusan non-obvious) |
| `why did we choose [X]` | Semak balik keputusan lama |
| `post-mortem` / `what went wrong` | Analisa kegagalan → masuk log supaya tak berulang |

### 3.4 Projek & plan

| Taip | Dapat |
|---|---|
| `new project [nama]` | Projek baru (LRU — max 10 aktif, auto-archive) |
| `load project [nama]` / `list projects` | Sambung / senarai projek dengan health flag |
| `copy plan` / `resume plan` / `execute plan` | Lifecycle plan penuh dengan checkbox + commit per-todo |
| `pack repo` / `satukan projek` | Bundle projek jadi satu fail AI-friendly (secret di-redact) |
| `map projek` / `cari kat mana [X]` | Index modul/simbol/dependency — termasuk PHP: fail↔table SQL, page.php routing |

### 3.5 Kualiti & fokus

| Taip | Dapat |
|---|---|
| `fokus` / `jangan melalut` / `anchor` | Context Lock — kunci skop + persona (discipline Guardian) |
| `discipline` / `semak disiplin` | Self-audit 7 Undang-undang |
| *(automatik)* | Monitor drift senyap setiap 5 respons; kod ikut standard code-sharp + verify matrix |

### 3.6 Kreatif & fikir

| Taip | Dapat |
|---|---|
| `jom fikir sama` / `resonance` | Ruang fikir bersama — explore/contemplate/create |
| `dream` / `bagi idea baru` / `brainstorm` | Dream Mode — 3-5 idea liar, terbaik masuk mind-tree |
| `sambung renungan [topik]` | Buka semula thread fikir lama |

### 3.7 Kos & token

| Taip | Dapat |
|---|---|
| `jimat token` / `checkpoint` / `resume` | Urus context window langsung (token-guard) |
| `berapa token` / `usage report` | Belanja token + anggaran RM (usage-tracker) |
| `budget AI RM[X] sebulan` | Set budget — alert automatik pada 70/90/100% |

### 3.8 Second AI (Nemotron)

| Taip | Dapat |
|---|---|
| `nm: [soalan]` | Hantar ke Nemotron — DIBA bagi context + synthesize jawapan, label `[Nemotron]` |
| `[soalan] #nm` | Sama, suffix style |

### 3.9 Skill baru & upgrade

| Taip | Dapat |
|---|---|
| `create skill` / `forge this` | DIBA draf skill baru — Abam approve dulu |
| `naikkan skill [nama]` | Level-up skill sedia ada |

Katalog penuh + trigger registry: `plugins/diba-skills/README.md` (satu frasa satu pemilik).

---

## 4. Bila Claude Kena Limit (Fallback Flow)

**Sebelum limit** (DIBA nampak warning / Abam kata "claude limit"):
DIBA auto-checkpoint → commit memory → bagi arahan switch.

**Masa limit** — satu command:
```bash
node scripts/diba-fallback-chat.js
```
- Auto-pick: **Ollama local** dulu → **Nemotron cloud** → kalau dua-dua tiada, tunjuk setup
- Model tu **jadi DIBA**: memory + persona loaded, rojak santai-sharp
- Dalam chat: `/save` simpan, `/exit` keluar+simpan, Ctrl+D pun selamat
- Transcript → `daily-diary/current/YYYY-MM-DD-fallback.md`

**Lepas limit habis:** buka sesi DIBA biasa — dia baca transcript dari diary dan sambung follow-up sendiri. **Memory tak pernah putus.**

Had jujur: bila Claude dah limit penuh, dia senyap terus — takde skill boleh auto-fire dalam chat sama. Sebab tu flow ni proaktif-sebelum + satu-command-selepas.

---

## 5. Struktur Vault (Ke Mana Semua Pergi)

| Path | Isi |
|---|---|
| `CLAUDE.md` | Kernel — auto-load, JANGAN padam |
| `MANUAL.md` | Dokumen ini |
| `main/` | Memory teras: main-memory, current-session (RAM, 500 baris), reminders, decisions, post-mortems, routines, mind-tree, dream-ideas |
| `daily-diary/current/` | Diary bulan ini (auto-archive bulanan ke `archived/`) |
| `projects/active/` | Projek aktif (LRU max 10) + `registry.md` untuk workspace luar |
| `plans/` | Blueprint, audit, persona spec, plan projek |
| `library/` | Knowledge base 8 seksyen (pattern boleh guna semula) |
| `memories/` | Artifacts jana: packs, maps, usage log, checkpoint |
| `plugins/diba-skills/` | **Skill canonical** — edit skill kat SINI sahaja |
| `Feature/` | Dokumentasi & sejarah feature (SKILL.md dalamnya SUPERSEDED — jangan edit) |
| `scripts/` | ask-nemotron.js, diba-fallback-chat.js, send-diary-telegram.js |
| `.claude/hooks/` | session-start.sh (installer), auto-commit.sh + README |

---

## 6. Troubleshooting

| Masalah | Punca & penyelesaian |
|---|---|
| Skill tak aktif / DIBA tak kenal command | Hook tak jalan. Run manual: `bash .claude/hooks/session-start.sh` — patut keluar `DIBA: 39 skills active` |
| `bash: command not found` (Windows) | Git Bash tiada dalam PATH → tambah, atau guna fallback PowerShell (`.claude/hooks/README.md`) |
| Memory tak auto-commit | Semak `.claude/settings.json` ada hook PostToolUse; test: edit fail dalam `main/` → `git log` patut ada `diba: auto-save ...` |
| Fallback chat kata "Tiada backend" | Ollama tak jalan (buka app / `ollama serve`) DAN key OpenRouter tiada. Setup salah satu (§2.2/2.3) |
| `nm:` bagi setup instruction | `OPENROUTER_API_KEY` belum diset (§2.3) |
| Skill lama muncul balik (anchor, session-briefing, dll.) | Tak patut berlaku — installer buang automatik. Kalau berlaku: `rm -rf ~/.claude/skills` → run installer semula |
| Dua PC out of sync | Sentiasa `git pull` bila mula, `push` bila habis — auto-commit dah jaga commit; push kekal manual/eod |
| Brief tak keluar masa session start | Taip `brief`. Kalau memang nak senyap: `skip brief` |

---

## 7. Sejarah Versi Sistem

| Tarikh | PR | Apa |
|---|---|---|
| 2026-07-04 | #16 | v3 Phase 1 — kernel CLAUDE.md, chief-of-staff, hooks portable, audit + blueprint |
| 2026-07-04 | #17 | Phase 2 — konsolidasi awal (echo-recall Lv.3, diba-response Lv.7), trigger registry, Nemotron Lv.5 + fallback local |
| 2026-07-04 | #18 | Batch upgrade 9 skill → Lv.6 + penyatuan 5 skill redundant (35 → 30) |

Seterusnya (blueprint Phase 3): scheduled morning brief, Telegram bridge, calendar. → [[plans/DIBA-v3-Blueprint|Blueprint]]

---

*[[HOME|HOME]] · [[main/main-memory|main-memory]] · [[plugins/diba-skills/README|Skill Registry]] · [[Feature/INDEX|Feature Index]]*
