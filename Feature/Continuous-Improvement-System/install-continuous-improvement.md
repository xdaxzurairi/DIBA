# 📈 Continuous Improvement System — Installation Guide

## Overview
Adds a self-learning loop to your AI companion. Reflects on session work, detects behavioral patterns, and builds persistent instincts that grow with confidence over time.

---

## Prerequisites

- Core memory system installed
- Hooks system active (for automatic observation capture)
- `~/.claude/instincts/` folder must exist

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Continuous-Improvement-System/
├── README.md
├── SKILL.md
└── install-continuous-improvement.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/continuous-improvement.md`

---

### Step 2: Create Instincts Folder

```bash
mkdir -p ~/.claude/instincts
```

---

### Step 3: Update `main/identity-core.md`

```markdown
## Continuous Improvement Protocol
After completing significant work:
1. Run `Feature/Continuous-Improvement-System/SKILL.md`
2. Generate session reflection
3. Analyze observations for patterns (if 20+ exist)
4. Create/update instinct YAML files
5. Display instinct status
```

---

### Step 4: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 📈 Continuous Improvement System — session reflection + instinct building from observed patterns
```

---

### Step 5: Test

After completing a task:
```
/continuous-improvement
```

Expected output:
- Session reflection with what worked/failed
- Observation count for current project
- Instinct status (likely CAPTURE level initially)
