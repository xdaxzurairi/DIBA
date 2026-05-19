---
name: orchestrate
description: "Gunakan bila tugasan memerlukan koordinasi multi-langkah, pecahan kerja,
             routing, parallelization, atau synthesis merentas banyak fail dan domain.
             Trigger: 'audit', 'buat plan', 'pecahkan task', 'orchestrate', 'analisis
             lengkap', 'compare [A] dan [B]', atau mana-mana task dengan 3+ langkah
             tersembunyi."
---

# Orchestration System — DIBA Operator Layer
*Decompose. Route. Delegate. Synthesize. Verify. Close.*

## Activation

When this skill activates, output:
"Orchestration aktif. Decomposing task."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Task ada 3+ langkah atau 3+ komponen** | ACTIVE — full 8-step loop |
| **Abam kata "audit", "buat plan", "orchestrate"** | ACTIVE — trigger segera |
| **Task melibatkan multi-file, multi-domain** | ACTIVE — classify dan route |
| **Abam kata "compare [A] dan [B]"** | ACTIVE — parallelization + synthesis |
| **Abam kata "research + summarize + cadangkan"** | ACTIVE — Prompt Chaining |
| **Task jelas dan single-pass** | DORMANT — jawab terus tanpa orchestrate |
| **Abam kata "single pass"** | EXIT — suppress orchestration, respond direct |

---

## Protocol

### Step 1: Define the Mission

- [ ] Kenal pasti **outcome akhir** yang Abam mahu
- [ ] Tentukan **in-scope vs out-of-scope** dengan jelas
- [ ] Kenal pasti **constraints** — masa, fail, sistem, akses, format output
- [ ] Tentukan **done signal** — apa yang membuktikan task selesai
- [ ] Jika mission tidak jelas → tanya clarification satu soalan sahaja, bukan senarai

---

### Step 2: Classify the Task

Pilih pattern yang paling sesuai:

| Pattern | Bila Guna |
|---------|-----------|
| **Prompt Chaining** | Langkah tetap dan sequential — output satu jadi input seterusnya |
| **Routing** | Input perlu kategori berbeza untuk rawatan berbeza |
| **Parallelization** | Subtasks bebas — boleh jalan serentak atau perlu banyak perspektif |
| **Orchestrator-Workers** | Subtasks tidak diketahui awal — perlu decompose secara dinamik |
| **Evaluator-Optimizer** | Ada quality criteria jelas — output boleh dibaiki iteratif |
| **Combined** | Mana-mana gabungan di atas |

- [ ] Declare pattern yang dipilih dan sebabnya (satu ayat)

---

### Step 3: Build a Minimal Plan

- [ ] Bina checklist pendek yang boleh diverifikasi
- [ ] Setiap item mesti **action-oriented** — bukan deskriptif
- [ ] Setiap item mesti **spesifik** — boleh confirm completion
- [ ] Hanya **satu item "in-progress"** pada satu masa
- [ ] Jika ada dependency antara item, note order

---

### Step 4: Gather Grounded Context

- [ ] Kumpul **hanya apa yang perlu** untuk keputusan seterusnya
- [ ] Sumber: fail workspace, logs/errors, dokumentasi, memory/diary, web jika perlu
- [ ] Setiap read mesti support **keputusan spesifik** — jangan explore tanpa tujuan
- [ ] Jika context sudah cukup untuk proceed → stop reading, mula execute

---

### Step 5: Delegate Smartly

**Delegate bila:**
- Banyak kawasan bebas yang perlu dianalisis serentak
- Context window akan menjadi sesak
- Exploration menghasilkan noise tinggi untuk main thread
- Research domain-focused diperlukan untuk satu kawasan pada satu masa

**Jangan delegate bila:**
- Task kecil dan jelas
- Synthesis bergantung rapat pada shared context
- Overhead melebihi manfaat
- Keputusan perlu dibuat langkah demi langkah dalam urutan rapat

**Setiap delegation mesti ada:**
- [ ] Objective yang tajam
- [ ] Scope fail/domain yang jelas
- [ ] Tahap kedalaman: quick / medium / thorough
- [ ] Format output yang diminta
- [ ] Permission: read-only atau edit

---

### Step 6: Synthesize, Don't Dump

- [ ] Gabungkan hasil subtask menjadi **summary yang boleh difahami dan diambil tindakan**
- [ ] Buat **keputusan berasas** — bukan sekadar papar data mentah
- [ ] Sertakan **cadangan tindakan praktikal**
- [ ] Hasilkan **artifacts yang berguna serta-merta** — bukan draft kasar
- [ ] Label dengan jelas: mana fakta, mana andaian, mana cadangan

---

### Step 7: Verify

Sebelum declare selesai, semak:

- [ ] **Correctness** — disokong oleh evidence konkrit?
- [ ] **Coverage** — semua keperluan Abam ditangani?
- [ ] **Consistency** — sejajar dengan codebase atau dokumen sedia ada?
- [ ] **Risk** — ada side effect berbahaya atau andaian tidak disahkan?
- [ ] **Readability** — output boleh diguna terus oleh Abam?

Untuk task teknikal: semak errors, jalankan test/build jika perlu.
Untuk dokumentasi/research: struktur jelas, label jujur pada andaian.

