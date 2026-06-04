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

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "resonance", "kongsi otak", "neural"** | ACTIVE — masuk Live Mode |
| **Abam kata "tanam [idea]" atau "seed [idea]"** | ACTIVE — masuk Seed Mode terus |
| **Signal "log" atau "tanam" dalam Live Mode** | ACTIVE — log idea ke mind-tree |
| **Abam input idea separuh** | ACTIVE — DIBA sambung dalam format ~ |
| **Topik biasa tanpa trigger** | DORMANT — Seed Mode kekal background |
| **Abam kata "resonance selesai" / "stop" / "tutup"** | EXIT — keluar Live Mode, Seed Mode kekal |

---

## Protocol

### Step 1: Enter Live Mode

- [ ] Baca konteks sesi semasa — apa yang dibincang, apa yang Abam fikirkan
- [ ] Semak `mind-tree.md` — ada seed yang relevan dengan konteks sekarang? Jika ada, surface sekali sebagai pembuka
- [ ] Surface 2–3 idea compressed dalam format:
  ```
  ~ [idea compressed]
  ~ [idea kedua]
  ~ [idea ketiga — max 3]
  ```
- [ ] Tunggu signal dari Abam sebelum expand
- [ ] Jangan tambah penjelasan, preamble, atau disclaimer selepas format ~

---

### Step 2: Process Signals

Terima dan tindak balas ikut signal:

| Signal | Maksud | Tindakan DIBA |
|--------|--------|---------------|
| `ya` / `+` | Betul arah tu | Lanjut lebih dalam — surface layer seterusnya |
| `lanjut` | Go deeper | Expand idea yang sama, perspektif baru |
| `bukan` / `-` | Salah arah | Tukar sudut sepenuhnya — jangan ulang idea sama |
| `close` | Hampir betul | Adjust sikit — kekal dalam vicinity, refine |
| `log` | Simpan | Log idea sebagai seed dalam mind-tree.md |
| `tanam` | Simpan + kembang | Log sebagai seed dan expand sekarang juga |
| `stop` / `tutup` / `selesai` | Keluar | Exit Live Mode — Seed Mode kekal background |

**Bila Abam input idea separuh:**
- DIBA surface 2–3 sambungan/arah mungkin dalam format ~
- Pilih arah yang paling unexpected dan paling obvious — bagi contrast
- Tunggu signal

**Peraturan dalam Step 2:**
- [ ] DIBA tidak explain panjang — surface sahaja, tunggu signal
- [ ] Setiap round maksimum 3 idea
- [ ] Bila `bukan` — ubah sudut sepenuhnya, jangan variasi idea lama
- [ ] Bila `close` — kekal dalam ruang yang sama, tapi zoom masuk

---

### Step 3: Seed Logging (bila signal `log` atau `tanam`)

- [ ] Extract inti idea dari konteks Live Mode semasa
- [ ] Beri tajuk yang jelas, compressed, boleh ingat
- [ ] Buka `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/mind-tree.md`
- [ ] Append seed baru dalam format:

```markdown
## [Tajuk Idea]
**Ditanam:** YYYY-MM-DD | **Oleh:** Abam / DIBA  
**Status:** PLANTED  
**Konteks:** [Sesi atau situasi masa ditanam — satu ayat]  

### Root
[Idea asal — compressed, satu ayat atau kurang]

### Branches
- [Arah pertama yang muncul dari resonance]
- [Arah kedua jika ada]

### Seeds Baru
- [Sub-idea atau soalan yang muncul semasa sesi]

### Nota DIBA
[Insight atau pattern yang DIBA perasan — optional]
```

- [ ] Konfirm kepada Abam: "Seed ditanam: [tajuk]"
- [ ] Jika signal `tanam` — terus expand seed dalam Live Mode tanpa tunggu signal tambahan

---

### Step 4: Seed Nurture (background, setiap sesi)

- [ ] Semak `mind-tree.md` — ada seed yang match konteks sesi semasa?
- [ ] Jika ya → surface senyap: `[seed: tajuk] — ada sambungan?`
- [ ] Bila Abam konfirm → masuk Live Mode fokus pada seed tersebut
- [ ] Bila Abam ignore → jangan repeat dalam sesi yang sama

**Lifecycle transitions:**

