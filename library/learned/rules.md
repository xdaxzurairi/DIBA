# Learned Rules
*General rules extracted dari cases. Confidence: low (1 case) / medium (2-3) / high (4+).*
*Format: ## RXXX — Rule Title*

## R001 — Write Tool-Fail untuk Fail Baru adalah Noise, Bukan Blocker
- **Rule:** Bila Write tool gagal pada fail yang baru dicipta (tiada pre-read), ia akan berjaya pada retry. Signal buffer akan capture ini sebagai tool-fail tapi ia resolved secara automatik. Verifikasi sebenar: periksa fail wujud dalam `git diff --stat` atau `git status`, bukan ketiadaan buffer entry.
- **Source:** case 2026-07-15 (diary fail), case 2026-07-16 (SDD batch fails)
- **Confidence:** medium (2 instances, 2 sesi berbeza)

## R002 — SDD Execution Menghasilkan Banyak Write Tool-Fails — Gunakan Git sebagai Ground Truth
- **Rule:** Dalam sesi SDD dengan 10+ tasks, jangka Write tool-fails akan berlaku kerap dalam signal buffer. Jangan hentikan atau redo tasks berdasarkan buffer noise. Gunakan `finishing-a-development-branch` skill untuk verifikasi sebenar — ia buat `git diff` dan run tests sebelum merge.
- **Source:** case 2026-07-16 (SDD Department Architecture, 15 tasks, 11 tool-fail entries tapi implementation lengkap)
- **Confidence:** low (1 instance SDD penuh)

## R003 — Ruflo Memory Operations: Guna Batch Import, Bukan Per-Entry Subprocess
- **Rule:** Apabila sync/import banyak entries ke ruflo memory, sentiasa guna `ruflo memory import -i batch.json` (satu call) bukan loop `ruflo memory store` (per-entry). ML model overhead (ONNX) menjadikan per-entry approach tidak scalable — setiap subprocess load model dari scratch.
- **Source:** case 2026-07-21 (Ruflo Per-File Memory Store = ONNX Overload)
- **Confidence:** low (1 instance)

## R004 — git-monitor new-folder Signals Akan Sangat Noisy — Filter node_modules
- **Rule:** git-monitor.js PostToolUse hook akan capture semua untracked folders termasuk node_modules, .cache, build artifacts. Signal buffer akan penuh dengan noise. Pertimbangkan tambah filter dalam git-monitor.js: `newFolders.filter(f => !f.includes('node_modules') && !f.includes('.vite-temp'))` sebelum append ke buffer.
- **Source:** signal buffer 2026-07-21 (3 new-folder entries, setiap satu mengandungi 50+ node_modules paths)
- **Confidence:** low (1 sesi, tapi pattern jelas)

## R005 — Obsidian-Ruflo Bridge: Guna git post-commit Hook, Bukan Daemon Watcher
- **Rule:** Pada Windows dengan obsidian-git, guna `post-commit` hook dalam `.git/hooks/` untuk trigger memory sync. Jangan guna `fs.watch` daemon — ia perlu proses background berterusan dan boleh mati tanpa notice. post-commit hook jalan automatik setiap kali obsidian-git commit (default 10 minit), zero maintenance.
- **Source:** case 2026-07-21 (Obsidian-Ruflo Integration)
- **Confidence:** low (1 instance)

## R006 — Edit/Write: Baca Semula Fail Sebelum Edit (Stale Read)
- **Rule:** Dua ralat berulang: "File has not been read yet" (Edit tanpa Read) dan "File content has changed since it was last read" (fail diubah selepas Read oleh Bash/linter/hook). Sentiasa Read fail dalam sesi yang sama sebelum Edit, dan Read semula jika Bash/skrip baru ubah fail itu.
- **Source:** signal buffer 2026-10-05 (Edit, Edit, Write — stale), 2026-10-12 (Edit x2 — belum dibaca)
- **Confidence:** high (5 kejadian, 3 hari berbeza)

## R007 — Bash: Elak Aksara `'` Tak Berpasangan dalam Skrip Inline
- **Rule:** "unexpected EOF while looking for matching `'`" berulang bila skrip panjang/multi-baris dimasukkan terus dalam `bash -c` atau mengandungi apostrof (cth. teks BM, kata ganti milik). Guna heredoc dengan penanda berkuot (`<<'EOF'`) atau tulis skrip ke fail (Write) dan jalankan fail itu.
- **Source:** signal buffer 2026-10-05, 2026-10-12, 2026-10-14 (3 kejadian, baris ~28–153)
- **Confidence:** high (3 kejadian, 3 hari berbeza)

