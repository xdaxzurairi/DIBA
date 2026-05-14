# 💭 Dream Ideas System — Installation Guide

## Overview
Adds creative ideation capability to your AI companion. Workspace-aware idea generation produces relevant, actionable ideas — not generic brainstorm output.

---

## Prerequisites

- Core memory system installed
- **Optional**: Save-Diary-System for saving ideas

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Dream-Ideas-System/
├── README.md
├── SKILL.md
└── install-dream-ideas.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/dream-ideas.md`

---

### Step 2: Configure Workspace Map (Recommended)

Edit `SKILL.md` → Workspace-Aware Context table. Add your own projects:

```markdown
| `my-project` | Focus area for this project |
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 💭 Dream Ideas System — workspace-aware creative ideation on demand
```

---

### Step 4: Test

```
bagi idea baru untuk projek ni
```

Expected behavior:
1. AI detects workspace domain
2. Activates dream mode
3. Generates 3–5 relevant ideas with descriptions
4. Offers to save to diary
