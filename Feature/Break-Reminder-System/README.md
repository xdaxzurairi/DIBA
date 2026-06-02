# 🌿 Break Reminder System

A wellness layer that reminds the user to take breaks when working too long. Empathetic, non-judgmental, and actionable — with auto-nudge mode for users who forget.

---

## What It Does

- **Acknowledges** the user's state positively
- **Recommends** a break with specific steps
- **Offers a restart plan** — return with one small task to keep momentum
- **Auto-nudges** if the user stays active after requesting reminders
- **Session duration probe** — reads today's diary to estimate how long the user has been working (Lv.2)

---

## When to Use

Activate when user mentions:
- `"penat"` / `"burnt out"` / `"letih"`
- `"I have been working too long"`
- `"remind me to take a break"`
- `"ingatkan saya kalau lama sangat mengadap PC"`

---

## Response Pattern

1. Acknowledge the user's state
2. Recommend a break with clear steps
3. Offer a restart plan
4. Optionally suggest a recurring cadence (every 45–60 minutes)

---

## Break Checklist

```
[ ] Minum air
[ ] Regangan 1–2 minit
[ ] Rehat mata 20-20-20
[ ] Tarik nafas dalam 5 kali
[ ] Kembali dengan 1 tugasan kecil
```

---

## Session Duration Output (Lv.2)

```
Sesi bermula ~[HH:MM] tadi — dah lebih kurang [X] jam.
Rehat 10 minit sekarang ya, lepas tu sambung.
```

---

## Requirements

- No external files required
- **Optional**: `daily-diary/current/YYYY-MM-DD.md` for session duration probe

---

## Installation

See `install-break-reminder.md` for setup steps.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
