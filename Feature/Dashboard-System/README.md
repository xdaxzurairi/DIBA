# 📊 Dashboard System

A visual status panel for the Continuous Improvement System. Displays instinct health, observation counts, learning level, and actionable signals — all in one glanceable view.

---

## What It Does

- **Reads** project observations and instinct files
- **Renders** a structured ASCII dashboard with instinct confidence bars
- **Flags** stale instincts, unprocessed observations, and available instinct packs
- **Suggests** next actions based on system health

## Bootstrap Defaults

- Jika project sudah ada observations yang tinggi tetapi instinct layer kosong, dashboard patut menganggap bootstrap starter set sebagai baseline yang valid untuk DIBA.
- Domain baseline semasa:
  - orchestration
  - memory retention
  - prioritization
  - follow-up closure
  - decision logging
  - verification discipline
  - batched tooling
  - bottleneck recording
- Confidence bootstrap default patut kekal dalam julat `0.62-0.69` supaya signal awal masuk kategori **suggest** dan bukannya auto-apply.
- Jika `instinct-packs/` wujud, pack families baseline yang patut dipaparkan dahulu ialah `orchestration-core`, `execution-discipline`, dan `memory-ops`.

---

## Output Format

```
╔══════════════════════════════════════════════════════════════╗
║              continuous-improvement Dashboard                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Project: <name>              Level: <CAPTURE|ANALYZE|...>   ║
║  Sessions: ~<obs/10>          Mode: <beginner|expert>        ║
║                                                              ║
║  ┌─ Observations ────────────────────────────────────────┐   ║
║  │  Total: <n>    Unprocessed: <n>    Last: <date>       │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Instincts ───────────────────────────────────────────┐   ║
║  │  Total: <n>                                           │   ║
║  │  ████████░░ Auto-apply (0.7+): <n>                    │   ║
║  │  █████░░░░░ Suggest (0.5-0.69): <n>                   │   ║
║  │  ██░░░░░░░░ Silent (< 0.5): <n>                       │   ║
║  │  Global: <n>    Project: <n>                          │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Top Instincts ───────────────────────────────────────┐   ║
║  │  <top 5 instincts by confidence with bars>            │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Health ──────────────────────────────────────────────┐   ║
║  │  Stale (30+ days): <n>    Decaying: <n>               │   ║
║  │  Recently reinforced: <n>                             │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## When to Use

Run after `/continuous-improvement` to get a visual health snapshot.
Also useful at session start to check instinct system status.
Jika bootstrap instincts sudah wujud, paparkan top IDs secara jelas supaya capability aktif boleh dilihat terus.

---

## Requirements

- `~/.claude/instincts/<project-hash>/observations.jsonl` — observation log
- `~/.claude/instincts/<project-hash>/*.yaml` — project instinct files
- `~/.claude/instincts/global/*.yaml` — global instinct files
- **Requires**: Continuous-Improvement-System

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Continuous-Improvement-System** | Dashboard visualizes the data CI produces |
| **Discipline-System** | Dashboard health signals map to the 7 laws |

---

## Installation

See `install-dashboard.md` for setup steps.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
