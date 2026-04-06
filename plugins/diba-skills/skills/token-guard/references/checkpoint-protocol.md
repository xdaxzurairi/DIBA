# Checkpoint Protocol — Token Guard

Protokol lengkap untuk simpan dan pulihkan session state supaya kerja boleh disambung tanpa perlu re-read keseluruhan konteks.

---

## Kenapa Checkpoint Penting

Setiap kali baca fail, jalankan search, atau dapat output tool — itu guna token. Bila checkpoint diaktifkan sebelum limit, sesi baru boleh bermula dengan hanya membaca **1 fail** (checkpoint.md) berbanding re-discover semula keseluruhan konteks.

**Token disimpan per sesi baru:** ~60–80% (anggaran)

---

## Lokasi Checkpoint

```
/memories/session/checkpoint.md    ← checkpoint aktif
/memories/session/checkpoint-backup.md  ← backup checkpoint sebelumnya
```

---

## Format Checkpoint Penuh

```markdown
# Checkpoint — [YYYY-MM-DD HH:MM+08:00]

## Task Semasa
[Satu ayat: apa yang sedang dibuat]

## Projek / Konteks
- **Workspace**: [nama workspace / folder root]
- **Stack**: [teknologi utama: PHP, MSSQL, dll]
- **Keperluan khas**: [constraint atau syarat penting]

## Status Langkah

- [x] [Langkah siap 1]
- [x] [Langkah siap 2]
- [ ] [Langkah belum siap 1]  ← SETERUSNYA
- [ ] [Langkah belum siap 2]

## Fail Aktif

| Fail | Status | Nota |
|------|--------|------|
| `path/to/file.php` | Sedang diedit | [ringkasan perubahan] |
| `path/to/other.js` | Siap | [apa yang dah berubah] |

## Keputusan Dibuat

- [Keputusan teknikal 1: kenapa pilih approach ini]
- [Keputusan teknikal 2]

## Context Kritikal

[Maklumat penting yang TIDAK ada dalam kod/fail — contoh: constraint user, edge case ditemui, behavior yang perlu dijaga]

## Langkah Seterusnya (Konkrit)

1. [Langkah konkrit pertama — fail apa, buat apa]
2. [Langkah konkrit kedua]
3. [Langkah konkrit ketiga]

## Fail Yang Perlu Dibaca Selepas Resume

- `path/to/file.php` (baris 45–120 — bahagian berkaitan)

## Tags
#[topik] #[modul] #checkpoint
```

---

## SOP: Save Checkpoint

### Bila Save

- User minta "checkpoint"
- Token usage tinggi (>50 tool calls anggaran)
- Sebelum task besar bermula (proaktif)
- Sebelum tamat sesi

### Langkah

1. Baca `/memories/session/checkpoint.md` — jika ada, salin ke `checkpoint-backup.md`
2. Tulis checkpoint baru dengan format di atas
3. Beritahu user dalam 2 baris:
   ```
   Checkpoint tersimpan: /memories/session/checkpoint.md
   Sambung: mulakan sesi baru dan hantarkan: /token-guard resume
   ```

---

## SOP: Resume dari Checkpoint

### Langkah

1. Baca `/memories/session/checkpoint.md`
2. Output status dalam **maks 5 baris**:
   ```
   Resume: [Task Semasa]
   Siap: [X langkah dari Y]
   Seterusnya: [Langkah konkrit pertama]
   Fail aktif: [senarai fail]
   [TOKEN GUARD: COMPACT MODE ON]
   ```
3. Teruskan ke "Langkah Seterusnya" dalam checkpoint — JANGAN orientasi semula dari mula
4. Baca hanya fail yang disenaraikan dalam "Fail Yang Perlu Dibaca Selepas Resume"

---

## Anti-Pattern (ELAK)

❌ Baca balik semua fail untuk "orientasi" selepas resume  
❌ Jalankan semua search dari mula selepas resume  
❌ Tanya user "boleh jelaskan semula apa yang perlu dibuat?"  
❌ Simpan checkpoint tanpa "Langkah Seterusnya" yang konkrit  
❌ Abaikan checkpoint lama — backup dulu sebelum overwrite  

---

## Cadangan Frekuensi Checkpoint

| Jenis Task | Bila Checkpoint |
|---|---|
| Bug fix kecil (1–2 fail) | Tidak perlu |
| Feature baru (3–5 fail) | Selepas fasa design/planning |
| Refactor besar | Selepas setiap modul siap |
| Audit / analisis | Selepas setiap 10 fail diperiksa |
| Multi-session task | Wajib setiap kali tamat sesi |
