# eWorks — Discrepancy Laporan Aduan Pelanggan

**Tarikh dikesan:** 2026-06-11
**Status:** PENDING — tunggu jawapan user sebelum ubah kod

---

## Isu

Bilangan "aduan pelanggan" tidak konsisten merentas laporan untuk julat tarikh 01/04/2026 - 30/04/2026:

| Laporan | Nilai | Fail |
|---------|-------|------|
| 1b — Status aduan keseluruhan PPF | 2938 | `lap_ppf_bzs_d.php` |
| 1c — Perbandingan aduan pelanggan vs inisiatif | 2938 | `lap_ppf_bzs_e.php` |
| 7a — Pengendalian Aduan & Baikpulih | 3372 (sebelum 3416) | `lap_ringkasan_aduan_pengendalian.php` |
| 3b — Laporan jumlah punca kerosakan | 3282 | `lap_ppf_jenisrosak_b.php` |

---

## Punca Teknikal — 7a vs 1c (perbezaan terbesar)

### Perbezaan 1: Tiada filter bangunan dalam 7a
```sql
-- 7a base query (baris a): tiada bl_id filter → semua bangunan masuk
-- 1c: AND bl_id LIKE 'B01%'
```

### Perbezaan 2: Tiada filter section dalam 7a
```sql
-- 7a base query (baris a): tiada section filter → semua section masuk
-- 1c: AND section IN ('LAN','MAJ','BAN','PROJEK','MEC','ELE','TEL','INF CIV','INF MEC','INF ELE')
```

### Perbezaan 3: Status scope berbeza
```sql
-- 1c: status IN ('R','I','Com','WC') — includes Com & WC
-- 7a formula: a - b - c - d - e - f
--   (b) tolak status S, HP, clo, Com ← Com ditolak!
--   (d) tolak status Can, WC         ← WC ditolak!
--   Hasil: hanya R dan I tinggal
```

---

## Analisis 3b — Punca Kerosakan (2026-06-12)

Fail: `lap_ppf_jenisrosak_b.php`

SQL semasa:
```sql
SELECT c.description, COUNT(wr_id) AS JUM
FROM wr w
LEFT JOIN causetyp c ON w.cause_type = c.cause_type
WHERE w.cause_type IS NOT NULL
  AND prob_type != 'PREVENTIVE MAINT'
  AND site_id = 'B01'
  [+ filter tarikh]
GROUP BY w.cause_type, c.description
ORDER BY COUNT(wr_id) DESC
```

Punca 3b (3282) lebih tinggi dari 1c (2938):
1. **Tiada filter section** — 3b ambil semua section, 1c ada `AND section IN ('LAN','MAJ',...)`
2. **Inisiatif masuk sekali** — tiada `type_req != '5'`, sedangkan 1c asingkan inisiatif (`type_req = '5'`) secara berasingan

---

## Fix Cadangan (BELUM DILAKSANA)

Fail: `lap_ringkasan_aduan_pengendalian.php` (line 117-121)

Tambah ke base SQL WHERE clause:
```sql
AND bl_id LIKE 'B01%'
AND section IN ('LAN','MAJ','BAN','PROJEK','MEC','ELE','TEL','INF CIV','INF MEC','INF ELE')
```

Dan kira JUMLAH PELANGGAN secara langsung (bukan formula a-b-c-d-e-f) supaya status scope sama dengan 1c.

---

## Tindakan Diperlukan

**Tunggu jawapan user** — adakah 7a perlu diselaraskan supaya:
- Option A: Sama dengan 1c (R+I+Com+WC, bl_id B01%, 10 sections) = 2938
- Option B: Kekal formula semasa tapi tambah filter bl_id + section sahaja
- Option C: Tidak ubah — laporan memang direka berbeza

**3b** — pending keputusan sama ada nak tambah `type_req != '5'` + filter section supaya konsisten dengan 1c.

**Jangan ubah kod** sehingga keputusan diterima.
