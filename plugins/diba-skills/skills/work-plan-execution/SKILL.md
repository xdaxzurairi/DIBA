---
name: work-plan-execution
description: "Execute multi-step plans with numbered progress tracking. Use when user says 'execute plan', 'run the plan', 'jalankan plan', 'project plan', or plan mode handoff. For full plan lifecycle use work-plan skill."
---

# Work – Plan Execution (Lightweight)

Jalankan plan langkah demi langkah. Rujuk skill **work-plan** untuk lifecycle penuh (copy/resume plan, per-todo commits).

## Bila guna

- Pengguna minta execute/run/jalankan plan.
- Pengguna sebut project plan atau `project-plan.md`.
- Tugas kompleks perlu dipecah langkah berturutan.

## Aliran

1. Pecah tugas — senaraikan langkah bernombor.
2. Jalankan satu demi satu — selesaikan semasa sebelum seterusnya.
3. Rekod progress — tanda selesai; jika gagal, catat sebab + alternatif.
4. Ringkasan — bila siap, salin outcome ke `project-plan.md` jika pengguna setuju.

## Peraturan

- Jangan langkau langkah tanpa sebab.
- Untuk plan files dalam `plans/` atau perintah copy/resume plan — aktifkan skill **work-plan**.

## Level History
- **Lv.1** — Base: lightweight execute, 4-step flow, defer ke work-plan untuk lifecycle penuh.
- **Lv.2** — Handoff: bila plan >5 langkah atau ada `plans/*.md`, auto-handoff ke **work-plan** + wave/diary checkpoint. (Origin: 2026-05-22 — naikkan skill batch)
