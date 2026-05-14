# 🔋 Token Guard System

A context management layer that prevents session failures from token exhaustion. Activates compact response mode, enforces smart tool usage, prunes stale context, and saves checkpoints so work can resume without losing progress.

---

## What It Does

Four mechanisms that work together to extend session life:

- **Compact Mode** — ultra-short responses, no preamble, no redundancy
- **Smart Tool Rules** — batch all parallel calls, targeted reads only, no redundant searches
- **Context Pruning** — identify and discard stale context; save state to session memory
- **Session Checkpoint** — save work state to a file; resume in a new session without re-reading everything

---

## When to Use

Activate when:
- Token limit is approaching
- Session has many tool calls (≥ 40)
- User says: `"jimat token"`, `"context limit"`, `"compact mode"`, `"checkpoint"`

Also activates proactively via early warning detection (Lv.2).

---

## Commands

| Command | Action |
|---------|--------|
| `/token-guard compact` | Activate compact mode only |
| `/token-guard checkpoint` | Save session checkpoint now |
| `/token-guard resume` | Read checkpoint and continue work |
| `/token-guard status` | Report token usage estimate + active checkpoint |

---

## Checkpoint Format

```markdown
# Checkpoint — [YYYY-MM-DD HH:MM]

## Current Task
[What is being worked on]

## Status
- [x] Completed steps
- [ ] Remaining steps

## Active Files
- `path/to/file` — [what/why]

## Critical Context
[Key info needed to resume]

## Next Steps
1. [First concrete step]
2. [Second concrete step]

## Decisions Made
- [Decision 1]
```

---

## Requirements

- Session memory folder: `memories/session/` (for checkpoint storage)

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Work-Plan-Execution** | Checkpoint aligns with plan state for clean resume |
| **Session-Briefing-System** | Brief at resume includes checkpoint summary |

---

## Installation

See `install-token-guard.md` for setup steps.
