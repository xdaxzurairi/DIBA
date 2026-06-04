---
name: Plan AI Suggest Jenis Kerosakan — ea_newv3
description: Plan feature cadangan jenis kerosakan berasaskan similarity data aduan lama dalam jadual wr
type: project
---

# Plan: AI Suggest Jenis Kerosakan (Pilihan B)

**Status:** Diluluskan, belum implement (2026-05-21)

## Pendekatan
Guna data aduan lama dalam jadual `wr` — cari `description` yang mirip dengan input pengguna melalui keyword LIKE search, GROUP BY section/prob_group/prob_type, pulang top 3 cadangan.

**Why:** Tiada kos API, guna data sebenar sistem, makin tepat seiring masa.
**How to apply:** Implement bila Abam beri arahan proceed.

## Fail yang Terlibat
| Fail | Tindakan |
|------|----------|
| `ajax/suggest_kerosakan.php` | Baru — endpoint similarity search |
| `pages/borang.php` | Ubah — tambah butang + UI cadangan + JS |

## Logik Endpoint
1. Terima POST: `penerangan`, `idkampus`, `infra`
2. Split `penerangan` → kata-kata (panjang ≥ 3 huruf)
3. Query `wr` WHERE `site_id = idkampus` AND `description LIKE '%kata%'` (OR per kata)
4. GROUP BY `section, prob_group, prob_type` ORDER BY COUNT DESC — ambil TOP 3
5. Resolve ID → nama dari table `section`, `prob_group`, `probtype`
6. Pulang JSON array top 3

## UI
- Butang "Cari Cadangan" bawah textarea `prob_description`
- Card kecil tunjuk top 3: Seksyen > Elemen > Masalah + (N aduan) + butang [Pilih]
- Klik [Pilih] → auto-fill dropdown cascading

## Constraints
- Minimum kata ≥ 3 huruf (elak noise)
- Minimum freq ≥ 2 (hanya corak yang ada rekod)
- Scope: ikut `site_id` kampus yang dipilih
- Dropdown tetap wajib — AI hanya cadang
- Tiada perubahan pada flow simpan.php / info_aduan.php
