---
name: token-guard
description: "Activate to save tokens and prevent exceeding context limits. Use when user says: 'jimat token', 'save token', 'token limit', 'context limit', 'compress context', 'compact mode', 'token guard', 'hemat token', 'limit hampir', 'context penuh', 'reset context', 'checkpoint'. Switches to ultra-compact response mode, batches all tool calls, prunes stale context, and saves session checkpoint to resume without losing progress."
argument-hint: "mode: compact | checkpoint | resume | status"
---

# Token Guard

Skill ini mengaktifkan **mod penjimatan token** untuk memastikan sesi kerja dapat diteruskan tanpa melebihi had konteks. Ia mengandungi 4 mekanisme utama: Compact Mode, Context Pruning, Session Checkpoint, dan Smart Tool Rules.

---

## Trigger

Aktifkan bila pengguna kata:
- "jimat token", "hemat token", "save token"
- "token limit", "context limit", "limit hampir", "context penuh"
- "compact mode", "compress context"
- "token guard", "activate token guard"
- "checkpoint", "reset context", "resume dari checkpoint"

---

## Empat Mekanisme Utama

### 1. COMPACT MODE (Aktif serta-merta)

Ubah gaya respons kepada **ultra-compact** sehingga skill ini dinyahaktifkan:

| Perkara | Peraturan Compact |
|---------|-------------------|
| Panjang respons | 1–5 baris sahaja melainkan output teknikal diperlukan |
| Preamble/conclusion | HAPUS sepenuhnya ("Baik!", "Sudah saya..." — buang) |
| Ulangan maklumat | JANGAN ulangi apa yang sudah diketahui |
| Penjelasan panjang | Guna bullet 3–5 perkataan, bukan ayat penuh |
| Fail content echo | JANGAN paparkan semula kandungan fail yang baru dibaca |
| Konfirmasi trivial | SKIP ("Done.", "OK" sahaja) |
| Bahasa | Pendek, padat, jelas — tiada basa-basi |

**Contoh SEBELUM compact:**
> "Baik, saya akan membantu anda dengan itu. Saya telah membaca fail tersebut dan mendapati bahawa terdapat beberapa isu yang perlu diselesaikan..."

**Contoh SELEPAS compact:**
> "Jumpa 3 isu: [senarai]. Perbaiki?"

---

### 2. SMART TOOL RULES (Kurangkan round-trips)

Peraturan ketat untuk penggunaan tools:

| Peraturan | Huraian |
|-----------|---------|
| **Batch semua parallel calls** | Gabungkan semua tool calls bebas dalam satu blok — JANGAN sequential tanpa sebab |
| **Targeted reads sahaja** | Baca hanya baris yang diperlukan (`startLine`/`endLine`), bukan keseluruhan fail |
| **Guna grep sebelum read** | Cari lokasi tepat dengan `grep_search` sebelum buka fail |
| **Semantic search = last resort** | Guna hanya bila grep/file_search gagal |
| **Elak redundant search** | Jangan cari perkara yang sama dua kali dalam satu sesi |
| **Subagent untuk exploration** | Offload carian/exploration ke subagent Explore, dapat hasil terus |
| **Skip validation reads** | Jika baru je edit fail, jangan baca balik untuk "konfirmasi" |

---

### 3. CONTEXT PRUNING (Buang konteks lapuk)

Bila token hampir penuh, jalankan pruning:

1. **Kenalpasti apa yang masih relevan** — task semasa + fail aktif sahaja
2. **Buang dari perhatian**: fail yang sudah selesai diedit, output tool lama, search results lama
3. **Ringkaskan ke session memory** — simpan state penting ke `/memories/session/current-task.md`
4. **Pakai checkpoint** untuk teruskan kerja (lihat Mekanisme 4)

Isyarat context hampir penuh:
- Lebih 50 tool calls dalam sesi
- Respons model jadi perlahan atau terpotong
- User sebut "limit hampir" atau penggunaan token tinggi

---

### 4. SESSION CHECKPOINT (Save & Resume)

#### Save Checkpoint

Bila user minta "checkpoint" atau context hampir penuh, jalankan:

1. Tulis ke `/memories/session/checkpoint.md`:

```markdown
# Checkpoint — [YYYY-MM-DD HH:MM]

## Task Semasa
[Apa yang sedang dibuat]

## Status
- [x] Langkah yang dah siap
- [ ] Langkah yang belum siap

## Fail Aktif
- `path/to/file.php` — [apa yang sedang diedit/kenapa]

## Context Penting
[Maklumat kritikal yang perlu diketahui untuk sambung kerja]

## Langkah Seterusnya
1. [Langkah konkrit pertama]
2. [Langkah konkrit kedua]

## Keputusan Dibuat
- [Keputusan 1]
- [Keputusan 2]
```

2. Beritahu user: "Checkpoint tersimpan. Boleh sambung dengan: `/token-guard resume`"

#### Resume dari Checkpoint

Bila user minta "resume" atau bermula sesi baru:

1. Baca `/memories/session/checkpoint.md`
2. Ringkaskan status semasa kepada user dalam **5 baris atau kurang**
3. Terus ke "Langkah Seterusnya" dalam checkpoint
4. JANGAN baca semula fail yang tidak perlu untuk orientasi

---

## Mod Operasi

### `/token-guard compact`
Aktifkan compact mode sahaja. Terus semua kerja dalam mod ringkas.

### `/token-guard checkpoint`
Simpan session checkpoint sekarang. Stop & beritahu user endpoint.

### `/token-guard resume`
Baca checkpoint, ringkaskan status, sambung kerja.

### `/token-guard status`
Laporan ringkas:
- Anggaran token digunakan (berdasarkan bilangan tool calls)
- Langkah aktif dari checkpoint (jika ada)
- Cadangan: teruskan / checkpoint dulu

---

## Prosedur Penuh (Default apabila skill diaktifkan)

1. **Aktifkan compact mode serta-merta** — tukar gaya respons
2. **Audit tool usage** — adakah ada pattern boros? Cadangkan batching
3. **Semak ada checkpoint lama** — baca `/memories/session/checkpoint.md` jika ada
4. **Lapor status** — 3 baris: mod aktif, checkpoint status, pointer kerja semasa
5. **Teruskan kerja** dalam mod compact

---

## Rujukan

- [Compact Response Templates](./references/compact-mode.md)
- [Checkpoint Protocol Details](./references/checkpoint-protocol.md)

---

## Nota Penting

- Compact mode **tidak** mengurangkan kualiti kerja — hanya buang token sia-sia
- Checkpoint boleh digunakan **proaktif** sebelum limit, bukan tunggu sampai penuh
- Tool batching adalah **wajib** dalam token-guard mode — elak sequential calls langsung

## Level History
- **Lv.1** — Base: compact mode, checkpoint, tool batching, status 3-baris.
- **Lv.2** — Memory Prune: dalam token-guard, jangan baca diari penuh — guna `current-session.md` + grep targeted sahaja. (Origin: 2026-05-22 — naikkan skill batch)
- Bila skill ini aktif, **tiada** "Baik!", "Saya faham", atau preamble lain
