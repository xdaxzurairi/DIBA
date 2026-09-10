---
project: eAduan v3 — Integrasi MinIO Object Storage
status: implemented (dev) — testing belum jalan
created: 2026-08-04
updated: 2026-08-04
owner: Abam (Mohammad Zurairi)
---

# Design Doc: Integrasi MinIO untuk Upload Foto Kerosakan

## 1. Konteks & Masalah

Sistem semasa simpan foto kerosakan (`wr.foto1/foto2/foto3`) terus ke disk lokal
`uploads/wr/`. Ini bermasalah untuk skala (storan pelayan terhad, tiada replikasi,
susah backup berasingan). Keputusan sesi 2026-07-22:

- MinIO di-host oleh IT dept (pihak ketiga, bukan kita provision)
- Gambar **lama** kekal di `uploads/wr/` — tiada migration retroaktif
- Gambar **baru** sahaja masuk MinIO
- Serve gambar via **Presigned URL**, tempoh **24 jam**
- Library: **S3.php single-file** (Undesigned/S3.php atau similar — tanpa Composer)
- Pendekatan A (S3.php) dipilih berbanding SDK penuh AWS

## 2. Skop

**Termasuk:**
- Upload foto baru → MinIO (gantikan `uploads/wr/` untuk rekod baru)
- Serve foto (lama + baru) melalui satu endpoint `ajax/foto.php` yang sama
- Config MinIO via `.env` (ikut pattern sedia ada `config/env.php`)

**Tidak termasuk (out of scope):**
- Migration foto lama ke MinIO
- Delete/cleanup foto dari MinIO bila rekod `wr` dipadam (boleh jadi fasa 2)
- Upload foto temp (pratonton semasa isi borang) — **kekal di disk lokal**, sebab
  banyak upload temp akan ditinggalkan (borang tak submit) — tak elok bebankan MinIO
  dengan sampah. Hanya foto yang **disahkan submit** naik ke MinIO.

## 3. Aliran Semasa (Baseline)

```
[Borang] --POST foto--> upload_foto.php
                           - validate MIME, size
                           - compress <1MB (GD)
                           - simpan uploads/temp/tmp_{session}_{idx}_{time}.jpg
                           - return filename

[Pratonton] <--GET-- foto_temp.php?f=tmp_...
                           - validate token milik session semasa
                           - stream dari uploads/temp/

[Submit borang] --POST--> simpan.php
                           - INSERT wr (dapat wr_id)
                           - simpanFotoDB(): rename tmp_* -> uploads/wr/wr_{id}_{n}.ext
                           - UPDATE wr SET fotoN = filename

[Papar rekod] <--GET-- ajax/foto.php?wr_id=X&idx=Y
                           - SELECT fotoN FROM wr
                           - readfile(uploads/wr/{filename})
```

## 4. Aliran Baharu (Dengan MinIO)

Perubahan **hanya** pada 2 titik: `simpanFotoDB()` (destinasi akhir) dan
`ajax/foto.php` (cara serve). `upload_foto.php` dan `foto_temp.php` **tidak
berubah** — pratonton kekal 100% seperti sekarang.

```
[Submit borang] --POST--> simpan.php
                           - INSERT wr (dapat wr_id)
                           - simpanFotoDB():
                               - upload bytes tmp_* -> MinIO bucket
                                 key: wr/{wr_id}/foto{n}.ext
                               - padam local tmp_* selepas upload berjaya
                               - UPDATE wr SET fotoN = "{object_key}"
                           - Jika MinIO gagal (network/IT down):
                               fallback simpan ke uploads/wr/ macam biasa
                               (supaya borang tak fail sebab storan pihak ketiga down)

[Papar rekod] <--GET-- ajax/foto.php?wr_id=X&idx=Y
                           - SELECT fotoN FROM wr
                           - Tentukan lama vs baru:
                               jika fotoN mengandungi '/'  => object key MinIO (baru)
                               jika tidak (flat filename)  => uploads/wr/ (lama, legacy)
                           - Lama: readfile() macam sekarang (tiada perubahan)
                           - Baru: jana presigned GET URL (expiry 24j) → 302 redirect
```

### Kenapa diskriminator `/` dalam nama fail cukup?
Nama fail lama dijana `wr_{id}_{n}.ext` (flat, tiada slash). Key MinIO baru
`wr/{wr_id}/foto{n}.ext` (ada slash). Tiada migration/kolum schema baru
diperlukan — cutover mudah dan reversible (boleh switch balik ke local dengan
tukar 1 fungsi).

### Kenapa redirect (302) bukan proxy-stream?
Presigned URL memang direka untuk diakses terus oleh browser client — itu
tujuan dia "presigned" (selamat tanpa expose credential). Proxy-stream
melalui PHP hanya perlu **jika** MinIO endpoint tak boleh diakses terus dari
rangkaian client (contoh: MinIO cuma reachable dalam VPN kampus, staf akses
dari luar). **Perlu Abam sahkan dengan IT dept**: adakah endpoint MinIO
reachable dari network pelajar/staf luar kampus? Jika tidak → guna proxy-stream
(readfile via cURL) sebagai ganti redirect.

