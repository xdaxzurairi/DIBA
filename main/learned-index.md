# DIBA Learned Index
*Last updated: 2026-07-16*
*Max 80 lines — oldest/lowest-confidence pruned bila penuh*

## Facts
- [2026-07-13] Webhook > polling untuk realtime events

## Cases
- 2026-07-15 — Write fails untuk diary/session memory adalah noise; fail akhirnya berjaya ditulis
- 2026-07-16 — SDD 15 tasks hasilkan 11 Write tool-fails dalam buffer tapi implementation lengkap

## Rules
- R001 — Write tool-fail untuk fail baru: resolved automatik; verify dengan git, bukan buffer
- R002 — SDD menghasilkan banyak Write fails; gunakan finishing-a-development-branch sebagai verifikasi sebenar
