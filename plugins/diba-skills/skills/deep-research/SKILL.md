---
name: deep-research
description: "MUST use when Abam minta 'penyiasatan mendalam', 'deep research pasal',
             'kajian menyeluruh dengan sumber', atau keputusan besar yang perlukan
             pengesahan berbilang sumber bebas — bukan sekadar carian pantas.
             Rakan berat kepada `pulse` (yang lebih ringan/recency-focused)."
---

# Deep Research — Disiplin Penyiasatan Bertingkat
*Setiap tesis disahkan oleh 3+ sumber bebas berlainan jenis, bukan satu carian pantas.*

## Activation

Bila skill ini aktif, output:

`🔬 Deep Research — [topik]. Ini penyiasatan berat, ambil masa.`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta penyiasatan menyeluruh untuk keputusan besar** | ACTIVE — penuh protokol 9 fasa |
| **Carian cepat/sentiment recency** | DORMANT — guna `pulse` |
| **Soalan boleh dijawab dari memory/kod sedia ada** | DORMANT |

## Protocol

### Fasa 1-2: Reframe & Genre
- [ ] Nyatakan semula soalan asal sebagai tesis/hipotesis yang boleh disahkan/disangkal
- [ ] Kenal pasti genre soalan (teknikal/pasaran/perundangan/akademik) — ini tentukan jenis sumber yang releven

### Fasa 3-4: Plan & Capability Discovery
- [ ] Rangka rancangan carian: apa sumber jenis (web umum, dokumentasi rasmi, forum, akademik) diperlukan untuk setiap tesis
- [ ] Semak keupayaan carian yang ada (WebSearch/WebFetch) sebelum mula

### Fasa 5: Search Loop
- [ ] Kumpul sumber merentas jenis berlainan (bukan 5 artikel dari sumber sama)
- [ ] Simpan setiap sumber sebagai fail berasingan dengan petikan verbatim (`scratchpad/sources/NN.md` jika penyiasatan besar) — supaya boleh disemak semula

### Fasa 6: Score & Triangulate
- [ ] Setiap tesis mesti disahkan oleh **≥3 sumber bebas jenis berlainan** sebelum diterima sebagai konklusif
- [ ] Tandakan tesis yang cuma ada 1-2 sumber sebagai "belum cukup disahkan"

### Fasa 7: Synthesize + Adversarial Pass
- [ ] Tulis sintesis awal
- [ ] Cabar sintesis sendiri — cari sudut yang menentang tesis utama, sertakan dalam laporan (bukan sorok)

### Fasa 8: Verify
- [ ] Semak semula setiap petikan/klaim kembali ke sumber asal — pastikan tiada salah petik atau over-generalize

### Fasa 9: Refresh Targets
- [ ] Nyatakan bahagian mana yang mungkin lapuk cepat (contoh: harga, versi produk) — supaya Abam tahu bila perlu semak semula

## Mandatory Rules

1. **≥3 sumber bebas berlainan jenis per tesis** — tiada konklusi major dari sumber tunggal
2. **Tiada fabricated citation** — setiap petikan verbatim boleh disemak ke sumber sebenar
3. **Adversarial pass wajib** — laporkan penemuan yang menentang tesis utama, jangan hanya confirm bias
4. **Ini heavyweight — jangan guna untuk soalan ringkas** — kalau soalan sebenarnya recency-check, arah ke `pulse`

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tesis cuma ada 1-2 sumber selepas carian menyeluruh** | Laporkan sebagai "belum cukup disahkan", jangan naikkan taraf jadi konklusif |
| **Sumber saling bercanggah** | Nyatakan percanggahan terus, jangan pilih satu sebagai "benar" tanpa asas |
| **Topik terlalu luas untuk 9 fasa penuh** | Cadang breakdown ke beberapa tesis lebih kecil dahulu (Fasa 1-2) |

## Level History
- **Lv.1** — Base: 9-fasa disiplin (Reframe→Genre→Plan→Capability→Search→Triangulate ≥3 sumber→Synthesize+adversarial→Verify→Refresh targets), per-source verbatim files, no fabricated citation. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `research/deep-research`, dipetakan penuh ke WebSearch/WebFetch DIBA sebagai rakan berat kepada `pulse`)
