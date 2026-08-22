# DIBA War Room — Block Command Center

2D isometric visual simulation: **every DIBA skill = one NPC** in a Minecraft-inspired HQ.

## Quick Start

```bash
# 1. Refresh NPC registry
node Feature/War-Room-System/scripts/scan-skills.mjs

# 2. Jalankan server (WAJIB — jangan buka file:// terus)
cd Feature/War-Room-System/war-room
node serve.mjs

# 3. Buka browser
http://localhost:8765
```

**Masuk HQ:** klik `▶ MASUK HQ`, tekan **ENTER**, atau klik luar kotak dialog.

## Contents

| Path | Purpose |
|------|---------|
| `scripts/scan-skills.mjs` | Auto-scan skills → NPC registry |
| `data/agents.json` | Full registry (JSON) |
| `war-room/agents-data.js` | Embedded data for browser |
| `war-room/index.html` | Interactive War Room UI |
| `SKILL.md` | DIBA skill trigger definition |

## Stats (last scan)

- **63** unique skill NPCs (deduped)
- **12** staff boss NPCs
- **11** districts

## Controls

- **Drag** — pan map
- **Scroll** — zoom
- **Click NPC** — profile card (triggers, status)
- **Roster panel** — filter district, search, tabs
- **Simulate Active** — cycle dormant → active → done

---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]]*
