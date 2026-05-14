# 📈 Continuous Improvement System

A self-learning layer that reflects on session work, detects behavioral patterns from observations, and builds persistent instincts over time. Run after completing significant work to close the learning loop.

---

## What It Does

Three steps run in sequence after significant work:

1. **Reflect** — generates a session reflection with what worked, what failed, and a rule to add
2. **Analyze Observations** — reads the observations log; detects patterns across 20+ observations and creates/updates instinct files
3. **Show Status** — displays all instincts for the current project and globally with confidence levels

---

## Instinct Confidence Levels

| Level | Threshold | Behavior |
|-------|-----------|----------|
| CAPTURE | < 20 observations | Collecting data, no instincts yet |
| ANALYZE | 20+ observations | Patterns detected, instincts created |
| SUGGEST | Confidence ≥ 0.60 | AI suggests the instinct before acting |
| AUTO-APPLY | Confidence ≥ 0.85 | AI applies automatically |

---

## Output Format

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
```

---

## When to Use

Run after completing significant work. Trigger: `"continuous-improvement"` or `/continuous-improvement`

---

## Requirements

- `~/.claude/instincts/<project-hash>/observations.jsonl` — auto-populated by hooks
- `~/.claude/instincts/` folder — for instinct YAML files

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Forge-Self-Improvement-System** | Forge creates skills from patterns; Continuous Improvement creates instincts |
| **Discipline-System** | Instincts reinforce the 7 laws through observed patterns |

---

## Installation

See `install-continuous-improvement.md` for setup steps.
