# 🔌 Skill Plugin System
*Teach your AI new abilities with auto-triggered skills*

## What This Feature Does
Adds a Claude Code plugin system to your AI companion, enabling **auto-triggered skills** — markdown-based abilities that activate automatically based on conversation context.

- **Create custom skills** as simple `.md` files
- **Auto-triggering** — skills activate when conversation matches their description
- **Zero configuration** — drop a folder with a `SKILL.md` and it's live
- **Slash commands** — user-invocable commands via `/command-name`
- **Leveling system** — skills evolve by adding capability layers over time

## How Skills Work

### The Concept
A skill is a **self-contained instruction set** written in markdown. When your conversation matches the skill's trigger description, Claude Code automatically loads and follows the skill's protocol.

Think of it as teaching your AI new behaviors through structured markdown files — no code required.

### Example: Auto-Save Skill
```
You: "save my progress"
→ Claude detects this matches the "save" skill description
→ Loads SKILL.md automatically
→ Follows the save protocol step by step
→ Your AI knows exactly what to save and how
```

## Plugin Architecture

### Folder Structure
```
[ai-name]-skills/
├── .claude-plugin/
│   └── plugin.json              # Plugin identity (name, version, author)
├── skills/                      # Auto-triggered behaviors
│   └── [skill-name]/
│       └── SKILL.md             # Complete skill definition
├── commands/                    # User slash commands (optional)
│   └── [command-name].md
└── README.md                    # Plugin documentation
```

### How Auto-Discovery Works
Claude Code automatically finds and registers:
- All `SKILL.md` files in `skills/` → registered as auto-triggered skills
- All `.md` files in `commands/` → registered as slash commands

**Folder structure IS the configuration** — no index files, no registration tables.

### The Three Component Types

| Component | Trigger | Use Case |
|-----------|---------|----------|
| **Skills** | Auto-triggered by conversation context | Behaviors that should happen automatically |
| **Commands** | User types `/command-name` | Actions the user explicitly invokes |
| **Agents** | AI spawns via Task tool | Autonomous background workers |

## Quick Integration
```bash
# Install this feature:
"Load skill-plugin"
```

## What Happens During Integration

1. **Asks** for your plugin name (defaults to `[AI_NAME]-skills`)
2. **Creates** plugin folder structure in your project
3. **Creates** `.claude-plugin/plugin.json` manifest
4. **Creates** a sample skill as starter reference
5. **Installs** the plugin into Claude Code
6. **Creates** `skill-format.md` as permanent template reference
7. **Self-deletes** this feature folder after successful integration

## Post-Integration Result
After running the integration protocol:
- Your AI has a working plugin with a sample skill
- New skills can be added by simply creating folders in `skills/`
- No build steps, no config changes needed for new skills
- Skills auto-activate based on their description field

## Creating Your First Skill

### Step 1: Create a Folder
```
skills/my-skill/
```

### Step 2: Write SKILL.md
```markdown
---
name: my-skill
description: "MUST use when user says 'do the thing', 'activate my-skill',
             or when [specific context condition]."
---

# My Skill

## Activation
When this skill activates, output:
"Activating my-skill..."

## Protocol
1. [Step 1 - What to do]
2. [Step 2 - What to do next]
3. [Step 3 - Complete and confirm]

## Mandatory Rules
1. [Rule 1]
2. [Rule 2]
```

### Step 3: Done
The skill is live. No registration needed. Claude Code auto-discovers it.

## Writing Good Trigger Descriptions

The `description` field in YAML frontmatter is the most critical element — it determines when Claude activates the skill.

**Strong triggers (recommended):**
```yaml
description: "MUST use when committing code changes, when user says 'commit',
             'save changes', 'git commit', or when a task is completed and
             code needs to be preserved."
```

**Weak triggers (avoid):**
```yaml
description: "Helps with code management"  # Too vague — causes false activations
```

### Tips for Trigger Descriptions
- Use `"MUST use when..."` for strong activation
- List specific trigger phrases the user might say
- Include contextual conditions (not just phrases)
- Be specific enough to avoid false activations
- Be broad enough to catch all relevant situations

## Skill Evolution (Leveling)

Skills grow through levels rather than version numbers:

| Level | Meaning |
|-------|---------|
| **Lv.1** | Base capability — initial skill definition |
| **Lv.2** | Enhanced — added features or removed friction |
| **Lv.3** | Advanced — proactive behavior or deep integration |
| **Lv.4+** | Expert — fully autonomous with absorbed protocols |

Track levels in the `## Level History` section of each SKILL.md.

## Benefits
- **Modular** — each skill is independent, add or remove freely
- **Readable** — skills are plain markdown, human-readable and editable
- **Automatic** — no manual triggering needed for context-matched skills
- **Evolving** — skills level up as you refine them through use
- **Shareable** — share skill files with others using AI MemoryCore

## Platform Note
This feature requires **Claude Code** (Anthropic's CLI tool). The skill plugin system uses Claude Code's native plugin architecture for auto-discovery and triggering.

For other AI platforms, skills can still be used as protocol files loaded via `master-memory.md` commands — they just won't auto-trigger.

---

*Based on the proven alice-enchantments plugin system (20 skills in production)*


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
