#!/bin/bash
# DIBA skill spring-clean — BATCH 2: MERGE. Content already ported into survivors
# (see each survivor's "Absorbed (2026-09-10 spring-clean)" section). This only
# deletes the absorbed folders. Approved by Abam 2026-09-10.
#
# Run:  bash scripts/spring-clean-batch2.sh   (idempotent)
set -uo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

PLUGIN_CUT=(focused-fix tech-debt-tracker capture auto-learn-new-folder
            dispatching-parallel-agents auto-worker pulse project-map smart-effort
            deep-work hook-generator auto-link-image-library)
DEPT_HEADS=(biz-head dev-head design-head finance-head legal-head memory-head mkt-head ops-head social-head)
FEATURE_CUT=("Mulahazah-System" "Dashboard-System" "Continuous-Improvement-System"
             "auto-learn-new-folder" "Image-Prompt-System" "Video-Generation-System"
             "Topic-Diary-System" "Memory-Compaction-System")
INSTALLED_CUT=(focused-fix tech-debt-tracker capture memory-compaction topic-diary
               auto-learn-new-folder mulahazah continuous-improvement dashboard
               dispatching-parallel-agents auto-worker pulse project-map smart-effort
               deep-work image-prompt video-generation auto-link-image-library hook-generator
               biz-head dev-head design-head finance-head legal-head memory-head mkt-head
               ops-head social-head)

echo "== plugin canonical =="
for n in "${PLUGIN_CUT[@]}"; do
  [ -d "plugins/diba-skills/skills/$n" ] && git rm -rq "plugins/diba-skills/skills/$n" && echo "  rm $n"
done
echo "== departments/*-head (keep departments/SKILL.md) =="
for n in "${DEPT_HEADS[@]}"; do
  [ -d "plugins/diba-skills/skills/departments/$n" ] && git rm -rq "plugins/diba-skills/skills/departments/$n" && echo "  rm departments/$n"
done
echo "== Feature/ =="
for n in "${FEATURE_CUT[@]}"; do
  [ -d "Feature/$n" ] && git rm -rq "Feature/$n" && echo "  rm Feature/$n"
done
echo "== installed (~/.claude/skills) =="
for n in "${INSTALLED_CUT[@]}"; do
  d="$HOME/.claude/skills/$n"
  [ -d "$d" ] && rm -rf "$d" && echo "  rm $n"
done

# re-sync the media survivor (image-generation SKILL.md was edited in Feature/)
cp "Feature/Image-Generation-System/SKILL.md" "$HOME/.claude/skills/image-generation/SKILL.md" 2>/dev/null || true
# install the new single departments skill
mkdir -p "$HOME/.claude/skills/departments"
cp "plugins/diba-skills/skills/departments/SKILL.md" "$HOME/.claude/skills/departments/SKILL.md"

echo
echo "plugin skills now : $(ls plugins/diba-skills/skills/ | wc -l)"
echo "installed now     : $(ls "$HOME/.claude/skills/" | wc -l)"
echo "Next: git add -A plugins/ Feature/ .claude/hooks/session-start.sh && git commit"
