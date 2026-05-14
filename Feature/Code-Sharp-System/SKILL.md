# ✏️ Code-Sharp System — Skill Plugin

## Skill Name
Code-Sharp

## Trigger Words
- Auto-trigger before any code write or edit
- `"code-sharp"`
- `"sharp"`
- `"ikut standard"`

## Suppression
None — always active before code generation.

## Activation Condition
Fires automatically before writing or editing any code file. Also fires manually on command.

## Core Principles

### 1. FAST — Straight to code
- Do not explain before doing — code first, explain only if needed
- Do not ask questions answerable from context
- Do not restate the user's instruction before acting
- One round-trip: read → understand → write → deliver

### 2. CLEAN — Minimum, no extras
- Write only what was asked — no bonus features
- No unnecessary comments (`// this sets the variable`)
- No dead code, no leftover `console.log` debug lines
- No unused imports
- One function, one responsibility — no mixed logic

### 3. CONSISTENT — Match the existing file
Before writing code in an existing file, **scan first**:

| Item | How to Scan |
|------|-------------|
| Indentation | Tab or space? How many? |
| Quote style | Single `'` or double `"`? |
| Naming convention | camelCase / snake_case / PascalCase? |
| Function style | `function foo()` or arrow `const foo = () =>`? |
| Error handling | Try-catch, return false, or die()? |
| Block structure | Opening brace on same line or new line? |

Follow existing patterns — do not introduce a new style into an old file.

### 4. PRECISE — Change only what was asked
- Do not touch lines unrelated to the request
- Do not refactor while fixing — if asked to fix a bug, fix the bug only
- If another issue is spotted, **report it** — do not auto-fix without permission
- Use the smallest possible `old_string → new_string`, not a full block rewrite

## Behavior

### Step 1 — Scan (if editing existing file)
Read the file. Extract: indentation, quotes, naming, function style, error handling, block structure.

### Step 2 — Write
Apply all four principles. Use smallest edit scope possible.

### Step 3 — Pre-Send Check
```
[ ] Code matches current file style?
[ ] No unrelated lines changed?
[ ] No unused imports/variables/functions?
[ ] No debug artifacts left behind?
[ ] Logic is correct — not just looks correct?
[ ] Critical edge cases handled?
```

### Step 4 — Deliver
- Code in proper code block with language tag (` ```php `, ` ```js `, etc.)
- For partial edits: show 2–3 lines of context before and after
- For multiple files: list `File 1 → File 2` — do not dump all at once
- Explanation: **after** code, not before — and only if needed

## Decision Hierarchy

```
1. Explicit user instruction
2. Existing patterns in the file
3. Language/framework standard
4. AI own judgment (last resort)
```

Conflict between (2) and (3) → follow (2).

## Anti-Patterns

| Anti-Pattern | Example |
|---|---|
| Over-engineer | Building a class for something 3 lines can solve |
| Speculative code | `// for future use...` |
| Defensive nonsense | Validating things that cannot be null in internal flow |
| Copy-paste without adapting | Old variable names left in new code |
| Silent assumption | Assuming input format without checking or asking |
| Rename creep | Changing function/variable names that were not requested |

## Stack-Aware Scan (Lv.2)
When scanning for consistency (Principle 3), auto-detect stack from file extension:

| Extension | Additional Scan |
|-----------|----------------|
| `.php` | Check: `include` vs `require`, PDO vs mysqli, `$_POST` sanitization pattern |
| `.js` | Check: `var`/`let`/`const` preference, async pattern (promise/await), event listener style |
| `.sql` / queries in `.php` | Check: COLLATE convention, named params vs `?`, TOP vs LIMIT |
| `.css` / `.html` | Check: Tailwind class order convention, inline style vs class |

Scan is silent — only adjusts output if inconsistency is found.

## Companion Skills
- Auto-Worker-System → all code edits dispatched by auto-worker follow these principles
- Security-Audit-System → security fixes follow code-sharp during remediation

## Level History
- **Lv.1** — Base: 4 principles (FAST, CLEAN, CONSISTENT, PRECISE), 6-item pre-send checklist, anti-pattern table, output format rules, decision hierarchy. (Origin: DIBA production code generation standard, xdaxzurairi)
- **Lv.2** — Stack-Aware Scan: auto-detect file extension and tailor scan to PHP/JS/SQL/CSS specific patterns — checks additional conventions silently without requiring explicit instruction. (Origin: PHP+MSSQL+JS project stack, 2026-04-28)
