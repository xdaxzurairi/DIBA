# Learned Facts
*Atomic facts dengan source + context penuh.*
*Format: ## [YYYY-MM-DD] Title*

## [2026-07-13] Webhook > Polling untuk Realtime Events
- **Source:** correction dari Abam
- **Context:** Signal test — pattern ini dicapture sebagai first lesson dalam self-learning loop
- **Fact:** Untuk realtime events, guna webhook — bukan API polling

## [2026-07-16] ADODB+MSSQL — FETCH_NUM bukan FETCH_ASSOC
- **Source:** tool-fail dari DIBA (Write capture)
- **Context:** Bekerja dengan ADODB pada MSSQL server — query return column names dalam case yang tidak konsisten
- **Fact:** ADODB+MSSQL memulangkan nama kolum dalam case yang tidak dijamin (uppercase/lowercase bergantung driver). Guna FETCH_NUM untuk elak case mismatch.

## [2026-07-21] Ruflo Memory Import — JSON Format Mesti Wrapper Object
- **Source:** tool-fail dari DIBA (ruflo integration)
- **Context:** `ruflo memory import -i batch.json` gagal dengan "Entries: 0" bila JSON adalah raw array
- **Fact:** `ruflo memory import` mesti format `{ "entries": [...] }` sebagai wrapper object, bukan raw array `[...]`. Tanpa wrapper, ruflo parse 0 entries.

## 2026-07-21 — .cursor/skills/ Tidak Dibersihkan oleh session-start.sh
- **Source:** new-folder signal dari git-monitor.js
- **Context:** git-monitor.js detected `.cursor/skills/anchor/`, `.cursor/skills/diba-operator/`, `.cursor/skills/dream-ideas/` dll sebagai untracked folders.
- **Fact:** `session-start.sh` hanya padam deprecated skills dari `~/.claude/skills/` — ia tidak menyentuh `.cursor/skills/`. Deprecated skills boleh kekal dalam cursor vault secara kekal.
