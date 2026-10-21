# Codex hooks — 2026-10-21

- timeout dalam saat; SessionEnd maksimum 3s. Stop/SubagentStop memerlukan JSON.
- Path Claude dan skrip yang dipadam tidak boleh disalin terus ke Codex. Uji mengikut lokasi pemasangan sebenar.
- PreCompact jangan panggil session-end: helper Ruflo dedupe mengikut sesi, lalu boleh melangkau penutupan akhir.
- Hook berubah memerlukan review/trust semula melalui /hooks; jangan ubah trusted_hash secara manual.
- Tool-fail capture guna status berstruktur, simpan metadata sahaja; teks ralat boleh mengandungi rahsia.
- Node dalam sandbox Windows gagal lstat profil; ujian berjaya selepas escalation. Gunakan heredoc PowerShell untuk Python SQL, bukan quote bersarang.
- Bukti: patches/test-codex-hooks.py (8 ujian), semakan skrip dipasang dan review agen.
- Rujukan rasmi: https://developers.openai.com/codex/hooks
