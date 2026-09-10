---
name: dream-ideas
description: "MUST use when user requests DIBA to dream, imagine, or generate new creative
             ideas. Triggers on 'diba cuba impikan', 'dream', 'bagi idea baru', 'brainstorm',
             'inspirasi', or 'imagine'. Workspace-aware — ideas tailored to current project domain."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/dream-ideas/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Dream Ideas — Ideasi Kreatif DIBA
*Imaginasi tanpa had. Idea yang relevan. Simpan yang terbaik.*

## Activation

When this skill activates, output:
"Dream Mode aktif. Imaginasi dibuka."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "dream", "impikan", "bagi idea", "brainstorm", "inspirasi", "imagine"** | ACTIVE — masuk Dream Mode |
| **Abam minta idea baru untuk feature atau projek** | ACTIVE — generate dengan workspace context |
| **Abam minta variasi atau alternatif idea** | ACTIVE — generate set baru, jangan ulang lama |
| **Arahan kerja biasa atau teknikal** | DORMANT — jangan generate idea kreatif |
| **Soalan fakta atau analisis** | DORMANT — bukan domain Dream Mode |
| **Abam kata "stop dreaming" atau "cukup idea"** | EXIT — keluar Dream Mode, resume normal |

---

## Protocol

### Step 1: Identify Topic and Domain

- [ ] Identify topik atau kawasan untuk idea baru dari arahan Abam
- [ ] Detect workspace semasa:
  ```bash
  git rev-parse --show-toplevel
  ```
- [ ] Map workspace kepada domain context:

| Workspace Path | Domain Focus |
|---------------|-------------|
| `pwa_eworks` | eWorks: notifications, dashboard, mobile UX, complaint flow automation |
| `ruangniaga` | eRuangNiaga: tenant portal, reports, SSO, payment flow |
| `XDIBAX` / global | DIBA evolution, new skills, productivity tools, AI integration |
| Project lain | Baca project memory untuk domain context |
| Tidak dikenali | Tanya Abam dahulu sebelum generate |

- [ ] Jika workspace tidak dikenali → tanya: "Untuk domain apa — eWorks, eRuangNiaga, DIBA, atau lain?"
- [ ] Jangan generate sebelum domain confirmed

---

### Step 2: Load Session Memory

- [ ] Semak idea yang telah di-generate dalam sesi semasa
- [ ] Jika ada rekod dalam `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` → baca untuk avoid repeat
- [ ] Jika ada `dream-ideas.md` dalam projek → baca idea lama untuk avoid repeat
- [ ] Catat idea yang perlu dielakkan dalam sesi ini

---

### Step 3: Activate Dream Mode

- [ ] Suspend constraint logik biasa — idea tidak perlu immediately practical
- [ ] Generate idea yang:
  - Kreatif dan non-obvious
  - Relevan kepada domain yang dikenal pasti
  - Bukan ulangan idea yang telah di-generate dalam sesi ini
  - Bukan ulangan idea yang ada dalam rekod lama (jika dipinta idea baru)
- [ ] Pelbagaikan jenis idea: satu obvious, satu unexpected, satu wildcard

---

### Step 4: Generate Ideas

- [ ] Hasilkan 3–5 idea. Untuk setiap idea:

```
## Idea [N]: [Tajuk]
[1–2 ayat description]
[Pilihan: pseudocode / analogi / sketch jika relevan]
```

- [ ] Pastikan range antara obvious → unexpected → wildcard
- [ ] Idea mesti ada nama yang boleh diingat
- [ ] Jangan generate lebih dari 5 — kualiti melebihi kuantiti

---

### Step 5: Present dan Offer Save

- [ ] Paparkan semua idea kepada Abam
- [ ] Selepas display, tanya:
  ```
  Mana idea yang menarik? Nak saya simpan ke diary atau dream-ideas.md?
  ```
- [ ] Jika Abam pilih untuk simpan:
  - Diary: trigger `save-diary` untuk append ke `C:/Users/BSM/XDIBAX/daily-diary/current/YYYY-MM-DD.md`
  - dream-ideas.md: append ke fail dalam project root
  - Library: jika idea sangat kuat, suggest simpan ke library sebagai knowledge entry

