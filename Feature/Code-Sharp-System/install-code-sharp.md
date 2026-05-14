# ✏️ Code-Sharp System — Installation Guide

## Overview
Enforces fast, clean, consistent, and precise code generation. Auto-triggers before any code write or edit — no manual activation required after setup.

---

## Prerequisites

- Core memory system installed (`main/current-session.md` must exist)
- No external dependencies

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Code-Sharp-System/
├── README.md
├── SKILL.md
└── install-code-sharp.md
```

If you have a `skills/` folder (Skill Plugin System installed):
- Copy `SKILL.md` → `skills/code-sharp.md`

---

### Step 2: Update `main/identity-core.md`

Add under your AI's behavior section:

```markdown
## Code Generation Standard
Before writing or editing any code:
1. Read `Feature/Code-Sharp-System/SKILL.md`
2. Apply all four principles: FAST, CLEAN, CONSISTENT, PRECISE
3. Run pre-send checklist before delivering code
4. Follow decision hierarchy: user instruction → file patterns → language standard → own judgment
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- ✏️ Code-Sharp System — fast, clean, consistent, precise code generation standard
```

---

### Step 4: Test

Ask for a code edit in an existing file:

```
tambah validation untuk field email dalam form ini
```

Expected behavior:
1. AI scans file style silently
2. Writes only the validation — no extra features
3. Matches existing indentation, quote style, naming
4. Delivers code with minimal context lines

---

## Customization

### Add stack-specific rules
Extend the Stack-Aware Scan table in `SKILL.md` with your project's stack:

```markdown
| `.vue` | Check: Options API vs Composition API, `<script setup>` vs `export default` |
```

### Tighten precision scope
Add to PRECISE principle in `SKILL.md`:
```
Max edit scope: 10 lines — if more, ask user to confirm approach first
```
