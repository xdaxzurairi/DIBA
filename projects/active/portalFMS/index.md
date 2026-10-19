# Portal FMS — Project Card
**Portal pusat log masuk UiTM untuk semua aplikasi FMS**

---

## Project Overview

**Portal FMS** ialah portal pusat (single sign-on style) untuk UiTM yang menyatukan akses kepada semua aplikasi di bawah Sistem Pengurusan Fasiliti (FMS): eAduan, eWorks, eBangunan, eRuang, eProjek, eKontrak, eMajlis, eCMS, eBCA, MyUiTMPhone, MyUiTMAccess, dan Kajian Kepuasan Pelanggan PPII. Pengguna log masuk sekali (ID FMS atau Google SSO), kemudian dashboard (`menu.php`) papar modul mengikut kebenaran peranan.

### Key Stats
- **Language**: PHP (procedural)
- **Database**: MSSQL Server (FMSDEV), sambung via ODBC + ADOdb
- **Frontend**: HTML/CSS/JS (jquery, ajax, calendar, clock, idle scripts)
- **Auth**: Manual (ID Staf + kata laluan, cek jadual `afm_users`) atau Google SSO
- **Owner**: Abam Zue (nnkmz)
- **Status**: Baru didaftarkan — belum ada rekod kerja
- **Lokasi kod**: `\\10.0.36.127\webs\portalFMS`

---

## Stack

| Layer | Teknologi |
|---|---|
| Backend | PHP, ADOdb (`../adodb/` atau `./adodb/`) |
| Database | MSSQL Server (FMSDEV), ODBC Driver 17/13/18 |
| Frontend | HTML/CSS/JS vanilla, jQuery |
| Auth | Session-based manual login + Google OAuth (login_google.php) |

---

## Struktur

Portal ialah folder pusat; app-app individu (eAduan, eWorks, dll.) adalah folder **saudara** di bawah `webs/`, dipautkan via `$base_app_path` dalam `config_apps.php` (lalai `../`).

Fail utama:
- `login.php` — log masuk manual + Google SSO
- `login_google.php` / `login_google_callback.php` — aliran OAuth Google
- `menu.php` — dashboard utama selepas login
- `connection.php` — tetapan DB (ODBC MSSQL)
- `config_apps.php` — base path pautan app

Mod **mock** wujud bila DB offline (contoh user 262945, 222859) supaya portal masih boleh diuji tanpa DB live.

---

## Dokumen Berkaitan

- `README.md` — ringkasan projek
- `DOCUMENTATION.md` — dokumentasi penuh (struktur folder, aliran login, kebenaran modul, sesi, DB, nota keselamatan)
- `# Database Schema Documentation.md` — skema DB (wr, wo, afm_users, em, sla_tracking, dll.)

---

**Last Updated**: 2026-08-05 | Status: Didaftarkan, belum ada kerja aktif