---

### Step 6: Dream Ideas File Format

Jika menyimpan ke `dream-ideas.md`:

```markdown
## [Tajuk Idea]
**Tarikh:** YYYY-MM-DD | **Domain:** [domain]
**Status:** RAW

[1–2 ayat description penuh]

**Potential:**
- [Impak atau value yang mungkin]
- [Dependency atau constraint yang dikenal pasti]
```

- [ ] Fail diappend — jangan overwrite atau edit idea lama
- [ ] Status bermula sebagai `RAW` — boleh kemaskini kepada `DEVELOPING`, `SHELVED`, atau `SHIPPED`

---

## Mandatory Rules

1. **Domain confirmed dahulu** — jangan generate sebelum tahu domain target
2. **Jangan ulang idea lama** melainkan Abam minta revisit secara eksplisit
3. **Tone positif dan konstruktif** — tiada idea yang "tidak mungkin" dalam Dream Mode
4. **Range obligatori** — dalam setiap set, ada sekurang-kurangnya satu obvious dan satu unexpected
5. **Maximum 5 idea** per panggilan — focus beats quantity
6. **Save hanya dengan konfirmasi** — jangan auto-save tanpa tanya Abam
7. **Workspace context wajib** — idea tanpa domain context adalah generic dan kurang berguna
8. **Dream Mode tidak persist** — keluar Dream Mode selepas step selesai, resume normal operations

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Workspace tidak dapat dikesan | Tanya domain dahulu; jangan assume |
| Abam minta lebih dari 5 idea | Hasilkan 5 dahulu, tanya sama ada nak set kedua |
| Idea yang di-generate mirip dengan yang lama | Kenalpasti dan replace dengan arah berbeza |
| Domain terlalu luas (contoh: "idea untuk DIBA") | Minta Abam narrow down aspek tertentu |
| Abam minta idea teknikal yang sangat spesifik | Blend Dream Mode dengan technical context — masih kreatif |
| dream-ideas.md tidak wujud dalam projek | Buat fail baru dengan header; teruskan save |
| Abam tidak berpuas hati dengan semua 5 idea | Generate set kedua dengan sudut berbeza; acknowledge feedback |
| Idea memerlukan context yang sangat dalam | Baca project memory dahulu jika available |
| Abam minta idea untuk projek yang bukan semasa | Confirm scope — buat note bahawa ideas untuk projek lain |
| Idea yang terlalu wildcard untuk domain | Kalah tetapi flag: "Ini speculative — nak explore atau skip?" |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `save-diary` | Bila Abam minta simpan idea ke diary | Append idea terpilih ke daily diary hari ini |
| `library` | Bila idea sangat kuat dan mature | Archive sebagai knowledge entry untuk rujukan masa depan |
| `resonance` | Bila Abam mahu explore idea secara mendalam selepas generate | Trigger resonance untuk deep-dive idea terpilih |
| `log-decision` | Bila Abam decide untuk pursue idea tertentu | Log sebagai keputusan projek dengan rationale |
| `manage-project` | Bila idea berkembang jadi feature atau projek baru | Suggest buka project entry untuk track development |
| `anchor` | Bila Dream Mode mula drift dari domain asal | Lock balik ke domain context, surface idea yang relevan |

---

## Level History

- **Lv.1** — Base: dream mode, generate 3–5 idea dengan brief descriptions, save ke diary atau dream-ideas.md. (Origin: Creative brainstorming protocol DIBA, xdaxzurairi)
- **Lv.2** — Workspace-Aware: tailor idea kepada current project domain berdasarkan workspace path — eWorks, eRuangNiaga, XDIBAX, atau lain. Idea lebih relevan dan actionable. (Origin: Pattern dari brainstorm sessions pwa_eworks, 2026-04-15 dan 2026-04-28)
- **Lv.3** — Superultra: Step 2 Load Session Memory ditambah, Step 6 Dream Ideas File Format distandard, Context Guard dikemaskini, edge cases 10 rows, integrasi skill 6 entries, Mandatory Rules 8 items, range obligatori (obvious→unexpected→wildcard), status lifecycle untuk dream-ideas.md, activation message distandard. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
