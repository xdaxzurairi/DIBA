# 🔍 DIBA Recall System — Installation Guide

## Overview
Adds on-demand workspace recall to your AI companion. Detects the current project, loads session state and reminders, and delivers a focused recap — ready to continue.

---

## Prerequisites

- Core memory system installed (`main/current-session.md` required)
- `main/reminders.md` — optional but recommended
- **Optional**: LRU-Project-Management-System for project registry lookup

---

## Installation Steps

### Step 1: Copy Files

```
Feature/DIBA-Recall-System/
├── README.md
├── SKILL.md
└── install-diba-recall.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/diba-recall.md`

---

### Step 2: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 🔍 DIBA Recall System — on-demand workspace recall with session state and reminders
```

---

### Step 3: Test

```
recall
```

Expected output:
```
=== Recall: [Project Name] ===

Sesi lepas: [last topic + decision]

Open reminders: [item if any]

Arah seterusnya: [suggestion or question]
```

---

## Relationship with Session-Briefing-System

- **Session-Briefing** → runs automatically at session start, max 12 lines
- **DIBA Recall** → runs on demand, goes deeper into workspace and project context

Install both for best coverage: briefing handles startup, recall handles mid-session context reloads.
