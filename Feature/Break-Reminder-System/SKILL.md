# 🌿 Break Reminder System — Skill Plugin

## Skill Name
Break Reminder

## Trigger Words
- `"penat"` / `"burnt out"` / `"letih"`
- `"I have been working too long"`
- `"remind me to take a break"`
- `"ingatkan saya kalau lama sangat mengadap PC"`
- `"saya dah lama kerja"`

## Activation Condition
Fires when user expresses fatigue or requests a break reminder. Also auto-nudges if user continues working after having requested reminders earlier in the session.

## Behavior

### Step 1 — Session Duration Probe (Lv.2)
Read today's diary: `daily-diary/current/YYYY-MM-DD.md`
- Find the first timestamp entry of the day
- Estimate time elapsed since session started

Output:
```
Sesi bermula ~[HH:MM] tadi — dah lebih kurang [X] jam.
```

If no diary entry today (new session) → skip probe, proceed with standard reminder.

### Step 2 — Acknowledge
Acknowledge the user's state positively. No judgment, no lecture.

Example:
- `"Wajar untuk rehat — dah lama fokus."`
- `"Normal rasa macam ni lepas sesi panjang."`

### Step 3 — Recommend Break
Provide a specific, actionable break:

```
[ ] Minum air
[ ] Regangan 1–2 minit
[ ] Rehat mata 20-20-20 (20 saat, tengok 20 kaki jauh, setiap 20 minit)
[ ] Tarik nafas dalam 5 kali
[ ] Kembali dengan 1 tugasan kecil
```

Suggest break length:
- Micro break: 2–5 minutes
- Full break: 10–15 minutes (for 2+ hours of work)

### Step 4 — Offer Restart Plan
Suggest returning with one small task to rebuild momentum gently:
- `"Lepas rehat, kita sambung satu task kecil dulu supaya momentum kekal ringan."`

### Step 5 — Optional Cadence Suggestion
Offer a recurring reminder pattern:
- `"Nak saya ingatkan setiap 45–60 minit?"`

## Auto-Nudge Mode
If the user requested a reminder earlier in the session but continues working:

1. Insert a gentle nudge after several long responses
2. Keep tone light — not forceful
3. Suggest 2–5 minutes before continuing

Example nudge:
- `"Friendly reminder: anda dah lama fokus — jom rehat mata + minum air dulu."`
- `"Saya pausekan anda sekejap ya — ambil rehat 3-5 minit, lepas tu kita sambung."`

## Safety & Tone Rules
- No judgmental tone
- No specific medical advice
- Keep tone friendly, professional, and supportive
- Never force — always suggest

## Companion Skills
- Save-Diary-System → session duration probe reads from diary

## Level History
- **Lv.1** — Base: wellness reminder, acknowledge + recommend break + restart plan, auto-nudge mode when user previously requested reminders. (Origin: Wellness protocol DIBA, xdaxzurairi)
- **Lv.2** — Session Duration Probe: read diary timestamp of first entry today to estimate working time — gives context-aware reminder with actual elapsed time instead of generic message. (Origin: Pattern of working long sessions without noticing, 2026-04-28)
