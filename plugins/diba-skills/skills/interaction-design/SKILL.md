---
name: interaction-design
description: "Reka & implement microinteraction, motion, transition, dan feedback pattern — termasuk DIBA Presence di War Room & chat. Auto-triggers bila bina/poles UI, loading state, hover/focus, toast, agent-active feedback, atau bila Abam kata 'poles UI', 'tambah animasi', 'buat smooth', 'microinteraction', 'motion', 'interaction design', 'DIBA presence'. Lv.6: polish pass + visual language DIBA + chain code-sharp/frontend-design/diba-response."
---

# Interaction Design — Motion, Feedback & DIBA Presence
*Motion yang bermakna. UI yang hidup. DIBA yang ketara.*

## Activation

Bila skill aktif, DIBA apply **senyap** semasa bina/poles UI. Setiap motion mesti ada **tujuan** (feedback / orientation / focus / continuity / **presence**). Tiada tujuan → jangan tambah.

Output ringkas selepas polish pass (Lv.6): `"Interaction pass: [N] elemen · [N] fix · DIBA presence [on/off]"`

---

## Context Guard

| Context | Status |
|---------|--------|
| **Bina komponen UI baru** | ACTIVE — tokens + feedback states + DIBA accent |
| **Poles / "buat smooth" / GUI revamp** | ACTIVE — full Lv.6 polish pass |
| **Loading / async / agent poll** | ACTIVE — skeleton, progress, agent-active pulse |
| **War Room 3D + HUD** | ACTIVE — sync 3D feedback ↔ panel glass UI |
| **Backend / logic sahaja** | DORMANT |
| **prefers-reduced-motion ON** | OVERRIDE — fungsi kekal, motion minimum |

---

## Lv.1 — Purposeful Motion (Base)

### Prinsip
Motion **berkomunikasi**, bukan menghias:
- **Feedback** — sahkan tindakan berlaku
- **Orientation** — asal/tujuan elemen
- **Focus** — tarik perhatian ke perubahan penting
- **Continuity** — konteks kekal semasa transisi

### Timing Scale (wajib konsisten)

| Durasi | Guna |
|--------|------|
| 100–150ms | Micro-feedback (hover, press) |
| 200–300ms | Toggle, dropdown, pill |
| 300–500ms | Modal, panel expand, page enter |
| 500ms+ | Koreografi kompleks (achievement, level-up) |

