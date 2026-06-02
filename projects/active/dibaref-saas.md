# RecallRef — Citation SaaS (Clip + LR Matrix)

**Status:** Active — MVP planning  
**Owner:** Abam Zue (CEO) / DIBA (COO)  
**Company:** XDIBAX Innovation  
**Started:** 2026-05-24  
**Origin:** Dream + Resonance session → CiteStream (#1), rebrand tanpa "DIBA" dalam nama

---

## Nama & Tagline

| | |
|---|---|
| **Product** | **RecallRef** *(cadangan utama)* |
| **Meaning** | Recall your references — fast, smart, connected |
| **Tagline** | *Collect smart. Recall faster. Cite with confidence.* |
| **Alt BM** | *Kumpul pintar. Ingat cepat. Sitasi yakin.* |

### Alternatif nama (tiada "DIBA")
| Nama | Vibe |
|------|------|
| **RecallRef** | Intelligent recall — kuat untuk PhD |
| **RefNest** | Kumpul & susun ref macam nest |
| **LitVault** | Literature vault — serious academic |
| **SumberLit** | BM-English, mesra IPTA Malaysia |

> **Nota:** DNA DIBA embedded dalam **filosofi & feature**, BUKAN branding nama.

---

## DNA DIBA — Embedded (Invisible Brand Layer)

Setiap feature map ke kebolehan DIBA — **tanpa sebut DIBA** dalam UI/marketing:

| DNA | Dalam RecallRef | Feature MVP |
|-----|-----------------|-------------|
| **D** — Dynamic Learning | App belajar tag/nota ikut pattern baca user | Auto-suggest tags + matrix columns |
| **I** — Intelligent Recall | Cari ref ikut ingatan semula jadi | Semantic search + smart filters |
| **B** — Brain-like Memory | Paper saling link — bukan folder flat | Ref graph + "related to this" |
| **A** — Adaptive Assistant | Adapt format faculty, BM/EN, citation style | Profile: uni + faculty + APA/IEEE |

### Prinsip Produk
- **No fake refs** — setiap citation traceable ke sumber (DOI/URL/PDF)
- **No hallucinated metadata** — extract dulu, user confirm bila low confidence
- **Privacy-first** — data student milik student; export anytime

---

## MVP Scope (Phase 1)

### Core Loop
```
Clip (URL/DOI/PDF) → Auto metadata → LR Matrix → Export (BibTeX/Word/CSV)
```

### Features
1. **Browser clipper** — Scholar, Scopus, PubMed, generic URL
2. **LR Matrix** — columns: Author | Year | Title | Method | Finding | Gap | Notes | Tags
3. **Project workspace** — satu project = satu thesis/proposal
4. **Export** — APA 7, IEEE, CSV, BibTeX
5. **MY templates** — preset UiTM / UM / USM thesis format (Phase 1.5)

### Out of Scope (Phase 2+)
- Supervisor portal
- Gap detection AI
- Chapter mapping (ThesisVault merge)
- Mobile app

---

## SaaS Model

| Tier | Harga | Limit |
|------|-------|-------|
| **Free** | RM0 | 30 refs, 1 project, basic export |
| **Student Pro** | RM19/bulan | Unlimited refs, 5 projects, all styles |
| **PhD Pro** | RM29/bulan | Unlimited + matrix templates + priority sync |
| **Faculty** | RM499/sem | Bulk seats, supervisor dashboard (Phase 2) |

---

## Tech Stack (Cadangan)

| Layer | Choice | Sebab |
|-------|--------|-------|
| Frontend | Next.js 15 + Tailwind | SaaS-ready, fast UI |
| Backend/DB | Supabase | Auth, Postgres, RLS, realtime |
| Extension | Chrome MV3 | Clip from browser |
| Metadata | CrossRef + OpenAlex API | Free, reliable DOI resolve |
| Hosting | Vercel + Supabase cloud | Low ops untuk MVP |

---

## Success Criteria (MVP)

- [ ] Clip 1 URL → metadata populated < 5 saat
- [ ] LR matrix view dengan sort/filter
- [ ] Export CSV + BibTeX berfungsi
- [ ] Auth + 1 project free tier enforced
- [ ] Landing page + waitlist live

---

## Next Actions

1. ~~Abam pilih nama final~~ → **RecallRef confirmed**
2. ~~DIBA scaffold repo~~ → Done at `C:/Users/Administrator/xdibax/recallref`
3. Setup Supabase + run migration `001_initial.sql`
4. Wire waitlist form → Supabase
5. Auth + real LR matrix CRUD


---
**See also:** [[projects/project-list|project-list]] · [[daily-diary/current/2026-05-24|diary 2026-05-24]] · [[main/decisions|decisions]] · [[company/xdibax-profile|xdibax innovation]]
