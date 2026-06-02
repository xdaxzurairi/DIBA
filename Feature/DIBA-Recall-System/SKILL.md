---
name: diba-recall
description: "Load memory workspace DIBA — recap sesi lepas, reminder terbuka, dan
             projek aktif. Trigger on-demand bila Abam kata 'diba', 'recall',
             'ingat semula', atau bila perlu deep workspace context load."
---

# DIBA Recall — Workspace Memory Load
*Ingatan dimuat. Konteks dipulihkan.*

## Activation

When this skill activates, output:
"Ingatan dimuat."

Then immediately execute protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "diba", "recall", "ingat semula"** | ACTIVE — full workspace recall |
| **Sesi baru tanpa session-briefing** | ACTIVE — deliver recap sebagai ganti brief |
| **Abam minta context refresh mid-session** | ACTIVE — deliver recall ringkas |
| **Session-briefing sudah active dalam sesi ini** | DORMANT — jangan duplicate brief |
| **Mid-conversation tanpa trigger** | DORMANT — tunggu trigger |

---

## Protocol

### Step 1: Detect Workspace

- [ ] Kenal pasti working directory semasa
- [ ] Tentukan workspace: XDIBAX, projek spesifik, atau unknown
- [ ] Jika workspace dikenali → load project context (Step 2)
- [ ] Jika workspace unknown → teruskan ke Step 3 (global memory sahaja)

---

### Step 2: Load Project Context

Jika LRU-Project-Management-System dipasang:

- [ ] Semak project registry untuk workspace semasa
- [ ] Load fail project memory dari `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/projects/active/`
- [ ] Extract: nama projek, status semasa, last activity, open issues
- [ ] Jika tiada match dalam registry → skip ke Step 3

---

### Step 3: Load Global Memory (Parallel)

Baca semua sumber serentak:

| Sumber | Tujuan | Required |
|--------|--------|----------|
| `main/current-session.md` | Recap sesi lepas + next steps | Ya |
| `main/reminders.md` | Open reminders — skip jika tiada | Optional |
| `main/decisions.md` | Keputusan terbaru jika relevan | Optional |
| `main/mind-tree.md` | Seeds aktif dari Resonance | Optional |
| `daily-diary/current/[today].md` | Entry hari ini jika ada | Optional |

---

### Step 4: Compose Recall

Susun recall dalam format compact:

```
=== Recall: [Workspace / Projek] ===

Sesi lepas: [topik + keputusan utama — 1–2 ayat]

Projek aktif: [nama] · [status]         ← skip jika tiada
Reminders: [N] open → [preview item]    ← skip jika tiada
🌱 Seeds: [tajuk] — [status]            ← skip jika tiada
Diary hari ini: [N] entry              ← skip jika tiada

Arah seterusnya: [cadangan atau soalan]
```

**Composition rules:**
- Maksimum 10 baris keseluruhan
- Skip mana-mana bahagian yang tiada isi — jangan output placeholder
- "Sesi lepas" adalah satu-satunya bahagian wajib
- Arah seterusnya: cadang jika jelas dari context, tanya jika tidak

---

### Step 5: Ask for Direction

Jika continuation tidak jelas dari context:

- [ ] Kemukakan 2 pilihan jika ada:
  ```
  Nak sambung mana — [pilihan A] atau [pilihan B]?
  ```
- [ ] Jika hanya satu arah yang logik → cadang terus, bukan tanya
- [ ] Jika langsung tiada context → tanya: "Nak mulakan apa hari ini?"

---

### Step 6: Deep Recall (bila diminta)

Jika Abam minta recall lebih mendalam selepas Step 4:

- [ ] Handoff ke `echo-recall` untuk search diary berdasarkan topik
- [ ] Load project file penuh dari `projects/active/` jika berkaitan
- [ ] Surface lebih banyak keputusan dari `decisions.md`
- [ ] Jangan buat deep recall secara default — tunggu signal dari Abam

---

## Perbezaan diba-recall vs echo-recall vs session-briefing

| Skill | Scope | Trigger | Depth |
|-------|-------|---------|-------|
| `session-briefing` | Startup brief automatik | Awal sesi | Compact — max 12 baris |
| `diba-recall` | On-demand workspace context | "diba", "recall" | Medium — workspace + global memory |
| `echo-recall` | Search diary untuk topik spesifik | "do you remember..." | Deep — keyword search merentasi semua diary |

---

## Mandatory Rules

1. **Jangan duplicate session-briefing** — jika brief sudah dihantar, skip melainkan Abam minta explicitly
2. **Workspace-aware** — recall mesti refleks konteks workspace semasa, bukan generic
3. **Maksimum 10 baris** — compact, bukan verbose
4. **Skip bahagian kosong** — jangan output "tiada reminder" atau placeholder
5. **Cadang arah seterusnya** — recall mesti end dengan next step atau soalan, bukan dead end
6. **Deep recall on-demand** — jangan auto-deep-dive, tunggu signal Abam
7. **Seeds surface** — jika ada seed aktif yang relevan dengan workspace, surface dalam recall

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| `current-session.md` tidak wujud | Output: "Sesi pertama — tiada recap. Nak mulakan apa?" |
| Workspace tidak dikenali | Skip project context — load global memory sahaja |
| Session-briefing sudah dihantar sesi ini | Skip diba-recall melainkan Abam minta explicitly |
| Abam minta "ingat semula" tentang topik spesifik | Treat sebagai echo-recall trigger — handoff terus |
| Banyak projek aktif tanpa workspace match | Surface projek paling terkini (last modified) |
| mind-tree.md ada banyak seeds | Surface max 2 yang paling aktif (GROWING/GERMINATING) |
| decisions.md sangat panjang | Extract 3 keputusan terkini sahaja |
| Diary hari ini ada banyak entry | Sebut bilangan entry sahaja — jangan papar semua |

---

## Integrasi Skill

| Skill | Hubungan | Tindakan |
|-------|----------|----------|
| `session-briefing` | Brief owns startup; recall owns on-demand | Koordinasi supaya tidak duplicate |
| `echo-recall` | Deep diary search | Handoff bila Abam minta recall topik spesifik |
| `check-reminders` | Reminder operations | Handoff bila Abam nak manage reminders |
| `resonance` | Seeds dalam mind-tree | Surface seeds aktif dalam recall |
| `log-decision` | decisions.md | Extract keputusan terkini dalam recall |
| `save-diary` | current-session.md source | Recall bergantung pada kualiti diary saves |

---

## Level History

- **Lv.1** — Base: workspace detection, project registry lookup, global memory load (current-session + reminders), concise recap, direction ask. (Origin: DIBA workspace recall protocol, xdaxzurairi)
- **Lv.2** — Superultra: Step 3 Global Memory dikembangkan (decisions.md + mind-tree.md + diary hari ini), Step 6 Deep Recall on-demand, perbezaan ownership table (diba-recall vs echo-recall vs session-briefing), seeds surface dalam recall, edge cases tambahan, mandatory rules dikembangkan, composition rules eksplisit. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
