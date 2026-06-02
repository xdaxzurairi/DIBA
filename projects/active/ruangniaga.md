# RuangNiaga Project
**Commercial Space & Venue Rental Management System**

---

## Project Overview

**RuangNiaga** adalah aplikasi web untuk mengelola permohonan dan penyewaan ruang komersial dan gerai jualan. Sistem ini mendukung berbagai peranan pengguna, submisi borang, dan integrasi dengan infrastruktur UITM.

### Key Stats
- **Language**: PHP (procedural)
- **Database**: MySQL
- **Framework**: Custom PHP (no major framework detected)
- **Front-end**: HTML/CSS/JavaScript (Bootstrap-based)
- **PDF Generation**: TCPDF library
- **Authentication**: Google OAuth + local credentials
- **Last Updated**: 2026-05-15 (9 commits since 2026-04-23)
- **Status**: Active Development

---

## Architecture

### Directory Structure
```
/ruangniaga
├── /includes/          # Shared utilities & helpers
│   ├── conn.php       # Database connection
│   ├── session.php    # Session management (optimized: single DB query)
│   ├── csrf_helper.php # CSRF token generation/validation
│   ├── google_*.php   # Google OAuth integration
│   ├── header.php, footer.php, navbar.php, sidebar.php
│   ├── scripts.php    # JS includes
│   └── grid_*.php     # Grid metrics/tracker (monitoring)
├── /recaptcha/        # reCAPTCHA library (vendor)
├── /tcpdf/            # TCPDF library (PDF generation)
├── /monitoring/       # Monitoring/logging directory
└── *.php              # Main application pages
```

### Core Pages (32 PHP files in root)

**Authentication & Account Management**
- `login.php`, `login_penyewa.php` — Login pages for staff/renters
- `signup.php`, `signup_konvo.php` — Registration flows
- `signup_verify.php`, `signup_konvo_create.php`, `signup_create.php` — Verification & account creation
- `verify_staff.php`, `verify_penyewa.php`, `verify.php` — Email verification
- `password_forget.php`, `password_reset.php`, `password_update.php`, `password_verify.php` — Password recovery
- `google_signin_admin.php`, `google_signin_help.php`, `google_callback.php`, `google_signin_logout.php` — OAuth flows
- `activate_account.php` — Account activation

**Portal & Content Pages**
- `portal.php` — Main dashboard/portal
- `portal_niaga.php`, `portal_niaga_data.php` — Commercial space listings
- `portal_permohonan_tapak_konvo.php` — Convo venue/stall application forms
- `portal_iklan.php` — Advertisements section
- `portal_pekeliling.php` — Circulars/announcements
- `portal_contactus.php` — Contact form

**Utilities**
- `check_session.php` — Session validation
- `check_and_create_user_270.php` — User creation automation
- `get_staff_details.php` — Staff data lookup
- `search_staff.php` — Staff search functionality
- `logout.php` — Logout handler

---

## Key Features (Extracted from Commits)

### User Roles
1. **Staff (Kakitangan)** — System administrators
2. **Penyewa (Renters)** — Space renters
3. **Penyewa Konvo** — Convo stall sellers (PERANAN 12 — added 2026-05-14)

### Core Functionality
✅ User registration & email verification  
✅ Password reset/recovery  
✅ Google OAuth single sign-on  
✅ Role-based access control  
✅ Form submissions for space/stall applications  
✅ PDF document generation (TCPDF)  
✅ Staff search & contact management  
✅ Announcements & circulars system  
✅ Permission management (settings configuration)  

### Security Features (Recent Focus)
✅ **CSRF Protection** — Added on all forms and POST handlers (2026-04-23, 2026-04-24)  
✅ **Session Security** — session_regenerate_id() after login, fixed session fixation (2026-04-23)  
✅ **SQL Injection Prevention** — Parameterized queries, fixed SQL binding (2026-04-23, 2026-04-24)  
✅ **Rate Limiting** — Login attempts limited to 5 per 15 minutes (2026-04-23)  
✅ **Error Handling** — Generic error messages, detailed logging (108 instances fixed)  
✅ **Credential Management** — Moved hardcoded credentials to .env file (2026-04-23)  
✅ **API Security** — UITM Bank API JWT tokens in .env instead of hardcoded (2026-04-27)  
✅ **Vulnerability Removal** — Removed path traversal vulnerability (download.php)  

