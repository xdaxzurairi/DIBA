# 📥 Brief Inbox
*Automated scheduled briefs land here. Newest at the bottom. Clear old entries freely.*

- **Morning Brief** — Windows Task Scheduler `DIBA Morning Brief`, daily 08:00
- **Weekly Review** — Windows Task Scheduler `DIBA Weekly Review`, Friday 16:00
- Generator: `scripts/scheduled-brief.sh` · runs only while Abam is logged on
- Telegram delivery: not wired yet (see reminders Phase 3)

---

## Morning Brief — 2026-09-10 09:54

**DIBA Morning Brief — 2026-09-10 Rabu, 8am**

**Last session (2026-08-22):** Setup Ox Alpha (`stealth/ox-alpha`) sebagai default Nemotron fallback — OpenRouter key masuk `.env` + `war-room/.env` (gitignored, tak commit). `current-session.md` ditulis semula bersih selepas ada git merge conflict lama.

**Urgent / overdue:**
- ⚠️ **Setup Ollama PC opis** — overdue sejak 2026-07-07. `ollama pull qwen2.5:3b` + test `node scripts/diba-fallback-chat.js`.
- 🔧 **Scheduled loops** — brief + weekly review SIAP hari ni, tapi Abam kena run sekali: `scripts/register-scheduled-briefs.ps1`.
- 🔑 Rotate `OPENROUTER_API_KEY` (pernah paste plaintext) — bukan urgent, buat bila lapang.

**Active projects:** eWorks 🟢 (#1) · ScoutOps 🟢 (#2) · e-Aduan v3 🟡 cooling · ruangniaga 🔴 stale.

**Fokus hari ni:** (1) Run `register-scheduled-briefs.ps1` untuk aktifkan scheduled loops. (2) Clear reminder Ollama yang dah 2 bulan overdue. (3) Baki Phase 3 = Telegram bridge — perlu bot token + `scripts/send-diary-telegram.js` (belum wujud). eWorks e-signature: jangan sync prod.

---

## Morning Brief — 2026-09-10 10:10

**DIBA Morning Brief — Khamis, 2026-09-10**

**Last session (2026-08-22):** Setup Ox Alpha (`stealth/ox-alpha`) sebagai default Nemotron fallback — OpenRouter key masuk `.env` + `war-room/.env` (gitignored), `NEMOTRON_MODEL` ditukar di dua lokasi. Follow-up terbuka: rotate key OpenRouter bila lapang (tak urgent).

**Reminders — urgent/overdue:**
- ⚠️ **Setup local model PC opis** (due Isnin 2026-07-07 — 2 bulan lewat): install Ollama + `ollama pull qwen2.5:3b`, test `node scripts/diba-fallback-chat.js`.
- **Phase 3 loops:** morning brief + weekly review **SIAP hari ni** via Task Scheduler. Abam kena run sekali: `scripts/register-scheduled-briefs.ps1`. Baki: Telegram bridge (belum ada bot token / `send-diary-telegram.js`).
- eWorks e-signature: end-to-end test Borang Arahan Kerja — **jangan sync prod**.

**Active projects:** 1) eWorks 🟢 · 2) ScoutOps 🟢 · 3) e-Aduan v3 🟡 cooling · 4) ruangniaga 🔴 stale.

**Fokus hari ni:**
1. Run `scripts/register-scheduled-briefs.ps1` — tutup Phase 3 loop registration.
2. Clear reminder lewat: setup Ollama lokal di PC opis (fallback bila Claude limit).
3. Semak git status root repo — ada `.diba-models.json` + `conflict-files-obsidian-git.md` untracked, dan modified `scripts/ask-nemotron.js` belum commit.

---

## Morning Brief — 2026-09-14 20:25

> ⚠️ scheduled run failed (exit 1). Output:

Failed to authenticate: OAuth session expired and could not be refreshed

---

## Morning Brief — 2026-09-15 12:55

> ⚠️ scheduled run failed (exit 1). Output:

⚠ claude.ai connectors are disabled because ANTHROPIC_API_KEY or another auth source is set and takes precedence over your claude.ai login · Unset it to load your organization's connectors
[claude-code:unrecognized_model] {"model":"kimi-k2.7-code","query_source":"generate_session_title"}
[claude-code:unrecognized_model] {"model":"kimi-k3[1m]","query_source":"sdk"}
API Error: Request rejected (429) · Your account org-86faafe39e9548bf9473d168c928d7d0 <ak-fcmzydm6g63i11fp9i31> is suspended due to insufficient balance, please recharge your account or check your plan and billing details

