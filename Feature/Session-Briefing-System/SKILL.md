---
name: session-briefing
description: "Session Briefing — fires automatically at session start before processing
             the user's first message. Delivers a structured brief: last session recap,
             open reminders, active project status, growing seeds, and time-aware suggestion.
             Trigger manually with 'brief', 'session brief', or 'where did we leave off'."
---

# Session Briefing — DIBA Startup Intelligence
*Konteks dimuat. Sesi dimulakan.*

## Activation

Fires automatically at the start of every new conversation session — before processing the user's first request.

Manual triggers: `brief`, `session brief`, `where did we leave off`, `what did we do last time`

Suppress trigger: `skip brief` — suppresses for this session only.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Awal sesi baru — sebelum respons pertama** | ACTIVE — auto-deliver brief |
| **Abam kata "brief" atau "session brief"** | ACTIVE — deliver brief on-demand |
| **Abam kata "where did we leave off"** | ACTIVE — deliver brief on-demand |
| **Abam kata "skip brief"** | SUPPRESSED — skip untuk sesi ini sahaja |
| **Brief sudah dihantar dalam sesi ini** | DORMANT — jangan repeat melainkan diminta |

---

## Protocol

### Step 1: Load Context (Parallel)

Baca semua sumber serentak:

| Fail | Tujuan | Required |
|------|--------|----------|
| `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md` | Recap sesi lepas | Ya |
| `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md` | Open reminder items | Optional |
| `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/mind-tree.md` | Seeds aktif dari Resonance | Optional |
| Project list file (LRU System) | Active project + idle health | Optional |
| Current time | Klasifikasi time period | Optional |
| `C:/Users/BSM/XDIBAX/diba-hub/data/inbox.json` | Queued tasks dari DIBA Hub | Optional |

---

### Step 2: Classify Time Period

| Masa | Period | Work Suggestion |
|------|--------|----------------|
| 06:00–11:59 | Pagi | Arkitektur, feature baru, masalah kompleks |
| 12:00–17:59 | Tengah hari | Implementasi, debugging, testing |
| 18:00–21:59 | Petang | Code review, dokumentasi, task sederhana |
| 22:00–05:59 | Malam | Task ringan, planning — cadang wrap up |

Jika Time-based-Aware System tidak dipasang → skip baris suggestion.

---

### Step 3: Identify Attention Flags

Semak project list untuk projek yang idle melebihi threshold:

| Flag | Maksud | Default Threshold |
|------|--------|------------------|
| 🟡 | Idle — hampir warning | 14 hari |
| 🔴 | Stale — lepas critical threshold | 30 hari |

- Tunjuk maksimum **3 flags**
- Jika lebih dari 3 — tunjuk yang paling kritikal (paling banyak hari idle) dahulu
- Skip section ini sepenuhnya jika tiada projek yang flagged
- Jika LRU System tidak dipasang → skip section ini

---

### Step 4: Surface Seeds Aktif (Resonance Integration)

Semak `mind-tree.md` untuk seeds yang aktif:

- [ ] Extract seeds dengan status `PLANTED`, `GERMINATING`, atau `GROWING`
- [ ] Tunjuk seeds yang relevan dengan konteks sesi semasa — max 2
- [ ] Format: `🌱 [tajuk seed] — [status]`
- [ ] Skip section ini jika tiada seed aktif atau mind-tree.md tidak wujud

---

### Step 5: Surface Inbox Tasks (DIBA Hub)

Jika `diba-hub/data/inbox.json` wujud dan ada tasks:

- [ ] Baca queued tasks
- [ ] Surface maksimum 3 tasks paling utama
- [ ] Tanya Abam: yang mana nak tackle dulu?
- [ ] Jangan auto-assign atau auto-start — surface sahaja

---

### Step 6: Compose Brief

Susun brief dalam format:

```
📋 Session Brief · [Time Period]

Last session: [1–2 baris recap dari current-session.md]
Active: [nama projek] · [status]
🔴/🟡 [projek] — [N] hari idle        ← max 3 flags, skip jika tiada
Reminders: [N] open → [preview item pertama]   ← skip jika tiada
🌱 Seeds: [tajuk] — [status]           ← max 2, skip jika tiada
Inbox: [N] tasks → [preview task pertama]      ← skip jika tiada
Suggestion: [cadangan kerja ikut masa]
```

**Composition rules:**
- **Maksimum 12 baris** keseluruhan
- Skip mana-mana baris yang tiada isi
- "Last session" adalah satu-satunya baris wajib
- Deliver sebelum proses request pertama Abam

---

### Step 7: Deliver

