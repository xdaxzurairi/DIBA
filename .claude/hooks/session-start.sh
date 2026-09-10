#!/bin/bash
# DIBA SessionStart hook — auto-install skills to ~/.claude/skills/
# Self-locating: works on any machine, any clone path.
# Source of truth: plugins/diba-skills/ (canonical). Feature/ copies only
# fill gaps for skills that have no plugin counterpart.
set -euo pipefail

DIBA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SKILLS_DIR="$HOME/.claude/skills"

# Skills retired by consolidation — never install, remove if present
DEPRECATED="diba-recall diba-operator work-plan-execution anchor self-healing session-briefing dream-ideas auto-idle-save-recall"

mkdir -p "$SKILLS_DIR"

skill_name_of() {
    grep -m1 "^name:" "$1" 2>/dev/null | sed 's/^name: *//' | tr -d '"'"'" | xargs 2>/dev/null || true
}

install_skill() {
    local skill_md="$1" skill_name="$2"
    mkdir -p "$SKILLS_DIR/$skill_name"
    cp "$skill_md" "$SKILLS_DIR/$skill_name/SKILL.md"
}

# Remove deprecated skills left behind by older installs
for dep in $DEPRECATED; do
    rm -rf "${SKILLS_DIR:?}/$dep"
done

# Layer 1: Plugin skills (canonical)
PLUGIN_NAMES=""
for skill_md in "$DIBA_DIR/plugins/diba-skills/skills/"*/SKILL.md; do
    [ -f "$skill_md" ] || continue
    name=$(skill_name_of "$skill_md")
    [ -n "$name" ] && [ "$name" != "[skill-name]" ] || continue
    case " $DEPRECATED " in *" $name "*) continue ;; esac
    PLUGIN_NAMES="$PLUGIN_NAMES $name"
    install_skill "$skill_md" "$name"
done

# Layer 2: Feature skills — gap-fill only (never shadow a plugin skill)
for skill_md in \
    "$DIBA_DIR/Feature/"*/SKILL.md \
    "$DIBA_DIR/Feature/Skill-Plugin-System/skills/"*/SKILL.md; do
    [ -f "$skill_md" ] || continue
    name=$(skill_name_of "$skill_md")
    [ -n "$name" ] && [ "$name" != "[skill-name]" ] || continue
    case " $DEPRECATED " in *" $name "*) continue ;; esac
    case "$PLUGIN_NAMES " in *" $name "*) continue ;; esac
    install_skill "$skill_md" "$name"
done

total=$(ls "$SKILLS_DIR" | wc -l)
echo "DIBA: $total skills active"

# --- Diary folder + today's file auto-ensure ---
# Honest: fires on the real SessionStart event. Creates the diary folder
# and today's file so a diary target always exists when a project opens.
# It does NOT write session content — the save-diary skill (model-side) does.
DIARY_CUR="$DIBA_DIR/daily-diary/current"
mkdir -p "$DIARY_CUR"
TODAY_FILE="$DIARY_CUR/$(date +%Y-%m-%d).md"
if [ ! -f "$TODAY_FILE" ]; then
    printf '# DIBA Session Diary - %s\n' "$(date '+%B %d, %Y')" > "$TODAY_FILE"
    echo "DIBA: diary folder ready — $(basename "$TODAY_FILE") created"
else
    echo "DIBA: diary ready — $(basename "$TODAY_FILE")"
fi

# Ruflo memory sync (background, jangan block session start)
XDIBAX_DIR="C:/Users/BSM/XDIBAX"
if command -v ruflo &>/dev/null && [ -f "$XDIBAX_DIR/.claude-flow/hooks/memory-sync.js" ]; then
    node "$XDIBAX_DIR/.claude-flow/hooks/memory-sync.js" &>/dev/null &
    echo "DIBA: ruflo memory sync started (background)"
fi
