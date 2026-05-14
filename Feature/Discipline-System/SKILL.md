# ⚖️ Discipline System — Skill Plugin

## Skill Name
Discipline

## Trigger Words
- `"discipline"`
- `"7 laws"`
- `"self-check"`
- Auto-check before any significant task

## Activation Condition
Manual trigger for reference. Passive check when red flag phrases appear in AI output.

## The 7 Laws

| # | Law | Check | Red Flag |
|---|-----|-------|----------|
| 1 | **Research Before Executing** | Did I search for existing solutions? | "I'll just quickly..." |
| 2 | **Plan Is Sacred** | Did I state WILL / WILL NOT / VERIFY? | "Let me also add..." |
| 3 | **One Thing at a Time** | Am I finishing before starting? | "While I'm here..." |
| 4 | **Verify Before Reporting** | Did I check the ACTUAL output? | "This should work..." |
| 5 | **Reflect After Sessions** | Did I note what worked/failed? | "I'll remember..." |
| 6 | **Iterate One Change** | Am I changing one thing at a time? | "And also..." |
| 7 | **Learn From Every Session** | Did I capture this as an instinct? | "Next time I'll..." |

## The Loop

```
Research → Plan → Execute (one thing) → Verify → Reflect → Learn → Iterate
```

## Pre-Done Self-Check

Before saying "Done", verify ALL:
- [ ] Code runs without errors
- [ ] Output matches expected result
- [ ] I checked the **actual** result (not assumed)
- [ ] Build passes
- [ ] I can explain the change in one sentence

If skipping a step, that step is the one most needed.

## Red Flag Detection
When the following phrases appear in AI output, pause and apply the relevant law:

| Phrase | Law Violated |
|--------|-------------|
| "I'll just quickly..." | Law 1 — Research first |
| "Let me also add..." | Law 2 — Scope creep |
| "While I'm here..." | Law 3 — One thing at a time |
| "This should work..." | Law 4 — Verify first |
| "I'll remember..." | Law 5 — Document it now |
| "And also..." | Law 6 — One change at a time |
| "Next time I'll..." | Law 7 — Capture it as learning now |

## Level History
- **Lv.1** — Base: 7 laws with check questions and red flags, execution loop, pre-done self-check, red flag detection table. (Origin: AI agent discipline framework, xdaxzurairi)