## 5. Perubahan Fail

| Fail | Perubahan |
|---|---|
| `includes/S3.php` (baru) | Library S3.php single-file (Amazon S3 PHP class, compatible MinIO — S3 API-compatible) |
| `includes/minio.php` (baru) | Wrapper: `minioUpload($localPath, $key)`, `minioPresignedUrl($key, $expirySeconds=86400)`, guna config dari `.env` |
| `.env` | Tambah: `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_BUCKET`, `MINIO_USE_SSL` |
| `.env.example` | Sama, dengan placeholder — untuk rujukan tanpa expose secret sebenar |
| `pages/simpan.php` | `simpanFotoDB()`: tukar destinasi ke MinIO + fallback local |
| `ajax/foto.php` | Tambah logik diskriminator + presigned redirect utk key MinIO |
| `ajax/upload_foto.php` | **Tiada perubahan** |
| `ajax/foto_temp.php` | **Tiada perubahan** |

## 6. Config `.env` (contoh)

```
MINIO_ENDPOINT=minio.internal.uitm.edu.my
MINIO_ACCESS_KEY=xxxxxxxx
MINIO_SECRET_KEY=xxxxxxxx
MINIO_BUCKET=eaduan-foto
MINIO_USE_SSL=true
```

Dapatkan nilai sebenar dari IT dept (mereka host MinIO-nya).

## 7. Error Handling & Kegagalan

- **MinIO down semasa upload**: fallback ke `uploads/wr/` lokal (jangan block
  submission borang atas sebab storan pihak ketiga). Log kegagalan (error_log)
  supaya boleh dikesan kemudian, tapi user tak nampak error.
- **MinIO down semasa serve (presigned gagal jana)**: papar placeholder
  "Gambar tidak dapat dimuatkan" — jangan crash halaman papar rekod.
- **Presigned URL expired (>24j) sebelum digunakan**: tidak berlaku dalam
  praktik sebab URL dijana on-demand setiap kali `foto.php` dipanggil (bukan
  disimpan), jadi sentiasa fresh 24 jam dari page-load.

## 8. Testing Plan

1. Upload foto baru → sahkan object muncul dalam bucket MinIO (`wr/{id}/fotoN.ext`)
2. Papar rekod baru → sahkan gambar load melalui presigned URL (302 redirect,
   URL ada signature & expiry)
3. Papar rekod **lama** (foto sedia ada dalam `uploads/wr/`) → sahkan masih
   jalan macam biasa (regresi check)
4. Simulasi MinIO down (block port/salah credential) semasa submit → sahkan
   fallback local jalan, borang tetap submit berjaya
5. Simulasi MinIO down semasa papar → sahkan tiada crash, placeholder papar

## 9. Soalan Terbuka — status selepas Abam bagi credential (2026-08-04)

1. **Reachability**: ~~belum sah~~ — endpoint guna hostname public HTTPS
   (`minio.uitm.edu.my:8443` dev, `space.uitm.edu.my:9000` prod), jadi
   kemungkinan besar direct-reachable dari client. **Masih perlu Abam sahkan
   dengan IT** — kalau salah, tukar `ajax/foto.php` dari redirect ke
   proxy-stream (satu fungsi je kena ubah).
2. **Bucket sedia ada ke perlu create**: **Dijawab** — bucket dev `907-fms`
   dan prod `fms` dah wujud (nama dalam credential yang diberi IT dept).
3. **Retention/cleanup**: masih terbuka — accept orphan buat masa ni (fasa 2).

**Nota bucket dikongsi**: `907-fms`/`fms` kemungkinan dikongsi dengan modul
FMS lain (bukan eksklusif eAduan). Untuk elak collision key, semua object kita
guna prefix `ea_newv3/` — lihat `MINIO_KEY_PREFIX` dalam `includes/minio.php`.
Diskriminator lama/baru (ada `/` dalam nama = MinIO) masih valid sebab prefix
ini sendiri mengandungi slash.

**Format path key (dikemaskini 2026-08-04)**: atas arahan Abam, lapisan `wr/`
dibuang — folder terus ikut no. aduan (`wr_id`) di bawah `ea_newv3/`:
`ea_newv3/{wr_id}/foto{n}.ext` (bukan `ea_newv3/wr/{wr_id}/foto{n}.ext`).
Contoh: `907-fms/ea_newv3/12345/foto1.jpg`. Ditukar dalam `pages/simpan.php`
(`simpanFotoDB()`).

## 10. Status Implementation (2026-08-04)

Credential Dev diterima daripada IT dept → implementation diteruskan tanpa
tunggu jawapan penuh Seksyen 9 (risiko reachability diterima buat masa ni).

