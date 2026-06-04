# 🤖 Auto-Worker System

A silent delegation layer for AI operators. When the user states a goal without specifying how, the Auto-Worker automatically parses intent, decomposes the work, dispatches tasks to the right workers, resolves blockers independently, and delivers a concise result — without unnecessary interruptions.

---

## What It Does

Turns a high-level goal into completed work:

- **Parses intent** — extracts outcome, domain, constraints, and ambiguities from the user's request
- **Decomposes the task** — identifies parallel vs sequential subtasks and flags risky operations
- **Dispatches workers** — routes each subtask to a subagent, direct execution, or a specialist skill
- **Self-resolves blockers** — handles missing files, unclear patterns, and minor decisions independently
- **Escalates only when necessary** — surfaces decisions that genuinely require the user's call
- **Reports cleanly** — final summary in 8 lines or fewer

---

## When to Use

Activates when the user states a **goal with 2+ hidden steps** without specifying the approach:

- "Audit this project and tell me what's wrong"
- "Set up the auth system"
- "Clean up the codebase"
- "Research X and give me a recommendation"

Does **not** activate for:
- Explicit step-by-step instructions — follow them directly
- Single-step tasks — execute immediately
- Sensitive actions (delete, push, deploy) — confirm first

---

## Output Format

```
Auto-Worker selesai.

Berjaya:
- [Task A] — [result]
- [Task B] — [result]

Nota:
- [autonomous decisions made]
- [files changed]
```

Maximum 8 lines. Silent during execution unless escalation is needed.

---

## Escalation Format

When a decision genuinely requires the user:

```
Auto-Worker perlu keputusan:
[Issue] — [option A] vs [option B]
Cadangan: [A/B] — sebab: [brief reason]
```

---

## Requirements

- No external files required — operates on current workspace and session context
- **Recommended**: `code-sharp` skill for any code edits

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Orchestration-System** | Use for complex multi-domain tasks needing workflow pattern selection |
| **Decision-Log-System** | Auto-log autonomous decisions made during worker execution |
| **security-audit-remediation** | Route security subtasks to specialist skill |

---

## Installation

See `install-auto-worker.md` for setup steps.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
