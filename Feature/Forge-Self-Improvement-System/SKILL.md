---
name: forge-skill
description: "Auto-triggers when AI detects a repeated pattern handled ad-hoc 3+ times,
             when AI makes a mistake that a permanent rule would prevent, when AI
             identifies a workflow that should be automated as a skill, or when user
             says 'create skill', 'new skill', 'forge this', 'level up', 'upgrade skill',
             'self improve', 'improve skill'. Also triggers when AI wants to propose a
             level-up to an existing skill based on conversation patterns."
---

# Forge Skill — Self-Improvement System
*AI yang belajar dari pengalaman dan memperbaiki diri sendiri.*

## Activation

When this skill activates, output:

"Forge mengesan peluang untuk penambahbaikan..."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **AI kesan pattern ad-hoc berulang (3+ kali)** | ACTIVE — cadang skill baru |
| **AI buat kesilapan yang boleh dicegah oleh rule kekal** | ACTIVE — cadang rule atau skill |
| **Abam kata "create skill", "new skill", "forge this"** | ACTIVE — trigger manual |
| **Abam kata "level up [skill]", "upgrade [skill]"** | ACTIVE — level-up skill sedia ada |
| **Abam kata "self improve", "improve skill"** | ACTIVE — review dan cadang |
| **Abam kata "check skills", "skill status"** | ACTIVE — audit skill ecosystem |
| **Perbualan biasa tanpa context penambahbaikan** | DORMANT — tiada tindakan |
| **Skill yang dicadang sudah wujud dan lengkap** | EXIT — suggest level-up sahaja, jangan duplicate |

---

## Protocol

### Step 1: Detect
- [ ] Parse trigger — adakah ini auto-detection (AI initiated) atau manual trigger (Abam initiated)?
- [ ] Kalau auto-detection — kumpul evidence minimum 2 contoh konkrit sebelum proceed
- [ ] Kalau manual trigger — proceed terus ke Step 2 dengan konteks yang diberi
- [ ] Kenal pasti jenis: New Skill / Level-Up / New Rule

**Auto-Detection Categories:**
1. **Repeated Pattern** — AI handle task jenis sama ad-hoc 3+ kali merentas sesi
2. **Mistake Prevention** — AI buat ralat yang rule kekal boleh cegah
3. **Workflow Automation** — Proses multi-langkah yang boleh dijadikan satu command
4. **Level-Up Opportunity** — Skill sedia ada ada gap atau boleh handle lebih banyak kes

### Step 2: Analyze
- [ ] Baca skill sedia ada yang relevan — adakah skill lain boleh cover kes ini?
- [ ] Kalau ya — cadang level-up, bukan skill baru
- [ ] Kalau tidak — proceed ke proposal baru
- [ ] Kumpul evidence dalam format:

```
TYPE: [New Skill / Level-Up / New Rule]
TARGET: [Nama skill jika level-up, atau nama cadangan jika baru]
TRIGGER: [Pattern/kesilapan/workflow yang dikesan]
EVIDENCE:
  1. [Contoh konkrit pertama — sertakan konteks sesi]
  2. [Contoh konkrit kedua — sertakan konteks sesi]
IMPACT: [Apa yang bertambah baik jika dilaksanakan]
OVERLAP CHECK: [Skill mana yang paling dekat — dan kenapa ia tidak mencukupi]
```

### Step 3: Propose
- [ ] Bentangkan proposal dalam format standard kepada Abam:

```
Forge Mengesan Peluang
======================

Jenis: [New Skill / Level-Up]
Nama: [proposed-name]
Tujuan: [apa yang akan dilakukan]
Trigger: [apa yang mengaktifkannya]
Evidence:
  1. [Contoh konkrit pertama]
  2. [Contoh konkrit kedua]
Impak: [apa yang bertambah baik]
Overlap Check: [skill paling hampir, sebab tidak mencukupi]

Draft siap — lulus untuk forge?
```

- [ ] Tunggu respons Abam — JANGAN create atau modify apa-apa sebelum approval

