---
name: changelog-generator
description: "MUST use when Abam minta 'buat changelog', 'generate release notes',
             'apa yang berubah sejak version lepas', atau selepas siap satu batch
             commit yang perlu direkod untuk release."
---

# Changelog Generator — Commit → Release Notes
*Rekod perubahan yang boleh dibaca manusia, bukan senarai commit mentah.*

## Activation

Bila skill ini aktif, output:

`📝 Changelog — [range: dari...hingga]`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta changelog/release notes** | ACTIVE — penuh protokol |
| **Selepas batch commit besar sebelum tag/release** | ACTIVE — tawar generate |
| **Commit tunggal kecil (typo fix dll)** | DORMANT |

## Protocol

### Step 1: Kumpul Commit
- [ ] `git log` untuk range yang relevan (sejak tag lepas / tarikh yang dinyatakan)
- [ ] Parse mesej commit ikut Conventional Commits jika digunakan (`feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`) — kalau tak ikut convention, kelaskan ikut kandungan diff/mesej

### Step 2: Tentukan Semver Bump
- [ ] Ada `BREAKING CHANGE` / breaking API → **major**
- [ ] Ada `feat:` tanpa breaking → **minor**
- [ ] Hanya `fix:`/`chore:`/`docs:` → **patch**

### Step 3: Render (Keep a Changelog style)
- [ ] Susun bawah heading: `### Added` / `### Changed` / `### Fixed` / `### Removed`
- [ ] Setiap entry: satu baris, bahasa manusia (bukan "fix bug in auth.js" — tulis "Fixed session token tidak refresh selepas logout")

### Step 4: Hotfix (jika berkaitan)
- [ ] Kalau ini hotfix release, label severity: **P0** (SLA ≤2 jam, production down), **P1** (SLA ≤24 jam, major feature rosak), **P2** (next cycle, minor)
- [ ] Nyatakan rollback trigger jika ada (contoh: error rate naik >X% selepas deploy → rollback)

### Step 5: Confirm
- [ ] Papar draf changelog, minta Abam sahkan sebelum append ke `CHANGELOG.md`

## Mandatory Rules

1. **Bahasa manusia, bukan commit mentah** — setiap entry diterjemah untuk pembaca, bukan copy-paste git log
2. **Tiada auto-append tanpa confirm** — Abam sahkan draf dulu sebelum ditulis ke fail
3. **Breaking changes wajib highlight** — jangan sorok dalam senarai biasa

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Commit mesej tak jelas/tak descriptive** | Semak diff sebenar untuk faham perubahan, jangan reka penerangan |
| **Tiada CHANGELOG.md sedia ada** | Cadang mula fail baru format Keep a Changelog |
| **Range commit merentas berbulan tanpa tag** | Cadang Abam tentukan version number sebelum generate |

## Level History
- **Lv.1** — Base: Conventional Commits parsing, semver bump detection, Keep-a-Changelog render, hotfix severity/SLA + rollback trigger. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/skills/changelog-generator`, dipermudah ke protokol reasoning terus atas git log sebenar)
