# 🎯 Orchestration System

A structured workflow coordination layer for AI operators. When a task is too complex for a single pass, the Orchestration System kicks in — decomposing work, routing to the right pattern, delegating smartly, and synthesizing a grounded final result.

---

## What It Does

Turns the AI from a single-pass responder into a **multi-step orchestrator**:

- **Classifies the task** — picks the right workflow pattern
- **Decomposes the work** — breaks large tasks into verifiable units
- **Delegates intelligently** — routes subtasks, uses subagents where useful
- **Grounds every claim** — anchors findings to files, logs, tools, or real output
- **Synthesizes cleanly** — produces decisions and artifacts, not just summaries
- **Verifies before closing** — checks correctness, coverage, consistency, risk

---

## When to Use

Trigger this system when the task involves:

- Multi-step execution (3+ steps, multiple components or files)
- Parallel investigation across domains
- Research + analysis + recommendation
- Audit of a codebase, system, or document set
- Complex plan or roadmap creation
- Comparing multiple options

Not needed for simple, single-pass tasks — start simple, escalate only when useful.

---

## Workflow Patterns

Five patterns to choose from based on task structure:

| Pattern | Use When |
|---------|----------|
| **Prompt Chaining** | Steps are fixed and sequential (e.g. extract → normalize → summarize) |
| **Routing** | Input splits into categories needing different treatment |
| **Parallelization** | Subtasks are independent or need multiple perspectives |
| **Orchestrator-Workers** | Subtasks are unknown upfront, need dynamic decomposition |
| **Evaluator-Optimizer** | Clear quality criteria exist; output can be improved iteratively |

Patterns can be combined.

---

## Output Format

```
[Current direction — what is being done now]

Progress: [what was just completed or found]
Synthesis: [what the findings mean]
Action taken: [files/artifacts/changes produced]
Verified: [how the result was confirmed]
Next: [next useful move, if applicable]
```

---

## Commands

| Input | Action |
|-------|--------|
| "audit [project/system]" | Triggers orchestrator-workers pattern |
| "pecahkan task ini" | Decomposes task and builds execution plan |
| "compare [option A] vs [option B]" | Triggers parallelization + synthesis |
| "buat plan / roadmap / strategi" | Triggers prompt chaining with research phase |
| Any task with 3+ implicit steps | Auto-classifies and applies best pattern |

---

## Requirements

- No external files required — operates on current workspace context
- **Optional enhancements**: Decision-Log-System, LRU-Project-Management-System

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Decision-Log-System** | Auto-log decisions made during orchestration |
| **LRU-Project-Management-System** | Pull active project context for scoping |
| **Work-Plan-Execution** | Use orchestration output as plan input |

---

## Installation

See `install-orchestration.md` for setup steps.
