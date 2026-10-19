# BFMwebsite - Laman web + konsol pengurusan liga BFM
*Laman awam + konsol Club Manager/Admin untuk Baseball Federation of Malaysia (Next.js + Supabase + Vercel)*

## Project Overview
- **Type**: Web App
- **Period**: 2026-07-10 - Active
- **Tech Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Supabase (Postgres/Auth/RLS, `@supabase/ssr`)
- **Completion**: ~60% (anggaran — 15 PR merged)
- **Duration**: 0 min (tiada data `Time:` Auto-Commit lagi)

## Current Status
- **Last Session**: 2026-09-29 - Modul Scoresheet rasmi (DakStats stat sheet) + migrate middleware→proxy
- **Features siap**: laman awam (clubs, players, tournaments, standings, matches, news), match centre, rankings, stats + kelulusan kelab, register-club, sign-in/up, forgot/reset password, dashboard, payment form, mampatan foto client-side
- **Next Steps**: PR #16 merged (squash `18a19ea`) + live di Production 2026-09-30. Editor scoresheet diuji Abam (buka + simpan DEMO-2) — OK 2026-09-30. Baki: buang DEMO data (`scripts/demo/scoresheet-cleanup.sql`) sebelum/lepas live
- **DEMO data LIVE dalam production**: kejohanan `DEMO - Ujian Scoresheet`, kelab `DEMO Harimau KL` / `DEMO Helang Perak`, match DEMO-1 (id 2, scoresheet penuh seimbang), DEMO-2 (id 3, kosong), DEMO-3 (id 4, scheduled)
- **Known Issues**: None direkod

## Session History (Last 5)

### 2026-09-29 - Scoresheet module
- **Changes**: Migration `scoresheet` (lajur batting/fielding/participation dalam `player_match_stats`, jadual `match_pitching_stats` + `match_innings`, `matches.away_lob/home_lob/ended_at`) + RPC atomik `save_scoresheet()` (admin sahaja, security definer). Editor admin `/dashboard/matches/[id]/scoresheet` (4 tab, grid keyboard, semakan imbangan). Match Centre: line score dalam hero + ScoresheetView (Batting/Pitching/Fielding, cetak A4). Borang stats manager kini kekalkan lajur scoresheet. `middleware.ts`→`proxy.ts` (commit `b794bea`).
- **Nota**: `authenticated` tiada USAGE pada schema `private` → fungsi SECURITY INVOKER tak boleh panggil `private.is_admin()`; guna DEFINER. Rujukan: DakStats manual DD1385420 Appendix A.

### 2026-09-28 - Project Registered
- **Changes**: Didaftarkan ke LRU (repo sedia ada, commit terkini `f426a72`)
- **Time Spent**: ~0 min

## Historical Summary
[No history yet -- this section is populated when session count exceeds 5]

## Technical Notes
- **Repository**: https://github.com/xdaxzurairi/BFMwebsite (local: `C:/Users/BSM/XDIBAX/main/BFMwebsite`)
- **Key Dependencies**: `@supabase/ssr`, `@supabase/supabase-js`, `next@16.2.10`; migration dalam `supabase/migrations/`; `schema.sql` = rujukan MySQL asal; `design/` = prototaip HTML/React (rujukan visual, bukan kod produksi)
- **Bilingual**: BM + EN, toggle runtime

- **Supabase**: projek `bfmwebsite` (ref `trdbkqcapsyytjwzxajc`, ap-southeast-1) — DB sendiri, 9 migration sepadan `supabase/migrations/` (disahkan 2026-09-28). Tiada `.env` lokal.
- **Vercel**: projek `baseball-federation-malaysia` (team `xdaxzus-projects`), auto-deploy via Git (Production terkini 2026-09-28). Nota: Vercel MCP connector **tak nampak** projek ini (404) — hanya nampak `baseballfedarationmalaysia` (ScoutOps). Jangan keliru dua nama hampir sama ini. Env (2026-09-28, `vercel env ls`): `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (type Secret, Preview+Production — nilai tak boleh di-pull via CLI). Development ditambah 2026-09-28 (type Config, menghala `trdbkqcapsyytjwzxajc`, legacy anon key) — `vercel env pull .env.local` untuk dev lokal. Repo lokal dah di-`vercel link` (`.vercel/`, `.env.local` gitignored).

## Related Projects
- `baseballfedarationmalaysia` / `bfm2026` — workspace BFM lain (PHP). Supabase `bfm2026` (ref `toxxcaeweskoazieslzf`) ialah DB ScoutOps — **terpisah** dari BFMwebsite, tiada cross-impact skema.

---
**Last Updated**: 2026-09-29 | **Position**: #1/10 Active
