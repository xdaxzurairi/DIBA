---
name: work-plan
description: "MUST use when user says 'copy plan', 'append plan', 'resume plan',
             'load plan', 'start the plan', 'continue the plan', 'execute plan',
             'run the plan', 'pick up where we left off', or when the AI exits
             plan mode and needs to transfer the plan into execution format. This
             skill manages the full lifecycle of project plans — from plan output
             to tracked checkbox execution with per-todo commits."
---

# Work — Plan Execution Skill
*Plan lifecycle management with tracked execution and context recovery*

## Activation

Three commands, each with its own activation message:

| Command | Activation Message |
|---------|-------------------|
| **Copy Plan** | `"Copying plan to execution format..."` |
| **Append Plan** | `"Appending to existing plan..."` |
| **Resume Plan** | `"Resuming plan execution..."` |

## Context Guard

| Context | Status |
|---------|--------|
| **User says "copy plan", "start the plan"** | ACTIVE — copy and begin execution |
| **User says "append plan"** | ACTIVE — append to existing plan |
| **User says "resume plan", "continue the plan"** | ACTIVE — resume from checkpoint |
| **AI exits plan mode with approved plan** | READY — suggest "copy plan" to user |
| **After context reset in a project with plan file** | READY — suggest "resume plan" |
| **No project context** | DORMANT — no plan action |
| **Personal/casual conversation** | DORMANT — no plan action |

## Command Dispatch

| Command | What It Does |
|---------|-------------|
| `"copy plan"` | Copy latest plan to `[PLAN_LOCATION]/project-plan.md` (fresh start) |
| `"append plan"` | Append latest plan to existing `project-plan.md` (add sections) |
| `"resume plan"` | Resume execution after context reset (pick up from next `[ ]`) |

---

## Copy Plan

1. Scan `[PLAN_SOURCE_PATH]`, pick most recently modified plan file (none found -> ask user for path or to enter plan mode)
2. Transform: convert steps into `- [ ]` checkboxes, preserve diagrams (ASCII/mermaid), keep phase/section grouping, no emoji
3. Write to `[PLAN_LOCATION]/project-plan.md` (overwrite if exists); report "Plan copied — [X] todo items ready"
4. Execute the **Shared Execution Loop**

---

## Append Plan

1-2. Same as Copy Plan steps 1-2
3. Read current `project-plan.md`, count lines. If append would **not** exceed `[LINE_LIMIT]`: append with a `## Appended: [YYYY-MM-DD]` separator, report new/total item counts. If it **would** exceed: archive current file as `project-plan-YYYYMMDD.md`, create fresh `project-plan.md` with new content only
4. Execute the **Shared Execution Loop**

---

## Resume Plan

1. Read `[PLAN_LOCATION]/project-plan.md` (not found -> "No plan found — use 'copy plan' to create one")
2. Parse progress: count `[x]`/`[ ]`/`[~]` items, identify next pending item, read Architecture section for technical context
3. Report status: `Plan Status: [X] completed, [Y] pending, [Z] blocked` + current phase + next task
4. Execute the **Shared Execution Loop** from the next pending item

**Recovery Context**: after a context reset, `"resume plan"` restores working state entirely from the file — no user explanation needed, the plan file IS the recovery mechanism.

---

## Shared Execution Loop

The core cycle that all three commands use after setup:

```
For each [ ] todo item in order:
  1. Execute the task (write code, create files, make changes)
  2. If Auto-Commit is installed → trigger commit for this completed item
  3. Mark the item as [x] in the plan file
  4. Every 5 completed items → save/update the plan file (checkpoint)
  5. Move to the next [ ] item
  6. If item is [~] (blocked) → skip and continue to next
```

### Key Behaviors
- **Per-task commits** — each completed todo gets its own commit (not batched)
- **Checkpoint saves** — plan file is updated every 5 items to prevent loss
- **Skip blocked items** — `[~]` items are flagged and skipped, not stalled on
- **User can pause** — if user says "stop" or "pause", halt at the current item

