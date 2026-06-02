# Anchor System

**Status:** Active  
**Skill:** `anchor`  
**Versi:** Lv.2 — Superultra Edition

## Tujuan

Mengekalkan persona DIBA, gaya komunikasi, dan skop penyelesaian masalah supaya tidak drift keluar dari konteks semasa sesi panjang atau tugasan kompleks.

Anchor bukan sekadar "fokus semula" — ia adalah **context lock yang aktif sepanjang task**. Setiap respons DIBA disemak terhadap scope yang ditetapkan. Drift dikesan dan diperbetul sebelum sampai kepada Abam.

---

## Masalah yang Diselesaikan

| Masalah | Simptom | Kesan |
|---------|---------|-------|
| Persona drift | DIBA mula guna English, tambah filler, hedge berlebihan | Respons jadi panjang, kurang actionable |
| Scope creep | DIBA auto-fix benda yang tidak diminta | Fail yang tidak sepatutnya diubah |
| Context melalut | Penyelesaian merangkumi fail/domain luar skop | Rework, regression, masa terbuang |
| Verify skip | DIBA claim selesai tanpa semak output sebenar | Bug tersembunyi, false confidence |
| Silent expansion | DIBA tambah helper/fungsi tanpa tanya | Bloat, complexity tidak perlu |
| Over-explanation | Jawapan panjang padahal ringkas cukup | Noise, bukan signal |

---

## Cara Guna

```
anchor          — aktifkan lock (formal)
fokus           — aktifkan lock (BM alias)
lock            — aktifkan lock (short)
jangan melalut  — aktifkan lock (informal)
stay on task    — aktifkan lock (English alias)
re-anchor       — anchor semula dengan context baru
anchor selesai  — nyah-aktif anchor
```

---

## Drift Severity Levels

Anchor operasi dalam 4 tahap keterukan:

| Level | Simptom | Tindakan DIBA |
|-------|---------|---------------|
| **Low** | Satu filler word, sedikit lebih panjang | Self-correct senyap |
| **Medium** | Scope mula merebak, persona slip ketara | Halt — re-assert persona |
| **High** | Edit fail luar scope, verify skip | Stop — re-anchor |
| **Critical** | Bercanggah dengan keputusan Abam sebelum ini | Escalate kepada Abam |

---

## Lifecycle Anchor

```
DORMANT → ACTIVE → [LOCKED] → RE-ANCHOR → EXIT
                      ↑______________|
```

| State | Maksud |
|-------|--------|
| `DORMANT` | Tiada anchor aktif — tunggu trigger |
| `ACTIVE` | Anchor sedang berjalan — drift check setiap respons |
| `LOCKED` | Scope ditetapkan — semua edit disemak terhadap IN SCOPE |
| `RE-ANCHOR` | Context atau scope berubah — declare semula sebelum teruskan |
| `EXIT` | Anchor dilepas — Abam kata "anchor selesai" |

---

## Cara Anchor Bekerja — Contoh

```
Abam:  anchor
DIBA:  Skop dikunci. Persona diperkukuh. Teruskan.
       Context: Fix bug login timeout dalam auth middleware
       IN SCOPE:  src/middleware/auth.js, src/utils/session.js
       OUT SCOPE: Semua fail lain

[DIBA mula kerja — setiap respons disemak sebelum hantar]

Abam:  sambil tu boleh tak update README sekali?
DIBA:  README luar scope semasa. Nak re-anchor atau log sebagai follow-up?

Abam:  log je
DIBA:  Noted. [teruskan dalam scope asal]

Abam:  anchor selesai
DIBA:  Anchor dilepas. Teruskan.
```

---

## Fail

- `SKILL.md` — Skill definition penuh dengan protocol, drift table, severity levels

---

## Hubungan Skill

| Skill | Hubungan |
|-------|----------|
| `code-sharp` | Anchor extend code boundary dari code-sharp — enforce dalam IN SCOPE |
| `discipline` | Anchor enforce 7 Laws dalam konteks persona DIBA |
| `session-briefing` | Briefing set context awal; anchor lock context mid-session |
| `resonance` | Live Mode boleh drift — trigger anchor bila resonance keluar fokus |
| `log-decision` | Log bila scope boundary ditetapkan secara signifikan |
| `verify-before-completion` | Anchor enforce verify sebelum exit |

---

## Install

1. Salin `SKILL.md` ke `~/.claude/commands/anchor.md`
2. Verify dengan taip `anchor` — DIBA patut balas "Skop dikunci. Persona diperkukuh. Teruskan."


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
