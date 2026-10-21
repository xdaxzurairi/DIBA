const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = process.env.DIBA_HOOK_ROOT || 'C:/Users/BSM/XDIBAX/DIBA';
const action = process.argv[2];
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    if (action === 'session-start') {
      const session = fs.readFileSync(path.join(root, 'main/current-session.md'), 'utf8');
      const first = session.split(/\r?\n---\s*\r?\n/)[0];
      const context = first.split(/\r?\n/).filter(line => /^\*\*(Tarikh|Topik|Keputusan|Follow-up terbuka):/.test(line)).join('\n');
      console.log(JSON.stringify({ hookSpecificOutput: {
        hookEventName: 'SessionStart', additionalContext: context
      } }));
    } else if (action === 'capture-signal') {
      const response = input.tool_response;
      let parsed = response;
      if (typeof response === 'string') {
        try { parsed = JSON.parse(response); } catch { /* Model-facing shell text. */ }
      }
      const failed = parsed?.is_error === true || parsed?.isError === true ||
        (typeof parsed?.exit_code === 'number' && parsed.exit_code !== 0) ||
        (typeof response === 'string' && /(?:Process exited with code|Exit code:)\s*[1-9]\d*/i.test(response));
      if (!failed) return;
      // Record metadata only: tool output can contain credentials or private data.
      const tool = String(input.tool_name || 'unknown').replace(/[|\r\n]/g, ' ');
      const message = `${tool}: tool failed${typeof parsed?.exit_code === 'number' ? ` (exit ${parsed.exit_code})` : ''}`;
      const buffer = path.join(root, 'main/signal-buffer.md');
      const last = fs.readFileSync(buffer, 'utf8').trim().split('\n').at(-1) || '';
      if (!last.includes(`| ${message} |`)) {
        fs.appendFileSync(buffer, `\n| ${new Date().toISOString()} | tool-fail | ${message} |\n`);
      }
    } else if (action === 'git-monitor') {
      const workspace = path.dirname(root);
      const result = spawnSync('git', ['-C', workspace, 'ls-files', '--others', '--exclude-standard', '--directory'], {
        encoding: 'utf8', timeout: 2000, windowsHide: true
      });
      if (result.status !== 0) return;
      const folders = result.stdout.trim().split(/\r?\n/).filter(file => file.endsWith('/'));
      if (!folders.length) return;
      const message = folders.join(', ').replace(/\|/g, '\\|');
      const buffer = path.join(root, 'main/signal-buffer.md');
      const last = fs.readFileSync(buffer, 'utf8').trim().split('\n').at(-1) || '';
      if (!last.includes(`| new-folder | ${message} |`)) {
        fs.appendFileSync(buffer, `\n| ${new Date().toISOString()} | new-folder | ${message} |\n`);
      }
    } else if (action === 'log-skill') {
      const skill = input.tool_input?.skill;
      if (typeof skill === 'string' && skill) {
        fs.appendFileSync(path.join(root, 'main/skill-log.jsonl'), JSON.stringify({ skill, ts: new Date().toISOString() }) + '\n');
      }
    } else {
      throw new Error(`Unknown DIBA hook action: ${action}`);
    }
  } catch (error) {
    console.error(`DIBA hook ${action}: ${error.message}`);
    process.exitCode = 1;
  }
});
