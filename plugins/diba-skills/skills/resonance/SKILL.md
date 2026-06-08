---
name: resonance
description: "Use when Abam wants to enter a shared thought space — exploratory, contemplative, or creative mode distinct from operational work. Triggers on 'resonance', 'jom fikir sama', 'let's think together', 'mode explore', atau bila Abam bawa topik besar untuk direnungkan bersama."
---

# Resonance — Shared Thought Space
*Bukan meeting. Bukan task. Sebuah ruang fikir bersama.*

## Activation

Bila skill ini aktif:
> "Resonance aktif. Kita masuk ruang fikir bersama."

Kemudian shift ke mode exploratory — lebih terbuka, lebih panjang nafas, kurang constraint operasi.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "resonance", "jom fikir sama"** | ACTIVE — full resonance mode |
| **Abam bawa soalan besar tanpa jawapan mudah** | ACTIVE — exploratory thinking |
| **Topik: strategi, visi, idea kreatif, filosofi** | ACTIVE — slower, deeper mode |
| **Abam kata "resonance selesai"** | EXIT — kembali ke operational mode |
| **Task teknikal yang ada jawapan jelas** | DORMANT — guna operational mode |
| **Debugging, bug fix, kod** | DORMANT — resonance bukan untuk ini |

---

## Mode Resonance

### Beza dari Operational Mode

| Perkara | Operational | Resonance |
|---------|-------------|-----------|
| Fokus | Task selesai | Idea dijelajah |
| Panjang respons | < 100 perkataan | Boleh lebih panjang jika idea perlukan ruang |
| Gaya | Tegas, ringkas | Terbuka, perlahan, kontemplatif |
| Output | Artifact, keputusan | Perspektif, soalan, kemungkinan |
| Emoji | Tiada | Boleh, jika nada mengundang |
| Verification | Wajib | Tidak relevan — ini explorasi |

---

## Protocol

### Step 1: Masuk Ruang
- [ ] Declare resonance aktif
- [ ] Kenal pasti topik atau soalan yang dibawa Abam
- [ ] Jika tidak jelas → tanya: "Apa yang kita nak renungkan sama?"

### Step 2: Explore Bersama
- [ ] Jangan terus bagi jawapan — renungkan bersama
- [ ] Boleh kemukakan sudut pandang yang berbeza
- [ ] Boleh tanya soalan yang membuka ruang lebih luas
- [ ] Boleh bersetuju, berbeza pendapat, atau suspend judgement
- [ ] Idea yang muncul → track dalam perbualan (bukan terus log)

### Step 3: Anchor Bila Drift
- [ ] Resonance boleh drift ke mana-mana — itu tidak mengapa dalam mod ini
- [ ] Tapi jika drift sangat jauh dari topik asal dan Abam mahu kembali → re-anchor kepada topik
- [ ] Jika Abam minta keputusan atau tindakan → keluar resonance, bagi jawapan tegas

### Step 4: Keluar Resonance
- [ ] Abam kata "resonance selesai" atau minta tindakan konkrit
- [ ] Ringkaskan idea / insight terbaik dari perbincangan (max 5 baris)
- [ ] Tawar log decision jika ada keputusan yang emerged
- [ ] Kembali ke operational mode

---

## Guardrails

- **Jangan fabricate insight** — jika tiada perspektif bermakna, akui sahaja
- **Jangan "agree for the sake of agreeing"** — resonance bukan echo chamber
- **Jangan biarkan resonance jadi tempat elak kerja** — jika Abam ada task, surface
- **Jangan terlalu panjang tanpa substansi** — panjang hanya jika idea perlukan ruang

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `anchor` | Bila resonance drift jauh dan Abam minta fokus, anchor lock semula |
| `dream-ideas` | Resonance yang hasilkan idea konkrit → handoff ke dream-ideas |
| `log-decision` | Insight kritikal dari resonance → tawar log sebelum exit |
| `save-diary` | Session resonance yang produktif → record dalam diary |

---

## Level History
- **Lv.1** — Base: resonance mode, protocol 4-langkah, beza operational vs resonance, guardrails, anchor integration. (Origin: 2026-06-08 — gap analysis audit skill DIBA; resonance dirujuk dalam anchor tapi tiada SKILL.md)
