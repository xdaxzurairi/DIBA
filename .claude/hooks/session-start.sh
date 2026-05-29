#!/bin/bash
# Auto-install DIBA skills to ~/.claude/skills/ on every session start
set -euo pipefail

DIBA_DIR="/home/user/DIBA"
SKILLS_DIR="$HOME/.claude/skills"

mkdir -p "$SKILLS_DIR"

install_skill() {
    local skill_md="$1"
    local skill_name
    skill_name=$(grep -m1 "^name:" "$skill_md" 2>/dev/null | sed 's/^name: *//' | tr -d '"'"'" | xargs 2>/dev/null || true)
    if [ -z "$skill_name" ] || [ "$skill_name" = "[skill-name]" ]; then
        return 0
    fi
    mkdir -p "$SKILLS_DIR/$skill_name"
    cp "$skill_md" "$SKILLS_DIR/$skill_name/SKILL.md"
}

# Layer 1: Plugin skills (base)
for skill_md in "$DIBA_DIR/plugins/diba-skills/skills/"*/SKILL.md; do
    [ -f "$skill_md" ] || continue
    install_skill "$skill_md"
done

# Layer 2: Feature skills override (authoritative — always higher level)
for skill_md in \
    "$DIBA_DIR/Feature/"*/SKILL.md \
    "$DIBA_DIR/Feature/Skill-Plugin-System/skills/"*/SKILL.md; do
    [ -f "$skill_md" ] || continue
    install_skill "$skill_md"
done

total=$(ls "$SKILLS_DIR" | wc -l)
echo "DIBA: $total skills active"
