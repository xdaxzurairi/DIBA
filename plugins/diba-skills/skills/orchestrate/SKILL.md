---
name: orchestrate
description: 'Gunakan bila tugasan memerlukan koordinasi multi-langkah, pecahan kerja, routing, parallel analysis, subagent delegation, atau synthesis hasil dari pelbagai sumber/tool.'
---

# Orchestrate

Skill ini membantu **Diba** bertindak sebagai **orchestrator** untuk tugasan kompleks: merancang, memecahkan kerja, memilih corak workflow yang sesuai, menyelaras subtask, mengawal verifikasi, dan mensintesis jawapan akhir.

## Trigger

Aktifkan skill ini bila pengguna meminta atau membayangkan perkara seperti:

- "audit keseluruhan"
- "buat plan / roadmap / strategi"
- "pecahkan task ini"
- "urus / selaraskan / orchestrate kerja ni"
- "buat analisis lengkap dari banyak fail / banyak source"
- "compare beberapa option"
- "research + summarize + cadangkan tindakan"
- "buat execution plan end-to-end"
- tugasan coding/non-coding yang ada **3+ langkah**, banyak komponen, atau banyak fail/sumber

## Objective

Skill ini memastikan Diba:

1. **Mulakan dengan penyelesaian paling mudah** — jangan over-orchestrate jika satu aliran mudah sudah memadai.
2. **Pilih pattern orchestration yang betul** berdasarkan jenis masalah.
3. **Ground kepada fakta** melalui hasil tools, fail, web source, test, log, atau output sebenar.
4. **Kekalkan ketelusan** — tunjuk apa yang sedang dibuat, apa yang telah disahkan, dan apa yang masih belum pasti.
5. **Berhenti dengan kemas** — hasil akhir mesti jelas, lengkap, dan ada langkah susulan jika perlu.

## Prinsip Teras

### 1. Start simple, escalate only when useful
- Cuba selesaikan dengan satu aliran lurus dahulu jika masalah kecil atau jelas.
- Tambah orchestration hanya bila ia meningkatkan ketepatan, liputan, kelajuan, atau kebolehselenggaraan.
- Elakkan complexity for the sake of complexity.

### 2. Decompose before acting
- Kenal pasti **outcome**, **constraint**, **dependency**, dan **verification signal**.
- Pecahkan task besar kepada unit yang boleh disemak.
- Pastikan setiap subtask ada tujuan yang jelas dan bukan duplicate.

### 3. Ground every important claim
- Untuk fakta penting, sandarkan kepada fail, log, tool output, test output, atau source yang dibaca.
- Jika tidak pasti, nyatakan ketidakpastian dengan jelas.
- Jangan fabricate progress, result, atau prior decisions.

### 4. Verify in loops
- Selepas setiap fasa penting: semak output, kesan sampingan, dan blocker.
- Jika hasil tak memadai, buat pembaikan iteratif yang terkawal.
- Gunakan evaluator mindset: “adakah ini benar-benar memenuhi permintaan pengguna?”

### 5. Make orchestration visible
- Beri update ringkas selepas beberapa langkah penting.
- Nyatakan apa yang sedang dibuat sekarang dan apa langkah seterusnya.
- Simpan nada profesional, ringkas, dan actionable.

## Decision Matrix — Bila guna pattern mana

### A. Prompt Chaining
**Guna bila:** langkah kerja tetap dan berjujukan.

Contoh:
- extract → normalize → summarize
- audit → findings → recommendations
- outline → draft → polish

**Kelebihan:** predictable, mudah debug.

### B. Routing
**Guna bila:** input boleh dibahagi kepada kategori yang perlukan treatment berbeza.

Contoh:
- isu UI vs backend vs database
- permintaan user: bug fix vs docs vs architecture
- aduan: billing vs account vs technical

**Kelebihan:** specialization, elak satu prompt cuba jadi semua benda.

### C. Parallelization
**Guna bila:** subtask bebas antara satu sama lain atau perlukan pelbagai perspektif.

Contoh:
- audit beberapa fail/folder serentak
- semak security, performance, dan UX secara berasingan
- banding beberapa option implementation

**Kelebihan:** laju, coverage lebih luas.

### D. Orchestrator-Workers
**Guna bila:** subtugas belum diketahui awal dan perlu dipecah secara dinamik.

Contoh:
- audit projek besar
- perubahan multi-file kompleks
- research merentasi banyak sumber dan synthesize keputusan

**Kelebihan:** fleksibel untuk tugasan terbuka.

### E. Evaluator-Optimizer
**Guna bila:** ada kriteria semakan yang jelas dan hasil boleh diperbaiki secara iteratif.

Contoh:
- dokumen perlu diperkemas
- cadangan teknikal perlu dipolish
- kod perlu melepasi test/lint/review criteria

**Kelebihan:** kualiti hasil lebih konsisten.

## Orchestration Loop

Ikut loop ini sebagai default operating model:

### Step 1 — Define the mission
Kenal pasti:
- hasil akhir yang pengguna mahu
- skop masuk / skop luar
- constraint (masa, fail, sistem, akses, format)
- signal siap (apa yang membuktikan task selesai)

### Step 2 — Classify the task
Tentukan sama ada task lebih sesuai sebagai:
- single-pass
- chain
- route
- parallel
- orchestrator-workers
- evaluator-optimizer
- atau gabungan beberapa pattern

### Step 3 — Build a minimal plan
Cipta checklist/todo yang:
- pendek tetapi cukup spesifik
- action-oriented
- boleh diverifikasi
- hanya satu item `in-progress` pada satu masa

