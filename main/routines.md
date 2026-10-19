# DIBA Routines — Muscle Memory Layer
*Rekod aktiviti berulang untuk recall automatik*

---

## eWorks CR — Tambah Laporan Baru (Laporan Bahagian)
**Trigger:** CR baru untuk tambah laporan dalam modul Laporan Bahagian eWorks
**Kekerapan:** Per CR
**Fail biasa diubah:**
- `//10.0.36.127/webs/eWorks/lap_[nama].php` — fail laporan baru
- `//10.0.36.127/webs/eWorks/lap_list_bahagian.php` — tambah row dalam senarai
- `//10.0.36.127/webs/eWorks/page.php` — daftarkan page dalam whitelist semua group
**Langkah:**
1. Baca CR (screenshot/brief dari Abam) — faham filter, output, dan interaksi
2. Cari fail rujukan sedia ada yang paling hampir (cth: `lap_inisiatifstaf.php`)
3. Baca fail rujukan — faham query SQL, table structure, dan form pattern
4. Semak `lap_list_bahagian.php` untuk tahu nombor laporan seterusnya
5. Cipta fail laporan baru (`lap_[nama].php`) berdasarkan rujukan
6. Tambah row baru dalam `lap_list_bahagian.php`
7. Daftarkan nama fail dalam `page.php` — cari semua group (0,2,3,4,6) dan tambah
8. Test akses laporan dalam browser
**Perangkap:**
- `page.php` WAJIB dikemas kini — tanpa ini laporan tidak boleh diakses (akan redirect ke senarai_aduan)
- Group 0, 2, 3, 4, 6 mesti semua dikemas kini — group 1 dan 5 auto-include semua
- Section code dalam database berbeza dengan label display (cth: 'INF MEC' bukan 'INF MEK')
- `in_house='1'` diperlukan bila query dari `cf` table untuk exclude staf luar
**Tags:** #eworks #laporan-bahagian #cr #php #routing
**Terakhir dijalankan:** 2026-05-25

---

## eWorks — Debug Paparan Salah / Routing Gagal
**Trigger:** Laporan baru wujud tapi paparan salah (tunjuk page lain atau senarai_aduan)
**Kekerapan:** Setiap kali cipta laporan baru
**Fail biasa diubah:**
- `//10.0.36.127/webs/eWorks/page.php`
**Langkah:**
1. Semak URL — pastikan `?p=nama_fail` betul
2. Buka `page.php` — cari nama fail dalam whitelist
3. Semak berapa banyak `if($_SESSION['group_3']==X)` blocks yang ada
4. Tambah `$page=="nama_fail" ||` dalam SETIAP block yang ada laporan berkenaan
5. Gunakan `replace_all: true` dalam Edit untuk ganti semua sekaligus jika pattern sama
6. Verify dengan Grep — cari nama fail dalam page.php dan kira bilangan occurrences
**Perangkap:**
- Group 4 biasanya ada context berbeza (bukan `lap_lan_a` sebagai jiran) — perlu Edit berasingan
- Jangan guna `replace_all` jika surrounding context berbeza antara group
**Tags:** #eworks #routing #page-php #debug
**Terakhir dijalankan:** 2026-05-25

---

## DIBA Session Start
**Trigger:** Awal setiap sesi baru Claude Code
**Kekerapan:** Harian (setiap sesi)
**Fail biasa diubah:** — (read-only)
**Langkah:**
1. `session-briefing` auto-trigger — baca current-session.md + reminders.md
2. Semak follow-up terbuka dari sesi lepas
3. Tanya Abam jika ada task yang pending atau task baru
**Perangkap:**
- Jangan skip brief walaupun Abam terus bagi arahan — brief dulu, baru proses
**Tags:** #diba #session #startup
**Terakhir dijalankan:** 2026-05-25

---

## Save Diary Selepas Kerja
**Trigger:** Selesai task atau perubahan kod yang berjaya
**Kekerapan:** Setiap sesi
**Fail biasa diubah:**
- `C:/Users/BSM/XDIBAX/DIBA/daily-diary/current/YYYY-MM-DD.md`
- `C:/Users/BSM/XDIBAX/DIBA/main/current-session.md`
**Langkah:**
1. Invoke `save-diary`
2. Skill akan cipta/append entry ke diary hari ini
3. Kemaskini current-session.md dengan recap
4. Sync DIBA Hub (background)
**Perangkap:**
- Jangan overwrite entry yang sedia ada — append sahaja
- Timestamp mesti betul (dapatkan dari bash `date +"%H:%M"`)
**Tags:** #diba #diary #memory
**Terakhir dijalankan:** 2026-05-25

---

