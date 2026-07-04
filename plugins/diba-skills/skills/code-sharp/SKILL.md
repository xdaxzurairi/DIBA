---
name: code-sharp
description: "Piawaian janaan kod DIBA — laju, bersih, konsisten, tepat. Auto-triggers sebelum menulis atau mengedit sebarang kod. Enforce minimum-impact edits, no feature creep, verify before done."
---

# Code Sharp — Piawaian Kod DIBA
*Laju. Bersih. Konsisten. Tepat.*

## Activation

Bila skill ini aktif, enforce silently tanpa pengumuman — terus apply standard sebelum mula menulis atau mengedit kod.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Sebelum menulis kod baru** | ACTIVE — apply pre-code checklist |
| **Sebelum edit fail sedia ada** | ACTIVE — read first, then minimum-impact edit |
| **Selepas edit — sebelum claim siap** | ACTIVE — verify gate |
| **Debug / investigation sahaja** | DORMANT — observe, bukan tulis |
| **Perbualan tanpa kod** | DORMANT |

---

## Pre-Code Checklist (Wajib Sebelum Tulis/Edit)

- [ ] **Baca dahulu** — Read fail yang akan diubah sebelum edit (jangan tulis buta)
- [ ] **Skop minimum** — Selesaikan hanya apa yang diminta; jangan tambah feature, refactor, atau "improvement" sampingan
- [ ] **Ikut konvensyen sedia ada** — Naming, indentation, style, import order ikut kod semasa dalam fail/projek
- [ ] **Tiada error handling hantu** — Hanya tambah error handling untuk scenario yang benar-benar boleh berlaku
- [ ] **Tiada abstraksi prematur** — 3 baris serupa lebih baik dari helper baru yang tidak diperlukan lagi
- [ ] **Tiada backward compat hack** — Jika buang kod, buang terus; jangan rename ke `_unused` atau letak `// removed`

---

## Semasa Menulis Kod

### Prinsip Teras
1. **Penyelesaian paling mudah yang cukup** — Mulakan dengan yang paling simple yang solve problem
2. **Edit terkecil** — Sentuh hanya baris yang perlu; jangan reformat blok tidak berkaitan
3. **Tiada comment hiasan** — Hanya komen bila logic tidak self-evident
4. **Tiada docstring/type annotation baru** pada kod yang tidak diubah
5. **Jangan skip hooks** (`--no-verify`) melainkan Abam minta eksplisit

### Semak API Contract
- Sebelum ubah function signature / response format: cari semua caller dengan grep
- Jika ada caller lain → escalate ke Abam sebelum ubah

---

## Verify Gate (Sebelum Report Selesai)

Sebelum kata "siap", "done", atau "fixed":

- [ ] Baca output sebenar — jangan assume
- [ ] Jika ada test: jalankan atau verify secara manual
- [ ] Jika JS/DOM interaction diubah: confirm tiada regression visual
- [ ] Jika SQL diubah: verify query syntax dan data tidak rosak

**Jangan claim siap berdasarkan assumption — hanya berdasarkan bukti.**

---

## Semak Drift Kod

| Drift | Tanda | Tindakan |
|-------|-------|----------|
| Feature creep | Tambah sesuatu yang tak diminta | Strip — buang bahagian luar skop |
| Style drift | Guna style berbeza dari fail semasa | Ikut konvensyen fail itu |
| Over-abstraction | Helper baru untuk satu guna | Inline sahaja |
| Silent expansion | Tambah import/dependency baru tanpa tanya | Report ke Abam dahulu |
| Verify skip | Claim siap tanpa baca output | Semak output sebenar dulu |

---

## Mandatory Rules

1. **Read before edit** — sentiasa baca fail sebelum ubah, tiada pengecualian
2. **Minimum impact** — fail lain yang tidak disebut = OUT SCOPE
3. **No extra features** — hanya apa yang diminta dalam arahan semasa
4. **Verify evidence** — output sebenar sebagai bukti, bukan assumption
5. **Convention first** — gaya projek mengatasi gaya default DIBA

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `anchor` | Anchor lock scope; code-sharp enforce standard dalam scope itu |
| `orchestrate` | Multi-file task: code-sharp apply pada setiap file dalam subtask |
| `auto-commit` | Selepas verify gate pass → chain ke auto-commit |
| `diba-response` | Response kod: citation `path:line` untuk rujukan fail sedia ada |

