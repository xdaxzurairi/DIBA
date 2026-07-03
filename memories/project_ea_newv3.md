---
name: project-ea-newv3
description: ea_newv3 (e-Aduan v3) — project context, stack, dan status semasa
metadata:
  type: project
---

ea_newv3 adalah sistem e-Aduan (aduan fasiliti) UiTM versi 3. Projek aktif di `//10.0.36.127/webs/ea_newv3`, live di `https://fmsdev.uitm.edu.my/ea_newv3`.

**Stack:** PHP, MSSQL (Archibus DB), Bootstrap 5, PWA (service worker + manifest), Inter font, Bootstrap Icons.

**Auth:** Google OAuth (`/auth/google_callback.php`) + SSO UiTM + Pengguna Luar (`/pages/daftar_luar.php`). Session-based, redirect ke `pages/borang.php` bila authenticated.

**Config:** `.env` → `BASE_URL=https://fmsdev.uitm.edu.my/ea_newv3`, `DB_HOST=10.0.36.97`. `baseUrl()` dari `includes/functions.php` → `config/auth.php`.

**Screenshot workaround:** WAF UiTM block external — guna `http://10.0.36.127` dengan Playwright untuk screenshot lokal.

**Why:** Separate project dari eWorks, walaupun same server. e-Aduan = complaint management, eWorks = work request/maintenance.

**How to apply:** Bila kerja pada ea_newv3, ingat WAF block, guna IP lokal untuk testing/screenshot.
