# 🔒 Security Audit System — Installation Guide

## Overview
Adds structured security remediation to your AI companion. Triage findings by severity, batch-fix same-type issues, clean up temp scripts, and commit per category — from audit report to clean repo.

---

## Prerequisites

- Core memory system installed
- Git repository (for structured commits)
- **Optional**: `references/php_security_patterns.md`, `references/mass_fix_checklist.md`

---

## Installation Steps

### Step 1: Copy Files

```
Feature/Security-Audit-System/
├── README.md
├── SKILL.md
├── install-security-audit.md
└── references/
    ├── php_security_patterns.md   ← create for your stack
    └── mass_fix_checklist.md      ← create for your project
```

If you have a `skills/` folder:
- Copy `SKILL.md` → `skills/security-audit-remediation.md`

---

### Step 2: Create Reference Docs (Recommended)

Create `references/php_security_patterns.md` with common fix patterns for your stack:

```markdown
# PHP Security Patterns

## SQL Injection
Before: `$db->query("SELECT * FROM users WHERE id = $id")`
After: `$stmt = $db->prepare("SELECT * FROM users WHERE id = ?"); $stmt->execute([$id]);`

## Error Exposure
Before: `catch ($e) { echo $e->getMessage(); }`
After: `catch ($e) { error_log($e->getMessage()); echo "An error occurred."; }`
```

---

### Step 3: Update `master-memory.md` (Recommended)

```markdown
## Active Features
- 🔒 Security Audit System — triage, batch fix, cleanup, and structured commits for security findings
```

---

### Step 4: Test

Paste a sample finding:

```
Finding: SQL injection in admin/users.php line 42
Severity: High
```

Expected behavior:
1. AI acknowledges and asks for full list or proceeds with single finding
2. Outputs triage summary
3. Asks to proceed before fixing
4. Fixes and verifies
5. Suggests structured commit message

---

## Customization

### Add stack-specific patterns
Extend `references/php_security_patterns.md` with patterns for your language/framework.

### Add project-specific edge cases
Document known edge cases in `references/mass_fix_checklist.md` — things that look like an issue but aren't, or files that should be excluded from batch fixes.
