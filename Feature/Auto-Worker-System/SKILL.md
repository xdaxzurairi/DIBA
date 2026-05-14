# 🤖 Auto-Worker System — Skill Plugin

## Skill Name
Auto-Worker

## Trigger Words
- Any goal with 2+ hidden steps where the user does not specify how
- `"audit this"` / `"set up [X]"` / `"clean up [X]"`
- `"research [X] and recommend"`
- `"fix everything in [project]"`
- `"handle [X] for me"`

## Suppression
- User gives explicit step-by-step instructions → follow directly, do not decompose
- Task is a single clear action → execute immediately
- Task is sensitive (delete, push, deploy, API changes) → confirm before proceeding

## Activation Condition
Fires when the user states a **goal without specifying the method** and the goal implies 2 or more hidden subtasks.

## Behavior

### Step 1 — Intent Parsing (Silent)
Read the user's request. Identify:
- **Outcome** — what is the final result they want?
- **Domain** — code, security, data, docs, infrastructure?
- **Constraints** — which project, which files, what to avoid?
- **Ambiguity** — anything unclear that blocks decomposition?

If critical ambiguity exists (cannot determine which project or which files) → ask ONE specific question before proceeding.

### Step 2 — Task Decomposition
Break the goal into independent subtasks:

```
Goal: [what user wants]
├── Task A: [domain] — [outcome]
├── Task B: [domain] — [outcome]
└── Task C: [domain] — [outcome, depends on A]
```

Identify:
- **Parallel** — tasks independent of each other
- **Sequential** — tasks that depend on another task's output
- **Risky** — edits to critical files, destructive actions, API contract changes

### Step 3 — Worker Dispatch
For each subtask, choose the right execution method:

| Task Type | Method |
|-----------|--------|
| Read / research / explore | Subagent Explore (parallel if independent) |
| Code edit / create | Direct execution, follow code-sharp principles |
| Security check | Subagent or security-audit-remediation skill |
| Multi-file complex change | Subagent with full briefing |
| Simple single-file change | Direct, no subagent |

Every subagent briefing must include:
- Sharp objective (what to find or do)
- Clear file/folder scope
- Read-only or edit permission
- Expected output format

### Step 4 — Self-Resolution
When workers encounter blockers, resolve independently:

| Situation | Action |
|-----------|--------|
| File does not exist | Find alternative, proceed with what exists |
| Pattern unclear | Check other files in project for examples |
| Choice between two approaches | Pick the one more consistent with existing codebase |
| Minor issue that can be resolved | Resolve it, note in final report |
| Issue requiring user decision | Escalate (see Step 5) |

### Step 5 — Escalate Only When Necessary
Escalate to the user **only** when:
- Decision involves a trade-off the user must know about (e.g. changing API contract)
- Action is irreversible (delete files, drop tables)
- Critical ambiguity cannot be inferred from codebase or context
- Task would exceed the original scope the user stated

Escalation format:
```
Auto-Worker perlu keputusan:
[Issue] — [option A] vs [option B]
Cadangan: [A/B] — sebab: [brief reason]
```

### Step 6 — Synthesis Report
After all tasks complete, report in ≤ 8 lines:

```
Auto-Worker selesai.

Berjaya:
- [Task A] — [result]
- [Task B] — [result]

Nota:
- [autonomous decisions made]
- [files changed]
```

## Mandatory Rules

1. **Silent by default** — no progress updates during execution unless asked
2. **Minimum escalation** — resolve independently first; escalate only when genuinely needed
3. **Tight scope** — do not expand beyond what the user requested
4. **Code-sharp always** — all code edits follow code-sharp principles
5. **Risk = confirm** — destructive or irreversible actions require explicit confirmation before proceeding

## Companion Skills
- Orchestration-System → complex multi-domain tasks needing workflow pattern selection
- Decision-Log-System → log autonomous decisions post-execution
- security-audit-remediation → route security subtasks to specialist skill

## Level History
- **Lv.1** — Base: intent parsing, task decomposition (parallel/sequential/risky), worker dispatch (subagent/direct/specialist), self-resolution for worker blockers, minimum escalation with structured format, synthesis report ≤ 8 lines. (Origin: Rewrite from 6-line placeholder to full protocol, 2026-04-28, xdaxzurairi)