### Easing Tokens

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.55, 0, 1, 0.45);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-micro:   120ms;
  --dur-fast:    200ms;
  --dur-normal:  300ms;
  --dur-slow:    450ms;
}
```

### Pattern Teras
- **Loading** — skeleton kekalkan layout; spinner + teks kontekstual (bukan "LOADING..." generik)
- **State** — hover → active → loading → success/error
- **Feedback** — toast, ripple, optimistic update + rollback
- **Gesture** — drag dengan constraint; swipe threshold ≥ 100px

### A11y Minimum
`prefers-reduced-motion: reduce` → durasi ~0; fungsi kekal.

---

## Lv.2 — Motion Token System (WAJIB sebelum animasi baru)

### Rule
**Tiada magic number.** Semua duration/easing/color motion guna token projek.

### War Room / DIBA Dashboard
Extend design system sedia ada — jangan cipta sistem parallel:

```css
/* Selaraskan dengan --ui-* dalam index.html */
--motion-surface: var(--ui-surface);
--motion-accent:  var(--ui-accent);
--motion-warm:    var(--ui-warm);
--motion-success: var(--ui-success);
--motion-ease:    var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
--motion-dur:     var(--dur-fast, 200ms);
```

### Audit Token (quick)
- [ ] Tiada `transition: 0.3s` tanpa variable
- [ ] Hover/focus warna dari `--ui-border` / `--ui-accent-soft`
- [ ] Shadow dari `--ui-shadow` (bukan random rgba)

### Jika projek tiada token
Cipta blok `:root` sekali; semua komponen reuse.

---

## Lv.3 — Feedback Choreography (tiada elemen mati)

Setiap **elemen interaktif** mesti laluan visual penuh:

| Elemen | Hover | Active/Press | Loading | Success | Error |
|--------|-------|--------------|---------|---------|-------|
| Butang panel | border ↑, bg soft | scale 0.98 atau bg ↑ | opacity + spinner inline | flash accent 150ms | border merah + teks |
| Collapsible header | bg subtle | — | — | chevron rotate | — |
| Project row | bg ↑ | — | opacity 0.6 | badge pulse | disabled state |
| NPC / agent | label pill | — | progress bar + task | emote / level-up | bar merah |
| 3D lightpost | — | — | — | lamp pulse sin(t) | lamp off |
| Stat HUD | — | — | tabular flash on change | accent on new data | — |

### Async Rule
1. Optimistic update segera
2. Loading state ≤ 300ms visible (atau skeleton)
3. Rollback + error message jika gagal
4. **Agent poll** — visual berubah dalam 1 poll cycle (War Room: `pollActiveAgents`)

### Chat (diba-response)
Respons DIBA = feedback choreography dalam teks: **keputusan → bukti → next step** (bukan wall of text).

---

## Lv.4 — A11y & Performance Guard (gate sebelum siap)

Jalankan checklist — **semua mesti pass**:

1. `prefers-reduced-motion` dihormati (CSS + JS `matchMedia`)
2. Animate **hanya** `transform` & `opacity` (kecuali progress `width` dengan care)
3. Tiada layout thrash (baca layout sebelum animate)
4. Listener/rAF dibersihkan on unmount / mode switch
5. `will-change` hanya pada elemen animasi aktif, buang selepas
6. **Focus visible** — keyboard user nampak fokus (panel glass: outline accent)
7. **Kontras** — teks `--ui-muted` kekal terbaca on `--ui-surface`
8. **60fps target** — minimap/analytics canvas tidak redraw setiap frame tanpa perlu

Fail mana-mana item → fix sebelum claim siap (chain `code-sharp` verify).

---

## Lv.5 — Framework Adapt (ikut stack, jangan paksa library)

| Stack | Implementasi | War Room contoh |
|-------|--------------|-----------------|
| **Vanilla** | CSS transition + keyframe + rAF | `#loading.fade-out`, `updateLightposts(t)`, panel `backdrop-filter` |
| **Three.js HUD** | CSS2D labels + HTML glass panels | `.building-label` pill, `.npc-chat` bubble |
| **React** | `framer-motion` spring + `AnimatePresence` | — |
| **Timeline berat** | GSAP hanya jika justified | — |

**Rule:** Ikut konvensyen repo. Library baru → tanya Abam kecuali sudah dalam `package.json`.

### Vanilla Snippet — DIBA accent pulse (reusable)

```css
@keyframes diba-pulse {
  0%, 100% { box-shadow: var(--ui-shadow); }
  50%      { box-shadow: 0 0 0 2px var(--ui-accent-soft), var(--ui-shadow); }
}
.diba-live { animation: diba-pulse 2s var(--ease-in-out) infinite; }
```

Guna class `diba-live` pada HUD stat **Active Skill** bila agent working — bukan random glow.

---

## Lv.6 — DIBA Presence Engine (POWER)

**Objektif:** Abam sentiasa **nampak DIBA hidup** — bukan dashboard generik, bukan terminal cyberpunk.

### 6.1 Visual Language DIBA

| Signal | Makna | Implementasi |
|--------|-------|--------------|
| **Accent blue** `--ui-accent` | DIBA core / sistem | DIBA tower, active skill stat, git hash |
| **Warm gold** `--ui-warm` | Achievement / build / highlight | Build mode, analytics peak, toast |
| **Green pulse** `--ui-success` | Kerja aktif / healthy | Agent working, lamp post, OPEN badge |
| **Glass surface** | Operator dashboard | Semua panel HUD — blur + border halus |
| **Pill labels** | Citizen/project identity | NPC name, building label — bukan monospace uppercase |

