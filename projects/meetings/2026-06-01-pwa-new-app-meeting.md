# Meeting — 2026-06-01
**Chair:** DIBA (HCO)  
**Decision Maker:** Zuex (CEO)  
**Hadir:** NEXUS, FORGE, LENS, ORACLE, PIXEL, ECHO, CIPHER, GRID, PULSE, SAGE (semua 10)

## Agenda
App baharu berasaskan **PWA** + **PHP terkini** — UI/UX **mesti menarik/mempesonakan** (bukan generic template).

---

## Notes

### NEXUS (CTO)
- **Status:** Siap cadangan stack greenfield.
- **Input:** PHP **8.3+** (8.4 jika hosting sokong). Backend: **Laravel 11** (API-first) ATAU **Slim 4 + PHP-DI** jika mahu ringan tanpa framework berat.
- **PWA:** API JSON + frontend **Vite + Alpine.js** atau **Livewire 3 + Flux UI** (PHP-native, kurang JS complexity).
- **Flag:** Elak monolith view PHP lama (punca tech debt eFMS). Pisah `api/` dan `public/` dari hari pertama.

### FORGE (Lead AI Engineer)
- **Status:** Tiada pipeline AI diperlukan untuk MVP PWA.
- **Input:** Sediakan hook `events/` untuk AI later (smart routing aduan). Jangan bina AI dalam Phase 0.
- **Flag:** Dependency — API contract stabil dulu sebelum RAG/chatbot.

### LENS (Data Scientist)
- **Status:** Tiada dataset baharu.
- **Input:** Dashboard KPI guna chart ringkas (Chart.js / ApexCharts). Metric: load time, offline queue depth, complaint SLA.
- **Flag:** Perlu schema DB final sebelum wire dashboard.

### ORACLE (Chief Strategy)
- **Status:** Align dengan SuperApp / FMS roadmap sedia ada.
- **Input:** Position sebagai **eFMS SuperApp PWA v2** — bukan app ketiga. Satu brand, satu login, migrasi berfasa dari legacy.
- **Flag:** Perlu keputusan Zuex — greenfield total vs fork eFMS-SuperApp.

### PIXEL (Creative Director) ⭐ UI/UX Lead
- **Status:** Design system belum wujud untuk app baharu.
- **Input — UI mesti menarik:**
  - **Bukan** Bootstrap default / purple gradient generic AI.
  - Design tokens: typography distinct (contoh **DM Sans + Instrument Serif** atau **Outfit + JetBrains Mono**).
  - Dark-first atau adaptive theme; micro-interaction (page transition, skeleton loader).
  - **PWA shell:** bottom nav mobile, glass header, card elevation, status chips berwarna semantik.
  - Component lib: **Tailwind v4** + headless (Radix-style) ATAU **DaisyUI custom theme** — warna institusi (UiTM navy/gold) moden.
  - Splash screen, app icon set, install prompt UX — wajib untuk "rasa native app".
- **Flag:** 1 minggu design sprint sebelum kod UI mass — elak rework.

### ECHO (Head of Brand)
- **Status:** Copy eFMS sedia ada boleh reuse sebahagian.
- **Input:** Tone BM profesional + mesra. Tagline ringkas pada splash & login. Notis PDPA satu perenggan — bukan wall of text.
- **Flag:** Nama app — kekal "eFMS SuperApp" atau rebrand? Escalate Zuex.

### CIPHER (CSO)
- **Status:** Lesson learned dari audit eFMS Fasa 5.
- **Input:** Security-by-design Phase 0:
  - `.env` only, `require_auth` middleware pusat, RBAC, audit log, PDPA doc.
  - Service Worker **jangan cache** response authenticated/API sensitif.
  - CSP headers, HTTPS only, HttpOnly cookies / JWT refresh rotation.
- **Flag:** PWA offline mode — hanya cache static assets + draft form local (encrypted optional), bukan data PII penuh.

### GRID (DevOps)
- **Status:** XAMPP dev; production TBD.
- **Input:** Docker Compose (PHP-FPM 8.3, Nginx, SQL Server / Postgres). GitHub Actions: lint, PHPUnit, deploy staging.
- **Flag:** SQL Server legacy vs Postgres migration — impact besar; perlu keputusan Zuex.

### PULSE (QA Lead)
- **Status:** Tiada test suite app baharu.
- **Input:** Definition of Done: Lighthouse PWA ≥ 90, installable, works offline (shell), auth flow E2E, RBAC matrix test.
- **Flag:** Perlu staging URL sebelum UAT.

### SAGE (Research Lead)
- **Status:** Scouting PWA + PHP 2026.
- **Input:** Trend: **Livewire + Volt** atau **Inertia.js + Vue** dengan Laravel popular untuk "app feel" tanpa SPA berat. PHP WASM belum production-ready — skip.
- **Flag:** Reference: Linear.app UX (speed), Notion mobile (navigation) — inspirasi, bukan copy.

---

## Keputusan Operasi (DIBA)

1. **Stack disyorkan (MVP 6–8 minggu):**
   - PHP **8.3+** · Laravel 11 API + **Livewire 3 / Volt** (atau Inertia+Vue jika team prefer SPA)
   - **Tailwind v4** + custom design system (PIXEL owns)
   - PWA: `manifest.json`, Workbox/service worker, install prompt, offline shell
   - DB: kekal **SQL Server** (FMSDEV) untuk Phase 0 — elak migration risk

2. **UI/UX gate:** Tiada merge UI tanpa lulus checklist PIXEL (tokens, mobile nav, dark/light, skeleton, empty states).

3. **Security gate:** CIPHER sign-off sebelum data sebenar — auth, env, audit, SW cache policy.

4. **Repo:** Greenfield folder `eFMS-PWA/` berasingan; API contract mirror modul eFMS sedia ada (complaints, WO, users).

5. **Bukan scope Phase 0:** AI, multi-tenant, Postgres migration.

---

## Action Items

| Staf | Task | ETA |
|------|------|-----|
| **PIXEL** | Design sprint: moodboard, tokens, 5 skrin core (login, dashboard, senarai aduan, detail, profile) | 5 hari |
| **NEXUS** | Scaffold Laravel 11 + PWA boilerplate + folder structure | 3 hari |
| **CIPHER** | Threat model + auth middleware template + SW cache rules doc | 3 hari |
| **GRID** | Docker Compose dev + `.env.example` | 2 hari |
| **PULSE** | Lighthouse + PWA checklist template | 2 hari |
| **ECHO** | Copy login, splash, PDPA notice (BM) | 2 hari |
| **DIBA** | Sync scaffold selepas keputusan Zuex on stack final | — |

---

## Escalations (perlu Zuex)

1. ~~Greenfield `eFMS-PWA/` vs upgrade in-place?~~ → **eFMS-PWA** ✅
2. ~~Livewire vs Inertia+Vue?~~ → **Livewire** ✅
3. ~~Rebrand atau kekal eFMS SuperApp?~~ → **Rebrand: FasilitiOne** ✅
4. ~~Target go-live?~~ → **Ogos 2026** ✅

**CEO decision logged:** 2026-06-01 — Scaffold started at `C:\xampp\htdocs\eFMS-PWA`

