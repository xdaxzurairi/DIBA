---
name: post-mortem
description: "Triggers when user says 'post-mortem', 'postmortem', 'log this failure',
             'write a post-mortem', 'what went wrong', 'apa yang salah', 'log kegagalan ini'.
             Also auto-detects failure signals: deployment crashes, test regressions,
             architecture reversals, wasted time on dead ends, security incidents, data loss.
             On detection, AI asks whether it's worth logging."
---

# Post-Mortem — Failure Learning System
*Kegagalan yang tidak direkod akan berulang. Kegagalan yang direkod menjadi pelajaran.*

## Activation

When this skill activates, output:

"Merekod kegagalan untuk pembelajaran..."

Then immediately execute Step 1 of Protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "post-mortem", "postmortem"** | ACTIVE — mula format terus |
| **Abam kata "log this failure", "log kegagalan ini"** | ACTIVE — mula format terus |
| **Abam kata "what went wrong", "apa yang salah"** | ACTIVE — tanya sama ada nak log |
| **AI kesan signal kegagalan deployment** | ACTIVE — tanya: "Worth a post-mortem?" |
| **AI kesan signal test regression** | ACTIVE — tanya: "Worth a post-mortem?" |
| **AI kesan signal architecture reversal** | ACTIVE — tanya: "Worth a post-mortem?" |
| **AI kesan masa terbuang pada dead end** | ACTIVE — tanya: "Worth a post-mortem?" |
| **AI kesan security incident** | ACTIVE — tanya: "Worth a post-mortem?" |
| **AI kesan data loss** | ACTIVE — tanya: "Worth a post-mortem?" |
| **Abam kata "tidak" / "no" selepas ditanya** | EXIT — gerak ke hadapan, tiada log dicipta |
| **Task biasa berjaya tanpa insiden** | DORMANT — tiada auto-detection |

---

## Protocol

### Step 1: Detect or Receive Trigger
- [ ] Parse sama ada ini **manual trigger** (Abam kata "post-mortem" secara eksplisit) atau **auto-detection** (AI kesan signal kegagalan)
- [ ] Kalau manual trigger → skip ke Step 3 terus (Abam sudah decide nak log)
- [ ] Kalau auto-detection → proceed ke Step 2

**Signal Auto-Detection:**

| Signal | Contoh Frasa |
|--------|-------------|
| Deployment failure | "it crashed", "pod is failing", "image pull error", "rollback", "deploy gagal" |
| Test regression | "tests are broken", "was passing before", "something broke", "test rosak" |
| Architecture reversal | "undo this", "we need to revert", "this approach doesn't work", "kena balik semula" |
| Wasted time | "wasted hours", "dead end", "that didn't work at all", "buang masa" |
| Security incident | "exposed secret", "accidentally committed", "vulnerability", "secret terdedah" |
| Data loss | "data is gone", "migration failed", "backup didn't work", "data hilang" |

### Step 2: Confirm Intent (Auto-Detection sahaja)
- [ ] Output: *"That didn't go as planned. Worth a post-mortem?"*
- [ ] Kalau Abam kata **ya** → proceed ke Step 3
- [ ] Kalau Abam kata **tidak** → gerak ke hadapan, JANGAN buat log, jangan tanya lagi dalam sesi yang sama untuk insiden yang sama
- [ ] Kalau Abam tidak respond → jangan assume; tunggu atau tanya sekali lagi

### Step 3: Gather Information
- [ ] Tanya soalan clarifying jika maklumat tidak cukup:
  - Apa yang berlaku secara faktual?
  - Bila ia berlaku?
  - Apa root cause yang paling mungkin?
  - Apa impaknya (masa, data, momentum)?
- [ ] Kalau Abam sudah cerita dengan detail → extract maklumat terus dari context, jangan tanya lagi
- [ ] Tentukan severity berdasarkan impak:
  - **Minor** — sedikit masa terbuang, tiada data loss, mudah dipulihkan
  - **Moderate** — beberapa jam terbuang, minor regression, deploymen gagal
  - **Major** — data loss, security breach, kehilangan momentum projek besar

### Step 4: Fill Post-Mortem Format
- [ ] Susun entry mengikut format standard:

```markdown
## YYYY-MM-DD — [Tajuk ringkas apa yang salah]
**Severity**: Minor | Moderate | Major
**Apa yang berlaku**: [Huraian faktual tentang kegagalan]
**Kenapa**: [Root cause analysis — ikut sampai punca sebenar]
**Impak**: [Apa yang hilang — masa, data, momentum, kepercayaan]
**Pelajaran**: [Insight reusable untuk kerja masa depan]
**Pencegahan**: [Tindakan spesifik untuk cegah recurrence]
```

- [ ] Pastikan **Pencegahan** adalah actionable dan spesifik — bukan "lebih berhati-hati"
- [ ] Pastikan **Pelajaran** adalah reusable — sesuatu yang berguna dalam konteks lain juga

### Step 5: Append to Log
- [ ] Buka `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/post-mortems.md`
- [ ] Append entry baru di hujung fail — JANGAN edit atau padam entries lama
- [ ] Verify entry berjaya ditulis
- [ ] Catat domain projek dalam entry untuk future reference lookup

### Step 6: Confirm and Surface Lesson
- [ ] Report kepada Abam: "Post-mortem direkod: [tajuk] ([severity])"
- [ ] Highlight lesson dan prevention secara ringkas
- [ ] Tanya: "Ada tindakan immediate yang perlu dibuat dari ini?"
- [ ] Trigger `log-decision` jika kegagalan mencetuskan keputusan teknikal atau arah baharu

