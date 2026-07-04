---
name: project-map
description: "MUST use when a project is too big or scattered to reason about in one prompt —
             build a searchable map (index) of files, symbols, and relationships. Auto-triggers
             on 'graphify', 'map projek', 'project map', 'buat index', 'projek besar',
             'fail berselerak', 'cari kat mana', 'dependency map', 'peta kod', 'macam mana
             modul ni sambung'. Produces a navigable index of modules, exports, and imports
             so DIBA can jump straight to the right file instead of grepping blind."
---

# Project Map — DIBA Codebase Cartographer
*Projek berselerak → peta boleh-cari. Tahu di mana sebelum buka fail.*

## Activation

Bila skill aktif, output: `"Project Map aktif — memetakan struktur & hubungan modul."`

Kemudian laksana Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **"Map projek", "graphify", "buat index", "peta kod"** | ACTIVE — full map |
| **Projek besar/berselerak, satu prompt tak cukup** | ACTIVE — build index dulu |
| **"Cari kat mana X", "modul ni sambung ke mana"** | ACTIVE — query map |
| **"Dependency map", "apa import apa"** | ACTIVE — relationship graph |
| **Projek kecil (< 20 fail)** | DORMANT — grep terus lebih pantas |
| **Map sedia ada & fresh** | REUSE — query map lama, jangan rebuild |

---

## Protocol

### Step 1: Scan Structure
- [ ] Senarai fail (guna `git ls-files`); hormati `.gitignore`
- [ ] Kumpul ikut direktori/modul; kira saiz + jenis
- [ ] Kenal pasti entry points & config

### Step 2: Extract Symbols
- [ ] Per fail, ekstrak simbol awam: `export`/`def`/`class`/`function`/`interface`/route
- [ ] Guna grep bertarget (bukan baca penuh setiap fail) untuk kecekapan
- [ ] Catat: nama simbol · jenis · fail · baris

### Step 3: Map Relationships
- [ ] Ekstrak `import`/`require`/`from ... import` per fail
- [ ] Bina graf: modul → bergantung pada → modul
- [ ] Tanda: entry points, hub (banyak masuk), leaf (banyak keluar), orphan (tiada ref)

### Step 4: Write Index
- [ ] Tulis ke `memories/maps/project-map-[nama].md`:

```markdown
# Project Map — [nama] · [tarikh]

## Overview
- Modul: [N] · Fail: [N] · Simbol awam: [N]
- Entry: [entry points]
- Hub files (paling banyak diimport): [senarai]

## Modules
### [modul/folder]
- **path/to/file** — [peranan ringkas]
  - exports: `symbolA`, `symbolB`
  - imports: `./x`, `pkg/y`

## Dependency Graph
[modul A] → [modul B, C]
[modul B] → [modul D]

## Search Index
| Simbol | Jenis | Fail | Baris |
|--------|-------|------|-------|
| `foo`  | func  | src/a.ts | 12 |
```

### Step 5: Query Mode
Bila Abam tanya "di mana X" / "apa guna Y":
- [ ] Baca `Search Index` dari map (bukan re-scan repo)
- [ ] Pulangkan `path:line` tepat + modul + siapa import
- [ ] Jika tiada dalam map → grep bertarget, kemudian update map

### Step 6: Confirm
- [ ] Report 3 baris: lokasi map, liputan (N fail/simbol), hub teratas
- [ ] Cadang: query terus atau chain repo-pack untuk hand-off

---

## Mandatory Rules

