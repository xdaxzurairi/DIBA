#!/bin/bash
# DIBA Auto-Commit — PostToolUse hook (Write|Edit)
# Bash port of auto-commit.ps1. Self-locating; commits DIBA memory files.
set -uo pipefail

DIBA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Hook input arrives as JSON on stdin (Claude Code hooks contract)
input=$(cat 2>/dev/null || true)
[ -n "$input" ] || exit 0

file_path=$(printf '%s' "$input" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
[ -n "$file_path" ] || exit 0

# Only commit files inside DIBA memory dirs
case "$file_path" in
    "$DIBA_DIR"/main/*|"$DIBA_DIR"/daily-diary/*|"$DIBA_DIR"/projects/*|"$DIBA_DIR"/plans/*|"$DIBA_DIR"/company/*) ;;
    *) exit 0 ;;
esac

cd "$DIBA_DIR" || exit 0
git add "$file_path" 2>/dev/null
if [ -n "$(git diff --cached --name-only 2>/dev/null)" ]; then
    short_name=$(basename "$file_path")
    timestamp=$(date '+%Y-%m-%d %H:%M')
    git commit -m "diba: auto-save $short_name ($timestamp)" --no-verify >/dev/null 2>&1
fi
exit 0