---

## Weekly Review — 2026-09-20 15:11

> ⚠️ scheduled run failed (exit 1). Output:

Your organization has disabled Claude subscription access for Claude Code · Use an Anthropic API key instead, or ask your admin to enable access

---

## Morning Brief — 2026-10-17 21:14

**DIBA Morning Brief, Sabtu 2026-10-17**

**Last session (2026-10-13):** ea_newv3 (e-Aduan v3) UAT. 60 cases across 10 modules, bilingual BM/EN, now black-and-white with checkboxes. `docs/UAT-ea_newv3.pdf` is 8 pages. Repo HEAD is `e476e62` and is not pushed.

**Gap:** `current-session.md` stops at 10-13. The 10-16 and 10-17 diaries are empty headers, so I can't recap work from 10-14 to 10-17.

**Urgent or overdue:**
- **Overdue since 2026-07-07:** set up Ollama and `qwen2.5:3b` on the PC opis, then test `node scripts/diba-fallback-chat.js`. It matters because the scheduled brief has been failing.
- **Scheduled brief is broken.** `main/brief-inbox.md` shows the last runs failing with exit 1. One error is a 429 "account suspended, insufficient balance". Another is "org has disabled Claude subscription access". `ANTHROPIC_API_KEY` is overriding the claude.ai login. Check which auth source `scripts/scheduled-brief.sh` uses.
- **Telegram bridge** is still missing: no bot token, and `send-diary-telegram.js` isn't in the repo.
- **eWorks e-signature:** do not sync prod.

**Active projects (7/10):**
- ea_newv3 is active at #1. BFMwebsite, Book Finder and ScoutOps are active.
- Portal FMS, eWorks and ruangniaga are stale. ruangniaga hasn't been touched since 2026-05-14.

**Focus today:**
1. Before the real UAT, confirm the UAT environment URL with IT (`10.0.36.127` or `fmsdev.uitm.edu.my`) and fill in the Section 6.0 schedule dates.
2. Fix the scheduled-brief auth so the 8am run works.
3. The vault has uncommitted changes in 6 skill files and `scripts/ask-nemotron.js`. Review them and commit, or discard.

---

## Weekly Review — 2026-10-17 21:14

**Weekly Review — 2026-10-17**

**Wins**
- ea_newv3: UAT 60 kes/10 modul siap. Dwibahasa, hitam-putih, checkbox, PDF 8 muka surat disahkan (commit `e476e62`).
- eWorks "Jumlah Masa Tertangguh" dibaiki (`5a560a4`). CALENDAR DEV disync 3,144 baris dan disahkan dengan kiraan manual.
- Hook DIBA dibaiki: `memory-inject` (encoding dan heading), `auto-commit.sh` (3 bug: path Windows, double-slash, stale `index.lock`) dan `session-end.sh`.
- Housekeeping: dead code dibuang, 6 skill di-level up.

**Stalled**
- Portal FMS (kali terakhir dikemas kini 2026-08-05), eWorks (2026-07-29) dan ruangniaga (2026-05-14) semuanya 🔴 stale.
- Setup Ollama di PC opis lewat sejak 2026-07-07, lebih 3 bulan.
- Telegram bridge belum bermula: tiada bot token dan `send-diary-telegram.js` tiada dalam repo.
- Scheduled brief: tiada entri berjaya dalam `brief-inbox.md` selepas 2026-09-10. Tiga run terakhir (09-14, 09-15, 09-20) gagal kerana auth dan billing.

**Decisions pending**
- Sahkan URL persekitaran UAT (`10.0.36.127` atau `fmsdev.uitm.edu.my`) dengan IT.
- Isi tarikh Seksyen 6.0 sebelum UAT diedarkan.
- ea_newv3 (3 commit UAT) dan DIBA vault (1 commit) belum di-push. Tunggu arahan Abam.
- `getComplaintById()` masih ada bug CUTI yang sama. Edit disekat classifier dan belum diputuskan.

**Post-mortem themes**
- `post-mortems.md` kosong, tiada entri rasmi. Tema sebenar ada dalam `decisions.md`: hook "lulus test" tapi gagal live, dan pipe-test dengan payload craft sendiri memberi keyakinan palsu. Cadangan: log satu post-mortem rasmi.

