# DIBA Skills Plugin
*Skill plugin collection for DIBA AI companion — canonical executable source of truth*

## Plugin Info
- **Name**: diba-skills
- **Version**: 2.2.0
- **Author**: Zuex
- **Rule**: `Feature/*/SKILL.md` copies are documentation/history only (marked SUPERSEDED). Edit skills HERE.

## Trigger-Phrase Registry

One owner per phrase. Before adding or leveling a skill, grep this table — a phrase may appear in exactly ONE row (forge-skill enforces this).

### Always-on / session lifecycle
| Skill | Owned triggers |
|-------|----------------|
| diba-response | (always active in chat — persona contract) |
| smart-effort | (silent, every prompt) · "quick answer", "full effort", "deep dive", "smart-effort off" |
| chief-of-staff | session start (auto) · "brief", "skip brief", "where did we leave off", "hi diba", "morning brief", "brief pagi", "agenda", "apa plan hari ni", "eod", "wrap up", "habis kerja", "weekly review", "review minggu" |

### Memory & recall
| Skill | Owned triggers |
|-------|----------------|
| save-memory | "save", "save memory", "save progress", "update memory" |
| save-diary | "save diary", "write diary", "log this session", "document this" · auto after code change · idle 20 min auto-save |
| echo-recall | "recall", "ingat semula", "load context", "do you remember", "Diba ingat tak", "when did we", "what did we decide about", "last time we" · workspace recall via `projects/registry.md` |
| token-guard | "jimat token", "hemat token", "compact mode", "checkpoint", "resume", "token limit" |
| usage-tracker | "ccusage", "usage report", "berapa token", "kos token", "budget AI" |

### Assistant & organisation
| Skill | Owned triggers |
|-------|----------------|
| check-reminders | "remind me", "check reminders", "don't forget", "follow up on" · session start |
| log-decision | "log decision", "why did we choose", "what was the trade-off" · auto on non-obvious decisions |
| post-mortem | "post-mortem", "what went wrong", "log this failure" · auto on failure signals |
| manage-project | "new/load/save/list project", "resume project", "open project" |
| work-plan | "copy plan", "append plan", "resume plan", "execute plan", "run the plan", "jalankan plan" · plan-mode handoff |
| meeting | "meeting team", "meeting [agent]", "/meeting" |
| break-reminder | "penat", "lama kerja", "take a break" |

### Execution & quality
| Skill | Owned triggers |
|-------|----------------|
| auto-commit | "commit", "push", "save changes" · vigilant after tasks |
| auto-worker | goal with 2+ hidden steps, "how" not stated |
| auto-learn-new-folder | new folder detected in workspace |
| orchestrate | "orchestrate", "audit keseluruhan" · multi-step coordination, subagent delegation |
| code-sharp | (auto before writing/editing code) |
| discipline | "discipline", "semak disiplin", "balik standard", "anchor", "fokus", "lock", "jangan melalut", "stay on task" · (background drift monitor, every 5 responses) |
| resonance | "resonance", "jom fikir sama", "let's think together", "mode explore", "dream", "bagi idea baru", "brainstorm", "cuba impikan" |
| focused-fix | "fix bug ni", "kenapa X tak jalan", "repair this feature", "something wrong dengan" |
| security-guidance | (auto before Edit/Write kod) · "security check", "selamat ke code ni", "ada vulnerability tak", "audit security" |
| env-secrets-manager | ".env", "secret bocor", "rotate credential", "leak API key", "check secrets" |
| dependency-auditor | "audit dependency", "check license", "upgrade packages", "vulnerable package" |
| tech-debt-tracker | "tech debt", "hutang teknikal", "apa patut refactor dulu", "prioritize cleanup" |
| changelog-generator | "buat changelog", "generate release notes", "apa yang berubah sejak version lepas" |
| deep-work | "time block hari ni", "susun deep work", "shallow work minggu ni", "focus session", "shutdown ritual" |
| weekly-review | "gtd review", "audit komitmen", "apa yang stalled", "clear semua open loop", "trusted system check" |
| capture | "brain dump", "ok banyak nak cakap ni", "catat semua ni" |
| experiment-designer | "design A/B test", "macam mana nak test feature ni", "hypothesis untuk experiment", "berapa sample size" |

### Knowledge & analysis
| Skill | Owned triggers |
|-------|----------------|
| library | "save/load/search library", "install item", "do we have", "is there a pattern for" |
| repo-pack | "pack repo", "repomix", "satukan projek", "bundle codebase" |
| project-map | "graphify", "map projek", "buat index", "dependency map", "cari kat mana" |
| forge-skill | "create skill", "forge this", "level up", "upgrade skill", "naikkan skill" · auto on 3+ repeated patterns |
| ask-nemotron | "nm:", "nemotron:", "#nm", "claude limit", "nemotron takeover", "guna nemotron je", "guna local model" |
| pulse | "apa orang cakap pasal", "sentiment terkini", "trend minggu ni", "check reddit pasal", "check HN pasal" |
| deep-research | "penyiasatan mendalam", "deep research pasal", "kajian menyeluruh dengan sumber" |

### Design, creative & marketing
| Skill | Owned triggers |
|-------|----------------|
| frontend-design | "design guide", "buat cantik", "jangan generic", "landing page", "visual hierarchy" |
| interaction-design | "poles UI", "tambah animasi", "microinteraction", "motion", "DIBA presence" |
| marketing-workshop | "copywriting", "SEO", "tulis copy", "headline", "CTA", "growth", "buat iklan" |

### Feature-layer only (installed as gap-fill from `Feature/`)
continuous-improvement · dashboard · image-prompt · interactive-story · mulahazah · observation · security-audit-remediation · song-creation · skill-plugin-system

### Retired (do not re-create)
| Skill | Fate |
|-------|------|
| work-plan-execution | RETIRED 2026-07-04 — duplicate of work-plan |
| diba-recall | MERGED 2026-07-04 → echo-recall Step 0 (workspace recall) |
| diba-operator | MERGED 2026-07-04 → diba-response Lv.7 (operator routing) |
| anchor | MERGED 2026-07-04 → discipline Lv.7 (Context Lock) |
| self-healing | MERGED 2026-07-04 → discipline Lv.8 (Background Monitor) |
| session-briefing | MERGED 2026-07-04 → chief-of-staff Lv.7 (Session-Start Brief) |
| dream-ideas | MERGED 2026-07-04 → resonance Lv.7 (Dream Mode) |
| auto-idle-save-recall | SPLIT 2026-07-04 → save-diary Lv.5 (idle save) + chief-of-staff Lv.7 (greet recall) |

## Auto-Discovery Notes
- Semua skill dalam folder `skills/[skill-name]/SKILL.md` dikesan secara automatik.
- Installer: `.claude/hooks/session-start.sh` — plugin canonical, Feature gap-fill, deprecated list skipped.
- `README.md` ini rujukan manusia + trigger registry; bukan fail indeks wajib untuk plugin.

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
