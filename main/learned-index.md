# DIBA Learned Index
*Last updated: 2026-10-19*
*Max 80 lines — oldest/lowest-confidence pruned bila penuh*

## Facts
- [2026-07-13] Webhook > polling untuk realtime events
- [2026-07-16] ADODB+MSSQL: guna FETCH_NUM bukan FETCH_ASSOC (case mismatch issue)
- [2026-07-21] ruflo memory import: JSON mesti `{ "entries": [...] }` wrapper, bukan raw array
- [2026-07-21] .cursor/skills/ deprecated skills tidak dibersihkan oleh session-start.sh (scope ~/.claude/skills/ sahaja)
- [2026-10-14] Mesin Abam tiada pdftoppm & winget (pemerhatian, sahkan semula)
- [2026-10-14] XDIBAX projek baharu: office-sim, bsmwebsite, BFMwebsite (new-folder digabung)
- [2026-10-16] eWorks tempoh siap sebenar: wr.action_period_m & masa_siap_tangguh_m (minit), rekod baharu sahaja, prod belum
- [2026-10-19] Memory core tunggal = XDIBAX/DIBA; PAMC dipersarakan; hook perlu Git Bash (bash PowerShell = WSL kosong)
- [2026-10-19] Robocopy exit 1 = berjaya (bukan tool-fail); folder baharu belum dibaca: scripts/diba-dash/, .claude-flow/policy/

## Cases
- 2026-07-15 — Write fails untuk diary/session memory adalah noise; fail akhirnya berjaya ditulis
- 2026-07-16 — SDD 15 tasks hasilkan 11 Write tool-fails dalam buffer tapi implementation lengkap
- 2026-07-21 — ruflo per-file store = ONNX overload (30/46 SKIPs); fix: batch import → 46/46, ~3s
- 2026-07-21 — ruflo workflow run spawns AI agents, bukan shell; fix: Node.js standalone script
- 2026-07-21 — ln -sfn tidak berfungsi pada Windows bash; fix: echo path > latest-path.txt
- 2026-07-21 — Obsidian-Ruflo sync: git post-commit hook > fs.watch daemon (Windows, zero maintenance)
- 2026-07-21 — Agent explore output boleh jadi false positive dalam signal-buffer (captured tapi bukan error)
- 2026-10-16 — Tertangguh Com sentiasa "Tiada" + "5 Hari" rekod lama; fix: $kiraCom, simpan minit, NULL papar "-"
- 2026-10-19 — Skrip PS gagal sebab `$a` timpa `$A` (tak sensitif huruf); fix: nama gelung unik, try/catch cari baris

## Rules
- R001 — Write tool-fail untuk fail baru: resolved automatik; verify dengan git, bukan buffer
- R002 — SDD menghasilkan banyak Write fails; gunakan finishing-a-development-branch sebagai verifikasi sebenar
- R003 — ruflo memory: guna batch import (satu call), bukan per-entry subprocess (ONNX overhead)
- R004 — git-monitor new-folder: tambah filter node_modules/build artifacts untuk kurang noise
- R005 — Obsidian-Ruflo bridge: guna post-commit hook (.git/hooks/), bukan daemon watcher
- R006 — Edit/Write: Read dahulu & Read semula jika fail diubah Bash/linter (stale read)
- R007 — Bash: elak `'` tak berpasangan dalam skrip inline; guna heredoc 'EOF' atau fail skrip
- R008 — Grep/Glob di UNC share/folder besar timeout; sempitkan path & glob
- R009 — Grep tool gagal bila `rg` tiada; fallback `grep -rn` melalui Bash
- R010 — Medan baharu: rekod lama papar "-", jangan backfill/fallback/usik DB
- R011 — eWorks/PWA: dev dahulu, prod selepas Abam setuju (lajur wujud + diff)
- R012 — Jangan sapu root UNC webs; semak data DB dahulu sebelum andai bug
