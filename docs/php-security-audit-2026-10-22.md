# Semakan PHP workspace XDIBAX — 22 Oktober 2026

## Keputusan utama

**ScoutOps memerlukan pengesahan patch runtime segera.** Daripada fail aplikasi dalam workspace, hanya `scoutops/` mengandungi PHP: 88 fail, 13,966 baris. `vercel-php@0.9.0` dalam konfigurasi bukan bukti bahawa enjin yang dideploy telah menerima patch keselamatan.

Semakan kod juga menemui dua isu aplikasi berisiko tinggi dan satu risiko kehabisan sumber. Penemuan statik ini belum diuji melalui permintaan atau payload terhadap aplikasi berjalan.

## Skop dan kaedah

- Skop dipilih Abam: `C:/Users/BSM/XDIBAX` sahaja; server UiTM dikecualikan.
- Inventori rekursif termasuk fail tersembunyi/worktree; extension `.php`, `.phtml`, `.php5`, `.php7`, `.phar` serta penanda runtime/dependency.
- Kod pihak ketiga, `node_modules`, `vendor`, metadata Git, konfigurasi agen dan output build dikecualikan daripada inventori kod aplikasi.
- Padanan dengan advisori rasmi PHP dan semakan aliran input, autentikasi, import serta deploy ScoutOps.
- Tiada PHP executable pada PATH. Tiada binary PHP biasa pada laluan XAMPP/Laragon/PHP yang diperiksa. Ini bukan bukti ketiadaan semua pemasangan PHP pada mesin.
- Tiada kod aplikasi diubah, deploy dijalankan, endpoint baharu dicipta, atau payload eksploit dihantar. Tiada pengesahan keadaan production dibuat.

## Dua CVE PHP yang diumumkan 21 Oktober

`CVE-2026-109618` melibatkan pengendalian out-of-memory; `CVE-2026-109619` melibatkan stale global state. PHP menyatakan pemasangan yang melayan permintaan web berisiko, termasuk FPM, mod_php dan CGI. Serangan tertentu berlaku sebelum kod aplikasi berjalan.

Versi upstream yang membaiki kedua-duanya:

| Cabang | Minimum patch untuk dua CVE ini |
|---|---|
| PHP 8.2 | 8.2.35 |
| PHP 8.3 | 8.3.36 |
| PHP 8.4 | 8.4.27 |
| PHP 8.5 | 8.5.12 |

PHP 8.1 dan lebih lama memerlukan bukti backport vendor atau migrasi ke cabang disokong. Mitigasi konfigurasi tidak menggantikan patch penuh.