## eWorks — Tambah Fail Laporan Baru (Query SQL MSSQL)
**Trigger:** Perlu buat laporan baru yang query dari database eWorks
**Kekerapan:** Per CR
**Fail biasa diubah:**
- `//10.0.36.127/webs/eWorks/lap_[nama].php` — fail laporan baru
**Langkah:**
1. Tentukan table utama: `wr` (aduan), `cf` (staf), `em` (pekerja), `section`, `bl` (bangunan)
2. Gunakan ADODB pattern: `$db->Execute($sql)`, `$rs->FetchRow()`, `$rs->EOF`
3. Filter tarikh: `MONTH(date_requested)=MONTH(GETDATE())` atau `CONVERT(date,date_requested) BETWEEN`
4. LEFT JOIN untuk elak hilang rekod (staf tanpa aduan masih perlu muncul)
5. Filter inisiatif: `type_req = '5'`
6. Filter staf aktif: `cf.in_house = '1'`
7. Untuk jawatan: `wr.doc2` (diisi semasa submit, paling konsisten)
**Perangkap:**
- MSSQL syntax: `ISNULL()` bukan `IFNULL()`, `TOP 1` bukan `LIMIT 1`
- Date format: `CONVERT(VARCHAR, date, 103)` untuk DD/MM/YYYY
- Section codes: 'BAN','MEC','ELE','INF CIV','LAN','MAJ','INF MEC','INF ELE','TEL','PROJEK'
- Bahagian mapping: BOB→(BAN,MEC,ELE), BOI1→(INF CIV,LAN,MAJ), BOI2→(INF MEC,INF ELE,TEL), BPR→(PROJEK)
**Tags:** #eworks #sql #mssql #laporan #php
**Terakhir dijalankan:** 2026-05-25

---

## eWorks — Staf Pindah Kampus: Paparan Laporan Berubah/Hilang
**Trigger:** Staf yang baru dipindahkan ke kampus lain laporkan paparan laporan eWorks berubah tak dijangka (cth: tab laporan hilang, tertukar ke laporan lain)
**Kekerapan:** Ad-hoc, ikut proses pertukaran kampus staf
**Fail biasa disemak:**
- `afm_users` (kolum `group_3`) — DB FMSPROD, bukan fail kod
- `menu.php` — tentukan tab laporan mana muncul ikut `group_3`
- `page.php` — tentukan page mana boleh diakses ikut `group_3`
**Langkah:**
1. Dapatkan ID staf (`user_name`/`cf_id`) yang bermasalah
2. Query `afm_users` untuk `group_3`, `site_id_list`, `ew_bahagian`, `ew_capaian` staf tu
3. Banding dengan peer role sama (`role_name LIKE '...'`) di kampus sama — tentukan nilai `group_3` yang "normal" untuk role tu
4. Semak `menu.php`/`page.php` untuk faham apa setiap nilai `group_3` bagi/sekat (tab "Bahagian" vs "BPF Kampus Negeri" dll)
5. Kalau `group_3` tersalah (biasanya sebab proses pindah kampus set nilai default yang tak padan akses asal staf), `UPDATE afm_users SET group_3='X' WHERE user_name='ID'` — SELALU guna WHERE user_name spesifik + semak `Affected_Rows()`=1
6. Minta staf logout & login semula (group_3 di-cache dalam session, hanya refresh lepas login baru)
**Perangkap:**
- Akses Bash/PowerShell terus ke DB PROD dari sesi Claude Code kena run oleh Abam sendiri (classifier sekat automatik walaupun read-only atau dah approve dalam chat)
- `dbprodfms36128` (hostname DB prod) kadang tak resolve DNS dari PC pejabat — guna IP `10.0.36.128` sebagai fallback
- Nilai `group_3` majoriti staf ialah 4 (akses terhad) — jangan andai nilai lain automatik salah, mesti banding dgn peer dulu
**Tags:** #eworks #group_3 #pindah-kampus #akses-laporan #afm-users #data-fix
**Terakhir dijalankan:** 2026-09-23

---

## DIBA Recall (Deep Memory)
**Trigger:** Abam minta recall, ingat semula, atau mula sesi selepas lama
**Kekerapan:** Ad-hoc
**Fail biasa diubah:** — (read-only)
**Langkah:**
1. Invoke `diba-recall`
2. Baca current-session.md, reminders.md, decisions.md
3. Baca diary terkini (3-5 hari)
4. Surface: status projek aktif, follow-up terbuka, decisions yang relevan
**Perangkap:**
- Hook instincts boleh block tool access — jika tool gagal, semak hooks.json
- Recall tidak sama dengan session-briefing — recall lebih mendalam
**Tags:** #diba #recall #memory
**Terakhir dijalankan:** 2026-05-22
