# 💭 Dream Ideas System

A creative ideation layer that generates fresh, imaginative ideas on demand. Workspace-aware — ideas are tailored to the current project domain so they are relevant and actionable, not generic.

---

## What It Does

- Activates **dream mode** — AI generates ideas without normal logical constraints
- Produces **3–5 creative ideas** with brief descriptions per session
- **Workspace-aware** — reads current project context to tailor ideas to the right domain
- **Saves** the best ideas to diary or a dedicated file

---

## When to Use

Activate when generating new ideas, exploring possibilities, or breaking creative blocks.

Trigger phrases:
- `"diba, cuba impikan..."` / `"dream"`
- `"bagi idea baru"` / `"brainstorm"`
- `"inspirasi"` / `"imagine"`

---

## Output Format

3–5 ideas, each with:

```
## Idea [N]: [Title]
[1–2 sentence description]
[Optional: pseudocode / analogy / sketch if relevant]
```

---

## Workspace Context

Ideas are tailored to the detected workspace:

| Workspace | Idea Focus |
|-----------|-----------|
| eWorks project | Notifications, dashboard, mobile UX, complaint flow automation |
| eRuangNiaga | Tenant portal, reports, SSO, payment flow |
| XDIBAX / global | DIBA evolution, new skills, productivity tools, AI integration |
| Unknown | Ask user for domain before generating |

---

## Requirements

- No external files required
- **Optional**: `daily-diary/current/YYYY-MM-DD.md` for saving ideas

---

## Companion Systems

| System | Enhancement |
|--------|-------------|
| **Save-Diary-System** | Save generated ideas to today's diary entry |
| **Library-System** | Archive standout ideas as reusable library entries |

---

## Installation

See `install-dream-ideas.md` for setup steps.


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
