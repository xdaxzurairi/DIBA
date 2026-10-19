#!/usr/bin/env node
// DIBA Stop guard — makes save-diary (and the chained auto-learn) actually happen.
//
// Honest scope: a hook cannot write a diary entry — only the model can. What a
// Stop hook CAN do is refuse to let the session go idle while there is unsaved
// work, and tell the model exactly what to run. So:
//   * real work this session (Write/Edit/NotebookEdit outside the memory dirs,
//     or a git commit/push) AND today's diary not updated since the last such
//     action  ->  block once with an instruction to run save-diary (+ auto-learn).
//   * `stop_hook_active` is honoured, so this can never loop: if the model
//     still does not save, the second Stop is allowed through.
// Self-locating (no machine paths); never throws — any failure is a silent no-op.
const fs = require('fs');
const os = require('os');
const path = require('path');

const VAULT = path.resolve(__dirname, '..', '..');
const norm = (p) => String(p || '').replace(/\\/g, '/').toLowerCase();
const MEMORY_DIRS = ['daily-diary', 'main', 'library', 'projects', 'plans', 'company']
  .map((d) => norm(path.join(VAULT, d)) + '/');
const NOISE = /\/scratchpad\/|\/appdata\/local\/temp\/|\/\.claude\/projects\/|\/\.claude\/plans\/|\/\.claude\/file-history\//;
const EDIT_TOOLS = /^(Write|Edit|MultiEdit|NotebookEdit)$/;
const SHELL_TOOLS = /^(Bash|PowerShell)$/;
const DELIVERY = /\bgit\s+(-C\s+\S+\s+)?(commit|push)\b/;
const STUB_BYTES = 60;           // SessionStart creates a one-line stub (~40 B)
const LEARN_PENDING_MIN = 3;     // chain auto-learn when this many signals wait
const LEARN_BACKLOG_MIN = 15;    // nudge once per session even without code work

let raw = '';
process.stdin.on('data', (c) => (raw += c)).on('end', () => {
  try { run(JSON.parse(raw || '{}')); } catch (_) { /* silent */ }
  process.exit(0);
});

function pendingSignals() {
  try {
    const t = fs.readFileSync(path.join(VAULT, 'main', 'signal-buffer.md'), 'utf8');
    return t.split(/\r?\n/).filter((l) => l.startsWith('|') && !l.includes('[done]')
      && !/^\|\s*-{2,}/.test(l) && !/timestamp\s*\|\s*type/i.test(l)).length;
  } catch (_) { return 0; }
}

function localDate(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function block(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
}

function run(input) {
  if (input.stop_hook_active) return;
  const tp = input.transcript_path;
  if (!tp || !fs.existsSync(tp)) return;

  let lastWork = 0, count = 0;
  for (const line of fs.readFileSync(tp, 'utf8').split('\n')) {
    if (!line.includes('"tool_use"')) continue;
    let o; try { o = JSON.parse(line); } catch (_) { continue; }
    const content = o.message && o.message.content;
    if (!Array.isArray(content)) continue;
    const ts = Date.parse(o.timestamp) || 0;
    for (const c of content) {
      if (c.type !== 'tool_use') continue;
      let hit = false;
      if (EDIT_TOOLS.test(c.name)) {
        const fp = norm(c.input && (c.input.file_path || c.input.notebook_path));
        hit = !!fp && !NOISE.test(fp) && !MEMORY_DIRS.some((d) => fp.startsWith(d));
      } else if (SHELL_TOOLS.test(c.name)) {
        hit = DELIVERY.test(String(c.input && c.input.command));
      }
      if (hit) { count++; if (ts > lastWork) lastWork = ts; }
    }
  }

  const pending = pendingSignals();
  const diary = path.join(VAULT, 'daily-diary', 'current', `${localDate(new Date())}.md`);
  let saved = false;
  try { const st = fs.statSync(diary); saved = st.size > STUB_BYTES && st.mtimeMs > lastWork; } catch (_) {}

  if (count > 0 && !saved) {
    const when = new Date(lastWork).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    let r = `[DIBA stop-guard] ${count} tindakan kerja dikesan (terakhir ${when}) tetapi diary hari ini `
      + `belum dikemas kini selepas itu. Jalankan skill save-diary SEKARANG (entry ringkas: topik, keputusan, `
      + `fail diubah, follow-up) dan kemas kini main/current-session.md. Jangan minta kebenaran Abam.`;
    if (pending >= LEARN_PENDING_MIN) {
      r += ` Selepas itu rantaikan skill auto-learn (${pending} signal belum diproses dalam main/signal-buffer.md).`;
    }
    return block(r);
  }

  if (pending >= LEARN_BACKLOG_MIN) {
    const marker = path.join(os.tmpdir(), `diba-learn-nudge-${input.session_id || 'x'}`);
    if (!fs.existsSync(marker)) {
      try { fs.writeFileSync(marker, String(Date.now())); } catch (_) {}
      return block(`[DIBA stop-guard] ${pending} signal belum diproses dalam main/signal-buffer.md. `
        + `Jalankan skill auto-learn sekarang (validasi signal dahulu — gate Lv.5), kemudian berhenti.`);
    }
  }
}
