---
name: break-reminder
description: "Friendly wellness reminder for users who have been working too long at
             PC. Use when user says 'penat', 'burnt out', 'letih', 'I have been
             working too long', 'remind me to take a break', 'ingatkan saya kalau
             lama sangat mengadap PC', 'saya dah lama kerja'. Also auto-nudges if
             user continues working after requesting reminders."
---

# Break Reminder — Wellness & Focus Reset
*Rehat bukan lemah. Rehat itu strategi.*

## Activation

When this skill activates, output:

"Jom rehat sekejap."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **User kata "penat", "burnt out", "letih"** | ACTIVE — full 5-step protocol |
| **"I have been working too long"** | ACTIVE — acknowledge + recommend |
| **"remind me to take a break"** | ACTIVE — activate auto-nudge mode |
| **"ingatkan saya kalau lama sangat mengadap PC"** | ACTIVE — activate auto-nudge mode |
| **"saya dah lama kerja"** | ACTIVE — session probe + recommend |
| **User dalam mid-task yang intense** | ACTIVE — gentle nudge selepas response selesai |
| **Auto-nudge mode aktif + user masih kerja** | ACTIVE — insert nudge dalam response |
| **Casual conversation tanpa signal keletihan** | DORMANT — jangan trigger |
| **User kata "ok dah rehat" / "dah ok"** | EXIT — deaktif auto-nudge mode |

---

## Protocol

### Step 1: Session Duration Probe

- [ ] Baca diary hari ini: `C:/Users/BSM/XDIBAX/daily-diary/current/YYYY-MM-DD.md`
- [ ] Cari timestamp entry pertama hari ini
- [ ] Estimate time elapsed sejak sesi bermula

Output jika ada data:
```
Sesi bermula ~[HH:MM] tadi — dah lebih kurang [X] jam.
```

- [ ] Jika tiada diary entry hari ini (sesi baru) → skip probe, teruskan dengan standard reminder
- [ ] Jika diary tidak wujud → skip probe senyap, jangan report error

---

### Step 2: Acknowledge State

- [ ] Acknowledge keadaan Abam secara positif — tanpa judgment, tanpa lecture
- [ ] Sesuaikan tone dengan severity yang diexpress:

  Ringan (penat biasa):
  - `"Wajar untuk rehat — dah lama fokus."`
  - `"Normal rasa macam ni lepas sesi panjang."`

  Berat (burnt out, overwhelmed):
  - `"Dengarlah badan — dia tahu bila cukup."`
  - `"Sesi yang berat. Rehat sekarang adalah keputusan bijak."`

- [ ] Jangan bagi medical advice — wellness only
- [ ] Jangan paksa — sentiasa suggest, bukan perintah

---

### Step 3: Recommend Break

Cadangkan rehat spesifik dan actionable:

```
[ ] Minum air
[ ] Regangan 1–2 minit
[ ] Rehat mata 20-20-20 (20 saat, tengok 20 kaki jauh, setiap 20 minit)
[ ] Tarik nafas dalam 5 kali
[ ] Kembali dengan 1 tugasan kecil
```

Suggest tempoh rehat berdasarkan masa kerja:
- **Micro break** (2–5 minit) — selepas 45–60 minit kerja
- **Full break** (10–15 minit) — selepas 2+ jam kerja
- **Extended break** (30+ minit) — jika burnt out atau penat teruk

---

### Step 4: Offer Restart Plan

- [ ] Cadangkan cara kembali kerja dengan momentum yang ringan:
  - `"Lepas rehat, kita sambung satu task kecil dulu supaya momentum kekal ringan."`
  - `"Ada task kecil yang boleh kita start — bagi otak warm up semula."`
- [ ] Jika Abam ada pending task — cadangkan task terkecil yang ada
- [ ] Jangan terus sambung task berat selepas rehat

---

### Step 5: Cadence Suggestion (Optional)

- [ ] Tawarkan recurring reminder pattern jika Abam setuju:
  - `"Nak saya ingatkan setiap 45–60 minit?"`
- [ ] Jika Abam setuju → aktifkan auto-nudge mode untuk sesi ini
- [ ] Log dalam `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` bahawa auto-nudge aktif

---

## Auto-Nudge Mode

Jika Abam request reminder lebih awal dalam sesi tetapi masih kerja:

1. Insert gentle nudge selepas beberapa respons panjang
2. Tone ringan — bukan forceful, bukan judgment
3. Suggest 2–5 minit rehat sebelum sambung

