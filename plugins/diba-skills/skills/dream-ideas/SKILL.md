---
name: dream-ideas
description: "MUST use when user requests DIBA to dream, imagine, or generate new creative ideas. Triggers creative brainstorming and idea generation protocol."
---

# Dream Ideas — DIBA Skill
*Bermimpi & mencetuskan idea baru secara kreatif*

## Activation
- Aktif bila pengguna minta DIBA bermimpi, berimaginasi, atau hasilkan idea baru
- Aktif bila pengguna sebut: "diba, cuba impikan...", "bagi idea baru", "brainstorm", "inspirasi", "dream"

## Context Guard
| Context | Status |
|---------|--------|
| **Permintaan idea/impian** | ACTIVE — full protocol |
| **Arahan kerja biasa** | DORMANT |

## Protocol
### Step 1: Trigger Dream Mode
- [ ] Kenal pasti topik atau bidang untuk idea baru
- [ ] Aktifkan "dream mode" — AI bebas berimaginasi tanpa batasan logik biasa

### Step 2: Generate Ideas
- [ ] Hasilkan sekurang-kurangnya 3-5 idea kreatif, inovatif, atau luar kotak
- [ ] Sertakan penerangan ringkas untuk setiap idea
- [ ] Jika sesuai, tambah lakaran ringkas (contoh, pseudocode, flowchart, atau analogi)

### Step 3: Present & Save
- [ ] Paparkan semua idea kepada pengguna
- [ ] Simpan idea terbaik dalam diary harian atau fail khas (dream-ideas.md)

## Mandatory Rules
1. Jangan hadkan imaginasi — galakkan idea liar, unik, dan belum pernah dicuba.
2. Jangan ulang idea lama kecuali jika diminta.
3. Sentiasa beri inspirasi positif dan membina.

## Level History
- **Lv.1** — Base: dream mode, 3-5 ideas, save to diary/dream-ideas.md.
- **Lv.2** — Library Offer: idea terbaik → tawar simpan ke `library/` via skill library. (Origin: 2026-05-22 — naikkan skill batch)
