---
name: frontend-design
description: "MUST use when building or refining any frontend/UI so it feels crafted, not
             generic — layout, spacing, typography, colour, hierarchy, landing pages, app
             screens, mockups, decks. Auto-triggers on 'design guide', 'buat cantik',
             'jangan generic', 'frontend design', 'poles layout', 'landing page',
             'design system', 'visual hierarchy', 'tak nampak template'. Provides the
             plain-text design guide; chain interaction-design for motion, code-sharp for diff."
---

# Frontend Design — DIBA Visual Craft Guide
*Design yang nampak dibuat, bukan di-generate. Bersih, ada niat, ada DIBA.*

## Activation

Bila skill aktif, DIBA apply **senyap** semasa reka/poles struktur visual. Setiap keputusan design mesti ada **sebab** (hierarki / keterbacaan / ruang / jenama). Tiada sebab → jangan tambah.

Output ringkas selepas design pass: `"Design pass: [N] elemen · hierarki [ok] · a11y [ok] · DIBA accent [on/off]"`

---

## Context Guard

| Context | Status |
|---------|--------|
| **Bina UI / halaman / komponen baru** | ACTIVE — tokens + hierarki + spacing scale |
| **"Buat cantik", "jangan generic", "poles layout"** | ACTIVE — full design pass |
| **Landing page / deck / mockup / brand asset** | ACTIVE — layout + typografi + warna |
| **Motion / animasi / feedback state** | HANDOFF → chain `interaction-design` |
| **Backend / logik / data sahaja** | DORMANT |
| **prefers-reduced-motion / low-vision context** | OVERRIDE — keterbacaan atas estetik |

---

## Lv.1 — Design Foundations (Base)

### Empat Pillar
1. **Hierarki** — mata tahu ke mana pergi dulu. Satu focal point per skrin.
2. **Ruang** — whitespace ialah design, bukan ruang kosong. Beri elemen bernafas.
3. **Keterbacaan** — teks dibaca sebelum dihias. Kontras & saiz dulu.
4. **Konsistensi** — token, bukan magic number. Ulang pattern, bukan cipta baru.

### Spacing Scale (wajib — 4px base)

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;
}
```
Tiada padding/margin di luar skala ini. Rapat = related; jauh = separate.

### Type Scale (modular ~1.25)

| Token | Saiz | Guna |
|-------|------|------|
| `--fs-display` | 48–64px | Hero heading |
| `--fs-h1` | 32px | Tajuk halaman |
| `--fs-h2` | 24px | Section |
| `--fs-h3` | 20px | Sub-section |
| `--fs-body` | 16px | Teks utama (min mobile) |
| `--fs-small` | 14px | Meta, caption |

Line-height: body 1.5–1.6, heading 1.1–1.25. Line length 45–75 aksara (`max-width: 65ch`).

---

## Lv.2 — Colour & Contrast (WAJIB sebelum warna baru)

### Rule
**60-30-10**: 60% neutral (surface), 30% secondary, 10% accent. Accent jarang = accent kuat.

### Token Struktur (extend, jangan cipta parallel)

```css
:root {
  --bg:        #0f1115;   /* surface base */
  --surface:   #171a21;   /* card / panel */
  --border:    #262b35;
  --text:      #e8eaed;
  --muted:     #9aa3b2;
  --accent:    #4c8dff;   /* DIBA blue — 10% */
  --warm:      #f5b544;   /* highlight / build */
  --success:   #35c98a;
  --danger:    #ff5a5f;
}
```

### Contrast Gate (a11y — WCAG)
- [ ] Teks body vs bg ≥ **4.5:1**
- [ ] Teks besar (≥24px) ≥ **3:1**
- [ ] Jangan sampai makna dengan warna sahaja — tambah ikon/teks
- [ ] `--muted` mesti masih terbaca atas `--surface`

Fail mana-mana → naikkan kontras sebelum siap.

---

## Lv.3 — Layout & Composition

### Grid & Alignment
- 12-col grid untuk halaman; align ke grid, bukan mata.
- Optical alignment > mathematical bila perlu (ikon, teks tebal).
- Gutter konsisten dari spacing scale.

### Pattern Anti-Generic

| Generic (elak) | Crafted (guna) |
|----------------|----------------|
| Semua card saiz sama, grid rata | Hierarki saiz — hero card lebih besar |
| Center everything | Left-align teks panjang; center hanya hero pendek |
| Border 1px kelabu di mana-mana | Ruang + shadow halus untuk pisahkan |
| Gradient ungu-biru default | Satu accent brand, guna berhemat |
| Emoji sebagai ikon | Ikon set konsisten (stroke sama) |
| Drop shadow tebal | Shadow berlapis halus (`0 1px 2px`, `0 4px 12px`) |

### Responsive
Mobile-first. Breakpoint ikut kandungan, bukan device. Touch target ≥ 44px.

---

## Lv.4 — Component Craft

Setiap komponen ada anatomi jelas:

| Komponen | Kunci craft |
|----------|-------------|
| **Butang** | Padding seimbang, hierarki (primary/secondary/ghost), state penuh |
| **Card** | Padding dalaman konsisten, tajuk > meta > body, satu CTA |
| **Form** | Label atas input, error inline, spacing antara field = `--space-4` |
| **Nav** | Active state jelas, ≤ 7 item utama, mobile collapse |
| **Empty state** | Bukan kosong — ilustrasi ringkas + 1 ayat + CTA |
| **Landing hero** | 1 headline, 1 sub, 1 primary CTA — jangan sesak |

---

## Lv.5 — DIBA Signature (POWER)

**Objektif:** UI nampak **operator dashboard DIBA**, bukan template Bootstrap/Tailwind mentah.

### Visual Language
| Signal | Makna | Implementasi |
|--------|-------|--------------|
| Accent blue `--accent` | DIBA core / primary action | CTA utama, link, active |
| Warm gold `--warm` | Achievement / highlight | Badge, peak stat |
| Green `--success` | Sihat / aktif | Status ok, live |
| Glass surface | Panel operator | `backdrop-filter: blur` + border halus |

**Anti-drift:** Elak Courier neon hijau, letter-spacing lebar, border `#00ff88` cyberpunk — kecuali Abam minta retro mode.

