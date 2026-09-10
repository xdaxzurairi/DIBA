---
name: dispatching-parallel-agents
description: "Guna bila DIBA kesan 2+ task bebas (tiada dependency antara satu sama
             lain) yang boleh jalan serentak sebagai subagent berasingan — bukan
             sekadar parallel tool calls dalam satu respons. Beza dengan auto-worker
             Lv.2 (Parallel Lanes, dalam satu agent) — skill ini untuk spawn subagent
             sebenar (Task/Agent tool) bila kerja cukup besar untuk isolated context."
---

# Dispatching Parallel Agents — Subagent Fan-Out
*Bila kerja boleh dipecah tanpa dependency, jangan buat berturutan — dispatch serentak.*

## Activation

Bila skill ini aktif, kenal pasti task independen, dispatch sebagai subagent berasingan dalam SATU respons/blok (bukan sequential calls), kemudian synthesize hasil.

---

## Context Guard

| Context | Status |
|---------|--------|
| **2+ task jelas independen, masing-masing perlukan exploration/context berasingan** | ACTIVE — dispatch parallel |
| **Task saling bergantung (output A jadi input B)** | DORMANT — jalankan berjujukan, jangan paksa parallel |
| **Task kecil/jelas, satu agent cukup** | DORMANT — jangan over-spawn, guna auto-worker biasa |
| **Kerja dalam satu fail/domain sempit** | DORMANT — parallel tool calls (Read/Grep) memadai, tak perlu subagent |

---

## Bila Layak Dispatch (semua mesti benar)

- [ ] Task-task tidak share state/context yang perlu synced real-time
- [ ] Setiap task ada objektif tajam dan boleh diverifikasi berasingan
- [ ] Overhead spawn subagent < manfaat (masa/context window yang dijimatkan)
- [ ] Synthesis hasil akhir kekal di tangan DIBA utama — subagent tak buat keputusan akhir

Jika mana-mana gagal → jangan dispatch; jalankan sebagai satu aliran atau guna `auto-worker` Parallel Lanes (dalam-agent) sahaja.

---

## Protocol

### Step 1: Decompose & Confirm Independence
- [ ] Senaraikan task calon
- [ ] Semak dependency graph — ada anak panah antara task? → itu bukan calon parallel
- [ ] Kekal hanya task yang benar-benar bebas

### Step 2: Brief Setiap Subagent
Untuk setiap subagent, sediakan brief lengkap (subagent tiada konteks perbualan):
- Objektif tajam (apa nak dicapai)
- Skop fail/domain (apa yang boleh disentuh)
- Tahap thoroughness diperlukan
- Format output yang diharap balik

### Step 3: Dispatch Serentak
- [ ] Semua panggilan subagent dalam SATU blok/respons — bukan satu-satu tunggu balas
- [ ] Jangan dispatch subagent untuk task yang DIBA sendiri boleh selesai lebih cepat terus

### Step 4: Terima & Verify Hasil
- [ ] Semak setiap hasil subagent — jangan terus percaya tanpa semak (subagent describe niat, bukan semestinya hasil sebenar)
- [ ] Jika hasil subagent conflict dengan yang lain, resolve sebelum synthesize

### Step 5: Synthesize
- [ ] Gabungkan hasil semua subagent jadi satu output koheren untuk Abam
- [ ] Jangan dump hasil mentah setiap subagent berasingan — synthesize, bukan senarai

---

## Mandatory Rules

1. **Dependency check dahulu** — jangan parallel task yang saling bergantung
2. **Jangan over-spawn** — task kecil/jelas tak perlu subagent berasingan
3. **Brief lengkap** — subagent tiada memori perbualan, mesti self-contained
4. **Verify sebelum synthesize** — hasil subagent bukan automatik benar
5. **Synthesis kekal di DIBA utama** — subagent bantu kumpul/analisa, bukan keputusan akhir

---

## Integrasi

| Skill | Hubungan |
|-------|----------|
| `auto-worker` Lv.2 (Parallel Lanes) | Untuk langkah independen DALAM satu agent (tool calls) — tak perlukan subagent berasingan |
| `orchestrate` | Orchestrate = full lifecycle (plan→delegate→verify→synthesize); skill ini fokus khusus pada momen "dispatch serentak" |
| `discipline` | UU-3 Minimum Impact — jangan spawn subagent melebihi keperluan sebenar |

---

## Level History
- **Lv.1** — Base: context guard kelayakan dispatch, decompose+brief+dispatch+verify+synthesize protocol, beza jelas dengan auto-worker Parallel Lanes. (Origin: 2026-08-01 — CLAUDE.md rujuk skill ini tapi fail tiada, dicipta untuk tutup gap)
- **Lv.2** — Proactive Detection: DIBA sendiri kesan 2+ task independen semasa breakdown kerja tanpa Abam explicitly minta parallel, terus tawar dispatch. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
- **Lv.3** — Adaptive Brief: brief subagent auto-scale ikut tier `smart-effort` task induk (Simple/Medium/Hard), bukan template brief seragam. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
- **Lv.4** — Orchestrate Integration: dispatch jadi sub-step formal dalam `orchestrate` Orchestration Loop Step 5 (Delegate), synthesis kekal center di orchestrate bila skop besar. (Origin: 2026-07-31 — upskill batch Lv1-3→Lv4, arahan Abam)
