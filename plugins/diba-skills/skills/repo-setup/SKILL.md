---
name: repo-setup
description: "MUST use bila Abam minta 'setup repo', 'sediakan Claude Code untuk repo ni', 'setup engineer', 'audit setup', 'harden repo', 'setup permissions/hooks/agents', atau bila DIBA masuk repo baharu tanpa CLAUDE.md / .claude/settings.json. Audit-dahulu, idempoten, tunjuk setiap fail sebelum tulis, bukti ujian sebelum lapor siap."
---

# Repo Setup — DIBA Setup Engineer
*Baca dahulu, ukur jurang, tambah hanya yang tiada. Tiada tekaan, tiada tulis senyap.*

Aktif: `🛠️ Repo setup — [audit / apply / verify]`

## Peraturan keras (kekal sepanjang skill ini)
1. **Tunjuk setiap fail sebelum tulis. Satu fail pada satu masa. Berhenti serta-merta bila Abam kata "stop".**
2. **Jangan baca `.env`, `.env.*`, folder `secrets/`, walau untuk "semak".** Kewujudan/gitignore sahaja: `ls`, `git check-ignore -q`. Nama pembolehubah → `.env.example` hanya jika Abam benarkan.
3. **Install, push, padam = perlu "ya" jelas Abam setiap kali.** Kelulusan satu kali tak merebak ke langkah lain.
4. **Jangan reka perintah.** Setiap perintah dalam CLAUDE.md/allow mesti ada sumber `fail:baris`. Tiada sumber → tulis `TIADA DIJUMPAI`.
5. **Jangan tulis ganti.** Fail sedia ada → gabung (merge) dan tunjuk diff. Sandarkan dahulu ke `.claude/backups/<cap-masa>/`.
6. Jangan sebut "should work". Lapor: perintah dijalankan + output sebenar (`verification-before-completion`).

## Kenapa lebih baik daripada prompt asal
| Prompt asal | repo-setup DIBA |
|---|---|
| Tulis fail baharu | **Audit jurang** — skip apa yang sudah ada, ubah suai hanya delta; idempoten (boleh dijalankan semula) |
| `deny Read(.env)` sahaja | **Pertahanan berlapis**: `deny` + hook `guard-bash.js` (`cat .env` melalui shell memintas `Read` deny) |
| Hook bash `rm -rf` | Hook **node** (Windows-selamat, juga `Remove-Item -Recurse -Force`, `rd /s`, `bash -c`, `xargs`), sasaran selamat dilepas (`node_modules`, `dist`), **gagal-buka**, 104 ujian termasuk dapatan penyerang Skeptic |
| Reviewer baca-sahaja (tanpa disiplin bukti) | `code-reviewer-ro`: TERBUKTI vs SYAK, wajib `fail:baris`, ada barisan "TIDAK DISEMAK" |
| "Senarai kesilapan lalu" ditulis tangan | **Disemai daripada memori DIBA** (`library/learned/rules.md` + `signal-buffer.md`) |
| Satu agen buat semua | Audit **selari** (peraturan Abam 2026-10-20), DIBA sintesis |
| Serah-terima hilang bila sesi tamat | Serah-terima → `save-diary`, keputusan → `log-decision`, projek → registry |
| Allow dibiar apa adanya | **Audit allow sedia ada**: tandakan entri berbahaya (tulis DB, `Bash(*)`, token tertanam) |

## Fasa

### P0 — Pra-semak (langkah 06 didahulukan)
- `git status --short`. Ada kerja belum commit → minta Abam commit/stash **sebelum** apa-apa. Ingatkan sekali: `Esc Esc` undur suntingan fail; perubahan oleh perintah bash perlu git.
- Bukan repo git → beritahu, cadang `git init`, jangan teruskan tanpa "ya".
- Masuk plan mode. Tiada tulis dalam P0–P1.

### P1 — Audit baca-sahaja (langkah 01)
Agihkan selari: `Explore` (stack, package manager, scripts, test/lint, susun atur folder) + `code-reviewer-ro` (konvensyen & titik berisiko). Hasil satu jadual:

| Perkara | Nilai | Status | Sumber |
|---|---|---|---|
| test | `npm test` | DIJUMPAI | package.json:12 |
| lint | — | TIADA DIJUMPAI | — |
| formatter | prettier | DIJUMPAI | .prettierrc |

Status hanya: **DIJUMPAI / TEKAN (dengan sebab) / TIADA DIJUMPAI**. Kemudian **matriks jurang** — 12 sasaran vs apa yang sudah ada:
CLAUDE.md · done-block · allow/deny/ask · PostToolUse formatter · PreToolUse guard · skill · reviewer · `.gitignore` worktree · `.worktreeinclude` · peraturan konteks.
Audit juga `~/.claude/settings.json` + `.claude/settings*.json` sedia ada: tandakan allow berisiko. Tulis tiada apa-apa lagi.

