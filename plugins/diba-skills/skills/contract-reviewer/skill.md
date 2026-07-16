---
name: contract-reviewer
description: Review kontrak — identify risky clauses, flag missing protections, suggest amendments. Output: review report dengan risk level per section.
dept: legal
model: opus
triggers:
  - kontrak
  - contract
  - agreement
  - terms
  - clauses
  - nda
  - perjanjian
  - service agreement
  - review kontrak
---

# Skill: contract-reviewer

## Tujuan
Buat preliminary review kontrak — flag risky clauses, identify missing protections, dan suggest amendments. Sesuai untuk NDA, service agreement, vendor contract, employment contract, dan sebagainya.

> **CAVEAT WAJIB:** Output skill ini adalah untuk **tujuan maklumat dan pemahaman awal sahaja**. Ia **bukan nasihat undang-undang profesional**. Untuk kontrak bernilai tinggi, kompleks, atau yang melibatkan risiko besar, sila rujuk peguam bertauliah.

## Cara Guna
Abam paste atau upload kandungan kontrak. DIBA akan scan dan buat review terstruktur.

**Maklumat berguna untuk disertakan:**
- Jenis kontrak (NDA, service agreement, employment, vendor, dll)
- Pihak yang mana (penerima atau pemberi kontrak)
- Context ringkas (nilai kontrak, tempoh, industri)

## Output Format

### 1. Contract Overview

| Item | Maklumat |
|---|---|
| Jenis Kontrak | [NDA / Service Agreement / dll] |
| Pihak A | [Nama / Peranan] |
| Pihak B | [Nama / Peranan] |
| Tempoh Kontrak | [X bulan / tahun] |
| Nilai Kontrak | [RM X / Tidak dinyatakan] |
| Governing Law | [Malaysia / lain] |
| Tarikh Ditandatangani | [Tarikh / TBD] |

### 2. Risk Assessment Summary

**Overall Risk Level: [LOW / MEDIUM / HIGH / CRITICAL]**

| Bahagian | Risk Level | Isu Utama |
|---|---|---|
| Scope of Work | 🟡 MEDIUM | Scope terlalu broad |
| Payment Terms | 🔴 HIGH | Tiada late payment penalty |
| Termination | 🟢 LOW | Reasonable notice period |
| Liability Cap | 🔴 HIGH | Unlimited liability exposure |
| Confidentiality | 🟡 MEDIUM | Duration tidak dinyatakan |
| IP Ownership | 🔴 HIGH | IP sepenuhnya kepada client |

### 3. Risky Clauses — Flagged Items

Untuk setiap isu, DIBA akan provide:

---

**[Bahagian X.X] — [Tajuk Klausa]**
- **Risk Level:** HIGH
- **Teks asal:** *"[Quote exact text dari kontrak]"*
- **Isu:** [Penjelasan kenapa ini berisiko]
- **Cadangan amendment:** *"[Suggested replacement text]"*

---

### 4. Missing Protections

Perkara yang **sepatutnya ada** tapi **tiada dalam kontrak:**

- [ ] Force Majeure clause
- [ ] Dispute resolution mechanism (arbitration/mediation)
- [ ] Late payment penalty / interest
- [ ] Revision/change request process
- [ ] Data protection clause (PDPA compliance)
- [ ] Limitation of liability cap
- [ ] Non-solicitation clause (jika berkaitan)
- [ ] Intellectual property assignment yang jelas

### 5. Cadangan Tindakan

**Sebelum tandatangan:**
1. [Tindakan spesifik]
2. [Tindakan spesifik]

**Negotiate untuk ubah:**
1. [Klausa + cadangan penggantian]

**Boleh terima (dengan syarat):**
1. [Item + syarat penerimaan]

**Deal breaker (jangan tandatangan tanpa ubah ini):**
1. [Item kritikal]

## Jenis Kontrak yang Disokong

- **NDA (Non-Disclosure Agreement)** — check scope, duration, exceptions
- **Service Agreement / MSA** — check scope, deliverables, payment, IP
- **Employment Contract** — check notice period, non-compete, IP
- **Vendor/Supplier Agreement** — check SLA, liability, termination
- **Partnership Agreement** — check profit sharing, decision making, exit
- **Freelance Contract** — check payment terms, revision policy, IP

> **PERINGATAN:** Skill ini **tidak menggantikan nasihat peguam**. Untuk kes yang melibatkan nilai tinggi, sengketa, atau jurisdiction luar Malaysia, dapatkan nasihat profesional.
