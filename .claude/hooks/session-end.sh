#!/bin/bash
# DIBA Session End — SessionEnd / Stop hook (bash, self-locating, cross-platform)
# Honest safety net: at session end, commit any changed DIBA memory files so
# nothing is lost when Abam stops working / closes the session, then push to
# origin so GitHub stays in sync (auto-sync, approved 2026-09-10).
#
# This hook does NOT fabricate a diary summary. A bash hook is not the model —
# it cannot summarise a session. Meaningful diary entries are written by the
# save-diary skill DURING the session (after code changes / "save diary" /
# wrap-up). This hook only preserves what already exists.
#
# The push is best-effort: short timeout, silent on failure (offline / no auth /
# non-fast-forward). It never blocks the session. A failed push just means the
# next session-end retries — commits are already safe locally.
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

# Auto-sync: push to origin if the branch is ahead. Best-effort only.
branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || true)"
if [ -n "$branch" ] && git rev-parse --verify --quiet "@{upstream}" >/dev/null 2>&1; then
    ahead="$(git rev-list --count '@{upstream}..HEAD' 2>/dev/null || echo 0)"
    if [ "${ahead:-0}" -gt 0 ]; then
        if timeout 20 git push --quiet origin "$branch" 2>/dev/null; then
            echo "DIBA: pushed $ahead commit(s) to origin/$branch"
        else
            echo "DIBA: auto-push skipped (offline / auth / non-fast-forward) — retries next session-end"
        fi
    fi
fi
exit 0
