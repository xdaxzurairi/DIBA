Topik: ea_newv3 — Audit keselamatan penuh + OTP e-mel Pengguna Luar + MinIO + tutup pendedahan .env (2026-09-30)
Keputusan: Identiti dari sesi + semakan pemilik (IDOR ditutup); Pengguna Luar log masuk guna e-mel berdaftar + OTP; config dalam .env.php (Apache abaikan .htaccess); MinIO guna config/cacert.pem + proxy foto.php; wr_id via OUTPUT INSERTED.
Fail terakhir diubah: includes/functions.php, includes/otp.php, pages/daftar_luar.php, pages/simpan.php, includes/S3.php, config/env.php, sw.js, docs/SOP-dev-to-prod.md (6 commit 69126e3..f93ee02, belum push)
Follow-up terbuka: (1) tukar rahsia terdedah — DB afm, MinIO, JWT_SECRET, Google secret; (2) admin Apache ikut SOP langkah 5; (3) keputusan login prod + push GitHub
Nota lama: plan AI suggest kerosakan (2026-05-21) masih belum dimulakan — plan_ai_suggest_kerosakan.md
