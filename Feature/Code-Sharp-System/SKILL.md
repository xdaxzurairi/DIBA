---
name: code-sharp
description: "Piawaian janaan kod DIBA — laju, bersih, konsisten, tepat. Auto-trigger
             sebelum menulis atau mengedit sebarang kod. Trigger manual dengan 'code-sharp',
             'sharp', atau 'ikut standard'."
---

# Code-Sharp — Piawaian Janaan Kod DIBA
*Scan. Tulis. Hantar. Tiada lebih.*

## Activation

When this skill activates, output:
"Code-Sharp aktif. Scan → Tulis → Hantar."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Sebelum menulis atau mengedit sebarang fail kod** | ACTIVE — auto-trigger |
| **Abam kata "code-sharp", "sharp", "ikut standard"** | ACTIVE — manual trigger |
| **Auto-Worker dispatch code task** | ACTIVE — inherit standard ini |
| **Security-Audit remediation sedang berjalan** | ACTIVE — fixes ikut standard ini |
| **Selepas setiap task kod selesai** | ACTIVE (Lv.4) — auto-run Refine Gate sebelum declare done |
| **Abam tanya soalan konsep tanpa minta kod** | DORMANT — jangan generate code |
| **Membaca atau menganalisis kod sahaja** | DORMANT — hanya scan, tidak tulis |

---

## Protocol

### Step 1: Scan (Bila Edit Fail Sedia Ada)

- [ ] Baca fail target — extract style pattern:
  - Indentasi: tab atau space? Berapa banyak?
  - Quote style: single `'` atau double `"`?
  - Naming convention: camelCase / snake_case / PascalCase?
  - Function style: `function foo()` atau arrow `const foo = () =>`?
  - Error handling: try-catch, return false, atau die()?
  - Block structure: brace pada baris sama atau baris baru?
- [ ] Detect stack dari file extension:

  | Extension | Scan Tambahan |
  |-----------|--------------|
  | `.php` | `include` vs `require`, PDO vs mysqli, `$_POST` sanitization pattern |
  | `.js` | `var`/`let`/`const` preference, async pattern (promise/await), event listener style |
  | `.sql` / queries dalam `.php` | COLLATE convention, named params vs `?`, TOP vs LIMIT |
  | `.css` / `.html` | Tailwind class order convention, inline style vs class |

- [ ] Scan adalah senyap — hanya adjust output jika inconsistency dijumpai
- [ ] Jika fail baru (tiada fail sedia ada) → ikut language/framework standard

---

### Step 2: Tulis

- [ ] Apply 4 prinsip utama:
  - **FAST** — terus ke kod, jelaskan hanya jika perlu
  - **CLEAN** — tulis hanya apa yang diminta, tiada bonus feature
  - **CONSISTENT** — padan dengan style fail sedia ada
  - **PRECISE** — ubah hanya apa yang diminta
- [ ] Gunakan edit scope sekecil mungkin — bukan full block rewrite
- [ ] Jika jumpa isu lain — **report**, jangan auto-fix tanpa izin

---

### Step 3: Pre-Send Check

Sebelum hantar, verify semua:

- [ ] Kod padan dengan style fail semasa?
- [ ] Tiada baris tidak berkaitan yang diubah?
- [ ] Tiada import/variable/function yang tidak digunakan?
- [ ] Tiada debug artifact tertinggal (console.log, var_dump, dsb.)?
- [ ] Logic betul — bukan sekadar nampak betul?
- [ ] Edge case kritikal dikendalikan?

Jika mana-mana gagal → betul dahulu, baru hantar.

---

### Step 4: Hantar

- [ ] Kod dalam code block dengan language tag yang betul (` ```php `, ` ```js `, dsb.)
- [ ] Untuk edit separa: tunjuk 2–3 baris context sebelum dan selepas
- [ ] Untuk multiple fail: senarai `Fail 1 → Fail 2` — jangan dump semua serentak
- [ ] Penjelasan: **selepas** kod, bukan sebelum — dan hanya jika perlu

---

### Step 5: Report Isu Sampingan (jika ada)

- [ ] Jika jumpa isu lain semasa scan/tulis → senaraikan secara berasingan:
  ```
  Nota: Jumpa [isu] di [lokasi]. Tidak diubah — nak saya address?
  ```
- [ ] Jangan auto-fix tanpa izin Abam
- [ ] Jangan tambah refactor, comment, atau type annotation pada kod yang tidak diubah

---

### Step 6: Auto-Refine Gate (Lv.4)

Selepas setiap task kod selesai — **sebelum declare done** — auto-scan semua fail yang disentuh:

**Debug Artifact Scan:**
- [ ] `console.log`, `console.error`, `console.warn` (JS/TS)
- [ ] `var_dump`, `print_r`, `dd()`, `dump()` (PHP)
- [ ] `print`, `pprint`, `breakpoint()` (Python)
- [ ] `debugger`, `// TODO`, `// FIXME`, `// HACK` yang belum resolved

**Code Hygiene Scan:**
- [ ] Unused variables atau imports yang baru ditambah dalam task ini?
- [ ] Obvious logic error — off-by-one, wrong comparator, null risk tanpa check?
- [ ] Edge case kritikal yang tidak dikendalikan dalam kod yang ditulis?
- [ ] Hardcoded value yang patut jadi config/constant?

