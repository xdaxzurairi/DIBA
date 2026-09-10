# DIBA Self-Learning Loop — Design Spec
*Date: 2026-07-13*

## Overview

Implement a self-learning loop for DIBA that captures signals from every interaction — user corrections, user approvals, and agent self-detected uncertainty — and converts them into structured lessons (fact/case/rule) stored in a semantic memory store.

The loop uses a dual-layer approach: cheap micro-capture per response, batch extraction on-demand or at session end.

---

## Architecture

```
Response berlaku
      │
      ▼
[DIBA scan signals — 3 jenis]
  1. Abam corrections ("bukan", "salah", "sepatutnya", "actually", "no")
  2. Abam approvals ("exactly", "perfect", "betul", "yes that's it")
  3. Agent self-detect: uncertain language ("rasa macam", "maybe", "not sure")
                        + tool failure (retry, unexpected output)
      │
      ▼ (bila ada signal)
[Micro-capture → main/signal-buffer.md]
  format: | timestamp | type | raw_signal |
      │
      ▼ (on-demand / sesi end)
[auto-learn skill — Batch Extract]
  → classify: fact / case / rule
  → save ke library/learned/facts.md, cases.md, rules.md
  → update main/learned-index.md
      │
      ▼
[echo-recall reads learned-index (Priority 0)]
  → DIBA ada akses kepada semua learned lessons setiap sesi
```

---

## Data Structures

### `main/signal-buffer.md`
Micro-capture log. Append-only. Processed entries ditandakan `[done]`.

```markdown
| timestamp | type | signal |
|-----------|------|--------|
| 2026-07-13T10:32 | correction | Abam: "bukan API call, sepatutnya webhook" |
| 2026-07-13T10:45 | approval | Abam: "exactly" — DIBA suggested hybrid approach |
| 2026-07-13T11:02 | uncertain | DIBA flagged "rasa macam" dalam response auth flow |
| 2026-07-13T11:15 | tool-fail | grep retry x2 — path assumption salah |
```

Signal types:
- `correction` — Abam explicitly betulkan DIBA
- `approval` — Abam explicitly setuju dengan sesuatu non-obvious
- `uncertain` — DIBA sendiri flag uncertainty dalam response
- `tool-fail` — tool call fail, retry, atau output unexpected

### `main/learned-index.md`
In-context index. Load setiap sesi. Max 80 baris supaya sentiasa dalam context window.

```markdown
# DIBA Learned Index
*Last updated: 2026-07-13*

## Facts
- [2026-07-13] Webhook > API call untuk realtime event di projek X

## Cases
- [2026-07-13] Auth flow — DIBA uncertain, perlu semak sebelum suggest

## Rules
- Suggest architecture → tanya confirmation dulu sebelum implement
```

### `library/learned/` (semantic store)

**`facts.md`** — atomic facts dengan source + full context
```markdown
## [2026-07-13] Webhook untuk realtime events
- **Source:** correction dari Abam
- **Context:** DIBA suggest API polling, Abam betulkan ke webhook
- **Fact:** Projek X guna webhook pattern, bukan API call polling
```

**`cases.md`** — episod spesifik: miss → fix → outcome
```markdown
## [2026-07-13] Auth flow suggestion tanpa semak
- **Miss:** DIBA suggest auth approach tanpa semak existing code
- **Fix:** Abam redirect ke semak dulu, baru suggest
- **Outcome:** Masa jimat, suggestion lebih tepat
- **Lesson:** Jangan suggest architecture sebelum read existing implementation
```

**`rules.md`** — general rules extracted dari cases
```markdown
## R001 — Semak sebelum suggest
- **Rule:** Bila nak suggest architecture/approach baru, semak existing code dulu
- **Source:** case 2026-07-13 auth flow
- **Confidence:** medium (1 case)
```

---

## Skill: `auto-learn`

**Trigger:**
- Abam kata "extract lessons" / "process buffer" / "learn from today"
- Abam kata "eod" / "save diary" → chain auto-learn selepas save-diary
- Abam kata "what did we learn" / "update learned"

**Protocol:**
```
1. Read main/signal-buffer.md — kutip semua unprocessed entries
2. Skip jika buffer kosong — report "buffer kosong, tiada lesson baru"
3. Bagi setiap signal:
   a. Classify → fact / case / rule
   b. Extract: [what happened] + [what was wrong/right] + [lesson]
   c. Assign confidence: low (1 instance), medium (2-3), high (4+)
4. Append ke library/learned/facts.md, cases.md, atau rules.md
5. Update main/learned-index.md (ringkas, max 80 baris)
6. Tandakan processed entries dalam buffer: tambah [done] prefix
7. Report: "X lessons extracted — Y facts, Z cases, W rules"
```

**Classification Logic:**
- `correction` + atomic fact → `facts.md`
- `correction` + pattern → `cases.md` + possibly `rules.md`
- `approval` + non-obvious choice → `cases.md` (validated approach)
- `uncertain` + resolved → `cases.md` (miss + how it was resolved)
- `tool-fail` + pattern → `rules.md` (bila nak elak pattern tu)

---

## Changes Required

### 1. CLAUDE.md — tambah standing rules

```markdown
| Selepas setiap response bila ada signal   | micro-capture ke main/signal-buffer.md |
| "eod" / "save diary" / sesi end           | chain auto-learn selepas save-diary    |
| "extract lessons" / "process buffer"      | auto-learn                             |
```

### 2. echo-recall SKILL.md — tambah Priority 0

Dalam Step 2: Search Memory table, tambah baris pertama:

```markdown
| 0 | main/learned-index.md | Extracted lessons — paling actionable, load dulu |
```

### 3. New skill file

`C:/Users/BSM/.claude/skills/auto-learn/SKILL.md`

### 4. New files to create (empty init)

- `main/signal-buffer.md`
- `main/learned-index.md`
- `library/learned/facts.md`
- `library/learned/cases.md`
- `library/learned/rules.md`

---

## Signal Detection Patterns

### Correction signals (Abam)
- "bukan", "salah", "sepatutnya", "actually", "no not that"
- "jangan", "stop doing", "eh wait"
- Direct correction after DIBA output

### Approval signals (Abam)
- "exactly", "perfect", "yes that's it", "betul", "ok bagus"
- "yes keep doing that", "tepat"
- Accepting non-obvious approach without pushback

### Self-detect: uncertain language (DIBA)
- "rasa macam", "maybe", "not sure", "mungkin"
- "I think", "saya rasa", "rasanya"
- Conditional phrasing: "kalau tak silap", "if I recall"

### Self-detect: tool failure
- Tool returns error on first attempt, requires retry
- Grep returns no results → DIBA had wrong assumption
- Read fails → path assumption wrong

---

## Constraints

- `learned-index.md` max 80 baris — bila penuh, prune oldest/lowest-confidence entries
- `signal-buffer.md` — processed entries kekal (audit trail) tapi ditag `[done]`
- Rules butuh min 2 cases untuk upgrade dari `low` ke `medium` confidence
- Micro-capture ringan — max 1 baris per signal, no heavy processing dalam response flow
- echo-recall reads index sahaja (fast) — full semantic store hanya bila user minta detail

---

## Success Criteria

1. DIBA micro-capture signals tanpa slowing down responses
2. `auto-learn` process buffer dalam < 30 seconds
3. `learned-index.md` sentiasa reflect top lessons, dalam context setiap sesi
4. echo-recall surface learned lessons bila relevan
5. Rules confidence naik seiring masa (low → medium → high)

---

*Approved: 2026-07-13*
*Author: DIBA + Abam (Zuex)*
