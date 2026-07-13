# Self-Learning Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a full self-learning loop for DIBA — micro-capture signals per response, batch-extract lessons (fact/case/rule) into a semantic store, expose lessons via echo-recall every session.

**Architecture:** Dual-layer — cheap micro-capture appends raw signals to `main/signal-buffer.md` per response; `auto-learn` skill batch-processes buffer into `library/learned/` semantic store and updates `main/learned-index.md` in-context index; echo-recall reads index at Priority 0.

**Tech Stack:** Markdown skill files (SKILL.md format), CLAUDE.md standing rules, existing echo-recall integration point.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `main/signal-buffer.md` | Raw signal log — micro-capture append target |
| Create | `main/learned-index.md` | In-context index — max 80 lines, loaded every session |
| Create | `library/learned/facts.md` | Atomic facts with source + context |
| Create | `library/learned/cases.md` | Specific episodes: miss → fix → outcome |
| Create | `library/learned/rules.md` | General rules extracted from cases |
| Create | `C:/Users/BSM/.claude/skills/auto-learn/SKILL.md` | Batch extraction skill |
| Modify | `CLAUDE.md` | Add micro-capture standing rules + command router entries |
| Modify | `C:/Users/BSM/.claude/skills/echo-recall/SKILL.md` | Add Priority 0 for learned-index |

---

## Task 1: Init Semantic Store Files

**Files:**
- Create: `main/signal-buffer.md`
- Create: `main/learned-index.md`
- Create: `library/learned/facts.md`
- Create: `library/learned/cases.md`
- Create: `library/learned/rules.md`

- [ ] **Step 1: Create `main/signal-buffer.md`**

```markdown
# Signal Buffer
*Micro-capture log — append-only. Processed entries tagged [done].*

| timestamp | type | signal |
|-----------|------|--------|
```

- [ ] **Step 2: Create `main/learned-index.md`**

```markdown
# DIBA Learned Index
*Last updated: (auto-updated by auto-learn skill)*
*Max 80 lines — oldest/lowest-confidence pruned bila penuh*

## Facts
*(kosong — belum ada lessons)*

## Cases
*(kosong — belum ada lessons)*

## Rules
*(kosong — belum ada lessons)*
```

- [ ] **Step 3: Create `library/learned/facts.md`**

```markdown
# Learned Facts
*Atomic facts dengan source + context penuh.*
*Format: ## [YYYY-MM-DD] Title*

```

- [ ] **Step 4: Create `library/learned/cases.md`**

```markdown
# Learned Cases
*Episod spesifik: miss → fix → outcome.*
*Format: ## [YYYY-MM-DD] Title*

```

- [ ] **Step 5: Create `library/learned/rules.md`**

```markdown
# Learned Rules
*General rules extracted dari cases. Confidence: low (1 case) / medium (2-3) / high (4+).*
*Format: ## RXXX — Rule Title*

```

- [ ] **Step 6: Verify semua 5 files wujud**

```bash
ls "C:/Users/BSM/XDIBAX/DIBA/main/signal-buffer.md"
ls "C:/Users/BSM/XDIBAX/DIBA/main/learned-index.md"
ls "C:/Users/BSM/XDIBAX/DIBA/library/learned/facts.md"
ls "C:/Users/BSM/XDIBAX/DIBA/library/learned/cases.md"
ls "C:/Users/BSM/XDIBAX/DIBA/library/learned/rules.md"
```
Expected: semua 5 path return tanpa error.

- [ ] **Step 7: Commit**

```bash
git add main/signal-buffer.md main/learned-index.md library/learned/facts.md library/learned/cases.md library/learned/rules.md
git commit -m "feat(self-learning): init semantic store + signal buffer files"
```

---

## Task 2: Create `auto-learn` Skill

**Files:**
- Create: `C:/Users/BSM/.claude/skills/auto-learn/SKILL.md`

- [ ] **Step 1: Create skill file**

