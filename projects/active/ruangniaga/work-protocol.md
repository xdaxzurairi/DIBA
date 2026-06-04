# Work Protocol — RuangNiaga (Local)

## Stack
- Local path: `C:/Apache24/htdocs/ruangniaga`
- Network path: `//10.0.36.127/webs/ruangniaga`
- Server: Apache 2.4 (localhost)

## Cara Kerja
- Fix minimum-impact dahulu sebelum refactor
- Sistem live — semak semua caller sebelum ubah API contract
- Selepas edit JS, verify tiada regression pada DOM interaction

## Notes
- Memory core network (`admin/memory_core/`) mungkin ada context lama di `//10.0.36.127/webs/ruangniaga/admin/memory_core/` apabila network accessible
