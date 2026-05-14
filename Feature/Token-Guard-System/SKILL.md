# 🔋 Token Guard System — Skill Plugin

## Skill Name
Token Guard

## Trigger Words
- `"jimat token"` / `"hemat token"` / `"save token"`
- `"token limit"` / `"context limit"` / `"limit hampir"` / `"context penuh"`
- `"compact mode"` / `"compress context"`
- `"token guard"` / `"activate token guard"`
- `"checkpoint"` / `"reset context"` / `"resume dari checkpoint"`

## Argument Modes
- `compact` — activate compact mode only
- `checkpoint` — save checkpoint now
- `resume` — read checkpoint and continue
- `status` — report token usage estimate

## Activation Condition
Fires on explicit trigger. Also fires proactively when early warning thresholds are reached (Lv.2).

## Behavior — Default Protocol

### Step 1 — Activate Compact Mode
Switch response style to ultra-compact immediately:

| Item | Compact Rule |
|------|-------------|
| Response length | 1–5 lines unless technical output required |
| Preamble / conclusion | REMOVE entirely |
| Repeated information | DO NOT repeat what is already known |
| Long explanations | 3–5 word bullets, not full sentences |
| File content echo | DO NOT re-display file content just read |
| Trivial confirmations | Skip — "OK" only |

### Step 2 — Audit Tool Usage
Check for wasteful patterns. Enforce:

| Rule | Detail |
|------|--------|
| Batch all parallel calls | Combine independent tool calls in one block — never sequential without reason |
| Targeted reads only | Read only needed lines (`startLine`/`endLine`), not full files |
| Grep before read | Find exact location with grep before opening a file |
| Semantic search = last resort | Use only when grep/file_search fails |
| No redundant searches | Never search for the same thing twice in one session |
| Subagents for exploration | Offload search/exploration to Explore subagent |
| Skip validation reads | If a file was just edited, do not re-read to "confirm" |

### Step 3 — Check Existing Checkpoint
Read `memories/session/checkpoint.md` if it exists. If found, show status in 3 lines.

### Step 4 — Report Status
3 lines: mode active, checkpoint status, current work pointer.

### Step 5 — Continue in Compact Mode

## Behavior — Checkpoint Save

When user says `"checkpoint"` or context is nearly full:

1. Write to `memories/session/checkpoint.md`:

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

2. Notify: `"Checkpoint tersimpan. Boleh sambung dengan: /token-guard resume"`

## Behavior — Resume

When user says `"resume"`:

1. Read `memories/session/checkpoint.md`
2. Summarize status to user in **5 lines or fewer**
3. Proceed directly to Next Steps
4. Do not re-read files unnecessarily for orientation

## Proactive Early Warning (Lv.2)

Auto-detect context nearing full **without waiting for user**:

| Signal | Threshold | Action |
|--------|-----------|--------|
| Tool calls in session | ≥ 40 calls | Suggest checkpoint |
| Large files read consecutively | 3+ files > 200 lines | Switch to targeted reads |
| Long responses repeated | 3+ responses > 100 lines | Activate compact mode |
| User asks same thing twice | Repeat query detected | Context may be lost — suggest checkpoint |

When threshold reached, insert one silent warning line:
```
[Token Guard: ~40 tool calls — cadang checkpoint sebelum sambung?]
```

Do not interrupt work — one line only, then continue.

## Mandatory Rules
- Compact mode does NOT reduce work quality — only removes wasted tokens
- Use checkpoint proactively before limit, not after
- Tool batching is mandatory in token-guard mode
- When skill is active: no "Baik!", "Saya faham", or any preamble

## Companion Skills
- Work-Plan-Execution → checkpoint aligns with plan step tracking
- Session-Briefing-System → brief on resume includes checkpoint summary

## Level History
- **Lv.1** — Base: 4 mechanisms (Compact Mode, Smart Tool Rules, Context Pruning, Session Checkpoint), 4 operation modes (compact/checkpoint/resume/status), full default protocol. (Origin: Token management protocol DIBA, xdaxzurairi)
- **Lv.2** — Proactive Early Warning: auto-detect context nearing full via tool call count, large file reads, repeat queries — insert silent one-line warning before user notices. (Origin: Pattern of user being surprised by context overflow, 2026-04-28)
