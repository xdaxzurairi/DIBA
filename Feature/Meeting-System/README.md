# 🗓️ Meeting System

A virtual team meeting framework for AI-assisted organizations. Simulates structured team meetings with role-based agents, chaired by your AI operator — producing decisions, action items, and saved minutes automatically.

---

## What It Does

When triggered, the Meeting System convenes a virtual meeting with your defined agent roster:

- **Structured opening** — date, chair, attendees
- **Agenda handling** — uses provided agenda or asks if none given
- **Agent floor time** — each agent gives status, input, and flags
- **Chair summary** — decisions, action items, escalations to owner
- **Auto-saved minutes** — written to your projects/meetings folder

---

## Output Format

```
═══════════════════════════════════════
   [ORG NAME] — TEAM MEETING
   Date: [YYYY-MM-DD]
   Chair: [AI Name] ([Role])
   Present: [agent list]
═══════════════════════════════════════

AGENDA: [topic]

[AGENT]: Status · Input · Flags

---
SUMMARY
Decisions: [list]
Action Items: [agent → task]
Escalate to Owner: [items if any]
```

---

## Commands

| Input | Action |
|-------|--------|
| `meeting team` | Full meeting — all agents present |
| `meeting [agent] [agent]` | Selective meeting — named agents only |
| `emergency meeting` | Urgent full meeting — marked URGENT |
| `/meeting` | AI asks who should attend |

---

## Agent Roster (Default)

Configurable. Default roster ships with 10 roles:

| Agent | Domain |
|-------|--------|
| DEV | Development, code, build, deploy |
| SECURITY | Security, audit, hardening |
| RESEARCH | AI trends, new tools, external signals |
| DATA | Data pipelines, analysis, models |
| OPS | Infrastructure, servers, CI/CD |
| QA | Testing, quality assurance |
| DESIGN | UI/UX, visual, presentation |
| DOC | Documentation, reports |
| PM | Plans, milestones, progress tracking |
| STRATEGY | Direction, roadmap, major decisions |

Customize in your installation's `meeting-config.md`.

---

## Operating Model

- AI operator is always **Chair**
- Human owner is always **final decision authority**
- Operational decisions → Chair resolves
- Strategic decisions → flagged for owner

---

## Requirements

- `main/current-session.md` — for session context (optional but recommended)
- `projects/meetings/` folder — for saving minutes

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Decision-Log-System** | Auto-log decisions made during meeting |
| **LRU-Project-Management-System** | Pull active project context into meeting |
| **Reminders-System** | Surface open reminders as agenda items |

---

## Installation

See `install-meeting.md` for step-by-step setup.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
