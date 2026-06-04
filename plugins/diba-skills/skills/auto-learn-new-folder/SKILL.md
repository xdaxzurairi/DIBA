---
name: auto-learn-new-folder
description: "MUST use when a new folder is detected in the workspace. Triggers automatic reading, structure analysis, and learning of development patterns before any major or minor changes are made."
---

# Project Explorer — Kaji Dahulu, Ubah Kemudian
Skill ini memastikan Claude sentiasa memahami konteks penuh sesebuah projek sebelum menyentuh mana-mana fail. Ia seperti kontraktor berpengalaman yang meninjau bangunan dahulu sebelum memulakan kerja renovasi.

## 🚦 Bila Skill Ini Diperlukan
Aktifkan skill ini apabila:
- Folder atau projek baru dimuatnaik ke workspace
- Pengguna meminta sebarang perubahan pada fail yang belum dikaji
- Ada path baru di /mnt/user-data/uploads/ yang mengandungi projek
- Pengguna menyebut: "tolong edit", "tambah feature", "fix bug", "ubah", "refactor", "update"

## 📋 Proses Wajib: 5 Fasa Penerokaan

### Fasa 1 — Pemetaan Struktur Asas
- Jalankan arahan untuk lihat struktur folder (2-3 tahap dahulu)
- Kenal pasti jenis projek, bahasa utama, framework

### Fasa 2 — Baca Fail Konfigurasi & Manifes
- Baca package.json, requirements.txt, pyproject.toml, Cargo.toml, go.mod, pom.xml, composer.json
- Baca .env.example, docker-compose, Dockerfile, README
- Kumpul maklumat versi, skrip, env, arahan setup

### Fasa 3 — Analisis Arkitektur & Konvensyen
- Lihat folder utama lebih terperinci
- Cari fail konfigurasi framework (next.config.js, vite.config.ts, webpack.config.js, tsconfig.json, eslint, tailwind)
- Fahami pola: layout, penamaan, import style, state management, API layer, testing

### Fasa 4 — Baca Contoh Kod Sedia Ada
- Cari & baca 3-5 fail kod utama (komponen, modul, controller, dsb.)
- Perhatikan gaya penulisan, import/export, error handling, typing, komen, API call

### Fasa 5 — Ringkasan & Pengisytiharan Siap
- Sampaikan ringkasan projek kepada pengguna sebelum buat perubahan
- Laporan mesti merangkumi: jenis projek, stack teknologi, struktur folder, konvensyen kod, perkara penting, pengesahan sedia ubah

## 🚫 Peraturan Mutlak
- JANGAN buat sebarang perubahan sebelum Fasa 1-4 selesai
- JANGAN assume framework atau konvensyen — sentiasa semak fail sebenar
- JANGAN ikut gaya lama Claude atau gaya default — ikut gaya projek yang ada
- JANGAN tambah library baru tanpa mengesahkan ia belum ada dalam dependency
- SENTIASA kekal konsisten dengan corak sedia ada dalam projek

## 🔄 Untuk Perubahan Seterusnya dalam Sesi Yang Sama
- Rujuk semula ringkasan yang telah dibuat
- Semak fail yang akan diubah sebelum edit
- Pastikan perubahan konsisten dengan gaya projek
- Jika projek BERBEZA diperkenalkan → ulang semua 5 fasa dari awal

## 📚 Rujukan Tambahan
- references/patterns.md — Panduan corak framework popular
- references/checklist.md — Senarai semak ringkas

## ⚡ Mod Pantas (Jika Projek Kecil < 10 Fail)
- Lihat semua fail, baca fail utama sekaligus, ringkaskan dapatan, teruskan perubahan

## Registry Hook (Lv.2)

Selepas Fasa 5, semak `projects/registry.md`:
- Jika workspace belum didaftarkan, cadangkan entri baharu kepada user
- Jika ada `memory_core/` atau `admin/memory_core/` dalam projek, catat path dalam cadangan registry

## Level History
- **Lv.1** — Base: 5-phase exploration, mod pantas, peraturan mutlak jangan ubah sebelum kaji.
- **Lv.2** — Registry Hook: cadang/update registry selepas eksplorasi projek baharu. (Origin: 2026-05-22 — naikkan skill batch)