## R008 — Carian Fail di Network Share (UNC) / Folder Besar: Sempitkan Path
- **Rule:** Grep/Glob pada `\10.0.36.127\webs\...` atau folder besar kerap timeout 20 saat ("Ripgrep search timed out"). Sempitkan `path` ke subfolder, tambah `glob`/`type`, atau elak `node_modules`/`vendor`; jangan retry carian yang sama.
- **Source:** signal buffer 2026-10-05 (Grep, Glob), 2026-10-09 (Grep)
- **Source:** signal buffer 2026-10-05 (Grep, Glob), 2026-10-09 (Grep), 2026-10-21 (Glob, vault DIBA/folder besar; juga run eval headless)
- **Confidence:** high (5+ kejadian)
## R009 — Grep Tool Boleh Gagal Kerana `rg` Tiada: Fallback ke Bash grep
- **Rule:** "ENOENT ... uv_spawn 'rg'" / "EUNKNOWN uv_spawn" bermakna binari ripgrep tak tersedia dalam sesi itu. Jangan retry tool Grep; guna `grep -rn` melalui Bash (atau Glob+Read) untuk sesi tersebut.
- **Source:** signal buffer 2026-10-12 (2 kejadian, EUNKNOWN 01:47 dan ENOENT 07:44)
- **Confidence:** medium (2 kejadian, hari sama)

## R010 — Medan Baharu: Rekod Lama Papar "-", Jangan Backfill/Fallback, Jangan Usik DB
- **Rule:** Bila tambah lajur baharu (cth `wr.action_period_m`, `masa_siap_tangguh_m`), rekod lama (NULL) papar simbol "-" pada senarai. Jangan backfill, jangan fallback ke medan lama (jam/hari dibundar jadi "5 Hari" yang mengelirukan), jangan tukar nilai sedia ada dalam DB melainkan Abam minta. Perubahan paparan sahaja.
- **Source:** arahan Abam 2026-10-16 ("yg lama tinggalkan", "jgn usik db.value yg ada dikekalkan, cuma paparan senarai papar -")
- **Confidence:** high

## R011 — eWorks/PWA: Dev Dahulu, Prod Hanya Selepas Abam Setuju
- **Rule:** Edit di `\10.0.36.127` = dev sahaja. Salin ke prod (`\10.0.36.150\webs\eworks\`) hanya selepas Abam semak dev dan setuju. Sebelum salin: sahkan lajur DB baharu wujud di prod, `diff` dev vs prod. Jangan akses data prod tanpa kebenaran.
- **Source:** arahan Abam 2026-10-16 ("hold dulu tggu sehingga user check di dev .jika setuju br salin ke prod")
- **Confidence:** high

## R012 — Jangan Sapu Root `\10.0.36.127\webs`; Verify Sumber Nilai Dalam DB Sebelum Andai Bug
- **Rule:** Grep/Bash `grep -r` pada root share ditolak Abam; sasarkan fail/subfolder (lanjutan R008). Bila Abam tanya "nilai ni dari mana / data lama?", semak rekod dalam DB dev dahulu (cth 1295600 = NULL, bukan bug).
- **Source:** tool use ditolak + soalan Abam 2026-10-16
- **Confidence:** medium

## R013 — Save-Diary, Auto-Commit dan Auto-Learn Mesti Berjalan Sendiri
- **Rule:** Jangan tunggu Abam minta. Hook mesti kekal bersambung dalam `~/.claude/settings.json` (PostToolUse `Write|Edit` -> auto-commit.sh, SessionEnd -> session-end.sh, Stop -> stop-guard.js). Selepas kerja sebenar: save-diary, kemudian rantai auto-learn. Sahkan dengan `git log` (commit `diba: auto-save …`), bukan andaian.
- **Source:** arahan Abam 2026-10-19 ("harus berjalan seperti diarahkan … abam nk diba evolve dgn pantas")
- **Confidence:** high (arahan langsung; mekanisme diuji hidup)

## R014 — PowerShell Tak Sensitif Huruf Besar/Kecil: Elak Pertembungan Nama
- **Rule:** `$A` dan `$a` ialah pembolehubah sama (gelung `foreach ($a …)` menimpa `$A`); jangan namakan fungsi `H` (alias `Get-History`); kunci hashtable `'C:/x'` dan `'c:/x'` ialah pendua. Guna nama unik, fungsi berawalan kata kerja (`Get-…`), dan senarai pasangan bila perlu kunci berbeza huruf.
- **Source:** 3 ralat sebenar dalam satu sesi 2026-10-19 (`Invoke-Expression … parameter 'File'`, `Cannot bind parameter 'Id'`, `Duplicate keys`)
- **Confidence:** high (punca dibuktikan dan dibaiki)

## R015 — Bash: Skrip Panjang Berbilang Baris Berkutip Gagal ("unexpected EOF"); Tulis Ke Fail Dahulu
- **Rule:** Jangan hantar skrip panjang (100+ baris) berkutip tunggal/heredoc bersarang melalui `bash -c`; tulis ke fail skrip (Write) kemudian jalankan, atau guna heredoc berkutip `<<'EOF'` tanpa kutip tunggal dalam badan. Lebih-lebih lagi bila skrip mengandungi apostrof (`'`) dalam teks BM.
- **Source:** 9 ralat `unexpected EOF while looking for matching` dalam sehari 2026-10-20 (02:26–06:04, beberapa sesi)
- **Confidence:** high (berulang 9×, punca sama; +1 2026-10-21 00:36)
