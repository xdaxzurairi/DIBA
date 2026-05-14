# 🌿 Break Reminder System — Installation Guide

## Overview
Adds wellness break reminders to your AI companion. Empathetic, non-judgmental, and actionable — with session duration detection and auto-nudge for users who forget to rest.

---

## Prerequisites

- Core memory system installed
- **Optional**: Save-Diary-System (for session duration probe)

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Break-Reminder-System/
├── README.md
├── SKILL.md
└── install-break-reminder.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/break-reminder.md`

---

### Step 2: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 🌿 Break Reminder System — wellness reminders with session duration probe and auto-nudge
```

---

### Step 3: Test

```
saya dah lama kerja
```

Expected behavior:
1. AI reads today's diary for start time (if available)
2. Estimates elapsed session time
3. Acknowledges user's state warmly
4. Provides break checklist
5. Offers restart plan

---

## Customization

### Change break duration suggestions
Edit `SKILL.md` → Step 3. Adjust micro break (2–5 min) and full break (10–15 min) thresholds.

### Disable auto-nudge
Remove Step 5 (Auto-Nudge Mode) from `SKILL.md` if you prefer manual-only reminders.
