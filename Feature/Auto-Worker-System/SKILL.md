---
name: auto-worker
description: "Use when DIBA detects a goal or multi-part request from Abam that can
             be decomposed and delegated. Triggers when user states a goal with 2+
             hidden steps without specifying how. Also triggers on 'audit this',
             'set up [X]', 'clean up [X]', 'research [X] and recommend', 'fix
             everything in [project]', 'handle [X] for me'."
---

# Auto-Worker — Silent Delegation Orchestrator
*Abam bagi goal. DIBA buat kerja. Hasil datang bersih.*

## Activation

When this skill activates, output:

"Auto-Worker aktif. Parsing intent..."

Then immediately execute Step 1 of Protocol silently.

---

## Context Guard

| Context | Status |
|---------|--------|
| **User bagi goal dengan 2+ hidden steps tanpa specify cara** | ACTIVE — full decomposition protocol |
| **"audit this" / "set up [X]" / "clean up [X]"** | ACTIVE — parse dan delegate |
| **"research [X] and recommend"** | ACTIVE — research subagent dispatch |
| **"fix everything in [project]"** | ACTIVE — multi-task decomposition |
| **"handle [X] for me"** | ACTIVE — auto-delegate |
| **User bagi explicit step-by-step instructions** | DORMANT — follow directly, no decomposition |
| **Task adalah satu langkah jelas** | DORMANT — execute immediately |
| **Task melibatkan delete, push, deploy** | DORMANT — confirm dahulu sebelum proceed |
| **User kata "cancel" atau "stop"** | EXIT — hentikan workers, report status semasa |

---

## Protocol

### Step 1: Intent Parsing (Silent)

- [ ] Baca request Abam — identify:
  - **Outcome** — apa hasil akhir yang dikehendaki?
  - **Domain** — code, security, data, docs, infrastructure, research?
  - **Constraints** — project mana, fail mana, apa yang TIDAK boleh disentuh?
  - **Ambiguity** — ada yang tidak jelas yang akan block decomposition?
- [ ] Jika ada critical ambiguity (tidak boleh tentukan project atau fail) → tanya **SATU soalan spesifik** dahulu sebelum proceed
- [ ] Jika intent jelas → teruskan ke Step 2 tanpa tanya

---

### Step 2: Task Decomposition

- [ ] Pecah goal kepada subtasks yang independent:

  ```
  Goal: [what Abam wants]
  ├── Task A: [domain] — [outcome]
  ├── Task B: [domain] — [outcome]
  └── Task C: [domain] — [outcome, depends on A]
  ```

- [ ] Categorize setiap task:
  - **Parallel** — task bebas, boleh jalan serentak
  - **Sequential** — task bergantung pada output task lain
  - **Risky** — edit fail kritikal, destructive actions, API contract changes

- [ ] Estimate complexity: simple (1 tool call) vs complex (multi-file, multi-step)
- [ ] Flag tasks yang perlu confirmation sebelum execute

---

### Step 3: Worker Dispatch

Pilih execution method untuk setiap subtask:

| Task Type | Method |
|-----------|--------|
| Read / research / explore | Subagent Explore (parallel jika independent) |
| Code edit / create | Direct execution, ikut code-sharp principles |
| Security check | Subagent atau security-audit-remediation skill |
| Multi-file complex change | Subagent dengan full briefing |
| Simple single-file change | Direct, no subagent overhead |
| Decision-heavy task | Escalate dahulu, execute selepas Abam decide |

Setiap subagent briefing mesti ada:
- [ ] Sharp objective — apa yang perlu dicari atau dibuat
- [ ] Clear file/folder scope — mana yang boleh disentuh
- [ ] Permission level — read-only atau edit
- [ ] Expected output format — apa yang perlu direturn

---

### Step 4: Self-Resolution

Bila workers jumpa blockers, resolve sendiri dahulu:

| Situation | Action |
|-----------|--------|
| Fail tidak wujud | Cari alternative, proceed dengan apa yang ada |
| Pattern tidak jelas | Semak fail lain dalam project untuk examples |
| Ada dua approach yang valid | Pilih yang lebih consistent dengan existing codebase |
| Minor issue yang boleh diselesaikan sendiri | Resolve, note dalam final report |
| Issue yang perlu keputusan Abam | Escalate ke Step 5 |
| Fail protected atau sensitive | Stop — escalate kepada Abam |

---

### Step 5: Escalate Bila Perlu

Escalate kepada Abam **hanya** apabila:
- Keputusan melibatkan trade-off yang Abam perlu tahu (contoh: ubah API contract)
- Action adalah irreversible (delete fail, drop tables)
- Critical ambiguity yang tidak boleh diinfer dari codebase atau context
- Task akan melebihi original scope yang Abam nyatakan

