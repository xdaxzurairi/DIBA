---
name: skill-plugin-system
# Strong trigger description for auto-discovery
# (edit as needed for your workflow)
description: "MUST use when user says 'enable skill plugin', 'load skill system', 'activate auto-triggered skills', or when setting up, managing, or troubleshooting the Claude Code skill plugin system. Also triggers when user requests help with skill auto-discovery, plugin folder structure, or skill leveling."
---

# Skill Plugin System — Auto-Triggered Skills Framework
*Teach your AI new abilities with auto-triggered skills*

## Activation
When this skill activates, output:
"Skill Plugin System protocol engaged."

## Context Guard

| Context | Status |
|---------|--------|
| **User says 'enable skill plugin'** | ACTIVE — full protocol |
| **User requests skill auto-discovery help** | ACTIVE — full protocol |
| **User asks about plugin folder structure** | ACTIVE — full protocol |
| **General conversation** | DORMANT — do not activate |

## Protocol

### Step 1: Confirm Plugin Folder Structure
- [ ] Ensure `[ai-name]-skills/` exists in project root
- [ ] Check for `.claude-plugin/plugin.json` manifest
- [ ] Verify `skills/` and (optionally) `commands/` folders exist
- [ ] Confirm at least one `SKILL.md` in `skills/`

### Step 2: Explain Skill Auto-Discovery
- [ ] Describe how all `SKILL.md` files in `skills/` are auto-registered
- [ ] Explain that all `.md` files in `commands/` become slash commands
- [ ] Emphasize zero config: folder structure IS the configuration

### Step 3: Guide Skill Creation
- [ ] Provide step-by-step for adding a new skill:
  1. Create `skills/[skill-name]/` folder
  2. Add `SKILL.md` using the provided template
  3. Edit `description` for strong triggers
  4. Save — skill is live, no registration needed

### Step 4: Leveling and Evolution
- [ ] Explain skill leveling (Lv.1–Lv.4+)
- [ ] Suggest tracking level history in each `SKILL.md`

### Step 5: Troubleshooting
- [ ] If skills are not auto-triggering, check:
  - Folder structure matches spec
  - `description` field is specific and strong
  - Plugin is installed in Claude Code

### Step 6: Confirm Success
- [ ] Display confirmation and next steps

## Mandatory Rules
1. Always use strong, specific trigger descriptions in `SKILL.md`
2. Never require manual registration for new skills
3. Folder structure is the only configuration — no index files
4. All skills must be human-readable markdown
5. Level history must be tracked in each skill

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| No `SKILL.md` in `skills/` | Prompt user to create a sample skill |
| User adds skill but it doesn't trigger | Check trigger description and folder structure |
| User wants to remove a skill | Delete the skill's folder — auto-unregisters |
| User wants to share skills | Copy skill folder/files to another project |

## Level History
- **Lv.1** — Base: Protocol for plugin folder structure, auto-discovery, skill creation, leveling, troubleshooting, and edge cases. (Origin: Initial implementation for Claude Code Skill Plugin System)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
