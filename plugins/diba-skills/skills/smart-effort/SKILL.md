---
name: smart-effort
description: "Calibrate effort to task complexity silently before responding — response
             depth, tool budget, and verification level. Simple → answer direct, minimal
             tools. Medium → normal investigation. Hard → full investigation + verify +
             suggest '/fast' or a stronger model to Abam if available. Fires automatically
             on every prompt. Override with: 'quick answer', 'full effort', 'deep dive',
             'smart-effort off'."
argument-hint: "tier: simple | medium | hard | auto"
---

# Smart Effort — DIBA Effort Calibration
*Classify. Calibrate. Execute. Senyap.*

> **Lv.2 honesty note:** a skill CANNOT switch the running model — model selection
> belongs to Abam (`/model`, `/fast`) and the harness. Lv.1 claimed haiku/sonnet
> auto-routing; that was fictional and is retired. What DIBA *does* control:
> how deep it investigates, how many tools it spends, how much it verifies,
> and how long the answer is. That is what this skill calibrates.

## Activation

Always-on — silent classification before every response. No output unless escalating or overriding.

## Context Guard

| Context | Status |
|---------|--------|
| **Every prompt (default)** | ACTIVE — classify silently, apply tier |
| **Abam kata "quick answer" / "ringkas je"** | OVERRIDE → force Simple |
| **Abam kata "full effort" / "deep dive"** | OVERRIDE → force Hard |
| **Task escalates mid-execution** | ESCALATE — notify 1 baris, upgrade tier |
| **Abam kata "smart-effort off"** | EXIT — deaktif |

## Tier Classification

### Tier 1 — Simple
| Signal | Contoh | Calibration |
|--------|--------|-------------|
| Soalan pendek / lookup | "apa itu X?", "mn file Y?" | Answer direct; ≤2 tool calls; no ceremony |
| 1 fail, perubahan kecil | typo fix, rename | Edit terus; verify ringkas |
| Konfirmasi / ya-tidak | "betul ke cara ni?" | 1–3 baris jawapan |

### Tier 2 — Medium
| Signal | Contoh | Calibration |
|--------|--------|-------------|
| 2–5 fail terlibat | refactor function, debug biasa | Normal investigation; verify changed paths |
| Analisis + cadangan | "review kod ni" | Structured findings, evidence cited |
| Feature kecil | 1 component, 1 API route | Plan ringkas → build → verify |

### Tier 3 — Hard
| Signal | Contoh | Calibration |
|--------|--------|-------------|
| Multi-file / cross-system | refactor besar, migration, audit | Full investigation; work-plan/orchestrate; verify end-to-end |
| Architecture / strategy | "design sistem untuk X" | Read all relevant context first; tradeoffs explicit |
| Debug complex | race condition, cascade failure | Reproduce → isolate → fix → prove |
| **Model suggestion** | — | If a stronger model or `/fast` would genuinely help, tell Abam in 1 line — dia yang decide |

## Classification Protocol

1. **Scan prompt (silent)** — count files involved, detect keywords (audit, design, migrate, explain, fix), estimate steps.
2. **Assign tier** — Simple: 1 fail/1 langkah · Medium: 2–5 fail · Hard: 5+ fail / architecture / orchestration.
3. **Apply (silent)** — calibrate depth/tools/verification; no output to Abam.
4. **Monitor mid-task** — scope grows beyond tier → escalate with 1-line notice: `[Smart Effort: escalated → hard]`.

## Mandatory Rules

1. **Senyap by default** — output only on escalation or override.
2. **Escalate, never silently downgrade** — scope grows, effort grows; jangan turun tanpa arahan.
3. **Override adalah mutlak** — arahan Abam menang.
4. **Never fake control** — no claiming model switches; suggest to Abam instead.
5. **Tier ikut KESELURUHAN task** — bukan prompt pertama sahaja.
6. **Token Guard integration** — bila compact mode aktif, bias ke lower tier; escalate hanya bila perlu.

## Integrasi Skill

| Skill | Interaksi |
|-------|-----------|
| `token-guard` | Compact mode aktif → prefer lower tier |
| `orchestrate` | Orchestration auto-trigger = Hard |
| `session-briefing` / `chief-of-staff` | Brief/agenda = Simple (baca fail sahaja) |
| `work-plan` | Plan execution = Medium/Hard ikut skop |

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Prompt ambiguous | Default Medium — lebih selamat |
| Task ringkas tapi fail besar | Classify ikut TASK, bukan saiz fail |
| Abam override tapi mismatch jelas | Apply override + 1 baris nota |
| Mid-task scope shrinks | Kekal tier semasa |
| Subagent tasks | Subagent inherit parent tier |

## Level History

- **Lv.1** — Base: 3-tier classification, silent auto-routing, override commands. Claimed model switching (haiku/sonnet/fast) — fictional. (Origin: Forge by Zuex, 2026-06-09)
- **Lv.2** — Honesty rescope: effort calibration (depth/tools/verification) instead of model switching; model changes are *suggested* to Abam, never claimed. (Origin: CTO audit 2026-07-04, F-smart-effort)
