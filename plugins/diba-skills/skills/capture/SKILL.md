---
name: capture
description: "MUST use when Abam brain-dump banyak benda sekali gus tanpa struktur —
             'ok banyak nak cakap ni', 'brain dump', 'catat semua ni', atau bila
             satu mesej panjang campur task/idea/nota tanpa organisasi. Susun tanpa
             hilang maklumat atau ubah maksud asal."
---

# Capture — Brain-Dump Organizer
*Susun apa yang Abam cakap, jangan tapis atau tafsir semula maksudnya.*

## Activation

Bila skill ini aktif, output ringkasan tersusun terus (tiada activation banner berlebihan — capture perlu terasa pantas).

## Context Guard

| Context | Status |
|---------|--------|
| **Mesej panjang campur task/idea/nota tanpa struktur** | ACTIVE |
| **Abam explicitly kata "brain dump" / "catat semua ni"** | ACTIVE |
| **Mesej pendek/single-topic yang dah jelas** | DORMANT — tak perlu organizer untuk satu ayat |

## Protocol

### Step 1: Parse Tanpa Tafsir
- [ ] Baca keseluruhan dump dulu sebelum mula susun (jangan proses ayat demi ayat secara berasingan)
- [ ] Kekalkan bahasa/nada asal Abam bila reflect balik — jangan "improve" atau formalize maksud dia

### Step 2: Susun 4 Seksyen
- [ ] **Projects/Ideas** — item besar yang perlukan berbilang langkah
- [ ] **Tasks** — item tunggal boleh siap terus
- [ ] **Connections** — kaitan dengan kerja/projek sedia ada — **HANYA** yang disahkan wujud (guna Glob/Grep untuk sahkan), JANGAN reka kaitan yang tak wujud
- [ ] **How I Can Help** — cadangan tindakan DIBA boleh mula sekarang

### Step 3: Tutup dengan Arahan
- [ ] Akhiri dengan soalan terus: "Nak aku mula dengan yang mana?" — bukan cuma senarai tanpa hala tuju

### Step 4: Kes Ringkas
- [ ] Kalau dump ≤5 item tak berkaitan — ringkaskan pendek (jangan paksa 4 seksyen penuh untuk dump kecil)

## Mandatory Rules

1. **Zero information loss** — setiap item dalam dump asal mesti muncul dalam output tersusun, tiada yang hilang senyap
2. **Voice preservation** — jangan tukar cara Abam ungkap sesuatu jadi bahasa "corporate"/formal
3. **Connections mesti disahkan** — hanya sebut kaitan projek/fail yang benar-benar wujud (Grep/Glob confirm), tiada reka-reka kaitan
4. **Maksimum 1 soalan klarifikasi** semasa organizing — hanya untuk ambiguiti task-vs-project, bukan untuk setiap item

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Item ambigu — task atau project?** | Guna 1 soalan klarifikasi yang dibenarkan; kalau masih tak pasti, letak di bawah Projects/Ideas (lebih selamat over-scope drpd under) |
| **Dump sangat pendek (1-2 item)** | Skip struktur 4 seksyen penuh, terus reflect balik + 1 soalan arah |
| **Tiada kaitan wujud dengan kerja sedia ada** | Seksyen Connections dibiar kosong/skip — jangan paksa cari kaitan |

## Level History
- **Lv.1** — Base: 4-section organizer (Projects/Ideas, Tasks, Connections, How I Can Help), zero-info-loss + voice-preservation, connections verified-only, max 1 clarifying question. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `productivity/capture`, disesuaikan untuk gaya rojak Abam — reflect balik guna nada asal, bukan reformat formal)