```markdown
---
name: auto-learn
description: "Batch-process signal-buffer.md → extract fact/case/rule lessons →
             save to library/learned/ → update learned-index.md.
             Trigger: 'extract lessons', 'process buffer', 'learn from today',
             'what did we learn', 'update learned'. Also chains after save-diary / eod."
---

# Auto-Learn — Batch Lesson Extraction
*Signal buffer → semantic lessons. Belajar dari setiap sesi.*

## Activation
When this skill activates, output: "Processing signal buffer..."

---

## Signal Types

| Type | Meaning |
|------|---------|
| `correction` | Abam explicitly betulkan DIBA |
| `approval` | Abam setuju dengan sesuatu non-obvious |
| `uncertain` | DIBA sendiri flag uncertainty dalam response |
| `tool-fail` | Tool call fail, retry, atau output unexpected |

## Classification Logic

| Signal type | Pattern | Target store |
|-------------|---------|--------------|
| `correction` | atomic fact | `facts.md` |
| `correction` | pattern / recurring | `cases.md` + possibly `rules.md` |
| `approval` | non-obvious choice confirmed | `cases.md` (validated approach) |
| `uncertain` | resolved dalam sesi | `cases.md` (miss + resolution) |
| `tool-fail` | pattern untuk elak | `rules.md` |

---

## Protocol

### Step 1: Read Buffer
- [ ] Read `main/signal-buffer.md`
- [ ] Kutip semua baris yang TIDAK ada prefix `[done]`
- [ ] Jika tiada unprocessed entries → output "Buffer kosong. Tiada lesson baru." dan stop

### Step 2: Extract Lessons

Bagi setiap unprocessed signal:

- [ ] Classify → fact / case / rule (guna Classification Logic atas)
- [ ] Extract komponen:
  - **Untuk fact:** `[date]`, `[title]`, `[source type]`, `[context]`, `[fact statement]`
  - **Untuk case:** `[date]`, `[title]`, `[miss]`, `[fix]`, `[outcome]`, `[lesson]`
  - **Untuk rule:** `[rule ID]`, `[rule statement]`, `[source case]`, `[confidence]`
- [ ] Rule confidence: low = 1 instance, medium = 2-3, high = 4+
- [ ] Jika satu signal boleh jadi case DAN rule → tulis kedua-dua

### Step 3: Append to Semantic Store

- [ ] Append ke `library/learned/facts.md`:
```
## [YYYY-MM-DD] [Title]
- **Source:** [correction/approval/uncertain/tool-fail] dari [Abam/DIBA]
- **Context:** [apa yang berlaku sebelum signal ini]
- **Fact:** [atomic fact statement]
```

- [ ] Append ke `library/learned/cases.md`:
```
## [YYYY-MM-DD] [Title]
- **Miss:** [apa yang DIBA buat salah atau uncertain]
- **Fix:** [apa yang betul / bagaimana diselesaikan]
- **Outcome:** [kesan dari fix]
- **Lesson:** [satu ayat lesson yang boleh digunakan semula]
```

- [ ] Append ke `library/learned/rules.md`:
```
## R[NNN] — [Rule Title]
- **Rule:** [general rule statement]
- **Source:** case [YYYY-MM-DD] [title]
- **Confidence:** [low/medium/high] ([N] instance)
```
  Rule ID = R001, R002, dst. Semak rules.md untuk ID terkini dulu.

### Step 4: Update Learned Index

- [ ] Read `main/learned-index.md`
- [ ] Update timestamp: `*Last updated: [today's date]*`
- [ ] Tambah ringkasan baru (max 1 baris per lesson) di bawah section berkaitan:
  - Facts: `- [YYYY-MM-DD] [one-line fact]`
  - Cases: `- [YYYY-MM-DD] [one-line lesson]`
  - Rules: `- R[NNN] [one-line rule]`
- [ ] Jika index dah > 80 baris → prune: buang entry paling lama atau confidence paling rendah sehingga < 80 baris

### Step 5: Mark Buffer Processed

- [ ] Dalam `main/signal-buffer.md`, tambah `[done]` prefix pada setiap baris yang sudah diproses:
  - `| 2026-07-13T10:32 | correction | ...` → `| [done] 2026-07-13T10:32 | correction | ...`

### Step 6: Report

Output:
```
Lessons extracted: [N] total
- Facts: [Y]
- Cases: [Z]  
- Rules: [W]

[List ringkas setiap lesson — satu baris each]
```

---

## Mandatory Rules

1. **Jangan fabricate** — extract dari signal sahaja, jangan reka context
2. **Atomic facts** — satu fact = satu statement, bukan paragraph
3. **Rule butuh case** — jangan tulis rule tanpa ada case yang support
4. **Prune index** — learned-index.md mesti kekal < 80 baris
5. **Mark done** — jangan proses signal yang sama dua kali
6. **Confidence honest** — low bila 1 instance, jangan inflat

---

## Level History
- **Lv.1** — Base: Buffer read → classify → extract fact/case/rule → update semantic store + index → mark done. (Origin: Self-Learning Loop design, 2026-07-13)
```

- [ ] **Step 2: Verify file wujud dan readable**

```bash
cat "C:/Users/BSM/.claude/skills/auto-learn/SKILL.md" | head -5
```
Expected: output 5 baris pertama skill file.

- [ ] **Step 3: Commit**

```bash
git add "C:/Users/BSM/.claude/skills/auto-learn/SKILL.md"
git commit -m "feat(self-learning): add auto-learn skill — batch lesson extraction"
```

---

## Task 3: Update CLAUDE.md — Micro-Capture Standing Rules

**Files:**
- Modify: `C:/Users/BSM/XDIBAX/DIBA/CLAUDE.md`

- [ ] **Step 1: Add command router entries**

Dalam section `## Command Router`, tambah 3 baris baru selepas baris "recall":

```markdown
| "extract lessons" / "process buffer" / "learn from today" | auto-learn |
| "what did we learn" / "update learned" | auto-learn |
| "eod" / "save diary" → chain selepas save | auto-learn (chained) |
```

- [ ] **Step 2: Add micro-capture standing rule**

Dalam section `## Standing Rules`, tambah selepas baris "Memory hygiene":

```markdown
- **Signal capture**: selepas setiap response, scan untuk signals — bila Abam koreksi, setuju (non-obvious), atau DIBA sendiri guna uncertain language / tool fail → append 1 baris ke `main/signal-buffer.md` format: `| [timestamp] | [type] | [raw signal] |`. Micro-capture sahaja — tiada heavy processing dalam response flow.
- **Self-learning chain**: bila "eod" atau "save diary" dipanggil → chain auto-learn selepas selesai save. Proses buffer dan extract lessons sekali gus.
```

- [ ] **Step 3: Verify changes**

Read CLAUDE.md dan confirm kedua-dua tambahan ada.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "feat(self-learning): update CLAUDE.md — micro-capture rules + auto-learn chain"
```

---

## Task 4: Update echo-recall — Add Priority 0

**Files:**
- Modify: `C:/Users/BSM/.claude/skills/echo-recall/SKILL.md`

- [ ] **Step 1: Locate Step 2 search table dalam SKILL.md**

Cari baris:
```
| Priority | Lokasi | Sebab |
```

- [ ] **Step 2: Insert Priority 0 row**

Tambah baris pertama dalam jadual (sebelum Priority 1):

```markdown
| 0 | `main/learned-index.md` | Extracted lessons — paling actionable, load dulu sebelum search lain |
```

Jadual selepas edit:
```markdown
| Priority | Lokasi | Sebab |
|----------|--------|-------|
| 0 | `main/learned-index.md` | Extracted lessons — paling actionable, load dulu sebelum search lain |
| 1 | `daily-diary/current/*.md` | Entry terkini — paling relevan |
| 2 | `daily-diary/archived/YYYY-MM/*.md` | Bulan-bulan lepas |
| 3 | `main/decisions.md` | Keputusan penting yang dilog |
| 4 | `main/current-session.md` | Recap sesi terkini |
| 5 | `projects/registry.md` → memory projek aktif | Bila workspace/projek dikenal pasti |
```

- [ ] **Step 3: Update Level History**

Append di bawah baris Level History terakhir dalam SKILL.md:

```markdown
- **Lv.5** — Self-Learning Integration: Priority 0 tambah — `main/learned-index.md` dibaca dulu sebelum diary search; lessons extracted oleh auto-learn skill terus accessible dalam setiap recall. (Origin: Self-Learning Loop, 2026-07-13)
```

- [ ] **Step 4: Verify edit**

```bash
grep -n "learned-index" "C:/Users/BSM/.claude/skills/echo-recall/SKILL.md"
```
Expected: output tunjuk baris yang mengandungi `learned-index`.

- [ ] **Step 5: Commit**

```bash
git add "C:/Users/BSM/.claude/skills/echo-recall/SKILL.md"
git commit -m "feat(self-learning): echo-recall Priority 0 — learned-index sebelum diary search"
```

---

## Task 5: Smoke Test — End-to-End Verification

Tiada automated tests untuk skill files — verify manually dengan simulate satu full loop.

- [ ] **Step 1: Append test signal ke buffer**

Edit `main/signal-buffer.md` — tambah satu baris test:

```
| 2026-07-13T00:00 | correction | TEST — Abam: "guna webhook bukan polling untuk realtime" |
```

- [ ] **Step 2: Trigger auto-learn manual**

Type dalam Claude Code session: `"extract lessons"`

Expected output:
```
Processing signal buffer...
Lessons extracted: 1 total
- Facts: 1
- Cases: 0
- Rules: 0
[Ringkasan: webhook > polling untuk realtime]
```

- [ ] **Step 3: Verify semantic store updated**

```bash
cat "C:/Users/BSM/XDIBAX/DIBA/library/learned/facts.md"
```
Expected: ada entry untuk webhook/polling fact.

- [ ] **Step 4: Verify learned-index updated**

```bash
cat "C:/Users/BSM/XDIBAX/DIBA/main/learned-index.md"
```
Expected: ada baris dalam `## Facts` section.

- [ ] **Step 5: Verify buffer marked done**

```bash
grep "done" "C:/Users/BSM/XDIBAX/DIBA/main/signal-buffer.md"
```
Expected: test entry ada prefix `[done]`.

- [ ] **Step 6: Verify echo-recall reads learned-index**

Type dalam session: `"do you remember webhook"`

Expected: DIBA surface learned fact dari learned-index (Priority 0) sebelum check diary.

- [ ] **Step 7: Final commit**

```bash
git add main/signal-buffer.md main/learned-index.md library/learned/facts.md
git commit -m "test(self-learning): smoke test verified — full loop functional"
```

---

## Self-Review Check

| Spec requirement | Task yang cover |
|-----------------|-----------------|
| Two signals: corrections + approvals | Task 3 (CLAUDE.md micro-capture rules) |
| Agent self-detect: uncertain language | Task 3 (standing rule — scan response) |
| Agent self-detect: tool failure | Task 3 (standing rule — scan response) |
| signal-buffer.md (micro-capture) | Task 1 (create) + Task 3 (rules) |
| library/learned/ semantic store | Task 1 (create) + Task 2 (auto-learn protocol) |
| main/learned-index.md (max 80 lines) | Task 1 (create) + Task 2 (prune rule) |
| auto-learn skill | Task 2 |
| fact/case/rule classification | Task 2 (Classification Logic) |
| confidence tracking | Task 2 (Rule confidence rule) |
| CLAUDE.md command router | Task 3 |
| eod chain | Task 3 |
| echo-recall Priority 0 | Task 4 |
| Lv.5 level history | Task 4 |
| End-to-end verification | Task 5 |

Semua requirement covered. Tiada placeholder. Types consistent — `signal-buffer.md`, `learned-index.md`, `facts.md`, `cases.md`, `rules.md` guna nama yang sama merentasi semua tasks.
