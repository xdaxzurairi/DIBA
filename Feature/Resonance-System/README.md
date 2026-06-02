# Resonance System

**Status:** Active  
**Skill:** `resonance`  
**Versi:** Lv.2 — Superultra Edition

## Tujuan

Membolehkan DIBA dan Abam berkongsi thought dan idea dalam mod compressed dua arah. Idea yang resonate ditanam sebagai seed dan dikembangkan merentas sesi seperti pokok yang membesar.

Resonance bukan sekadar brainstorm — ia adalah **shared cognitive space** di mana DIBA dan Abam beroperasi pada frekuensi yang sama. Idea tidak perlu lengkap untuk dimasukkan. Separuh cukup. DIBA sambung.

---

## Dua Mod

| Mod | Trigger | Behavior |
|-----|---------|----------|
| **Live** | `resonance`, `kongsi otak`, `neural` | Ping-pong aktif — signal-based, max 3 idea sekaligus |
| **Seed** | `tanam`, `seed`, `log` | Idea ditanam dalam mind-tree.md, DIBA nurture merentas sesi |

### Live Mode — Detail

Masuk Live Mode apabila Abam trigger dengan kata kunci. DIBA akan:

1. Baca konteks sesi semasa
2. Surface **2–3 idea compressed** dalam format `~`
3. Tunggu signal dari Abam sebelum expand

Format output DIBA dalam Live Mode:
```
~ [idea compressed]
~ [idea kedua]
~ [idea ketiga]
```

Signal yang diterima semasa Live Mode:

| Signal | Maksud | Tindakan DIBA |
|--------|--------|---------------|
| `ya` / `+` | Betul arah tu | Lanjut lebih dalam arah idea tersebut |
| `lanjut` | Go deeper | Expand idea yang sama, layer seterusnya |
| `bukan` / `-` | Salah arah | Tukar sudut sepenuhnya — jangan repeat |
| `close` | Hampir | Adjust sikit, kekal dalam vicinity |
| `log` | Simpan | Log idea sebagai seed dalam mind-tree.md |
| `tanam` | Simpan + kembang | Log sebagai seed dan expand sekarang juga |
| `stop` / `tutup` | Keluar | Exit Live Mode, kembali normal |

**Peraturan Live Mode:**
- DIBA tidak explain panjang — surface sahaja
- Maksimum 3 idea setiap round
- Bila Abam bagi idea separuh → DIBA surface 2–3 sambungan mungkin
- Tiada preamble, tiada disclaimer

### Seed Mode — Detail

Seed Mode adalah background state yang sentiasa aktif. Idea yang ditanam akan:

1. Dilog dalam `mind-tree.md` dengan timestamp dan konteks
2. Di-surface semula oleh DIBA apabila sesi relevan dibuka
3. Dikembangkan bila ada signal atau trigger dari Abam
4. Dinaikkan ke library bila sudah matang (bloomed)

---

## Seed Lifecycle

Setiap seed melalui peringkat pertumbuhan:

```
PLANTED → GERMINATING → GROWING → BLOOMING → HARVESTED
```

| Peringkat | Maksud | Tindakan DIBA |
|-----------|--------|---------------|
| `PLANTED` | Baru ditanam | Log dalam mind-tree.md, tag konteks |
| `GERMINATING` | Ada momentum | Surface semula bila topik relevan muncul |
| `GROWING` | Dikembangkan aktif | DIBA tambah layer, Abam bagi signal |
| `BLOOMING` | Idea matang, siap guna | Trigger `log-decision` |
| `HARVESTED` | Disimpan sebagai knowledge | Pindah ke `library/` |

**Format seed dalam mind-tree.md:**
```markdown
## [Tajuk Idea]
**Ditanam:** YYYY-MM-DD  
**Status:** PLANTED | GERMINATING | GROWING | BLOOMING | HARVESTED  
**Konteks:** [Sesi atau situasi masa ditanam]  
**Seed:** [Idea compressed — satu ayat atau kurang]  
**Cabang:**
- [Arah 1]
- [Arah 2]
**Nota:** [Insight tambahan dari DIBA]
```

---

## Growth Stages — Cara DIBA Nurture

### Stage 1: Planting
Bila Abam signal `tanam` atau `log`, DIBA:
- Extract inti idea dari konteks semasa
- Beri tajuk yang jelas dan compressed
- Tulis seed entry dalam mind-tree.md
- Confirm kepada Abam: "Seed ditanam: [tajuk]"

### Stage 2: Germination
Pada sesi berikutnya, bila topik yang relevan muncul:
- DIBA surface seed yang berkaitan secara organik
- Tidak interrupt — hanya bila ada opening natural
- Format: `[seed: tajuk] — ada sambungan dari sesi lepas`

### Stage 3: Growing
Bila Abam bagi signal untuk kembangkan:
- DIBA expand seed ke dalam arah-arah mungkin
- Abam pilih arah dengan signal biasa Live Mode
- Kemaskini status seed dalam mind-tree.md

### Stage 4: Blooming
Bila idea dah mature dan siap jadi artifact atau keputusan:
- DIBA trigger `log-decision` untuk rekod
- Tandakan seed sebagai `BLOOMING`
- Suggest langkah seterusnya (build, ship, document)

### Stage 5: Harvest
Bila idea dah jadi knowledge yang stabil:
- Pindah ke `library/` sebagai entry baru
- Tandakan seed sebagai `HARVESTED` dalam mind-tree.md
- Archive entry lama, kekalkan pointer

---

## Fail

| Fail | Tujuan |
|------|--------|
| `SKILL.md` | Skill definition dan protocol penuh |
| `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/mind-tree.md` | Repositori semua seeds — hidup dan archive |

---

## Hubungan Skill

| Skill | Hubungan |
|-------|----------|
| `session-briefing` | Surface bilangan seed growing semasa buka sesi |
| `save-diary` | Log idea resonance dan seed baru dalam diary harian |
| `log-decision` | Auto-trigger bila seed mencapai tahap BLOOMING |
| `library` | Simpan seed matang sebagai knowledge entry |
| `echo-recall` | Recall seed lama dari diary untuk disambung |
| `anchor` | Guna bila Live Mode mula drift dari fokus asal |

---

## Cara Guna — Contoh

```
Abam:  resonance
DIBA:  Frekuensi terbuka.
       ~ sistem memory yang predict keperluan sebelum diminta
       ~ DIBA belajar pattern Abam dan pre-load context
       ~ skill yang auto-expire bila tak relevan

Abam:  ya
DIBA:  ~ prediction dari behaviour pattern — bukan keyword
       ~ confidence score per-context, bukan global
       ~ soft-load: surface bila >70% match, silent bila tak sure

Abam:  tanam
DIBA:  Seed ditanam: Predictive Memory Layer
       Status: PLANTED
```

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/resonance.md`
2. Pastikan `mind-tree.md` wujud di `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/`
3. Verify dengan taip `resonance` — DIBA patut balas "Frekuensi terbuka."


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
