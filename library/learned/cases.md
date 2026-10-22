# Learned Cases
*Episod spesifik: miss → fix → outcome.*
*Format: ## [YYYY-MM-DD] Title*

## ~~2026-07-15 — Write Tool-Fail Berulang untuk Diary + Session Memory~~ [dibatalkan 2026-10-01: Write tak pernah gagal — capture-signal lama tangkap kandungan Write yang BERJAYA sebagai tool-fail]
- **Miss:** Write gagal dua kali berturut untuk `daily-diary/current/2026-07-15.md` dan `main/current-session.md`. Hook captured kedua-dua sebagai tool-fail.
- **Fix:** Fail akhirnya berjaya ditulis (sesi selesai normal). Punca: hook menangkap preview/attempt pertama Write sebelum retry berjaya.
- **Outcome:** Diary dan session memory tersimpan, tetapi buffer ada 2 entry tool-fail yang technically resolved.
- **Lesson:** Tool-fail untuk Write pada fail yang baru dibuat (tiada pre-read) adalah expected — akan berjaya pada retry atau attempt seterusnya. Jangan panic bila buffer ada Write fails selagi fail akhirnya wujud.

## ~~2026-07-16 — SDD Batch Write Fails Semasa Department Architecture Implementation~~ [dibatalkan 2026-10-01: sama — tiada Write gagal, semua entri false positive capture-signal]
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

## 2026-07-21 — Obsidian ↔ Ruflo Integration via Git post-commit Hook
- **Miss:** Tiada real-time bridge antara Obsidian vault edits dan Ruflo memory namespace. memory-sync.js hanya jalan sekali masa session start.
- **Fix:** Tambah `post-commit` hook dalam `Project-AI-MemoryCore/.git/hooks/` yang trigger `memory-sync.js` setiap kali obsidian-git auto-commit (setiap 10 minit). Extended SOURCES dalam memory-sync.js dengan 3 paths baru: `plans/`, `projects/active/`, `DIBA/`.
- **Outcome:** 64 entries synced. Hook test pass. Obsidian edits akan reflected dalam Ruflo dalam max 10 minit.
- **Lesson:** Untuk Obsidian-Ruflo sync pada Windows, gunakan git `post-commit` hook (ikut obsidian-git cadence) — lebih reliable daripada `fs.watch` daemon yang perlu run berterusan.

## 2026-07-21 — Large Agent Output Captured sebagai tool-fail (False Positive)
- **Miss:** `capture-signal.js` captured output Agent explore yang berjaya sebagai `tool-fail` dalam signal-buffer.
- **Fix:** Tiada fix diperlukan — ini false positive. Output Agent yang besar kadang trigger regex check dalam capture-signal.js walaupun operation berjaya.
- **Selesai 2026-10-01:** punca sebenar dibaiki — capture-signal kini jalan pada PostToolUseFailure sahaja (tiada regex atas output berjaya).
- **Outcome:** Buffer ada noise entry tapi ia tidak mengganggu operasi.
- **Lesson:** Agent tool output boleh jadi false positive dalam signal-buffer. Verify dengan actual output/artifact, bukan buffer entry sahaja.

## 2026-10-16 — Jumlah Masa Tertangguh Sentiasa "Tiada" & "5 Hari" pada Rekod Lama
- **Miss:** `jumlah_masa_tertangguh()` menolak status Com terus, jadi aduan Siap sentiasa "Tiada Masa Tertangguh"; paparan jam dibundar ke hari (116 jam → "5 Hari") dan fallback lama muncul pada rekod tanpa minit. PWA juga sempat Fatal "undefined function" selepas edit `complaints.php`.
- **Fix:** parameter `$kiraCom`; simpan minit tepat (2 lajur); rekod NULL papar "-"; fungsi PWA dibungkus `function_exists`.
- **Lesson:** simpan nilai mentah (minit), format semasa paparan; semak `php -l` DAN panggil fungsi sebenar selepas edit.

## 2026-10-19 — Skrip Gabungan Diary Gagal: `$A` Ditimpa `$a`
- **Miss:** `merge-diary.ps1 -Apply` gagal dengan "A parameter cannot be found … 'File'" walaupun mod dry-run berjalan. Punca: `foreach ($a in $appended)` menimpa `$A` (laluan vault) kerana PowerShell tak sensitif huruf; `Get-ChildItem` kemudian menerima objek, bukan laluan.
- **Fix:** tukar pembolehubah gelung kepada `$ap`; ralat ditangkap dengan `try/catch` + `$_.InvocationInfo.PositionMessage` untuk cari baris sebenar. Dua kes serupa: fungsi `H` (alias Get-History) dan kunci hash pendua.
- **Lesson:** dry-run yang lulus tak jamin laluan Apply lulus — jalankan Apply pada data tiruan atau semak setiap cabang; lihat R014.

