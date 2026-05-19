# DIBA Recall System

**Status:** Active  
**Skill:** `diba-recall`  
**Versi:** Lv.2 — Superultra Edition

## Tujuan

Workspace-aware memory recall — mengesan workspace semasa, load project context dan global memory, dan deliver recap compact yang siap untuk sambung kerja.

DIBA Recall adalah lapisan tengah antara session-briefing (startup auto-brief) dan echo-recall (deep diary search).

---

## Tiga Skill Recall — Perbezaan

| Skill | Scope | Trigger | Depth |
|-------|-------|---------|-------|
| `session-briefing` | Startup brief automatik | Awal sesi | Compact — max 12 baris |
| `diba-recall` | On-demand workspace context | `diba`, `recall`, `ingat semula` | Medium — workspace + global memory |
| `echo-recall` | Search diary topik spesifik | `do you remember...` | Deep — keyword search semua diary |

---

## Cara Kerja

```
Abam trigger "diba" / "recall" / "ingat semula"
→ Detect workspace semasa
→ Load project context (LRU registry jika ada)
→ Load global memory: current-session, reminders, decisions, seeds, diary hari ini
→ Compose recall compact (max 10 baris)
→ Cadang arah seterusnya atau tanya Abam
→ Deep recall on-demand jika Abam minta lebih
```

---

## Output Format

```
=== Recall: [Workspace / Projek] ===

Sesi lepas: [topik + keputusan utama]

Projek aktif: [nama] · [status]         ← skip jika tiada
Reminders: [N] open → [preview]         ← skip jika tiada
🌱 Seeds: [tajuk] — [status]            ← skip jika tiada
Diary hari ini: [N] entry              ← skip jika tiada

Arah seterusnya: [cadangan atau soalan]
```

Maksimum 10 baris. Skip bahagian kosong.

---

## Sumber Memory

| Sumber | Tujuan |
|--------|--------|
| `main/current-session.md` | Recap sesi lepas + next steps |
| `main/reminders.md` | Open reminders |
| `main/decisions.md` | Keputusan terbaru |
| `main/mind-tree.md` | Seeds aktif dari Resonance |
| `daily-diary/current/[today].md` | Entry hari ini |
| `projects/active/` | Project memory (LRU System) |

---

## Trigger

| Input | Tindakan |
|-------|----------|
| `diba` | Full workspace recall |
| `recall` | Full workspace recall |
| `ingat semula` | Full workspace recall |
| Sesi baru tanpa session-briefing | Auto-deliver recall sebagai ganti brief |
| `ingat semula [topik]` | Handoff ke echo-recall untuk search spesifik |

---

## Hubungan Skill

| Skill | Hubungan |
|-------|----------|
| `session-briefing` | Brief owns startup; recall owns on-demand — jangan duplicate |
| `echo-recall` | Handoff bila Abam minta recall topik spesifik |
| `check-reminders` | Handoff bila Abam nak manage reminders |
| `resonance` | Surface seeds aktif dalam recall |
| `save-diary` | current-session.md adalah sumber utama recall |

---

## Keperluan

- `main/current-session.md` — diperlukan
- `main/reminders.md` — optional
- Project registry (LRU System) — optional
- `main/mind-tree.md` (Resonance System) — optional

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/diba-recall.md`
2. Pastikan `main/current-session.md` wujud
3. Verify: taip `recall` — DIBA patut output "Ingatan dimuat." dan deliver recap
