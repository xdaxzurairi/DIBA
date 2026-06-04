# 🔔 Reminders
*Persistent cross-session follow-ups*

## Open

### [2026-05-25 Isnin] Drop table PWA dari FMSPROD — migrate ke Archibius dulu

Table-table ini dah wujud terus dalam FMSPROD (dibuat inline oleh PHP) — perlu di-drop dan dicipta semula dengan betul melalui Archibius.

**Checklist:**
- [ ] Drop `PUSH_SUBSCRIPTIONS`
- [ ] Drop `USER_NOTIFICATIONS`
- [ ] Drop `APP_DEVICES`
- [ ] Drop `APP_INSTALLATIONS`
- [ ] Drop `PUSH_NOTIFICATION_LOG`
- [ ] Drop `LOGIN_ATTEMPTS`
- [ ] Drop `RATE_LIMIT_EVENTS`
- [ ] Buat semula semua table di atas melalui Archibius
- [ ] Transfer/sync ke MSSQL FMSPROD selepas siap
- [ ] `PASSWORD_RESET_TOKENS` — belum wujud, cipta terus melalui Archibius

**Nota:** Definisi schema ada dalam `pwa_eworks` — rujuk fail `setup_push_notifications.sql` dan inline CREATE TABLE dalam PHP masing-masing.

## Completed

- **eWorks N+1 complaints.php** (completed 2026-05-18): Semak dan selesai — N+1 `getResponsibleOfficers` dalam `complaints.php` dah ditangani.
- **Monitor Dashboard Performance eWorks** (completed 2026-05-18): Dashboard laju selepas cache aktif — tiada isu.
- **Monitor Instinct Confidence XDIBAX** (completed 2026-05-19): Semua 8 instinct sihat dalam suggest mode (0.62–0.69), tiada stale/decay. orchestrate-objective-owner-action paling hampir auto-apply (0.69).

- **Sambung meeting runtime alignment** (completed 2026-05-13): `C:/Users/BSM/.copilot/.claude/commands/meeting.md` diselaraskan kepada wrapper canonical berasaskan source-of-truth `C:/Users/BSM/.copilot/skills/meeting/SKILL.md`, kemudian disemak semula dari segi struktur dan trigger penggunaan `meeting`.


---
*See: [[main/main-memory|main-memory]] · [[main/current-session|current-session]] · [[projects/project-list|projects]]*
