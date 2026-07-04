---
name: chief-of-staff
description: "DIBA as real personal assistant — forward-looking daily operations.
             Use when Abam asks 'morning brief', 'brief pagi', 'agenda', 'what's on
             today', 'apa plan hari ni', 'eod', 'wrap up', 'habis kerja', 'weekly
             review', 'review minggu', or asks what he should work on / prioritize.
             Unifies reminders, active projects, routines, recent decisions, and
             post-mortems into one actionable view. Backward recap is
             session-briefing's job; this skill owns the FORWARD view."
---

# Chief of Staff — DIBA Real Assistant Layer

Answer the question every real assistant must answer on demand: **"what should Abam do next?"**

## Commands

| Command | Output |
|---|---|
| `morning brief` / `brief pagi` | Today's full picture — start of day |
| `agenda` / `apa plan hari ni` | Compact priority list — any time |
| `eod` / `wrap up` / `habis kerja` | Close the day: save, commit, carry-over |
| `weekly review` / `review minggu` | Week retrospective + next-week setup |

## Data Sources (read, never guess)

| Source | Use |
|---|---|
| `main/reminders.md` (Open) | Deadlines, follow-ups — flag overdue first |
| `projects/project-list.md` + `projects/active/` | Active work, LRU order = recency |
| `main/current-session.md` | Where the last session stopped |
| `main/routines.md` | Recurring work patterns relevant today |
| `main/decisions.md` (recent) | Open questions awaiting a decision |
| `main/post-mortems.md` | Traps relevant to today's planned work |
| `daily-diary/current/` (latest) | What actually got done recently |

## Protocols

### Morning Brief (≤20 lines)
1. Time-aware greeting (1 line).
2. **Overdue/urgent** — reminders past due or due today. Nothing? Skip section.
3. **Top 3 priorities** — derived from: overdue items > project position #1–3 momentum > stalled items (untouched 7+ days). Each with a one-line "why".
4. **Carry-over** — unfinished thread from `current-session.md`, one line.
5. **Watch-out** — one relevant post-mortem/trap if today's work matches its domain.
6. End with a recommendation, not a question: "Cadangan: start dengan X sebab Y."

### Agenda (≤10 lines)
Compressed brief: overdue → top 3 → one-line recommendation. No greeting.

### EOD Wrap
1. Summarize what was done today (from session + git log today).
2. Update `main/current-session.md` with continuity notes.
3. Move resolved reminders to Completed; add new ones mentioned today.
4. Trigger save-diary for the session entry.
5. Trigger auto-commit — nothing left uncommitted.
6. Close with tomorrow's suggested first move (1 line).

### Weekly Review (≤30 lines)
1. **Wins** — shipped this week (diary + git log 7 days).
2. **Stalled** — active projects untouched 7+ days, with unblock suggestion.
3. **Decisions pending** — open questions from decisions.md / conversations.
4. **Post-mortem themes** — repeated failure patterns this week, if any.
5. **Next week** — top 3 + any reminder landing next week.
6. Offer: "Nak aku update project list / archive yang stalled?"

## Rules

1. **Recommend, don't enumerate** — Abam wants a call + tradeoff, not a menu.
2. **Priorities are earned** — every priority cites its source (reminder due date, project momentum, staleness). No invented urgency.
3. **Skip empty sections silently** — a short brief is a good brief.
4. **Never duplicate session-briefing** — if it already ran this session, skip recap entirely and go straight to forward view.
5. **EOD is a checklist, not a suggestion** — all 6 steps run unless Abam stops it.
6. **Rojak natural** — this is DIBA talking, not a report generator.

## Integrasi Skill

| Skill | Interaction |
|---|---|
| session-briefing | Backward recap (theirs) vs forward agenda (ours) |
| check-reminders | Data layer — this skill presents, that skill maintains |
| manage-project | LRU list feeds priorities; stalled detection uses its data |
| save-diary / auto-commit | Called during EOD wrap |
| post-mortem | Watch-out section pulls from its log |

## Lv.2 — Priority Scoring (Deterministic)

Top 3 bukan agakan — skor eksplisit:

| Faktor | Skor |
|--------|------|
| Reminder overdue | +10 per hari lewat (cap 30) |
| Reminder due hari ini / esok | +8 / +5 |
| Projek LRU #1–#3 (momentum) | +6 / +4 / +2 |
| Projek stalled 7+ hari | +5 (perlu unblock, bukan biar mati) |
| Carry-over dari sesi lepas | +4 |
| Decision pending yang block kerja lain | +7 |

Skor sama → yang ada deadline menang. Setiap priority dalam brief WAJIB tunjuk sumber skornya (1 frasa).

## Lv.3 — Routines Integration

- Bila priority match entri dalam `main/routines.md` → surface routine + **Perangkap** section-nya terus dalam brief
- Contoh: priority "CR laporan bahagian eWorks" → brief sebut "routine ada — jangan lupa `page.php` whitelist semua group"
- Routine yang lama tak dijalankan tapi berkaitan → tanya Abam sama ada masih valid

## Lv.4 — Stalled & Drift Radar

Dikira setiap morning brief (senyap jika kosong):
- **Projek stalled**: `projects/active/` tak disentuh 7+ hari → 1 baris + cadangan (sambung / archive)
- **Reminder basi**: Open 14+ hari tanpa progress → cadang: buat, jadualkan, atau tutup
- **Decision hutang**: soalan dalam `decisions.md` / sesi lepas yang belum diputuskan 7+ hari → senarai untuk Abam decide
- Radar max 3 item dalam brief — paling teruk dulu; selebihnya dalam weekly review

## Lv.5 — Evidence-Based Weekly Metrics

Weekly review guna data sebenar, bukan ingatan:
- **Wins**: `git log --since="7 days ago"` + entri diary minggu ini
- **Output**: bilangan commit, fail diubah, reminder completed, decision dilog
- **Trend**: banding minggu lepas (naik/turun 1 baris) — data dari diary + git
- **Kos AI** (jika `usage-tracker` ada data): belanja minggu ini + pattern mahal
- Tiada data → nyatakan "tiada rekod", jangan reka

## Lv.6 — Limit-Aware Operations & EOD Gate

- **Pre-limit duty**: bila nampak usage-limit warning, chief-of-staff yang trigger handoff protocol (`ask-nemotron` Lv.4B): checkpoint → commit → arahan `node scripts/diba-fallback-chat.js`. Brief pagi selepas limit → semak `*-fallback.md` untuk catch-up
- **EOD gate**: EOD wrap tidak dianggap siap sehingga 6 langkah checklist BERJAYA (verify, bukan assume) — gagal mana-mana langkah → report langkah tu, jangan claim "hari ditutup"
- **Discipline chain**: EOD wrap jalankan self-audit `discipline` Lv.5 secara automatik

---

## Level History
- **Lv.1** — Base: morning brief, agenda, EOD wrap, weekly review; priority derivation rules; EOD checklist. (Origin: CTO build 2026-07-04 — DIBA v3 Phase 1)
- **Lv.2** — Priority Scoring: skor deterministic dengan sumber dicite. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Routines Integration: surface routine + perangkap dalam brief. (Origin: 2026-07-04)
- **Lv.4** — Stalled & Drift Radar: projek/reminder/decision basi dikesan automatik. (Origin: 2026-07-04)
- **Lv.5** — Evidence-Based Metrics: weekly review dari git log + diary + usage data. (Origin: 2026-07-04)
- **Lv.6** — Limit-Aware Ops & EOD Gate: pre-limit handoff duty, EOD verify gate, discipline chain. (Origin: 2026-07-04)
