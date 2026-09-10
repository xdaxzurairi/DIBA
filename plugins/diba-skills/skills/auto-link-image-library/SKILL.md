---
name: auto-link-image-library
description: "Sambungkan output image-prompt ke library, log keputusan, dan trigger anchor bila scope berubah."
version: 0.1
level: 4
---

# Auto‑Link Image‑Library (Lv 4)
*Selepas image-prompt hasilkan fail — daftar ke library tanpa Abam minta.*

## Activation
Auto-fire selepas skill `image-prompt` selesai menghasilkan fail gambar.

## Protocol
1. **Capture output** — ambil path gambar dari `image-prompt`.
2. **Register to library** — panggil skill `library` dengan metadata: `name` (fail/tajuk), `tags` (auto-generate dari context semasa), `size`, `context`.
3. **Log decision** — `log-decision` severity Low, action "Register image to library".
4. **Re-anchor check** — context menunjukkan modul luar IN SCOPE semasa → trigger `discipline` (Context Lock) dengan scope baru.
5. **Confirm** — balas ringkas Bahasa Melayu, < 50 perkataan.

## Mandatory Rules
- Bahasa Melayu, tiada emoji melainkan diminta.
- Gagal daftar → "Gagal daftar gambar, semak permission" — jangan ubah fail lain.
- Output ≤ 100 perkataan.
- Perubahan kod ikut `code-sharp`.

## Dependencies
`image-prompt` · `library` · `log-decision` · `discipline` · `echo-recall`

## Level History
- **Lv.1** — Base: capture output, register ke library, log decision Low severity, confirm ringkas.
- **Lv.2** — Re-anchor Check: kesan modul luar IN SCOPE, trigger `discipline` Context Lock dengan scope baru. (Origin: 2026-07-03)
- **Lv.3** — Smart Conflict Detect: semak tag/context conflict dengan entri library sedia ada sebelum register, bukan hanya kesan scope re-anchor. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
- **Lv.4** — Echo-Recall Bridge: selepas register, gambar jadi node yang boleh dijumpai semula via `echo-recall` link traversal (rujukan wikilink), bukan silo library tersendiri. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)

---
*Last updated: 2026‑07‑31*
