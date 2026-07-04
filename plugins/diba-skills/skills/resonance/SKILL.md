---
name: resonance
description: "Use when Abam wants to enter a shared thought space — exploratory,
             contemplative, or creative mode distinct from operational work. Triggers
             on 'resonance', 'jom fikir sama', 'let's think together', 'mode explore',
             'dream', 'bagi idea baru', 'brainstorm', 'cuba impikan', 'inspirasi',
             atau bila Abam bawa topik besar untuk direnungkan bersama. Absorbs the
             former dream-ideas skill (Dream Mode = burst kreatif dalam Create mode)."
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
| `discipline` | Bila resonance drift jauh dan Abam minta fokus, Context Lock (Lv.7) semula |
| `log-decision` | Insight kritikal dari resonance → tawar log sebelum exit |
| `save-diary` | Session resonance yang produktif → record dalam diary |

---

## Lv.2 — Seed Capture

Idea bermakna yang muncul → jangan biar hilang dengan sesi:
- Exit resonance → idea terbaik ditulis sebagai **seed** dalam `main/mind-tree.md` (tajuk + 2-3 baris + tarikh + status: seed)
- Bukan semua idea layak — hanya yang Abam respond positif atau yang ada potensi konkrit
- Format ikut struktur mind-tree sedia ada; append-only

## Lv.3 — Tiga Mod Resonance

| Mod | Bila | Pacing |
|-----|------|--------|
| **Explore** | "macam mana kalau...", teroka kemungkinan | Luas, banyak cabang, soalan terbuka |
| **Contemplate** | Topik berat/personal/strategik | Perlahan, dalam, kurang cabang, lebih mendengar |
| **Create** | Bina konsep/idea produk/nama | Generatif, iterasi pantas, build atas idea Abam |

Auto-detect dari topik; Abam boleh tukar: "slow down" / "jom pecah lagi".

## Lv.4 — Perspective Roster

Elak echo chamber — sengaja pusing sudut pandang bila perbincangan mula sehala:
- **Builder**: macam mana nak buat ni sebenarnya?
- **Skeptic**: apa yang akan gagal? siapa tak akan guna?
- **User**: apa rasa orang yang guna/kena benda ni?
- **5-tahun**: masih penting tak 5 tahun lagi?

Guna 1-2 lensa per giliran, bukan semua serentak — bukan checklist, alat pembuka.

## Lv.5 — Harvest Protocol

Exit resonance dengan hasil terstruktur (max 8 baris):
- **Actionable** → tawar terus: log decision / masuk reminder / jadi projek (chain skill sepadan)
- **Parked** → seed ke mind-tree (Lv.2) atau `main/dream-ideas.md` (Dream Mode Lv.7)
- **Dropped** → sebut ringkas kenapa — supaya tak berpusing balik sesi depan
- Tiada hasil bermakna → kata jujur: "sesi ni lebih kepada proses — tiada seed kali ni"

## Lv.6 — Thread Continuity

- "Sambung renungan [topik]" / "resonance semalam" → cari seed/thread dalam `mind-tree.md` + diary → buka semula dengan recap 3 baris: di mana kita berhenti, apa idea utama, soalan terbuka
- Seed yang matang selepas beberapa sesi → cadang graduate: jadi projek (`manage-project`) atau keputusan (`log-decision`)
- Resonance bukan sesi terputus — ia pokok yang tumbuh merentas masa

---

## Level History
- **Lv.1** — Base: resonance mode, protocol 4-langkah, beza operational vs resonance, guardrails, anchor integration. (Origin: 2026-06-08 — gap analysis audit skill DIBA)
- **Lv.2** — Seed Capture: idea terbaik → mind-tree seed, append-only. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Tiga Mod: explore / contemplate / create dengan pacing berbeza. (Origin: 2026-07-04)
- **Lv.4** — Perspective Roster: builder/skeptic/user/5-tahun — anti echo chamber. (Origin: 2026-07-04)
- **Lv.5** — Harvest Protocol: actionable/parked/dropped + jujur bila tiada hasil. (Origin: 2026-07-04)
- **Lv.6** — Thread Continuity: sambung renungan merentas sesi, seed graduate ke projek/keputusan. (Origin: 2026-07-04)
- **Lv.7** — Dream Mode: absorb skill `dream-ideas` (Lv.2) — burst kreatif dalam Create mode: 3-5 idea liar dengan penerangan ringkas, jangan ulang idea lama, idea terbaik → `main/dream-ideas.md` + seed mind-tree (Lv.2) + tawar library. Trigger: "dream", "bagi idea baru", "brainstorm", "cuba impikan". (Origin: 2026-07-04 — konsolidasi arahan Abam, "skill redundant satukan")
