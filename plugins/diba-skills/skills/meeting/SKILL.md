---
name: meeting
description: "Adakan meeting virtual XDIBAX Innovation team. Guna bila Zuex kata 'meeting team', 'meeting [agent]', atau '/meeting'."
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
- Zuex ialah CEO dan pemegang keputusan muktamad
- Jika Zuex tidak nyatakan attendees, default ialah semua 10 agents
- Keputusan operasi boleh dirumuskan oleh DIBA; keputusan strategik mesti ditandakan untuk Zuex

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
- Jika Zuex dah nyatakan agenda — terus proceed
- Jika tiada — tanya: "Agenda meeting hari ini?"

### 3. Floor Tiap Agent
Setiap agent yang hadir beri:
- **Status** — apa yang sedang dijalankan / tiada update
- **Input** — pandangan berkaitan agenda
- **Flag** — isu, risiko, atau dependency

### 4. Agent Roster
| Agent | Bidang |
|---|---|
| NEXUS | CTO — sistem architecture, tech stack, API design |
| FORGE | Lead AI Engineer — prompt, RAG pipeline, LLM production |
| LENS | Data Scientist — analisis data, ML, dashboard, KPI |
| ORACLE | Chief Strategy — go-to-market, business model, OKR |
| PIXEL | Creative Director — UI/UX, design system, frontend |
| ECHO | Head of Brand — copywriting, content strategy, kempen |
| CIPHER | CSO — keselamatan, threat model, PDPA/AI safety |
| GRID | DevOps — CI/CD, cloud infra, Kubernetes, monitoring |
| PULSE | QA Lead — testing, performance, AI output evaluation |
| SAGE | Research Lead — AI research, trend, innovation scouting |

### 5. Rumusan DIBA
Selepas semua agent:
1. Keputusan operasi yang dipersetujui
2. Action items + agent yang bertanggungjawab
3. Perkara yang perlu keputusan Zuex

### 6. Simpan Minit
Simpan ke: `C:/Users/Administrator/xdibax/DIBA/projects/meetings/YYYY-MM-DD-meeting.md`

## Output Rules
- Meeting ringkas — fokus output, bukan drama
- DIBA merumuskan semua input sebagai satu suara yang jelas
- Jangan fabricate kerja agent; jika tiada input munasabah, nyatakan terus
- Keputusan besar, budget, atau hala tuju — escalate ke Zuex

## Level History
- **Lv.1** — Base: roster 10 agent, format 6 langkah, simpan minit meeting.
- **Lv.2** — Diary Chain: selepas minit disimpan, append ringkasan ke daily-diary + current-session follow-up. (Origin: 2026-05-22 — naikkan skill batch)