**Next-week priorities**
1. Jalankan `scripts/register-scheduled-briefs.ps1` dan betulkan auth `claude -p`, supaya brief dan review berjalan semula.
2. Tutup loop UAT ea_newv3: URL, tarikh, kemudian edar.
3. Putuskan Portal FMS, eWorks dan ruangniaga: sambung atau arkib.
4. Setup Ollama di PC opis.
5. Bersihkan git: commit atau buang `scripts/ask-nemotron.js` dan `.diba-models.json`, dan selesaikan `conflict-files-obsidian-git.md`.

---

## Morning Brief — 2026-10-18 13:34

**Selamat pagi, Abam — 2026-10-18**

**Last session:** 2026-10-13, ea_newv3. UAT penuh (60 kes/10 modul) siap: dwibahasa, hitam & putih, checkbox, PDF 8 muka surat. HEAD `e476e62`, belum push. Diary 10-16 dan 10-17 kosong (stub sahaja). Kerja 10-17 hanya hook fixes dan 6 skill di-level up, ikut weekly review.

**Urgent/overdue:** Tiada reminder bertarikh dalam 3 hari. Yang tertunggak:
- Setup Ollama di PC opis: lewat sejak 2026-07-07, lebih 3 bulan.
- Telegram bridge: tiada bot token, dan `send-diary-telegram.js` tiada dalam repo.

