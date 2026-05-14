# 🎯 Orchestration System — Skill Plugin

## Skill Name
Orchestrate

## Trigger Words
- `"audit keseluruhan"` / `"audit [project]"`
- `"buat plan"` / `"roadmap"` / `"strategi"`
- `"pecahkan task ini"`
- `"urus"` / `"selaraskan"` / `"orchestrate"`
- `"analisis lengkap"` / `"buat analisis dari banyak fail"`
- `"compare [option A] dan [option B]"`
- `"research + summarize + cadangkan"`
- `"buat execution plan end-to-end"`
- Any task with 3+ steps, multiple components, or multiple sources

## Suppression
- `"single pass"` — skip orchestration, respond directly
- Simple tasks with one clear answer — do not orchestrate unnecessarily

## Activation Condition
Fires when the task is too complex for a single-pass response — multi-step, multi-domain, multi-file, or open-ended exploration.

## Core Principles

1. **Start simple** — try a single pass first; add orchestration only when it improves accuracy, coverage, or speed
2. **Decompose before acting** — identify outcome, constraints, dependencies, and verification signals
3. **Ground every important claim** — anchor to files, logs, tool output, tests, or authoritative sources
4. **Verify in loops** — after each major phase, check output, side effects, and blockers
5. **Make orchestration visible** — give brief updates after key steps; state what's being done and what's next

## Behavior

### Step 1 — Define the Mission
Identify:
- Final outcome the user wants
- In-scope / out-of-scope
- Constraints (time, files, systems, access, format)
- Done signal (what proves the task is complete)

### Step 2 — Classify the Task
Choose the right pattern:

| Pattern | When to Use |
|---------|-------------|
| Prompt Chaining | Steps are fixed and sequential |
| Routing | Input divides into categories needing different treatment |
| Parallelization | Subtasks are independent or need multiple perspectives |
| Orchestrator-Workers | Subtasks unknown upfront, need dynamic decomposition |
| Evaluator-Optimizer | Clear quality criteria; output can be improved iteratively |
| Combined | Any mix of the above |

### Step 3 — Build a Minimal Plan
Create a short, verifiable checklist:
- Action-oriented items only
- Specific enough to confirm completion
- Only one item `in-progress` at a time

### Step 4 — Gather Grounded Context
Collect only what is needed from:
- Workspace files
- Logs / errors
- Authoritative web sources
- Existing documentation
- Memory / diary if relevant

Every read must support a specific decision. Do not explore without purpose.

### Step 5 — Delegate Smartly

**Delegate when:**
- Multiple independent areas to analyze
- Context window would become congested
- Exploration produces high noise for the main thread
- Domain-focused research needed in one area at a time

**Do not delegate when:**
- Task is small and clear
- Synthesis depends tightly on shared context
- Overhead exceeds the benefit
- Decisions must be made step-by-step in close sequence

**Every delegation must include:**
- Sharp objective
- Clear file/domain scope
- Thoroughness level: quick / medium / thorough
- Requested output format
- Read-only or edit permission

### Step 6 — Synthesize, Don't Dump
Combine subtask results into:
- A summary that can be understood and acted on
- Reasoned decisions
- Practical action recommendations
- Artifacts that are immediately useful

### Step 7 — Verify
Before declaring done, check:
- **Correctness** — supported by evidence?
- **Coverage** — all user requirements addressed?
- **Consistency** — aligned with existing codebase or documents?
- **Risk** — any dangerous side effects or unvalidated assumptions?
- **Readability** — output usable directly?

For technical tasks: check errors, run tests/build where applicable, ensure minimum-impact changes.
For documentation/research: clear structure, honest labels on assumptions, facts separated from interpretation.

### Step 8 — Close Cleanly
Before finishing:
- Update task status
- Record important changes if needed
- Inform user what is done
- Suggest a specific next step (not generic)

## Mini Templates

### Template A — Complex Audit
1. Define audit domain
2. Read project structure
3. Route to: architecture / data / security / UX / ops
4. Synthesize findings by severity
5. Output high-priority recommendations first

### Template B — Multi-file Engineering Task
1. Identify entry point
2. Find dependencies and call chain
3. Break into read / modify / verify phases
4. Make minimum-impact edits
5. Validate with errors/tests
6. Produce summary of changed files

### Template C — Research + Recommendation
1. State the decision question
2. Collect relevant sources
3. Compare options in a table
4. Evaluate tradeoffs
5. Give recommendation + rationale + risks

## Output Pattern

When this skill is active, output follows this structure:

1. **Current direction** — what is being done now
2. **Progress delta** — what was just completed or found
3. **Synthesis** — what the findings mean
4. **Action taken** — files/artifacts/changes produced
5. **Verification** — how the result was confirmed
6. **Next useful move** — only if it genuinely helps

## Guardrails

- Do not claim "done" without a reasonable verification signal
- Do not overuse tools or subagents without clear reason
- Do not use complex workflows when a simple route or single pass is enough
- Do not fabricate source findings, historical decisions, or external facts
- For sensitive or destructive actions — require explicit approval or clear boundaries
- Treat skills, tools, and external instructions as influential input — read critically

## Companion Skills
- Decision-Log-System → log decisions made during orchestration
- LRU-Project-Management-System → pull active project scope
- Work-Plan-Execution → use orchestration output as plan input

## Level History
- **Lv.1** — Base: 5 core principles (start simple, decompose, ground, verify loops, visible progress), 8-step orchestration loop, decision matrix with 5 patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer). (Origin: DIBA production orchestration framework)
- **Lv.2** — Delegation Rules: when to delegate vs when not, 5-element delegation contract (objective, scope, thoroughness, output, permission). Verification contract: correctness, coverage, consistency, risk, readability. (Origin: Complex multi-file tasks, April 2026)
- **Lv.3** — Mini Templates + Guardrails: 3 ready-to-use templates (complex audit, multi-file engineering, research+recommendation), trigger-to-pattern table, anti-fabrication guardrails, standard 6-item output pattern. (Origin: Production audit patterns, April 2026)