Sumber: [advisori rasmi PHP](https://www.php.net/archive/2026.php#2026-10-20-1), [CERT-EU 2026-018](https://cert.europa.eu/publications/security-advisories/2026-018).

## Pemetaan projek

| Projek | Bukti workspace | Status untuk dua CVE PHP ini |
|---|---|---|
| ScoutOps | PHP + `vercel.json:7`, entrypoint `api/index.php:5` | Memerlukan pengesahan runtime; belum disahkan terdedah atau dipatch |
| BFMwebsite | Next.js/React/Supabase, `main/BFMwebsite/package.json` | Tiada runtime PHP dikenal pasti dalam workspace |
| baseballfedarationmalaysia | React/Vite/Supabase, `package.json` | Tiada runtime PHP dikenal pasti dalam workspace |
| bijakbersama | Next.js/React/Supabase, `package.json` | Tiada runtime PHP dikenal pasti dalam workspace |
| office-sim | Next.js/React, `package.json` | Tiada runtime PHP dikenal pasti dalam workspace |
| Control Room/Diba Dash, bsmwebsite, wita, xdibax dan baki direktori | Tiada fail aplikasi PHP dalam inventori | Tiada pendedahan PHP dikenal pasti; bukan pengesahan keselamatan menyeluruh |

### ScoutOps: jurang bukti runtime

- `scoutops/vercel.json:7`: runtime builder dipin kepada `vercel-php@0.9.0`.
- [Dokumentasi penyelenggara runtime](https://github.com/vercel-community/php/blob/master/README.md#-versions) memetakan versi ini kepada PHP 8.5.x; nombor patch deployment sebenar masih tidak diketahui.
- `scoutops/vercel.json:18` dan `api/index.php:68`: permintaan aplikasi dihantar kepada front controller PHP.
- Tiada versi patch PHP/SAPI daripada deployment sebenar tersedia dalam workspace. Tiada `composer.lock` yang membuktikan dependency runtime terpasang.
- `scoutops/README.md:19` menyebut 7.4+/uji 8.3, sedangkan `api/index.php:13` menggunakan fungsi PHP 8. README ialah panduan lama, bukan bukti versi aktif.

**Tindakan pertama:** dapatkan versi enjin, SAPI dan bukti patch daripada artifact/build/runtime deployment sedia ada. Untuk cabang 8.5, sahkan sekurang-kurangnya 8.5.12 atau backport vendor yang dinyatakan jelas. Rebuild/redeploy sahaja tidak membuktikan binary telah dipatch. Selepas upgrade, worker lama mesti diganti/restart. Pemeriksaan deployment di luar workspace belum termasuk dalam skop audit ini.

## Penemuan kod tambahan

### A1 — Tinggi: sync roster boleh merentas organisasi

- `public/import/sheet_sync.php:5`: evaluator dibenarkan mengakses; `:11` membaca satu rekod settings global; `:29` mengubah URL sumber tanpa organisasi.
- `sheet_sync.php:37` menghadkan penjanaan token kepada admin, tetapi admin tenant masih mengubah token global pada `:39`.
- `public/import/sheet_sync_cron.php:13` menggunakan rekod yang sama; `:38` mengimport tanpa organisasi eksplisit.
- `src/roster_import.php:300`–`:302` memilih organisasi pertama apabila tiada konteks sesi. Jadual `sql/schema_postgres.sql:436` tiada `organization_id`.
- Prasyarat: pemasangan berbilang organisasi, akaun evaluator diluluskan dan CSRF sah; import cron berlaku kemudian. Admin tenant boleh juga menjana token cron global. URL sumber tertakluk kepada validasi sedia ada; isu ini tidak memerlukan bypass SSRF.
- Kesan: tenant lain boleh mengawal sumber import yang mengisi roster organisasi pertama.
- Cadangan: settings/token mengikut tenant; cron membawa organisasi yang divalidasi; hapus fallback organisasi pertama.

### A2 — Tinggi: sekatan akaun tidak membatalkan sesi aktif

- `src/auth_helper.php:30`–`:31`: cache sesi dipulangkan sebelum semakan DB/status/role.
- `config/bootstrap.php:19`: masa aktiviti disegar setiap request. Timeout 8 jam pada `auth_helper.php:8` ialah inactivity timeout, bukan tempoh maksimum sesi.
- `public/admin/user_save.php:91`, `:94`, `:114`: perubahan password/role/status tidak membatalkan sesi akaun sasaran.
- Prasyarat: pengguna mempunyai sesi sebelum disable/demotion dan terus aktif sebelum inactivity timeout. Tiada jaminan sesi berkekalan jika stor sesi dipadam oleh mekanisme luar.
- Kesan: akses dan peranan lama boleh berterusan selepas pentadbir membatalkannya.
- Cadangan: semakan DB berkala dengan had cache, serta session version/revocation pada perubahan akaun.

### A3 — Sederhana: XLSX boleh menghabiskan memori/CPU worker

- `public/import/players_csv.php:6` memerlukan admin/evaluator berhak melihat semua; `:18` mengesahkan CSRF; `:31` memanggil parser XLSX.
- `src/xlsx_reader.php:23` dan `:75`: ZIP entry dinyahmampat sepenuhnya tanpa had saiz pengembangan.
- `xlsx_reader.php:102`–`:110`: indeks kolum menerima urutan huruf tanpa had dimensi; `:60`–`:64` mengisi semua kolum sehingga indeks itu.
- Prasyarat: pengguna import yang sah dan workbook berbahaya. Had saiz fail termampat sahaja tidak mengawal saiz hasil pengembangan atau dimensi kolum.
- Kesan: kehabisan sumber/fatal error. Ini **bukan bukti eksploit RCE** bagi CVE PHP di atas.
- Cadangan: had saiz ZIP selepas pengembangan, bilangan row/cell, panjang dan julat rujukan kolum sebelum alokasi.

## Kawalan yang disahkan pada laluan disemak

- `public/setup.php:20`: installer fail-closed jika token environment tiada/tidak sepadan.
- `api/index.php:19`–`:24`: resolver menggunakan `realpath`, semakan fail dan containment direktori public.
- Laluan import yang disemak mempunyai login/role gate dan CSRF. Kawalan ini tidak menyelesaikan dua CVE enjin PHP.

## Batas keputusan

Ini audit sasaran terhadap isu PHP semasa dan laluan berisiko berkaitan, bukan pentest atau audit penuh semua 13,966 baris. Tiada dakwaan semua projek selamat, server terjejas, atau eksploit telah berlaku. Utamakan bukti patch runtime ScoutOps, kemudian pembaikan A1/A2 dan had parser A3.