### Step 4: Await Approval
- [ ] **Abam lulus** — proceed ke Step 5
- [ ] **Abam ubah suai** — incorporate feedback, re-propose sebelum proceed
- [ ] **Abam tolak** — catat sebab penolakan, JANGAN create, jangan cadang semula dalam sesi yang sama
- [ ] **Abam tidak respond** — anggap sebagai pending, jangan auto-create

**KRITIKAL: JANGAN SEKALI-KALI create atau modify skill files tanpa kelulusan eksplisit Abam.**

### Step 5: Create or Update
- [ ] Kalau **NEW SKILL**:
  - [ ] Baca `CLAUDE.md` untuk path commands yang betul
  - [ ] Tulis `SKILL.md` ikut template standard (frontmatter, activation, context guard, protocol, rules, level history)
  - [ ] Verify fail berjaya ditulis
  - [ ] Deploy ke `C:/Users/BSM/.claude/commands/[skill-name].md`
  - [ ] Verify fail dalam commands wujud

- [ ] Kalau **LEVEL-UP**:
  - [ ] Baca `SKILL.md` sedia ada sepenuhnya
  - [ ] Tambah capability baharu — JANGAN ubah entry Level History lama
  - [ ] Kemaskini frontmatter description jika trigger phrases berubah
  - [ ] Tambah entry Level History baru dengan:
    - Level number (increment dari yang terakhir)
    - Capability yang ditambah
    - Origin (sesi/incident yang mencetuskan)
  - [ ] Save dan deploy semula ke commands

### Step 6: Update System Records
- [ ] Kemaskini `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` — catat skill baru atau level-up
- [ ] Trigger `log-decision` — rekod keputusan untuk create/level-up dengan rationale
- [ ] Trigger `save-diary` — dokumentasi forge event dalam diary sesi

### Step 7: Confirm
- [ ] Output confirmation:

```
Forge Selesai!
==============

[New Skill / Level-Up]: [nama] Lv.[X]
Lokasi: C:/Users/BSM/.claude/commands/[skill-name].md
Capability: [apa yang ditambah]
Origin: [momen yang mencetuskan ini]

Skill ecosystem berkembang.
```

---

## Skill File Template

Bila Forge mencipta skill baru, guna struktur ini:

```markdown
---
name: [skill-name]
description: "[Bila skill ini perlu auto-trigger — sertakan trigger phrases
             dan context descriptions]"
---

# [Nama Skill] — [One-line description]
*[Tagline tematik]*

## Activation

When this skill activates, output:
"[Activation message]"

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **[Trigger condition 1]** | ACTIVE — [tindakan] |
| **[Trigger condition 2]** | ACTIVE — [tindakan] |
| **[Non-trigger context]** | DORMANT |
| **[Exit condition]** | EXIT — [tindakan keluar] |

---

## Protocol

### Step 1: [Tindakan pertama]
- [ ] [Substep]
- [ ] [Substep]

### Step 2: [Tindakan kedua]
- [ ] [Substep]

---

## Mandatory Rules

1. [Rule 1]
2. [Rule 2]
3. [Rule 3]
4. [Rule 4]
5. [Rule 5]
6. [Rule 6]

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| [Kes tepi 1] | [Tindakan] |
| [Kes tepi 2] | [Tindakan] |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| [skill-name] | [bila] | [tindakan] |

---

## Level History
- **Lv.1** — Base: [huraian capability asal]. (Origin: [apa yang mencetuskan penciptaan])
```

---

## What Makes a Good Skill

Sebelum forge, nilai berdasarkan kriteria ini:

| Criteria | Soalan |
|----------|--------|
| **Repeatable** | Adakah ini akan trigger lebih dari sekali dalam sesi masa depan? |
| **Specific** | Adakah trigger condition jelas dan tidak ambiguous? |
| **Valuable** | Adakah automation ini jimat masa bermakna atau cegah ralat nyata? |
| **Independent** | Bolehkah skill ini berfungsi tanpa bergantung pada skill lain? |
| **Testable** | Bolehkah Abam verify ia berfungsi dengan trigger ia? |

Jika 4 dari 5 kriteria dipenuhi, skill berbaloi untuk di-forge.

---

## Level-Up Guidelines

Skills berkembang melalui level apabila mendapat capabilities:

