---
name: pwa_eworks Work Protocol
description: Peraturan kerja dan konvensyen teknikal untuk projek pwa_eworks (webs-150 / FMSPROD)
type: project
---

# pwa_eworks — Work Protocol

## DB Schema Rule (KRITIKAL)

**Semua table dan field MESTI diwujudkan dahulu melalui Archibus, kemudian ditarik/sync ke MSSQL.**

- DILARANG buat table atau ALTER TABLE terus dalam MSSQL tanpa melalui Archibus
- Script SQL mesti disimpan dalam `scripts/pwa_tables_archibius.sql` sebelum dijalankan
- Ini termasuk: table baru, column baru, index, constraint

**Why:** Table `afm.user_notifications` yang corrupt adalah contoh apa berlaku bila PHP cipta table inline tanpa melalui Archibus — column type salah, schema salah, duplikasi.

## Database

- PROD: FMSPROD @ 10.0.36.128:1433 (user: afm)
- DEV: FMSDEV @ 10.0.36.97:1433 (user: afm)
- Default schema: `dbo` — semua table PWA mesti dalam schema `dbo`

## Isu Aktif

- `afm.user_notifications` — perlu di-DROP (duplikasi dengan type salah, kolum `read_at` adalah smallint bukan datetime)
- `dbo.user_notifications` — canonical, betul
