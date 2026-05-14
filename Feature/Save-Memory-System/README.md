# 💾 Save Memory System

A persistent memory management layer that saves important information across sessions. Passively monitors conversation for memory-worthy moments and saves automatically — with staleness auditing to keep memory accurate over time.

---

## What It Does

- **Saves on command** — preserves preferences, decisions, context, and references
- **Auto-detects** memory-worthy moments passively during conversation (Lv.2)
- **Audits stale memories** — flags old memories that may reference changed files or outdated state (Lv.3)
- **Confirms** what was saved so the user stays informed

---

## Memory Types

| Type | What It Stores |
|------|---------------|
| `user` | Role, expertise, preferences, communication style |
| `feedback` | Corrections and confirmed approaches |
| `project` | Decisions, goals, constraints, active work |
| `reference` | External systems, paths, URLs |

---

## When to Use

**Command trigger:**
- `"save"` / `"save memory"` / `"save progress"` / `"update memory"` / `"ingat"` / `"simpan"`

**Auto-detect signals (Lv.2):**
- User states a preference: `"saya prefer cara ini"`
- Approach confirmed: `"yes perfect, keep doing that"`
- Approach rejected: `"no, jangan buat macam tu"`
- User role/expertise mentioned
- Important project decision made
- New external reference introduced

---

## Staleness Thresholds (Lv.3)

| Memory Type | Stale After | Check |
|-------------|------------|-------|
| `project` referencing specific files | 30 days | File still exists? |
| `feedback` referencing specific workflows | 60 days | Still relevant? |
| `reference` with URL or path | Every session | Path still valid? |
| `user` about expertise/role | 90 days | Still accurate? |

---

## Requirements

- Memory folder: `~/.claude/projects/<workspace>/memory/`

---

## Installation

See `install-save-memory.md` for setup steps.
