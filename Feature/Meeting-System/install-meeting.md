# 🗓️ Meeting System — Installation Guide

## Overview
Adds a structured virtual team meeting capability to your AI companion. Convenes role-based agents, captures discussion, and saves minutes automatically.

---

## Prerequisites

- Core memory system installed (`main/current-session.md` must exist)
- `projects/meetings/` folder must exist (create if not present)
- **Optional enhancements**: Decision-Log-System, LRU-Project-Management-System, Reminders-System

---

## Installation Steps

### Step 1: Copy Files

Copy the Meeting System folder into your memory-core directory:

```
Feature/Meeting-System/
├── README.md
├── SKILL.md
├── install-meeting.md
└── meeting-config.md       ← created in Step 2
```

If you have a `skills/` folder (Skill Plugin System installed):
- Also copy `SKILL.md` → `skills/meeting.md`

---

### Step 2: Create `meeting-config.md`

Create `Feature/Meeting-System/meeting-config.md` with your organization's setup:

```markdown
# Meeting Config

## Organization
Name: [Your Org Name]
Chair: [AI Name] ([Chair Role])
Owner: [Your Name] ([Owner Role])

## Agent Roster
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

## Minutes Save Path
projects/meetings/
```

Customize agent list and roles to match your team structure.

---

### Step 3: Create Minutes Folder

Ensure the minutes folder exists:

```
projects/
└── meetings/      ← create this if not present
```

---

### Step 4: Update `master-memory.md` (Recommended)

Add a reference so it's visible during memory restoration:

```markdown
## Active Features
- 🗓️ Meeting System — virtual team meetings with auto-saved minutes
```

---

### Step 5: Test

Trigger a test meeting:

```
meeting team
```

Expected output:
```
═══════════════════════════════════════
   [ORG NAME] — TEAM MEETING
   Date: 2026-05-14
   Chair: DIBA (COO)
   Present: DEV, SECURITY, RESEARCH, DATA, OPS, QA, DESIGN, DOC, PM, STRATEGY
═══════════════════════════════════════

Agenda: [AI asks if none given]

DEV: ...
SECURITY: ...
[etc]

---
SUMMARY
Decisions: ...
Action Items: ...
```

Minutes saved to `projects/meetings/2026-05-14-meeting.md`.

---

## Customization

### Change agent roster
Edit `meeting-config.md` → Agent Roster table. Add, remove, or rename agents freely.

### Change minutes save path
Edit `meeting-config.md` → Minutes Save Path.

### Selective meetings
Call specific agents: `meeting dev security qa` — only those three attend.

### Emergency meetings
`emergency meeting` — all agents, URGENT flag on header.

---

## Companion System Integration

### With Decision-Log-System
After Chair Summary, decisions are auto-logged to `main/decisions.md`. No extra config needed.

### With LRU-Project-Management-System
Active project context is pulled into meeting brief at Step 3 (Agenda). No extra config needed.

### With Reminders-System
Open reminders surfaced as suggested agenda items. No extra config needed.
