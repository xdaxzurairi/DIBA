# eWorks PWA — Project Card
**Sistem Pengurusan Aduan Kerja (Work Request) UiTM**

---

## Project Overview

**eWorks PWA** adalah Progressive Web App untuk pengurusan aduan kerja fasiliti UiTM. Pengguna boleh buat aduan, pihak pengurusan assign kerja, dan penyelia/kontraktor selesaikan kerja dengan e-signature flow. Sistem ini menggantikan workflow manual Archibus dengan antara muka mobile-first yang mesra pengguna.

### Key Stats
- **Language**: PHP (procedural)
- **Database**: MSSQL Server (Archibus schema `afm.*`)
- **Frontend**: Vanilla JS, Tailwind CSS
- **PWA**: Service Worker, Web Push (VAPID), Badging API
- **Owner**: Abam Zue (nnkmz)
- **Status**: Active Development / Live
- **Lokasi kod**: `\\10.0.36.127\webs\pwa_eworks`

---

## Stack

| Layer | Teknologi |
|---|---|
| Backend | PHP, custom `$db` wrapper |
| Database | MSSQL Server (DEV: 10.0.36.97/FMSDEV, PROD: 10.0.36.128/FMSPROD) |
| Frontend | Vanilla JS, Tailwind CSS |
| PWA | Service Worker, Web Push API (VAPID via `minishlink/web-push`) |
| Push | Scheduled Task `eWorks-PushNotifications` setiap 5 minit (10.1.7.28) |
| Auth | Session-based, Archibus user table |

---

## Workflow Utama

1. **Intake** — Pengadu buat aduan via PWA
2. **Assign** — DFMS/supervisor assign kerja, jana Work Order (WO)
3. **Execute** — Kontraktor/staff jalankan kerja
4. **E-Signature** — Sequential signing: kontraktor > penyelia > pengadu (verify)
5. **Closure** — Aduan ditutup selepas semua tandatangan lengkap

---

## Feature Utama

- Aduan kerja (create, view, update status)
- Work Order generation dengan auto-increment WO ID
- E-signature sequential flow (Borang Arahan Kerja)
- Push notifications (VAPID, scheduled every 5 min)
- Role-based scope filter (`buildUserScopeFilter()`)
- Response/action period tracking
- Photo capture untuk aduan
- Device registration & app installation tracking

---

## Database — Tables PWA

8 tables tambahan (perlu wujud sebelum deploy):
`login_attempts`, `rate_limit_events`, `push_subscriptions`, `afm.afm_user_notify`, `app_devices`, `password_reset_tokens`, `push_notification_log`, `app_installations`

Kritikal: `wr_status_history` — tanpanya kemaskini status akan crash.

SQL script: `scripts/pwa_tables_archibius.sql` (run via Archibus Smart Client)

---

## Keputusan Seni Bina Kritikal

- `filter_builder.php` MESTI di-include dalam API yang guna `isCurrentUserDFMS()` / `buildUserScopeFilter()`
- `buildUserScopeFilter()` ada session cache TTL 10 minit
- COLLATE DATABASE_DEFAULT untuk query merentasi `push_subscriptions` dan `afm_users`
- Dynamic SW cache TTL 5 minit (`sw-cache-timestamp` header)
- DB convention: BIT guna SMALLINT, tiada auto-create table via PHP — semua melalui Archibus Smart Client
- WO ID generation guna `MAX() + 1` (bukan OUTPUT/SCOPE_IDENTITY — tak sesuai dengan driver)

---

## Commits Terkini

| Commit | Keterangan |
|---|---|
| e7709f0 | E-signature flow — sync prod, sequential gate, verify pengadu |
| 79e6b6f | E-signature sequential untuk Borang Arahan Kerja |
| 3b4693a | Revert ke MAX() untuk WO ID generation |
| 93901ec | Fix debug logs, strtotime DateTime & race condition WO ID |
| a9738e3 | Kira action_period untuk status Com/clo |

---

## Dokumen Berkaitan

- [Workflow Intake to Closure](WORKFLOW_INTAKE_TO_CLOSURE.md)
- [Feature: Complaint Photo Capture](FEATURE_COMPLAINT_PHOTO_CAPTURE.md)
- [Feature: Supervisor Signature](FEATURE_SUPERVISOR_SIGNATURE.md)
- [Action Items Checklist](ACTION_ITEMS_CHECKLIST.md)
- [Upgrade Plan](EWOPRKS_UPGRADE_PLAN_FINAL.md)

---

**Last Updated**: 2026-06-18 | Status: Active Development / Live
