# Senarai Semak Rotasi Rahsia ea_newv3

*Disediakan DIBA 2026-10-21 berdasarkan laporan CIPHER. Tiada nilai rahsia dalam dokumen ini; jangan tampal nilai sebenar di sini.*

## Latar belakang

`.env` ea_newv3 boleh dimuat turun awam di `fmsdev.uitm.edu.my/ea_newv3` (Apache `AllowOverride None` mengabaikan `.htaccess`/`web.config`). Ditutup 2026-09-30 (commit `15f37c2`, config dipindah ke `.env.php`). Anggaran tempoh terdedah: sekitar Ogos hingga 2026-09-30 (tarikh mula tepat tidak direkod). Tiada bukti rahsia dalam git atau GitHub.

Status: **belum dirotasi**. Semua rahsia di bawah dikongsi dengan aplikasi lain, jadi tukar serentak dalam satu tetingkap penyelenggaraan.

## Fasa 0: Sebelum rotasi

- [ ] Semak log Apache pelayan dev untuk `GET /ea_newv3/.env` dan `GET /eWorks/.env` (status 200 dari IP bukan dalaman = naikkan jadi insiden).
- [ ] Catat hasil semakan log (ada / tiada permintaan luar): ____________
- [ ] Tentukan tetingkap penyelenggaraan (tarikh/masa): ____________
- [ ] Maklumkan pemilik rahsia dikongsi: DBA, IT dept (MinIO), pasukan Portal Warga.
- [ ] Sandarkan `.env.php` / `.env` semasa ea_newv3, eWorks, pwa_eworks ke lokasi selamat (bukan dalam repo).
- [ ] Sahkan `.env.php` dan `.env` tiada dalam sebarang repo (`.gitignore` sedia ada melindungi `.env.php` ea_newv3).

## Fasa 1: Rotasi (satu rahsia, semua penggunanya serentak)

### 1. Google OAuth client secret
Dikongsi: ea_newv3, eWorks. Pemilik: Google Cloud project akaun Abam.
- [ ] Jana client secret baharu di Google Cloud Console (kekalkan yang lama aktif seketika).
- [ ] Kemas kini `GOOGLE_CLIENT_SECRET` dalam `.env.php` ea_newv3.
- [ ] Kemas kini `.env` eWorks.
- [ ] Uji log masuk Google pada kedua-dua aplikasi.
- [ ] Padam secret lama.

### 2. Kata laluan DB (user `afm`, DB FMSDEV @ 10.0.36.97)
Dikongsi: ea_newv3, eWorks. Pemilik: DBA / IT dept.
- [ ] Minta DBA tukar kata laluan `afm`.
- [ ] Kemas kini `DB_PASSWORD` ea_newv3 dan eWorks dalam tetingkap yang sama.
- [ ] Uji sambungan DB dan satu operasi baca/tulis pada setiap aplikasi.

### 3. Kunci MinIO (bucket `907-fms`, `minio.uitm.edu.my:8443`)
Dikongsi: ea_newv3, pwa_eworks. Pemilik: IT dept.
- [ ] Minta IT dept jana access key + secret key baharu.
- [ ] Kemas kini `MINIO_ACCESS_KEY` / `MINIO_SECRET_KEY` ea_newv3 dan `.env` pwa_eworks.
- [ ] Uji upload dan baca foto (`tools/minio_check.php`).
- [ ] Minta IT dept batalkan kunci lama.

### 4. `JWT_SECRET`
Dikongsi: ea_newv3, Portal Warga (SSO). **Risiko: SSO putus jika dua hujung tidak serentak.**
- [ ] Sepakati masa tukar dengan pasukan Portal Warga.
- [ ] Jana nilai baharu (64 aksara rawak) menggunakan penjana selamat.
- [ ] Tukar di ea_newv3 dan Portal Warga serentak.
- [ ] Uji SSO dari Portal Warga ke ea_newv3.
- [ ] Sedar: sesi/token sedia ada akan tidak sah; pengguna perlu log masuk semula.

## Fasa 2: Pengesahan selepas rotasi

- [ ] Log masuk Google (ea_newv3 dan eWorks).
- [ ] SSO Portal Warga.
- [ ] Aliran OTP Pengguna Luar.
- [ ] Upload dan paparan foto aduan.
- [ ] eWorks berfungsi (DB + MinIO + Google).
- [ ] `https://fmsdev.uitm.edu.my/ea_newv3/.env` mengembalikan 404 dan `.env.php` tidak mendedahkan kandungan pada URL awam.
- [ ] Prod (`fms.uitm.edu.my`) guna rahsia berasingan daripada dev (ikut SOP dev-to-prod). Jika sama, rotasi prod juga.

## Fasa 3: Tutup

- [ ] Semua rahsia lama dibatalkan/dipadam di sumber (Google, DB, MinIO).
- [ ] Hardening Apache mengikut SOP langkah 5 (supaya `.env` tidak boleh dicapai lagi): ____________
- [ ] Rekod tarikh rotasi dalam `main/decisions.md` dan tutup open loop dalam diary.
- [ ] Buang item "tukar rahsia ea_newv3" daripada `main/current-session.md`.

## Berkaitan tetapi berasingan

- [ ] Gambar aduan pengguna (PDPA) dalam sejarah GitHub ea_newv3 (`AUDIT-GIT-2026-09.md`): perlu keputusan dan tindakan sendiri.
- [ ] `master` ahead 5 daripada `origin/master` (belum di-push).

## Belum dapat disahkan

- Sama ada `.env` pernah dimuat turun pihak lain (log Apache tidak dicapai).
- Sama ada rahsia sama digunakan di aplikasi lain selain eWorks, pwa_eworks dan Portal Warga.
- Senarai penuh pemegang akses share `//10.0.36.127/webs`.
