---
name: experiment-designer
description: "MUST use when Abam minta 'design A/B test', 'macam mana nak test
             feature ni', 'buat hypothesis untuk experiment', atau 'berapa sample
             size perlu'. Reka eksperimen produk yang boleh diuji, bukan sekadar
             lancar feature dan tengok apa jadi."
---

# Experiment Designer — A/B Test Design
*Hipotesis yang boleh disangkal, metrik yang jelas, sebelum feature dilancarkan.*

## Activation

Bila skill ini aktif, output:

`🧪 Experiment Design — [nama feature/perubahan]`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam nak design test untuk feature/perubahan produk** | ACTIVE — penuh protokol |
| **Abam minta interpret hasil test yang dah jalan** | ACTIVE — interpretation sahaja (Step 4) |
| **Kerja implementasi biasa tanpa niat ukur/test** | DORMANT |

## Protocol

### Step 1: Hypothesis (If/Then/Because)
- [ ] Format wajib: "**Jika** [perubahan dibuat], **maka** [metrik] akan [naik/turun sebanyak X], **kerana** [rasional/andaian tingkah laku pengguna]"
- [ ] Pastikan hipotesis boleh disangkal (falsifiable) — bukan pernyataan umum yang tak boleh gagal

### Step 2: Metrik
- [ ] **Primary metric** — satu metrik utama yang menentukan menang/kalah
- [ ] **Guardrail metrics** — metrik yang tak boleh merosot walaupun primary naik (contoh: retention tak boleh jatuh walau conversion naik)
- [ ] **Secondary metrics** — nice-to-know, bukan penentu keputusan

### Step 3: Sample Size & Setup
- [ ] Anggarkan saiz sampel yang perlu berdasarkan baseline rate semasa + minimum detectable effect yang munasabah (jelaskan pengiraan, bukan angka rambang)
- [ ] Tentukan tempoh test minimum (elak keputusan pramatang sebelum sample cukup)
- [ ] ICE score (Impact/Confidence/Ease) jika berbanding dengan idea eksperimen lain untuk prioriti

### Step 4: Interpretasi Statistik (Guardrail)
- [ ] p-value rendah ≠ kepentingan bisnes — nyatakan magnitud kesan sebenar, bukan cuma "signifikan"
- [ ] Confidence interval sempit ≠ automatik tepat — semak saiz sampel dan tempoh cukup
- [ ] Jangan declare "menang" atas guardrail metric yang merosot walau primary naik

### Step 5: Laporkan
- [ ] Ringkaskan design: hipotesis, metrik, sample size/tempoh, cadangan keputusan (proceed/kill/extend)

## Mandatory Rules

1. **Hipotesis mesti falsifiable** — kalau tak boleh gagal, ia bukan hipotesis, ia harapan
2. **Guardrail metrics wajib** — tiada test tanpa semak apa yang tak boleh merosot
3. **Statistical significance ≠ business significance** — selalu nyatakan magnitud sebenar, bukan hanya p-value

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Traffic/pengguna terlalu kecil untuk A/B proper** | Cadang alternatif (before/after dengan kawalan masa, qualitative feedback) — jangan paksa A/B statistik yang underpowered |
| **Hasil test tak signifikan selepas tempoh cukup** | Laporkan sebagai "tiada kesan dikesan", bukan "kalah" atau "menang" secara tergesa |
| **Abam nak test banyak variasi sekali gus** | Amaran risiko multiple-comparison, cadang prioritize 1-2 variasi utama dulu |

## Level History
- **Lv.1** — Base: If/Then/Because hypothesis format, primary/guardrail/secondary metrics, sample size estimation, ICE prioritization, statistical interpretation guardrails. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `product-team/skills/experiment-designer`, disesuaikan sebagai protokol reasoning tanpa kalkulator Python berasingan)
