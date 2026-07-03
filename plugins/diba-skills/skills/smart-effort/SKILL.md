---
name: smart-effort
description: "Auto-classify prompt complexity and select appropriate model/effort tier silently before responding. Simple → haiku, Medium → sonnet, Hard → fast mode. Fires automatically on every prompt. Override with: 'guna haiku', 'guna sonnet', 'fast mode', 'full effort'."
argument-hint: "tier: simple | medium | hard | auto"
---

# Smart Effort — DIBA Auto Model Router
*Classify. Route. Execute. Senyap.*

## Activation

Always-on — silent classification before every response. No output unless escalating or overriding.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Every prompt (default)** | ACTIVE — classify silently, apply tier |
| **Abam kata "guna haiku"** | OVERRIDE → force Simple tier |
| **Abam kata "guna sonnet"** | OVERRIDE → force Medium tier |
| **Abam kata "fast mode" / "full effort"** | OVERRIDE → force Hard tier |
| **Task escalates mid-execution** | ESCALATE — notify 1 baris, upgrade tier |
| **Abam kata "smart-effort off"** | EXIT — deaktif, guna default model sahaja |

---

## Tier Classification

### Tier 1 — Simple → `haiku`

| Signal | Contoh |
|--------|--------|
| Soalan pendek / lookup | "apa itu X?", "mn file Y?" |
| 1 fail, perubahan kecil | typo fix, rename variable, tambah 1 baris |
| Konfirmasi / ya-tidak | "betul ke cara ni?", "ok ke?" |
| Baca & explain sahaja | "explain baris ni", "apa maksud error ni?" |
| Git status / log check | "git status", "commit apa last?" |

### Tier 2 — Medium → `sonnet`

| Signal | Contoh |
|--------|--------|
| 2–5 fail terlibat | refactor function, debug biasa |
| Analisis + cadangan | "review kod ni", "kenapa slow?" |
| Tulis feature kecil | tambah 1 component, 1 API route |
| Research + summarize | "cari pattern terbaik untuk X" |
| Plan ringkas | "macam mana nak buat X?" |

### Tier 3 — Hard → `sonnet --fast`

| Signal | Contoh |
|--------|--------|
| Multi-file / cross-system | refactor besar, migration, audit |
| Architecture / strategy | "design sistem untuk X", "roadmap" |
| Debug complex | race condition, memory leak, cascade failure |
| Orchestration panjang | 5+ langkah, subagents, parallel tasks |
| Security / compliance review | audit penuh, threat model |

---

## Classification Protocol

### Step 1: Scan Prompt (Silent)
- [ ] Kira fail yang terlibat (explicit atau implied)
- [ ] Detect keyword signals (audit, design, migrate, review, explain, fix, check)
- [ ] Estimate langkah diperlukan

### Step 2: Assign Tier
- [ ] Simple: 1 fail / 1 langkah / soalan sahaja
- [ ] Medium: 2–5 fail / 2–4 langkah / analisis diperlukan
- [ ] Hard: 5+ fail / 5+ langkah / architecture / orchestration

### Step 3: Apply (Silent)
- [ ] Apply model sesuai — tiada output kepada Abam
- [ ] Log tier dalam working memory (bukan output)

### Step 4: Monitor Mid-Task
- [ ] Jika scope berkembang melebihi tier semasa → escalate
- [ ] Notify: `[Smart Effort: task escalated → fast mode]` (1 baris sahaja)

---

## Override Commands

| Command | Tindakan |
|---------|----------|
| `"guna haiku"` | Force Simple — aktif serta-merta |
| `"guna sonnet"` | Force Medium — aktif serta-merta |
| `"fast mode"` / `"full effort"` | Force Hard — aktif serta-merta |
| `"smart-effort off"` | Deaktif — guna default model |
| `"effort status"` | Report tier semasa + sebab |

---

## Mandatory Rules

1. **Senyap by default** — tiada output kecuali escalation atau override
2. **Escalate bukan downgrade** — jika task jadi lebih complex, naik tier; jangan turun tanpa arahan
3. **Override adalah mutlak** — arahan Abam override classification automatik
4. **1 baris sahaja** untuk escalation notice — jangan interrupt flow
5. **Tier berdasarkan KESELURUHAN task** — bukan prompt pertama sahaja
6. **Token Guard integration** — jika token-guard aktif, prefer haiku/sonnet; eskalasi ke fast hanya bila perlu

---

## Integrasi Skill

| Skill | Interaksi |
|-------|-----------|
| `token-guard` | Jika compact mode aktif, prefer lower tier; eskalasi hanya bila task benar-benar hard |
| `orchestrate` | Orchestration auto-trigger = Hard tier |
| `session-briefing` | Briefing = Simple tier (baca fail sahaja) |
| `work-plan` | Plan execution = Medium/Hard bergantung skop |

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Prompt ambiguous | Default ke Medium — lebih selamat |
| Task ringkas tapi fail besar | Classify berdasarkan TASK, bukan saiz fail |
| Abam override tapi task jelas mismatch | Apply override, tambah 1 baris nota |
| Mid-task scope shrinks | Kekal tier semasa — jangan downgrade |
| Subagent tasks | Subagent inherit parent tier |

---

## Level History

- **Lv.1** — Base: 3-tier classification (Simple/Medium/Hard), silent auto-routing, override commands, escalation detection, token-guard integration. (Origin: Forge by Zuex, 2026-06-09)
