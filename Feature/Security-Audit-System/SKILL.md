# 🔒 Security Audit System — Skill Plugin

## Skill Name
Security Audit Remediation

## Trigger Words
- User pastes or provides a security audit report or findings list
- `"security audit"` / `"audit report"` / `"isu security"` / `"findings"`
- Output from semgrep, CodeQL, or manual audit provided

## Suppression
- Regular bug fixes without security context → DORMANT
- Performance, UI, or feature work → DORMANT

## Activation Condition
Fires when security findings or an audit report is provided. Triage happens before any fix.

## Behavior

### Step 1 — Ingest & Triage

Read all findings and categorize:

| Severity | Examples | Fix Order |
|----------|---------|-----------|
| Critical | RCE, auth bypass, hardcoded credentials in prod | Fix first |
| High | SQL injection, CSRF, exposed error messages | Fix second |
| Medium | Missing rate limit, insecure headers, debug output active | Fix third |
| Low | Type hints, code smell, dead code | Fix last / skip |

Output triage:
```
Triage Summary
==============
Critical (X): [brief list]
High     (X): [brief list]
Medium   (X): [brief list]
Low      (X): [brief list]

Cadangan: mulakan dengan [category] — [reason]. Proceed?
```

### Step 2 — Batch Planning

Before fixing, identify which files can be batched:
- Files with **same type of issue** → fix together (e.g. 40 files with `$e->getMessage()` exposed)
- Files with **different issues** → fix one by one with verification

For batch fixes (5+ files, same issue type), confirm first:
```
Batch fix: [issue type] — [X files]
Contoh perubahan: [before] → [after]
Proceed batch?
```

### Step 3 — Fix by Severity

For each category (Critical → High → Medium):
- [ ] Fix all issues in that category
- [ ] Verify: re-read changed files to confirm correctness
- [ ] Ask user before proceeding to next category (if changes are significant)

**Prohibited during fix:**
- Do not change API contract (request/response format) without checking all callers
- Do not remove existing error handling — add to it, never remove
- Do not leave temporary diagnostic scripts after fix is complete

### Step 4 — Temp Script Cleanup

After all fixes, find and remove temp/diagnostic scripts created during the session:
- [ ] Search for files with prefix `debug_`, `test_`, `tmp_`, or files noted as "delete after use"
- [ ] Confirm with user before deleting
- [ ] Delete and verify removal

### Step 5 — Structured Commit

Suggest a clear commit message per category:

```
security: [main category fixed]

- [issue 1]: [file / brief change]
- [issue 2]: [file / brief change]
- [if batch]: mass fix [X files] — [issue type]
```

Example:
```
security: fix SQL injection + remove hardcoded credentials

- SQL injection: PDO bind params on 3 files in admin/
- Credentials: move GOOGLE_CLIENT_ID, SSO_SECRET to .env
- Mass fix 108 files: DB error exposure → error_log + generic message
```

### Step 6 — Post-Fix Summary

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

## Mandatory Rules

1. **Triage first** — never fix without triage; critical issues may be missed
2. **Batch confirm** — for 5+ files same type, show example change before proceeding
3. **Temp scripts must be cleaned** — every session must end with cleanup check
4. **Commit per category** — avoid one massive commit that is hard to review
5. **Do not change API contract** without checking all callers first
6. **Low severity = optional** — ask user whether to include or skip

## Reference Docs

| File | Use For |
|------|---------|
| `references/php_security_patterns.md` | PHP fix patterns: SQL injection, CSRF, credentials, error exposure, N+1, COLLATE |
| `references/mass_fix_checklist.md` | Batch operation checklist, commit strategy, known edge cases |

## Companion Skills
- Code-Sharp-System → all fixes follow code-sharp principles
- Auto-Commit-System → structured commits after each category

## Level History
- **Lv.1** — Base: triage by severity (Critical/High/Medium/Low), batch planning for same-type issues, temp script cleanup, commit per category, post-fix summary. (Origin: Repeated pattern 3× in April 2026 — eRuangNiaga security cleanup, full remediation, eWorks security hardening, xdaxzurairi)
- **Lv.2** — Reference Docs: `references/` folder with PHP security patterns and mass fix checklist — knowledge base separated from protocol so skill file stays lean. (Origin: aitmpl.com template research, 2026-04-28)
