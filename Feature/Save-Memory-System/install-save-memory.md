# 💾 Save Memory System — Installation Guide

## Overview
Adds persistent cross-session memory management. Saves on command, auto-detects memory-worthy moments, and audits stale memories — so important context is never lost and never misleads.

---

## Prerequisites

- Core memory system installed
- Memory folder: `~/.claude/projects/<workspace>/memory/`

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Save-Memory-System/
├── README.md
├── SKILL.md
└── install-save-memory.md
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/save-memory.md`

---

### Step 2: Verify Memory Folder

Confirm your memory folder exists. Default location for Claude Code:
```
~/.claude/projects/<workspace-hash>/memory/
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 💾 Save Memory System — persistent memory with auto-detect and staleness audit
```

---

### Step 4: Test

```
ingat ni — saya prefer pendek dan direct dalam respons
```

Expected behavior:
1. AI identifies this as a `feedback` memory signal
2. Checks if similar memory already exists
3. Saves to `memory/feedback_response_style.md`
4. Confirms: `"Simpan — feedback: prefer pendek dan direct dalam respons."`

---

## Customization

### Add staleness thresholds
Edit `SKILL.md` → Staleness Audit table. Adjust thresholds for your workflow:
```
| `feedback` about specific tools | > 30 days | Still using that tool? |
```

### Disable auto-detect
Remove the Auto-Detect Protocol section from `SKILL.md` if you prefer command-only saving.
