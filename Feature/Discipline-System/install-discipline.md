# ⚖️ Discipline System — Installation Guide

## Overview
Installs a behavioral reference card into your AI companion. Seven laws prevent the most common AI failure modes: rushing, scope creep, unverified claims, and undocumented learning.

---

## Prerequisites

- Core memory system installed
- No external dependencies

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Discipline-System/
├── README.md
├── SKILL.md
└── install-discipline.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/discipline.md`

---

### Step 2: Update `main/identity-core.md`

```markdown
## Discipline Protocol
Before any significant task:
1. Check against the 7 Laws in `Feature/Discipline-System/SKILL.md`
2. Watch for red flag phrases in own output
3. Run pre-done self-check before claiming task complete
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- ⚖️ Discipline System — 7 laws behavioral standard for consistent, verified AI output
```

---

### Step 4: Test

```
discipline
```

Expected output: the 7 laws table with check questions and red flags displayed as a reference card.