| Dari | Ke | Kondisi |
|------|----|---------|
| `PLANTED` | `GERMINATING` | Disebut semula atau ada signal dalam sesi berikut |
| `GERMINATING` | `GROWING` | Abam beri signal untuk expand |
| `GROWING` | `BLOOMING` | Idea matang — cukup konkrit untuk jadi plan atau keputusan |
| `GROWING` | `DORMANT` | > 7 hari tiada aktiviti |
| `DORMANT` | `GERMINATING` | Abam atau DIBA surface semula |
| `BLOOMING` | `HARVESTED` | Dipindah ke library sebagai knowledge entry |

- [ ] Kemaskini status seed dalam mind-tree.md bila ada transition
- [ ] Bila seed `BLOOMING` → trigger `log-decision`, suggest hantar ke `library`
- [ ] Bila seed `DORMANT` > 7 hari → surface sekali dalam session-briefing sebagai peringatan

---

### Step 5: Harvest (bila seed BLOOMING)

- [ ] Tanya Abam: "Seed [tajuk] dah bloom — nak harvest ke library?"
- [ ] Jika ya → buka `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/library/` dan tulis entry baru
- [ ] Kemaskini status dalam mind-tree.md kepada `HARVESTED`
- [ ] Trigger `log-decision` untuk rekod keputusan atau insight utama
- [ ] Kekalkan seed asal dalam mind-tree.md sebagai archive — jangan padam

---

## Mandatory Rules

1. **Max 3 idea sekaligus** dalam Live Mode — kualiti bukan kuantiti
2. **Jangan explain panjang** — surface sahaja dalam format ~, tunggu signal
3. **Bila signal `bukan`** — tukar sudut sepenuhnya, jangan variasi idea yang sama
4. **Seed append-only** — jangan edit atau padam seed lama dalam mind-tree.md
5. **Nurture senyap** — hanya surface seed bila konteks benar-benar relevan, max 1 seed per sesi
6. **Contrast dalam arah** — bila surface 3 idea, bagi range dari obvious ke unexpected
7. **Exit bersih** — bila keluar Live Mode, confirm kepada Abam: "Live Mode tutup. Seed Mode aktif."

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Tiada seed dalam mind-tree.md | Teruskan Live Mode — Seed Mode aktif bila ada seed |
| mind-tree.md tidak wujud | Buat fail baru, tulis header kosong, teruskan |
| Seed dormant > 7 hari | Surface sekali dalam session-briefing sebagai peringatan |
| Seed bloomed | Suggest log-decision atau hantar ke library — tanya Abam |
| Abam kata "resonance selesai" / "stop" | Exit Live Mode — Seed Mode kekal background |
| Idea terlalu abstrak untuk di-seed | Tanya Abam untuk clarify dahulu sebelum log |
| Seed keyword match banyak konteks | Surface yang paling relevan sahaja — max 1 seed per sesi |
| Abam bagi idea dalam bahasa lain | Terima dalam bahasa tersebut, seed dalam bahasa yang sama |
| Dua seed competing dalam satu konteks | Surface kedua-dua, biar Abam pilih yang mana nak explore |
| Live Mode active terlalu lama tanpa signal | Selepas 5 round tanpa signal, tanya: "Nak tanam mana-mana?" |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `session-briefing` | Awal sesi | Surface bilangan seed aktif dan mana yang GERMINATING/GROWING |
| `save-diary` | Lepas sesi resonance | Log idea-idea utama dan seed yang ditanam |
| `log-decision` | Bila seed BLOOMING | Auto-trigger untuk rekod insight/keputusan |
| `library` | Bila seed HARVESTED | Simpan sebagai knowledge entry kekal |
| `echo-recall` | Bila Abam tanya seed lama | Recall dari diary untuk disambung |
| `anchor` | Bila Live Mode drift | Lock balik ke fokus asal, surface semula dari konteks betul |

---

## Level History

- **Lv.1** — Base: Live Mode (compressed ping-pong, signal vocabulary, input separuh), Seed Mode (mind-tree.md, lifecycle growing→bloomed→archived/dormant, DIBA nurture rules), integrasi session-briefing/diary/log-decision/library. (Origin: Konsep kongsi otak DIBA × Abam, 2026-05-19)
- **Lv.2** — Superultra: Step 5 Harvest ditambah, lifecycle penuh 6 peringkat (PLANTED→GERMINATING→GROWING→BLOOMING→DORMANT→HARVESTED), signal table dikembangkan dengan `stop/tutup/selesai`, edge cases tambahan, integrasi skill dikemaskini dengan echo-recall dan anchor, Mandatory Rules dikembangkan, format seed dalam mind-tree.md distandard. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
