---
name: work-plan
description: "MUST use when user says 'copy plan', 'append plan', 'resume plan',
             'load plan', 'start the plan', 'continue the plan', 'execute plan',
             'run the plan', 'pick up where we left off', or when the AI exits
             plan mode and needs to transfer the plan into execution format. This
             skill manages the full lifecycle of project plans — from plan output
             to tracked checkbox execution with per-todo commits."
---

# Work — Plan Execution Skill
*Plan lifecycle management with tracked execution and context recovery*

## Activation

Three commands, each with its own activation message:

| Command | Activation Message |
|---------|-------------------|
| **Copy Plan** | `"Copying plan to execution format..."` |
| **Append Plan** | `"Appending to existing plan..."` |
| **Resume Plan** | `"Resuming plan execution..."` |

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "copy plan", "start the plan"** | ACTIVE — copy dan mula execution |
| **Abam kata "append plan"** | ACTIVE — append ke plan sedia ada |
| **Abam kata "resume plan", "continue the plan"** | ACTIVE — resume dari checkpoint |
| **Abam kata "execute plan", "run the plan"** | ACTIVE — mula execution dari plan sedia ada |
| **AI keluar plan mode dengan plan yang diluluskan** | READY — cadang "copy plan" kepada Abam |
| **Selepas context reset dalam project dengan plan file** | READY — cadang "resume plan" |
| **Tiada project context** | DORMANT — tiada plan action |
| **Perbualan personal/casual** | DORMANT — tiada plan action |
| **Abam kata "stop" atau "pause"** | EXIT — halt di item semasa, save plan file |

---

## Command Dispatch

| Command | Apa Yang Dilakukan |
|---------|-------------------|
| `"copy plan"` | Salin plan terbaru ke `[PLAN_LOCATION]/project-plan.md` (fresh start) |
| `"append plan"` | Append plan terbaru ke `project-plan.md` sedia ada (tambah section) |
| `"resume plan"` | Resume execution selepas context reset (sambung dari `[ ]` seterusnya) |

---

## Copy Plan

### Step 1: Find Latest Plan

- [ ] Scan `[PLAN_SOURCE_PATH]` untuk fail plan
- [ ] Sort mengikut tarikh ubahsuai, pilih yang paling terkini
- [ ] Jika tiada fail plan dijumpai: minta Abam specify path fail atau masuk plan mode dahulu

### Step 2: Transform to Project Plan Format

- [ ] Tukarkan plan steps/items kepada `- [ ]` checkbox todo items
- [ ] Kekalkan semua architecture diagrams (ASCII, mermaid) dari plan asal
- [ ] Tambah standard instructions header (rujuk `plan-format.md` dalam folder plan)
- [ ] Kekalkan logical phase/section grouping dari plan asal
- [ ] Tiada emoji dalam fail plan — markdown bersih dan boleh diparse sahaja

### Step 3: Write Project Plan

- [ ] Semak sama ada folder `[PLAN_LOCATION]/` wujud — buat jika tidak ada
- [ ] Tulis ke `[PLAN_LOCATION]/project-plan.md` (overwrite jika wujud)
- [ ] Report: "Plan copied — [X] todo items ready for execution"

### Step 4: Begin Execution

- [ ] Execute **Shared Execution Loop** (lihat di bawah)

---

## Append Plan

### Step 1: Find Latest Plan

- [ ] Sama seperti Copy Plan Step 1

### Step 2: Transform to Project Plan Format

- [ ] Sama seperti Copy Plan Step 2

### Step 3: Check Existing Plan + Line Limit

- [ ] Baca `[PLAN_LOCATION]/project-plan.md` semasa
- [ ] Kira jumlah baris dalam fail sedia ada
- [ ] Jika append **TIDAK** melebihi `[LINE_LIMIT]` baris:
  - Append kandungan baru dengan date separator:
    ```
    ---
    ## Appended: [YYYY-MM-DD]
    ```
  - Report: "Plan extended — [X] new items added, [Y] total items"
- [ ] Jika append **AKAN** melebihi `[LINE_LIMIT]` baris:
  - Rename fail semasa kepada `project-plan-YYYYMMDD.md` (archived)
  - Buat `project-plan.md` baru dengan kandungan baharu sahaja
  - Report: "Previous plan archived as project-plan-[date].md, new plan created"

### Step 4: Begin Execution

- [ ] Execute **Shared Execution Loop** (lihat di bawah)

---

## Resume Plan

### Step 1: Read Current Project Plan

- [ ] Baca `[PLAN_LOCATION]/project-plan.md`
- [ ] Jika fail tidak dijumpai: report "No plan found — use 'copy plan' to create one"

### Step 2: Parse Progress

- [ ] Kira item `[x]` (selesai)
- [ ] Kira item `[ ]` (belum selesai)
- [ ] Kira item `[~]` (blocked)
- [ ] Kenal pasti item `[ ]` seterusnya sebagai resumption point
- [ ] Baca section Architecture untuk restore technical context

### Step 3: Report Status

- [ ] Papar progress summary:
  ```
  Plan Status: [X] completed, [Y] pending, [Z] blocked
  Current Phase: [nama fasa]
  Next Task: [deskripsi item pending seterusnya]
  ```
- [ ] Baca architecture diagrams untuk restore technical understanding

### Step 4: Resume Execution

