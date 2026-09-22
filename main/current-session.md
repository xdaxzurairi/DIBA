# Current Session Recap

**Tarikh:** 2026-09-23
**Topik:** Book Finder (metadatabuku) — sesi panjang: redesign → backend hardening → real-data testing. Diary penuh di `daily-diary/current/2026-09-23.md`.

**Ringkasan:** 6 build step (10-15) siap dalam satu sesi: interface redesign penuh, completion pass, search-limit widening, title+author fallback (+ fix bug InputParser lama), verify-then-refallback loop untuk recovered ISBN, dan 3 bug SEBENAR jumpa+fix bila diuji dgn fail Excel sebenar UiTM (column-mapping banner-row, title_author verification gap, sentinel "n/a" jadi nama penulis palsu). Projek didaftar LRU pos #1 (sebelum ni tak wujud dlm tracking — naming confusion "book-finder" vs folder sebenar "metadatabuku" diselesaikan).

**Status commit:** `cc7dbd0` = HEAD = `origin/main`, pushed. **SELESAI** — `c22b4f5` (leaked key) diamend keluar dari history (bukan sekadar file dibuang, tapi commit tu sendiri didrop sebab isi dia cuma noxx). 6 commit build step 10-15 di-cherry-pick semula ke history bersih, disahkan diff vs history lama cuma `noxx | 1 -` (tiada apa lain berubah), 110/110 test lepas, push fast-forward berjaya. Backup branch `backup-before-noxx-amend` (lokal sahaja, tak pernah push) kekal sebagai safety net. Rujuk `main/decisions.md` 2026-09-23 untuk detail penuh.

**Follow-up terbuka:**
- ~~c22b4f5 leaked key~~ — **SELESAI 2026-09-23**.
- `CONTACT_EMAIL` di `.env` masih placeholder `contact@example.com`.
- WorldCat/OCLC institutional access — Zuex kena semak dgn perpustakaan UiTM sendiri (bukan tindakan DIBA).
- Full 39-sheet/~7800-baris real-data run belum dijalankan.
- Baki lama (penuh di `main/reminders.md`): Telegram bridge, Ollama lokal PC opis, eWorks e-signature (jangan sync prod).
