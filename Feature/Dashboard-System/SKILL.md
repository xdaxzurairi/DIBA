---
name: dashboard
description: "Visual dashboard showing instinct health, observation stats, and learning
             progress for the current project. Run after continuous-improvement or at
             session start to check system status. Trigger with 'dashboard', 'instinct
             dashboard', or 'learning status'."
---

# Dashboard — Visual Instinct Health Panel
*Render. Assess. Act.*

## Activation

When this skill activates, output:
"Dashboard dirender. Semak instinct health."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "dashboard", "instinct dashboard", "learning status"** | ACTIVE — render penuh |
| **Selepas /continuous-improvement selesai** | ACTIVE — render update terkini |
| **Awal sesi — semak instinct status** | ACTIVE — render snapshot |
| **Bootstrap instinct baru wujud** | ACTIVE — papar top IDs secara eksplisit |
| **Sesi biasa tanpa trigger** | DORMANT — jangan auto-render |
| **Abam kata "skip dashboard"** | EXIT — skip render untuk sesi ini |

---

## Protocol

### Step 1: Find Project Hash

- [ ] Jalankan:
  ```bash
  git rev-parse --show-toplevel
  ```
- [ ] SHA-256 pertama 12 chars dari root path = project hash
- [ ] Jika bukan git repo → tanya Abam untuk project identifier manual

---

### Step 2: Read Observations

- [ ] Baca `~/.claude/instincts/<hash>/observations.jsonl`
- [ ] Extract:
  - Total observation count
  - Unprocessed count (observations sejak analysis terakhir)
  - Tarikh observation paling terkini
- [ ] Jika fail tidak wujud → catat "0 observations" — system dalam CAPTURE level

---

### Step 3: Read Instincts

- [ ] Load semua `*.yaml` dari:
  - `~/.claude/instincts/<hash>/` — project instincts
  - `~/.claude/instincts/global/` — global instincts
- [ ] Untuk setiap instinct extract: id, domain, confidence, last updated
- [ ] Kategorikan:
  - Auto-apply: confidence ≥ 0.70
  - Suggest: confidence 0.50–0.69
  - Silent: confidence < 0.50
- [ ] Flag instincts yang stale (30+ hari tiada update)
- [ ] Flag instincts yang decaying (confidence turun dalam masa 2 run terakhir)

---

### Step 4: Check Instinct Packs

- [ ] Semak `instinct-packs/` dalam project root
- [ ] Detect pack families yang available:
  - `orchestration-core`
  - `execution-discipline`
  - `memory-ops`
  - Pack lain yang ada
- [ ] Bezakan pack yang sudah loaded vs belum loaded
- [ ] Jika bootstrap instincts wujud → senaraikan top IDs secara eksplisit dalam dashboard

**Bootstrap Defaults:**

Jika project ada observations tinggi tapi instinct layer kosong, anggap baseline ini sebagai valid:

| Domain | Default Instinct |
|--------|-----------------|
| Orchestration | `orchestrate-objective-owner-action` |
| Context | `preserve-session-context` |
| Prioritization | `triage-highest-value-first` |
| Follow-up | `close-follow-ups-explicitly` |
| Decision | `log-non-obvious-decisions` |
| Verification | `verify-before-reporting` |
| Tooling | `prefer-batched-tooling` |
| Bottleneck | `record-bottleneck-and-next-step` |

Confidence bootstrap: julat `0.62–0.69` — signal **suggest**, bukan auto-apply.

---

### Step 5: Render Dashboard

- [ ] Render ASCII dashboard:

