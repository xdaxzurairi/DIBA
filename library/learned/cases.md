# Learned Cases
*Episod spesifik: miss → fix → outcome.*
*Format: ## [YYYY-MM-DD] Title*

## 2026-07-15 — Write Tool-Fail Berulang untuk Diary + Session Memory
- **Miss:** Write gagal dua kali berturut untuk `daily-diary/current/2026-07-15.md` dan `main/current-session.md`. Hook captured kedua-dua sebagai tool-fail.
- **Fix:** Fail akhirnya berjaya ditulis (sesi selesai normal). Punca: hook menangkap preview/attempt pertama Write sebelum retry berjaya.
- **Outcome:** Diary dan session memory tersimpan, tetapi buffer ada 2 entry tool-fail yang technically resolved.
- **Lesson:** Tool-fail untuk Write pada fail yang baru dibuat (tiada pre-read) adalah expected — akan berjaya pada retry atau attempt seterusnya. Jangan panic bila buffer ada Write fails selagi fail akhirnya wujud.

## 2026-07-16 — SDD Batch Write Fails Semasa Department Architecture Implementation
- **Miss:** Semasa SDD execution (15 tasks), pelbagai Write tool-fails berlaku — implementation plan, skill-manifest.json, dev-head/skill.md, legal-head/skill.md, contract-reviewer/skill.md, laporan subagent. Semua captured sebagai tool-fail dalam signal buffer.
- **Fix:** Semua fail akhirnya berjaya dicipta dan implementation selesai (8 commits, finishing-a-development-branch verify). Pattern: subagent Write fails pada attempt pertama, berjaya pada attempt kedua tanpa intervention.
- **Outcome:** Implementation lengkap, 60 skills tagged, 9 dept heads, 6 skills baru — semua committed dan pushed.
- **Lesson:** Dalam SDD dengan banyak fail baru, Write tool-fail adalah noise bukan blocker. Verifikasi sebenar ialah `git diff --stat` dan review-package, bukan ketiadaan tool-fail dalam buffer.
