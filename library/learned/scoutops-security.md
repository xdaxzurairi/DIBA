# ScoutOps security — 2026-10-22

- PHP emergency CVEs require binary patches. Application checks alone do not fix flaws before request initialization.
- vercel-php@0.9.0 ignores Composer platform requirements during install; its explicit scripts.vercel hook must check the actual bundled PHP version. Published package verified, not master alone.
- Global multi-tenant sync settings cannot be safely assigned by updated_by; preserve unassigned rows, revoke legacy tokens, provision per-tenant settings explicitly.
- PHP session user attributes must not bypass DB revalidation. Per-request caching plus credential/role/org fingerprint revokes stale sessions without a schema change.
- Limit XML expansion AND structure before allocation; streaming XMLReader avoids building a hostile DOM. Stress cases passed under64MiB with PHP-recorded peak16MiB.
- Evidence: scoutops commit cf9782d, 69 PHP checks +8 PostgreSQL checks +2 memory stress cases, 94 PHP lint passes. Production remains unchanged/unverified.
- Tools: PHP8.5.12 official SHA256-verified portable binary and PGlite test-only modules in XDIBAX/.tmp-scoutops-php; not application dependencies.
- Tool lessons: enable openssl for Composer; set Python stdout UTF-8 before printing source with Unicode; use cwd-relative paths consistently. Composer schema has an informational missing-license warning; no licensing declaration was invented.
- New-folder signals below are inventory observations, not proof that those folders were audited or deployed. Repeated runtime artifact alerts need separate noise-filter work, outside this fix.

## Processed inventory signals
| 2026-10-22T01:02:08.709Z | new-folder | .agents/skills/biz-head/, .agents/skills/compliance-check/, .agents/skills/contract-reviewer/, .agents/skills/design-head/, .agents/skills/dev-head/, .agents/skills/finance-head/, .agents/skills/financial-snapshot/, .agents/skills/hook-generator/, .agents/skills/invoice-chaser/, .agents/skills/legal-head/, .agents/skills/memory-head/, .agents/skills/mkt-head/, .agents/skills/ops-head/, .agents/skills/post-writer/, .agents/skills/social-head/, .claude-flow/policy/, .claude/skills/biz-head/, .claude/skills/compliance-check/, .claude/skills/contract-reviewer/, .claude/skills/design-head/, .claude/skills/dev-head/, .claude/skills/finance-head/, .claude/skills/financial-snapshot/, .claude/skills/hook-generator/, .claude/skills/invoice-chaser/, .claude/skills/legal-head/, .claude/skills/memory-head/, .claude/skills/mkt-head/, .claude/skills/ops-head/, .claude/skills/post-writer/, .claude/skills/social-head/, .tmp-scoutops-php/, bsmwebsite/, daily-diary/archived/2026-07/, daily-diary/archived/2026-08/, daily-diary/archived/2026-09/, main/BFMwebsite/ |
| 2026-10-22T01:05:32.402Z | new-folder | .tmp-scoutops-php/, bsmwebsite/, daily-diary/archived/2026-07/, daily-diary/archived/2026-08/, daily-diary/archived/2026-09/, daily-diary/current/, main/BFMwebsite/ |
