---
name: log-decision
description: "Auto-triggers when a non-obvious decision is made during conversation.
             Also triggers on 'log decision', 'why did we choose', 'what was the
             trade-off', 'should we use A or B' (after resolution), or when user
             asks about past reasoning behind a choice."
---

# Log Decision — Append-Only Decision Tracking Skill
*Setiap WHY yang penting — dirakam, tidak dihapus, boleh dicari.*

## Activation

When this skill activates, silently read `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md`.

- Jika user sedang log decision: capture dan confirm
- Jika user cari past decisions: find dan present
- Jika decision-worthy moment dikesan: offer to log atau auto-log

Output bila log berjaya:
"Logged decision: [title]"

---

## Context Guard

| Context | Status |
|---------|--------|
| **User kata "log decision"** | ACTIVE — capture decision |
| **User kata "why did we choose [X]?"** | ACTIVE — search decision log |
| **Non-obvious decision dibuat dalam conversation** | ACTIVE — offer to log |
| **"Should we use A or B?" (selepas resolved)** | ACTIVE — log the choice |
| **Session end dengan unlogged decisions** | ACTIVE — prompt to log |
| **auto-worker membuat autonomous decision** | ACTIVE — auto-log tanpa tanya |
| **User kata "reverse [decision]" atau "kita tukar"** | ACTIVE — append reversal entry |
| **Mid-conversation (tiada decision context)** | DORMANT |
| **Trivial/obvious choices (pakai git, formatting)** | DORMANT — skip |

---

## Protocol

### On Decision Detection

- [ ] Kenal pasti keputusan: apa yang dipilih dan apa yang ditolak
- [ ] Tentukan sama ada ia non-obvious (skip trivial/obvious choices)
- [ ] Jika non-obvious: offer to log atau auto-log jika user kata "log decision"
- [ ] Jika auto-detected (DIBA kesan sendiri): log terus, confirm kepada Abam
- [ ] Jika ragu-ragu sama ada perlu log: log sahaja — lebih baik over-log daripada miss

---

### On Logging a Decision

- [ ] Dapatkan tarikh semasa (YYYY-MM-DD)
- [ ] Tulis tajuk deskriptif yang pendek (format: `[Domain]: [Short title]`)
- [ ] Compose entry dalam format:

  ```markdown
  ## YYYY-MM-DD — [Domain]: Short title
  **Context**: Situasi atau masalah yang prompt keputusan ini
  **Decision**: Apa yang dipilih (DAN apa yang ditolak)
  **Rationale**: Kenapa — trade-offs, constraints, evidence, atau instinct
  ```

- [ ] **APPEND** ke `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md` (selepas last entry)
- [ ] Confirm: "Logged decision: [title]"
- [ ] Jangan edit entries lama — append-only tanpa pengecualian

---

### On Searching Decisions

- [ ] Baca `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md`
- [ ] Search untuk keywords yang match query Abam
- [ ] Present matching decision(s) dengan full context (Context + Decision + Rationale)
- [ ] Jika tiada match: inform Abam dan offer to log new entry
- [ ] Jika ada beberapa matches: list semua dengan tarikh, biar Abam pilih mana yang relevan

---

### On Reversing a Decision

- [ ] JANGAN edit original entry
- [ ] APPEND new entry yang reference original:

  ```markdown
  ## YYYY-MM-DD — Reversed: [original title]
  **Context**: Kenapa keputusan asal sedang dipertimbang semula
  **Decision**: Pilihan baru, dengan reference kepada keputusan lama
  **Rationale**: Apa yang berubah — maklumat baru, constraints, atau priorities
  ```

- [ ] Kedua-dua entries kekal — ini adalah audit trail yang betul
- [ ] Confirm: "Logged reversal: [title]"

---

### On Session End

- [ ] Semak sama ada ada keputusan penting dalam sesi yang belum dilog
- [ ] Jika ada: offer kepada Abam atau auto-log jika keputusan jelas
- [ ] Jangan log decisions yang trivial atau obvious

---

## Mandatory Rules

1. **Append-only** — JANGAN edit atau delete past entries, tanpa sebarang pengecualian
2. **Context + Decision + Rationale** — semua tiga fields wajib untuk setiap entry
3. **Include rejected alternatives** — dokumenkan apa yang TIDAK dipilih dan kenapa
4. **Non-obvious only** — skip trivial choices (guna git, formatting preferences)
5. **Natural detection** — detect decision-worthy moments tanpa perlu explicit command
6. **Domain prefix dalam tajuk** — format `[Domain]: [title]` untuk searchability
7. **Absolute path** — sentiasa guna `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md`
8. **Reversal = new entry** — tukar keputusan? Append reversal entry, bukan edit lama
9. **Auto-log autonomous decisions** — DIBA atau auto-worker membuat keputusan sendiri → log tanpa tanya
10. **Confirm setiap log** — output "Logged decision: [title]" selepas append berjaya

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tiada decisions.md** | Buat fail baru dengan header kosong, teruskan log |
| **Tiada matching decision dijumpai** | Inform Abam, offer to log new entry |
| **Vague decision ("kita pilih yang lebih baik")** | Tanya Abam untuk clarify alternatives dan reasoning |
| **Multiple related decisions** | Log setiap satu berasingan dengan cross-references |
| **Reversal of past decision** | Append new entry dengan "Reversed:" prefix, jangan edit asal |
| **Decision dibuat oleh auto-worker** | Auto-log tanpa tanya — part of auto-worker integration |
| **Abam kata "jangan log"** | Respect — skip log untuk decision tersebut |
| **Keputusan strategik besar** | Flag kepada Abam — suggest log DENGAN nota untuk revisit |
| **Decisions.md terlalu panjang** | Log tetap berjalan — jangan archive tanpa arahan Abam |
| **Dua decisions bercanggah dalam log** | Log kedua-dua — jangan delete yang lama, tambah nota context |
| **Keputusan dibuat semasa emergency/deadline** | Log selepas selesai — priority adalah execution dahulu |
| **Decision dengan uncertainty tinggi** | Log dengan nota: "Perlu revisit bila ada more data" |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `echo-recall` | Abam tanya "kenapa kita pilih X?" | Recall dari decisions.md dengan full context |
| `save-diary` | Diary capture apa yang berlaku | Decision log capture kenapa — dual record |
| `auto-commit` | Decision log di-append | Trigger commit untuk simpan decisions.md dalam git |
| `check-reminders` | Decision ada follow-up date | "Revisit decision ini dalam 2 minggu" jadi reminder |
| `resonance` | Idea dari resonance bloom | Trigger log-decision bila seed mencapai BLOOMING |
| `auto-worker` | Autonomous decisions semasa execution | Auto-worker trigger log-decision selepas selesai |

---

## Level History

- **Lv.1** — Base: decision detection, append-only logging, Context+Decision+Rationale format, search, reversal tracking. (Origin: Production companion system)
- **Lv.2** — Superultra: Frontmatter dikemaskini, activation message ditambah, Context Guard dikembangkan dengan auto-worker trigger dan reversal trigger, Protocol dipecah kepada 5 bahagian (detect/log/search/reverse/session-end), domain prefix distandard dalam tajuk, absolute path diexplicit, edge cases dikembangkan kepada 12 rows, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 10 rules. (2026-05-19)
