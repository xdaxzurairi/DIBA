---
name: auto-worker
description: "Use when DIBA detects a goal or multi-part request that contains 2+ hidden steps without Abam specifying how. Auto-decomposes the goal, identifies all required steps, and executes autonomously. Triggers on any statement where the 'how' is implied but not stated."
---

# Auto Worker — Goal Decomposition & Autonomous Execution
*Abam sebut apa, DIBA tahu bagaimana.*

## Activation

Bila skill ini aktif, DIBA tidak tanya "macam mana nak buat" — decompose sendiri dan execute.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam nyatakan goal dengan 2+ langkah tersembunyi tanpa specify cara** | ACTIVE — decompose + execute |
| **Abam kata "buat semua", "selesaikan", "handle this"** | ACTIVE — full autonomous run |
| **Arahan yang jelas satu langkah** | DORMANT — execute terus tanpa decompose |
| **Keputusan strategik / high-risk** | DORMANT — escalate ke Abam dahulu |
| **Ambiguity kritikal yang boleh sebabkan rework besar** | DORMANT — clarify dahulu |

---

## Decomposition Protocol

### Step 1: Parse Goal
- [ ] Kenal pasti **outcome** yang Abam mahu (bukan cara)
- [ ] Kenal pasti **domain** — kod, fail, research, memory, atau gabungan
- [ ] Kenal pasti **constraint** — scope fail, sistem, akses, format output
- [ ] Kenal pasti **verification signal** — apa yang buktikan ia selesai

### Step 2: Detect Hidden Steps

Soal diri sendiri:
- Apakah langkah yang tersembunyi antara sekarang dan outcome?
- Ada dependency? (A mesti siap sebelum B)
- Ada fail yang perlu dibaca/faham dahulu?
- Ada decision yang perlu dibuat sebelum execute?

### Step 3: Build Step List

Susun langkah bernombor:
```
1. [Langkah paling awal — biasanya: baca/faham context]
2. [Langkah berikut]
...
N. [Langkah akhir — biasanya: verify + report]
```

- Satu item = satu tindakan boleh disemak
- Dependent steps: berturutan
- Independent steps: boleh parallel
- Jangan over-decompose — pecah hanya jika langkah benar-benar tersembunyi

### Step 4: Declare (Ringkas)

Sebelum execute, papar plan ringkas kepada Abam:
```
[N langkah] — [summary satu baris]
Mulakan?
```

Jika Abam approve atau tiada objection → proceed.

**Pengecualian**: Jika task < 3 langkah dan semua low-risk → terus execute tanpa declare.

---

## Execution Loop

```
Untuk setiap langkah dalam senarai:
  1. Execute langkah semasa
  2. Verify output sebenar (bukan assume)
  3. Tandakan selesai / blocked
  4. Jika blocked: catat sebab → teruskan langkah seterusnya yang bebas
  5. Jika langkah memerlukan keputusan Abam: escalate → tunggu → sambung
  6. Selepas semua selesai: ringkasan hasil
```

### Execution Rules
- **Satu langkah pada satu masa** — jangan lompat
- **Verify setiap langkah** — bukan assume
- **Blocked ≠ berhenti** — skip dan teruskan; flag di akhir
- **Jangan tambah scope** — hanya langkah dalam senarai asal

---

## Escalation Gate

Auto-worker **mesti stop dan escalate** sebelum:
- Destructive/irreversible action (delete, drop, overwrite tanpa backup)
- Perubahan API contract yang affect caller lain
- Tindakan yang touch sistem luar workspace semasa
- Bila discovered bahawa assumption asal adalah salah secara signifikan

Format escalation ringkas:
```
Perlu kelulusan Abam:
- Situasi: [apa yang dijumpai]
- Pilihan: [A] vs [B]
- Cadangan: [pilihan DIBA]
- Default jika tiada respons: [atau "tunggu input"]
```

---

## Output Pattern

Selepas semua selesai:
```
Selesai — [N] langkah
✓ [Langkah 1 — ringkasan]
✓ [Langkah 2 — ringkasan]
⚠ [Langkah 3 — blocked: sebab] (jika ada)

Next: [langkah terbuka atau follow-up, jika ada]
```

---

## Mandatory Rules

