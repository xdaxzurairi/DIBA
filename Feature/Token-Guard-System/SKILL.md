---
name: token-guard
description: "Activate to save tokens and prevent exceeding context limits. Use when
             user says: 'jimat token', 'hemat token', 'save token', 'token limit',
             'context limit', 'compact mode', 'checkpoint', 'reset context', or
             'resume dari checkpoint'. Also fires proactively via early warning detection."
---

> ⚠️ **SUPERSEDED** — canonical executable copy: `plugins/diba-skills/skills/token-guard/SKILL.md`.
> This Feature copy is documentation/history only and is no longer installed. Edit the plugin copy.

# Token Guard System — DIBA Context Manager
*Compact. Checkpoint. Resume. Teruskan.*

## Activation

When this skill activates, output:
"Token Guard aktif. Compact mode ON."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "jimat token", "compact mode"** | ACTIVE — aktif compact mode |
| **Abam kata "checkpoint", "save checkpoint"** | ACTIVE — save checkpoint sekarang |
| **Abam kata "resume", "resume dari checkpoint"** | ACTIVE — baca checkpoint dan teruskan |
| **Abam kata "token guard status"** | ACTIVE — report usage estimate |
| **Early warning threshold dicapai (Lv.2)** | ACTIVE — insert silent warning |
| **Sesi biasa dalam had normal** | DORMANT — monitor sahaja |
| **Abam kata "token guard off"** | EXIT — deaktif, teruskan tanpa compact mode |

---

## Protocol — Default

### Step 1: Activate Compact Mode

- [ ] Switch response style kepada ultra-compact serta-merta:

| Item | Compact Rule |
|------|-------------|
| Panjang respons | 1–5 baris melainkan output teknikal diperlukan |
| Preamble / conclusion | BUANG sepenuhnya |
| Maklumat berulang | JANGAN ulang apa yang sudah diketahui |
| Penjelasan panjang | Bullet 3–5 perkataan, bukan ayat penuh |
| Echo kandungan fail | JANGAN papar semula fail yang baru dibaca |
| Konfirmasi trivial | Skip — "OK" sahaja |

- [ ] Bila skill ini aktif: tiada "Baik!", "Saya faham", atau mana-mana preamble

---

### Step 2: Audit Tool Usage

- [ ] Semak pattern tool yang membazir. Enforce:

| Peraturan | Detail |
|-----------|--------|
| Batch semua parallel calls | Gabungkan tool calls bebas dalam satu blok |
| Targeted reads sahaja | Baca hanya baris yang diperlukan (`startLine`/`endLine`) |
| Grep sebelum read | Cari lokasi tepat dengan grep sebelum buka fail |
| Semantic search = last resort | Guna hanya bila grep/file_search gagal |
| Tiada redundant searches | Jangan cari perkara sama dua kali dalam satu sesi |
| Subagents untuk exploration | Outsource carian/exploration ke Explore subagent |
| Skip validation reads | Jika fail baru diedit, jangan re-read untuk "confirm" |

---

### Step 3: Check Existing Checkpoint

- [ ] Baca `memories/session/checkpoint.md` jika wujud
- [ ] Jika dijumpai, tunjuk status dalam 3 baris
- [ ] Jika tidak wujud, teruskan dengan compact mode sahaja

---

### Step 4: Report Status

- [ ] 3 baris: mode aktif, status checkpoint, work pointer semasa

---

### Step 5: Continue in Compact Mode

- [ ] Teruskan kerja dalam compact mode
- [ ] Monitor threshold proaktif
- [ ] Jangan kurangkan kualiti kerja — hanya buang token yang membazir

---

## Protocol — Checkpoint Save

Bila Abam kata "checkpoint" atau context hampir penuh:

1. - [ ] Tulis ke `memories/session/checkpoint.md`:

```markdown
# Checkpoint — [YYYY-MM-DD HH:MM]

## Current Task
[Apa yang sedang dikerjakan]

## Status
- [x] Langkah yang selesai
- [ ] Langkah yang masih berbaki

## Active Files
- `path/to/file` — [apa/kenapa]

## Critical Context
[Maklumat utama yang diperlukan untuk resume]

## Next Steps
1. [Langkah pertama yang konkrit]
2. [Langkah kedua yang konkrit]

## Decisions Made
- [Keputusan 1]
```

2. - [ ] Notify: `"Checkpoint tersimpan. Boleh sambung dengan: /token-guard resume"`

---

## Protocol — Resume

Bila Abam kata "resume":

