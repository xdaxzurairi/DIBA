# 🎯 Orchestration System — Installation Guide

## Overview
Adds structured workflow coordination to your AI companion. When tasks are too complex for a single pass, the AI automatically classifies, decomposes, delegates, and synthesizes — producing grounded, verifiable results.

---

## Prerequisites

- Core memory system installed (`main/current-session.md` must exist)
- **Optional enhancements**: Decision-Log-System, LRU-Project-Management-System, Work-Plan-Execution

---

## Installation Steps

### Step 1: Copy Files

Copy the Orchestration System folder into your memory-core directory:

```
Feature/Orchestration-System/
├── README.md
├── SKILL.md
└── install-orchestration.md
```

If you have a `skills/` folder (Skill Plugin System installed):
- Also copy `SKILL.md` → `skills/orchestrate.md`

---

### Step 2: Update `main/identity-core.md`

Add the following block under your AI's behavior or protocol section:

```markdown
## Orchestration Protocol
When a task involves 3+ steps, multiple files/domains, or open-ended exploration:
1. Read `Feature/Orchestration-System/SKILL.md`
2. Classify the task using the decision matrix
3. Follow the 8-step orchestration loop
4. Apply the appropriate mini template if available
5. Close with the standard 6-item output pattern
```

---

### Step 3: Update `master-memory.md` (Recommended)

Add a reference so it's visible during memory restoration:

```markdown
## Active Features
- 🎯 Orchestration System — structured workflow coordination for complex tasks
```

---

### Step 4: Test

Trigger a simple orchestration:

```
audit this project
```

Expected behavior:
1. AI defines mission and scope
2. Classifies as orchestrator-workers pattern
3. Reads project structure
4. Routes to relevant domains
5. Synthesizes findings
6. Closes with action recommendations

---

## Customization

### Adjust trigger sensitivity
By default, the skill activates for tasks with 3+ implicit steps. To raise the threshold, add to `SKILL.md` Activation Condition:
```
Minimum: 5+ steps or 3+ domains involved
```

### Add domain-specific mini templates
Extend the Mini Templates section in `SKILL.md` with templates for your common use cases:

```markdown
### Template D — [Your Use Case]
1. [step]
2. [step]
3. [step]
```

### Force single-pass mode
For a specific task, say `"single pass"` to bypass orchestration entirely.

---

## Companion System Integration

### With Decision-Log-System
Decisions made during orchestration are auto-logged to `main/decisions.md`. No extra config needed.

### With LRU-Project-Management-System
Active project is pulled as scope context at Step 1 (Define Mission). No extra config needed.

### With Work-Plan-Execution
Use the minimal plan from Step 3 as a work-plan input. Copy to `plans/` for tracking and recovery.