- [ ] Output brief sebelum proses request Abam
- [ ] Jika Abam ada request dalam message yang sama → brief dulu, baru proses request
- [ ] Jika brief kosong (tiada data langsung) → skip terus, jangan output brief kosong

---

### Step 8: Post-Brief Handoff

Selepas brief dihantar:

- [ ] Jika ada inbox tasks → tunggu Abam pilih, baru proceed
- [ ] Jika Abam terus bagi arahan → proses arahan tersebut
- [ ] Jika ada seed BLOOMING dalam mind-tree → surface kepada Abam: "Ada seed yang dah bloom — nak harvest?"
- [ ] Catat dalam sesi bahawa brief sudah dihantar — jangan repeat dalam sesi yang sama

---

## Output Format — Lengkap vs Minimal

### Format Lengkap (semua companion systems ada)
```
📋 Session Brief · Pagi

Last session: Fix bug login timeout dalam auth middleware — selesai, pushed ke staging
Active: BFM2026 · on track
🔴 eWorks — 32 hari idle
Reminders: 2 open → Review PR sebelum EOD
🌱 Seeds: Predictive Memory Layer — GROWING
Suggestion: Arkitektur atau feature baru
```

### Format Minimal (hanya current-session.md)
```
📋 Session Brief

Last session: [recap dari current-session.md]
```

---

## Ownership Boundaries

| Skill | Domain |
|-------|--------|
| `session-briefing` | Startup brief automatik — satu kali per sesi |
| `diba-recall` | On-demand atau deep workspace recall |
| `check-reminders` | Operasi reminder-specific (add, close, list) |
| `resonance` | Seed nurture aktif — session-briefing hanya surface |

Session-briefing tidak orchestrate inbox tasks — surface sahaja, Abam pilih.

---

## Mandatory Rules

1. **Deliver sebelum request pertama** — jangan proses dulu, brief dulu
2. **Maksimum 12 baris** — tiada exception
3. **Skip section kosong** — jangan output placeholder atau "tiada reminder"
4. **Satu kali per sesi** — jangan repeat melainkan Abam minta manual trigger
5. **Jangan orchestrate** — surface sahaja, bukan decide untuk Abam
6. **Seed max 2** — pilih yang paling relevan dengan konteks sesi
7. **Inbox max 3** — tunjuk paling kritikal dahulu

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| `current-session.md` tidak wujud | Output brief minimal: "Sesi pertama — tiada recap sebelum ini" |
| `mind-tree.md` tidak wujud | Skip section seeds |
| Semua companion systems tiada | Brief minimal — last session sahaja |
| Abam kata "skip brief" | Suppress untuk sesi ini — jangan deliver |
| Abam minta "brief" di tengah sesi | Deliver semula brief terkini — update jika ada perubahan |
| Brief > 12 baris | Trim — priority: last session > reminders > seeds > flags > inbox > suggestion |
| Inbox ada banyak tasks | Tunjuk 3 paling utama — mention "dan [N] lagi dalam inbox" |
| Seed BLOOMING dalam mind-tree | Surface dalam brief + tanya Abam nak harvest |
| Tiada data langsung (semua fail kosong) | Skip brief sepenuhnya — terus proses request |

---

## Integrasi Skill

| Skill | Hubungan | Tindakan |
|-------|----------|----------|
| `diba-recall` | Deep recall jika Abam nak lebih detail | Handoff ke diba-recall bila Abam minta |
| `check-reminders` | Reminder operations | Handoff bila Abam nak manage reminders |
| `resonance` | Seeds dari mind-tree | Surface seeds aktif dalam brief |
| `anchor` | Context lock mid-session | Anchor boleh guna context dari brief sebagai IN SCOPE |
| `log-decision` | Keputusan penting dalam sesi | Brief surface pending decisions jika ada |
| `save-diary` | Log sesi lepas | current-session.md adalah sumber brief |

---

## Level History

- **Lv.1** — Base: session recap + time suggestion
- **Lv.2** — Reminders integration (requires Reminders-System)
- **Lv.3** — Project health flags (requires LRU-Project-Management-System)
- **Lv.4** — Inbox integration: reads `diba-hub/data/inbox.json`, surfaces queued tasks, ownership boundaries clarified. (Origin: XDIBAX operator workflow, xdaxzurairi)
- **Lv.5** — Superultra: Step 4 Seeds integration (Resonance mind-tree), Step 8 Post-Brief Handoff, seed BLOOMING surface, format lengkap vs minimal, edge cases tambahan, integrasi skill dikemaskini, mandatory rules dikembangkan, ownership boundaries diperincikan. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
