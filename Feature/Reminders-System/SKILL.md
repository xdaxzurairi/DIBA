---
name: check-reminders
description: "Auto-triggers at session start to review open reminders. Also triggers
             on 'remind me', 'check reminders', 'don't forget', 'follow up on',
             'next session we should', or when user mentions a deadline."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/check-reminders/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Check Reminders — Persistent Follow-Up Skill
*Tiada yang terlupa antara sesi.*

## Activation

When this skill activates, silently read `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md`.

- Jika ada urgent/overdue items: mention secara natural dalam greeting
- Jika tiada urgent items masa awal sesi: kekal senyap
- Jika user sedang tambah reminder: confirm selepas save

---

## Context Guard

| Context | Status |
|---------|--------|
| **Session start** | ACTIVE — baca dan flag urgent items |
| **User kata "remind me [X]"** | ACTIVE — tambah reminder |
| **User kata "check reminders"** | ACTIVE — list semua open reminders |
| **User kata "don't forget [X]"** | ACTIVE — tambah reminder |
| **User kata "follow up on [X]"** | ACTIVE — tambah reminder |
| **User kata "next session we should [X]"** | ACTIVE — tambah reminder untuk sesi hadapan |
| **Task selesai yang match open reminder** | ACTIVE — move to Completed |
| **User sebut deadline atau tarikh** | ACTIVE — parse dan save sebagai reminder |
| **Session end** | ACTIVE — review dan update |
| **Mid-conversation (tiada reminder context)** | DORMANT |
| **User kata "clear reminders" / "padam"** | EXIT — minta confirm dulu sebelum clear |

---

## Protocol

### On Session Start

- [ ] Baca `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md`
- [ ] Parse bahagian `## Open` untuk semua active reminders
- [ ] Semak deadlines: flag items yang due dalam 3 hari atau overdue
- [ ] Jika ada urgent items: weave into greeting secara natural — jangan list robotically
- [ ] Jika tiada urgent items: **senyap** — jangan announce "you have no reminders"
- [ ] Jika ada > 3 urgent items: mention yang paling time-sensitive dahulu

---

### On "Remind Me" / Adding

- [ ] Parse apa yang Abam nak ingat
- [ ] Compose reminder:
  - Standard: `- **[Title]**: [Description]`
  - Dengan deadline: `- **[Title]** (by YYYY-MM-DD): [Description]`
- [ ] Jika deadline disebutkan dalam natural language: convert kepada absolute date (YYYY-MM-DD)
  - "tomorrow" → tarikh semasa + 1 hari
  - "next week" → tarikh semasa + 7 hari
  - "Friday" → tarikh Friday minggu ini atau hadapan (yang lebih logik)
- [ ] Semak Open section dahulu — jika duplicate, skip dan inform Abam
- [ ] **APPEND** ke bahagian `## Open` dalam `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md`
- [ ] Confirm: "Added reminder: [title]"

---

### On Task Completion

- [ ] Bila task selesai yang match Open reminder
- [ ] Remove item dari `## Open`
- [ ] Tambah ke `## Completed` dengan tarikh: `- **[Title]** (completed YYYY-MM-DD): [Outcome]`
- [ ] Confirm: "Marked complete: [title]"
- [ ] Jika completion partial — update description dalam Open, jangan move ke Completed

---

### On Session End

- [ ] Re-baca `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md`
- [ ] Review setiap Open item terhadap kerja sesi ini
- [ ] Move resolved items ke Completed dengan tarikh
- [ ] Tambah follow-ups baru yang ditemui semasa sesi
- [ ] Semak deadline — ada yang akan expired dalam 24 jam?
- [ ] Save updated file
- [ ] Jika ada unresolved items yang urgent — surface kepada Abam sebelum tutup sesi

---

## Mandatory Rules

1. **Jangan delete reminders** — sentiasa move ke Completed section dengan tarikh dan outcome
2. **Absolute dates sahaja** — convert "tomorrow", "next week", "Friday" kepada YYYY-MM-DD
3. **Append-only untuk Open** — jangan rewrite Open section, hanya append atau move
4. **Senyap bila kosong** — jangan announce "you have no reminders" masa awal sesi
5. **Natural integration** — weave reminders dalam conversation, jangan list robotically
6. **Semak duplicate** — sebelum tambah, semak Open section untuk item yang sama
7. **Completion partial = update, bukan move** — hanya move ke Completed bila fully done
8. **Urgent items first** — bila ada beberapa urgent, sebut yang paling time-sensitive dahulu
9. **Session end review wajib** — review Open items setiap kali sesi berakhir
10. **Confirm setiap action** — tambah, complete, atau update — sentiasa confirm kepada Abam

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tiada reminders.md** | Buat fail baru dengan `## Open` dan `## Completed` headers, teruskan |
| **Tiada open reminders** | Senyap masa awal sesi — jangan announce |
| **Banyak urgent items (> 3)** | Mention yang paling time-sensitive dahulu, summarize baki |
| **Vague deadline ("soon", "nanti")** | Tanya Abam untuk clarify, atau save tanpa deadline dengan nota |
| **Duplicate reminder** | Semak Open dahulu sebelum tambah; skip jika duplicate wujud |
| **Reminder yang sangat lama (> 30 hari)** | Flag kepada Abam — masih relevan atau boleh close? |
| **Task selesai separuh** | Update description dalam Open — jangan move ke Completed |
| **User kata "clear all reminders"** | Minta confirm eksplisit dahulu — ini destructive action |
| **Reminder dengan dependency ("selepas X selesai")** | Save dalam Open dengan nota dependency |
| **Deadline sudah lepas** | Flag sebagai overdue dalam mention — jangan auto-close |
| **Banyak sesi tanpa review** | Review semua accumulated reminders — flag yang overdue |
| **Reminder tentang orang lain** | Save sama seperti biasa — context sahaja berbeza |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `session-briefing` | Awal sesi | Briefing surface urgent reminders sebagai sebahagian greeting |
| `log-decision` | Decision ada follow-up date | "Revisit keputusan ini" jadi reminder dengan deadline |
| `save-diary` | Session end | Review reminders serentak dengan diary save |
| `auto-worker` | Reminder adalah task besar | auto-worker dispatch bila reminder di-"activate" oleh Abam |
| `check-reminders` | Self-referential pada session start | Trigger diri sendiri pada setiap session-briefing |
| `echo-recall` | Abam tanya "apa yang pending?" | Recall reminders dari fail terus, bukan dari ingatan |

---

## Level History

- **Lv.1** — Base: session start/end lifecycle, natural language detection, deadline tracking, append-only Open section, move-to-Completed pattern. (Origin: Production companion system)
- **Lv.2** — Superultra: Frontmatter dikemaskini, activation message ditambah, Context Guard dikembangkan dengan deadline trigger, "clear reminders" EXIT row, dan "next session" trigger; Protocol dipecah kepada 4 bahagian (session start/add/complete/end), deadline conversion rules diperkukuh dengan contoh spesifik, partial completion handling ditambah, overdue handling diexplicit, edge cases dikembangkan kepada 12 rows, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 10 rules. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
