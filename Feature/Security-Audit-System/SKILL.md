---
name: security-audit-remediation
description: "Gunakan bila Abam bawa security audit report atau findings list untuk
             diselesaikan. Trigger: user paste audit report, 'security audit',
             'audit report', 'isu security', 'findings', atau output dari semgrep/CodeQL.
             Dormant untuk bug fix biasa, performance, atau UI work."
---

# Security Audit System — DIBA Remediation Protocol
*Triage. Batch. Fix. Clean. Commit.*

## Activation

When this skill activates, output:
"Security Audit aktif. Triage sebelum fix."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam paste audit report atau findings list** | ACTIVE — triage segera |
| **Abam kata "security audit", "audit report"** | ACTIVE — minta report jika belum ada |
| **Abam kata "isu security", "findings"** | ACTIVE — triage segera |
| **Output semgrep, CodeQL, atau manual audit disediakan** | ACTIVE — ingest dan triage |
| **Bug fix biasa tanpa context security** | DORMANT — guna kod standard sahaja |
| **Performance, UI, atau feature work** | DORMANT — skill ini tidak aktif |
| **Abam kata "skip security" atau "ignore findings"** | EXIT — log warning, teruskan tanpa skill |

---

## Protocol

### Step 1: Ingest & Triage

- [ ] Baca semua findings dan kategorikan:

| Severity | Contoh | Fix Order |
|----------|--------|-----------|
| Critical | RCE, auth bypass, hardcoded credentials dalam prod | Fix pertama |
| High | SQL injection, CSRF, exposed error messages | Fix kedua |
| Medium | Missing rate limit, insecure headers, debug output aktif | Fix ketiga |
| Low | Type hints, code smell, dead code | Fix terakhir / skip |

- [ ] Output triage dalam format:

```
Triage Summary
==============
Critical (X): [senarai ringkas]
High     (X): [senarai ringkas]
Medium   (X): [senarai ringkas]
Low      (X): [senarai ringkas]

Cadangan: mulakan dengan [kategori] — [sebab]. Proceed?
```

- [ ] Tunggu kelulusan Abam sebelum mula fix

---

### Step 2: Batch Planning

- [ ] Sebelum fix, kenal pasti fail yang boleh di-batch:
  - Fail dengan **jenis isu sama** → fix bersama (contoh: 40 fail dengan `$e->getMessage()` terdedah)
  - Fail dengan **isu berbeza** → fix satu-satu dengan verification
- [ ] Untuk batch fix (5+ fail, jenis isu sama), confirm dahulu:

```
Batch fix: [jenis isu] — [X fail]
Contoh perubahan: [sebelum] → [selepas]
Proceed batch?
```

---

### Step 3: Fix by Severity

Untuk setiap kategori (Critical → High → Medium):
- [ ] Fix semua isu dalam kategori tersebut
- [ ] Verify: baca semula fail yang diubah untuk confirm ketepatan
- [ ] Tanya Abam sebelum proceed ke kategori seterusnya (jika perubahan signifikan)

**Larangan semasa fix:**
- Jangan ubah API contract (format request/response) tanpa semak semua callers
- Jangan buang error handling sedia ada — tambah kepadanya, bukan buang
- Jangan tinggalkan script diagnostic sementara selepas fix selesai

---

### Step 4: Temp Script Cleanup

- [ ] Cari dan buang script temp/diagnostic yang dibuat semasa sesi:
  - Fail dengan prefix `debug_`, `test_`, `tmp_`
  - Fail yang dicatat sebagai "delete after use"
- [ ] Confirm dengan Abam sebelum padam
- [ ] Padam dan verify removal

---

### Step 5: Structured Commit

- [ ] Cadangkan commit message yang jelas per kategori:

```
security: [kategori utama yang difix]

- [isu 1]: [fail / perubahan ringkas]
- [isu 2]: [fail / perubahan ringkas]
- [jika batch]: mass fix [X fail] — [jenis isu]
```

Contoh:
```
security: fix SQL injection + remove hardcoded credentials

- SQL injection: PDO bind params pada 3 fail dalam admin/
- Credentials: pindah GOOGLE_CLIENT_ID, SSO_SECRET ke .env
- Mass fix 108 fail: DB error exposure → error_log + generic message
```

