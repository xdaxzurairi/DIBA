# 💭 Dream Ideas System — Skill Plugin

## Skill Name
Dream Ideas

## Trigger Words
- `"diba, cuba impikan..."` / `"dream"`
- `"bagi idea baru"` / `"brainstorm"`
- `"inspirasi"` / `"imagine"`
- Any request to generate new creative ideas

## Suppression
- Regular work instructions → DORMANT
- Factual or analytical questions → DORMANT

## Activation Condition
Fires when the user requests creative ideation, imagination, or new ideas.

## Behavior

### Step 1 — Identify Topic and Domain
- Identify the topic or area for new ideas
- Check current workspace to determine domain context (Lv.2)

If workspace is unknown → ask: `"Untuk domain apa — eWorks, eRuangNiaga, DIBA, atau lain?"` before generating.

### Step 2 — Workspace-Aware Context (Lv.2)

Tailor ideas based on detected workspace:

| Workspace | Idea Focus |
|-----------|-----------|
| `pwa_eworks` | eWorks features: notifications, dashboard, mobile UX, complaint flow automation |
| `ruangniaga` | eRuangNiaga: tenant portal, reports, SSO, payment flow |
| XDIBAX / global | DIBA evolution, new skills, productivity tools, AI integration |
| Other project | Read project memory for domain context |
| Unknown | Ask before generating |

### Step 3 — Activate Dream Mode
Suspend normal logical constraints. Generate ideas that are:
- Creative and non-obvious
- Relevant to the domain
- Not a repeat of previously generated ideas (within session)

### Step 4 — Generate Ideas
Produce 3–5 ideas. For each:

```
## Idea [N]: [Title]
[1–2 sentence description]
[Optional: pseudocode / analogy / sketch if relevant]
```

### Step 5 — Present and Save
- Display all ideas to user
- Offer to save the best idea to today's diary or `dream-ideas.md`

## Mandatory Rules
1. Do not limit imagination — encourage wild, unique, untried ideas
2. Do not repeat old ideas unless asked
3. Always positive and constructive in tone
4. Ideas must be domain-relevant — use workspace context

## Companion Skills
- Save-Diary-System → save generated ideas to today's diary
- Library-System → archive standout ideas as reusable knowledge entries

## Level History
- **Lv.1** — Base: dream mode, generate 3–5 ideas with brief descriptions, save to diary or dream-ideas.md. (Origin: Creative brainstorming protocol DIBA, xdaxzurairi)
- **Lv.2** — Workspace-Aware: tailor ideas to current project domain based on workspace path — eWorks, eRuangNiaga, XDIBAX, or other. Ideas are more relevant and actionable. (Origin: Pattern from brainstorm sessions pwa_eworks, 2026-04-15 and 2026-04-28)