---

### Step 8: Close Cleanly

- [ ] Kemaskini status task
- [ ] Rekod keputusan penting jika perlu (trigger `log-decision`)
- [ ] Maklum Abam apa yang telah selesai — ringkas
- [ ] Cadangkan **next step spesifik** — bukan generik

---

## Mini Templates

### Template A — Complex Audit

1. Tentukan domain audit
2. Baca struktur project
3. Route ke: architecture / data / security / UX / ops
4. Synthesize dapatan mengikut severity
5. Output recommendation high-priority dahulu

### Template B — Multi-file Engineering Task

1. Kenal pasti entry point
2. Cari dependencies dan call chain
3. Pecah kepada fasa: read / modify / verify
4. Buat editan minimum-impact
5. Validate dengan errors/tests
6. Hasilkan ringkasan fail yang berubah

### Template C — Research + Recommendation

1. Nyatakan soalan keputusan
2. Kumpul sumber relevan
3. Compare pilihan dalam jadual
4. Evaluate trade-off
5. Beri recommendation + rationale + risk

---

## Output Pattern

Bila skill ini aktif, output ikut struktur ini:

```
[Current direction — apa yang sedang dilakukan sekarang]

Progress: [apa yang baru selesai atau dijumpai]
Synthesis: [apa makna dapatan ini]
Action taken: [fail/artifact/perubahan yang dihasilkan]
Verified: [bagaimana hasil disahkan]
Next: [next useful move — hanya jika membantu]
```

---

## Mandatory Rules

1. **Start simple** — cuba single pass dahulu; tambah orchestration hanya bila ia tingkatkan ketepatan, liputan, atau kelajuan
2. **Decompose sebelum act** — kenal pasti outcome, constraints, dependencies, dan verification signals sebelum mula
3. **Ground every important claim** — anchor kepada fail, logs, tool output, tests, atau sumber autoriti
4. **Verify dalam loops** — selepas setiap fasa utama, semak output, side effects, dan blockers
5. **Buat orchestration visible** — beri update ringkas selepas langkah kunci; nyatakan apa yang sedang dilakukan dan apa seterusnya
6. **Jangan claim done** tanpa verification signal yang munasabah
7. **Jangan overuse tools** atau subagents tanpa sebab jelas
8. **Jangan fabricate** — jangan buat-buat source findings, historical decisions, atau external facts
9. **Untuk tindakan destructive** — minta kelulusan eksplisit atau tetapkan boundary yang jelas

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Task kelihatan kompleks tapi sebenarnya single-pass | Jawab terus — jangan over-orchestrate |
| Abam kata "single pass" | Suppress orchestration sepenuhnya |
| Mission tidak jelas selepas baca context | Tanya satu soalan clarification sahaja |
| Subtask delegate kembali dengan output yang tidak cukup | Re-delegate dengan brief yang lebih spesifik |
| Parallel subtasks ada dependency tersembunyi | Halt — map dependency dahulu sebelum delegate |
| Context window hampir penuh semasa orchestration | Trigger token-guard, save checkpoint |
| Synthesis menghasilkan contradiction antara subtasks | Surface contradiction kepada Abam — jangan pilih sendiri |
| Verification gagal selepas fix | Buka semula Step 7 — jangan declare done |
| Abam tukar scope di tengah orchestration | Re-anchor — declare scope baru sebelum teruskan |
| Delegation tidak return sebelum timeout | Report status kepada Abam, cadangkan proceed secara manual |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `log-decision` | Keputusan penting dibuat semasa orchestration | Auto-trigger untuk rekod |
| `work-plan` | Output orchestration ada plan yang boleh dilaksana | Cadang "copy plan" untuk execution |
| `token-guard` | Context window mula sesak semasa multi-step | Aktif compact mode + checkpoint |
| `anchor` | Scope mula merebak dari mission asal | Trigger anchor — lock scope semula |
| `save-diary` | Orchestration panjang selesai | Log dapatan dan keputusan ke diary |
| `code-sharp` | Orchestration melibatkan code generation/edit | Enforce standard code-sharp |

---

## Level History

- **Lv.1** — Base: 5 core principles (start simple, decompose, ground, verify loops, visible progress), 8-step orchestration loop, decision matrix dengan 5 patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer). (Origin: DIBA production orchestration framework)
- **Lv.2** — Delegation Rules: bila delegate vs tidak, 5-element delegation contract (objective, scope, thoroughness, output, permission). Verification contract: correctness, coverage, consistency, risk, readability. (Origin: Complex multi-file tasks, April 2026)
- **Lv.3** — Mini Templates + Guardrails: 3 ready-to-use templates (complex audit, multi-file engineering, research+recommendation), trigger-to-pattern table, anti-fabrication guardrails, standard 6-item output pattern. (Origin: Production audit patterns, April 2026)
- **Lv.4** — Superultra: Frontmatter ditambah, activation message, Context Guard table dengan EXIT row, Protocol restructured kepada full checklist steps, Mandatory Rules dikembangkan kepada 9 peraturan, Edge Cases table 10 baris, Integrasi Skill table 6 baris, output pattern diformat secara eksplisit. (2026-05-19)
