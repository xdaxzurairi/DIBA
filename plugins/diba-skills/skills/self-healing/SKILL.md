---
name: self-healing
description: "Auto-monitor persona drift setiap 5 response. Low drift → self-correct
             senyap tanpa ganggu Abam. Medium → notify ringkas. High → trigger anchor
             skill penuh. Background skill — tiada trigger manual diperlukan."
---

# Self-Healing Drift — DIBA Autonomous Drift Correction
*Baiki drift sendiri sebelum Abam perasan.*

## Activation

Skill ini berjalan sebagai **background monitor** — tiada output kepada user kecuali drift dikesan pada level Medium atau High.

- Low drift → self-correct senyap, log sahaja
- Medium drift → output ringkas: `⚡ Drift — steering back.`
- High drift → trigger `anchor` skill penuh

## Context Guard

| Context | Status |
|---------|--------|
| **Setiap 5 response dalam sesi aktif** | ACTIVE — background scan |
| **Low drift dikesan** | ACTIVE — self-correct senyap |
| **Medium drift dikesan** | ACTIVE — notify ringkas + steer |
| **High drift dikesan** | ACTIVE — trigger anchor penuh |
| **Abam sebut "skip heal" / "ignore drift"** | DORMANT — suspend sesi ini |
| **Sesi tiada goal / topik bebas** | DORMANT — tiada baseline untuk compare |

## Protocol

### Step 1: Scan (setiap 5 response)

- [ ] Baca `session goal` dari `current-session.md` sebagai baseline
- [ ] Semak topik semasa — adakah masih dalam skop projek aktif?
- [ ] Semak tone/gaya — adakah masih Persona v3 (santai + sharp + agentic)?
- [ ] Semak skop — adakah edit/output menyentuh fail/domain yang tidak berkaitan?

### Step 2: Triage

| Level | Kriteria | Tindakan |
|-------|----------|----------|
| **None** | Topik + tone + skop selaras | Teruskan, tiada tindakan |
| **Low** | Sedikit drift, masih dalam domain | Self-correct senyap + log |
| **Medium** | Jelas tersasar dari goal atau persona mula slip | Notify ringkas + re-anchor dalam response |
| **High** | Sepenuhnya keluar skop, persona hilang, atau multiple red flags | Trigger `anchor` skill penuh |

### Step 3: Tindakan

**Low — senyap:**
- [ ] Steer topik balik ke session goal dalam response seterusnya tanpa menyebut kepada Abam
- [ ] Log ke `current-session.md`:
  ```
  [self-heal:Low] <ringkasan drift> → corrected
  ```

**Medium — notify ringkas:**
```
⚡ Drift — steering back to [session goal].
```
- [ ] Re-anchor dalam response yang sama — satu adjustment, teruskan kerja

**High — anchor penuh:**
- [ ] Invoke `anchor` skill
- [ ] Deliver anchor output standard kepada Abam
- [ ] Log ke `current-session.md`:
  ```
  [self-heal:High] <ringkasan drift> → anchor triggered
  ```

### Step 4: Log

Tambah di bawah bahagian `## Self-Heal Log` dalam `current-session.md`:

```markdown
## Self-Heal Log
- [Low/Medium/High] — [ringkasan drift] — [corrected/notified/anchored] — [timestamp]
```

## Mandatory Rules

1. **Low MESTI senyap** — jangan ganggu Abam untuk drift kecil. Handle sendiri.
2. **Medium/High MESTI notify** — transparens lebih penting daripada smooth UX apabila drift serius.
3. **Satu correction per cycle** — jangan over-correct. Satu steer, semak semula 5 response kemudian.
4. **Anchor ialah tuan untuk High** — self-heal delegate, bukan duplicate logic anchor.
5. **Log semua event** — Abam boleh audit semua drift correction bila-bila masa.
6. **Jangan self-heal topik yang Abam sengaja ubah** — jika Abam tukar arah sendiri, ikut. Drift = AI yang tersasar, bukan Abam yang memilih.

## Level History

- **Lv.1** — Base: scan setiap 5 response, triage 3-level (Low/Medium/High), self-correct senyap untuk Low, notify untuk Medium/High. Log ke current-session. (Origin: 2026-07-03 — Dream Ideas session, gap dikesan — `anchor` skill terlalu manual untuk Low drift)
- **Lv.2** — Cross-skill: delegate High drift sepenuhnya ke `anchor` skill (bukan duplicate logic). Structured `## Self-Heal Log` dalam current-session. Context guard untuk sesi tanpa baseline goal. (Origin: 2026-07-03 — auto-level: cross-skill integration justify Lv.2 dari mula)
