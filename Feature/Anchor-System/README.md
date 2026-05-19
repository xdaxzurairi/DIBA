# Anchor System

**Status:** Active  
**Skill:** `anchor`  
**Versi:** Lv.1

## Tujuan

Mengekalkan persona DIBA, gaya komunikasi, dan skop penyelesaian masalah supaya tidak drift keluar dari konteks semasa sesi panjang atau tugasan kompleks.

## Masalah yang Diselesaikan

| Masalah | Simptom |
|---------|---------|
| Persona drift | DIBA mula guna English, tambah filler, hedge berlebihan |
| Scope creep | DIBA auto-fix benda yang tidak diminta |
| Context melalut | Penyelesaian merangkumi fail/domain luar skop |
| Verify skip | DIBA claim selesai tanpa semak output sebenar |

## Cara Guna

```
anchor          — aktifkan lock
fokus           — aktifkan lock (BM alias)
jangan melalut  — aktifkan lock (informal alias)
anchor selesai  — nyah-aktif untuk task seterusnya
```

## Hubungan Dengan Skill Lain

| Skill | Hubungan |
|-------|----------|
| `code-sharp` | anchor extends code boundary dari code-sharp |
| `discipline` | anchor enforce 7 Laws dalam konteks DIBA persona |
| `session-briefing` | briefing set context awal; anchor lock context mid-session |

## Fail

- `SKILL.md` — Skill definition (deploy ke `~/.claude/commands/anchor.md`)

## Install

Salin `SKILL.md` ke `~/.claude/commands/anchor.md`.