1. **Grep bertarget, bukan baca penuh** — ekstrak simbol tanpa membaca setiap fail penuh (jimat token)
2. **Map ialah cache** — query map dulu; re-scan hanya bila stale/miss
3. **Output ke `memories/maps/`** — jangan kotor root projek
4. **Hormati `.gitignore`** — jangan map deps/build
5. **Kecil → dormant** — < 20 fail, grep terus; jangan over-index
6. **`path:line` sentiasa** — setiap jawapan query mesti boleh-klik
7. **Tanda stale** — catat tarikh; jika kod berubah banyak, cadang rebuild

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Bahasa campuran (TS+Py+Go) | Ekstrak simbol per-bahasa; label jenis dalam index |
| Repo sangat besar (> 5k fail) | Map ikut modul yang diminta dahulu; jangan buta seluruh |
| Import dinamik / lazy | Tanda "dynamic" — graf mungkin tak lengkap; nota kepada Abam |
| Map lapuk | Flag tarikh; rebuild modul yang berubah sahaja |
| Circular dependency dikesan | Tanda dalam graf: "⟲ cycle: A→B→A" |
| Simbol duplikat merentas fail | Senarai semua lokasi; jangan andai satu |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `repo-pack` | Hand-off penuh | Map = mode map-only; pack guna index untuk pilih fail teras |
| `token-guard` | Projek besar risiko overflow | Query map ganti baca banyak fail — jimat context |
| `orchestrate` | Task multi-fail kompleks | Map beri peta untuk agih subtask ikut modul |
| `code-sharp` | Sebelum edit merentas modul | Map tunjuk siapa akan terkesan (blast radius) |
| `manage-project` | Sebahagian workflow projek | Simpan pointer map dalam project file |

---

## Lv.2 — Incremental Update

- Map lama + kod berubah → JANGAN rebuild penuh: `git diff --name-only [tarikh-map]..HEAD` → re-scan fail berubah sahaja
- Update entri terlibat dalam index; kekalkan yang lain
- Rekod dalam map: `Updated: [tarikh] (incremental, N fail)`

## Lv.3 — PHP/Legacy Support (Abam Stack)

Simbol extraction untuk stack sebenar Abam, bukan hanya moden:
- **PHP procedural**: `function`, `include`/`require` graph, form `action=` target, `$_GET`/`$_POST` params per page
- **SQL dalam PHP**: table yang di-query per fail → jadual "fail ↔ table" (crucial untuk eWorks/ruangniaga)
- **Page routing**: pattern `page.php` whitelist → map page → group access
- Map projek PHP tunjuk: fail → tables → pages yang link ke sini

## Lv.4 — Blast Radius Query

Query mode baru: "kalau ubah X, apa pecah?"
- Reverse dependency: siapa import/include/call X → senarai penuh dengan `path:line`
- Untuk table SQL: fail mana query table ini
- Output ranked: direct caller dulu, transitive kemudian (max 2 hop)
- Chain dari `code-sharp` Lv.3 sebelum edit merentas modul

## Lv.5 — Hotspot Analytics

Tambah seksyen dalam map:
- **Churn**: `git log --format="" --name-only --since="90 days"` → fail paling kerap berubah
- **Hotspot** = churn tinggi × saiz besar × hub (banyak diimport) → risiko tertinggi
- Jadual top-10 hotspot dengan sebab — panduan "mana patut hati-hati / mana patut refactor dulu"

## Lv.6 — Session Auto-Refresh Gate

- Session start dalam projek yang ada map → auto staleness check (1 saat): map date vs last commit date
- Stale > 20 fail berubah → tawar incremental update SEBELUM kerja mula (bukan selepas tersesat)
- Chain: map segar → `repo-pack` guna index untuk pilih fail teras; `orchestrate` guna untuk agih subtask; `code-sharp` guna untuk blast radius

---

## Level History

- **Lv.1** — Base: scan structure, extract symbols (grep bertarget), relationship graph, index ke `memories/maps/`, query mode dengan `path:line`, stale detection. (Origin: 2026-07-03 — isi jurang "Graphify")
- **Lv.2** — Incremental Update: re-scan fail berubah sahaja via git diff. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — PHP/Legacy Support: include graph, fail↔table SQL map, page.php routing map. (Origin: 2026-07-04)
- **Lv.4** — Blast Radius Query: reverse dependency "kalau ubah X apa pecah". (Origin: 2026-07-04)
- **Lv.5** — Hotspot Analytics: churn × saiz × hub = risiko. (Origin: 2026-07-04)
- **Lv.6** — Auto-Refresh Gate: staleness check di session start + chain repo-pack/orchestrate/code-sharp. (Origin: 2026-07-04)

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