### P2 — CLAUDE.md (langkah 02, 03, 10) — < 200 baris
Susunan: Perintah · Peraturan kod · **Jangan sentuh** (folder) · **Kesilapan Claude sebelum ini** · Definition of Done · Peraturan konteks.
- **Kesilapan sebelum ini**: semai daripada `library/learned/rules.md` + `main/signal-buffer.md` yang berkaitan repo ini. Tiada → mulakan kosong, bukan isi rekaan.
- **Done**: build/test/lint **yang DIJUMPAI** mesti lulus; kerja UI → tangkap skrin dan **benar-benar lihat**; lapor perintah + output; jangan "should work".
- **Konteks** (3 baris untuk manusia): `/clear` antara tugas tak berkaitan · `/compact` bila satu tugas panjang · `Esc Esc` bila silap arah.
- Peraturan satu-kawasan → `.claude/rules/<kawasan>.md`, bukan CLAUDE.md. CLAUDE.md sedia ada → **gabung**, jangan ganti.

### P3 — Kebenaran (langkah 04) — `.claude/settings.json`
Mula daripada `settings.template.json` (folder skill ini).
- `allow`: hanya perintah harian selamat daripada P1 (DIJUMPAI sahaja).
- `deny`: `.env`, `.env.*`, `secrets/` (nota: `deny` menang atas `allow`, jadi `.env.example` turut tertutup — guna `ls` untuk nama fail).
- `ask`: install, push, `rm`, `branch -D`.
- **Jadual penjelasan** — satu baris setiap peraturan, dipaparkan kepada Abam supaya dia boleh gugurkan yang tak mahu:

| Peraturan | Kenapa |
|---|---|
| `Read(./.env*)` | Kunci/token tak boleh masuk konteks atau log |
| `Read(./secrets/**)` | Sama; folder rahsia |
| `ask Bash(git push:*)` | Push keluar dari mesin — perlu "ya" |
| `ask install (npm/pnpm/yarn/pip/composer)` | Memasang kod pihak ketiga — risiko rantaian bekalan |
| `ask rm / Remove-Item` | Padam tak boleh diundur oleh `Esc Esc` |
| `allow <perintah>` | Selamat, kerap, sudah dijumpai dalam repo |

### P4 — Hook (langkah 05)
- **PreToolUse** `Bash|PowerShell` → `C:/Users/BSM/XDIBAX/DIBA/.claude/hooks/guard-bash.js` (exit 2 untuk `rm -rf` bukan-selamat & bacaan rahsia).
- **PostToolUse** `Edit|Write` → `format-on-edit.js <ext> <formatter repo>` **hanya jika** config formatter DIJUMPAI. Tiada → langkau, nyatakan `TIADA DIJUMPAI`, jangan reka.
- **Ujian wajib pada fail scratch** (guna scratchpad sesi) dan tunjuk keputusan: formatter mengubah fail; `rm -rf ./x` → exit 2; `cat .env` → exit 2; `git status` → exit 0. Jalankan `node --test guard-bash.test.js`.
- Kebenaran `settings.json` lama: sandar dahulu, tulis ganti hanya blok `hooks`.

### P5 — Skill + reviewer (langkah 07, 08)
- **Skill pertama**: cari prompt paling berulang untuk repo ini — imbas `~/.claude/history.jsonl` (penapis laluan projek) dan `daily-diary/` dahulu; tanya Abam hanya jika kabur. Tulis `.claude/skills/<nama>/SKILL.md` dengan `description` yang jelas supaya dimuat bila permintaan padan. Guna `forge-skill` untuk struktur.
- **Reviewer**: pasang `~/.claude/agents/code-reviewer-ro.md` (tools: Read, Grep, Glob — tidak pernah edit) atau salin ke `.claude/agents/` jika mahu khusus projek.

### P6 — Selari (langkah 09)
- `.gitignore` tambah: `.claude/worktrees/`, `CLAUDE.local.md`, `.claude/backups/`.
- `.worktreeinclude`: **nama** fail env sahaja (daripada `git check-ignore`), tidak pernah kandungan.
- Tunjuk perintah sesi kedua: `claude --worktree <nama>`.

### P7 — Serah-terima (langkah 11, 12)
Satu ringkasan: setiap fail dicipta · setiap peraturan ditambah · apa yang diuji (dengan output) · apa yang masih perlukan input Abam · **3 perkara untuk dicuba esok**. Tambah **3 baris panduan effort** (kerja `xhigh` vs `medium` mengikut saiz tugas biasa repo ini) — dalam ringkasan sahaja, bukan dalam fail.
Kemudian: `save-diary` (ringkasan), `log-decision` (pilihan tak jelas, cth. kenapa `.env.example` ditutup), kemas kini registry projek (`manage-project`).

## Pelan undur
Semua sandaran di `.claude/backups/<cap-masa>/`. Undur satu langkah: salin semula fail itu. Hook rosak? Buang blok `hooks` daripada `settings.json` — `guard-bash.js` memang gagal-buka, jadi ia tak akan mengunci shell.

## Had yang diakui jujur
- Hook penghadang ialah pagar, bukan dinding: pengekodan tak biasa (`eval`, `$'\x72m'`, petikan ber-escape bersarang 3 tahap, `docker exec`) boleh memintasnya. Sempadan sebenar = `deny` + `ask` + git + sandaran. Jangan dakwa "selamat sepenuhnya".
- `deny Read(...)` tidak menghalang perintah shell; itulah sebab `guard-bash.js` wujud.
