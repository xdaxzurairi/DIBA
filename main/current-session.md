Topik: eWorks — bug fix respond_time & action_period calculation (2026-06-09)

Keputusan:
- Bug 1 (cc6f639): strtotime($responseDateTime) guna DateTime object dari MSSQL → fix pakai $SYSDATE_responded
- Bug 2 (6bf02fb): $action_period dikira PHP tapi tak masuk SQL UPDATE → fix tambah CASE WHEN dalam SQL + params

Fail terakhir diubah: api/approve_complaint.php, kemaskini.php

Follow-up terbuka:
- Test: Approve aduan baru + siapkan aduan, verify response_period & action_period tersimpan betul dalam DB
- Monitor error_log: tiada lagi "WARNING: Could not calculate response period"
- Merge branch claude/diba-morning-brief-wZMIj → main (dari sesi lepas)
- ruangniaga: tunggu folder upload → SQL migration
- eWorks: DROP COLUMN status_date dari DB bila Abam confirm
