---
name: auto-commit
description: "MUST use when committing code changes, when user says 'commit',
             'save changes', 'git commit', 'commit changes', when completing a
             task and code needs to be preserved, or when any git commit operation
             is about to happen. Also triggers on 'push changes', 'commit and push',
             'save work to git'. Lv.3 VIGILANT: Also triggers PROACTIVELY after
             completing any task — auto-checks git status and commits any uncommitted
             changes without being asked. No work ever left behind."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/auto-commit/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Auto-Commit — Intelligent Commit Skill
*Setiap perubahan dijaga. Setiap kerja bercerita.*

## Activation

When this skill activates, output:

"Committing changes to history..."

Then immediately execute Step 0 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **User says "commit", "save changes", "git commit"** | ACTIVE — full protocol |
| **AI completes a task (Lv.3 Vigilant)** | ACTIVE — auto-detect and commit |
| **User says "push" atau "commit and push"** | ACTIVE — commit + push |
| **User says "undo last commit"** | ACTIVE — guide `git reset --soft HEAD~1` |
| **No git repository detected** | DORMANT — warn and skip |
| **No changes to commit (clean tree)** | DORMANT — report "Nothing to commit" |
| **Merge conflicts present** | DORMANT — warn, do not commit |
| **Personal/casual conversation** | DORMANT — no commit action |
| **User kata "cancel commit"** | EXIT — berhenti, jangan commit |

---

## Protocol

### Step 0: Pre-Flight Check

- [ ] Run `git status` — verify git repository exists
- [ ] Check untuk staged, unstaged, dan untracked changes
- [ ] Run `git log --oneline -5` — baca recent commit style untuk consistency
- [ ] Jika tiada changes: report "Nothing to commit — working tree is clean" dan exit
- [ ] Jika ada unstaged changes: stage fail relevan (prefer specific file names, bukan `-A`)
- [ ] Jika ada merge conflicts: warn Abam — jangan proceed

---

### Step 1: Analyze Changes

- [ ] Run `git diff --staged` — baca actual code changes yang akan dicommit
- [ ] Run `git diff` — semak remaining unstaged changes
- [ ] Kenal pasti nature of changes: feature, bug fix, refactor, documentation, WIP
- [ ] Scan untuk fail sensitif dalam staged list: `.env`, credentials, API keys, token files
- [ ] Jika fail sensitif ada — **block commit**, list fail, warn Abam sebelum proceed
- [ ] Estimate time spent berdasarkan session context

---

### Step 2: Draft Commit Message

- [ ] Pilih format berdasarkan skop perubahan:

  **Enhanced** (untuk feature, bug fix, refactor yang meaningful):
  ```
  [Achievement Title] - [Brief technical summary]

  === TECHNICAL CHANGES ===
  • [File/Component]: [Specific change description]
  • [File/Component]: [Specific change description]

  === SESSION CONTEXT ===
  • Project: [name] | Type: [type] | Time: ~XX min
  • Focus: [what was accomplished]
  ```

  **Minimal** (untuk typo, comment, rename kecil):
  ```
  [type]: [short description]
  ```

  **WIP** (untuk simpan progress kerja separuh):
  ```
  WIP: [what is in progress] — [where left off]
  ```

- [ ] Ikut commit style dari `git log --oneline -5` untuk consistency
- [ ] Jangan guna emoji dalam commit message body — activation message sahaja boleh

---

### Step 3: Execute Commit

- [ ] Stage fail secara spesifik: `git add [filename1] [filename2]` — jangan `git add -A`
- [ ] Jika ada fail unrelated dalam workspace — jangan stage, leave as-is
- [ ] Commit menggunakan HEREDOC format untuk multi-line message yang betul
- [ ] Verify commit berjaya dengan `git status` (clean working tree expected)

---

### Step 4: Confirm

- [ ] Display: short commit hash, title, bilangan fail yang berubah
- [ ] Report author name pada commit
- [ ] Tunjuk remaining unstaged/untracked files jika ada
- [ ] Jika ada follow-up yang patut dicommit berasingan — cadangkan kepada Abam

---

### Step 5: Push (Optional)

- [ ] Execute hanya jika Abam explicitly kata "push" atau "commit and push"
- [ ] **Jangan auto-push** — pushing affects remote repositories, mesti deliberate
- [ ] Untuk main/master branch: warn Abam, tanya sekali lagi sebelum push
- [ ] Run `git push` dan confirm success

