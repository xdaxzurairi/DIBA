# ✏️ Code-Sharp System

A code generation standard for AI operators. Enforces fast, clean, consistent, and precise code output — automatically triggered before any code is written or edited.

---

## What It Does

Applies four principles to every code generation and edit:

- **Fast** — goes straight to code, no preamble
- **Clean** — writes only what was asked, no extras
- **Consistent** — scans existing file style before writing
- **Precise** — changes only what was requested

---

## When to Use

Auto-triggers before any code is written or edited.
Manual trigger: `code-sharp`, `sharp`, `ikut standard`

---

## The Four Principles

| Principle | Rule |
|-----------|------|
| **Fast** | Code first, explain only if needed |
| **Clean** | No bonus features, no debug artifacts, no unused imports |
| **Consistent** | Scan existing file style before writing — match it |
| **Precise** | Change only what was asked; report other issues, don't auto-fix |

---

## Pre-Send Checklist

```
[ ] Code matches current file style?
[ ] No unrelated lines changed?
[ ] No unused imports/variables/functions?
[ ] No debug artifacts left behind?
[ ] Logic is correct — not just looks correct?
[ ] Critical edge cases handled?
```

---

## Decision Hierarchy

```
1. Explicit user instruction
2. Existing patterns in the file
3. Language/framework standard
4. AI own judgment (last resort)
```

If (2) conflicts with (3), follow (2) — consistency within the project outweighs external best practice.

---

## Requirements

- No external files required
- Operates on current file context

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Auto-Worker-System** | Code edits dispatched by auto-worker follow code-sharp automatically |
| **Security-Audit-System** | Security fixes follow code-sharp principles during remediation |

---

## Installation

See `install-code-sharp.md` for setup steps.