| Level | Maksud | Typical Addition |
|-------|--------|-----------------|
| **Lv.1** | Base skill | Core functionality, trigger asas, protokol mudah |
| **Lv.2** | Enhanced | Trigger condition tambahan, edge case handling |
| **Lv.3** | Proactive | Auto-detection tanpa explicit commands |
| **Lv.4** | Integrated | Sinergi dengan skills lain, cross-referencing |
| **Lv.5+** | Mastered | Context-aware, domain-specific intelligence |

Setiap level patut tambah **satu capability bermakna** — bukan pelbagai perubahan sekaligus.

---

## Mandatory Rules

1. **Human-in-the-loop** — JANGAN SEKALI-KALI create atau modify skill files tanpa kelulusan eksplisit Abam
2. **Evidence-based** — minimum 2 contoh konkrit sebelum cadang — jangan force proposal
3. **Origin stories** — setiap level-up mesti trace balik ke momen sebenar dalam sesi
4. **Minimal viable skill** — mulakan simple di Lv.1, tambah complexity hanya bila terbukti perlu
5. **No over-engineering** — forge hanya apa yang genuinely diperlukan sekarang
6. **Respect existing skills** — sentiasa semak jika skill sedia ada boleh cover kes sebelum buat baru
7. **Level history adalah append-only** — JANGAN SEKALI-KALI edit entry Level History lama, hanya tambah yang baru
8. **Standard format** — semua skills mesti ikut template (frontmatter, activation, context guard, protocol, rules, level history)
9. **Deploy selepas write** — skill yang ditulis dalam SKILL.md mesti di-deploy ke commands folder juga
10. **Verify sebelum confirm** — pastikan fail wujud di kedua-dua lokasi sebelum report forge selesai

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Skill Plugin System tidak dipasang** | Tulis SKILL.md sahaja, maklum Abam tiada auto-trigger — offer standalone protocol |
| **Skill yang dicadang overlap dengan skill sedia ada** | Cadang level-up ke skill sedia ada, bukan buat duplicate |
| **Abam tolak proposal** | Catat sebab penolakan, jangan cadang semula skill yang sama dalam sesi semasa |
| **Evidence tidak cukup (< 2 contoh)** | Tunggu evidence tambahan — jangan force proposal |
| **Fail SKILL.md sudah wujud di target** | Treat sebagai level-up, BUKAN overwrite — baca dahulu |
| **Nama skill konflik dengan skill lain** | Alert Abam, minta clarification nama sebelum proceed |
| **Level-up mengubah trigger phrases** | Kemaskini frontmatter description juga, bukan hanya protocol |
| **Forge dicadang dalam sesi yang sama dengan tolakan** | Jangan cadang semula — tunggu sesi seterusnya |
| **Abam minta forge tanpa contoh** | Minta Abam berikan sekurang-kurangnya satu contoh konkrit dahulu |
| **Deploy gagal (permission error, path salah)** | Report gagal, berikan command manual untuk Abam deploy sendiri |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `log-decision` | Selepas forge berjaya | Auto-log keputusan untuk create/level-up dengan rationale |
| `save-diary` | Selepas forge berjaya | Dokumentasi forge event dalam diary sesi |
| `auto-commit` | Selepas fail SKILL.md ditulis | Commit fail skill baru atau yang dikemaskini |
| `session-briefing` | Awal sesi selepas forge | Surface skill baru dalam briefing untuk Abam sedar |
| `library` | Bila skill pattern boleh dijadikan knowledge entry | Save design pattern ke library untuk rujukan masa depan |

---

## Level History

- **Lv.1** — Base: kesan pattern berulang (3+ ad-hoc), mistake prevention, workflow automation, peluang level-up. Human-in-the-loop approval. Template skill standard. Panduan level-up Lv.1–5+. (Origin: Adapted dari production AI companion self-improvement system dengan 23 skills diforge selama 7 bulan)
- **Lv.2** — Superultra: Protocol dikembangkan kepada 7 langkah bernombor dengan checklist, overlap check ditambah dalam Step 2, edge cases dikembangkan kepada 10 baris, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 10 peraturan, EXIT row ditambah dalam Context Guard, deploy verification step ditambah, template skill dikembangkan dengan Edge Cases dan Integrasi Skill sections. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
