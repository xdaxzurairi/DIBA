# 🔔 Reminders
*Persistent cross-session follow-ups*

## Open

- **Setup local model kat PC opis (Isnin 2026-07-07):** Install Ollama + `ollama pull qwen2.5:3b`, kemudian test `node scripts/diba-fallback-chat.js` — fallback bila Claude limit. Opsyenal: set `OPENROUTER_API_KEY` untuk backend Nemotron cloud sekali. (Ditambah 2026-07-04 selepas merge PR #17)
- **Save diary → Telegram penuh (permanent):** Setiap save diary, hantar fail hari penuh via `scripts/send-diary-telegram.js`. IDE tidak relevan. Script ada **fallback plain text** bila Markdown parse gagal (underscore/path kod).
- **eWorks e-signature:** End-to-end test Borang Arahan Kerja — **jangan sync prod** buat masa ini (keputusan 2026-06-11).

## Completed

- **eWorks laporan 7a vs 1c — keputusan Option A/B/C** (completed 2026-07-01): Abam pilih **Option C** (kedua-dua). Reminder pending-keputusan ditutup; item baru dibuka untuk track implementasi kod.
- **eWorks laporan 7a — implementasi Option C** (closed 2026-07-03, Abam): Ditutup tanpa implementasi — Abam keputuskan tutup terus.
- **DIBA skills push** (completed 2026-07-01, confirmed Abam): Push skills ke DIBA.git dianggap selesai.
- **War Room core chamber verify** (completed 2026-07-01, confirmed Abam): Verify visual chamber ditutup.
- **Drop table PWA dari FMSPROD + Archibius** (completed 2026-06-10): Semua table PWA (PUSH_SUBSCRIPTIONS, USER_NOTIFICATIONS, APP_DEVICES, APP_INSTALLATIONS, PUSH_NOTIFICATION_LOG, LOGIN_ATTEMPTS, RATE_LIMIT_EVENTS, PASSWORD_RESET_TOKENS) telah diselesaikan.



- **eWorks N+1 complaints.php** (completed 2026-05-18): Semak dan selesai — N+1 `getResponsibleOfficers` dalam `complaints.php` dah ditangani.
- **Monitor Dashboard Performance eWorks** (completed 2026-05-18): Dashboard laju selepas cache aktif — tiada isu.
- **Monitor Instinct Confidence XDIBAX** (completed 2026-05-19): Semua 8 instinct sihat dalam suggest mode (0.62–0.69), tiada stale/decay. orchestrate-objective-owner-action paling hampir auto-apply (0.69).

- **Sambung meeting runtime alignment** (completed 2026-05-13): `C:/Users/BSM/.copilot/.claude/commands/meeting.md` diselaraskan kepada wrapper canonical berasaskan source-of-truth `C:/Users/BSM/.copilot/skills/meeting/SKILL.md`, kemudian disemak semula dari segi struktur dan trigger penggunaan `meeting`.


---
*See: [[main/main-memory|main-memory]] · [[main/current-session|current-session]] · [[projects/project-list|projects]]*
