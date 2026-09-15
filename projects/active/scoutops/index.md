# ScoutOps — MLB Baseball Evaluation Platform
*Platform penilaian pemain baseball (PWA) untuk Baseball Federation Malaysia — RBAC multi-tenant, sabermetric grading, AI-assisted reports. Deployed live on Vercel.*

## Project Overview
- **Type**: Web App (PWA), multi-tenant (per-organization)
- **Period**: 2026-07-15 - Active
- **Tech Stack**: PHP (PDO) + Vanilla JS + **PostgreSQL/Supabase** (migrated from the original MySQL plan — `config/db.php` is pgsql-only now)
- **Completion**: Mature / in production — 79 merged PRs, deployed on Vercel (`vercel-php@0.9.0` runtime)
- **Duration**: ~15 min (audit session)

## Current Status
- **Last Session**: 2026-09-15 - Full security/architecture audit (see below)
- **Next Steps**: Fix the 2 MEDIUM findings (rotate exposed admin hash + delete dead `config/auth.php`; consider Postgres RLS as defense-in-depth). LOW items (CSV formula injection, XLSX size guard, security headers) can batch into one cleanup PR.
- **Known Issues** *(supersedes the 2026-07-15 "no auth" note — that was wrong/stale, written before the project's actual state was checked)*:
  - **MEDIUM**: `config/auth.php` is dead code (superseded by `src/auth_helper.php`) but still carries the real bcrypt hash for the `xdaxzurairi` admin account in git history. Not web-reachable (vercel.json never routes to `config/`), repo appears private — but rotate that password and delete the file.
  - **MEDIUM**: Multi-tenant isolation (`organization_id`) is enforced only at the app layer — Postgres RLS is disabled schema-wide (`sql/007_disable_rls_session_captures.sql`). Every query I traced scopes correctly today, but there's no DB-level backstop for future features.
  - **MEDIUM**: Login + `my_report.php` NRIC-unlock rate limits are per-IP only (5 fails/10min) — bypassable by rotating source IPs. Sharpest on the 4-digit NRIC gate (10,000 combos, per-player throttle key).
  - **LOW**: CSV export (`players_csv.php`) doesn't neutralize leading `=/+/-/@` — formula-injection risk if opened in Excel. XLSX import has no size/entity guard. No security headers (CSP/HSTS/X-Frame-Options) anywhere.
  - Actually solid: bcrypt, CSRF (`hash_equals`), parameterized queries everywhere checked, session fixation protection, DB-backed sessions, high-entropy share tokens, server-side MIME sniffing on uploads, SSRF already host-allowlisted on the Sheets sync.

## Session History (Last 5)

### 2026-09-15 - Full Audit (security + architecture)
- **Changes**: Cloned fresh to `C:/Users/Administrator/xdibax/scoutops` (old tracked path `C:/Users/BSM/...` doesn't exist on this machine). Read auth/session/CSRF stack, SQL/SSRF/XXE surface, upload handling, multi-tenant scoping (verified `build_report()` enforces org isolation), secrets/.gitignore, Vercel routing. Found 0 HIGH, 3 MEDIUM, 3 LOW findings — see Known Issues above. No code changes made (audit only).
- **Time Spent**: ~15 min

### 2026-07-15 - Project Registered
- **Changes**: Clone dari https://github.com/xdaxzurairi/scoutops.git → C:/Users/BSM/xdibax/scoutops. Dibuka dalam VS Code. Didaftarkan dalam XDIBAX project registry.
- **Time Spent**: ~5 min

## Historical Summary
[No history yet — this section is populated when session count exceeds 5]

## Technical Notes
- **Repository**: https://github.com/xdaxzurairi/scoutops.git (appears private — GitHub API 404s unauthenticated; local clone only worked via this machine's saved git credentials)
- **Local Path**: `C:/Users/Administrator/xdibax/scoutops` (this machine — the old `C:/Users/BSM/...` entry was for a different PC)
- **Doc Root**: `public/` — Vercel routes everything through `api/index.php` per `vercel.json`; `config/`, `sql/`, `src/`, `docs/` are never web-served
- **Key Dependencies**: PHP (pdo_pgsql), PostgreSQL via Supabase (Supavisor pooler), Vercel serverless (`vercel-php@0.9.0`)
- **Schema**: `sql/schema_postgres.sql` + numbered migrations `sql/002`–`sql/015`; installed via the token-gated `public/setup.php` (`SCOUTOPS_SETUP_TOKEN`)
- **Config DB**: `config/db.php` — env-var driven (`SCOUTOPS_DB_HOSTS/USER/PASS/...`), local override via gitignored `config/env.local.php`
- **AI providers**: Gemini (primary) → Groq → OpenRouter fallback chain, all optional via env keys (`src/ai_narrative.php`)

---
**Last Updated**: 2026-09-15 | **Position**: #1/10 Active
