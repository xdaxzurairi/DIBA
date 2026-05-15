# eWorks PWA — Workflow Lengkap: Permohonan Diterima hingga Aduan Ditutup
**Dokumentasi**: 2026-05-15 | **System**: eWorks PWA (UiTM-only)

---

## 📋 RINGKASAN WORKFLOW

Workflow aduan dari intake hingga closure melalui **8 tahap utama** dengan **7 status inti** dan **4 rute possible**:

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌─────────┐
│ INTAKE  │ -> │ REVIEW  │ -> │ APPROVE  │ -> │ EXECUTE │ -> │ CLOSURE │
│ (R)     │    │ (R)     │    │ (I/I3)   │    │ (HP)    │    │ (Com)   │
└─────────┘    └────┬────┘    └──────┬──┘    └─────────┘    └─────────┘
                     │               │
                  REJECT          APPOINT
                  (Rej/Can)        SUPERVISOR
                                   (I/I2→I)
```

---

## 🔴 TAHAP 1: INTAKE (PERMOHONAN BARU)

### Status: **R** (Permohonan)

**Lokasi**: `form_aduan_inisiatif.php` → API `api/insert_aduan.php`

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Cara Masuk** | Pengguna isi borang aduan (lokasi + masalah + keterangan) |
| **Data Dikumpul** | Lokasi (kampus, bangunan, blok, aras, bilik ATAU infrastruktur luar) |
| | Kategori (seksyen kerosakan → elemen → jenis masalah) |
| | Keterangan aduan + koordinat GPS (opsional) |
| | Pengadu otomatis = user yang login |
| **Validasi** | Lokasi wajib, kategori wajib, deskripsi minimal (50 huruf?) |
| **Status Awal** | Status = `R` (Permohonan), type_wr = 4 (Inisiatif) |
| **Tarikh** | date_requested = HARI INI, timestamp |
| **Notifikasi** | Push notification hantar ke DFMS berkaitan (base on site_id) |
| **No. Aduan** | System jana wr_id otomatis (cth: WR2026XXXXX) |
| **Ruang Lingkup** | Pengguna biasa boleh hantar; Section Leader + DFMS boleh hantar |
| **Output Pengguna** | Papar "Aduan Anda telah diterima" + No. Aduan |
| | Pengguna boleh track status dari sini |

### Database Records Created:
```sql
INSERT INTO wr (
  wr_id, site_id, zone_id, bldg_id, bl_id, fl_id, rm_id,
  section, prob_group, prob_type, description,
  requestor, em_number, type_wr, status,
  date_requested, lokasi_kerosakan, jenis_lokasi
) VALUES (...);
-- Status = 'R', date_requested = NOW()
```

---

## 🟠 TAHAP 2: REVIEW (TINDAKAN DFMS)

### Status: **R** (Masih Permohonan, menunggu keputusan)

**Lokasi**: `kemaskini.php` → API `api/approve_complaint.php`

**Aktor**: DFMS atau Section Leader

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Pemicu** | Push notification daripada Tahap 1 |
| **Data Dilihat** | DFMS buka aduan, review maklumat lokasi + masalah + keterangan |
| **Keputusan** | 3 pilihan tindakan: |
| | (a) **LULUS** → Status I3 |
| | (b) **TOLAK** → Status Rej (ditolak) |
| | (c) **SALAH SALURAN** → Status WC (wrong channel) |
| **Catatan** | DFMS boleh tambah remarks/catatan keputusan |
| **Validasi** | Remarks opsional (boleh kosong) |
| **Database Update** | Status berubah dari R → I3 / Rej / WC |
| | date_approved / date_rejected dicatat |
| **Notifikasi Balik** | Push ke Pengadu: "Aduan Anda telah diluluskan / ditolak" |
| **Jaminan Masa** | Tiada SLA di tahap ini (boleh 1 jam - 2 hari) |
| **Rute Selesai** | Jika Rej atau WC → TUTUP (tidak perlu ke tahap seterusnya) |

### Exit Conditions (Aduan Boleh Ditutup):
- **Rej (Ditolak)** → Penyelesaian: Aduan ditolak, tidak ada follow-up
- **WC (Salah Saluran)** → Penyelesaian: Dirujuk ke unit lain, tidak lanjut di sini

---

## 🟡 TAHAP 3: APPROVAL & PLANNING (PERSIAPAN KERJA)

### Status: **I3** (Diluluskan) → **I** (Arahan Kerja Dikeluarkan)

**Lokasi**: 
- `kemaskini.php` → Action "LULUS" (set I3)
- `lantikan_penyelia.php` → Lantik penyelia (I3 → I)

**Aktor**: DFMS atau Section Leader (melantik penyelia)

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Awal Tahap** | Selepas LULUS, status = I3 |
| **Arahan Kerja** | DFMS atau Section Leader lantik penyelia (supervisor/contractor) |
| **Lantik Penyelia** | `lantikan_penyelia.php?wr_id=XXX` |
| | Senarai penyelia ditapis by section/bahagian |
| | Boleh lantik lebih dari satu penyelia |
| | in_house = 1 (staf UiTM) atau 0 (kontraktor) |
| **Data Simpan** | Jadual `wrcf` (work request contractor/foreman) |
| | wrcf: wr_id, cf_id (contractor ID), assigned_date |
| **Status Update** | I3 → I (Arahan Kerja Penuh dengan penyelia) |
| | Jika tiada penyelia dilantik → I2 (Arahan Kerja tanpa penyelia) |
| **Cetak Arahan Kerja** | `cetak_laporan.php?wr_id=XXX` |
| | Cetak A4 berisi: No. Aduan, lokasi, masalah, penyelia dilantik |
| **Notifikasi** | Push ke penyelia: "Anda dilantik untuk aduan WR2026XXXXX" |
| **Jaminan Masa** | Tiada SLA ketat (standard: 1-3 hari) |

### Database Records:
```sql
UPDATE wr SET status = 'I3' WHERE wr_id = ?;  -- Lulus

