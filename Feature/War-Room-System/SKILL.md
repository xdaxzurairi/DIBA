---
name: war-room
description: "Visual 2D isometric War Room showing all DIBA skills as Minecraft-style NPCs across 9 districts. Trigger with 'war room', 'buka HQ', 'block command center', 'open war room', or 'baca war room' to read invoke queue from live bridge."
---

# War Room — Block Command Center
*Every skill is an NPC. DIBA is your guide.*

## Activation

When this skill activates, output:
"War Room dibuka. Setiap skill = NPC di Block Command Center."

Then open `Feature/War-Room-System/war-room/index.html` in the editor or browser.

## Context Guard

| Context | Status |
|---------|--------|
| **"war room", "buka HQ", "block command center"** | ACTIVE — open war room |
| **"baca war room", "read war room"** | ACTIVE — fetch /api/invoke/next dan execute |
| **"refresh NPC", "scan skills"** | ACTIVE — run `node scripts/scan-skills.mjs` |
| **Sesi biasa tanpa trigger** | DORMANT |

## Protocol

### Step 1: Refresh registry (if stale)

```bash
node Feature/War-Room-System/scripts/scan-skills.mjs
```

Scans:
- `Feature/**/SKILL.md`
- `plugins/diba-skills/skills/**/SKILL.md`
- `~/.cursor/skills/**/SKILL.md`

Dedupes by `name:` frontmatter. Output: `data/agents.json`, `war-room/agents-data.js`.

### Step 2: Open War Room

Path: `Feature/War-Room-System/war-room/index.html`

### Step 3: Live Chat Bridge

War Room sync dengan chat DIBA melalui local API (`serve.mjs`):

```bash
# Server mesti jalan
cd Feature/War-Room-System/war-room && node serve.mjs
```

**Dari DIBA chat** — bila skill aktif, notify War Room:

```bash
node Feature/War-Room-System/scripts/bridge-notify.mjs skill orchestrate active "MAESTRO routing parallel"
node Feature/War-Room-System/scripts/bridge-notify.mjs chat diba "CIPHER + GRID deploy untuk audit"
```

**Dari War Room UI:**
- **Taip terus** dalam kotak `💬 DIBA CHAT` di panel kanan (sentiasa nampak)
- Klik **HANTAR** atau NPC → **💬 HANTAR**
- **Tak perlu paste** — mesej masuk queue

**Dalam Cursor chat** — bila Abam taip `baca war room`:
1. `GET http://localhost:8765/api/invoke/next`
2. Jika ada `item.prompt` → execute sebagai arahan Abam
3. Notify: `node scripts/bridge-notify.mjs skill <id> active "<ringkas>"`
4. Reply: "War Room queue dibaca: [prompt]"

**API endpoints:**
- `POST /api/skill` — `{ skillId, status, message }`
- `POST /api/chat` — `{ role, text, skillId? }`
- `POST /api/invoke` — `{ prompt, skillId? }`
- `GET /api/events` — SSE live stream

### Step 4: Guide Abam

- **63 skill NPC** (villager tier) across 9 districts + workshop
- **12 staff boss** (xdibax company roster)
- Click NPC → triggers, status, simulate active/done
- Roster panel: filter by district, search, tab staff/skills
- **Live bridge** dot hijau = sync chat aktif

## Districts

| District | Skills |
|----------|--------|
| Spawn Plaza | diba-welcome, diba-bye, diba-memory |
| Memory | save-memory, session-briefing, echo-recall, ... |
| Diary | save-diary, log-decision, post-mortem, ... |
| Project | manage-project, work-plan, meeting, ... |
| Automation | auto-commit, auto-worker, hooks, ... |
| Command | orchestrate, diba-operator, forge-skill, ... |
| Wellness | break-reminder, dashboard, token-guard, ... |
| Code | code-sharp, security-audit, dev-assistant, ... |
| Persona | mood/tone/time inject, mulahazah |
| Creative | interactive-story, image-prompt, frontend, ... |
| Workshop | MCP, plugin-dev, math-olympiad, ... |

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]]*
