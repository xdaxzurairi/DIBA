# DIBA Learned Index
*Last updated: 2026-07-21 (petang)*
*Max 80 lines — oldest/lowest-confidence pruned bila penuh*

## Facts
- [2026-07-13] Webhook > polling untuk realtime events
- [2026-07-16] ADODB+MSSQL: guna FETCH_NUM bukan FETCH_ASSOC (case mismatch issue)
- [2026-07-21] ruflo memory import: JSON mesti `{ "entries": [...] }` wrapper, bukan raw array
- [2026-07-21] .cursor/skills/ deprecated skills tidak dibersihkan oleh session-start.sh (scope ~/.claude/skills/ sahaja)

## Cases
- 2026-07-15 — Write fails untuk diary/session memory adalah noise; fail akhirnya berjaya ditulis
- 2026-07-16 — SDD 15 tasks hasilkan 11 Write tool-fails dalam buffer tapi implementation lengkap
- 2026-07-21 — ruflo per-file store = ONNX overload (30/46 SKIPs); fix: batch import → 46/46, ~3s
- 2026-07-21 — ruflo workflow run spawns AI agents, bukan shell; fix: Node.js standalone script
- 2026-07-21 — ln -sfn tidak berfungsi pada Windows bash; fix: echo path > latest-path.txt
- 2026-07-21 — Obsidian-Ruflo sync: git post-commit hook > fs.watch daemon (Windows, zero maintenance)
- 2026-07-21 — Agent explore output boleh jadi false positive dalam signal-buffer (captured tapi bukan error)

## Rules
- R001 — Write tool-fail untuk fail baru: resolved automatik; verify dengan git, bukan buffer
- R002 — SDD menghasilkan banyak Write fails; gunakan finishing-a-development-branch sebagai verifikasi sebenar
- R003 — ruflo memory: guna batch import (satu call), bukan per-entry subprocess (ONNX overhead)
- R004 — git-monitor new-folder: tambah filter node_modules/build artifacts untuk kurang noise
- R005 — Obsidian-Ruflo bridge: guna post-commit hook (.git/hooks/), bukan daemon watcher