**Siap:**
1. ✅ `includes/S3.php` — `MinioClient` custom (AWS SigV4 manual, `hash_hmac`
   + `curl`, tiada dependency luar). `putObject()` untuk upload,
   `presignedGetUrl()` untuk serve.
2. ✅ `includes/minio.php` — wrapper `getMinioClient()`, `minioUpload()`,
   `minioPresignedUrl()`, guna `MINIO_KEY_PREFIX = 'ea_newv3/'`.
3. ✅ `.env` (dev) — MinIO Dev credentials ditambah (endpoint, access/secret
   key, bucket `907-fms`, region, path-style).
4. ✅ `.env.example` — placeholder + komen dev/prod endpoint & bucket.
5. ✅ `pages/simpan.php` — `simpanFotoDB()` cuba `minioUpload()` dahulu, jika
   gagal fallback `rename()` ke `uploads/wr/` macam asal.
6. ✅ `ajax/foto.php` — diskriminator `/` dalam nama fail → MinIO
   (`minioPresignedUrl()` + 302 redirect) atau lokal (`readfile()` asal).
7. ✅ Lint semua fail (`php -l`) — tiada syntax error.

**Belum siap:**
- ❌ Testing sebenar (Seksyen 8, 5 skrip) — belum dijalankan, perlu akses ke
  environment dev sebenar (bukan sekadar lint).
- ❌ Sahkan reachability dengan IT (soalan 1 di atas).
- ❌ Prod credential belum disimpan di mana-mana — hanya dev `.env` diubah.
  Bila nak deploy prod, perlu buat `.env` prod berasingan dengan bucket `fms`
  + endpoint `space.uitm.edu.my:9000`.
- ❌ Cleanup/retention policy (soalan 3) — belum diputuskan, fasa 2.

## 12. Test Konektiviti Dev — LULUS (2026-08-04)

Skrip ujian CLI (bukan test Seksyen 8 penuh, tapi lapisan storan teras)
dijalankan terus terhadap MinIO dev sebenar:

1. **Test connectivity asas** — `putObject()` teks kecil, jana presigned URL,
   GET semula, sahkan kandungan sepadan byte-demi-byte. **LULUS.**
2. **Test simulasi aliran sebenar** — jana imej JPEG (GD, macam
   `upload_foto.php`), `minioUpload()` dengan key format sebenar
   (`wr/999999/foto1.jpg` → tersimpan sebagai `ea_newv3/wr/999999/foto1.jpg`),
   presigned GET, sahkan saiz byte sepadan. **LULUS.**

**Isu ditemui & dibetulkan**: `php.ini` pelayan dev ada `curl.cainfo` menunjuk
ke fail sijil CA yang tak wujud (`C:\apache24\bin\curl-ca-bundle.crt`),
menyebabkan SEMUA permintaan cURL HTTPS PHP gagal (HTTP 0) — bukan masalah
MinIO/kod kita, tapi konfigurasi persekitaran tempatan. Dibetulkan dalam
`includes/S3.php` (kaedah `applyCaBundle()`): jika `curl.cainfo` ini tak
wujud, cari bundle CA sah alternatif (cth. Git for Windows) dan override
`CURLOPT_CAINFO` terus dalam kod — supaya kod berfungsi tanpa perlu tukar
`php.ini` server (config bersama, tak sesuai ubah tanpa kelulusan).

**Kesimpulan penting**: test ini juga mengesahkan **Soalan Terbuka #1
(reachability)** — endpoint `minio.uitm.edu.my:8443` memang boleh dicapai
terus dari luar (bukan VPN-only), jadi pendekatan **redirect 302** (bukan
proxy-stream) dalam `ajax/foto.php` adalah betul dan tidak perlu diubah.

**Masih belum diuji**: aliran penuh melalui borang web sebenar (submit
`simpan.php` → `simpanFotoDB()` → papar semula via `ajax/foto.php` dalam
browser). Skrip di atas menguji lapisan `includes/minio.php`/`S3.php` secara
langsung sahaja, bukan integrasi penuh borang. Objek test (`ea_newv3/test/*`,
`ea_newv3/wr/999999/*`) masih ada dalam bucket `907-fms` — boleh dipadam
manual bila-bila (tiada rekod `wr` sebenar merujuk kepadanya).

## 11. Langkah Seterusnya

1. Abam jalankan testing Seksyen 8 di dev (upload foto baru → sahkan masuk
   bucket `907-fms` dengan key `ea_newv3/wr/{id}/foto{n}.ext`)
2. Sahkan dengan IT: reachability endpoint dari luar rangkaian kampus
3. Kalau reachability gagal → tukar `ajax/foto.php` punya bahagian MinIO dari
   redirect kepada proxy-stream (fetch bytes guna cURL dalam `foto.php`)
4. Siapkan `.env` prod berasingan sebelum deploy ke `fms.uitm.edu.my`
5. Selepas testing lulus → deploy + monitor `error_log` untuk fallback events
