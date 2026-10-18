---
name: cad-dwg-dxf
description: "Gunakan bila Abam kerja dengan fail AutoCAD (DWG/DXF) — baca/tulis
             layer, block, polyline ruang, unit/skala, convert floor plan CAD
             jadi data (koordinat/polygon) untuk app web. Triggers: 'autocad',
             'dwg', 'dxf', 'floor plan import', 'convert cad to data', 'baca
             fail cad', 'extract floor plan'."
---

# CAD DWG/DXF — AutoCAD File Handling
*Floor plan CAD bukan destinasi akhir — ia input untuk data app. Extract geometry, buang noise.*

## Activation

Bila skill ini aktif, output:

`📐 CAD Handler — [scope: parse / extract / convert]`

Kemudian rujuk protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam bagi fail .dwg/.dxf untuk diproses** | ACTIVE — penuh protokol |
| **Perlu convert floor plan jadi data (room polygon, koordinat)** | ACTIVE — extract geometry |
| **Perlu jana/export fail DWG/DXF dari data app** | ACTIVE — generate workflow |
| **Kerja tak sentuh fail CAD** | DORMANT |

## Format Reality Check

| Format | Sifat | Library/Pendekatan |
|--------|-------|---------------------|
| **DXF** | Text/binary, format TERBUKA Autodesk, boleh baca/tulis terus | Python `ezdxf` — paling matang, baca+tulis+entities+blocks |
| **DWG** | Binary, format TERTUTUP/proprietary Autodesk | **Tiada library open-source penuh boleh baca DWG terus dengan confident.** Pendekatan: (a) convert DWG→DXF dulu guna ODA File Converter (percuma, Autodesk-sanctioned) atau LibreDWG (kurang stabil untuk versi baru), (b) atau minta client export terus sebagai DXF dari AutoCAD |

**Rule paling penting**: kalau Abam bagi .dwg, langkah PERTAMA bukan "cari library baca DWG" — ia "convert ke DXF dulu" (ODA File Converter), kemudian proses macam DXF biasa. Jangan cuba reka parser DWG binary sendiri.

## Protocol

### Step 1: Identify Format & Convert
- [ ] Semak extension: `.dxf` → terus proses; `.dwg` → convert dulu (ODA File Converter CLI, atau nyatakan Abam perlu export DXF dari AutoCAD)
- [ ] Semak versi DXF (AC1009 lama hingga AC1032/2026) — `ezdxf` support kebanyakan versi moden

### Step 2: Parse Structure
- [ ] Baca layers — floor plan biasanya pisah layer ikut jenis (`A-WALL`, `A-DOOR`, `A-ROOM`, dll — konvensyen AIA layer naming jika projek US/professional, tapi SENTIASA semak layer list sebenar, jangan andaikan nama)
- [ ] Baca entities relevan: `LWPOLYLINE`/`POLYLINE` (dinding/ruang), `INSERT` (block — furniture/symbol), `TEXT`/`MTEXT` (label ruang)
- [ ] Baca unit/skala dari header (`$INSUNITS`) — JANGAN andaikan meter, boleh jadi mm/inch/feet

### Step 3: Extract Room Geometry
- [ ] Cari closed polyline yang represent sempadan ruang (area > 0, closed flag TRUE)
- [ ] Padan label TEXT/MTEXT terdekat dengan polyline (nama ruang) — guna jarak terdekat, bukan tekaan
- [ ] Kira area polygon (shoelace formula) dalam unit asal, convert ke m² untuk simpan
- [ ] Output struktur: `{room_name, polygon: [[x,y],...], area_m2, layer_source}`

### Step 4: Map ke App Data
- [ ] Chain `facility-architecture` untuk map room geometry ke Space data model
- [ ] Simpan `floor_plan_ref` (fail asal + room id) supaya boleh trace balik ke CAD asal

### Step 5: Confirm
- [ ] Laporkan: bilangan room dikesan, unit yang digunakan, mana-mana polyline tak closed/tak dapat label (flag untuk semakan manual — jangan skip senyap)

## Mandatory Rules

1. **DWG → DXF dulu, jangan parse DWG binary terus** — tiada library boleh dipercayai sepenuhnya untuk ni
2. **Jangan andaikan unit** — baca `$INSUNITS` dari header DXF setiap kali, fail lain unit lain
3. **Jangan andaikan layer naming convention** — semak list layer sebenar fail tu dulu
4. **Polyline tak closed = flag, bukan skip senyap** — ruang yang tak lengkap sempadan perlu semakan manual Abam
5. **Simpan rujukan ke fail CAD asal** — supaya boleh audit/trace balik bila data app nampak pelik

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Fail DWG versi sangat lama/baru, ODA tak convert dengan baik | Minta Abam export terus DXF dari AutoCAD/BricsCAD, jangan paksa convert |
| Room guna multiple polyline (bukan satu closed shape) | Flag sebagai kompleks, semak manual — jangan auto-union tanpa pengesahan |
| Tiada label TEXT untuk sesuatu ruang | Guna ID sementara (`ROOM_<n>`), minta Abam label, jangan reka nama |
| Fail CAD scope luar floor plan (contoh: detail construction, MEP) | Nyatakan skop di luar `facility-architecture`, proses geometri sahaja jika diminta |

## Level History
- **Lv.1** — Base: format reality check (DXF boleh, DWG kena convert dulu), parse layer/entity/unit, extract room polygon + area, chain ke `facility-architecture` untuk data mapping. (Origin: 2026-10-18 — projek IWMS macam Archibus, arahan Abam)
