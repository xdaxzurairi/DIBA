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
