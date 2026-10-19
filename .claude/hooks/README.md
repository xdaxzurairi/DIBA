# DIBA Hooks

Portable hook layer — no machine-specific paths. `settings.json` resolves the repo via `$CLAUDE_PROJECT_DIR`; the scripts self-locate from their own file path, so any clone location works.

| Hook | Event | Script | Job |
|---|---|---|---|
| Skill installer | SessionStart | `session-start.sh` | Installs plugin skills (canonical), then Feature-layer skills as gap-fill only; removes deprecated skills (diba-recall, diba-operator, work-plan-execution) |
| Auto-commit | PostToolUse (Write\|Edit) | `auto-commit.sh` | Commits edits under `main/`, `daily-diary/`, `projects/`, `plans/`, `company/` |
| Session end | SessionEnd | `session-end.sh` | Commits any remaining memory changes, then pushes to `origin` when ahead (best-effort) |
| Stop guard | Stop | `stop-guard.js` | If real work happened (Write/Edit outside memory dirs, or `git commit/push`) and today's diary was not updated after it, blocks the stop once and tells the model to run `save-diary` (+ `auto-learn` when >=3 signals are pending). Honours `stop_hook_active`, so it cannot loop. |

`save-diary` and `auto-learn` themselves are model-side skills — a hook cannot write a session summary. `stop-guard.js` is what makes them reliable rather than optional.

Wiring on a machine (user-level `~/.claude/settings.json`, absolute paths): SessionStart -> `session-start.sh`; PostToolUse `Write|Edit` -> `auto-commit.sh` (timeout 30); Stop -> `node stop-guard.js` (timeout 20); SessionEnd -> `session-end.sh` (timeout 40).

## Windows notes

The hooks run via `bash`, which resolves to Git Bash on Windows (installed with Git, required by Claude Code anyway). If `bash` is not on PATH, either add Git's `bin/` to PATH or switch the two commands in `settings.json` to the PowerShell variants:

```
powershell.exe -NonInteractive -ExecutionPolicy Bypass -File "$CLAUDE_PROJECT_DIR\.claude\hooks\auto-commit.ps1"
```

The legacy PowerShell scripts (`auto-commit.ps1`, `memory-inject.ps1`, `session-end.ps1`) are kept for that fallback, but `auto-commit.ps1`'s hardcoded `C:\Users\Administrator\...` path must be replaced with your clone path if you use it. The bash versions are the maintained ones.

## Contract

- Hook input arrives as JSON on stdin; `auto-commit.sh` extracts `tool_input.file_path`.
- Hooks must exit 0 fast and never block the session — all failures are silent no-ops.