**Projek aktif (7/10):**
- ea_newv3 (pos #1): UAT menunggu URL dan tarikh.
- BFMwebsite (09-29), Book Finder (09-23), ScoutOps (09-15): aktif.
- Portal FMS (08-05), eWorks (07-29), ruangniaga (05-14): 🔴 stale. Putuskan sambung atau arkib.

**Fokus hari ni:**
1. **Tutup loop UAT ea_newv3.** Sahkan URL (`10.0.36.127` atau `fmsdev.uitm.edu.my`) dengan IT dan isi tarikh Seksyen 6.0, supaya UAT boleh diedarkan.
2. **Bersihkan git vault.** Commit atau buang `scripts/ask-nemotron.js` dan `.diba-models.json`, dan selesaikan `conflict-files-obsidian-git.md`. Tiga commit UAT ea_newv3 dan commit vault belum di-push, tunggu arahan Abam.
3. **Jalankan `scripts/register-scheduled-briefs.ps1`** kalau belum. Tiga run terakhir (09-14, 09-15, 09-20) gagal sebab auth dan billing.

**Pending keputusan:** `getComplaintById()` masih ada bug CUTI yang sama, edit tersekat classifier. `post-mortems.md` masih kosong.

---

## Morning Brief — 2026-10-21 14:12

Selamat pagi, Abam. Brief Rabu 2026-10-21:

**Sesi lepas (12:50):** repo-setup pada bijakbersama siap P1-P4 (5 fail, belum commit). Deny belum dibuktikan aktif. Guard-bash global hidup, 106/106 ujian lulus.

**Reminder terbuka:**
- Telegram bridge (baki Phase 3): masih tiada bot token dan `send-diary-telegram.js`.
- Setup Ollama di PC opis: tarikh 2026-07-07 sudah lepas jauh, jadi overdue.
- eWorks e-signature: jangan sync prod.

**Projek aktif:** ea_newv3 (pos #1, UAT terakhir 10-13). Stale: Portal FMS, eWorks, ruangniaga.

**Fokus hari ini:**
1. Buka sesi baharu dari bijakbersama untuk sahkan deny aktif.
2. Baiki 3 isu KRITIKAL RLS/auth bijakbersama, kemudian commit bijakbersama dan DIBA.
3. eWorks: uji tutup aduan di dev (eWorks dan PWA). Selepas itu deploy 6 fail ke prod bila Abam setuju.
4. Putuskan sama ada nak P5/P6/P7 repo-setup, deny/ask global, dan allow mysql password_hash.
5. Loop meeting pagi masih terbuka (rahsia ea_newv3, agenda 2 dan minit).

**Lain-lain:** ada 1 signal belum diproses, jalankan auto-learn bila sesuai. Ada fail DIBA belum commit, termasuk hooks dan skill repo-setup.

---

## Weekly Review — 2026-10-21 14:24

Warning: no stdin data received in 3s, proceeding without it. If piping from a slow command, redirect stdin explicitly: < /dev/null to skip, or wait longer.
**Weekly Review — Rabu 2026-10-21**

**Kemenangan minggu ini**
- Hook auto-commit dibaiki: 3 bug berlapis (format path Windows, double-slash, `.git/index.lock` stale). Hook ini tak pernah berfungsi sejak Ogos. Kini ia disahkan live-fire (commit 1fd76c1, 303b1f3).
- Hook `memory-inject` dibaiki (UTF-8 dan bug heading). CLI naik 2.1.272 → 2.1.301.
- Memory digabung ke satu vault (4 sumber diary, main/library/projects). Satu sumber kebenaran.
- `stop-guard` ditambah, dengan 7 ujian terasing dan peraturan R015. Skill baharu `repo-setup`, `facility-architecture` dan `cad-dwg-dxf`. 6 skill dinaikkan tahap.
- DIBA LIVE (terminal NPC dipacu hook) siap dan auto-start bersama VS Code.

**Projek terbengkalai**
- Stale: Portal FMS (2026-08-05), eWorks (2026-07-29), ruangniaga (2026-05-14).
- ScoutOps (09-15) dan BFMwebsite (09-29) mula perlahan. ea_newv3 aktif (terakhir 10-13).
- `project-list.md` belum disegarkan sejak 10-13.

**Keputusan tertunggak**
- Telegram bridge: ditangguh. Calon pengganti Zapier MCP, tunggu Abam putuskan.
- Ollama/qwen2.5:3b di PC opis: reminder 07-07, belum ditutup, sudah lebih 3 bulan.
- eWorks e-signature: kekal jangan sync prod.

**Tema post-mortem**
- `post-mortems.md` kosong, tapi `decisions.md` ada pola jelas. "Nampak lulus" tak sama dengan "berfungsi": pipe-test guna data buatan sendiri, dan hook gagal senyap bila stderr dibuang. Rujuk entri 2026-10-16 (ketiga-tiganya).
- Disyorkan tulis satu post-mortem rasmi untuk hook auto-commit.
- 1 signal dalam buffer belum diproses.

**Keutamaan minggu depan**
1. Jalankan `auto-learn` untuk proses signal buffer dan tulis post-mortem hook.
2. Putuskan nasib projek stale (arkib atau hidupkan semula): Portal FMS, eWorks, ruangniaga.
3. Commit item belum track: `evals/`, `guard-bash.js`, `format-on-edit.js`, `repo-setup/`.
4. Teruskan ea_newv3 (UAT → dwibahasa → PDF). Putuskan Telegram vs Zapier, dan tutup reminder Ollama.

---

## Morning Brief — 2026-10-22 08:00

Selamat pagi, Abam. Khamis, 2026-10-22.

**Sesi lepas (2026-10-21, Codex):** Hook Codex dibaiki. JSON `UserPromptSubmit` diperbetulkan dalam commit 65a21bf, 8 ujian lulus dan reviewer tiada blocker. Diari hook disimpan dan signal diproses.

**Overdue:**
- Reminder setup Ollama dan `qwen2.5:3b` di PC opis bertarikh 2026-07-07, sudah lewat 107 hari (skor +30). Ia fallback bila Claude kena limit.

**Top 3:**
1. Tutup atau jadualkan reminder Ollama. Ia overdue, dan Abam boleh tutup terus kalau tak jadi pakai.
2. Nilai eval pusingan 3 (9 senario, scratchpad eval-runs4). Ia carry-over dari sesi lepas (+4) dan baik code-sharp serta chief-of-staff Lv.10 masih belum disahkan.
3. Commit perubahan skill, evals dan scripts yang belum di-commit (carry-over). Semak `git diff` dulu.

**Radar:**
- ea_newv3 (LRU #1) kali terakhir disentuh 2026-10-13, jadi sudah stalled lebih 7 hari. UAT penuh 60 kes sudah siap, dan baki kerja ialah hitam&putih, checkbox dan PDF.
- War-Room-System masih menunggu keputusan padam atau arkib.
- Run berjadual 08:00 ini ialah pengesahan pertama bahawa Task Scheduler berfungsi.

**Watch-out:** Hook Codex belum diuji lifecycle sebenar. Abam perlu review dan trust melalui `/hooks` dulu.

Cadangan: mula dengan eval pusingan 3 sebab ia sudah siap berjalan, tinggal dinilai, dan hasilnya menentukan sama ada perubahan skill boleh di-commit hari ini.

---

## Morning Brief — 2026-10-23 08:00

**Brief Pagi — Jumaat, 2026-10-23**

**Sesi lepas (22/10):**
- Control Room: semua bilik projek kini ada 4 tingkap sebenar, parity dengan studio utama. Ujian 24/24 lulus. Visual browser belum disahkan, jadi buat Ctrl+Shift+R.
- Mission Desk dan mini-map kampus siap, 312/312 dan 318/318 ujian lulus.
- ScoutOps: security rollout produksi selesai, master `f71d309`. PHP 8.5.12 disahkan live di kedua-dua domain.
- Repo induk XDIBAX sudah di-commit dalam 5 kumpulan.

**Reminder terbuka (tiada yang overdue):**
- Telegram bridge (Phase 3) ditangguh. Tiada tindakan sehingga Abam putuskan.
- eWorks e-signature: jangan sync prod.

**Follow-up tertunggak dari 22/10:**
- Push commit `.gitignore` dan `feat/diba-dash` (ahead 7). Belum diarahkan.
- Putuskan fail untracked XDIBAX: `daily-diary/archived`, `BFMwebsite`.
- ScoutOps: login semula. Tenant admin perlu semak sheet URL dan generate cron URL baharu. External scheduler belum dikonfigurasi.
- 8 signal belum diproses. Jalankan `auto-learn`.

**Projek aktif (7/10):** ea_newv3 (13/10) ialah yang terbaru. BFMwebsite, Book Finder dan ScoutOps masih hijau. Portal FMS, eWorks dan ruangniaga stale.

**Fokus hari ini:**
1. Sahkan visual Control Room dalam browser.
2. Selesaikan push dan fail untracked XDIBAX.
3. Tutup follow-up ScoutOps (cron URL dan scheduler).
4. Jumaat 16:00: weekly review berjadual.

---

## Weekly Review — 2026-10-23 16:00

**Semakan Mingguan DIBA — Jumaat 2026-10-23**

**Kemenangan minggu ini**
- ScoutOps: pemulihan keselamatan dan cutover produksi disahkan (`77efdf5`, `9bf3447`).
- Hook baharu: `stop-guard` (paksa save-diary + auto-learn), `guard-bash`, `format-on-edit`. `auto-commit.sh` dibaiki, termasuk pengesanan lock stale.
- Skill eval pusingan 3 lulus 9/9; chief-of-staff naik Lv.10.
- Semakan keselamatan PHP workspace XDIBAX siap (2026-10-22).
- DIBA LIVE (terminal NPC) berjalan dan auto-start bersama VS Code.
- Reminder Ollama ditutup. Memory Project-AI-MemoryCore digabung ke vault DIBA.

**Projek terhenti**
- ruangniaga: tiada kemas kini sejak 2026-05-14 (±162 hari).
- eWorks: 2026-07-29 (±86 hari).
- Portal FMS: 2026-08-05 (±79 hari).
- Cadangan: putuskan sama ada setiap satu dikemas kini, diparkir SOMEDAY, atau diarkib.
- ea_newv3 pos #1 dan aktif. Entri terakhir 2026-10-13 (UAT 60 kes). Tiada entri baharu sejak itu dalam `project-list.md`.

**Keputusan belum selesai**
- Telegram bridge (Phase 3): ditangguh sejak 2026-09-10. Calon ganti ialah Zapier MCP. Abam perlu putuskan sama ada diteruskan atau ditutup.
- eWorks e-signature: kekal "jangan sync prod". Tiada tarikh semakan.
- Tiada keputusan baharu yang tergantung dalam `decisions.md` selain dua item di atas.

**Tema post-mortem**
- `post-mortems.md` masih kosong. Pelajaran sebenar minggu ini ada dalam `decisions.md`: ujian hook mesti sampai ke `git log` sebenar, dan `.git/index.lock` stale perlu dikesan ikut umur. Cadangan: tulis satu post-mortem ringkas untuk bug auto-commit (tiga lapisan).
- Buffer isyarat ada 4 baris yang belum diproses. Jalankan auto-learn.

**Keutamaan minggu depan**
1. Triage projek stale (ruangniaga, eWorks, Portal FMS): sambung, parkir, atau arkib.
2. Sambung ea_newv3 selepas UAT, ikut susunan dwibahasa → hitam&putih/checkbox/PDF.
3. Proses buffer isyarat dan tulis post-mortem auto-commit.

Ini ringkasan brief projek. Audit GTD 10 kawasan penuh tidak dijalankan, kerana tiada permintaan eksplisit.

---

## Morning Brief — 2026-10-24 08:00

**Brief pagi Sabtu, 2026-10-24**

**Sesi lepas (23/10, server eWorks/fmsdev):** Apache tak start sebab IIS (W3SVC) rebut port 80 selepas reboot. W3SVC sudah di-disable dan Apache jalan. Dashboard dilajukan (`get_unread_count`, `get_notifications`, `getComplaintTotalsFromList`). Hero dashboard kini papar Permohonan (status R) sahaja. Jumlah 1,003 disahkan Abam.

**Mendesak / tertunggak:**
- `index.php` dan hunk `getComplaintTotalsFromList` dalam `includes/functions.php` **belum commit**. Asingkan hunk itu daripada kerja Redis/dashboard korporat.
- Klik "Lihat senarai permohonan" belum diuji. Sahkan `complaints.php?status=R` papar status R sahaja.
- `error.log` 13 GB perlu di-rotate. Index `wrcf(cf_id)` pun belum dibuat.
- 2 signal dalam `signal-buffer.md` belum diproses (`auto-learn`).

**Reminder Open:**
- Telegram bridge (Phase 3): ditangguh, calon ganti Zapier MCP. Tiada tindakan.
- eWorks e-signature: **jangan sync prod**.

**Projek aktif (7/10):**
- 🟢 ea_newv3 (kemas kini terakhir 13/10), BFMwebsite, Book Finder, ScoutOps.
- 🔴 Stale: Portal FMS, eWorks, ruangniaga.

**Follow-up lain yang masih terbuka:**
- ScoutOps: tenant admin perlu review sheet URL dan generate cron URL organisasi baharu.
- Control Room: Ctrl+Shift+R, kemudian sahkan visual di browser.
- XDIBAX: putuskan fail untracked (`daily-diary/archived`, `BFMwebsite`) dan push commit `.gitignore`.

**Fokus hari ini:**
1. Uji pautan senarai R, kemudian commit `index.php` dan hunk `functions.php`.
2. Rotate `error.log` dan tambah index `wrcf(cf_id)`.
3. Jalankan `auto-learn` untuk signal tertunggak.

---

## Morning Brief — 2026-10-25 08:00

**Brief Pagi — Ahad, 2026-10-25**

**Sesi lepas (24 Okt, ~20:43):** Kerja PWA eWorks sudah di-push ke origin (b82a54f, tempoh siap sebenar; dashboard korporat dan dua commit laju notifikasi). Kerja xdibax pula siap: dual agent (Claude backend + Codex frontend) disahkan, xdibax global, dan registry projek. Semuanya di-push pada `feat/diba-dash`. Hanya fail diary, learned dan signal-buffer yang belum di-commit.

**Reminder:** Tiada yang overdue atau urgent.
- Telegram bridge (baki Phase 3) belum bermula. Tiada bot token, dan Telegram ditangguh sejak 2026-09-10.
- eWorks e-signature: jangan sync prod.

**Projek aktif (7/10):** ea_newv3 (pos #1, kemas kini terakhir 13 Okt), BFMwebsite, Book Finder dan ScoutOps masih Active. Portal FMS, eWorks (rekod projek) dan ruangniaga berstatus Stale.

**Fokus hari ini:**
1. Sahkan dalam pelayar: dashboard korporat, pautan hero "Lihat senarai permohonan" (`complaints.php?status=R`), dan senarai Siap yang guna tempoh siap sebenar.
2. Uji tutup AK sebenar.
3. Jalankan `composer install` untuk predis sebelum hidupkan Redis.
4. Betulkan stop-guard.js: ia semak diary tarikh semasa sahaja, jadi ada false positive bila sesi lintas tengah malam.
5. Uji `xdibax <nama>` dan `-Daftar` sebenar, kemudian pilih cabang untuk `feat/diba-dash`.
6. Ada 3 signal belum diproses. Jalankan auto-learn bila sesuai.

Rotate `error.log` eWorks (13 GB) kekal sebagai tugasan tertangguh.