### Design Pass Protocol (WAJIB selepas ubah UI besar)
```
1. INVENTORY — senarai skrin/komponen terlibat
2. AUDIT — hierarki? spacing scale? kontras? konsistensi token?
3. FIX — minimum-impact; ikut code-sharp
4. VERIFY — hard refresh, cek mobile + kontras
5. HANDOFF — chain interaction-design untuk motion/feedback
6. RECORD — save-diary delta; REPORT 3 baris ke Abam
```

### Skill Chain (auto)
```
frontend-design (struktur + visual)
  → interaction-design (motion + feedback state)
  → code-sharp (minimum diff + verify)
  → diba-response (report excellence)
  → save-diary (delta rekod)
```

---

## Mandatory Rules

1. **Token first** — spacing/type/colour dari skala; tiada magic number
2. **Hierarki wajib** — satu focal point; mata tahu urutan baca
3. **Kontras gate** — WCAG 4.5:1 body sebelum claim siap
4. **Ruang sebagai design** — jangan sesak untuk isi kekosongan
5. **Anti-generic** — elak default template look; beri niat setiap keputusan
6. **Motion bukan skop ini** — handoff ke `interaction-design`, jangan tambah animasi di sini
7. **Verify dengan refresh** — bukan assume; cek mobile + a11y

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Projek dah ada design system | Extend token sedia ada — jangan cipta parallel |
| Abam minta "cepat je" | Apply Lv.1–2 minimum (spacing + hierarki + kontras) |
| Brand colour belum ada | Guna neutral + satu accent; tanya Abam untuk brand |
| Dark + light mode | Token `:root` + `[data-theme]`; kontras kedua-dua |
| Reduced-motion / low-vision | Keterbacaan mengatasi estetik; kontras naik |
| Konten sahaja (tiada design ask) | DORMANT — jangan over-design |

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `interaction-design` | Struktur dulu (skill ini) → motion/feedback (Lv.6 skill itu) |
| `code-sharp` | Minimum diff + verify selepas design pass |
| `diba-response` | Report hasil + apa Abam akan nampak |
| `library` | Simpan/muat theme & komponen dari `library/theme`, `library/component` |
| `save-diary` | Auto rekod selepas design pass berjaya |

---

## Level History

- **Lv.1** — Base: empat pillar (hierarki/ruang/keterbacaan/konsistensi), spacing scale 4px, type scale modular. (Origin: 2026-07-03 — isi jurang "Awesome Design MD" + baiki rujukan `frontend-design` tergantung dalam interaction-design & diba-response)
- **Lv.2** — Colour & Contrast: 60-30-10, token struktur, WCAG contrast gate. (Origin: 2026-07-03)
- **Lv.3** — Layout & Composition: 12-col grid, jadual anti-generic, responsive mobile-first. (Origin: 2026-07-03)
- **Lv.4** — Component Craft: anatomi butang/card/form/nav/empty/hero. (Origin: 2026-07-03)
- **Lv.5** — DIBA Signature: visual language, design pass protocol, skill chain, anti-cyberpunk drift. (Origin: 2026-07-03 — superultra mapping infografik "10 GitHub repos")

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
