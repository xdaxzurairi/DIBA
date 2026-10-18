---
name: facility-architecture
description: "Gunakan bila Abam kerja projek space/facility management (IWMS) macam
             Archibus — space planning, room/floor/building hierarchy, space
             classification, occupancy/allocation ratio, asset & lease management
             data model. Triggers: 'space planning', 'facility management', 'room
             allocation', 'floor plan data', 'macam archibus', 'IWMS', 'space
             inventory', 'occupancy report'."
---

# Facility Architecture — Space & Facility Management Domain
*Domain knowledge untuk bina sistem macam Archibus — bukan sekadar CRUD, tapi model data yang betul ikut konvensyen industri IWMS.*

## Activation

Bila skill ini aktif, output:

`🏢 Facility Architecture — [scope: data model / space calc / report]`

Kemudian rujuk protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam sebut "space planning", "room allocation", "macam archibus"** | ACTIVE — penuh protokol |
| **Reka data model untuk floor/room/space/asset** | ACTIVE — guna hierarki standard |
| **Kira occupancy/utilization/space ratio** | ACTIVE — guna formula standard |
| **Kerja tak sentuh domain facility/space** | DORMANT |

## Domain Model (Hierarki Standard)

```
Portfolio → Site → Building → Floor → Space (Room) → Asset
```

- **Site**: lokasi fizikal (alamat, koordinat)
- **Building**: struktur dalam site (boleh multi-building per site)
- **Floor**: tingkat dalam building (gross floor area per tingkat)
- **Space/Room**: unit terkecil boleh-alokasi — ada `space_type`, `area`, `capacity`, `occupant`
- **Asset**: peralatan/furniture dalam space (boleh berkait ke work order/maintenance)

## Space Classification (BOMA-style)

| Kategori | Takrif | Formula |
|----------|--------|---------|
| **Gross Area (GA)** | Keseluruhan luas bangunan, termasuk dinding luar | Ukur dari permukaan luar |
| **Rentable Area (RA)** | Boleh disewa/dialokasi kepada penghuni | GA − common area (lift, tangga, toilet awam) |
| **Usable Area (UA)** | Luas sebenar boleh guna oleh penghuni | RA − internal common area (koridor dalam unit) |
| **Common Area Factor** | Nisbah common area kepada rentable | (RA − UA) / RA |

## Protocol

### Step 1: Gather Requirements
- [ ] Kenal pasti skop: space inventory sahaja, atau + asset + lease + maintenance?
- [ ] Tentukan unit ukuran (m² ikut Malaysia, bukan sq ft melainkan client minta)
- [ ] Semak kalau ada floor plan sedia ada (chain `cad-dwg-dxf` jika DWG/DXF)

### Step 2: Design Data Model
- [ ] Guna hierarki Portfolio→Site→Building→Floor→Space→Asset sebagai asas
- [ ] Setiap Space wajib ada: `space_type` (office/meeting/storage/common/vacant), `area_m2`, `capacity`, `department_id`/`occupant_id`
- [ ] Space type enum minimum: Office, Meeting Room, Workstation, Storage, Common Area, Circulation, Vacant
- [ ] Simpan `floor_plan_ref` (link ke polygon/koordinat dari `cad-dwg-dxf` kalau ada)

### Step 3: Occupancy & Utilization Calc
- [ ] Occupancy rate = occupied space / total allocatable space
- [ ] Utilization rate = actual headcount / capacity
- [ ] Space per person = total usable area / total headcount
- [ ] Flag space kosong 30+ hari sebagai "under-utilized" candidate untuk reallocation

### Step 4: Confirm
- [ ] Laporkan model/kiraan + rujuk mana-mana andaian (unit, formula) yang dibuat
- [ ] Kalau data floor plan tak lengkap — nyatakan apa yang hilang, jangan andaikan nombor

## Mandatory Rules

1. **Unit konsisten** — m² sepanjang sistem, convert sekali di boundary jika client bagi sq ft
2. **Space hierarki tak boleh skip level** — Room mesti ada Floor, Floor mesti ada Building (integrity constraint)
3. **Jangan reka nombor area/capacity** — kalau tiada dalam floor plan/data, tandai "unknown", jangan anggar tanpa sebut
4. **Space type enum terkawal** — bukan free-text, supaya report/aggregation boleh dipercayai

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Floor plan DWG/DXF ada tapi tiada data ruang (hanya garisan) | Chain `cad-dwg-dxf` untuk extract polygon dulu, baru map ke Space |
| Multi-tenant/multi-department satu floor | Space perlu `department_id` berasingan dari Floor-level ownership |
| Historical occupancy data tiada | Mula log dari sekarang, jangan backfill reka-reka |
| Client guna standard space classification lain (bukan BOMA) | Tanya dan dokumen formula client sendiri, bukan paksa BOMA |

## Level History
- **Lv.1** — Base: domain hierarki (Portfolio→Site→Building→Floor→Space→Asset), space classification BOMA-style (GA/RA/UA), occupancy/utilization formula, data model protocol. (Origin: 2026-10-18 — projek IWMS macam Archibus, arahan Abam)
