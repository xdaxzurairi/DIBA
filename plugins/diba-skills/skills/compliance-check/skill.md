---
name: compliance-check
description: Audit compliance PDPA/GDPR/regulasi Malaysia. Output: gap analysis dengan remediation steps yang konkrit.
dept: legal
model: opus
triggers:
  - compliance
  - pdpa
  - gdpr
  - regulasi
  - audit
  - data protection
  - semak compliance
  - compliance check
---

# Skill: compliance-check

## Tujuan
Audit compliance organisasi/produk/sistem terhadap regulasi data protection dan undang-undang berkaitan — khususnya PDPA Malaysia, GDPR (EU), dan regulasi Malaysia yang relevan.

> **CAVEAT WAJIB:** Output skill ini adalah untuk **tujuan penilaian awal dan awareness sahaja**. Ia **bukan nasihat undang-undang atau audit rasmi**. Untuk compliance audit yang sah secara legal, dapatkan khidmat DPO (Data Protection Officer) bertauliah atau firma undang-undang yang berkelayakan.

## Cara Guna
Abam describe:
- Jenis bisnes/produk/sistem
- Data apa yang dikumpul (nama, emel, IC, kesihatan, kewangan, dll)
- Bagaimana data dikumpul, disimpan, digunakan, dikongsi
- Platform yang digunakan (web app, mobile, SaaS, dll)
- Apa-apa concern spesifik

## Skop Regulasi

### PDPA Malaysia (Personal Data Protection Act 2010)
7 prinsip utama:
1. General principle — tujuan pemprosesan mesti dibenarkan
2. Notice & Choice principle — inform data subjects
3. Disclosure principle — tak boleh disclose tanpa consent
4. Security principle — protect data daripada breach
5. Retention principle — jangan simpan lebih lama dari perlu
6. Data integrity principle — data mesti accurate
7. Access principle — data subject boleh access & betulkan data

### GDPR (jika applicable — EU users / EU operations)
Key requirements:
- Lawful basis for processing
- Data subject rights (access, erasure, portability)
- Privacy by design & default
- Data breach notification (72 jam)
- DPO appointment (jika perlu)
- Data Processing Agreements dengan vendors

### Malaysia-specific regulations
- Communications and Multimedia Act 1998 (CMA)
- Computer Crimes Act 1997
- Digital Signature Act 1997
- Financial Services Act 2013 (untuk fintech)
- Medical Act (untuk healthcare data)

## Output Format

### 1. Profile Assessment

| Item | Maklumat |
|---|---|
| Jenis Organisasi | [SME / Enterprise / Startup] |
| Industri | [Tech / Fintech / Healthcare / Pendidikan / dll] |
| Regulasi Applicable | [PDPA / GDPR / Kedua-dua / Lain] |
| Data Sensitivity Level | [Low / Medium / High / Critical] |
| Estimated Risk Level | [LOW / MEDIUM / HIGH / CRITICAL] |

### 2. Gap Analysis Table

| Requirement | Status | Gap | Priority |
|---|---|---|---|
| Privacy Policy ada & terkini | ✅ / ⚠️ / ❌ | [Penerangan] | HIGH |
| Consent mechanism jelas | ✅ / ⚠️ / ❌ | [Penerangan] | HIGH |
| Data retention policy | ✅ / ⚠️ / ❌ | [Penerangan] | MEDIUM |
| Security measures (encryption) | ✅ / ⚠️ / ❌ | [Penerangan] | HIGH |
| Breach response plan | ✅ / ⚠️ / ❌ | [Penerangan] | HIGH |
| Third-party data sharing agreement | ✅ / ⚠️ / ❌ | [Penerangan] | MEDIUM |
| User rights fulfillment process | ✅ / ⚠️ / ❌ | [Penerangan] | MEDIUM |
| Staff training on data protection | ✅ / ⚠️ / ❌ | [Penerangan] | LOW |

**Legend:** ✅ Compliant | ⚠️ Partial / Needs Review | ❌ Non-compliant

### 3. Critical Gaps (Mesti Selesai Segera)

Untuk setiap gap kritikal:

---

**Gap: [Nama Gap]**
- **Regulasi:** PDPA Section X / GDPR Article X
- **Isu:** [Penerangan isu]
- **Risiko:** [Potential penalty / consequence]
- **Remediation:** [Langkah konkrit untuk selesaikan]
- **Timeline:** [Segera / 30 hari / 90 hari]

---

### 4. Remediation Roadmap

**Fasa 1 — Immediate (0-30 hari):**
- [ ] [Tindakan konkrit]
- [ ] [Tindakan konkrit]

**Fasa 2 — Short-term (30-90 hari):**
- [ ] [Tindakan konkrit]
- [ ] [Tindakan konkrit]

**Fasa 3 — Long-term (90-180 hari):**
- [ ] [Tindakan konkrit]
- [ ] [Tindakan konkrit]

### 5. Quick Wins (Boleh Buat Hari Ini)

- [Tindakan mudah yang boleh buat segera]
- [Tindakan mudah yang boleh buat segera]
- [Tindakan mudah yang boleh buat segera]

### 6. Resources & Templates

Bergantung pada gap yang dikenal pasti, DIBA akan provide:
- Draft Privacy Policy template
- Consent form template
- Data breach notification template
- Data retention schedule template
- Third-party DPA checklist

## Nota Penting
- PDPA Malaysia dikuatkuasakan oleh **Jabatan Perlindungan Data Peribadi (JPDP)**
- Penalti: sehingga RM500,000 denda dan/atau penjara sehingga 3 tahun
- GDPR penalti: sehingga €20 juta atau 4% global annual turnover
- Skill ini **tidak menggantikan audit rasmi** oleh pihak bertauliah

> **PERINGATAN:** Untuk compliance audit yang sah, dapatkan khidmat profesional. Skill ini adalah panduan permulaan sahaja.
