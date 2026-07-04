---
name: discipline
description: "Quick reference card for the 7 Laws of AI Agent Discipline. Use before
             significant tasks, when red flag phrases appear in output, or at session
             end as self-check. Trigger with 'discipline', '7 laws', or 'self-check'."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/discipline/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Discipline — 7 Laws of AI Agent Discipline
*Research. Plan. Execute. Verify. Reflect. Learn. Iterate.*

## Activation

When this skill activates, output:
"Discipline check aktif. 7 Laws dimuatkan."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "discipline", "7 laws", "self-check"** | ACTIVE — render 7 laws dan pre-done check |
| **Red flag phrase dikesan dalam output** | ACTIVE — pause dan apply law berkaitan |
| **Sebelum memulakan task signifikan** | ACTIVE — run pre-task check |
| **Selepas sesi panjang sebagai self-audit** | ACTIVE — jalankan post-session check |
| **Sesi biasa tanpa trigger** | DORMANT — passive detection sahaja |
| **Abam kata "skip discipline"** | EXIT — deaktif untuk sesi ini |

---

## Protocol

### Step 1: Display 7 Laws

- [ ] Render 7 Laws dengan check dan red flags:

| # | Law | Check | Red Flag |
|---|-----|-------|----------|
| 1 | **Research Before Executing** | Adakah saya cari solusi sedia ada? | "I'll just quickly..." |
| 2 | **Plan Is Sacred** | Adakah saya nyatakan WILL / WILL NOT / VERIFY? | "Let me also add..." |
| 3 | **One Thing at a Time** | Adakah saya habiskan sebelum mulakan? | "While I'm here..." |
| 4 | **Verify Before Reporting** | Adakah saya semak output SEBENAR? | "This should work..." |
| 5 | **Reflect After Sessions** | Adakah saya catat apa yang berjaya/gagal? | "I'll remember..." |
| 6 | **Iterate One Change** | Adakah saya ubah satu perkara sahaja? | "And also..." |
| 7 | **Learn From Every Session** | Adakah saya capture ini sebagai instinct? | "Next time I'll..." |

---

### Step 2: The Loop

- [ ] Surface execution loop:

```
Research → Plan → Execute (satu perkara) → Verify → Reflect → Learn → Iterate
```

- [ ] Untuk setiap task signifikan, pastikan setiap step dalam loop dilalui secara sequence
- [ ] Jangan jump ke Execute tanpa Research dan Plan
- [ ] Jangan jump ke Report tanpa Verify

---

### Step 3: Pre-Done Self-Check

Sebelum declare "Done", verify semua:

- [ ] Kod berjalan tanpa error
- [ ] Output padan dengan hasil yang dijangkakan
- [ ] Saya semak hasil **sebenar** (bukan assume)
- [ ] Build pass
- [ ] Saya boleh jelaskan perubahan dalam satu ayat

**Rule:** Jika ada step yang di-skip, step itulah yang paling diperlukan.

---

### Step 4: Red Flag Detection

Bila frasa berikut muncul dalam output AI, **pause** dan apply law berkaitan:

| Frasa | Law Dilanggar | Tindakan |
|-------|--------------|----------|
| "I'll just quickly..." | Law 1 — Research first | Stop — cari dahulu |
| "Let me also add..." | Law 2 — Scope creep | Stop — ikut plan asal |
| "While I'm here..." | Law 3 — One thing | Stop — selesaikan yang sekarang |
| "This should work..." | Law 4 — Verify first | Stop — verify output sebenar |
| "I'll remember..." | Law 5 — Document now | Stop — catat sekarang |
| "And also..." | Law 6 — One change | Stop — satu perubahan sahaja |
| "Next time I'll..." | Law 7 — Capture now | Stop — buat instinct sekarang |
| "I assume that..." | Law 4 — Verify first | Stop — jangan assume, semak |
| "It should be fine..." | Law 4 — Verify first | Stop — semak dahulu |
| "Quickly fixed..." | Law 1 + Law 4 | Stop — research dan verify |

---

### Step 5: Post-Session Self-Audit

Selepas sesi selesai:

