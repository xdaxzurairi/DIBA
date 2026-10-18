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
