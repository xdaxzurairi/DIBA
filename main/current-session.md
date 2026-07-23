# Current Session Recap

**Tarikh:** 2026-07-22
**Topik:** Eksplorasi Kod Upload Foto & Plan MinIO — EA New v3

**Keputusan:**
- Semak 4 fail upload foto: `upload_foto.php`, `foto_temp.php`, `foto.php`, `simpan.php`
- MinIO integration akan guna S3.php single-file library (tanpa Composer)
- Gambar lama kekal dalam `/uploads/wr/`, MinIO untuk gambar baru sahaja
- Serve via Presigned URL, expiry 24 jam
- Sesi ditangguh — Abam tidak sihat

**Fail terakhir diubah:**
- Tiada — sesi eksplorasi & planning sahaja

**Follow-up terbuka:**
- Sambung brainstorming MinIO bila Abam sihat
- Pendekatan A (S3.php) dah dipilih — perlu present design penuh
- Langkah: Design → Spec doc → writing-plans → implementation
