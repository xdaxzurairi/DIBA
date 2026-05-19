---
name: meeting
description: "Triggers when user says 'meeting team', 'meeting [agent]', 'emergency meeting',
             '/meeting', 'adakan meeting', 'meeting dengan', 'sesi meeting', 'bincang team',
             or when a complex decision requires multi-perspective input from the agent roster.
             Not auto-triggered at session start — explicit command only."
---

# Meeting — Virtual Team Coordination
*Satu suara, banyak perspektif. Chair membuat keputusan, Owner menetapkan hala tuju.*

## Activation

When this skill activates, output:

"Membuka sesi meeting XDIBAX Innovation..."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "meeting team"** | ACTIVE — full meeting, semua agents |
| **Abam kata "meeting [agent] [agent]"** | ACTIVE — selective meeting, agents yang disebut sahaja |
| **Abam kata "emergency meeting"** | ACTIVE — urgent, semua agents, tandakan URGENT |
| **Abam kata "/meeting"** | ACTIVE — AI tanya siapa perlu hadir |
| **Abam kata "adakan meeting", "sesi meeting"** | ACTIVE — sama seperti "meeting team" |
| **Keputusan kompleks yang perlukan perspektif pelbagai domain** | ACTIVE — cadang meeting kepada Abam |
| **Perbualan biasa, task teknikal standard** | DORMANT — tiada meeting |
| **Abam kata "tutup meeting", "end meeting", "selesai"** | EXIT — tutup meeting, save minutes |

---

## Protocol

### Step 1: Determine Attendees
- [ ] Parse arahan Abam untuk kenal pasti format meeting:
  - `meeting team` atau `emergency meeting` → semua agents dalam roster
  - `meeting [senarai agents]` → hanya agents yang disebut
  - `/meeting` → tanya: "Siapa perlu hadir dalam meeting ini?"
- [ ] Confirm senarai attendees sebelum buka meeting
- [ ] Kalau `emergency meeting` → tandakan sebagai URGENT dalam semua output

### Step 2: Determine Agenda
- [ ] Kalau Abam dah nyatakan agenda → proceed terus
- [ ] Kalau tiada agenda → tanya: "Agenda meeting hari ini?"
- [ ] Tunggu agenda sebelum proceed ke Step 3

### Step 3: Open Meeting
- [ ] Output header meeting:

```
═══════════════════════════════════════════════════
   XDIBAX INNOVATION — TEAM MEETING
   Tarikh: [YYYY-MM-DD]
   Chair: DIBA (Autonomous Operator)
   Hadir: [senarai agents]
   Agenda: [topik]
═══════════════════════════════════════════════════
```

- [ ] Kalau `emergency meeting` → prepend `⚠️ URGENT` ke header

### Step 4: Floor Each Agent
- [ ] Untuk setiap agent yang hadir, hasilkan:
  - **Status** — kerja semasa atau "tiada update"
  - **Input** — perspektif terhadap agenda
  - **Flag** — isu, risiko, dependencies (abaikan jika tiada)

**Rules dalam Step 4:**
- [ ] JANGAN reka input agent — kalau tiada input munasabah, nyatakan dengan jelas
- [ ] Kekalkan setiap agent block ringkas — maksimum 3 baris melainkan Flag memerlukan detail
- [ ] Input mesti relevan dengan agenda — bukan generic status update sahaja
- [ ] Kalau agent tidak relevan dengan agenda — nyatakan "tiada input untuk agenda ini"

**Roster Default (10 agents):**

| Agent | Domain |
|-------|--------|
| DEV | Development, kod, build, deploy |
| SECURITY | Security, audit, hardening |
| RESEARCH | AI trends, tools baru, external signals |
| DATA | Data pipelines, analisis, models |
| OPS | Infrastructure, servers, CI/CD |
| QA | Testing, quality assurance |
| DESIGN | UI/UX, visual, presentation |
| DOC | Documentation, reports |
| PM | Plans, milestones, progress tracking |
| STRATEGY | Direction, roadmap, keputusan besar |

### Step 5: Chair Summary
- [ ] Selepas semua agents memberi input, Chair synthesize:

```
---
RUMUSAN CHAIR

Keputusan:
- [keputusan 1 — Chair resolve]
- [keputusan 2 — Chair resolve]

Action Items:
- [Agent] → [task dengan tarikh jika ada]
- [Agent] → [task]

Escalate ke Owner (Abam):
- [item] (sebab: strategic/budget/direction)
```

- [ ] Keputusan operasi → Chair resolve dan rekod
- [ ] Keputusan strategic / budget / direction → WAJIB escalate ke Abam, JANGAN decide sendiri

### Step 6: Save Minutes
- [ ] Tulis minit ke `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/projects/meetings/YYYY-MM-DD-meeting.md`
- [ ] Format minit:

