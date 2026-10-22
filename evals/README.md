# DIBA Evals (code-sharp, chief-of-staff, echo-recall)

Eval manual ringkas (panduan Anthropic "build evaluations first"). Setiap `*.json` ialah array 3 senario:
`skills`, `query`, `expected_behavior` (diambil terus dari peraturan SKILL.md), `should_not`.

## Cara jalankan
1. Buka sesi Claude baharu dengan skill berkaitan dimuat (cth `/code-sharp`, atau biar auto-trigger).
2. Tampal `query` sebagai mesej pertama (senario chief-of-staff perlu vault DIBA sebenar; senario kod perlu fail sasaran wujud).
3. Baca respons/tool call, bandingkan dengan `expected_behavior` dan `should_not`.
4. Catat lulus/gagal per senario (jadual ringkas atau komen di sini).

## Rubrik 0/1 (per senario)
- 1 = SEMUA item `expected_behavior` dipenuhi DAN TIADA item `should_not` berlaku.
- 0 = mana-mana item gagal. Catat item mana gagal (itu bukti untuk naik taraf skill).
Skor skill = jumlah/3. Jalankan semula selepas ubah skill untuk banding.
