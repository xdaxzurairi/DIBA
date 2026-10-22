#!/usr/bin/env node
// PreToolUse guard untuk Bash/PowerShell.
// Blok (exit 2): `rm -rf` dan setara (Remove-Item -Recurse -Force, rd /s, find -delete) pada sasaran
// bukan-selamat, serta bacaan .env / folder secrets melalui shell (Read deny sahaja dipintas `cat .env`).
// Pagar, bukan dinding: eval/pengekodan pelik tidak ditangkap. Gagal-buka: ralat dalaman -> exit 0.
// Ujian: guard-bash.test.js
'use strict';

const SAFE_DIRS = new Set(['node_modules', 'dist', 'build', '.next', '.cache', 'coverage', '__pycache__', '.pytest_cache', '.turbo']);
const PREFIX = new Set(['!', 'then', 'do', 'else', 'elif', 'if', 'while', 'until', 'time', '{', '(']);
const WRAPPERS = new Set(['sudo', 'command', 'env', 'nohup', 'exec', 'xargs', 'nice', 'timeout', 'ionice', 'busybox', 'stdbuf', 'wsl']);
const SHELLS = new Set(['bash', 'sh', 'zsh', 'pwsh', 'powershell', 'cmd']);
const RM_UNIX = new Set(['rm', 'rm.exe']);
const RM_WIN = new Set(['remove-item', 'ri', 'del', 'erase', 'rd', 'rmdir']);
const GREP_LIKE = new Set(['grep', 'egrep', 'fgrep', 'rg', 'findstr', 'select-string', 'sls']);
const COPY_LIKE = new Set(['cp', 'copy', 'copy-item', 'cpi', 'mv', 'move', 'move-item']);
const READERS = new Set([
  'cat', 'type', 'get-content', 'gc', 'head', 'tail', 'less', 'more', 'bat', 'nl', 'tac', 'sort', 'cut', 'diff', 'wc',
  'uniq', 'paste', 'fold', 'column', 'rev', 'hexdump', 'sed', 'awk', 'strings', 'xxd', 'od', 'base64', 'source', '.',
  'tar', 'zip', '7z', 'curl', 'scp', ...GREP_LIKE, ...COPY_LIKE,
]);
const GIT_READ = new Set(['show', 'cat-file', 'diff', 'log', 'blame']);
const PS_VALUE_FLAGS = new Set(['-erroraction', '-ea', '-warningaction', '-wa', '-outvariable', '-ov']);
const PS_PATH_FLAGS = new Set(['-path', '-literalpath', '-pa', '-lp']);
const SECRETS_PATH = /(^|\/)secrets?(\/|\.(php|json|ya?ml|toml)$)/i;
const TEMPLATE_EXT = /^(example|sample|template|dist)$/i;
const SCRATCHPAD = /\/temp\/claude\/.+\/scratchpad(\/|$)/i;
const MAX_DEPTH = 4;

