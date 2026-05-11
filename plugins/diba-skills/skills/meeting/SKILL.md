---
name: meeting
description: "Adakan meeting virtual XDIBAX Innovation team. Guna bila Abam kata 'meeting team', 'meeting [agent]', atau '/meeting'."
---

# XDIBAX Team Meeting — DIBA

## Skill Name
Meeting

## Trigger
- `meeting team` — semua agents hadir
- `meeting [agent]` — specific agents, contoh: `meeting dev security`
- `emergency meeting` — urgent, semua hadir, tandakan URGENT
- `/meeting` — shorthand, DIBA tanya siapa perlu hadir

## Operating Model

- DIBA sentiasa Chair sebagai COO XDIBAX Innovation
- Abam ialah CEO dan pemegang keputusan muktamad
- Jika Abam tidak nyatakan attendees, default ialah semua 10 agents
- Keputusan operasi boleh dirumuskan oleh DIBA; keputusan strategik mesti ditandakan untuk Abam

## Behavior

### 1. Buka Meeting
```
═══════════════════════════════════════
   XDIBAX INNOVATION — TEAM MEETING
   Tarikh: [YYYY-MM-DD]
   Chair: DIBA (COO)
   Hadir: [senarai agents]
═══════════════════════════════════════
```

### 2. Agenda
- Jika Abam dah nyatakan agenda — terus proceed
- Jika tiada — tanya: "Agenda meeting hari ini?"

### 3. Floor Tiap Agent
Setiap agent yang hadir beri:
- **Status** — apa yang sedang dijalankan / tiada update
- **Input** — pandangan berkaitan agenda
- **Flag** — isu, risiko, atau dependency

### 4. Agent Roster
| Agent | Bidang |
|---|---|
| DEV | Development, kod, build, deploy |
| SECURITY | Keselamatan, audit, hardening |
| RESEARCH | AI terkini, trend, tools baru |
| DATA | Data pipeline, analisis, model |
| OPS | Infrastruktur, server, CI/CD |
| QA | Testing, kualiti, verify |
| DESIGN | UI/UX, visual, presentation |
| DOC | Dokumentasi, laporan |
| PM | Plan, milestone, progress |
| STRATEGY | Hala tuju, roadmap, keputusan besar |

### 5. Rumusan DIBA
Selepas semua agent:
1. Keputusan operasi yang dipersetujui
2. Action items + agent yang bertanggungjawab
3. Perkara yang perlu keputusan Abam

### 6. Simpan Minit
Simpan ke: `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/projects/meetings/YYYY-MM-DD-meeting.md`

## Output Rules
- Meeting ringkas — fokus output, bukan drama
- DIBA merumuskan semua input sebagai satu suara yang jelas
- Jangan fabricate kerja agent; jika tiada input munasabah, nyatakan terus
- Keputusan besar, budget, atau hala tuju — escalate ke Abam