---

## Lv.2 — Stack Presets (Abam Stack)

Standard tambahan ikut stack sebenar Abam:

| Stack | Piawaian |
|-------|----------|
| **PHP procedural (eWorks/ruangniaga)** | Ikut pattern fail rujukan sedia ada; `page.php` whitelist WAJIB untuk page baru; section code ≠ display label; `in_house='1'` bila query `cf` table |
| **MySQL** | Prepared statement / escape untuk semua input; JOIN besar → semak index dulu; jangan `SELECT *` dalam laporan |
| **PWA/React** | Component ikut struktur folder sedia ada; state minimum; jangan tambah lib baru tanpa tanya |
| **Supabase** | RLS policy semak sebelum query baru; jangan expose service key ke client |

## Lv.3 — Blast Radius Check

Sebelum edit merentas fail:
- [ ] Grep semua caller/includer fail yang diubah (`grep -rn "nama_fungsi\|nama_fail"`)
- [ ] Projek besar → query `project-map` (reverse dependency) ganti grep buta
- [ ] Senarai terkesan > 3 fail → report blast radius kepada Abam SEBELUM edit
- [ ] Fungsi shared diubah → verify sekurang-kurangnya 1 caller selepas edit

## Lv.4 — Security Pass

Auto-semak pada setiap kod baru yang sentuh input/output:
- [ ] Input user → sanitize/validate sebelum guna (SQL param, escape output HTML)
- [ ] Endpoint/page baru → auth check konsisten dengan pattern projek
- [ ] Tiada credential/API key hardcoded — env var sahaja
- [ ] Upload/file handling → jenis + saiz + path traversal check
- Isu security ditemui dalam kod sedia ada (luar scope) → **report, jangan senyap**, jangan auto-fix tanpa arahan

## Lv.5 — Diff Discipline

- **Satu problem satu diff** — pembetulan berbeza = commit berbeza (chain auto-commit)
- Self-review sebelum present: baca semula diff penuh, tanya "ada baris yang bukan untuk problem ini?"
- Ada baris luar scope → strip sebelum tunjuk
- Diff > 100 baris → ringkaskan approach kepada Abam dulu sebelum full implementation

## Lv.6 — Verify Matrix

Verification ikut jenis perubahan — bukan generic "dah test":

| Jenis | Verify minimum |
|-------|----------------|
| PHP page/laporan | Load page dalam browser/curl; semak error log; test 1 filter |
| SQL query | Run query sebenar; semak row count munasabah; EXPLAIN untuk JOIN besar |
| JS/DOM | Buka console — zero error baru; test interaksi yang diubah |
| PWA | Refresh + offline check jika service worker terlibat |
| API/route | Call sekali dengan input sah + 1 input tak sah |

Selepas verify pass → chain `auto-commit`; kod signifikan → chain `save-diary`.

---

## Level History
- **Lv.1** — Base: pre-code checklist, minimum-impact principle, verify gate, drift table, API contract guard, mandatory rules. (Origin: 2026-06-08 — gap analysis audit skill DIBA)
- **Lv.2** — Stack Presets: piawaian PHP procedural/MySQL/PWA/Supabase ikut projek sebenar Abam. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Blast Radius: caller check wajib sebelum edit merentas fail; chain project-map. (Origin: 2026-07-04)
- **Lv.4** — Security Pass: sanitize/auth/credential check auto pada kod baru; report isu luar scope. (Origin: 2026-07-04)
- **Lv.5** — Diff Discipline: satu problem satu diff, self-review, strip luar scope. (Origin: 2026-07-04)
- **Lv.6** — Verify Matrix: verification spesifik ikut jenis perubahan + chain auto-commit/save-diary. (Origin: 2026-07-04)
