---
name: repo-pack
description: "MUST use when DIBA needs to understand a whole project/folder before editing,
             or when the user wants to hand the whole codebase to an AI in one file.
             Auto-triggers on 'pack repo', 'repomix', 'satukan projek', 'bundle codebase',
             'export project context', 'gabung fail', 'faham projek dulu', 'context pack',
             'buat satu fail untuk AI'. Produces one AI-friendly snapshot of the repo with
             a tree, key files, and token estimate — respecting .gitignore and secrets."
---

# Repo Pack — DIBA Project Context Bundler
*Satu projek → satu fail yang AI boleh telan. Faham dulu, edit kemudian.*

## Activation

Bila skill aktif, output: `"Repo Pack aktif — bundling projek jadi context tunggal."`

Kemudian laksana Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **"Pack repo", "repomix", "satukan projek", "bundle codebase"** | ACTIVE — full pack |
| **DIBA perlu faham projek asing sebelum edit** | ACTIVE — pack ringkas dulu |
| **"Export context", "buat satu fail untuk AI"** | ACTIVE — tulis fail output |
| **Hand-off ke AI/tool luar** | ACTIVE — pack + token estimate |
| **Edit satu fail yang sudah diketahui** | DORMANT — tak perlu pack |
| **Repo besar > 5k fail** | SCOPED — pack subfolder/relevan sahaja |

---

## Protocol

### Step 1: Scope
- [ ] Tentukan root (default: cwd) atau subfolder yang diminta
- [ ] Hormati `.gitignore` — jangan pack `node_modules`, `.git`, build, `dist`, `venv`
- [ ] Skip binari & fail besar: imej, video, `.zip`, `.lock` (kecuali diminta)
- [ ] Skip fail > 500KB melainkan Abam kata include

### Step 2: Structure Map
- [ ] Jana pokok direktori (guna `git ls-files` atau `find` tapis)
- [ ] Kira: jumlah fail, jumlah baris, jenis fail teratas
- [ ] Kenal pasti fail teras: `README`, `package.json`/`pyproject`, config, entry point

### Step 3: Secret Scan (WAJIB sebelum tulis)
- [ ] Imbas untuk rahsia: API key, token, `.env` values, private key, password
- [ ] **Redact** semua rahsia dengan `[REDACTED]` — jangan pernah pack plaintext
- [ ] Skip `.env`, `*.pem`, `*.key`, `credentials*` secara default

### Step 4: Pack
- [ ] Tulis output ke `memories/packs/repo-pack-[nama]-[YYYYMMDD].md`
- [ ] Struktur output:

```markdown
# Repo Pack — [nama projek] · [tarikh]

## Summary
- Fail: [N] · Baris: [N] · Est token: ~[N]
- Stack: [dikesan dari manifest]
- Entry: [entry point]

## Directory Tree
[pokok direktori tertapis]

## Key Files
### path/to/file
```[lang]
[kandungan — atau ringkasan jika besar]
```
...
```

### Step 5: Token Estimate
- [ ] Anggar token (~1 token / 4 aksara, atau ~0.75 token/word)
- [ ] Jika > 100k token: cadang mode ringkas (Step 6) atau split
- [ ] Report saiz kepada Abam

### Step 6: Compression Modes (bila besar)
| Mode | Isi |
|------|-----|
| **full** | Semua fail teks penuh |
| **summary** | Tree + fail teras penuh + selebihnya signature/ringkasan |
| **map-only** | Tree + interface/export/function signature sahaja (chain project-map) |

### Step 7: Confirm
- [ ] Report 3 baris: lokasi pack, saiz + token, mode digunakan
- [ ] Cadang next: "faham" (baca pack) atau hand-off

---

## Mandatory Rules

1. **Secret scan wajib** — redact API key/token/password/`.env` sebelum tulis; tiada rahsia dalam pack
2. **Hormati `.gitignore`** — jangan pack artifak build, deps, `.git`
3. **Token estimate wajib** — sentiasa report saiz sebelum hand-off
4. **Skip binari** — imej/video/lock kecuali diminta eksplisit
5. **Output ke `memories/packs/`** — bukan root projek; jangan kotor repo
6. **Besar → cadang mode ringkas** — jangan pack buta 500k token
7. **Deterministik** — susunan fail konsisten (ikut tree) untuk diff mudah

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Repo tiada `.gitignore` | Guna senarai skip lalai (node_modules, .git, dist, venv, __pycache__) |
| Fail besar tunggal (data/CSV) | Pack header + 20 baris sampel + nota saiz penuh |
| Monorepo | Tanya Abam pilih package/subfolder; jangan pack semua buta |
| Rahsia dikesan | Redact + flag: "[N] rahsia di-redact" — jangan pernah bocor |
| Repo binari-berat (assets) | Map-only mode; senarai binari tanpa isi |
| Abam nak clipboard/hand-off segera | Tulis fail + beri path; sedia untuk salin |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `project-map` | Repo besar/berselerak | Pack chain map-only untuk carian sebelum full pack |
| `security-audit` | Sebelum hand-off luar | Secret scan lebih dalam sebelum export |
| `token-guard` | Pack besar risiko overflow | Cadang summary mode + checkpoint |
| `manage-project` | Pack sebahagian workflow projek | Simpan pointer pack dalam project file |
| `library` | Pack berguna semula | Simpan template/config ke library |

---

## Level History

- **Lv.1** — Base: scope + .gitignore respect, structure map, secret-scan redaction, pack ke `memories/packs/`, token estimate, 3 compression modes. (Origin: 2026-07-03 — isi jurang "Repomix" dari infografik "10 GitHub repos that make Claude supercharged")

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
