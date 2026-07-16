---
name: financial-snapshot
description: Buat ringkasan kewangan — cash flow, budget tracking, dan runway estimate. Output berupa table ringkasan + cadangan tindakan konkrit.
dept: finance
model: opus
triggers:
  - cash flow
  - budget
  - berapa duit
  - financial health
  - runway
  - kewangan
---

# Skill: financial-snapshot

## Tujuan
Buat snapshot kewangan yang jelas dan actionable — cash flow semasa, status budget, dan runway estimate. Sesuai untuk founder/freelancer/team yang nak tahu kedudukan kewangan sekarang.

## Cara Guna
Abam provide maklumat kewangan dalam format apa pun (teks, nombor, senarai). DIBA akan susun jadi snapshot terstruktur.

**Input boleh termasuk:**
- Baki bank / cash at hand
- Pendapatan bulan ini / expected incoming
- Perbelanjaan tetap (gaji, hosting, tools, sewa)
- Perbelanjaan variable (marketing, freelancer, misc)
- Outstanding invoices
- Committed expenses yang belum keluar

## Output Format

### 1. Cash Flow Summary Table

| Kategori | Jumlah (RM) | Status |
|---|---|---|
| Cash at Hand | RM X,XXX | [Selamat / Kritikal] |
| Expected Incoming (bulan ini) | RM X,XXX | [Confirmed / Projected] |
| Fixed Expenses (bulan ini) | RM X,XXX | — |
| Variable Expenses (bulan ini) | RM X,XXX | — |
| **Net Cash Flow** | **RM X,XXX** | **[Positif / Negatif]** |
| Outstanding Invoices | RM X,XXX | [Due dalam X hari] |

### 2. Runway Estimate

```
Runway = Cash at Hand ÷ Monthly Burn Rate
```

| Metric | Nilai |
|---|---|
| Monthly Burn Rate | RM X,XXX |
| Current Cash | RM X,XXX |
| Estimated Runway | X bulan |
| Runway Date | [Bulan, Tahun] |

**Status Runway:**
- 6+ bulan: Selamat — fokus pada growth
- 3-6 bulan: Perhatian — mula optimize burn
- < 3 bulan: Kritikal — immediate action required

### 3. Budget vs Actual (jika data ada)

| Budget Item | Allocated | Spent | Variance | % Used |
|---|---|---|---|---|
| [Item] | RM X | RM X | +/- RM X | XX% |

### 4. Cadangan Tindakan

Berdasarkan snapshot di atas, DIBA akan beri 3-5 cadangan konkrit:

**Immediate (minggu ini):**
- [Tindakan spesifik]

**Short-term (bulan ini):**
- [Tindakan spesifik]

**Strategic (1-3 bulan):**
- [Tindakan spesifik]

## Prinsip Output
- Nombor mestilah tepat — jangan estimate tanpa kata estimate
- Flag mana-mana angka yang Abam tak provide (jangan reka-reka)
- Tone: direct, no sugarcoating — kalau kritikal, kata kritikal
- Cadangan mesti actionable, bukan generic

## Nota
Skill ini untuk **internal awareness** sahaja. Untuk keputusan kewangan besar (pelaburan, pinjaman, cukai), rujuk akauntan atau perancang kewangan bertauliah.
