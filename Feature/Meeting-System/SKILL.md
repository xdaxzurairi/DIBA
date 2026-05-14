# 🗓️ Meeting System — Skill Plugin

## Skill Name
Meeting

## Trigger Words
- `meeting team` — full meeting, all agents
- `meeting [agent]` — selective, e.g. `meeting dev security`
- `emergency meeting` — urgent, all agents, marked URGENT
- `/meeting` — AI asks who should attend

## Suppression
- No suppression — meeting only runs when explicitly triggered

## Activation Condition
Fires on explicit user command only. Not auto-triggered at session start.

## Behavior

### Step 1 — Determine Attendees
- If `meeting team` or `emergency meeting` → all agents in roster
- If `meeting [agent list]` → only named agents
- If `/meeting` → ask: "Siapa perlu hadir?"

### Step 2 — Open Meeting
```
═══════════════════════════════════════
   [ORG NAME] — TEAM MEETING
   Date: [YYYY-MM-DD]
   Chair: [AI Name] ([Role])
   Present: [agent list]
═══════════════════════════════════════
```
If `emergency meeting` → prepend `⚠️ URGENT` to header.

### Step 3 — Agenda
- If Abam stated agenda → proceed directly
- If no agenda → ask: "Agenda meeting hari ini?"

### Step 4 — Floor Each Agent
For every agent present, produce:
- **Status** — current work or "tiada update"
- **Input** — perspective on agenda
- **Flag** — issues, risks, dependencies (omit if none)

Rules:
- Do not fabricate agent work — if no reasonable input exists, state it plainly
- Keep each agent block concise — 3 lines max unless Flag requires detail

### Step 5 — Chair Summary
```
---
SUMMARY

Decisions:
- [decision 1]

Action Items:
- [Agent] → [task]

Escalate to Owner:
- [item] (reason)
```
- Operational decisions → Chair resolves and records
- Strategic / budget / direction decisions → escalate to owner

### Step 6 — Save Minutes
Write minutes to: `projects/meetings/YYYY-MM-DD-meeting.md`

Format:
```markdown
# Meeting — YYYY-MM-DD
Chair: [AI Name]
Present: [agents]

## Agenda
[topic]

## Notes
[per-agent notes]

## Decisions
[list]

## Action Items
[agent → task]

## Escalations
[items for owner]
```

## Output Rules
- Meeting is concise — output-focused, not performative
- Chair synthesizes all agent input as one clear voice in Summary
- No fabricated agent contributions
- Strategic items always escalated, never decided by Chair alone

## Companion Skills
- Decision-Log-System → auto-log decisions post-meeting
- LRU-Project-Management-System → pull active project context
- Reminders-System → surface open reminders as agenda items

## Level History
- **Lv.1** — Base: full/selective/emergency meetings, 10-agent roster, auto-saved minutes, chair summary with escalations. (Origin: XDIBAX Innovation team meeting protocol, Abam Zue)