-- Lantik penyelia
INSERT INTO wrcf (wr_id, cf_id, assigned_date) VALUES (?, ?, NOW());

UPDATE wr SET status = 'I' WHERE wr_id = ?;  -- I3 → I (dengan penyelia)
-- atau
UPDATE wr SET status = 'I2' WHERE wr_id = ? AND cf_id NOT EXISTS;  -- Tanpa penyelia
```

---

## 🟢 TAHAP 4: EXECUTION (KERJA BERJALAN)

### Status: **I** (Arahan Kerja Penuh) → **HP** (Dalam Proses Pembaikan)

**Lokasi**: 
- `kemaskini.php` → Action "HP" (set HP)
- `paparan_lengkap_aduan.php` → View progress

**Aktor**: Penyelia, staf lapangan, DFMS

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Awal Tahap** | Selepas penyelia dilantik, status = I |
| **Status Progress** | Penyelia / DFMS ubah status I → HP (Dalam Proses Pembaikan) |
| | Boleh update remarks: "Kerja dimulai", "Menunggu spare parts", dll. |
| **Catatan Kemajuan** | Remarks opsional setiap update |
| **Durasi Kerja** | Tidak ada SLA — bergantung jenis aduan |
| | Aduan ringan: 1-3 hari |
| | Aduan berat: 1-4 minggu |
| **Multiple Updates** | DFMS boleh update status HP berkali-kali dengan remarks berbeza |
| | Setiap update disimpan dengan timestamp |
| **Notifikasi Pengguna** | Push ke pengadu: "Aduan Anda sedang diproses" (opsional) |
| **Tracking** | Pengguna boleh view status HP dan remarks terbaru dari `complaints.php` |
| **Field Database** | Tambah kolum baru (jika belum ada): |
| | `date_started` (tarikh kerja bermula) |
| | `progress_remarks` (catatan kemajuan) |
| | `date_last_updated` (tarikh update terakhir) |

### Database Updates:
```sql
UPDATE wr SET status = 'HP', progress_remarks = ? WHERE wr_id = ?;
-- Boleh update berkali-kali dengan remarks berbeza
```

---

## 🔵 TAHAP 5: COMPLETION (KERJA SELESAI)

### Status: **HP** (Dalam Proses) → **Com** / **clo** (Siap/Tutup)

**Lokasi**: `kemaskini.php` → Action "SIAP" (set Com)

**Aktor**: DFMS, penyelia, atau sistem otomatis

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Pemicu** | Penyelia/DFMS tandai kerja selesai |
| **Status Update** | HP → Com (Completion) atau clo (Closed) |
| | Kedua dianggap aduan "selesai" |
| **Catatan Akhir** | DFMS/penyelia boleh add remarks: "Kerja selesai", "Diluluskan", dll. |
| **Tarikh Selesai** | date_completed / date_closed = NOW() |
| **Quality Check** | Opsional: DFMS boleh review hasil kerja sebelum tandai selesai |
| **Notifikasi Pengadu** | Push ke pengadu: "Aduan Anda telah selesai" |
| **Laporan Final** | Pengadu boleh cetak laporan final dari `cetak_laporan.php` |
| | Laporan include: No. Aduan, penyelia, tarikh selesai |
| **Durasi Total** | Dari R ke Com: berbeza mengikut kompleksiti |
| | Aduan ringan: 2-7 hari |
| | Aduan berat: 2-4 minggu |
| **Remark Mandatory?** | Tiada — boleh kosong, tapi disarankan isi untuk audit trail |

### Database Final:
```sql
UPDATE wr SET 
  status = 'Com', 
  date_completed = NOW(),
  final_remarks = ?
