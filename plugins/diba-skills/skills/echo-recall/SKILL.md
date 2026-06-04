---
name: echo-recall
description: 'Search and recall past sessions from diary with narrative answers. Use when user says: "Do you remember...", "When did we...", "Recall...", "What did we decide about...", "Last time we...", "Earlier you said...".'
---

# Echo Memory Recall

Search and recall past sessions from diary with **narrative** answers.

## Trigger

Aktifkan bila pengguna kata: "Do you remember...", "When did we...", "Recall...", "What did we decide about...", "Last time we...", "Earlier you said...".

## Three-Level Recall

### 1. Search + Narrative
- Jalankan carian kata kunci merentasi semua diary entries: `daily-diary/current/*.md` dan `daily-diary/archived/**/*.md`
- Bina **naratif pendek** dari entry yang sepadan (tarikh, ringkasan, keputusan)
- Jawab dalam **perbualan semula jadi**, bukan output mentah atau JSON

### 2. Uncertainty Guard
- Jika carian tidak jumpa atau samar, nyatakan dengan jelas
- **JANGAN** reka atau fabricate konteks lalu
- Contoh: "Saya tiada catatan diari tentang itu" / "Saya tak jumpa dalam log."

### 3. Ask-User Fallback
- Bila tiada hasil atau pelbagai tafsiran, **tanya pengguna** untuk jelaskan
- Contoh: "Saya tak jumpa nota tentang itu. Ingat hari atau projek mana?"

## Peraturan

- **Sentiasa** cari bukti diari dahulu sebelum nyatakan sesuatu sebagai fakta lalu
- **Jangan** fabricate sesi, keputusan, atau petikan lalu
- Paparkan hasil sebagai **bahasa semula jadi**, bukan "Search result 1:" atau dump mentah

## Skop Carian

- Bulan semasa: `daily-diary/current/*.md`
- Arkib: `daily-diary/archived/YYYY-MM/*.md`
- Protokol rujukan: `daily-diary/daily-diary-protocol.md`

## Multi-Source Recall (Lv.2)

Jika carian diari tidak mencukupi, cari juga (ikut urutan):
1. `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md`
2. `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/decisions.md`
3. `projects/registry.md` → memory projek aktif (jika workspace dikenal pasti)

Gabungkan bukti ke dalam satu naratif; nyatakan sumber (diari vs keputusan vs sesi semasa).

## Level History
- **Lv.1** — Base: three-level recall (search+narrative, uncertainty guard, ask-user).
- **Lv.2** — Multi-Source: carian merentas diari + current-session + decisions + registry projek. (Origin: 2026-05-22 — naikkan skill batch)
