# 📈 Continuous Improvement System — Skill Plugin

## Skill Name
Continuous Improvement

## Trigger Words
- `"continuous-improvement"`
- `"/continuous-improvement"`
- After completing significant work (manual trigger)

## Activation Condition
Manual trigger after completing meaningful work. Not auto-triggered — run deliberately.

## Behavior

### Step 1 — Reflect

Generate a session reflection:

```markdown
## Reflection — [Date]
- What worked:
- What failed:
- What I'd do differently:
- Rule to add:
```

If there is a "Rule to add", create an instinct YAML file with **0.6 starting confidence** in the project's instinct directory.

### Step 2 — Analyze Observations

Detect project hash: `git root → SHA-256 first 12 chars`

Check `~/.claude/instincts/<hash>/observations.jsonl`.

**If 20+ lines exist:**
1. Read the last 500 lines
2. Read existing instinct `*.yaml` files (project + global)
3. Detect patterns:
   - User corrections → `"don't do X"` instincts
   - Error→fix sequences → `"when X fails, try Y"`
   - Repeated workflows (3+ times) → `"for X, do A→B→C"`
   - Tool preferences → `"use tool Y for task X"`
4. Create/update instinct YAML files
5. Be conservative: only create instincts for 3+ observations of the same pattern

**If fewer than 20 observations:** skip analysis, note the count.

### Step 3 — Show Status

Display all instincts for current project + global:

```
=== continuous-improvement ===

## Level: [CAPTURE | ANALYZE | SUGGEST | AUTO-APPLY]

## Session Reflection
- What worked: [from this session]
- What failed: [from this session]
- What I'd do differently: [from this session]
- Rule to add: [captured as instinct]

## Learning
  NEW  [instinct-id]   [domain]  [confidence]  (from reflection)
   ↑   [instinct-id]   [domain]  [old]→[new]   (+N observations)

## Instincts — [project-name] ([hash])
  ● [0.85] instinct-id   domain   auto-apply
  ◐ [0.60] instinct-id   domain   suggest
  ○ [0.35] instinct-id   domain   silent

## Instincts — global
  ● [0.90] instinct-id   domain   auto-apply

## Next
- Keep working — hooks capture automatically
- System auto-levels as instincts gain confidence
```

If no instincts or observations exist yet: explain this is expected — system is in CAPTURE level and will create instincts after 20+ observations accumulate.

## Instinct File Format

```yaml
id: [instinct-id]
domain: [domain]
description: [what the instinct does]
confidence: 0.60
observations: 3
rule: [the rule]
created: [date]
updated: [date]
```

## Companion Skills
- Forge-Self-Improvement-System → Forge creates skills from patterns; this system creates instincts
- Discipline-System → instincts reinforce the 7 laws through observed behavior

## Level History
- **Lv.1** — Base: 3-step loop (reflect, analyze observations, show status), instinct creation from 3+ patterns, confidence levels (CAPTURE→ANALYZE→SUGGEST→AUTO-APPLY), instinct YAML format. (Origin: Self-improvement system DIBA, xdaxzurairi)