```
╔══════════════════════════════════════════════════════════════╗
║              continuous-improvement Dashboard                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Project: <name>              Level: <CAPTURE|ANALYZE|...>   ║
║  Sessions: ~<obs/10>          Mode: <beginner|expert>        ║
║                                                              ║
║  ┌─ Observations ────────────────────────────────────────┐   ║
║  │  Total: <n>    Unprocessed: <n>    Last: <date>       │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Instincts ───────────────────────────────────────────┐   ║
║  │  Total: <n>                                           │   ║
║  │  ████████░░ Auto-apply (0.7+): <n>                    │   ║
║  │  █████░░░░░ Suggest (0.5-0.69): <n>                   │   ║
║  │  ██░░░░░░░░ Silent (< 0.5): <n>                       │   ║
║  │  Global: <n>    Project: <n>                          │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Top Instincts ───────────────────────────────────────┐   ║
║  │  <senarai top 5 instincts by confidence with bars>    │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ┌─ Health ──────────────────────────────────────────────┐   ║
║  │  Stale (30+ days): <n>    Decaying: <n>               │   ║
║  │  Recently reinforced: <n>                             │   ║
║  └───────────────────────────────────────────────────────┘   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

- [ ] Bars untuk Top Instincts:
  ```
  ████████░░ [0.82] instinct-id   domain
  ██████░░░░ [0.65] instinct-id   domain
  ```
- [ ] Mode: `beginner` jika < 50 observations, `expert` jika ≥ 50

---

### Step 6: Post-Render Actions

Selepas render, jalankan health checks:

- [ ] Jika stale instincts > 0 → suggest review: "Ada [n] instinct yang tidak dikemaskini 30+ hari. Nak review?"
- [ ] Jika unprocessed observations > 20 → suggest: "Ada [n] observations belum diproses. Nak run /continuous-improvement?"
- [ ] Jika tiada instinct → terangkan auto-leveling timeline: "20+ observations diperlukan untuk mula buat instincts"
- [ ] Jika bootstrap instincts wujud → senaraikan top IDs secara eksplisit:
  ```
  Bootstrap aktif: orchestrate-objective-owner-action [0.65], verify-before-reporting [0.64], ...
  ```
- [ ] Jika instinct packs available tapi belum loaded → senaraikan: "Pack belum diload: [pack-name]"
- [ ] Jika ada decaying instincts → flag: "Instinct [id] confidence menurun — perlu reinforcement"

---

## Level Thresholds

| Level | Syarat |
|-------|--------|
| CAPTURE | < 20 observations |
| ANALYZE | 20+ observations, instincts sedang dibuat |
| SUGGEST | Mana-mana instinct confidence ≥ 0.50 |
| AUTO-APPLY | Mana-mana instinct confidence ≥ 0.70 |

---

## Mandatory Rules

1. **Render penuh wajib** — jangan skip mana-mana section dashboard
2. **Bootstrap IDs mesti visible** — jika bootstrap wujud, papar dalam dashboard, bukan disembunyikan
3. **Health flag wajib** — stale, decaying, dan reinforced mesti dilaporkan walaupun 0
4. **Pack comparison wajib** — loaded vs available mesti dibezakan
5. **Post-render actions** — semua 6 health checks mesti dijalankan selepas render
6. **Mode display** — beginner/expert berdasarkan observation count, bukan assumption
7. **Confidence bars tepat** — bar visual mesti padan dengan nilai confidence sebenar
8. **Jangan assume data** — jika fail tidak wujud, nyatakan "tidak wujud" bukan render kosong palsu

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Tiada git repo | Tanya Abam untuk project identifier manual; teruskan dengan hash manual |
| observations.jsonl tidak wujud | Render dengan CAPTURE level, 0 observations |
| Tiada instinct YAML langsung | Render empty instinct section; suggest run /continuous-improvement |
| Global instinct folder tidak wujud | Render "Global: 0" — bukan error |
| instinct-packs/ tidak wujud | Skip pack section dalam post-render |
| Bootstrap diperlukan tapi observations terlalu sedikit | Papar nota: "Bootstrap disyorkan selepas 20+ observations" |
| Semua instinct dalam satu confidence tier | Render dengan tier lain sebagai "0" — jangan skip |
| Instinct confidence = tepat 0.70 | Masuk auto-apply tier |
| Dashboard dipanggil berulang dalam satu sesi | Re-render dengan data terkini — tiada caching |
| Project hash collision antara dua project | Flag kepada Abam — minta manual disambiguate |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `continuous-improvement` | Selepas /continuous-improvement selesai | Dashboard render data yang CI hasilkan |
| `discipline` | Bila health signal menunjukkan pattern violation | Map instinct yang stale kepada law mana yang paling relevan |
| `session-briefing` | Awal sesi | Surface level semasa dan instinct count sebagai briefing context |
| `log-decision` | Bila dashboard reveal decision penting (pack load, review instinct) | Log keputusan tersebut |
| `anchor` | Bila post-render actions terlalu banyak dan overwhelming | Anchor kepada satu action yang paling penting dahulu |
| `forge-skill` | Bila dashboard tunjuk pattern yang cukup untuk skill baru | Suggest forge untuk convert pattern kepada skill |

---

## Level History

- **Lv.1** — Base: project hash detection, observations count, instinct confidence breakdown dengan ASCII bars, health flags (stale/decaying/reinforced), post-render action suggestions. (Origin: Continuous Improvement visual layer, xdaxzurairi)
- **Lv.2** — Superultra: Step 4 Check Instinct Packs dikembangkan dengan pack families dan bootstrap defaults table, Step 6 Post-Render Actions dikembangkan dengan 6 checks, Context Guard ditambah, edge cases 10 rows, integrasi skill 6 entries, Mandatory Rules 8 items, confidence bar format distandard, activation message distandard. (2026-05-19)