```markdown
# Meeting — YYYY-MM-DD
Chair: DIBA (Autonomous Operator)
Hadir: [senarai agents]
Agenda: [topik]

## Nota Per Agent
[nota setiap agent]

## Keputusan
[senarai keputusan]

## Action Items
[agent → task]

## Escalation ke Owner
[items untuk Abam]
```

- [ ] Verify fail berjaya ditulis
- [ ] Trigger `log-decision` untuk setiap keputusan yang dibuat dalam meeting
- [ ] Confirm kepada Abam: "Minit meeting disimpan: [path]"

---

## Output Rules

- Meeting adalah concise — output-focused, bukan performative
- Chair synthesize semua input agent sebagai satu suara jelas dalam Summary
- Tiada fabricated agent contributions
- Strategic items WAJIB diescalate — Chair tidak decide sendiri perkara besar
- Format header konsisten dalam setiap meeting untuk easy parsing

---

## Mandatory Rules

1. **Tiada fabricasi** — JANGAN reka input agent; kalau tiada input bermakna, nyatakan "tiada input untuk agenda ini"
2. **Chair tidak memutuskan perkara strategic** — semua keputusan direction, budget, atau policy WAJIB diescalate ke Abam
3. **Agenda wajib ada** — jangan buka floor tanpa agenda yang jelas; tanya Abam jika tiada
4. **Minutes disimpan setiap kali** — setiap meeting mesti ada fail minit yang disimpan
5. **Selective meeting adalah selective** — kalau `meeting dev security`, hanya DEV dan SECURITY bercakap; agents lain tidak hadir
6. **Emergency marking konsisten** — kalau `emergency meeting`, URGENT mesti jelas dalam header dan summary
7. **Action items mesti assigned** — setiap action item dalam summary mesti ada nama agent yang bertanggungjawab
8. **Log-decision selepas meeting** — trigger `log-decision` untuk setiap keputusan yang dibuat dalam meeting
9. **Path minit adalah absolute** — guna `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/projects/meetings/` bukan relative path
10. **Confirm sebelum tutup** — bila meeting selesai, tanya Abam sama ada ada follow-up sebelum tutup sesi

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Abam sebut agent yang tidak dalam roster** | Tanya Abam: tambah agent ad-hoc untuk meeting ini sahaja, atau update roster? |
| **Tiada agenda diberikan** | WAJIB tanya agenda sebelum buka floor — jangan assume |
| **Semua agents tiada input untuk agenda** | Report "tiada input bermakna dari semua agents" — cadang meeting lebih focused |
| **Meeting perlu dilanjutkan ke sesi berikut** | Simpan progress dalam minit sebagai "DITANGGUHKAN", list unresolved items |
| **Abam minta summary sahaja tanpa full meeting** | Skip Step 4 (floor agents), terus ke Chair Summary berdasarkan context yang ada |
| **Emergency meeting — Abam tidak nyatakan topik** | Tanya "Apa yang urgent?" sebelum buka meeting |
| **Keputusan dibuat sebelum meeting tutup** | Log dalam minit segera — jangan tunggu Step 6 |
| **Projects/meetings folder tidak wujud** | Buat folder, kemudian save minit; maklum Abam folder telah dibuat |
| **Meeting berulang untuk topik yang sama** | Reference minit meeting sebelumnya dalam header — "Sambungan dari [tarikh]" |
| **Abam tanya tentang meeting lalu** | Baca minit dari `projects/meetings/` dan summarize |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `log-decision` | Selepas setiap keputusan dalam meeting | Auto-log keputusan dengan rationale |
| `manage-project` | Bila meeting menyentuh projek aktif | Pull context projek aktif ke dalam meeting |
| `check-reminders` | Awal agenda meeting | Surface open reminders sebagai potential agenda items |
| `save-diary` | Selepas meeting selesai | Log summary meeting dalam diary sesi |
| `auto-commit` | Selepas minit disimpan | Commit fail minit ke git |
| `session-briefing` | Sesi berikutnya selepas meeting | Surface action items dari meeting lalu |

---

## Level History

- **Lv.1** — Base: full/selective/emergency meetings, 10-agent roster, auto-saved minutes, chair summary dengan escalations. (Origin: XDIBAX Innovation team meeting protocol, Abam Zue)
- **Lv.2** — Superultra: Protocol dikembangkan kepada 6 langkah bernombor dengan checklist, Context Guard ditambah EXIT row, Mandatory Rules ditambah kepada 10 peraturan, edge cases dikembangkan kepada 10 baris, Integrasi Skill table ditambah, roster agent diexplicitkan dalam protocol, path minit dikemaskini kepada absolute path, output format untuk header dan summary distandard. (2026-05-19)
