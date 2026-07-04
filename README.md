# 🧠 DIBA — Deep Insight & Betterment Assistant

*Zuex's chief of staff. Berjalan atas Claude Code. Memory dalam markdown — tak pernah lupa.*

**Versi: DIBA OS v3** (2026-07-04) · 30 skill plugin (semua Lv.4+) · zero-incantation kernel · fallback local/cloud

---

## Apa Ini

DIBA ialah personal AI assistant yang hidup dalam vault git ini. Setiap sesi Claude Code dalam repo ini auto-load identity, memory, dan 39 skill — tanpa perlu magic word. Memory-nya fail markdown biasa, jadi:

- **Model-agnostic** — Claude, Nemotron, atau model Ollama local boleh jadi DIBA
- **Git-guaranteed** — setiap perubahan memory auto-commit; tak pernah hilang dengan sesi
- **Portable** — clone di mana-mana PC, terus jalan

```
┌──────────────────────────────────────────────────────┐
│ FALLBACK      Ollama local / Nemotron bila limit     │
├──────────────────────────────────────────────────────┤
│ PROACTIVE     hooks · chief-of-staff (brief/eod)     │
├──────────────────────────────────────────────────────┤
│ SKILLS        30 plugin (canonical) + 9 gap-fill     │
├──────────────────────────────────────────────────────┤
│ MEMORY        main/ · daily-diary/ · projects/       │
├──────────────────────────────────────────────────────┤
│ KERNEL        CLAUDE.md — auto-load setiap sesi      │
└──────────────────────────────────────────────────────┘
```

## Quick Start

```bash
git clone https://github.com/xdaxzurairi/DIBA.git
cd DIBA
claude        # buka Claude Code — DIBA aktif terus
```

Lepas tu cuba: `morning brief` · `agenda` · `hi diba` · `eod`

📖 **Manual penuh (setup + semua command): [MANUAL.md](MANUAL.md)**

## Highlight

| Keupayaan | Cara |
|---|---|
| Brief pagi + priority berskala | `morning brief` — chief-of-staff Lv.7 |
| Ingat semua sesi & keputusan | `Diba ingat tak [X]` — echo-recall Lv.3 |
| Reminder merentas sesi | `remind me [X]` — naik sendiri dalam brief |
| Kunci fokus & anti-drift | `fokus` / auto-monitor — discipline Guardian Lv.8 |
| Second opinion AI | `nm: [soalan]` — Nemotron via OpenRouter |
| Hidup masa Claude limit | `node scripts/diba-fallback-chat.js` — Ollama/Nemotron jadi DIBA |
| Faham projek besar | `map projek` / `pack repo` — incl. PHP/MySQL legacy |
| Skill improve sendiri | `forge this` / `naikkan skill [X]` — human-in-the-loop |

## Struktur

| Path | Isi |
|---|---|
| `CLAUDE.md` | Kernel — auto-load |
| `MANUAL.md` | Manual pengguna penuh |
| `main/` | Memory teras (identity, session RAM, reminders, decisions) |
| `plugins/diba-skills/` | Skill canonical + trigger registry |
| `daily-diary/` · `projects/` · `library/` · `plans/` | Diary, projek (LRU), knowledge, blueprint |
| `scripts/` | ask-nemotron.js · diba-fallback-chat.js |
| `Feature/` | Dokumentasi feature (sejarah — skill sebenar dalam `plugins/`) |

## Dokumentasi

- 📖 [MANUAL.md](MANUAL.md) — setup & cara guna semua
- 🗺️ [plans/DIBA-v3-Blueprint.md](plans/DIBA-v3-Blueprint.md) — arkitektur & roadmap (Phase 3: scheduled brief, Telegram, calendar)
- 🔍 [plans/CTO-AUDIT-2026-07-04.md](plans/CTO-AUDIT-2026-07-04.md) — audit skill penuh
- 🎯 [plugins/diba-skills/README.md](plugins/diba-skills/README.md) — trigger registry (satu frasa satu pemilik)

---

*Asal-usul: dibina atas template AI MemoryCore (lihat git history README ini untuk dokumen template asal). DIBA v3 = kernel + consolidated skills + proactive layer + fallback, 2026-07-04.*