### Without Auto-Commit
If the Auto-Commit System is not installed, the execution loop still works:
- Tasks are executed and marked `[x]` in the plan file
- Commits must be done manually by the user
- The plan file still serves as the recovery mechanism

---

## Mandatory Rules

1. **Commit chain per-todo** — every completed todo item triggers a commit (if Auto-Commit is installed). Not at the end, not in batches.
2. **Never commit plan files** — `project-plan*.md` stays local as the AI's working reference.
3. **Preserve diagrams** — all visual elements (ASCII art, mermaid diagrams) from the original plan carry over to the plan file.
4. **No emoji in plan files** — clean, parseable markdown only.
5. **Line limit enforcement** — if the plan file exceeds `[LINE_LIMIT]` lines during append, rotate (archive old, create fresh).
6. **Recovery-first design** — the plan file IS the recovery mechanism after any context reset.
7. **Skip blocked items** — mark `[~]`, flag to the user, continue to the next item.
8. **Checkpoint discipline** — update the plan file every 5 completed items, even mid-execution.

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Plan file not found** | Prompt: "No plan found — use 'copy plan' to create one" |
| **All items completed** | Report: "Plan complete! All [X] items done." |
| **Blocked task** | Mark `[~]`, flag reason, continue to next item |
| **User says "stop" / "pause"** | Halt at current item, save plan file, report progress |
| **Plan exceeds line limit** | Archive as `project-plan-YYYYMMDD.md`, start fresh |
| **No plan source files found** | Ask user to enter plan mode first or specify a file path |
| **Multiple plan files in source** | Pick most recently modified, confirm with user |

### Diary Checkpoint (Lv.3)

Selepas setiap **wave** selesai (bukan setiap todo kecil):
- Trigger ringkas save-diary: ringkasan wave + fail diubah + follow-up
- Kemaskini `current-session.md` supaya `resume plan` ada konteks segar

### Risk Tagging (Lv.4)

Semasa copy/append plan, auto-tag items berisiko tinggi:
- `[!]` — destructive ops (DB migration, delete, API contract change)
- `[?]` — ambiguous requirement yang mungkin perlu clarification
- Surface tagged items di awal execution sebagai pre-flight checklist; escalate `[!]` ke Abam sebelum execute

### Parallel Wave & Adaptive Replan (Lv.5-6)

Untuk parallel dispatch (group independent `[ ]` items ke sub-agents, wave barrier) dan replan bila blocker muncul (reorder, cadang alternatif, log via `log-decision`) — rujuk skill **orchestrate** untuk pattern penuh (Decision Matrix, Delegation Rules, Verification Contract). Work-plan hanya trigger orchestrate bila wave ada 2+ independent item atau blocker affect >30% remaining items; fallback sequential jika dispatch gagal.

## Level History

- **Lv.1** — Base: Three commands (copy/append/resume) + shared execution loop + per-todo commit chain + line rotation + recovery mechanism + checkpoint saves. (Origin: Production AI companion plan execution workflow)
- **Lv.2** — Wave Execution: Dependency-aware wave grouping — independent tasks within a phase can be executed in parallel via sub-agents, with wave barriers enforcing order between dependent groups.
- **Lv.3** — Diary Checkpoint: save-diary + current-session selepas setiap wave. (Origin: 2026-05-22 — naikkan skill batch)
- **Lv.4** — Risk Tagging: auto-tag destructive/ambiguous items, pre-flight checklist. (Origin: 2026-06-12)
- **Lv.5** — Parallel Wave Dispatch: independent tasks dalam wave dispatch ke sub-agents. (Origin: 2026-06-12)
- **Lv.6** — Adaptive Replan: auto-reorder bila blocker hit, cadang alternative. (Origin: 2026-06-12)