### Recent Performance Improvements
⚡ Session optimization — Reduced 11 separate DB blocks to single query (2026-04-27)  

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | PHP (procedural) |
| **Database** | MySQL |
| **Frontend** | HTML5, CSS, JavaScript (Bootstrap-based) |
| **PDF Generation** | TCPDF |
| **Authentication** | Google OAuth 2.0, JWT (UITM Bank API) |
| **Validation** | reCAPTCHA, custom CSRF tokens |
| **Session Management** | PHP Sessions with regeneration |
| **Monitoring** | Grid metrics/tracker system (new) |

---

## Current State (2026-05-15)

### Recent Achievements (Last 5 Commits)
1. **Settings & Permissions Configuration** (2026-05-15) — Flowchart documentation added
2. **Penyewa Konvo Role (PERANAN 12)** (2026-05-14) — New user role for convo stall sellers
3. **Critical Bug Fixes** (2026-05-14) — 3 critical bugs in space application form fixed
4. **CSRF Protection** (2026-04-27) — AJAX & signup POST handlers secured
5. **Google OAuth Fix** (2026-04-27) — Fixed login failure, switched from getenv() to $_ENV

### Modified Files (Current Session)
- `login.php` — Modified
- `login_penyewa.php` — Modified
- `portal.php` — Modified
- `GRID-LOCAL-SETUP.md` — New (grid setup docs)
- `GRID-SETUP.md` — New (grid setup docs)
- `docker-compose.yml` — New (containerization)
- `monitoring/` — New directory
- `includes/grid_metrics.php` — New (monitoring)
- `includes/grid_tracker.php` — New (tracking)

---

## Development Patterns Observed

### Code Style
- **Language Mix**: Malay + English in comments & messages
- **Naming**: Mixed camelCase and snake_case
- **Structure**: Procedural PHP, no MVC/framework
- **Error Handling**: Error logging to `error_log()`, generic user-facing messages

### Security Practices (Post 2026-04-23)
- CSRF tokens on all forms
- Parameterized SQL queries
- Environment variables for secrets (.env)
- Session regeneration after successful authentication
- Input validation & reCAPTCHA integration

### Version Control
- Commits in English & Malay
- Detailed commit messages with context
- Feature branches not observed (linear history)

---

## Known Dependencies

### External Libraries (Vendor)
- `recaptcha/` — Google reCAPTCHA SDK
- `tcpdf/` — TCPDF PDF generation library

### External Services
- **Google OAuth** — User authentication
- **UITM Bank API** — (JWT token, secured in .env)
- **reCAPTCHA** — Form validation

### Infrastructure
- **Server**: XAMPP (PHP 7.x/8.x)
- **Database**: MySQL
- **Domain**: Likely `//10.0.36.127/webs/ruangniaga` (network path in project list)

---

## Next Steps & Recommendations

### Immediate Priorities
1. ✅ Complete settings/permissions workflow (flowchart docs added 2026-05-15)
2. Test PERANAN 12 (Penyewa Konvo) across all relevant forms
3. Verify CSRF protection on all AJAX endpoints
4. Document grid metrics/monitoring system (new)

### Medium-term Improvements
- Consider MVC framework adoption (current procedural style is hard to maintain at scale)
- Add API documentation for OAuth flows
- Implement automated testing for security features
- Create database schema documentation
- Set up monitoring dashboard (partially in progress with grid system)

### Technical Debt
- Consolidate logging/error handling patterns
- Document database schema and ER diagram
- Audit all POST handlers for CSRF + parameterization
- Remove any remaining hardcoded credentials or secrets

---

## Memory & Context
- **Project Type**: Web application (LAMP stack-based)
- **Primary Language**: PHP (Malay/English comments)
- **Active Since**: 2026-04-23 (secure relaunch after hardening)
- **Last Session**: 2026-05-15 (settings & monitoring)
- **Team Contact**: Zuex (owner), [other contributors from git log if needed]

---

**Last Updated**: 2026-05-15 | Extracted from git history (24 commits) | Status: Active


---
**See also:** [[projects/project-list|project-list]] · [[main/decisions|decisions]] · [[daily-diary/current/2026-05-14|diary 2026-05-14]] · [[company/staff/GRID|GRID]] · [[company/staff/CIPHER|CIPHER]] · [[company/xdibax-profile|xdibax innovation]]
