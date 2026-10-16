#!/bin/bash
# DIBA Auto-Commit — PostToolUse hook (Write|Edit)
# Bash port of auto-commit.ps1. Self-locating; commits DIBA memory files.
set -uo pipefail

DIBA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIBA_DIR_WIN="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -W 2>/dev/null || true)"

# Hook input arrives as JSON on stdin (Claude Code hooks contract)
input=$(cat 2>/dev/null || true)
[ -n "$input" ] || exit 0

# Anchored to "tool_input":{"file_path":" specifically (not just any
# "file_path" occurrence) — a bare match can land inside tool_response's
# embedded diff/originalFile text instead, e.g. when the edited file's own
# content mentions file_path (as this hook's commit history now does),
# producing a garbled commit message from unrelated diff text.
file_path=$(printf '%s' "$input" | sed -n 's/.*"tool_input":{"file_path":"\([^"]*\)".*/\1/p' | head -1)
[ -n "$file_path" ] || exit 0

# Claude Code reports file_path in native Windows form, JSON-escaped
# (C:\\Users\\... in the raw payload = C:\Users\... on disk), not git-bash's
# posix $DIBA_DIR (/c/Users/...). A naive backslash->slash swap leaves the
# doubled backslashes as doubled slashes (C://Users//...), which still
# fails to match — collapse any run of backslashes to one forward slash.
file_path_norm=$(printf '%s' "$file_path" | tr -s '\\' '/')

# Only commit files inside DIBA memory dirs
case "$file_path_norm" in
    "$DIBA_DIR"/main/*|"$DIBA_DIR"/daily-diary/*|"$DIBA_DIR"/projects/*|"$DIBA_DIR"/plans/*|"$DIBA_DIR"/company/*) ;;
    "$DIBA_DIR_WIN"/main/*|"$DIBA_DIR_WIN"/daily-diary/*|"$DIBA_DIR_WIN"/projects/*|"$DIBA_DIR_WIN"/plans/*|"$DIBA_DIR_WIN"/company/*) ;;
    *) exit 0 ;;
esac

cd "$DIBA_DIR" || exit 0

# .git/index.lock gets grabbed by another tool watching this same working
# tree (most likely Obsidian's git-sync plugin, since this vault is also
# opened in Obsidian) — and has been observed sitting abandoned for minutes
# with no process actually holding it (a crashed/killed sync, not real
# contention). Wait briefly for a genuinely in-progress lock to clear; once
# it's older than 10s, treat it as stale and clear it ourselves rather than
# silently dropping the commit.
git_retry() {
    local tries=10 lock="$DIBA_DIR/.git/index.lock" age now mtime
    while [ "$tries" -gt 0 ]; do
        if timeout 5 "$@" 2>/dev/null; then return 0; fi
        [ -f "$lock" ] || return 1
        now=$(date +%s)
        mtime=$(stat -c %Y "$lock" 2>/dev/null || echo "$now")
        age=$((now - mtime))
        if [ "$age" -ge 10 ]; then
            rm -f "$lock" 2>/dev/null
        else
            sleep 0.5
        fi
        tries=$((tries - 1))
    done
    return 1
}

git_retry git add "$file_path_norm"
if [ -n "$(git diff --cached --name-only 2>/dev/null)" ]; then
    short_name=$(basename "$file_path_norm")
    timestamp=$(date '+%Y-%m-%d %H:%M')
    git_retry git commit -m "diba: auto-save $short_name ($timestamp)" --no-verify >/dev/null
fi
exit 0