1. - [ ] Baca `memories/session/checkpoint.md`
2. - [ ] Summarize status kepada Abam dalam **5 baris atau kurang**
3. - [ ] Proceed terus ke Next Steps
4. - [ ] Jangan re-read fail yang tidak perlu untuk orientasi semula

---

## Proactive Early Warning (Lv.2)

Auto-detect context yang hampir penuh **tanpa tunggu Abam**:

| Signal | Threshold | Tindakan |
|--------|-----------|----------|
| Tool calls dalam sesi | ≥ 40 calls | Cadang checkpoint |
| Fail besar dibaca berturutan | 3+ fail > 200 baris | Switch ke targeted reads |
| Respons panjang berulang | 3+ respons > 100 baris | Aktif compact mode |
| Abam tanya perkara sama dua kali | Repeat query terkesan | Context mungkin hilang — cadang checkpoint |

Bila threshold dicapai, masukkan satu baris amaran senyap:
```
[Token Guard: ~40 tool calls — cadang checkpoint sebelum sambung?]
```

Jangan interrupt kerja — satu baris sahaja, kemudian teruskan.

---

## Mandatory Rules

1. **Compact mode TIDAK kurangkan kualiti kerja** — hanya buang token yang membazir
2. **Gunakan checkpoint proaktif** sebelum limit, bukan selepas
3. **Tool batching wajib** dalam token-guard mode
4. **Tiada preamble** bila skill aktif: tiada "Baik!", "Saya faham", atau intro
5. **Grep dahulu** sebelum read — jangan buka fail untuk orientasi
6. **Satu warning sahaja** untuk setiap threshold yang dicapai — jangan spam
7. **Checkpoint mesti self-contained** — semua context yang perlu untuk resume mesti ada dalam fail
8. **Jangan re-read** fail yang baru diedit untuk "confirm" — percaya pada edit yang baru dibuat

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| Checkpoint file tidak wujud | Proceed compact mode sahaja — checkpoint optional |
| Context sudah overflow sebelum checkpoint | Buat checkpoint segera, warn Abam tentang potensi kehilangan context |
| Abam kata "resume" tapi tiada checkpoint | Report: "Tiada checkpoint — terangkan context semasa untuk sambung" |
| Checkpoint lapuk (dari sesi lama berbeza task) | Flag: "Checkpoint dari [tarikh] — masih relevan?" sebelum resume |
| Tool calls < 40 tapi context besar kerana fail | Trigger threshold berdasarkan saiz fail, bukan bilangan calls sahaja |
| Abam kata "token guard off" | Deaktif compact mode — kembali ke response style biasa |
| Work Plan aktif semasa token guard | Koordinasi checkpoint dengan plan file — update kedua-dua |
| Subagent digunakan semasa compact mode | Subagent prompt mesti lebih pendek — hanya include context kritikal |
| Compact mode tapi Abam minta penjelasan penuh | Ikut arahan Abam — override compact mode untuk satu respons |
| Multiple checkpoints dari sesi berbeza | Rename lama sebagai `checkpoint-YYYYMMDD.md`, buat checkpoint baru |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `work-plan` | Plan execution berjalan lama | Checkpoint align dengan plan step — update kedua-dua fail |
| `session-briefing` | Resume selepas context reset | Brief on resume include checkpoint summary |
| `orchestrate` | Orchestration panjang hampir overflow | Token guard aktif compact semasa orchestration |
| `anchor` | Compact mode drift dari fokus asal | Anchor lock semula scope dalam compact mode |
| `save-diary` | Context reset sebelum diary sempat disave | Checkpoint serve sebagai proxy — save diary dulu |
| `dispatching-parallel-agents` | Parallel agents cipta terlalu banyak context | Enforce targeted scope per agent |

---

## Level History

- **Lv.1** — Base: 4 mechanisms (Compact Mode, Smart Tool Rules, Context Pruning, Session Checkpoint), 4 operation modes (compact/checkpoint/resume/status), full default protocol. (Origin: Token management protocol DIBA, xdaxzurairi)
- **Lv.2** — Proactive Early Warning: auto-detect context hampir penuh melalui tool call count, large file reads, repeat queries — insert silent one-line warning sebelum Abam perasan. (Origin: Pattern Abam terkejut dengan context overflow, 2026-04-28)
- **Lv.3** — Superultra: Frontmatter ditambah, activation message, Context Guard table dengan EXIT row, Protocol restructured kepada full checklist steps, Mandatory Rules dikembangkan kepada 8 peraturan, Edge Cases table 10 baris, Integrasi Skill table 6 baris, checkpoint format distandard. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
