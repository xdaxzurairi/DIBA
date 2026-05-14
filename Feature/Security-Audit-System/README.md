# 🔒 Security Audit System

A structured remediation protocol for security findings. From audit report to clean commit — triage by severity, batch fix same-type issues, clean up temp scripts, and commit per category. No finding left behind.

---

## What It Does

- **Triages** findings by severity: Critical → High → Medium → Low
- **Batch-plans** same-type issues for mass fix
- **Fixes** category by category with user confirmation at boundaries
- **Cleans up** temp and diagnostic scripts after fix
- **Commits** with structured security commit messages per category

---

## When to Use

Activates when:
- Security audit report or findings list is provided
- Output from semgrep, CodeQL, or manual audit is given
- User says: `"security audit"`, `"audit report"`, `"isu security"`, `"findings"`

Does **not** activate for regular bug fixes, performance work, or UI changes.

---

## Triage Format

```
Triage Summary
==============
Critical (X): [brief list]
High     (X): [brief list]
Medium   (X): [brief list]
Low      (X): [brief list]

Cadangan: mulakan dengan [category] — [reason]. Proceed?
```

---

## Severity Guide

| Severity | Examples | Fix Order |
|----------|---------|-----------|
| Critical | RCE, auth bypass, hardcoded credentials in prod | First |
| High | SQL injection, CSRF, exposed error messages | Second |
| Medium | Missing rate limit, insecure headers, debug output active | Third |
| Low | Type hints, code smell, dead code | Last / skip |

---

## Commit Format

```
security: [main category fixed]

- [issue 1]: [file / brief change]
- [issue 2]: [file / brief change]
- [if batch]: mass fix [X files] — [issue type]
```

---

## Post-Fix Summary

```
Remediation Complete
====================
Critical: X issues — [status]
High:     X issues — [status]
Medium:   X issues — [status]
Skipped:  X issues — [reason]

Temp scripts deleted: [list / none]
Commit created: [yes / pending]
```

---

## Requirements

- Access to audit report or findings list
- Git repository (for structured commits)

---

## Reference Docs

| File | Use For |
|------|---------|
| `references/php_security_patterns.md` | PHP fix patterns: SQL injection, CSRF, credentials, error exposure |
| `references/mass_fix_checklist.md` | Batch operation checklist, commit strategy, known edge cases |

---

## Installation

See `install-security-audit.md` for setup steps.
