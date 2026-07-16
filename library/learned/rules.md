# Learned Rules
*General rules extracted dari cases. Confidence: low (1 case) / medium (2-3) / high (4+).*
*Format: ## RXXX — Rule Title*

## R001 — Write Tool-Fail untuk Fail Baru adalah Noise, Bukan Blocker
- **Rule:** Bila Write tool gagal pada fail yang baru dicipta (tiada pre-read), ia akan berjaya pada retry. Signal buffer akan capture ini sebagai tool-fail tapi ia resolved secara automatik. Verifikasi sebenar: periksa fail wujud dalam `git diff --stat` atau `git status`, bukan ketiadaan buffer entry.
- **Source:** case 2026-07-15 (diary fail), case 2026-07-16 (SDD batch fails)
- **Confidence:** medium (2 instances, 2 sesi berbeza)

## R002 — SDD Execution Menghasilkan Banyak Write Tool-Fails — Gunakan Git sebagai Ground Truth
- **Rule:** Dalam sesi SDD dengan 10+ tasks, jangka Write tool-fails akan berlaku kerap dalam signal buffer. Jangan hentikan atau redo tasks berdasarkan buffer noise. Gunakan `finishing-a-development-branch` skill untuk verifikasi sebenar — ia buat `git diff` dan run tests sebelum merge.
- **Source:** case 2026-07-16 (SDD Department Architecture, 15 tasks, 11 tool-fail entries tapi implementation lengkap)
- **Confidence:** low (1 instance SDD penuh)
