---
name: post-mortem
description: "Auto-detects failure signals and triggers on 'post-mortem', 'postmortem', 'log this failure', 'write a post-mortem', or 'what went wrong'. Appends analysis to main/post-mortems.md."
---

# 🔥 Post-Mortem — Skill Plugin

## Skill Name
Post-Mortem System

## Trigger Words
- `"post-mortem"`
- `"postmortem"`
- `"log this failure"`
- `"write a post-mortem"`
- `"what went wrong"`

## Auto-Detection Triggers (Passive — Always Active)
AI watches for these signals and prompts the user:

| Signal | Phrase Examples |
|--------|----------------|
| Deployment failure | "it crashed", "pod is failing", "image pull error", "rollback" |
| Test regression | "tests are broken", "was passing before", "something broke" |
| Architecture reversal | "undo this", "we need to revert", "this approach doesn't work" |
| Wasted time | "wasted hours", "dead end", "that didn't work at all" |
| Security incident | "exposed secret", "accidentally committed", "vulnerability" |
| Data loss | "data is gone", "migration failed", "backup didn't work" |

On detection, AI asks: *"That didn't go as planned. Worth a post-mortem?"*
User says yes → AI fills out the format from `post-mortem-core.md`.
User says no → move on, no log created.

## Manual Trigger
User says `"post-mortem"` or `"log this failure"` → AI immediately starts the post-mortem format.

## Behavior
1. Detect signal (passive) or receive explicit trigger (manual)
2. Ask: "Worth a post-mortem?" (skip if manual trigger — user already decided)
3. If yes: fill out format from `post-mortem-core.md`, ask clarifying questions as needed
4. Append entry to `main/post-mortems.md`
5. Reference entry in future sessions when work touches the same domain

## Domain Reference Behavior
When starting work in a domain that has a past post-mortem:
- Check `main/post-mortems.md` for relevant entries
- Flag: "⚠️ Reminder: [lesson] — see post-mortem [date]"

### Regression Link (Lv.4)

Bila failure sama domain muncul semula:
- Cari entry lama dalam `main/post-mortems.md` dengan kata kunci domain/fail
- Jika jumpa: sebut "regression vs [date]" dan lesson yang terlepas
- Tawar update entry lama atau post-mortem baharu

### Pattern Aggregation (Lv.5)

Setiap 5 post-mortem entries, auto-analisa:
- Categorize root causes: config, logic, integration, dependency, process
- Surface top-3 recurring root causes
- Tambah `## Patterns` section di akhir `main/post-mortems.md`
- Format: "Category [X occurrences]: [ringkasan pattern]"

### Preventive Alert (Lv.6)

Sebelum mula kerja dalam domain berisiko tinggi:
- Scan post-mortems.md untuk domain yang matching (file path, tech, API)
- Jika domain ada 2+ post-mortems: surface preventive alert
- Format: "Domain ini ada [X] kegagalan sebelum. Risiko utama: [lesson]. Mitigation: [cadangan]"
- Alert hanya muncul sekali per session per domain — tidak spam

### Outcome Scoring Against Pre-Committed Criteria (Lv.7)

Guna bila post-mortem ni untuk keputusan yang **ada kriteria success/kill ditulis sebelum** (dalam `decisions.md`, `work-plan`, atau reminder asal) — bukan retrofit lepas fakta:

1. Cari entri asal (decisions.md / plan) — extract kriteria success & kill yang ditulis masa tu
2. Jika tiada kriteria eksplisit ditulis dulu: skip section ni, jangan reka kriteria retroaktif (retroactive justification = musuh utama post-mortem jujur)
3. Jika ada: tambah jadual dalam entry

   | Kriteria Success | Threshold | Actual | Capai? |
   |---|---|---|---|
   | ... | ... | ... | ✅ / ❌ |

   | Kriteria Kill | Threshold | Actual | Trigger? |
   |---|---|---|---|
   | ... | ... | ... | ✅ / ❌ |

4. **Status keseluruhan**: WIN / PARTIAL / LOSS / MIXED
5. **Assumption Audit** — assumption asal (dari decision/plan) disenaraikan, tandakan Held? YES/NO/PARTIAL + sebab
6. **Dissent Revisited** (jika ada alternatif yang ditolak masa keputusan dibuat, dicatat dalam decisions.md "rejected alternatives") — semak: adakah concern tu benar-benar berlaku? Kalau ya, apa kosnya?
7. Routing: WIN → tutup, tiada follow-up. LOSS → cadang decision baharu atau reverse via log-decision "Reversed:" entry.

Rasional: kriteria ditulis SEBELUM keputusan (bukan lepas), supaya tiada ruang untuk "memang dah agak dah" retroaktif — angka sama ada padan atau tidak.

## Level History
- **Lv.1** — Base: manual trigger + append to log
- **Lv.2** — Auto-detection of failure signals + passive prompting
- **Lv.3** — Domain reference: flag relevant post-mortems at session start or task start
- **Lv.4** — Regression Link: kait kegagalan semula dengan post-mortem sedia ada. (Origin: 2026-05-22 — naikkan skill batch)
- **Lv.5** — Pattern Aggregation: categorize root causes, surface top-3 patterns. (Origin: 2026-06-12)
- **Lv.6** — Preventive Alert: pre-work risk alert berdasarkan post-mortem history. (Origin: 2026-06-12)
- **Lv.7** — Outcome Scoring: bila decision asal ada kriteria success/kill pre-committed, score WIN/PARTIAL/LOSS/MIXED + Assumption Audit + Dissent Revisited, elak retroactive justification. (Origin: 2026-07-23 — upskill dari `xdaxzurairi/xdibax-skills` repo punya `/cs:post-mortem` konsep, disesuaikan tanpa command-pipeline/multi-role yang tak relevan untuk DIBA)
