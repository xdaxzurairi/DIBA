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

## Level History
- **Lv.1** — Base: pre-code checklist, minimum-impact principle, verify gate, drift table, API contract guard, mandatory rules. (Origin: 2026-06-08 — gap analysis audit skill DIBA; code-sharp dirujuk dalam anchor + diba-response + CLAUDE.md tapi tiada SKILL.md)
