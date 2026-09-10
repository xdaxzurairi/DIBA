#!/bin/bash
# DIBA skill spring-clean — BATCH 1: pure CUT (13 skills, nothing salvaged).
# Approved by Abam 2026-09-10. Doc edits (README, INDEX, session-start DEPRECATED)
# already done separately. This script only deletes the skill folders.
#
# Run:  bash scripts/spring-clean-batch1.sh
# Safe to re-run (missing dirs are skipped).
set -uo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

PLUGIN_CUT=(hook-generator changelog-generator compliance-check contract-reviewer
            invoice-chaser financial-snapshot post-writer experiment-designer dependency-auditor)
FEATURE_CUT=("Interactive-Story-System" "Observation-System" "Skill-Plugin-System" "Song-Creation-System")
INSTALLED_CUT=(observation hook-generator skill-plugin-system changelog-generator compliance-check
               contract-reviewer invoice-chaser financial-snapshot post-writer experiment-designer
               dependency-auditor interactive-story song-creation)

echo "== plugin canonical =="
for n in "${PLUGIN_CUT[@]}"; do
  if [ -d "plugins/diba-skills/skills/$n" ]; then git rm -rq "plugins/diba-skills/skills/$n" && echo "  rm $n"; fi
done

echo "== Feature/ =="
for n in "${FEATURE_CUT[@]}"; do
  if [ -d "Feature/$n" ]; then git rm -rq "Feature/$n" && echo "  rm Feature/$n"; fi
done

echo "== installed (~/.claude/skills) =="
for n in "${INSTALLED_CUT[@]}"; do
  d="$HOME/.claude/skills/$n"
  if [ -d "$d" ]; then rm -rf "$d" && echo "  rm $n"; fi
done

echo
echo "plugin skills now : $(ls plugins/diba-skills/skills/ | wc -l)"
echo "installed now     : $(ls "$HOME/.claude/skills/" | wc -l)"
echo
echo "Next: git add -A plugins/ Feature/ .claude/hooks/session-start.sh && git commit"
