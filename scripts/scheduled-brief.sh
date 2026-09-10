#!/bin/bash
# DIBA scheduled brief — runs headless `claude` in the vault and appends the
# result to main/brief-inbox.md so Abam sees it next time he opens a session.
#
# Registered via Windows Task Scheduler (see: schtasks /query /tn "DIBA*"):
#   DIBA Morning Brief  -> daily  08:00  ->  scheduled-brief.sh morning
#   DIBA Weekly Review  -> Fri    16:00  ->  scheduled-brief.sh weekly
#
# Runs only while Abam is logged on (no stored credentials). Full vault access:
# the DIBA SessionStart / UserPromptSubmit hooks fire normally, so the brief
# has memory + reminders + projects context. session-end.sh auto-commits the
# updated inbox file.
#
# Telegram delivery is NOT wired yet (no bot token, no send script) — flagged
# in reminders Phase 3. This writes to a local file only.
set -uo pipefail

MODE="${1:-morning}"
DIBA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INBOX="$DIBA_DIR/main/brief-inbox.md"
STAMP="$(date '+%Y-%m-%d %H:%M')"

case "$MODE" in
  morning)
    PROMPT="morning brief — automated 8am scheduled run. Output the DIBA chief-of-staff morning brief: last-session recap, urgent/overdue reminders, active projects, and what Abam should focus on today. Under 15 lines, no preamble, no questions."
    TITLE="Morning Brief"
    ;;
  weekly)
    PROMPT="weekly review — automated Friday scheduled run. Output the DIBA chief-of-staff weekly review: wins this week, stalled projects, decisions pending, post-mortem themes, next-week priorities. Under 20 lines, no preamble, no questions."
    TITLE="Weekly Review"
    ;;
  *)
    echo "usage: scheduled-brief.sh [morning|weekly]" >&2
    exit 2
    ;;
esac

cd "$DIBA_DIR" || exit 1

OUT="$(timeout 600 claude -p "$PROMPT" --permission-mode bypassPermissions 2>&1)"
RC=$?

{
  echo ""
  echo "---"
  echo ""
  echo "## $TITLE — $STAMP"
  echo ""
  if [ $RC -ne 0 ]; then
    echo "> ⚠️ scheduled run failed (exit $RC). Output:"
    echo ""
  fi
  echo "$OUT"
} >> "$INBOX"

exit 0
