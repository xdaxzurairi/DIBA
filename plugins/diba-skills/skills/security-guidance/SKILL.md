---
name: security-guidance
description: "MUST use before menulis atau mengedit sebarang kod (auto, senyap) —
             semak corak insecure sebelum Edit/Write/MultiEdit disahkan. Auto-trigger
             tanpa Abam perlu minta. Juga aktif bila Abam sebut 'security check',
             'selamat ke code ni', 'ada vulnerability tak', atau 'audit security'."
---

# Security Guidance — Pre-Write Anti-Pattern Guard
*Tangkap corak insecure sebelum ia sampai ke fail, bukan lepas commit.*

## Activation

Bila skill ini aktif (auto sebelum Edit/Write kod), jalankan semakan senyap dahulu.

Jika corak berisiko dikesan: `⚠️ Security flag: [corak] — [kenapa risiko] — [alternatif selamat]`
Jika bersih: teruskan tanpa output tambahan (jangan spam confirmation kosong).

## Context Guard

| Context | Status |
|---------|--------|
| **Sebelum Edit/Write/MultiEdit pada kod (bukan markdown/memory file)** | ACTIVE — semak senyap |
| **Abam minta security audit eksplisit** | ACTIVE — semak menyeluruh + laporan |
| **Menulis dokumentasi/memory/diary** | DORMANT |
| **Kod sudah pernah disemak dalam sesi ini tanpa perubahan** | DORMANT — elak spam berulang, guna cache sesi |

## Protocol

### Step 1: Scan Corak Berisiko
- [ ] Command injection — `exec()`/`os.system()`/shell string concat dengan input user
- [ ] Code injection — `eval()`, `exec()` pada input tak dipercayai
- [ ] XSS — `innerHTML`/`dangerouslySetInnerHTML` dengan data user tanpa sanitize
- [ ] SQL injection — query string dibina guna f-string/concat, bukan parameterized query
- [ ] Deserialization tak selamat — `pickle.load`, `yaml.unsafe_load` pada input luar
- [ ] Rahsia hardcoded — API key/password/token ditulis terus dalam kod
- [ ] CI/CD injection — GitHub Actions workflow guna `${{ }}` input tak dipercayai terus dalam `run:` shell

### Step 2: Flag & Cadang
- [ ] Kalau jumpa: nyatakan corak, kenapa risiko (satu ayat), dan alternatif selamat konkrit
- [ ] Jangan block kerja — beri cadangan, Abam yang putuskan sama ada proceed

### Step 3: Session Cache
- [ ] Simpan senarai corak yang dah pernah di-flag dalam fail/sesi ini — elak ulang amaran sama berulang kali

## Mandatory Rules

1. **Senyap bila bersih** — tiada noise "kod ini selamat" pada setiap edit, hanya bunyi bila ada isu
2. **Cadangan, bukan block** — DIBA nasihat, Abam putuskan; tiada auto-reject edit
3. **Elak amaran berulang** — corak sama dalam fail sama dalam satu sesi, cukup flag sekali

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Kod pihak ketiga/library (bukan tulisan Abam)** | Semak tetap jalan tapi label "third-party — nilai risiko integrasi, bukan tulisan sendiri" |
| **False positive (pattern nampak risiko tapi context selamat)** | Nyatakan kenapa DIBA anggap risiko, biar Abam confirm konteks selamat |
| **Rahsia hardcoded dikesan** | Flag tinggi keutamaan — cadang pindah ke `.env` / secret store, rujuk `env-secrets-manager` |

## Level History
- **Lv.1** — Base: 7 corak anti-pattern (command injection, eval, innerHTML, SQL f-string, pickle/yaml unsafe, hardcoded secrets, CI/CD injection), session-cache elak spam. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/security-guidance`, asal PreToolUse hook Python; disesuaikan jadi semakan reasoning senyap sebelum Edit/Write kerana DIBA tiada hook-execution layer sendiri)
