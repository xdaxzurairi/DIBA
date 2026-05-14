# 📊 Dashboard System — Installation Guide

## Overview
Adds a visual instinct health dashboard to your AI companion. Renders observation counts, instinct confidence levels, and system health signals — with actionable suggestions after display.

---

## Prerequisites

- Continuous-Improvement-System installed and active
- `~/.claude/instincts/` folder exists with at least one observation or instinct file

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Dashboard-System/
├── README.md
├── SKILL.md
└── install-dashboard.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/dashboard.md`

---

### Step 2: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 📊 Dashboard System — visual instinct health panel with confidence bars and action signals
```

---

### Step 3: Test

```
dashboard
```

Expected output: ASCII dashboard with observation count, instinct breakdown, and health section.

If system is new (< 20 observations): dashboard renders with CAPTURE level and explains the auto-leveling timeline.

---

## Customization

### Change stale threshold
Edit `SKILL.md` → Step 6. Default is 30 days:
```
- If stale instincts (45+ days) > 0 → suggest reviewing
```

### Change top instincts count
Edit `SKILL.md` → Top Instincts panel. Default shows top 5:
```
<list top 10 instincts by confidence with bars>
```
