---
name: continuous-improvement
description: "Install structured self-improvement loops with instinct-based learning into
             Claude Code — reflect on current session, analyze observations for patterns,
             and show instinct status. Trigger after significant work with 'continuous-improvement'."
---

# Continuous Improvement — Self-Learning Loop DIBA
*Reflect. Analyze. Evolve.*

## Activation

When this skill activates, output:
"Continuous Improvement aktif. Reflect → Analyze → Evolve."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "continuous-improvement"** | ACTIVE — full 3-step loop |
| **Selepas menyelesaikan kerja yang signifikan** | ACTIVE — trigger manual |
| **Instinct packs baru dijumpai** | ACTIVE — load dan analyze |
| **Sesi biasa tanpa trigger** | DORMANT — jangan run auto |
| **Pertengahan debug atau fix aktif** | DORMANT — selesaikan kerja dahulu |
| **Abam kata "skip improvement"** | EXIT — skip loop untuk sesi ini |

---

## Protocol

### Step 1: Reflect

- [ ] Generate session reflection berdasarkan sesi semasa:

```markdown
## Reflection — [Tarikh]
- What worked:
- What failed:
- What I'd do differently:
- Rule to add:
```

- [ ] Jika ada "Rule to add" yang meaningful:
  - Buat instinct YAML file dengan **confidence 0.6** sebagai permulaan
  - Simpan dalam `~/.claude/instincts/<hash>/`
  - Log sebagai NEW dalam Step 3 output
- [ ] Jika tiada sesuatu yang ketara dalam sesi ini → nyatakan "Tiada rule baru sesi ini"
- [ ] Reflection mesti jujur — bukan hanya positif

---

### Step 2: Analyze Observations

- [ ] Detect project hash:
  ```bash
  git rev-parse --show-toplevel
  ```
  SHA-256 pertama 12 chars dari root path = project hash

- [ ] Semak `~/.claude/instincts/<hash>/observations.jsonl`

**Jika 20+ baris wujud:**

- [ ] Baca 500 baris terakhir
- [ ] Baca instinct `*.yaml` sedia ada (project + global)
- [ ] Detect pattern:
  - Koreksi pengguna → instinct `"jangan buat X"`
  - Sequence error→fix → instinct `"bila X gagal, cuba Y"`
  - Workflow berulang (3+ kali) → instinct `"untuk X, buat A→B→C"`
  - Tool preferences → instinct `"guna tool Y untuk task X"`
- [ ] Buat/kemaskini instinct YAML files
- [ ] Konservatif: hanya buat instinct untuk 3+ observations pattern yang sama

**Bootstrap Rule (jika observations banyak tapi tiada instinct):**

- [ ] Bootstrap starter set konservatif:
  - `orchestrate-objective-owner-action`
  - `preserve-session-context`
  - `triage-highest-value-first`
  - `close-follow-ups-explicitly`
  - `log-non-obvious-decisions`
  - `verify-before-reporting`
  - `prefer-batched-tooling`
  - `record-bottleneck-and-next-step`
- [ ] Confidence bootstrap: julat `0.62–0.69` — semua dalam kategori **suggest**
- [ ] Jangan buat instinct global untuk bootstrap ini
- [ ] Jika `instinct-packs/` wujud → anggap `orchestration-core`, `execution-discipline`, `memory-ops` sebagai pack baseline

**Jika kurang dari 20 observations:**

- [ ] Skip analysis, nyatakan count semasa
- [ ] Ingatkan: system masih dalam CAPTURE level

---

### Step 3: Show Status

- [ ] Render output penuh:

```
=== continuous-improvement ===

## Level: [CAPTURE | ANALYZE | SUGGEST | AUTO-APPLY]

## Session Reflection
- What worked: [dari sesi ini]
- What failed: [dari sesi ini]
- What I'd do differently: [dari sesi ini]
- Rule to add: [captured sebagai instinct]

## Learning
  NEW  [instinct-id]   [domain]  [confidence]  (dari reflection)
   ↑   [instinct-id]   [domain]  [lama]→[baru]  (+N observations)

## Instincts — [project-name] ([hash])
  ● [0.85] instinct-id   domain   auto-apply
  ◐ [0.60] instinct-id   domain   suggest
  ○ [0.35] instinct-id   domain   silent

## Instincts — global
  ● [0.90] instinct-id   domain   auto-apply

## Next
- Teruskan kerja — hooks capture secara automatik
- System auto-level bila instincts gain confidence
```