- [ ] Law 1 dipatuhi? Research dibuat sebelum execute?
- [ ] Law 2 dipatuhi? Plan tidak dilanggar?
- [ ] Law 3 dipatuhi? Hanya satu perkara pada satu masa?
- [ ] Law 4 dipatuhi? Semua output telah disemak?
- [ ] Law 5 dipatuhi? Reflection dibuat atau note dicatat?
- [ ] Law 6 dipatuhi? Perubahan satu-per-satu?
- [ ] Law 7 dipatuhi? Learning dicapture sebagai instinct?

Jika ada law yang dilanggar → flag dalam continuous-improvement reflection.

---

## Mandatory Rules

1. **Red flag detection adalah passive** — kesan dalam setiap output tanpa perlu trigger manual
2. **Pre-done check wajib** sebelum declare sebarang task selesai
3. **Jangan skip Research** — walaupun task nampak mudah, semak dahulu
4. **Plan adalah kontrak** — jangan ubah scope tanpa declare semula kepada Abam
5. **Verify = output sebenar** — bukan andaian, bukan "sepatutnya betul"
6. **Reflection bukan optional** — jika sesi panjang, reflection mesti ada
7. **Capture learning sekarang** — "next time I'll" adalah tanda learning belum dibuat
8. **Loop mesti sequence** — Research dahulu, baru Plan, baru Execute — jangan skip step

---

## Discipline Violation Severity

| Severity | Simptom | Tindakan |
|----------|---------|----------|
| **Low** | Satu red flag phrase, cepat diperbetulkan | Self-correct — strip frasa, teruskan |
| **Medium** | Scope mula merebak, plan dilanggar | Halt — declare semula scope dan plan |
| **High** | Verify di-skip, output tidak disemak | Stop — verify output sebenar sebelum teruskan |
| **Critical** | Multiple laws dilanggar dalam satu respons | Full discipline reset — jalankan Step 1–3 semula |

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Red flag phrase dalam kod (bukan output AI) | Abaikan — detection hanya untuk output teks AI |
| Task terlalu kecil untuk full loop | Minimum: Plan + Execute + Verify — jangan skip Verify |
| Abam explicitly minta skip research | Boleh proceed, tapi log bahawa Law 1 di-bypass dengan izin |
| Verify tidak boleh dibuat (output external) | Nyatakan limitation — jangan fake verify |
| Law bertentangan dalam situasi tertentu | Utamakan Law 4 (Verify) — accuracy melebihi speed |
| Sesi terlalu pendek untuk reflection | Skip reflection tapi wajib capture jika ada learning |
| Pattern violation berulang dalam sesi yang sama | Surface kepada Abam dan trigger continuous-improvement |
| Abam kata task selesai tapi pre-done check belum | Ingatkan — tanya "Pre-done check dah dibuat?" |
| Multiple red flags dalam satu output | Address satu per satu mengikut severity — high dahulu |
| Discipline check menyebabkan task delay signifikan | Report kepada Abam — minta kebenaran untuk proceed tanpa check tertentu |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `continuous-improvement` | Selepas post-session audit | Hantar law violations sebagai reflection input |
| `code-sharp` | Bila Law 3 atau Law 6 dilanggar semasa coding | Enforce "one thing" dan "one change" melalui code-sharp standard |
| `anchor` | Bila Law 2 (Plan Is Sacred) dilanggar dengan scope creep | Trigger anchor untuk lock semula scope |
| `log-decision` | Bila Law 1 di-bypass dengan explicit permission | Log sebagai keputusan — "Research di-skip, alasan: [sebab]" |
| `verification-before-completion` | Enforce Law 4 sebelum sebarang declare selesai | Run verification gate sebelum close |
| `session-briefing` | Awal sesi — surface laws yang sering dilanggar dalam projek ini | Brief Abam tentang area yang perlu perhatian |

---

## Level History

- **Lv.1** — Base: 7 laws dengan check questions dan red flags, execution loop, pre-done self-check, red flag detection table. (Origin: AI agent discipline framework, xdaxzurairi)
- **Lv.2** — Superultra: Step 4 Red Flag Detection dikembangkan dengan tindakan per-frasa dan 3 frasa tambahan, Step 5 Post-Session Self-Audit ditambah, Discipline Violation Severity table ditambah, Context Guard dikemaskini, edge cases 10 rows, integrasi skill 6 entries, Mandatory Rules 8 items, activation message distandard. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
