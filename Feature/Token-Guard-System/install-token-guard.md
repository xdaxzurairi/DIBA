# 🔋 Token Guard System — Installation Guide

## Overview
Prevents session failures from token exhaustion. Activates compact mode, enforces smart tool usage, and saves checkpoints for seamless session recovery.

---

## Prerequisites

- Core memory system installed
- `memories/session/` folder must exist (create if not present)

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Token-Guard-System/
├── README.md
├── SKILL.md
└── install-token-guard.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/token-guard.md`

---

### Step 2: Create Session Memory Folder

```
memories/
└── session/      ← create this if not present
```

---

### Step 3: Update `main/identity-core.md`

```markdown
## Token Management Protocol
When token limit is approaching or user triggers token-guard:
1. Read `Feature/Token-Guard-System/SKILL.md`
2. Activate compact mode immediately
3. Enforce smart tool rules for remainder of session
4. Save checkpoint if requested or if context is nearly full
```

---

### Step 4: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 🔋 Token Guard System — compact mode, checkpoints, and smart tool rules for long sessions
```

---

### Step 5: Test

```
token guard
```

Expected output (3 lines):
```
Compact mode aktif.
Checkpoint: tiada.
Kerja semasa: [current task].
```

---

## Customization

### Change early warning threshold
Edit `SKILL.md` → Proactive Early Warning table. Default is 40 tool calls:
```
| Tool calls in session | ≥ 60 calls | Suggest checkpoint |
```

### Change checkpoint location
Edit `SKILL.md` → Checkpoint Save step. Replace `memories/session/checkpoint.md` with your preferred path.
