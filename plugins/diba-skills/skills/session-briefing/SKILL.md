---
name: session-briefing
description: "Auto-triggers at session start to deliver session recap and reminders. Also triggers on 'brief', 'session brief', 'what did we do last time', or 'where did we leave off'. Suppress with 'skip brief'."
---

# 📋 Session Briefing — Skill Plugin

## Skill Name
Session Briefing

## Trigger Words
- Session start (automatic — fires before first response)
- `"brief"`
- `"session brief"`
- `"what did we do last time"`
- `"where did we leave off"`

## Suppress Trigger
- `"skip brief"` — suppresses for this session only

## Activation Condition
Fires automatically at the start of every new conversation session, before processing the user's first message.

## Behavior
1. Read `main/current-session.md` — extract last session recap (1–2 lines) + **Follow-up terbuka**
2. Read `main/reminders.md` — count open items (skip section if none)
3. Read `projects/registry.md` — match workspace semasa; sebut projek + path memory jika jumpa
4. Read project list — identify active project + 🔴/🟡 health flags (if LRU System installed)
5. Check current time — determine time period (if Time-based-Aware System installed)
6. Compose and deliver brief (max 12 lines) before responding to user

## Output Rules
- Maximum 12 lines total
- Maximum 3 attention flags — show most critical first
- Skip any section that has nothing to report
- Deliver before processing the user's first request

## Companion Skills
- Time-based-Aware-System → time period + work suggestion
- LRU-Project-Management-System → active project + health flags
- Reminders-System → open reminder items

## Level History
- **Lv.1** — Base: session recap + time suggestion
- **Lv.2** — Reminders integration (requires Reminders-System)
- **Lv.3** — Project health flags (requires LRU-Project-Management-System)
- **Lv.4** — Registry + Follow-up: baca `registry.md` untuk workspace match; surface follow-up dari `current-session.md`. (Origin: 2026-05-22 — naikkan skill batch)