- [ ] Jika tiada instinct atau observations belum cukup → terangkan bahawa ini adalah normal, system dalam CAPTURE level dan akan create instincts selepas 20+ observations

---

### Step 4: Instinct File Write

Bila instinct baru perlu dibuat:

- [ ] Guna format YAML standard:

```yaml
id: [instinct-id]
domain: [domain]
description: [apa yang instinct ini buat]
confidence: 0.60
observations: 3
rule: [the rule]
created: [tarikh]
updated: [tarikh]
```

- [ ] Simpan ke `~/.claude/instincts/<hash>/[instinct-id].yaml`
- [ ] Jangan overwrite instinct sedia ada dengan confidence lebih rendah
- [ ] Jika instinct sedia ada → update confidence dan observations count sahaja

---

## Confidence Levels & Thresholds

| Level | Threshold | Behavior |
|-------|-----------|----------|
| CAPTURE | < 20 observations | Collect data, tiada instinct lagi |
| ANALYZE | 20+ observations | Pattern dikesan, instincts dibuat |
| SUGGEST | Confidence ≥ 0.50 | AI suggest sebelum bertindak |
| AUTO-APPLY | Confidence ≥ 0.70 | AI apply secara automatik |

---

## Mandatory Rules

1. **Reflection mestilah jujur** — catat apa yang benar-benar berlaku, bukan apa yang kelihatan baik
2. **Minimum 3 observations** sebelum buat instinct baru dari pattern analysis
3. **Bootstrap confidence** mesti bermula dalam julat `0.62–0.69` — tidak lebih tinggi
4. **Jangan buat instinct global** secara default untuk bootstrap
5. **YAML schema ketat** — hanya guna field: id, domain, description, confidence, observations, rule, created, updated
6. **Preserve sedia ada** — jika instinct wujud, kemaskini jangan overwrite
7. **Output Step 3 wajib** — jangan skip status display walaupun tiada perubahan
8. **Pack families dahulu** — jika `instinct-packs/` wujud, paparkan orchestration-core, execution-discipline, memory-ops dulu

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Tiada git repo dalam working directory | Tanya Abam untuk path manual; skip hash detection |
| observations.jsonl tidak wujud | Nyatakan CAPTURE level — system belum ada data |
| Instinct dengan ID sama sudah wujud | Update confidence dan observations count; jangan duplicate |
| Pattern lemah (2 observations sahaja) | Catat dalam reflection tapi jangan buat instinct lagi |
| Instinct confidence > 0.85 tapi masih sering gagal | Flag sebagai "needs review" — suggest turunkan confidence |
| Bootstrap diperlukan tapi observations terlalu sedikit | Delay bootstrap — tunggu 20+ observations dahulu |
| Instinct pack ada tapi belum di-load | Papar dalam output sebagai available; suggest load |
| Global instinct bertentangan dengan project instinct | Prioritize project instinct; flag conflict kepada Abam |
| Reflection mengandungi sensitive data | Redact sebelum simpan dalam YAML |
| Sesi terlalu pendek untuk meaningful reflection | Nyatakan — skip reflection, terus ke observations count |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `dashboard` | Selepas continuous-improvement selesai | Trigger dashboard untuk visualize status terkini |
| `discipline` | Bila reflection menunjukkan law violation | Rujuk 7 Laws — mana yang paling kerap dilanggar? |
| `forge-skill` | Bila pattern menunjukkan skill baru perlu dibuat | Delegate ke forge untuk build skill dari pattern |
| `log-decision` | Bila instinct baru dengan confidence tinggi dibuat | Log sebagai keputusan operasi penting |
| `save-diary` | Selepas sesi dengan significant learning | Simpan reflection ke diary hari ini |
| `session-briefing` | Awal sesi berikutnya | Surface instincts aktif dan level semasa |

---

## Level History

- **Lv.1** — Base: 3-step loop (reflect, analyze observations, show status), instinct creation dari 3+ patterns, confidence levels (CAPTURE→ANALYZE→SUGGEST→AUTO-APPLY), instinct YAML format. (Origin: Self-improvement system DIBA, xdaxzurairi)
- **Lv.2** — Superultra: Step 4 Instinct File Write ditambah, Context Guard dikemaskini, edge cases 10 rows, integrasi skill 6 entries, Mandatory Rules 8 items, Bootstrap Rule dikembangkan dengan guardrails, confidence threshold table distandard, activation message distandard. (2026-05-19)