---

## Vigilant Mode (Lv.3) — Proactive Detection

Selepas completing ANY task, auto:

1. **Auto-check** — run `git status` senyap selepas task completion
2. **Detect** — jika uncommitted changes ada, tentukan sama ada ia berkaitan task yang baru selesai
3. **Auto-commit** — execute full commit protocol untuk changes
4. **Report** — confirm apa yang dicommit dengan short hash dan title

### Vigilant Trigger Points

- Selepas coding task selesai ("done", "fixed", "implemented")
- Selepas context shift (coding session → casual conversation)
- Selepas save operations (save-diary, save memory, save project)
- Awal sesi — detect leftover uncommitted work dari sesi sebelum

### Vigilant Behavior

- No approval gate — draft dan commit dalam satu flow yang seamless
- Jika ada beberapa logical groups of changes — commit berasingan
- Sentiasa report apa yang dicommit supaya Abam sentiasa tahu

---

## Mandatory Rules

1. **Tiada emoji dalam commit message body** — activation message sahaja boleh ada emoji
2. **Author sentiasa human user** — commits appear under user's name, bukan AI
3. **Prefer specific file staging** — `git add [filename]` bukan `git add -A`
4. **Time estimate required** — sentiasa include approximate time spent dalam session context
5. **Warn on sensitive files** — jika `.env`, credentials, API keys akan dicommit, warn dan exclude
6. **Never auto-push** — pushing adalah explicit. Commits kekal local sehingga Abam decide
7. **Ikut recent commit style** — semak `git log` untuk maintain consistency dengan project
8. **Verify selepas commit** — run `git status` untuk confirm clean working tree
9. **WIP commits dibenarkan** — lebih baik WIP commit daripada kerja hilang
10. **Multiple logical groups = multiple commits** — jangan bundle unrelated changes dalam satu commit

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **No changes to commit** | Report "Nothing to commit — working tree is clean" |
| **Merge conflicts present** | Warn Abam tentang conflicts, jangan commit |
| **Sensitive files staged** | Block commit, list fail tersebut, tanya Abam untuk exclude |
| **Large binary files staged** | Warn tentang repository size impact sebelum commit |
| **No git repository** | Inform: "No git repository found in this directory" |
| **Multiple logical changes** | Split kepada separate commits untuk clean history |
| **User kata "undo last commit"** | Guide dengan `git reset --soft HEAD~1` (keep changes staged) |
| **Push to main/master branch** | Warn sekali lagi, tanya confirm, baru proceed |
| **Commit fails (pre-commit hook)** | Report error, fix issue, create NEW commit — jangan amend |
| **File renamed atau deleted** | Stage deletion/rename explicitly, jangan skip |
| **Unstaged changes berbeza dari staged** | Lapor kepada Abam — tanya sama ada nak include |
| **Repository in detached HEAD state** | Warn Abam, tanya sama ada nak buat branch dahulu |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `save-diary` | Selepas commit berjaya | Log commit summary dalam diary entry |
| `log-decision` | Bila commit reflect keputusan penting | Trigger log-decision untuk rekod WHY |
| `code-sharp` | Sebelum stage fail kod | Verify standard kod dipenuhi sebelum commit |
| `anchor` | Bila fail yang staged luar scope | Halt — anchor semula sebelum proceed |
| `session-briefing` | Awal sesi | Check untuk leftover uncommitted work dari sesi sebelum |
| `auto-worker` | Selepas auto-worker selesai task | Vigilant mode trigger auto-commit untuk semua changes |

---

## Level History

- **Lv.1** — Base: Analyze staged changes, draft structured commit message dengan configurable sections, enforce human authorship, no-emoji rule, time tracking, sensitive file detection. (Origin: Production AI companion commit workflow)
- **Lv.2** — Auto-Commit: Removed approval gate — AI analyzes, drafts, dan commits dalam satu seamless flow tanpa tunggu user confirmation on the message.
- **Lv.3** — Vigilant: Proactive post-task detection — auto-check `git status` selepas completing any task dan commit if dirty. No work ever left behind.
- **Lv.4** — Superultra: Context Guard dikembangkan dengan EXIT row dan DORMANT states, Step 0 Pre-Flight Check dipisahkan, sensitive file block diperkukuh, push-to-main guard ditambah, commit fail recovery (hook failure = new commit), edge cases dikembangkan kepada 12 rows, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 10 rules. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
