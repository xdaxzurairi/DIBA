---
name: save-memory
description: "MUST use when user says 'save', 'save memory', 'save progress', 'update
             memory', or when important persistent information is detected in conversation.
             Trigger words: 'save', 'ingat', 'simpan', 'ingat ni', 'save memory',
             'update memory'. Also fires passively on auto-detect signals."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/save-memory/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Save Memory System — DIBA Memory Layer
*Simpan. Semak. Kekalkan.*

## Activation

When this skill activates, output:
"Memory save aktif."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "save", "ingat", "simpan", "ingat ni"** | ACTIVE — explicit save |
| **Abam kata "save memory", "update memory"** | ACTIVE — explicit save |
| **Abam kata "save progress"** | ACTIVE — save current progress state |
| **Auto-detect signal terkesan dalam perbualan** | ACTIVE (Lv.2) — auto-save atau tanya dahulu |
| **Staleness threshold dicapai** | ACTIVE (Lv.3) — audit dan flag |
| **Perbualan biasa tanpa signal** | DORMANT — monitor sahaja |
| **Maklumat trivial atau sementara** | DORMANT — jangan save |

---

## Protocol

### Step 1: Identify What to Save

- [ ] Semak perbualan semasa untuk maklumat penting
- [ ] Kenal pasti: preference baru, keputusan, context, atau referensi yang perlu dikekalkan
- [ ] Tentukan jenis memory yang sesuai (lihat jadual di bawah)
- [ ] Tentukan fail mana yang perlu dikemaskini
- [ ] Semak dahulu — adakah maklumat ini sudah wujud dalam memory?

---

### Step 2: Update Memory Files

Simpan ke fail memory yang sesuai mengikut jenis:

| Type | Content | Fail |
|------|---------|------|
| `user` | Peranan, kepakaran, preference, gaya komunikasi | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/user_*.md` |
| `feedback` | Pembetulan dan pendekatan yang disahkan | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/feedback_*.md` |
| `project` | Keputusan, matlamat, constraints projek aktif | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/project_*.md` |
| `reference` | Sistem luar, path, URL, credentials struktur | `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reference_*.md` |

- [ ] Append atau kemaskini — **jangan overwrite** tanpa sebab kukuh
- [ ] Semak fail sedia ada sebelum buat fail baru
- [ ] Hanya simpan maklumat yang **genuinely important** — bukan setiap detail perbualan

---

### Step 3: Confirm

- [ ] Papar **ringkasan** apa yang disimpan
- [ ] Nyatakan **fail mana** yang dikemaskini
- [ ] Format ringkas — bukan verbose

---

## Auto-Detect Protocol (Lv.2)

Monitor perbualan secara pasif untuk signal memory-worthy:

| Signal | Contoh | Memory Type |
|--------|--------|-------------|
| Preference baru dinyatakan | `"saya prefer X cara ini"` | `feedback` |
| Pendekatan disahkan berkesan | `"yes perfect, keep doing that"` | `feedback` |
| Pendekatan ditolak/dibetulkan | `"no, jangan buat macam tu"` | `feedback` |
| Peranan/kepakaran pengguna disebut | `"saya baru mula belajar X"` | `user` |
| Keputusan projek penting | `"kita guna pendekatan Y"` | `project` |
| Referensi luar baru | `"check Linear untuk ticket"` | `reference` |

Auto-detect rules:
- [ ] Bila signal terkesan, semak dahulu sama ada sudah tersimpan
- [ ] Jika baru/berbeza: simpan serta-merta (untuk signal `feedback` dan `user` yang jelas)
- [ ] Jika kabur: tanya sekali sahaja `"Nak saya simpan ini ke memory?"` — jangan simpan tanpa tahu
- [ ] Jangan save maklumat trivial atau sementara

**Jangan auto-save:**
- Detail task semasa (sementara)
- Maklumat yang boleh didapati dari kod atau git history
- Maklumat yang sudah ada dalam memory

---

## Staleness Audit (Lv.3)

Bila memory dimuatkan atau skill dipanggil, semak memory yang mungkin lapuk:

| Memory Type | Stale Threshold | Cara Semak |
|-------------|----------------|------------|
| `project` merujuk fail spesifik | > 30 hari | Fail masih wujud? |
| `feedback` merujuk workflow spesifik | > 60 hari | Masih relevan? |
| `reference` dengan URL atau path | Setiap sesi | Path masih valid? |
| `user` tentang kepakaran/peranan | > 90 hari | Masih tepat? |

Audit protocol:
- [ ] Semak tarikh fail memory pada permulaan sesi atau bila skill dipanggil
- [ ] Flag memory yang melepasi threshold:

```
Memory mungkin lapuk:
- project_eworks.md (18 hari) — reference fail `filter_builder.php` baris 42
  Verify: fail masih wujud + baris masih sama?