---

### Step 6: Post-Fix Summary

- [ ] Output ringkasan lengkap:

```
Remediation Complete
====================
Critical: X isu — [status]
High:     X isu — [status]
Medium:   X isu — [status]
Skipped:  X isu — [sebab]

Temp scripts deleted: [senarai / none]
Commit created: [yes / pending]
```

---

## Mandatory Rules

1. **Triage dahulu** — jangan fix tanpa triage; isu kritikal mungkin terlepas pandang
2. **Batch confirm** — untuk 5+ fail jenis sama, tunjuk contoh perubahan sebelum proceed
3. **Temp scripts mesti dibersihkan** — setiap sesi mesti berakhir dengan cleanup check
4. **Commit per kategori** — elak satu commit besar yang sukar direview
5. **Jangan ubah API contract** tanpa semak semua callers dahulu
6. **Low severity = optional** — tanya Abam sama ada perlu include atau skip
7. **Jangan buang error handling** sedia ada — tambah, bukan kurang
8. **Verify selepas setiap fix** — baca semula fail yang diubah sebelum proceed

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Findings list tidak ada severity label | Triage sendiri berdasarkan contoh dalam jadual — confirm dengan Abam |
| Isu kritikal memerlukan ubah API contract | Stop — escalate ke Abam, jangan proceed sendiri |
| Batch fix menjejaskan > 100 fail | Tunjuk sample 3–5 fail dahulu, minta kelulusan eksplisit |
| Fix satu isu menyebabkan isu lain | Report regression — jangan hide atau skip |
| Caller tidak dapat dikesan untuk API change | Flag kepada Abam — jangan ubah tanpa peta penuh |
| Isu Low severity tetapi ada risk hidden | Escalate — categorise semula sebagai Medium/High |
| Abam kata "skip all low" | Rekod dalam summary: X low severity issues skipped by user |
| Script temp tidak dapat dijumpai untuk cleanup | Report kepada Abam — minta confirm yang memang tiada |
| Commit gagal kerana hook | Investigate hook failure — jangan skip dengan --no-verify |
| Audit report dari tool yang tidak dikenali | Tanya Abam untuk clarify tool dan format sebelum ingest |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `code-sharp` | Semua fix mengikut piawaian kod | Enforce code-sharp principles dalam setiap perubahan |
| `auto-commit` | Selepas setiap kategori selesai | Structured security commit per kategori |
| `orchestrate` | Findings terlalu banyak untuk single pass | Delegate mengikut kategori atau domain |
| `log-decision` | Keputusan skip atau defer sesuatu finding | Log sebab dan trade-off |
| `token-guard` | Report besar dengan ratusan findings | Aktif compact mode untuk jimat context |
| `anchor` | Scope fix mula merebak ke luar security domain | Lock balik ke security scope |

---

## Reference Docs

| Fail | Guna Untuk |
|------|------------|
| `references/php_security_patterns.md` | PHP fix patterns: SQL injection, CSRF, credentials, error exposure, N+1, COLLATE |
| `references/mass_fix_checklist.md` | Batch operation checklist, commit strategy, known edge cases |

---

## Level History

- **Lv.1** — Base: triage mengikut severity (Critical/High/Medium/Low), batch planning untuk same-type issues, temp script cleanup, commit per kategori, post-fix summary. (Origin: Pattern berulang 3× dalam April 2026 — eRuangNiaga security cleanup, full remediation, eWorks security hardening, xdaxzurairi)
- **Lv.2** — Reference Docs: folder `references/` dengan PHP security patterns dan mass fix checklist — knowledge base diasingkan dari protocol supaya skill file kekal lean. (Origin: aitmpl.com template research, 2026-04-28)
- **Lv.3** — Superultra: Frontmatter ditambah, activation message, Context Guard table dengan EXIT row, Protocol restructured kepada full checklist steps, Mandatory Rules dikembangkan kepada 8 peraturan, Edge Cases table 10 baris, Integrasi Skill table 6 baris, larangan semasa fix diexplicitkan. (2026-05-19)