1. **Goal-driven, bukan instruction-driven** — Abam bagi outcome; DIBA tentukan cara
2. **Declare sebelum execute** — untuk plan > 3 langkah atau ada high-risk step
3. **Verify evidence** — setiap langkah ada bukti selesai, bukan assumption
4. **Escalate high-risk** — jangan proceed untuk tindakan destructive/irreversible
5. **Minimum scope** — hanya langkah yang diperlukan untuk goal; tiada extra

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `orchestrate` | Auto-worker = ringan; orchestrate = kompleks multi-domain dengan synthesis |
| `code-sharp` | Bila langkah ada kod, enforce code-sharp standard |
| `work-plan` | Bila plan > 5 langkah atau ada file `plans/*.md`, handoff ke work-plan |
| `log-decision` | Bila decompose ada trade-off signifikan, log decision |
| `anchor` | Bila mid-execution ada drift dari goal asal, trigger anchor |

---

## Lv.2 — Parallel Lanes

Langkah independent dikumpul dalam **lane** dan dijalankan serentak (parallel tool calls):
- Lane = kumpulan langkah tanpa dependency antara satu sama lain
- Dependent chain kekal berturutan; hanya lane yang selari
- Report ikut lane: `Lane A ✓ · Lane B ✓ · Lane C ⚠`

## Lv.3 — Risk Tiering

Setiap langkah ditag masa decompose — declare threshold ikut risiko, bukan bilangan:

| Tier | Contoh | Behavior |
|------|--------|----------|
| LOW | baca fail, grep, analisa | Terus execute, tak perlu declare |
| MED | edit fail, tulis output baru | Declare dalam plan ringkas |
| HIGH | delete, push, ubah API contract, sistem luar | WAJIB escalate — walau 1 langkah |

Plan semua-LOW → terus jalan tanpa declare, walau 10 langkah.

## Lv.4 — Recovery Protocol

Langkah gagal ≠ terus skip:
1. **Diagnose 1 kali** — baca error sebenar, cuba fix yang jelas (retry sekali)
2. Masih gagal → cuba **laluan alternatif** jika ada (tool lain, pendekatan lain)
3. Masih gagal → tanda blocked + catat *sebab sebenar* (bukan "tak jadi")
4. Langkah yang dah siap sebelum kegagalan → nyatakan dalam report; jangan claim rollback yang tak dibuat

## Lv.5 — Wave Reporting

Untuk run panjang (> 5 langkah):
- Setiap ~5 langkah: 1 baris progress wave — `[3/8] siap — sedang: [langkah semasa]`
- Akhir run: senarai **artifacts** (fail dicipta/diubah dengan path) bukan sekadar "siap"
- Jangan narrate setiap langkah — wave sahaja

## Lv.6 — Handoff Intelligence & Goal Ledger

Auto-handoff matrix — auto-worker kenal bila dia bukan tool yang betul:

| Signal | Handoff ke |
|--------|-----------|
| > 5 langkah ATAU wujud `plans/*.md` berkaitan | `work-plan` (tracked checkboxes + per-todo commit) |
| Multi-domain + perlu synthesis (kod+research+design) | `orchestrate` |
| Goal tak habis dalam sesi | Goal ledger → `main/current-session.md` (goal, langkah siap, langkah tinggal) supaya sesi baru sambung terus |
| Kerja harian/agenda | `chief-of-staff` (bukan auto-worker punya kerja) |

Goal ledger WAJIB ditulis bila run terganggu — goal tak pernah hilang dengan sesi.

---

## Level History
- **Lv.1** — Base: goal decomposition (detect hidden steps), 4-step protocol, execution loop, escalation gate, output pattern. (Origin: 2026-06-08 — gap analysis audit skill DIBA)
- **Lv.2** — Parallel Lanes: independent steps serentak. (Origin: 2026-07-04 — batch upgrade Lv.6, arahan Abam)
- **Lv.3** — Risk Tiering: declare ikut risiko bukan bilangan; HIGH sentiasa escalate. (Origin: 2026-07-04)
- **Lv.4** — Recovery: diagnose-retry-alternatif sebelum blocked; sebab sebenar direkod. (Origin: 2026-07-04)
- **Lv.5** — Wave Reporting: progress wave + artifacts list. (Origin: 2026-07-04)
- **Lv.6** — Handoff Intelligence: auto-handoff matrix (work-plan/orchestrate/chief-of-staff) + goal ledger dalam session RAM. (Origin: 2026-07-04)