Contoh nudge:
- `"Friendly reminder: Abam dah lama fokus — jom rehat mata + minum air dulu."`
- `"Saya pausekan sekejap ya — ambil rehat 3–5 minit, lepas tu kita sambung."`
- `"Break dulu — 5 minit je. Lepas tu kita habiskan [task]."`

Bila auto-nudge aktif:
- [ ] Nudge selepas setiap 3–5 response panjang (judgment call berdasarkan intensity)
- [ ] Satu nudge per segment — jangan ulang dalam response yang sama
- [ ] Deaktif bila Abam kata "dah ok", "dah rehat", atau similar

---

## Safety & Tone Rules

- Jangan bagi specific medical advice
- Jangan judge atau lecture tentang working habits
- Tone sentiasa friendly, professional, supportive
- Sentiasa suggest — jangan paksa
- Respons pendek — wellness reminder mesti compact, bukan essay

---

## Mandatory Rules

1. **Tiada judgment** — acknowledge state Abam, jangan kritik working habit
2. **Tiada medical advice** — wellness hanya; jika ada simptom serius, suggest jumpa doktor
3. **Compact response** — break reminder mesti ≤ 60 perkataan, tidak termasuk checklist
4. **Suggest bukan perintah** — guna "nak", "jom", "cuba" — bukan "mesti", "kena"
5. **Auto-nudge respect** — bila Abam kata dah ok, deaktif terus tanpa soal
6. **Session probe senyap** — jika diary tidak ada, skip probe tanpa announce error
7. **Restart plan specific** — jangan kata "sambung kerja" — sebut task konkrit jika ada
8. **Cadence opt-in sahaja** — jangan auto-aktif cadence tanpa Abam setuju

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tiada diary entry hari ini** | Skip session probe, teruskan dengan standard reminder |
| **Diary ada tapi tiada timestamp** | Skip probe, jangan estimate tanpa data |
| **Abam kata "penat" tapi context kerja** | Full protocol — acknowledge + break + restart plan |
| **Abam kata "penat" dalam context casual** | Acknowledge sahaja — jangan trigger full protocol |
| **Auto-nudge aktif tapi Abam tengah buat kerja kritikal** | Tunda nudge — jangan interrupt di tengah complex task |
| **Abam reject break** | Acknowledge, deaktif pressure, offer reminder 30 minit kemudian |
| **Burnt out teruk (nada sangat penat)** | Suggest full break + beritahu: esok lebih jelas |
| **Abam dah rehat tapi masih rasa penat** | Acknowledge berbeza — ini bukan masalah break |
| **Auto-nudge dah 3 kali dalam sesi** | Kurangkan frequency — max 2 lagi untuk baki sesi |
| **Request rehat tapi ada deadline** | Acknowledge urgency, cadang micro break 3 minit sahaja |
| **Sesi sangat panjang (> 6 jam)** | Cadang extended break atau habiskan hari — jangan force short break |
| **Abam kata "dah ok" tapi baru 5 minit** | Accept tanpa question — dia tahu keadaan dia |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `save-diary` | Session probe baca diary | Diary adalah sumber timestamp — update diary bila sesi selesai |
| `session-briefing` | Awal sesi | Semak diary untuk estimate berapa lama Abam dah kerja hari ini |
| `check-reminders` | Auto-nudge mode aktif | Reminder break boleh jadi persistent di reminders.md |
| `anchor` | Bila break reminder mula panjang | Anchor balik — reminder mesti compact |
| `log-decision` | Bila Abam decide extended break | Log bila Abam putuskan nak habiskan hari |

---

## Level History

- **Lv.1** — Base: wellness reminder, acknowledge + recommend break + restart plan, auto-nudge mode bila user sebelum ini request reminders. (Origin: Wellness protocol DIBA)
- **Lv.2** — Session Duration Probe: baca diary timestamp entry pertama hari ini untuk estimate working time — bagi context-aware reminder dengan actual elapsed time bukannya generic message. (Origin: Pattern working long sessions tanpa sedar, 2026-04-28)
- **Lv.3** — Superultra: Frontmatter dan activation message ditambah, Context Guard dikembangkan dengan EXIT row, Step 2 Acknowledge dipecah berdasarkan severity, extended break category ditambah, auto-nudge frequency cap ditambah, safety rules diformalkan, edge cases dikembangkan kepada 12 rows, integrasi skill table ditambah, Mandatory Rules dikembangkan kepada 8 rules. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
