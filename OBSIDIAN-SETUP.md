# Obsidian Setup — DIBA Memory System

**Vault Path**: `C:/Users/Administrator/xdibax/DIBA/`  
**Status**: Vault config ready — Obsidian not yet installed

---

## Step 1 — Install Obsidian

Download from **obsidian.md** → Windows installer → run setup.

---

## Step 2 — Open Vault

1. Launch Obsidian
2. Click **"Open folder as vault"**
3. Select: `C:/Users/Administrator/xdibax/DIBA/`
4. Open `HOME.md` as your starting note

---

## Step 3 — Install obsidian-git (Recommended)

Obsidian-git auto-commits your DIBA memory to git so changes are versioned.

1. Settings (Ctrl+,) → Community plugins → **Turn on** community plugins
2. Browse → search **"obsidian-git"** → Install → Enable
3. Settings → obsidian-git:
   - Auto commit interval: `10` (minutes)
   - Auto commit message: `obsidian: auto-save {{date}}`
   - Pull on startup: ✅

---

## What's Already Configured

The `.obsidian/` folder is pre-configured:

| Setting | Value |
|---------|-------|
| Core plugins | file-explorer, search, quick-switcher, graph, backlink, tag-pane, page-preview |
| Show line numbers | ✅ |
| Markdown links | ✅ (git-friendly) |
| Auto-update links | ✅ (refactor-safe) |
| New file location | root |
| Link format | shortest path |

---

## Key Notes & Graph

Open Graph View (`Ctrl+G`) — you'll see:

- **`HOME`** → hub connecting all areas
- **`main/main-memory`** — identity core
- **`main/current-session`** — live session state
- **`main/decisions`** — full decision history
- **`projects/project-list`** → ruangniaga, eWorks

---

## Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick Switcher — fuzzy find any note |
| `Ctrl+G` | Graph View |
| `Ctrl+Shift+F` | Full-text search |
| `Ctrl+E` | Toggle edit/preview |
| `Ctrl+,` | Settings |

---

## Directory Map

```
DIBA/
├── HOME.md              ← Start here
├── main/
│   ├── main-memory.md   ← Identity + Zuex profile
│   ├── current-session.md
│   ├── decisions.md
│   ├── reminders.md
│   └── post-mortems.md
├── daily-diary/
│   └── current/         ← Session logs
├── projects/
│   ├── project-list.md
│   └── active/          ← ruangniaga, eWorks
├── plans/               ← Action plans
├── company/             ← XDIBAX staff profiles
└── .obsidian/           ← Vault config (do not edit manually)
```
