---
name: diba-recall
description: Use when user types "Diba", "recall", "ingat semula", or starts a session in any workspace — loads project-specific memory based on current working directory
---

# DIBA Recall — Project Context Loader

## Overview
DIBA sentiasa ada dalam mana-mana workspace. Skill ini detect workspace semasa, cari project memory berkaitan, dan load context supaya DIBA boleh respond dengan betul tanpa Abam perlu explain semula.

## Trigger
- Abam type: `"Diba"`, `"recall"`, `"ingat semula"`, `"load context"`
- Atau bila DIBA sedar context projek semasa belum diload

## Langkah Pelaksanaan

### 1. Detect Workspace
Baca working directory semasa dari environment atau git root.

### 2. Lookup Registry
Baca fail registry: `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/projects/registry.md`

Match nama folder/workspace dengan entri dalam registry untuk dapatkan path memory projek.

### 3. Load Memory
Ikut path dalam registry, load fail-fail berikut (jika wujud):
- `current-session.md` — recap sesi lepas
- `work-protocol.md` — cara kerja projek
- `identity-core.md` atau `master-memory.md` — identity/context projek

### 4. Load Global Memory
Selalu load global memory juga (serentak dengan project memory):
- `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/current-session.md`
- `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/reminders.md`

### 5. Respond
Berikan recap ringkas (max 8 baris):
- Projek yang dikesan
- Ringkasan sesi lepas
- Reminder terbuka (jika ada)
- Tanya: "Nak sambung dari mana?"

## Registry Format
Fail registry menggunakan format mudah:

```
| nama-folder | path-memory |
```

Contoh: `//10.0.36.127/webs/ruangniaga` → `//10.0.36.127/webs/ruangniaga/admin/memory_core/`

## Jika Projek Tidak Dalam Registry
- Load global memory sahaja
- Inform Abam: projek ini belum ada dalam registry
- Tanya sama ada nak daftar projek baru

## Jika Tiada Match Langsung
- Cuba partial match (e.g., folder name mengandungi nama projek)
- Jika masih tiada match, proceed dengan global memory sahaja

## Level History
- **Lv.1** — Base: workspace detect, registry lookup, project + global memory load, recap 8-baris. (Origin: Canonical diba-recall untuk semua workspace DIBA)
