# DIBA Learned Index
*Last updated: 2026-10-24*
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
- R008 — Grep/Glob di UNC share/folder besar timeout; sempitkan path & glob (+2026-10-22)
- R009 — Grep tool gagal bila `rg` tiada; fallback `grep -rn` melalui Bash
- R010 — Medan baharu: rekod lama papar "-", jangan backfill/fallback/usik DB
- R011 — eWorks/PWA: dev dahulu, prod selepas Abam setuju (lajur wujud + diff)
- R012 — Jangan sapu root UNC webs; semak data DB dahulu sebelum andai bug
- R013 — Save-diary, auto-commit, auto-learn jalan sendiri; hook + stop-guard wajib kekal; sahkan dengan git log
- R014 — PowerShell tak sensitif huruf: elak `$a` vs `$A`, fungsi `H`, kunci hash pendua
- R015 — Bash skrip panjang berkutip -> "unexpected EOF"; tulis ke fail dahulu / heredoc <<'EOF'
- [2026-10-21] Brief/recall: vault sebenar XDIBAX/DIBA — ~/.claude/main & daily-diary = salinan beku (case 2026-10-21)
- [2026-10-21] Skill domain + *-head kini di .claude/skills/<nama>/SKILL.md (bukan new/ departments/); sumber = DIBA/plugins/diba-skills/skills; eval di DIBA/evals

- [2026-10-21] Codex hooks: timeout saat, SessionEnd <=3s, Stop JSON, trust semula /hooks; kes: library/learned/codex-hooks.md.
- [2026-10-21] Codex UserPromptSubmit: bungkus teks Ruflo dalam JSON additionalContext; 8 ujian lulus, fix 65a21bf (library/learned/codex-hooks.md).

- [2026-10-22] Eval pusingan 3 9/9 (echo-recall, code-sharp, chief-of-staff Lv.10); commit DIBA f0e1b6c; facts.md.
- [2026-10-22] Elak heredoc bersarang / `python - <<EOF || node -e` dalam satu Bash (tergantung 120s); guna Edit atau fail skrip (R015 diperkukuh; cases.md).

- [2026-10-22] ScoutOps security fix cf9782d: tenant sync, auth fingerprint, streaming XLSX, PHP build guard; migration/deploy pending (library/learned/scoutops-security.md).

- R016 — Python Windows: `sys.stdout.reconfigure(utf-8)`; `python -I` tak boleh buka UNC, guna PowerShell StreamReader/salin dahulu
- [2026-10-22] Dev=10.0.36.127, prod=10.0.36.150; fms.uitm.edu.my=proksi 10.0.34.74; PHP2shell ditampal 8.3.36 kedua-dua (facts.md)
- [2026-10-22] Webshell "Pawang" dir.php dalam ppm (dev+prod), 0 akses dalam log, belum disekat (facts.md)
- 2026-10-22 — Tampal PHP Windows: 4 DLL curl ke Apache24\bin + 2 DLL sqlsrv ke ext + betulkan error_log (cases.md)

- R017 — Delegasi task: satu worker, skop+konteks minimum, Diba koordinasi (rules.md)
- R018 — Parity kemudahan asas studio utama vs semua bilik projek (rules.md)
- [2026-10-23] Dev 10.0.36.127: Apache2.4 (c:\apache24, 80/443) + Apache-SSO (E:, 8084/9443); IIS W3SVC disabled; Get-WinEvent/CIM remote disekat, guna sc.exe (facts.md)
- 2026-10-23 — Apache tak start tanpa log = port 80 dirampas IIS; semak header Server dahulu (cases.md)

- 2026-10-23 — eWorks perf: join `CAST` kedua-dua belah + scope `OR EXISTS wrcf` (wr 1.18 juta) = 7-13 s; guna `w.wr_id = TRY_CAST(n.wr_id AS INT)` -> 24-43 ms; ukur dengan skrip CLI dahulu (cases.md)
- [2026-10-23] `db()` ada dalam includes/functions.php:12; skrip CLI require config.php+database.php+functions.php. Chrome javascript_tool putus 45 s: guna setTimeout + window.__var (cases.md)
- [2026-10-23] eWorks hero dashboard (index.php:122) = RComplaints "Jumlah permohonan", bukan jumlah semua status; tanpa skop 1,184,236 vs R 1,003; pautan hero -> complaints.php?status=R (facts.md)
