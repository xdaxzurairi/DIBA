# 🔍 DIBA Recall System

A workspace-aware memory recall layer. Detects the current workspace, looks up the relevant project memory, loads global session state, and delivers a concise recap — ready to continue where things left off.

---

## What It Does

- **Detects** current workspace automatically
- **Looks up** project registry for a matching project memory
- **Loads** global memory: current session, open reminders
- **Delivers** a brief recap and asks for continuation direction

---

## When to Use

Activate when:
- Resuming work after a break
- Starting a new session on a known project
- Needing a quick context refresh

Trigger phrases:
- `"diba"` / `"recall"` / `"ingat semula"`
- Session start in any known workspace

---

## Output Format

```
=== Recall: [Workspace / Project] ===

Sesi lepas: [topic + key decision]

Open reminders: [if any]

Arah seterusnya: [suggested or ask]
```

---

## Requirements

- `main/current-session.md` — last session state
- `main/reminders.md` — open reminders
- Project registry (if LRU-Project-Management-System installed)

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Session-Briefing-System** | Session brief owns the startup brief; DIBA Recall is for on-demand or deep recall |
| **LRU-Project-Management-System** | Recall pulls active project context from LRU registry |
| **Reminders-System** | Surfaces open reminders during recall |

---

## Installation

See `install-diba-recall.md` for setup steps.
