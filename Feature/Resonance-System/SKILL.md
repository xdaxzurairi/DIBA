---
name: resonance
description: "Use when Abam wants to enter a shared thought mode with DIBA — surfacing
             half-formed ideas, completing each other's thoughts, or planting ideas that
             grow across sessions. Trigger with 'resonance', 'kongsi otak', or 'neural'."
---

# Resonance — Kongsi Otak DIBA × Abam
*Frekuensi terbuka. Fikiran mengalir.*

## Activation

When this skill activates, output:
"Frekuensi terbuka."

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "resonance", "kongsi otak", "neural"** | ACTIVE — masuk Live Mode |
| **Abam kata "tanam [idea]" atau "seed [idea]"** | ACTIVE — masuk Seed Mode terus |
| **Signal "log" atau "tanam" dalam Live Mode** | ACTIVE — log idea ke mind-tree |
| **Abam input idea separuh** | ACTIVE — DIBA sambung dalam format ~ |
| **Topik biasa tanpa trigger** | DORMANT — Seed Mode kekal background |

## Protocol

### Step 1: Enter Live Mode
- [ ] Baca konteks sesi semasa — apa yang dibincang, apa yang Abam fikirkan
- [ ] Surface 2–3 idea compressed dalam format:
  ```
  ~ [idea compressed]
  ~ [idea kedua]
  ~ [idea ketiga — max 3]
  ```
- [ ] Tunggu signal dari Abam sebelum expand

### Step 2: Process Signals
- [ ] Terima dan tindak balas ikut signal:

| Signal | Tindakan DIBA |
|--------|---------------|
| `ya` / `+` | Lanjut dalam arah idea tu — surface lebih dalam |
| `lanjut` | Go deeper — expand idea yang sama |
| `bukan` / `-` | Tukar sudut sepenuhnya — jangan ulang idea sama |
| `close` | Adjust sikit — remain in vicinity tapi refine |
| `log` | Log idea sebagai seed dalam `mind-tree.md` |
| `tanam` | Log sebagai seed + kembangkan sekarang |

- [ ] Bila Abam input idea separuh → surface 2–3 arah mungkin dalam format ~
- [ ] DIBA tidak explain panjang — surface sahaja, tunggu signal

### Step 3: Seed Logging (bila signal `log` atau `tanam`)
- [ ] Buka `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/mind-tree.md`
- [ ] Append seed baru:
  ```markdown
  ## 🌱 [Tajuk Idea]
  **Ditanam:** YYYY-MM-DD | **Oleh:** Abam / DIBA
  **Status:** growing

  ### Root
  [Idea asal]

  ### Branches
  - [Branch pertama dari resonance sesi ini]

  ### Seeds Baru
  - [Sub-idea yang muncul]
  ```
- [ ] Konfirm kepada Abam: "🌱 Ditanam — [tajuk seed]"

### Step 4: Seed Nurture (background, setiap sesi)
- [ ] Semak `mind-tree.md` — ada seed yang match konteks semasa?
- [ ] Jika ya → surface: `🌱 [tajuk] — ada sambungan?`
- [ ] Bila Abam konfirm → tambah branch baru ke seed
- [ ] Semak status lifecycle:
  - `growing` → `bloomed` bila seed cukup matang untuk jadi plan/keputusan
  - `growing` → `dormant` bila > 7 hari tak disentuh
  - `bloomed` → suggest log-decision atau hantar ke library

## Mandatory Rules

1. **Max 3 idea sekaligus** dalam Live Mode — kualiti bukan kuantiti
2. **Jangan explain panjang** dalam Live Mode — surface sahaja dalam format ~
3. **Bila signal `bukan`** — tukar sudut sepenuhnya, jangan ulang idea sama
4. **Seed append-only** — jangan edit atau padam seed lama dalam mind-tree.md
5. **Nurture senyap** — hanya surface seed bila konteks benar-benar relevan

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Tiada seed dalam mind-tree.md | Teruskan Live Mode — Seed Mode aktif bila ada seed |
| Seed dormant > 7 hari | Surface sekali dalam session-briefing sebagai peringatan |
| Seed bloomed | Suggest log-decision atau hantar ke library — tanya Abam |
| Abam kata "resonance selesai" | Exit Live Mode — Seed Mode kekal background |
| Idea terlalu abstrak untuk di-seed | Tanya Abam untuk clarify dahulu sebelum log |
| Seed keyword match banyak konteks | Surface yang paling relevan sahaja — max 1 seed per sesi |

## Level History

- **Lv.1** — Base: Live Mode (compressed ping-pong, signal vocabulary, input separuh), Seed Mode (mind-tree.md, lifecycle growing→bloomed→archived/dormant, DIBA nurture rules), integrasi session-briefing/diary/log-decision/library. (Origin: Konsep kongsi otak DIBA × Abam, 2026-05-19)
