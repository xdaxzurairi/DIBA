#!/usr/bin/env node
// PostToolUse (Edit|Write): jalankan formatter repo pada fail yang baru diubah.
// Guna:  node format-on-edit.js <ext,ext,...> <perintah formatter ...>
// Contoh: node format-on-edit.js js,ts,tsx,css npx prettier --write
// Fail path dibaca dari stdin JSON (tool_input.file_path) dan ditambah di hujung perintah.
// Tidak pernah memblok: formatter gagal -> mesej stderr, exit 0.
'use strict';
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');

const [exts, ...cmd] = process.argv.slice(2);
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  try {
    const file = (JSON.parse(raw).tool_input || {}).file_path;
    const allowed = (exts || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
    const ext = (file || '').split('.').pop().toLowerCase();
    if (!file || !cmd.length || !allowed.includes(ext) || !fs.existsSync(file)) process.exit(0);
    const r = spawnSync(`${cmd.join(' ')} "${file.replace(/"/g, '')}"`, { shell: true, encoding: 'utf8', timeout: 20000 });
    if (r.status !== 0) process.stderr.write(`format-on-edit: formatter gagal (${r.status}): ${(r.stderr || '').trim()}\n`);
  } catch (err) {
    process.stderr.write(`format-on-edit: ${err.message}\n`);
  }
  process.exit(0);
});