- [ ] Execute **Shared Execution Loop** dari item pending seterusnya

### Recovery Context

Selepas context reset, AI kehilangan working state. `"resume plan"` restore sepenuhnya dari fail:
- Fail plan **adalah** recovery mechanism
- Tiada penjelasan dari Abam diperlukan — AI baca fail dan teruskan

---

## Shared Execution Loop

Kitaran teras yang digunakan oleh ketiga-tiga commands selepas setup:

```
Untuk setiap [ ] todo item mengikut urutan:
  1. Execute task (tulis kod, buat fail, buat perubahan)
  2. Jika Auto-Commit dipasang → trigger commit untuk item yang selesai
  3. Mark item sebagai [x] dalam fail plan
  4. Setiap 5 item selesai → save/kemaskini fail plan (checkpoint)
  5. Proceed ke item [ ] seterusnya
  6. Jika item adalah [~] (blocked) → skip dan teruskan ke seterusnya
```

### Key Behaviors

- **Per-task commits** — setiap todo yang selesai mendapat commit sendiri (bukan batch)
- **Checkpoint saves** — fail plan dikemaskini setiap 5 item untuk elak kehilangan
- **Skip blocked items** — item `[~]` diflag dan diskip, bukan terhenti
- **Abam boleh pause** — jika Abam kata "stop" atau "pause", halt di item semasa

### Tanpa Auto-Commit

Jika Auto-Commit System tidak dipasang, execution loop masih berjalan:
- Tasks dilaksanakan dan ditanda `[x]` dalam fail plan
- Commits perlu dilakukan manual oleh Abam
- Fail plan masih berfungsi sebagai recovery mechanism

---

## Mandatory Rules

1. **Commit chain per-todo** — setiap todo yang selesai trigger commit (jika Auto-Commit dipasang). Bukan di hujung, bukan dalam batch — setiap satu.
2. **Jangan commit fail plan** — `project-plan*.md` kekal lokal sebagai working reference AI. Hanya code changes yang di-commit.
3. **Kekalkan diagrams** — semua visual elements (ASCII art, mermaid diagrams) dari plan asal mesti dibawa ke fail plan.
4. **Tiada emoji dalam fail plan** — markdown bersih dan boleh diparse sahaja.
5. **Enforce line limit** — jika fail plan melebihi `[LINE_LIMIT]` baris semasa append, rotate (archive lama, buat baru).
6. **Recovery-first design** — fail plan adalah recovery mechanism selepas mana-mana context reset. Semua yang perlu untuk resume mesti ada dalam fail.
7. **Skip blocked items** — jika task blocked, mark `[~]`, flag kepada Abam, dan teruskan ke item seterusnya.
8. **Checkpoint discipline** — kemaskini fail plan setiap 5 item selesai, walaupun di tengah execution.

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Fail plan tidak dijumpai** | Prompt Abam: "No plan found — use 'copy plan' to create one" |
| **Semua item selesai** | Report: "Plan complete! All [X] items done." |
| **Task blocked** | Mark `[~]`, flag kepada Abam dengan sebab, teruskan ke item seterusnya |
| **Abam kata "stop" atau "pause"** | Halt di item semasa, save fail plan, report progress |
| **Plan melebihi line limit** | Archive fail lama sebagai `project-plan-YYYYMMDD.md`, mula baru |
| **Tiada fail plan source dijumpai** | Minta Abam masuk plan mode dahulu atau specify path fail |
| **Context reset semasa execution** | Abam kata "resume plan" untuk sambung dari checkpoint terakhir |
| **Banyak fail plan dalam source** | Pilih yang paling terkini diubahsuai, confirm dengan Abam |
| **Auto-Commit tidak dipasang** | Teruskan execution — tandakan [x] dalam plan, commits manual |
| **Item bergantung pada item yang blocked** | Flag dependency kepada Abam — jangan proceed jika dependency belum selesai |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `auto-commit` | Setiap todo item selesai | Trigger structured commit untuk item tersebut |
| `token-guard` | Execution panjang hampir overflow | Checkpoint align plan file dengan token-guard checkpoint |
| `orchestrate` | Plan ada wave atau parallel tasks | Delegate parallel tasks melalui orchestration |
| `log-decision` | Keputusan penting dibuat semasa execution | Log keputusan — jangan hilang dalam plan noise |
| `anchor` | Execution mula drift dari scope plan | Lock semula ke plan scope, ignore task di luar |
| `session-briefing` | Resume selepas sesi baru | Brief include plan status — berapa item selesai, apa seterusnya |

---

## Level History

- **Lv.1** — Base: Three commands (copy/append/resume) + shared execution loop + per-todo commit chain + line rotation + recovery mechanism + checkpoint saves. (Origin: Production AI companion plan execution workflow)
- **Lv.2** — Wave Execution: Dependency-aware wave grouping — independent tasks within a phase can be executed in parallel via sub-agents, with wave barriers enforcing order between dependent groups.
- **Lv.3** — Superultra: Frontmatter dikemaskini dengan description lengkap, activation messages per command, Context Guard table dengan EXIT row, Protocol restructured kepada full checklist steps bernombor, Mandatory Rules dikembangkan kepada 8 peraturan, Edge Cases table dikembangkan kepada 10 baris, Integrasi Skill table 6 baris ditambah. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