Format escalation:
```
Auto-Worker perlu keputusan:
[Issue] — [option A] vs [option B]
Cadangan: [A/B] — sebab: [brief reason]
```

- [ ] Jangan escalate perkara kecil yang boleh diselesaikan sendiri
- [ ] Jangan escalate lebih dari 2 kali dalam satu auto-worker session
- [ ] Jika escalation tidak mendapat response → nota dalam final report, skip task tersebut

---

### Step 6: Synthesis Report

Selepas semua tasks selesai, report dalam ≤ 8 baris:

```
Auto-Worker selesai.

Berjaya:
- [Task A] — [result]
- [Task B] — [result]

Nota:
- [autonomous decisions made]
- [files changed]
- [skipped tasks, jika ada]
```

- [ ] Jangan include progress updates semasa execution — silent sahaja
- [ ] Jika ada tasks yang diskip atau gagal — nyatakan dalam Nota
- [ ] Jika ada autonomous decisions yang non-obvious — log ke log-decision

---

## Mandatory Rules

1. **Silent by default** — tiada progress updates semasa execution melainkan escalation diperlukan
2. **Minimum escalation** — resolve sendiri dahulu; escalate hanya bila genuinely diperlukan
3. **Tight scope** — jangan expand melebihi apa yang Abam minta
4. **code-sharp always** — semua code edits ikut code-sharp principles
5. **Risk = confirm** — destructive atau irreversible actions perlu explicit confirmation sebelum proceed
6. **Satu soalan sahaja bila ambiguous** — jangan tanya banyak soalan sekaligus, tanya yang paling kritikal
7. **Subagent briefing mesti lengkap** — objective, scope, permission, output format — semua 4 elemen wajib
8. **Log autonomous decisions** — non-obvious choices yang dibuat tanpa tanya Abam perlu dilog
9. **Jangan bundle risky tasks dalam parallel** — risky tasks mesti sequential dan confirmed dahulu
10. **Cap escalation** — max 2 escalations per auto-worker run; lebih dari itu, nota dan skip

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Task terlalu luas atau vague** | Tanya Abam satu soalan untuk clarify scope sebelum decompose |
| **Semua subtasks risky** | Escalate keseluruhan plan kepada Abam — jangan proceed tanpa approval |
| **Subagent return tiada result** | Nota dalam report, jangan halucinate result |
| **Task bergantung pada task lain yang gagal** | Skip dependent task, note dalam Nota section |
| **Fail yang perlu diubah adalah sensitive** | Stop subtask tersebut — escalate kepada Abam |
| **User bagi arahan baru semasa execution** | Pause, baca arahan baru, re-anchor sebelum sambung |
| **Decomposition menghasilkan > 8 subtasks** | Groupkan yang serupa, atau tanya Abam nak focus mana |
| **Research task return conflicting info** | Present kedua-dua, nota conflict, biar Abam decide |
| **Execution masa terlalu lama** | Surface progress note sekali: "Auto-Worker masih berjalan..." |
| **Abam kata "stop" semasa execution** | Hentikan, report status semasa — tasks yang siap dan yang pending |
| **Duplicate task dalam decomposition** | Merge tasks yang overlap — jangan execute dua kali |
| **Task memerlukan tool yang tidak tersedia** | Nota dalam report, suggest alternative atau manual step |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `orchestrate` | Goal memerlukan workflow pattern selection | Delegate kepada orchestrate untuk kompleksiti tinggi |
| `log-decision` | Selepas autonomous decisions dibuat | Log non-obvious choices yang dibuat tanpa tanya Abam |
| `security-audit-remediation` | Subtask melibatkan security | Route kepada specialist skill |
| `code-sharp` | Sebelum sebarang code edit | Enforce standard sebelum execute |
| `auto-commit` | Selepas code changes selesai | Commit hasil kerja auto-worker |
| `anchor` | Bila scope mula merebak | Re-anchor kepada original goal Abam |

---

## Level History

- **Lv.1** — Base: intent parsing, task decomposition (parallel/sequential/risky), worker dispatch (subagent/direct/specialist), self-resolution untuk worker blockers, minimum escalation dengan structured format, synthesis report ≤ 8 baris. (Origin: Rewrite dari 6-line placeholder kepada full protocol, 2026-04-28)
- **Lv.2** — Superultra: Frontmatter dan activation message ditambah, Context Guard dikembangkan dengan EXIT row dan suppression states, Step 1 Intent Parsing diperkukuh dengan 4-element parsing, Step 3 Worker Dispatch dikembangkan dengan permission level, escalation cap rule ditambah, edge cases dikembangkan kepada 12 rows, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 10 rules. (2026-05-19)
