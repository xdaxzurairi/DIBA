---
name: departments
description: "DIBA org map — which domain owns which skill. Reference only: routing is trigger-phrase match (see plugins/diba-skills/README.md), this just shows the shape. Triggers: 'department status', 'company status', 'siapa handle X', 'who owns X', 'brief [domain]', or a staff code name (NEXUS, FORGE, LENS, ORACLE, PIXEL, ECHO, CIPHER, GRID, PULSE, SAGE)."
---

# Departments — DIBA Org Map

*Replaces the 9 `*-head` router skills (2026-09-10 spring-clean). One file, one place to see the shape. Actual skill routing = exact trigger-phrase match in `plugins/diba-skills/README.md` — this is a human reference, not a router.*

## Domains → current skills

| Domain | Skills | Staff (persona) |
|---|---|---|
| **Biz** | manage-project · meeting · log-decision · post-mortem · work-plan · orchestrate · chief-of-staff | ORACLE (Strategy) |
| **Dev** | code-sharp (← focused-fix, tech-debt-tracker) · forge-skill · repo-pack (← project-map) · orchestrate (← dispatching-parallel-agents, auto-worker) · security-guidance · observation · security-audit-remediation | NEXUS (CTO), FORGE (AI Eng) |
| **Design** | frontend-design · interaction-design · image-generation (media) · resonance | PIXEL (UX) |
| **Finance** | usage-tracker | — |
| **Legal** | *(no active skill — re-add via forge-skill on real need)* | CIPHER (Security) for compliance |
| **Memory** | echo-recall · save-memory (← capture, memory-compaction) · library · auto-learn (← auto-learn-new-folder, mulahazah, continuous-improvement, dashboard) · check-reminders · save-diary (← topic-diary) | LENS (Data), SAGE (Research) |
| **Ops** | auto-commit · discipline · token-guard · break-reminder · ask-nemotron · diba-response (← smart-effort) | GRID (DevOps), PULSE (QA) |
| **Marketing** | marketing-workshop (← hook-generator) · resonance | ECHO (Brand) |
| **Research** | deep-research (← pulse) · web search | SAGE (Research) |

## Usage

- **"siapa handle X" / "who owns X"** → point to the domain + skill above.
- **"brief [domain]"** → summarise that domain's skills + any open items from that area.
- **Staff code name mentioned** → read `company/staff/[STAFF].md`, embody that persona for the reply, sign as `— [STAFF], [Title]`.
- Cross-domain task → `orchestrate` (fan out, synthesise in main context).

## Level History
- **Lv.1** — Collapse: 9 `*-head` router skills (biz/dev/design/finance/legal/memory/mkt/ops/social) merged into this single org-map reference. Routers added nothing over trigger-phrase matching + `orchestrate`. (Origin: 2026-09-10 — spring-clean 74→~33)
