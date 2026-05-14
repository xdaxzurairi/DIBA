# 🤖 Auto-Worker System — Installation Guide

## Overview
Adds silent delegation capability to your AI companion. The user states a goal; the AI handles decomposition, dispatch, and resolution — reporting back with a concise summary.

---

## Prerequisites

- Core memory system installed (`main/current-session.md` must exist)
- **Recommended**: `code-sharp` principles configured for code edits
- **Optional enhancements**: Decision-Log-System, Orchestration-System, security-audit-remediation

---

## Installation Steps

### Step 1: Copy Files

Copy the Auto-Worker System folder into your memory-core directory:

```
Feature/Auto-Worker-System/
├── README.md
├── SKILL.md
└── install-auto-worker.md
```

If you have a `skills/` folder (Skill Plugin System installed):
- Also copy `SKILL.md` → `skills/auto-worker.md`

---

### Step 2: Update `main/identity-core.md`

Add the following block under your AI's behavior or protocol section:

```markdown
## Auto-Worker Protocol
When the user states a goal with 2+ hidden steps without specifying how:
1. Read `Feature/Auto-Worker-System/SKILL.md`
2. Parse intent silently — do not narrate the parsing
3. Decompose into parallel/sequential/risky subtasks
4. Dispatch each subtask to the right worker
5. Self-resolve blockers; escalate only when genuinely needed
6. Report with synthesis summary in ≤ 8 lines
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 🤖 Auto-Worker System — silent delegation for goals with hidden steps
```

---

### Step 4: Test

Trigger with a goal that has multiple hidden steps:

```
audit the project and tell me what needs fixing
```

Expected behavior:
1. AI parses intent silently (no narration)
2. Decomposes into subtasks (structure, code quality, security, docs, etc.)
3. Dispatches to appropriate workers
4. Resolves any blockers independently
5. Reports in ≤ 8 lines

---

## Customization

### Adjust escalation threshold
By default, escalation triggers for irreversible actions and critical ambiguity. To tighten further, add to `SKILL.md` Step 5:
```
Also escalate when: task touches more than 10 files
```

### Adjust report format
The default synthesis report is ≤ 8 lines. To extend:
```
Report in ≤ 15 lines — include per-task verification status
```

### Suppress for a specific task
Prefix your request with `"step by step:"` to bypass auto-worker and receive explicit instruction-following instead.

---

## Companion System Integration

### With Decision-Log-System
Autonomous decisions made during worker execution are logged to `main/decisions.md`. No extra config needed.

### With Orchestration-System
For tasks that need explicit workflow pattern selection before delegation, trigger Orchestration-System first, then hand the plan to Auto-Worker for execution.

### With security-audit-remediation
Security subtasks detected during decomposition are routed to the specialist skill automatically.