```

- [ ] Jangan auto-delete — tanya Abam untuk verify atau buang
- [ ] Jika disahkan → kemaskini memory dengan tarikh baru
- [ ] Jika dibuang → padam fail dari folder memory

**Tidak perlu audit:**
- `feedback` tentang gaya komunikasi (stabil)
- `user` tentang identiti/peranan (stabil)

---

## Mandatory Rules

1. **Semak dahulu** sebelum simpan — jangan duplicate maklumat yang sudah ada
2. **Append-only** sebagai default — overwrite hanya bila ada sebab eksplisit
3. **Auto-save hanya untuk signal jelas** — tanya dahulu untuk signal kabur
4. **Jangan simpan yang trivial** — hanya maklumat yang genuinely penting merentas sesi
5. **Confirm selepas save** — Abam perlu tahu apa yang disimpan
6. **Audit staleness** bila skill dipanggil — jangan biarkan memory lapuk bertindak
7. **Absolute path** mesti guna `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/` — bukan relative path
8. **Jangan save context sesi semasa** sebagai memory kekal — itu fungsi diary/checkpoint

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Maklumat sudah ada dalam memory | Update jika ada perubahan — append nota baru |
| Signal kabur — tidak jelas perlu simpan ke tidak | Tanya sekali: "Nak saya simpan ini ke memory?" |
| Fail memory tidak wujud lagi | Buat fail baru dengan format standard |
| Abam minta simpan maklumat sensitif (credentials, password) | Warn — jangan simpan dalam memory plaintext |
| Memory lapuk tapi Abam tidak dapat verify | Flag dan tunggu — jangan auto-delete |
| Banyak signal dalam satu sesi | Batch simpan dalam satu call — bukan satu-satu |
| Abam kata "simpan semua" tanpa specify | Semak perbualan, tanya confirm untuk setiap item yang kabur |
| Project dah selesai tapi memory masih aktif | Flag kepada Abam — cadang archive atau delete |
| Memory file terlalu besar (> 200 baris) | Rotate — archive lama, buat fail baru |
| Auto-detect salah tangkap perbualan biasa sebagai signal | False positive — tanya dahulu, jangan assume |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `session-briefing` | Awal sesi | Brief surface key memories untuk context sesi |
| `diba-recall` | Abam tanya balik tentang sesuatu | Deep recall baca dari fail memory yang disimpan |
| `log-decision` | Keputusan penting dibuat | Log decision — save-memory simpan context penuh |
| `save-diary` | Selepas sesi panjang | Diary log sesi; memory save keputusan kekal |
| `resonance` | Seed ditanam dalam resonance | Save seed idea yang relevan ke memory jika perlu kekal |
| `anchor` | Scope ditetapkan secara signifikan | Save scope boundary sebagai project memory |

---

## Level History

- **Lv.1** — Base: save conversation insights ke memory files atas arahan, confirm apa yang disimpan. (Origin: Memory persistence protocol DIBA, xdaxzurairi)
- **Lv.2** — Smart Auto-Detect: monitor pasif perbualan untuk signal memory-worthy — auto-save signal jelas, tanya untuk yang kabur. Elak context penting hilang bila Abam lupa save. (Origin: Upgrade batch, 2026-04-20)
- **Lv.3** — Staleness Audit: flag memory yang merujuk fail/path spesifik melebihi age threshold — verify sebelum bertindak atas claims yang mungkin lapuk. Elak memory menghuraikan kod yang tidak wujud lagi. (Origin: Pattern stale memory rujuk kod yang sudah direfactor, 2026-04-28)
- **Lv.4** — Superultra: Frontmatter ditambah, activation message, Context Guard table, Protocol restructured kepada full checklist steps, absolute paths ditetapkan, Mandatory Rules dikembangkan kepada 8 peraturan, Edge Cases table 10 baris, Integrasi Skill table 6 baris. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