**Gate Decision:**
- [ ] **Passed** → teruskan, report senyap: "Code gate ✓"
- [ ] **Flagged** → halang declare done, report dulu:
  ```
  Gate flagged [N] isu sebelum selesai:
  · [fail:baris] — [isu]
  · [fail:baris] — [isu]
  Fix atau skip?
  ```
- [ ] Jangan pernah declare task selesai sehingga Gate passed atau Abam explicitly skip

## Decision Hierarchy

```
1. Arahan eksplisit Abam
2. Pattern sedia ada dalam fail
3. Standard bahasa/framework
4. Penilaian DIBA sendiri (last resort)
```

Konflik antara (2) dan (3) → ikut (2). Konsistensi dalam projek mengatasi best practice luaran.

---

## Mandatory Rules

1. **Scan dahulu** — jangan tulis tanpa baca fail sedia ada jika ia wujud
2. **Edit scope minimum** — gunakan `old_string → new_string` terkecil yang boleh selesaikan masalah
3. **Tiada bonus feature** — tulis hanya apa yang diminta, tiada lebih
4. **Report, jangan auto-fix** — isu lain yang dijumpai dilaporkan, bukan dibaiki secara diam
5. **Code block wajib** — semua output kod mesti dalam code block dengan language tag
6. **Penjelasan selepas kod** — bukan sebelum, dan hanya jika benar-benar perlu
7. **Tiada debug artifact** — console.log, var_dump, print_r, dsb. mesti dibersihkan sebelum hantar
8. **Ikut hierarchy** — arahan Abam > pattern fail > standard bahasa > AI judgment

---

## Anti-Patterns

| Anti-Pattern | Contoh | Akibat |
|---|---|---|
| Over-engineer | Bina class untuk sesuatu yang 3 baris boleh selesai | Code bloat, maintenance burden |
| Speculative code | `// for future use...` | Dead weight, confusion |
| Defensive nonsense | Validate input yang mustahil null dalam internal flow | Noise, false safety |
| Copy-paste tanpa adapt | Variable name lama tertinggal dalam kod baru | Runtime bug |
| Silent assumption | Assume format input tanpa semak atau tanya | Silent data corruption |
| Rename creep | Tukar nama function/variable yang tidak diminta | Breaking changes |
| Style mismatch | Introduce 2-space indent dalam fail yang guna tab | Inconsistency drift |
| Comment noise | `// this sets the variable` pada `$x = 5;` | Zero-value comment |

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Fail sedia ada tiada style yang jelas | Ikut language standard default; nyatakan assumption |
| Dua style berbeza dalam satu fail | Ikut majority — jangan mix lebih jauh |
| Abam minta refactor tapi juga ada bug fix | Tanya — buat satu atau dua task berasingan? |
| Extension tidak dikenali | Baca fail untuk detect pattern; tanya jika masih kabur |
| Fail baru dalam projek sedia ada | Scan fail lain dalam folder yang sama untuk infer style |
| Kod dari paste external dengan style berbeza | Adapt kepada style projek semasa |
| Security fix memerlukan perubahan API | Escalate ke Abam — ini bukan low-risk fix |
| Bug fix memerlukan ubah > 1 fungsi | Declare semua fungsi yang akan diubah dulu, minta konfirm |
| Test fail selepas kod ditulis | Report kepada Abam dengan detail — jangan assume akan fix sendiri |
| Auto-Worker hantar task tanpa context fail | Request fail path atau context sebelum proceed |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `auto-worker` | Bila worker dispatch code task | Semua edit ikut standard code-sharp secara automatic |
| `security-audit-remediation` | Semasa remediation security fix | Semua patch mesti lulus pre-send checklist code-sharp |
| `discipline` | Bila drift pattern dikesan (scope creep, unverified fix) | Rujuk Law 3 (one thing) dan Law 4 (verify) |
| `anchor` | Bila scope edit mula merebak ke fail luar skop | Halt — re-anchor scope sebelum teruskan |
| `continuous-improvement` | Selepas sesi kod yang panjang | Reflect pattern kod yang berulang untuk jadi instinct |
| `verification-before-completion` | Sebelum declare task kod selesai | Run pre-send checklist sebagai verification gate |

---

## Level History

- **Lv.1** — Base: 4 prinsip (FAST, CLEAN, CONSISTENT, PRECISE), 6-item pre-send checklist, anti-pattern table, output format rules, decision hierarchy. (Origin: DIBA production code generation standard, xdaxzurairi)
- **Lv.2** — Stack-Aware Scan: auto-detect file extension dan tailor scan kepada PHP/JS/SQL/CSS specific patterns — semak conventions tambahan secara senyap tanpa perlu arahan eksplisit. (Origin: PHP+MSSQL+JS project stack, 2026-04-28)
- **Lv.3** — Superultra: Step 5 Report Isu Sampingan ditambah, Context Guard dikemaskini, anti-patterns dikembangkan dengan 8 rows, edge cases 10 rows, integrasi skill 6 entries, Mandatory Rules 8 items, Decision Hierarchy diperjelas, activation message distandard. (2026-05-19)
- **Lv.4** — SuperUltraLord: Auto-Refine Gate — selepas SETIAP task kod, auto-scan semua fail yang disentuh untuk debug artifacts, unused vars, logic errors, dan edge cases sebelum declare done. Gate wajib passed atau Abam skip sebelum task boleh ditandakan selesai. Multi-language artifact detection: JS/TS/PHP/Python. (2026-05-29)
