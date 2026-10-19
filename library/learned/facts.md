# Learned Facts
*Atomic facts dengan source + context penuh.*
*Format: ## [YYYY-MM-DD] Title*

## [2026-07-13] Webhook > Polling untuk Realtime Events
- **Source:** correction dari Abam
- **Context:** Signal test — pattern ini dicapture sebagai first lesson dalam self-learning loop
- **Fact:** Untuk realtime events, guna webhook — bukan API polling

## [2026-07-16] ADODB+MSSQL — FETCH_NUM bukan FETCH_ASSOC
- **Source:** tool-fail dari DIBA (Write capture) — ⚠️ sumber tak sah (false positive capture-signal, 2026-10-01); fakta belum disahkan, verify sebelum guna
- **Context:** Bekerja dengan ADODB pada MSSQL server — query return column names dalam case yang tidak konsisten
- **Fact:** ADODB+MSSQL memulangkan nama kolum dalam case yang tidak dijamin (uppercase/lowercase bergantung driver). Guna FETCH_NUM untuk elak case mismatch.

## [2026-07-21] Ruflo Memory Import — JSON Format Mesti Wrapper Object
- **Source:** tool-fail dari DIBA (ruflo integration) — ⚠️ entri tool-fail asal mungkin false positive (2026-10-01); simptom "Entries: 0" kelihatan pemerhatian sebenar, sahkan semula pada ruflo 3.49
- **Context:** `ruflo memory import -i batch.json` gagal dengan "Entries: 0" bila JSON adalah raw array
- **Fact:** `ruflo memory import` mesti format `{ "entries": [...] }` sebagai wrapper object, bukan raw array `[...]`. Tanpa wrapper, ruflo parse 0 entries.

## 2026-07-21 — .cursor/skills/ Tidak Dibersihkan oleh session-start.sh
- **Source:** new-folder signal dari git-monitor.js
- **Context:** git-monitor.js detected `.cursor/skills/anchor/`, `.cursor/skills/diba-operator/`, `.cursor/skills/dream-ideas/` dll sebagai untracked folders.
- **Fact:** `session-start.sh` hanya padam deprecated skills dari `~/.claude/skills/` — ia tidak menyentuh `.cursor/skills/`. Deprecated skills boleh kekal dalam cursor vault secara kekal.

## [2026-10-14] Persekitaran Windows Abam: pdftoppm dan winget Tiada
- **Source:** tool-fail sebenar (PostToolUseFailure) 2026-10-14
- **Context:** Read PDF gagal "pdftoppm is not installed"; PowerShell `winget` tidak dikenali.
- **Fact:** Mesin ini tiada poppler-utils (`pdftoppm`) dan tiada `winget`. Baca PDF guna jalan lain (pdf-viewer skill / pdf skill / python) dan jangan cadang `winget install`. Pemerhatian satu kali — sahkan semula sebelum jadikan rule.

## [2026-10-14] Folder Baharu dalam XDIBAX (git-monitor, Jul–Okt 2026)
- **Source:** 35 signal `new-folder` (digabung; kebanyakan pendua berulang setiap sesi)
- **Context:** Folder tak dijejak yang berulang dikesan: `.claude-flow/{learning,metrics,security,policy}`, `.cursor/skills/*` (deprecated), `.agents/skills/agentdb-*`, `.claude/skills/*` (addyosmani set), `.claude/worktrees/virtual-hq-3d-kenney`, `office-sim/` (src/app/office, src/game/world), `bsmwebsite/`, `main/BFMwebsite/`, `daily-diary/archived/2026-0{7,8,9}`.
- **Fact:** Projek aktif baharu dalam XDIBAX: office-sim (game 3D), bsmwebsite, BFMwebsite. Selebihnya tooling/arkib. Tiada tindakan struktur diperlukan.

## [2026-10-16] Tempoh Siap Sebenar eWorks/PWA dalam Minit
- **Source:** sesi eWorks 2026-10-16 (arahan Abam)
- **Fact:** `wr.action_period_m` = round(abs((siap − date_requested) minit − cuti CALENDAR × 1440)); `wr.action_period` (jam) = round(minit/60); `wr.masa_siap_tangguh_m` = max(0, action_period_m − tempoh baik pulih minit), tanpa tolak cuti tambahan. Dikod di `tutup_arahan_kerja.php` & PWA `includes/tutup_ak_save.php`; paparan `format_tempoh_minit`. Hanya rekod baharu; ujian dev: 1295610 (5544), 1295601 (1841). Prod belum disalin.
