#!/usr/bin/env node
// Ujian stop-guard.js dalam vault tiruan terasing (tmpdir) — tidak menyentuh vault sebenar.
// Guna: node stop-guard.test.js [laluan-hook-lain]   (lalai: stop-guard.js sebelah fail ini)
// Keluar 0 jika semua lulus, 1 jika ada gagal. Kes A dan B gagal pada versi hook sebelum isVaultDelivery.
const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');

const HOOK_SRC = path.resolve(process.argv[2] || path.join(__dirname, 'stop-guard.js'));
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'stop-guard-test-'));
const root = path.join(base, 'vault');
fs.mkdirSync(path.join(root, '.claude', 'hooks'), { recursive: true });
fs.mkdirSync(path.join(root, 'daily-diary', 'current'), { recursive: true });
fs.mkdirSync(path.join(root, 'main'), { recursive: true });
const hook = path.join(root, '.claude', 'hooks', 'stop-guard.js');
fs.copyFileSync(HOOK_SRC, hook);

const V = root.split(path.sep).join('/');
const p = (n) => String(n).padStart(2, '0');
const d = new Date();
const diary = path.join(root, 'daily-diary', 'current', `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.md`);
const T0 = Date.now() - 600000;

const line = (ms, name, input, cwd) => JSON.stringify({
  timestamp: new Date(ms).toISOString(), cwd, message: { content: [{ type: 'tool_use', name, input }] },
});
const setDiary = (ms) => { fs.writeFileSync(diary, '# diary\n' + 'x'.repeat(200)); fs.utimesSync(diary, new Date(ms), new Date(ms)); };

function run(label, lines, diaryMs, expectBlock) {
  setDiary(diaryMs);
  const tp = path.join(base, 't.jsonl');
  fs.writeFileSync(tp, lines.join('\n'));
  const r = cp.spawnSync(process.execPath, [hook], {
    input: JSON.stringify({ transcript_path: tp, session_id: 'sg-test-' + label[0] }), encoding: 'utf8',
  });
  const blocked = /"decision":"block"/.test(r.stdout);
  console.log(blocked === expectBlock ? 'OK   ' : 'GAGAL', label, '-> block =', blocked);
  return blocked === expectBlock;
}

const vaultCommit = (ms) => line(ms, 'Bash', { command: `cd ${V} && git add -A && git commit -m x && git push origin main` }, 'C:/Users/BSM/XDIBAX');
const codeCommit = (ms) => line(ms, 'Bash', { command: 'cd C:/Users/BSM/XDIBAX && git commit -m code' }, 'C:/Users/BSM/XDIBAX');

let results = [];
try {
  results = [
    run('A hanya commit vault (laluan dalam arahan)', [vaultCommit(T0 + 1000)], T0, false),
    run('B commit vault ikut cwd sahaja', [line(T0 + 1000, 'Bash', { command: 'git commit -m x' }, V)], T0, false),
    run('C commit kod, diary lapuk', [codeCommit(T0 + 1000)], T0, true),
    run('D commit kod, diary dikemas kini selepas', [codeCommit(T0 + 1000)], T0 + 5000, false),
    run('E commit kod lalu commit vault, diary lapuk -> masih block', [codeCommit(T0 + 1000), vaultCommit(T0 + 9000)], T0, true),
    run('F Edit fail kod, diary lapuk', [line(T0 + 1000, 'Edit', { file_path: 'C:/Users/BSM/XDIBAX/scripts/x.js' }, 'C:/Users/BSM/XDIBAX')], T0, true),
    run('G Edit fail memory sahaja', [line(T0 + 1000, 'Edit', { file_path: V + '/main/current-session.md' }, V)], T0, false),
  ];
} finally {
  try { fs.rmSync(base, { recursive: true, force: true }); } catch (_) {}
}
const ok = results.length === 7 && results.every(Boolean);
console.log(ok ? 'SEMUA LULUS (7/7)' : `ADA GAGAL (${results.filter(Boolean).length}/7)`);
process.exit(ok ? 0 : 1);
