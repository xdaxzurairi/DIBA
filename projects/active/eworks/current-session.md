Topik: Debug notifikasi email AC/Air melalui Task Scheduler (2026-05-11)
Keputusan: Task Scheduler, drive `Z:`, dan DB sudah disahkan berfungsi. Punca semasa kegagalan email dikenal pasti pada format penerima `BOM_EMAIL` yang menggunakan semikolon; `mail()` Windows menerima senarai dipisah koma, jadi `email_notifikasi_ac_air.php` dibetulkan untuk hasilkan dan menormalisasi penerima berformat koma.
Fail terakhir diubah: \\10.0.36.127\webs\eWorks\email_notifikasi_ac_air.php
Follow-up terbuka: Rerun task `eworks_email_d3030_g3010` dan semak `C:\Temp\ac_air.log` untuk baris `OK | WR_ID ...`. Jika masih gagal, semak policy relay atau envelope sender pada SMTP server.
