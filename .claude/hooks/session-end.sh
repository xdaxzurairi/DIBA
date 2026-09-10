#!/bin/bash
# DIBA Session End — SessionEnd hook (bash, self-locating, cross-platform)
# Honest safety net: at session end, commit any changed DIBA memory files so
# nothing is lost when Abam stops working / closes the session.
#
# This hook does NOT fabricate a diary summary. A bash hook is not the model —
# it cannot summarise a session. Meaningful diary entries are written by the
# save-diary skill DURING the session (after code changes / "save diary" /
# wrap-up). This hook only preserves what already exists.
set -uo pipefail

DIBA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$DIBA_DIR" || exit 0

timestamp="$(date '+%Y-%m-%d %H:%M')"

# Stage any changed memory files (same dirs as the auto-commit hook)
for dir in main daily-diary projects plans company; do
    [ -d "$dir" ] && git add "$dir" 2>/dev/null
done

if [ -n "$(git diff --cached --name-only 2>/dev/null)" ]; then
    git commit -m "diba: session-end auto-save ($timestamp)" --no-verify >/dev/null 2>&1
    echo "DIBA: session saved + committed at $timestamp"
else
    echo "DIBA: session end $timestamp — no memory changes to commit"
fi
exit 0