---

## Domain Reference Behavior

Bila memulakan kerja dalam domain yang ada post-mortem lalu:
- [ ] Semak `C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/post-mortems.md` untuk entries yang relevan
- [ ] Flag: "Peringatan: [lesson] — lihat post-mortem [tarikh]"
- [ ] Jika jenis failure yang sama muncul 2+ kali — flag sebagai **recurring pattern**, escalate kepada Abam

---

## Post-Mortem Format (Full Reference)

```markdown
## YYYY-MM-DD — [Tajuk ringkas]
**Severity**: Minor | Moderate | Major
**Apa yang berlaku**: [Huraian faktual]
**Kenapa**: [Root cause]
**Impak**: [Apa yang hilang]
**Pelajaran**: [Insight reusable]
**Pencegahan**: [Tindakan spesifik]
```

**Prinsip format:**
- **No blame** — ini adalah learning tool, bukan hukuman
- **Append-only** — JANGAN rewrite atau padam entries
- **Honest** — kalau ia adalah kesilapan, kata dengan jelas
- **Actionable** — setiap entry MESTI ada Pencegahan yang boleh dilaksanakan

---

## Mandatory Rules

1. **No blame** — post-mortem adalah untuk belajar, bukan menghukum; framing mesti neutral dan faktual
2. **Append-only** — JANGAN SEKALI-KALI edit atau padam entries lama dalam post-mortems.md
3. **Honest assessment** — kalau ia adalah kesilapan DIBA atau Abam, rekod dengan jelas tanpa spin
4. **Actionable prevention** — setiap entry MESTI ada Pencegahan yang spesifik dan boleh dilaksanakan; "lebih berhati-hati" tidak diterima
5. **Abam yang decide** — auto-detection hanya tanya; JANGAN buat log tanpa kelulusan eksplisit Abam
6. **Domain tagging** — sentiasa rekod domain projek dalam entry supaya future reference boleh difilter
7. **Satu insiden, satu entry** — jangan gabungkan beberapa insiden dalam satu entry; rekod secara berasingan
8. **Severity adalah consistent** — guna takrifan Minor/Moderate/Major yang konsisten, bukan subjektif
9. **Verify sebelum confirm** — pastikan entry betul-betul ditulis ke fail sebelum report "direkod"
10. **Surface bila relevan** — bila domain yang sama dibuka semula, auto-reference past post-mortems yang berkaitan

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Abam tolak log selepas ditanya** | Gerak ke hadapan, tiada log; jangan tanya lagi dalam sesi yang sama |
| **post-mortems.md tidak wujud** | Buat fail baru dengan header kosong, kemudian append entry |
| **Maklumat tidak cukup untuk entry lengkap** | Tanya soalan clarifying yang spesifik — jangan buat entry separuh siap |
| **Kegagalan yang sama berlaku buat kali kedua** | Flag sebagai recurring dalam entry baru; reference entry pertama |
| **Abam tak pasti severity** | Cadang severity berdasarkan impak yang dihuraikan, tanya Abam untuk confirm |
| **Multiple insiden dalam satu sesi** | Rekod sebagai entries berasingan; jangan gabungkan |
| **Insiden melibatkan data sensitif** | Rekod lesson dan prevention tanpa detail sensitif dalam log |
| **Abam mahu edit entry lama** | Beritahu append-only rule; cadang buat entry baru sebagai "correction" atau "update" |
| **Domain tidak jelas** | Tanya Abam domain projek sebelum save entry |
| **Post-mortem dicetuskan oleh third-party failure** | Rekod dengan jelas bahawa root cause adalah external; fokus prevention pada mitigation |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `session-briefing` | Awal sesi dalam domain yang ada post-mortem | Flag entries yang relevan sebagai peringatan |
| `observation` | Semasa Survey — domain lesson check | Cross-reference projek terhadap post-mortem yang ada |
| `log-decision` | Bila post-mortem mencetuskan keputusan teknikal | Auto-log keputusan yang lahir dari learning |
| `save-diary` | Selepas post-mortem direkod | Reference entry dalam diary sesi hari tersebut |
| `forge-skill` | Bila post-mortem reveal gap dalam skill sedia ada | Cadang level-up atau skill baru untuk cegah recurrence |
| `library` | Bila lesson boleh dijadikan reusable pattern | Save insight sebagai library entry untuk rujukan |

---

## Level History

- **Lv.1** — Base: manual trigger + append ke log. (Origin: XDIBAX failure learning protocol)
- **Lv.2** — Auto-detection: kesan failure signals secara pasif + prompting kepada user. (Origin: Pattern detection dari sesi production)
- **Lv.3** — Domain reference: flag relevant post-mortems pada session start atau task start. (Origin: Recurring failure pattern yang perlu diberi amaran awal)
- **Lv.4** — Superultra: Protocol dikembangkan kepada 6 langkah bernombor dengan checklist, Context Guard ditambah EXIT row, Mandatory Rules dikembangkan kepada 10 peraturan, edge cases dikembangkan kepada 10 baris, Integrasi Skill table ditambah dengan 6 integrasi, format post-mortem distandard dalam Bahasa Melayu, domain tagging ditambah, recurring pattern detection dimasukkan dalam Domain Reference Behavior, path dikemaskini kepada absolute path. (2026-05-19)


---
*[[Feature/INDEX|Feature Index]] · [[HOME|HOME]] · [[main/main-memory|main-memory]]*
