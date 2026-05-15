# 📊 Dashboard System — Skill Plugin

## Skill Name
Dashboard

## Trigger Words
- `"dashboard"`
- `"instinct dashboard"`
- `"learning status"`
- After running `/continuous-improvement`

## Activation Condition
Manual trigger. Renders a visual snapshot of the Continuous Improvement System state for the current project.

## Behavior

### Step 1 — Find Project Hash
```bash
git rev-parse --show-toplevel
```
SHA-256 first 12 chars of the root path = project hash.

### Step 2 — Read Observations
Count lines in `~/.claude/instincts/<hash>/observations.jsonl`.

Extract:
- Total observation count
- Unprocessed count (observations since last analysis run)
- Date of most recent observation

### Step 3 — Read Instincts
Load all `*.yaml` files from:
- `~/.claude/instincts/<hash>/` — project instincts
- `~/.claude/instincts/global/` — global instincts

For each instinct, extract: id, domain, confidence, last updated.

### Step 4 — Check Instinct Packs
Check `instinct-packs/` for any available packs not yet loaded.

### Bootstrap Defaults

- Jika project sudah ada observations yang tinggi tetapi instinct layer kosong, anggap bootstrap starter set berikut sebagai baseline yang valid untuk DIBA:
  - orchestration
  - memory retention
  - prioritization
  - follow-up closure
  - decision logging
  - verification discipline
  - batched tooling
  - bottleneck recording
- Confidence bootstrap default patut kekal dalam julat `0.62-0.69` supaya dashboard memaparkan signal **suggest** tanpa auto-apply palsu.
- Jika `instinct-packs/` wujud, utamakan paparan pack families `orchestration-core`, `execution-discipline`, dan `memory-ops` sebelum pack lain.

### Step 5 — Render Dashboard

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
║  │  <list top 5 instincts by confidence with bars>       │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Health ──────────────────────────────────────────────┐   ║
║  │  Stale (30+ days): <n>    Decaying: <n>               │   ║
║  │  Recently reinforced: <n>                             │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Step 6 — Post-Render Actions

After displaying dashboard:
- If stale instincts > 0 → suggest reviewing them
- If unprocessed observations > 20 → suggest running `/continuous-improvement`
- If no instincts exist → explain auto-leveling timeline (20+ observations needed)
- If bootstrap instincts exist → call out the top IDs explicitly so user nampak capability yang sedang aktif
- If instinct packs available → list packs not yet loaded

## Level Thresholds

| Level | Condition |
|-------|-----------|
| CAPTURE | < 20 observations |
| ANALYZE | 20+ observations, instincts being created |
| SUGGEST | Any instinct confidence ≥ 0.50 |
| AUTO-APPLY | Any instinct confidence ≥ 0.70 |

## Companion Skills
- Continuous-Improvement-System → produces the data this dashboard visualizes
- Discipline-System → dashboard health signals map to the 7 laws

## Level History
- **Lv.1** — Base: project hash detection, observations count, instinct confidence breakdown with ASCII bars, health flags (stale/decaying/reinforced), post-render action suggestions. (Origin: Continuous Improvement visual layer, xdaxzurairi)
