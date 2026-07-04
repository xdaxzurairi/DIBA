# DIBA Skills Plugin
*Skill plugin collection for DIBA AI companion*

## Plugin Info
- **Name**: diba-skills
- **Version**: 1.0.0
- **Author**: Zuex

## Installed Skills
| Skill | Trigger | Description |
|-------|---------|-------------|
| save-memory | "save", "save memory" | Preserve conversation insights to memory files |
| save-diary | "save diary", "write diary" | Session documentation with monthly archival |
| break-reminder | "penat", "lama kerja", "take a break" | Friendly wellness reminder for overwork and PC fatigue |
| echo-recall | "do you remember", "when did we", "recall" | Search diary logs and answer with grounded narrative recall |
| check-reminders | "remind me", "check reminders" | Persistent cross-session reminders |
| log-decision | "log decision", auto-detects | Append-only decision tracking |
| post-mortem | "post-mortem", auto-detects failures | Failure analysis and learning logs |
| auto-commit | "commit", "push" | Structured git commits |
| manage-project | "new project", "load project" | LRU project management (max 10 active) |
| library | "save library", "load library" | Knowledge base across projects |
| forge-skill | "create skill", "forge this" | Self-improvement system |
| orchestrate | "audit keseluruhan", "plan", "orchestrate", multi-step tasks | Coordinate complex tasks using chaining, routing, parallelization, and verification loops |
| session-briefing | Session start (auto) | Session start brief with context |
| work-plan | "copy plan", "resume plan" | Plan lifecycle and execution |
| frontend-design | "design guide", "buat cantik", "jangan generic" | Plain-text design guide for crafted, non-generic frontends |
| repo-pack | "pack repo", "repomix", "satukan projek" | Bundle a project into one AI-friendly file (secret-safe) |
| project-map | "graphify", "map projek", "cari kat mana" | Searchable index of modules, symbols, and dependencies |
| usage-tracker | "ccusage", "berapa token", "kos token" | Track token usage and estimated cost over time |
| marketing-workshop | "copywriting", "SEO", "growth", "tulis copy" | Reusable SEO/copywriting/conversion/growth workflows |

## Auto-Discovery Notes
- Semua skill dalam folder `skills/[skill-name]/SKILL.md` akan dikesan secara automatik oleh sistem plugin.
- Tiada pendaftaran manual diperlukan; struktur folder ialah konfigurasi utama.
- `README.md` ini hanyalah rujukan manusia dan **bukan** fail indeks wajib untuk plugin.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
