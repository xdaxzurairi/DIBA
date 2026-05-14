# 🔍 DIBA Recall System — Skill Plugin

## Skill Name
DIBA Recall

## Trigger Words
- `"diba"` / `"recall"` / `"ingat semula"`
- Session start in any known workspace (when Session Briefing is not active)

## Ownership Boundary
- **Session-Briefing-System** owns the automatic startup brief
- **DIBA Recall** is for on-demand recall or deep workspace recall when requested
- **check-reminders** owns reminder-specific operations
- Do not duplicate the Session Brief — recall goes deeper when needed

## Activation Condition
Fires on explicit trigger or when user needs a full workspace context load. Not a replacement for session-briefing — use for deeper recall or when session-briefing is not installed.

## Behavior

### Step 1 — Detect Workspace
Identify the current working directory and project context.

### Step 2 — Lookup Project Registry
If LRU-Project-Management-System is installed:
- Check project registry for the current workspace
- Load matching project memory file from `projects/active/`

### Step 3 — Load Global Memory
Read in order:
1. `main/current-session.md` — last session recap + open follow-ups
2. `main/reminders.md` — open reminders only

### Step 4 — Deliver Recap

```
=== Recall: [Workspace / Project] ===

Sesi lepas: [topic + key decision]

Open reminders: [item if any — skip section if none]

Arah seterusnya: [suggested continuation or ask user]
```

Rules:
- Skip empty sections without announcing them
- Do not duplicate the full session-briefing format
- Surface only what is relevant to the current workspace

### Step 5 — Ask for Direction
If continuation is not clear from context:
- `"Nak sambung mana — [option A] atau [option B]?"`

## Companion Skills
- Session-Briefing-System → owns auto-startup brief; recall is on-demand
- LRU-Project-Management-System → project registry lookup
- Reminders-System → open reminder surface

## Level History
- **Lv.1** — Base: workspace detection, project registry lookup, global memory load (current-session + reminders), concise recap, direction ask. (Origin: DIBA workspace recall protocol, xdaxzurairi)
