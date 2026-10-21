const path = require('node:path');
const { spawnSync } = require('node:child_process');

const workspace = path.resolve(__dirname, '../..');
const action = process.argv[2];
const allowed = new Set(['pre-bash', 'post-edit', 'session-restore', 'session-end', 'route', 'stats', 'post-task', 'import', 'sync']);
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  if (!allowed.has(action)) {
    console.error(`Unknown Ruflo hook action: ${action}`);
    process.exitCode = 1;
    return;
  }
  // Codex limits SessionEnd to 3s. Persist directly, without the slow consolidation step.
  const helper = action === 'session-end' ? 'session.cjs' :
    (['import', 'sync'].includes(action) ? 'auto-memory-hook.mjs' : 'hook-handler.cjs');
  const helperAction = action === 'session-end' ? 'end' : action;
  const result = spawnSync(process.execPath, [path.join(workspace, '.claude/helpers', helper), helperAction], {
    input: raw, encoding: 'utf8', timeout: action === 'session-end' ? 2000 : 12000,
    cwd: workspace, windowsHide: true,
    env: { ...process.env, CLAUDE_PROJECT_DIR: workspace, RUFLO_NO_AUTO_ENABLE: '1' }
  });
  // Codex expects a JSON envelope for prompt context, not Ruflo's text table.
  if (action === 'route') {
    if (!result.error && result.status === 0) {
      console.log(JSON.stringify({ hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit', additionalContext: result.stdout || ''
      } }));
    } else if (result.stdout) process.stderr.write(result.stdout);
  // Stop/SubagentStop require JSON; helper status text is not a hook decision.
  } else if (['sync', 'post-task'].includes(action)) {
    if (result.stdout) process.stderr.write(result.stdout);
    if (!result.error && result.status === 0) console.log('{}');
  } else if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) console.error(result.error.message);
  process.exitCode = action === 'pre-bash' && result.status === 1 ? 2 : (result.status ?? 1);
});
