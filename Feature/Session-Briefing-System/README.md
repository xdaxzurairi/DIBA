# Session Briefing System

**Status:** Active  
**Skill:** `session-briefing`  
**Versi:** Lv.5 — Superultra Edition

## Tujuan

Lapisan intelligence automatik yang dihantar **sebelum** respons pertama setiap sesi — memberikan Abam gambaran penuh tentang konteks semasa tanpa perlu tanya atau scroll balik.

Session Briefing bukan sekadar recap — ia adalah **situational awareness layer** yang menyatukan last session, reminders, project health, seeds aktif dari Resonance, dan inbox tasks dalam satu brief yang padat.

---

## Apa yang Dihantar

| Bahagian | Sumber | Required |
|----------|--------|----------|
| Last session recap | `main/current-session.md` | Ya |
| Active project + health | LRU Project Management System | Optional |
| Attention flags (🔴🟡) | LRU Project Management System | Optional |
| Open reminders | `main/reminders.md` | Optional |
| Seeds aktif | `main/mind-tree.md` (Resonance) | Optional |
| Inbox tasks | `diba-hub/data/inbox.json` | Optional |
| Time-based suggestion | Time-based-Aware System | Optional |

---

## Output Format

### Lengkap
```
📋 Session Brief · Pagi

Last session: Fix bug login timeout — selesai, pushed ke staging
Active: BFM2026 · on track
🔴 eWorks — 32 hari idle
Reminders: 2 open → Review PR sebelum EOD
🌱 Seeds: Predictive Memory Layer — GROWING
Suggestion: Arkitektur atau feature baru
```

### Minimal (standalone)
```
📋 Session Brief

Last session: [recap dari current-session.md]
```

**Peraturan output:** Maksimum 12 baris. Skip bahagian yang tiada isi.

---

## Cara Guna

| Input | Tindakan |
|-------|----------|
| Buka sesi baru | Brief auto-dihantar sebelum respons pertama |
| `brief` | Trigger manual — hantar semula brief |
| `session brief` | Sama seperti `brief` |
| `where did we leave off` | Sama seperti `brief` |
| `skip brief` | Suppress untuk sesi ini sahaja |

---

## Lifecycle Brief

```
SESI BARU → LOAD CONTEXT → COMPOSE → DELIVER → HANDOFF → [DORMANT]
                                                    ↑
                               (Abam minta 'brief' → surface semula)
```

| State | Maksud |
|-------|--------|
| `LOAD` | Baca semua sumber serentak |
| `COMPOSE` | Susun brief ikut priority dan format |
| `DELIVER` | Output sebelum request Abam diproses |
| `HANDOFF` | Tunggu Abam pilih (inbox) atau terus ke request |
| `DORMANT` | Brief sudah dihantar — tunggu trigger manual |

---

## Seeds Integration (Resonance)

Session Briefing kini bersepadu dengan Resonance System:

- Surface seeds dengan status `PLANTED`, `GERMINATING`, atau `GROWING` — max 2
- Bila seed mencapai `BLOOMING` → surface dalam brief + tanya Abam nak harvest
- Seeds yang tiada aktiviti > 7 hari (DORMANT) → surface sekali sebagai peringatan

---

## Ownership Boundaries

| Skill | Domain |
|-------|--------|
| `session-briefing` | Startup brief — satu kali per sesi |
| `diba-recall` | On-demand atau deep workspace recall |
| `check-reminders` | Operasi reminder-specific |
| `resonance` | Seed nurture aktif |

Session-briefing **surface sahaja** — tidak orchestrate, tidak decide.

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| `Time-based-Aware-System` | Time period + work suggestion |
| `LRU-Project-Management-System` | Active project + idle/stale health flags |
| `Reminders-System` | Open reminder items |
| `Resonance-System` | Seeds aktif dari mind-tree |
| `DIBA-Hub` | Queued inbox tasks |

Boleh digunakan standalone dengan hanya `main/current-session.md`.

---

## Fail

| Fail | Tujuan |
|------|--------|
| `SKILL.md` | Skill definition penuh — deploy ke `~/.claude/commands/session-briefing.md` |
| `session-brief-core.md` | Core protocol rujukan |
| `install-session-briefing.md` | Panduan install langkah demi langkah |

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/session-briefing.md`
2. Pastikan `main/current-session.md` wujud
3. Install companion systems untuk brief yang lebih kaya (semua optional)
4. Verify: buka sesi baru — brief patut muncul sebelum respons pertama


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
