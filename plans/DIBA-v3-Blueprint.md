# DIBA v3 Blueprint — From Skill Library to Real Assistant
*CTO architecture definition · 2026-07-04 · Companion to [[plans/CTO-AUDIT-2026-07-04|CTO-AUDIT-2026-07-04]]*

---

## North Star

> **DIBA is Zuex's chief of staff, not a command palette.**
> A real assistant knows who you are without being told, knows what today looks like without being asked, does the routine work without supervision, and remembers everything without drift.

Four tests every future change must pass:

1. **Zero-incantation** — DIBA works in a fresh session with no magic word typed.
2. **Forward-looking** — DIBA can answer "what should Abam do today?" at any moment.
3. **One owner per capability** — every trigger phrase, data file, and behavior has exactly one owning skill.
4. **Portable** — works identically on every machine Zuex uses (Windows office PC, home PC, Claude Code web).

---

## Target Architecture — DIBA OS

```
┌─────────────────────────────────────────────────────────┐
│ L4  INTEGRATIONS   calendar · email · Telegram · MCP    │  Phase 3
├─────────────────────────────────────────────────────────┤
│ L3  PROACTIVE      hooks · chief-of-staff · routines    │  Phase 1 ✅
│                    scheduled briefs (web triggers)      │  Phase 3
├─────────────────────────────────────────────────────────┤
│ L2  SKILLS         ~32 plugin skills, one trigger owner │  Phase 2
│                    each · forge-skill governs additions │
├─────────────────────────────────────────────────────────┤
│ L1  MEMORY         main/ (identity, session, decisions, │  stable
│                    reminders, routines) · memories/     │
├─────────────────────────────────────────────────────────┤
│ L0  KERNEL         CLAUDE.md — auto-loads every session │  Phase 1 ✅
│                    identity + memory protocol + router  │
└─────────────────────────────────────────────────────────┘
```

### L0 — Kernel (`CLAUDE.md`)
The only file guaranteed to load in every Claude Code session. Contains: identity one-liner, memory-load protocol, command router, save protocol, language rules. **Budget: ≤100 lines** — it is paid for in every session's context. Everything else is a pointer, never a copy.

### L1 — Memory
Unchanged structure (`main/` + `memories/` + `daily-diary/` + `projects/`). Rules:
- `main/main-memory.md` = identity + relationship (slow-changing)
- `main/current-session.md` = RAM, 500-line cap
- Generated artifacts (`memories/packs/`, `memories/maps/`) are **snapshots with a date in the filename** — regenerate, never trust stale.

### L2 — Skills
Plugin (`plugins/diba-skills/`) is the **only executable source of truth**. `Feature/` becomes documentation + install history. Governance (enforced by forge-skill checklist):
- New skill requires: unique trigger phrases (grep the plugin first), one owned data file, a Level History line.
- A skill that mostly defers to another skill is a merge candidate, not a skill.
- No skill may claim a capability the harness doesn't grant (see smart-effort post-mortem — a skill cannot switch models).

### L3 — Proactive
What separates an assistant from a chatbot:
- **SessionStart hook** → installs skills + prints one status line.
- **PostToolUse hook** → auto-commit memory files (never lose state).
- **chief-of-staff skill** → morning brief / agenda / EOD wrap / weekly review, unifying reminders + projects + routines + decisions + post-mortems.
- **Phase 3:** scheduled sessions (Claude Code web triggers / OS scheduler) so the morning brief is *pushed* at 8am, not pulled.

### L4 — Integrations (the real-world senses)
A real assistant touches Zuex's actual world. Priority order, all via MCP servers so DIBA's skills stay tool-agnostic:
1. **Calendar (UiTM Outlook/Google)** — agenda becomes real, meetings feed chief-of-staff.
2. **Telegram/WhatsApp bridge** — DIBA reachable from phone; EOD wrap and reminders delivered outside the terminal.
3. **Email triage** — morning brief includes "3 emails need replies."
4. **eWorks/ruangniaga DB read-only** — status queries ("berapa aduan open?") answered live.

---

## Roadmap

### Phase 1 — Spine (this PR) ✅
| Item | Outcome |
|---|---|
| `CLAUDE.md` kernel | Zero-incantation DIBA in every session |
| Portable hooks (`$CLAUDE_PROJECT_DIR`, self-locating scripts, bash+ps1) | Automation works on every machine |
| `chief-of-staff` skill | Forward-looking layer exists |
| Retire `work-plan-execution`, rescope `smart-effort` | First trust/duplication cleanup |
| Audit + this blueprint | Shared map of where DIBA is going |

### Phase 2 — Consolidation (next, ~1 session)
- Merge `diba-recall` → `echo-recall` (workspace-awareness moves to kernel).
- Merge `diba-operator` → `diba-response`.
- Move `save-diary/SKILL-auto-idle-save-recall.md` into its own skill dir or absorb it.
- Feature-layer dedup: mark superseded `Feature/*/SKILL.md` files; installer trusts plugin only.
- Trigger-phrase registry: one table in `plugins/diba-skills/README.md`, greppable, one owner per phrase.
- Fix or formally park `ask-nemotron` (env-var script path, or move script into repo).

### Phase 3 — Proactive & Connected (~2–4 sessions)
- Scheduled morning brief: Claude Code web trigger or Task Scheduler/cron entry that opens a session with "morning brief".
- Calendar MCP → agenda with real meetings.
- Telegram bridge → DIBA on the phone, reminders that actually arrive.
- Routines engine: `main/routines.md` entries get "last run / next due" and surface in the morning brief.

### Phase 4 — Delegation (ambition)
- DIBA runs unattended work sessions (subagents/background tasks) against active projects and reports at EOD.
- Weekly review auto-drafts: wins, stalled projects, decisions pending, post-mortem themes.

---

## KPIs (how we know DIBA is a real assistant)

| KPI | Now | Target (Phase 3) |
|---|---|---|
| Sessions where DIBA identity active without typing "DIBA" | ~0% | 100% |
| "What should I do today?" answerable in one command | No | Yes (`agenda`) |
| Memory files lost/uncommitted after a session | occasional | 0 (hook-guaranteed) |
| Machines where hooks work | 1 of 3 | all |
| Reminders that reach Abam outside the terminal | 0 | via Telegram |
| Overlapping trigger phrases | ~8 | 0 |
