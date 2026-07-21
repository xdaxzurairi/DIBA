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

## 2026-07-21 — Ruflo Per-File Memory Store = ONNX Overload
- **Miss:** memory-sync.js awal guna `ruflo memory store` sebagai subprocess berasingan untuk setiap entry (46x calls). Setiap call load ONNX embedding model (~300MB) → 30/46 SKIPs, ~2 min runtime.
- **Fix:** Refactor ke `ruflo memory import -i batch.json -n diba --merge` — satu call sahaja. ONNX load sekali untuk semua 46 entries.
- **Outcome:** 46/46 imported, 0 SKIPs, ~3 saat runtime.
- **Lesson:** Bila integrate dengan tool yang load ML model, guna batch API (satu subprocess) bukan loop per-item subprocess.

## 2026-07-21 — Ruflo Workflow Run Spawns AI Agents, Bukan Shell Executor
- **Miss:** Assume `ruflo workflow run -f morning-brief.yaml` akan execute `type: shell` tasks terus sebagai shell commands.
- **Fix:** Ruflo workflow engine spawns AI agents untuk setiap task. Untuk shell execution tanpa agent, buat Node.js standalone script dan panggil terus.
- **Outcome:** `generate-morning-brief.js` berfungsi terus, bypass ruflo workflow engine.
- **Lesson:** Ruflo workflow YAML adalah agent orchestration spec, bukan shell script runner. Untuk output deterministik, buat Node.js script terus.

## 2026-07-21 — ln -sfn Tidak Berfungsi pada Windows Bash
- **Miss:** `spawn-agent.sh` cuba guna `ln -sfn "$OUT_DIR" "$SESSION_DIR/latest"` untuk track latest session output path pada Windows.
- **Fix:** Ganti dengan `echo "$OUT_DIR" > "$SESSION_DIR/latest-path.txt"` — simpan path sebagai plain text.
- **Outcome:** Works cross-platform, mudah dibaca dengan `cat latest-path.txt`.
- **Lesson:** Symlink via `ln -sfn` tidak reliable dalam Windows bash (Git Bash/MINGW). Guna plain text file untuk path tracking.