const unquote = (t) => t.replace(/^["']|["']$/g, '');
const tokenize = (s) => (s.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(unquote);

function isSafeTarget(raw) {
  if (/[$%`]|\.\./.test(raw)) return false;
  const p = raw.replace(/\\/g, '/').replace(/\/+$/, '');
  if (!p) return false;
  if (/^(\/|~|[A-Za-z]:)/.test(p)) return SCRATCHPAD.test(p);
  return p.split('/').some((s) => SAFE_DIRS.has(s));
}

function isSecretPath(raw) {
  const cand = unquote(raw).split(/[:@=<]/).pop();
  if (!cand || /\s/.test(cand)) return false;
  const norm = cand.replace(/\\/g, '/');
  if (SECRETS_PATH.test(norm)) return true;
  const base = norm.split('/').pop();
  if (base.startsWith('.') && /[*?[]/.test(base)) {
    const re = new RegExp('^' + base.replace(/[.+^${}()|\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
    return re.test('.env');
  }
  const m = /^\.env((?:\.[A-Za-z0-9_-]+)*)$/i.exec(base);
  if (!m) return false;
  const ext = m[1].split('.').filter(Boolean).pop();
  return !ext || !TEMPLATE_EXT.test(ext);
}

// Buang heredoc; kembalikan [teks tanpa substitusi, kandungan $(...) / `...`] untuk disemak berasingan.
function splitSubstitutions(command) {
  let text = command
    .replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n[ \t]*\2(?=\n|$)/g, ' ')
    .replace(/@'\r?\n[\s\S]*?\r?\n'@/g, ' '); // here-string PowerShell petik tunggal = teks literal
  const inner = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '$' && text[i + 1] === '(') {
      let depth = 1, j = i + 2;
      while (j < text.length && depth) { depth += text[j] === '(' ? 1 : text[j] === ')' ? -1 : 0; j++; }
      inner.push(text.slice(i + 2, depth ? j : j - 1));
      text = text.slice(0, i) + ' ' + text.slice(j);
      i--;
    }
  }
  text = text.replace(/`([^`]*)`/g, (_, c) => { inner.push(c); return ' '; });
  return [text, inner];
}

// Pecah pada ; | & newline di luar petikan (& dalam 2>&1 / &> bukan pemisah).
function splitSegments(text) {
  const out = [];
  let cur = '', quote = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === quote) quote = ''; cur += c; continue; }
    if (c === '"' || c === "'") { quote = c; cur += c; continue; }
    const redirAmp = c === '&' && (/[<>]/.test(text[i - 1] || '') || text[i + 1] === '>');
    if ((c === ';' || c === '|' || c === '&' || c === '\n') && !redirAmp) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function normalize(tokens) {
  const t = [];
  for (let i = 0; i < tokens.length; i++) {
    const x = tokens[i];
    if (/^(\d*>>?|&>|>&)$/.test(x)) { i++; continue; }
    if (/^(\d*>>?|&>|>&)\S/.test(x)) continue;
    t.push(x);
  }
  return t;
}

function stripPrefixes(tokens) {
  let xargs = false, changed = true;
  while (changed && tokens.length) {
    changed = false;
    const first = tokens[0].replace(/^[({]+(?=.)/, '');
    tokens[0] = first;
    const low = first.toLowerCase();
    if (PREFIX.has(low) || /^[A-Za-z_]\w*=/.test(first)) { tokens.shift(); changed = true; continue; }
    if (WRAPPERS.has(low)) {
      if (low === 'xargs') xargs = true;
      tokens.shift(); changed = true;
      while (tokens.length && (tokens[0].startsWith('-') || /^\d+[smhd]?$/.test(tokens[0]) || /^\w+=/.test(tokens[0]) || tokens[0] === '{}')) {
        if (/^-[ugC]$/.test(tokens[0]) && low === 'sudo') tokens.shift();
        tokens.shift();
      }
    }
  }
  return xargs;
}

function isDestructive(cmd, args) {
  const isPs = RM_WIN.has(cmd);
  if (!RM_UNIX.has(cmd) && !isPs) return { destructive: false };
  const flags = [], targets = [];
  for (let i = 0; i < args.length; i++) {
    let a = args[i];
    if (a === '--') continue;
    if (isPs && /^\/[A-Za-z](\/[A-Za-z])+$/.test(a)) { flags.push(...a.split('/').filter(Boolean).map((f) => '/' + f)); continue; }
    if (a.startsWith('-') || (isPs && /^\/[A-Za-z]$/.test(a))) {
      const hasValue = a.includes(':');
      a = a.replace(/:.*$/, '');
      const low = a.toLowerCase();
      if (isPs && PS_PATH_FLAGS.has(low) && !hasValue && args[i + 1]) { targets.push(args[++i]); continue; }
      if (isPs && PS_VALUE_FLAGS.has(low) && !hasValue) { i++; continue; }
      flags.push(a);
    } else targets.push(a);
  }
  let destructive;
  if (RM_UNIX.has(cmd)) {
    const short = flags.filter((f) => /^-[A-Za-z]+$/.test(f)).join('').toLowerCase();
    destructive = (short.includes('r') || flags.includes('--recursive')) && (short.includes('f') || flags.includes('--force'));
  } else {
    const rec = flags.some((f) => /^-r(e(c(u(r(s(e)?)?)?)?)?)?$/i.test(f));
    const frc = flags.some((f) => /^-f(o(r(c(e)?)?)?)?$/i.test(f));
    destructive = (rec && frc) || flags.some((f) => f.toLowerCase() === '/s');
  }
  return { destructive, targets };
}

function readsSecret(cmd, args, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '<' && tokens[i + 1] && isSecretPath(tokens[i + 1])) return true;
    if (/^<[^<]/.test(tokens[i]) && isSecretPath(tokens[i])) return true;
  }
  let reader = READERS.has(cmd);
  let cand = args;
  if (cmd === 'git') { reader = GIT_READ.has((args[0] || '').toLowerCase()); cand = args.slice(1); }
  if (!reader) return false;
  const nonFlag = cand.filter((a) => !a.startsWith('-'));
  if (GREP_LIKE.has(cmd) && nonFlag[0]) cand = cand.filter((a) => a !== nonFlag[0] || (nonFlag[0] = null));
  if (COPY_LIKE.has(cmd) && nonFlag.length > 1) cand = cand.slice(0, cand.lastIndexOf(nonFlag[nonFlag.length - 1]));
  return cand.some(isSecretPath);
}

function checkSegment(segment, depth) {
  const tokens = normalize(tokenize(segment));
  if (!tokens.length) return null;
  const xargs = stripPrefixes(tokens);
  if (!tokens.length) return null;
  const cmd = tokens[0].toLowerCase().split(/[\\/]/).pop();
  const args = tokens.slice(1);

  if (SHELLS.has(cmd) && depth < MAX_DEPTH) {
    const k = args.findIndex((a) => /^-[A-Za-z]*c$/i.test(a) || /^-command$/i.test(a) || /^\/c$/i.test(a));
    if (k >= 0) return checkCommand(args.slice(k + 1).join(' '), depth + 1);
  }
  const { destructive, targets } = isDestructive(cmd, args);
  if (destructive && (xargs || !targets.length || !targets.every(isSafeTarget))) {
    return 'padam rekursif (rm -rf / Remove-Item -Recurse -Force / rd /s) pada sasaran bukan-selamat';
  }
  if (readsSecret(cmd, args, tokens)) return 'bacaan .env / folder secrets melalui shell';
  return null;
}

function checkCommand(command, depth = 0) {
  const raw = String(command);
  if (/\bfind\b[^;&|\n]*(-delete\b|-exec(dir)?\s+(rm|del|rmdir)\b)/i.test(raw)) {
    return 'padam rekursif (find -delete / -exec rm) pada sasaran bukan-selamat';
  }
  const [text, inner] = splitSubstitutions(raw);
  for (const sub of inner) {
    const r = depth < MAX_DEPTH ? checkCommand(sub, depth + 1) : null;
    if (r) return r;
  }
  for (const segment of splitSegments(text)) {
    if (!segment.trim()) continue;
    const reason = checkSegment(segment.trim(), depth);
    if (reason) return reason;
  }
  return null;
}

function main() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => (raw += c));
  process.stdin.on('end', () => {
    try {
      const command = (JSON.parse(raw).tool_input || {}).command || '';
      const reason = checkCommand(command);
      if (reason) {
        const hint = reason.startsWith('bacaan')
          ? 'Rahsia tidak dibaca. Semak kewujudan sahaja (ls, git check-ignore) atau minta Abam tampal nilai yang berkaitan.'
          : 'Minta Abam beri "ya" jelas, atau guna sasaran spesifik (contoh: node_modules, dist).';
        process.stderr.write(`guard-bash: DIBLOK — ${reason}.\n${hint}\n`);
        process.exit(2);
      }
    } catch (err) {
      process.stderr.write(`guard-bash: ralat dalaman (dilepaskan): ${err.message}\n`);
    }
    process.exit(0);
  });
}

if (require.main === module) main();
module.exports = { checkCommand, isSafeTarget };