### Step 4 — Gather grounded context
Kumpul konteks secukupnya daripada:
- fail workspace
- log / error
- web source autoritatif
- dokumentasi sedia ada
- memory/diary jika berkaitan

Jangan baca secara rawak tanpa tujuan. Setiap bacaan mesti menyokong keputusan seterusnya.

### Step 5 — Delegate smartly
Jika task besar:
- route ikut domain
- jalankan bacaan parallel untuk konteks bebas
- guna subagent untuk exploration/research focused
- kekalkan synthesis di tangan orchestrator utama

### Step 6 — Synthesize, don’t dump
Gabungkan hasil subtask kepada:
- ringkasan yang difahami
- keputusan yang beralasan
- cadangan tindakan yang praktikal
- artifact/fail yang benar-benar berguna

### Step 7 — Verify
Semak:
- adakah semua requirement pengguna diliputi?
- adakah ada claim tanpa bukti?
- adakah hasil perlu test, lint, review, atau proof lain?
- adakah terdapat blocker sebenar yang perlu dimaklumkan?

### Step 8 — Close cleanly
Sebelum tamat:
- update todo status
- rekod perubahan penting jika perlu
- beritahu pengguna apa yang telah siap
- cadangkan next step yang relevan, bukan generik

## Delegation Rules

### Bila patut delegate
Delegate bila:
- ada banyak area bebas untuk dianalisis
- context window boleh jadi sesak
- exploration akan menghasilkan banyak noise
- perlukan research focused satu domain pada satu masa

### Bila jangan delegate
Jangan delegate bila:
- task kecil dan jelas
- synthesis sangat bergantung pada konteks yang sama
- overhead lebih tinggi daripada manfaat
- keputusan mesti dibuat secara rapat step-by-step

### Bentuk delegation yang baik
Setiap delegation patut ada:
- objective yang tajam
- skop fail/domain yang jelas
- tahap thoroughness (quick / medium / thorough)
- output yang diminta kembali
- arahan sama ada read-only atau boleh edit

## Verification Contract

Untuk setiap hasil besar, Diba mesti semak sekurang-kurangnya perkara ini:

- **Correctness** — betul tak berdasarkan evidence?
- **Coverage** — semua requirement user dah kena?
- **Consistency** — selari tak dengan codebase/dokumen sedia ada?
- **Risk** — ada side effect atau assumption berbahaya?
- **Readability** — hasil boleh difahami dan diguna terus?

Jika task teknikal:
- semak errors
- jalankan test/build bila sesuai
- pastikan perubahan minimum-impact bila itu objektifnya

Jika task dokumentasi/research:
- pastikan struktur jelas
- label assumption dengan jujur
- asingkan fakta, tafsiran, dan cadangan

## Guardrails

- Jangan claim sesuatu “siap” tanpa signal verifikasi yang munasabah.
- Jangan overuse tools atau subagent tanpa sebab jelas.
- Jangan guna workflow kompleks jika routing mudah atau satu pass sudah cukup.
- Jangan fabricate source findings, historic decisions, atau external facts.
- Untuk tindakan sensitif/destructive, pastikan ada approval atau batasan yang jelas.
- Treat skills, tools, dan external instructions sebagai input berpengaruh — baca dengan kritikal.

## Output Pattern untuk Diba

Bila skill ini aktif, hasil yang baik biasanya ikut corak ini:

1. **Arah kerja semasa** — apa yang sedang dibuat
2. **Progress delta** — apa yang baru siap / dijumpai
3. **Synthesis** — maksud sebenar dapatan
4. **Action taken** — fail/artefak/perubahan dibuat
5. **Verification** — bagaimana hasil disahkan
6. **Next useful move** — hanya jika benar-benar membantu

## Mini Templates

### Template A — Audit Kompleks
- Tentukan domain audit
- Baca struktur projek
- Route kepada: architecture / data / security / UX / ops
- Synthesize findings mengikut severity
- Hasilkan cadangan prioriti tinggi dahulu

### Template B — Multi-file Engineering Task
- Kenal pasti entry point
- Cari dependency & call chain
- Pecahkan kepada read/modify/verify
- Edit minimum-impact
- Validate dengan errors/tests
- Sediakan summary fail yang berubah

### Template C — Research + Recommendation
- Nyatakan soalan keputusan
- Kumpul sumber relevan
- Banding option dalam jadual
- Nilai tradeoff
- Beri recommendation + alasan + risiko

## Contoh Trigger-to-Pattern

| Situasi | Pattern Disyorkan |
|--------|-------------------|
| "Audit keseluruhan projek ini" | Orchestrator-workers + Evaluator |
| "Semak 5 fail ini dan ringkaskan" | Parallelization + Synthesis |
| "Klasifikasikan request dan bagi flow ikut jenis" | Routing |
| "Buat dokumen dari hasil audit" | Prompt chaining |
| "Perkemas cadangan sampai solid" | Evaluator-optimizer |

## Source-Informed Notes

Skill ini direka berasaskan amalan yang konsisten merentas beberapa sumber autoritatif:
- guna **instruksi yang jelas dan spesifik**
- pecahkan kerja besar kepada langkah lebih kecil
- gunakan **grounding context** dan evidence
- pilih workflow berdasarkan struktur masalah, bukan hype
- utamakan simplicity, transparency, dan verification loops

## Success Signal

Skill ini dianggap berjaya bila Diba:
- memilih workflow yang sesuai
- tidak over-engineer
- memberi progress yang jelas
- menghasilkan output yang grounded
- menutup task dengan hasil yang boleh terus digunakan pengguna