## 2026-10-20 — Nota Sesi Basi: Cabang "Menunggu Keputusan" Sebenarnya Sudah Di-merge
- **Miss:** `current-session.md` kata `feat/control-room` menunggu pilihan merge/PR, tetapi worktree dan cabang tiada. Nota ditulis 09:10; merge fast-forward berlaku 09:37 tanpa nota dikemas kini. Cadangan "buka PR" hampir dibuat atas fakta basi.
- **Fix:** `git reflog` + `git branch -a --contains <sha>` menunjukkan merge dan commit selamat. Nota dibetulkan.
- **Lesson:** status git dalam nota sesi ialah tuntutan basi-mudah — sahkan dengan `git reflog`/`git worktree list` sebelum bertindak, dan kemas kini nota sebaik merge/buang cabang.

## 2026-10-21 — Brief Chief-of-Staff Baca Vault Lama (~/.claude/main), Terlepas Loop Terkini
- **Miss:** `/chief-of-staff` baca `~/.claude/main/*` dan `~/.claude/daily-diary` (beku sejak Jun/Jul, current-session Mei) lalu hampir ikut `XDIBAX/daily-diary` lama; vault sebenar `XDIBAX/DIBA` (diary 2026-10-21 ada 2 entry) tak dibaca. Brief terlepas open loop rahsia ea_newv3, laporan CIPHER+PULSE dan agenda 2 meeting; reminders "Open kosong" pun dari salinan basi.
- **Fix:** Cari lokasi benar (`find XDIBAX/DIBA -name 2026-10-21.md`); diary + current-session dikemas kini di `XDIBAX/DIBA`.
- **Lesson:** Brief/recall mesti mula dari `XDIBAX/DIBA/{main,daily-diary,projects}` (rujuk fact 2026-10-19). Nama folder sama (`main/`, `daily-diary/`) wujud di ~/.claude sebagai salinan beku — semak tarikh ubah suai fail sebelum percaya.

## 2026-10-21 — Pemerhatian: 3 tool-fail tunggal (bukan rule)
- **Miss:** (a) skrip ujian scratch Skeptic ralat baris 11 (kutip rosak dalam fixture), (b) `node` gagal "Cannot find module" kerana dijalankan dari cwd salah, (c) Glob menolak corak berkurungan `{a,b}` ("ripgrep rejected the pattern").
- **Fix:** Fixture ditulis semula dengan alat Write, node dijalankan dengan laluan penuh, Glob diganti dua panggilan berasingan.
- **Lesson:** Kejadian tunggal tanpa pengulangan, maka hanya pemerhatian (Signal Validation Gate Lv.5). Jadikan rule hanya jika berulang 2+ kali. Petunjuk awal: fixture berkutip berbilang baris lebih selamat ditulis dengan Write (selari R015).
- [2026-10-21] Auto-learn: 2 signal Bash tool-fail (08:20:46Z, 08:23:40Z) hanya metadata, punca tidak diketahui. Signal folder 08:22:42Z pendua inventori sedia ada; EPERM Node diliputi library/learned/codex-hooks.md. Tiada rule baharu direka daripada metadata sahaja.

## 2026-10-22 — Pemerhatian: Python cp1252, PowerShell exit 1 bukan ralat, heredoc bersarang tergantung
- **Miss:** (a) skrip Python audit PHP gagal cetak aksara Unicode kerana stdout Windows cp1252; (b) PowerShell `Get-Process` tanpa padanan menamatkan perintah dengan exit 1 walaupun output sebenar betul (bukan kegagalan); (c) `python - <<EOF || node -e '...' <<EOF` bersarang dalam satu Bash tergantung sehingga timeout 120s (entri diary sudah tertulis, current-session belum).
- **Fix:** (a) `sys.stdout.reconfigure(encoding="utf-8")`; (b) bungkus semakan pilihan dengan `try { ... } catch {}` atau abaikan exit; (c) kemas kini fail dengan alat Edit, bukan heredoc bersarang.
- **Lesson:** Kejadian tunggal, hanya pemerhatian (Signal Validation Gate Lv.5). (c) memperkukuh R015: skrip berkutip panjang atau heredoc bersarang tulis ke fail / guna Edit. 5 signal new-folder (inventori salinan skill .agents/.claude) digabung jadi satu: sync skill, sudah tercatat dalam CLAUDE.md.
