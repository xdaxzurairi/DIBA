# Current Session Recap

**Tarikh:** 2026-09-09
**Topik:** Auto-diary EOD — tiada sesi aktif hari ini. Konteks terkini: EA New v3 (sesi 2026-08-04).

**Keputusan (dari sesi terakhir):**
- Login page split-screen korporat — confirmed
- Bug SEKSYEN ajax diperbetulkan (corrupted PHP tag)
- MinIO: custom SigV4 client, prefix `ea_newv3/{no_aduan}/foto{n}.ext`, fallback local
- Test CLI MinIO dev LULUS penuh

**Fail terakhir diubah (ea_newv3):**
- `index.php` — login redesign
- `ajax/get_seksyen.php` — bug fix
- `includes/S3.php`, `includes/minio.php` — MinioClient
- `pages/simpan.php`, `ajax/foto.php` — upload + presigned redirect

**Follow-up terbuka:**
- Test browser borang sebenar — TERGANTUNG
- Prod `.env` belum disediakan
- Sahkan reachability MinIO dengan IT dept
- Retention/cleanup orphan foto — fasa 2