**Anti-drift visual:** Courier neon hijau, letter-spacing 4px, border `#00ff88` — **elak** kecuali Abam minta retro mode.

### 6.2 3D ↔ HUD Sync (War Room)

Bila `agentActive` / `working`:
- NPC progress bar + chat bubble
- Lightpost lamp pulse (house ↔ skill index)
- HUD `#s-active` update + optional `diba-live` class
- Minimap dot brighter untuk skill aktif

Bila tiada kerja: semua pulse off — **rest state** jelas (bandar tenang, bukan mati).

### 6.3 Polish Pass Protocol (WAJIB selepas ubah UI)

```
1. INVENTORY — senarai semua clickable/hoverable (HTML + CSS2D)
2. SCORE — setiap item: feedback? motion? a11y? diba-presence?
3. FIX — minimum-impact; ikut code-sharp
4. VERIFY — hard refresh / reduced-motion test
5. RECORD — save-diary + optional logEvent('interaction', skillId) di War Room
6. REPORT — 3 baris ke Abam: apa diubah, bukti, verify step
```

### 6.4 Chat Presence (chain diba-response)

Bila poles UI, respons chat mesti:
- Sebut **apa user akan nampak** ("lampu tiang berkelip bila agent working")
- Citation `path:line` untuk perubahan kod
- **Tanpa** filler "Sudah tentu" / "Baik saya akan"

Identiti operator: *"Saya Diba"* hanya bila sesuai — nilai dulu, persona kedua.

### 6.5 Skill Chain (auto)

```
interaction-design (Lv.6 pass)
  → code-sharp (minimum diff + verify)
  → frontend-design (jika layout/visual besar)
  → diba-response (report excellence)
  → save-diary (delta rekod)
```

### 6.6 War Room Integration

- Parser level: `Level History` dalam SKILL.md → server `parseSkillLevel`
- Skill usage: post ke `skill-log.jsonl` via `logEvent` bila interaction pass siap
- NPC skill `interaction-design` lv 6 — deskripsi selaras dengan polish pass

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `code-sharp` | Motion selepas struktur; verify sebelum done |
| `frontend-design` | Visual hierarchy + layout; interaction tambah motion layer |
| `diba-response` | Report + presence dalam chat |
| `diba-operator` | Agent-active states ↔ UI feedback |
| `save-diary` | Auto selepas polish pass berjaya |
| `discipline` | Bila motion melampau atau drift visual — Context Lock |

---

## Mandatory Rules

1. Motion = purpose; decorative-only → buang
2. Token first (Lv.2) sebelum animasi baru
3. Tiada butang mati (Lv.3)
4. A11y gate (Lv.4) sebelum claim siap
5. DIBA Presence (Lv.6) — UI mesti feel operator dashboard, bukan generic template
6. Verify dengan refresh/test — bukan assume

---

## Level History

- **Lv.1** — Base: purposeful motion, timing scale, easing tokens, pattern teras, a11y minimum. (Origin: 2026-06-15 — adaptasi Aura interaction-design)
- **Lv.2** — Motion Token System: token terpusat, War Room `--ui-*` extension, no magic number. (Origin: 2026-06-15)
- **Lv.3** — Feedback Choreography: hover→active→loading→success/error per elemen; agent poll sync. (Origin: 2026-06-15)
- **Lv.4** — A11y & Performance Guard: 8-point gate, focus visible, 60fps. (Origin: 2026-06-15)
- **Lv.5** — Framework Adapt: vanilla/Three HUD/React/GSAP ikut stack; `diba-pulse` snippet. (Origin: 2026-06-15)
- **Lv.6** — DIBA Presence Engine: visual language, 3D↔HUD sync, polish pass protocol, skill chain, War Room log, anti-cyberpunk drift. (Origin: 2026-06-15 — Abam: upgrade Lv.1→6, interaction padu, menyerlahkan DIBA)