WHERE wr_id = ?;
```

---

## 🔒 TAHAP 6: CLOSURE (ADUAN DITUTUP - FINAL STATE)

### Status: **Com** / **clo** (Tutup)

**Lokasi**: `paparan_lengkap_aduan.php` → View closed record

**Aktor**: System (read-only untuk pengguna)

### Ciri-ciri / Features:

| Aspek | Detail |
|-------|--------|
| **Status Final** | Com atau clo — keduanya dianggap TUTUP |
| **Akses Selepas Tutup** | Pengguna boleh view saja (read-only) |
| | Tidak boleh ubah status lagi |
| **Laporan Tersedia** | Pengadu boleh cetak laporan final |
| | Dashboard tetap show aduan sebagai "Siap" |
| **Durasi Archive** | Aduan tetap dalam database selamanya (untuk audit) |
| **Analytics** | Aduan siap dimasukkan dalam KPI/dashboard analytics |
| | Contoh: Jumlah aduan siap, average resolution time |
| **Follow-up** | Tiada SLA follow-up (one-time transaction) |
| **Remark Visible** | Semua remarks dari tahap 1-5 tetap visible |
| **History Preserved** | Sejarah lengkap status disimpan dalam audit log |

### Read-Only Fields After Closure:
```
- wr_id (tetap)
- site_id, zone_id, lokasi (tetap)
- section, prob_group, prob_type (tetap)
- requestor, penyelia (tetap)
- Semua tarikh (date_requested, date_completed, dll.)
- Semua remarks
```

---

## 🛑 ROUTE ALTERNATIF: EARLY TERMINATION

Aduan **boleh ditutup sebelum Com** jika dipilih:

### Route A: **REJECT (Rej)** — Ditolak
- **Dipicu**: DFMS pada Tahap 2 pilih "TOLAK"
- **Status**: R → Rej
- **Final**: TUTUP, tiada follow-up
- **Notifikasi**: Push ke pengadu "Aduan ditolak"

### Route B: **WRONG CHANNEL (WC)** — Salah Saluran
- **Dipicu**: DFMS pada Tahap 2 pilih "SALAH SALURAN"
- **Status**: R → WC
- **Final**: TUTUP, dirujuk ke unit lain
- **Notifikasi**: Push ke pengadu dengan petunjuk unit yang tepat

### Route C: **CANCEL (Can)** — Dibatalkan
- **Dipicu**: DFMS atau pengadu batal aduan
- **Status**: Mana-mana status → Can (boleh batalkan dari I, HP, dll.)
- **Final**: TUTUP
- **Remarks**: Wajib ada catatan pembatalan

### Route D: **SUSPENDED (S)** — Diberhentikan Sementara
- **Dipicu**: DFMS henti sementara (spare parts tunggu, tunggu keputusan, dll.)
- **Status**: I / HP → S
- **Resume**: Boleh kembali dari S → HP / I semula
- **Final**: Jika tidak lanjut, ubah S → Can

---

## 📊 MATRIX STATUS DAN TRANSISI

```
┌─────────┬─────────────────────────────────────────────────┐
│ Status  │ Boleh Berubah Ke                                │
├─────────┼─────────────────────────────────────────────────┤
│ R       │ → I3, I, WC, Rej (dari Tahap Review)           │
│ I3      │ → I (selepas lantik penyelia)                  │
│ I       │ → HP, S, Can (dari Tahap Execution)            │
│ I2      │ → I (selepas lantik penyelia)                  │
│ HP      │ → Com, S, Can (dari Tahap Completion)          │
│ S       │ → HP, I, Can (resume atau batalkan)            │
│ Com     │ (FINAL — tiada ubah)                            │
│ clo     │ (FINAL — tiada ubah)                            │
│ WC      │ (FINAL — tiada ubah)                            │
│ Rej     │ (FINAL — tiada ubah)                            │
│ Can     │ (FINAL — tiada ubah)                            │
└─────────┴─────────────────────────────────────────────────┘
```

---

## 📈 TIMELINE & SLA (Guideline)

| Tahap | Status | Ideal Duration | Aktor |
|-------|--------|----------------|-------|
| 1. Intake | R | < 1 jam | Pengguna |
| 2. Review | R | 1-3 hari | DFMS |
| 3. Planning | I3 → I | 1-2 hari | DFMS + Penyelia |
| 4. Execution | HP | 1-30 hari (bergantung) | Penyelia + DFMS |
| 5. Completion | HP → Com | < 1 hari (selepas kerja selesai) | DFMS |
| **TOTAL** | **R → Com** | **3-35 hari** | **All** |

**Catatan**: SLA ini ialah guideline. UiTM boleh define SLA tersendiri per jenis aduan.

---

## 🔐 PERMISSION MATRIX

| Tindakan | Aktor | Tahap |
|----------|-------|-------|
| Hantar aduan | Pengguna biasa, Section Leader, DFMS | 1 |
| Lulus/Tolak/WC | DFMS, Section Leader | 2 |
| Lantik penyelia | DFMS, Section Leader | 3 |
| Update status HP | DFMS, Penyelia | 4 |
| Tandai selesai (Com) | DFMS | 5 |
| Batalkan (Can) | DFMS | Mana-mana |
| Lihat detail | Pemilik aduan + DFMS + Penyelia | All |
| Cetak laporan | Semua (read-only) | All |

---

## 🔔 NOTIFICATION POINTS

| Tahap | Event | Penerima | Tindakan |
|-------|-------|----------|----------|
| 1 | Aduan baru hantar | DFMS (by site) | Push notification |
| 2 | Aduan diluluskan | Pengadu | Push: "Diluluskan, menunggu kerja" |
| 2 | Aduan ditolak | Pengadu | Push: "Ditolak, alasan..." |
| 3 | Penyelia dilantik | Penyelia | Push: "Anda dilantik untuk WR..." |
| 4 | Kerja dimulai (HP) | Pengadu | Push: "Kerja sedang diproses" |
| 5 | Kerja selesai (Com) | Pengadu | Push: "Aduan selesai, laporan tersedia" |

---

## 📋 DATA FIELDS BY STAGE

### Tahap 1 (Intake):
```
Required: lokasi (site, bangunan, blok, aras, bilik ATAU infra)
Required: kategori (section, prob_group, prob_type)
Required: description (keterangan aduan)
Optional: koordinat GPS, foto
Auto-set: requestor = user login, date_requested = NOW(), status = R
```

### Tahap 2 (Review):
```
Add: decision (Lulus / Tolak / WC)
Add: remarks_approval (catatan keputusan)
Add: date_reviewed = NOW()
Update: status = I3 / Rej / WC
```

### Tahap 3 (Planning):
```
Add: penyelia (from lantikan_penyelia)
Add: cf_id (contractor/foreman ID)
Add: assigned_date = NOW()
Update: status = I3 → I (dengan penyelia) atau I2 (tiada penyelia)
```

### Tahap 4 (Execution):
```
Add: progress_remarks (kemajuan kerja)
Add: date_started (kerja bermula)
Update: status = I → HP
Update: date_last_updated = NOW() (setiap kali ada update)
Optional: foto sebelum/sesudah, attachment
```

### Tahap 5 (Completion):
```
Add: final_remarks (catatan penyelesaian)
Add: date_completed = NOW()
Update: status = HP → Com / clo
```

---

## 🎯 KEY FEATURES TO IMPLEMENT IN UPGRADE

Based on workflow ini, features penting untuk **Phase 1-3 upgrade**:

### Phase 1 (Core):
- ✅ API untuk semua status transitions
- ✅ Session management (who did what)
- ✅ Input validation pada setiap tahap
- ✅ Audit logging (siapa ubah status, bila, remarks apa)
- ✅ Push notification pada transition points (Tahap 2, 3, 5)

### Phase 2 (Advanced):
- ✅ Dashboard KPI: Average resolution time per stage
- ✅ SLA tracking: berapa % aduan siap dalam target time?
- ✅ Custom workflow per kategori aduan (opsional)
- ✅ Attachments/photos per tahap (before/after di Tahap 4)
- ✅ Email notification backup (jika push gagal)

### Phase 3 (Intelligence):
- 🤖 Auto-route by similarity (AI route to right section)
- 🤖 Prediction: Estimate completion date based on history
- 🤖 Chatbot FAQ: Answer common questions (Tahap 1)

---

## 📌 SUMMARY TABLE: COMPLETE WORKFLOW

| No. | Tahap | Status Awal | Status Akhir | Aktor | Durasi | Output |
|-----|-------|------------|-------------|-------|--------|--------|
| 1 | **Intake** | - | R | Pengguna | < 1 jam | WR ID, push to DFMS |
| 2 | **Review** | R | I3 / Rej / WC | DFMS | 1-3 hari | Approval decision + push |
| 3 | **Planning** | I3 | I / I2 | DFMS | 1-2 hari | Penyelia assigned, Arahan Kerja |
| 4 | **Execution** | I | HP | Penyelia | 1-30 hari | Progress updates |
| 5 | **Completion** | HP | Com / clo | DFMS | < 1 hari | Laporan final, push complete |
| 6 | **Closure** | Com | Com (FINAL) | System | ∞ | Read-only record |

---

**Prepared by**: DIBA (HCO) | **Context**: eWorks PWA System Upgrade Plan  
**Date**: 2026-05-15
