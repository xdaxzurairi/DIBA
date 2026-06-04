# eWorks PWA System — Full Feature Upgrade Plan (FINAL & LOCKED)
**Status**: ✅ APPROVED & LOCKED | **Date**: 2026-05-15  
**Decision Maker**: Zuex (CEO) | **Owner**: DIBA (HCO)  
**Valid From**: 2026-05-15 | **Duration**: 18 weeks

---

## 🔒 PLAN APPROVAL & LOCK

```
✅ SCOPE APPROVED:   eWorks PWA (UiTM-only, no multi-tenant)
✅ FEATURES LOCKED:  3-Phase upgrade with 3 NEW features
✅ TIMELINE LOCKED:  18 weeks (Phase 1: 6w, Phase 2: 8w, Phase 3: 4w)
✅ BUDGET/TEAM:      10-staff team (NEXUS, FORGE, LENS, ORACLE, PIXEL, ECHO, CIPHER, GRID, PULSE, SAGE)
✅ GO-LIVE DATES:    Week 7 (v2.0), Week 15 (v3.0), Week 18 (v4.0)
✅ RISK MITIGATED:   See Section 5

LOCKED BY: Zuex, CEO | 2026-05-15
APPROVED BY: DIBA, HCO | 2026-05-15
```

---

## 📋 EXECUTIVE SUMMARY

### Objective
Upgrade eWorks PWA from **basic complaint system** to **intelligent, production-grade facility management platform** with:
- ✅ Modern, secure API backend (REST)
- ✅ Enhanced UX (dashboard, dark mode, responsive)
- ✅ Operational compliance (PDPA audit trail, SLA tracking)
- ✅ AI-assisted workflows (smart routing, auto-categorization)

### Scope: UiTM Only
- **NOT** a SaaS/multi-tenant expansion
- **NOT** a complete rewrite (preserve existing DB schema)
- **FOCUS**: Stability, security, user experience, operational intelligence

### Key Deliverables
| Phase | Deliverable | Version | Target |
|-------|-------------|---------|--------|
| Phase 1 | Core upgrade (API, security, modern UX) | v2.0 | Week 7 |
| Phase 2 | Advanced features (caching, audit, CI/CD) | v3.0 | Week 15 |
| Phase 3 | Intelligence layer (AI workflows, monitoring) | v4.0 | Week 18 |

---

## 📊 PHASE OVERVIEW

### PHASE 1: CORE UPGRADE (6 weeks) — **v2.0**

**Focus**: Stability + Security + Modern UX

| Feature | Owner | Weeks | Notes |
|---------|-------|-------|-------|
| REST API Layer | NEXUS | 2 | Decouple frontend/backend |
| ORM Migration | NEXUS | 2 | PDO → Eloquent (type safety) |
| JWT Auth (session hardening) | CIPHER | 1.5 | Secure sessions + refresh tokens |
| Input Validation Layer | CIPHER | 1 | Centralized sanitization |
| Design System (Tailwind) | PIXEL | 2 | Component library + consistency |
| Dashboard Redesign | PIXEL | 2 | KPI cards, real-time data |
| Mobile Responsive | PIXEL | 2 | All devices (mobile-first) |
| Docker Containerization | GRID | 1.5 | Reproducible environments |
| Unit Tests (70% coverage) | PULSE + NEXUS | 2 | Parallel with dev |
| **Phase 1 Testing + Deployment** | PULSE + GRID | 1 | UAT, production release |

**Deliverable**: Production-ready v2.0 with stable API, modern UI, secure auth

---

### PHASE 2: ADVANCED FEATURES (8 weeks) — **v3.0**

**Focus**: Efficiency + Compliance + Observability

| Feature | Owner | Weeks | Notes |
|---------|-------|-------|-------|
| Queue System (Redis/RabbitMQ) | NEXUS + GRID | 2 | Async jobs → faster UX |
| Caching Layer (Redis) | NEXUS + GRID | 1 | 3-5x faster dashboard |
| Workflow Customization | NEXUS | 2 | UiTM define approval chains |
| Dark Mode | PIXEL | 1 | Accessibility + battery saving |
| Onboarding Flow | PIXEL | 1.5 | Guide new staff |
| Audit Logging | CIPHER | 1.5 | PDPA compliance — track all actions |
| Secrets Management (Vault) | CIPHER + GRID | 1 | Secure credential storage |
| CI/CD Pipeline (GitHub Actions) | GRID | 1.5 | Auto test + deploy |
| Monitoring (Prometheus + Grafana) | GRID | 1 | Uptime, latency, errors |
| Integration Tests (API + DB) | PULSE | 2 | Workflow validation |
| Performance Testing | PULSE | 1.5 | Load test + optimization |
| **Phase 2 Testing + Deployment** | PULSE + GRID | 1 | Full UAT, production release |

**Deliverable**: Mature system v3.0 — PDPA-ready, observable, fast, customizable

---

### PHASE 3: INTELLIGENCE & SCALE (4 weeks) — **v4.0**

**Focus**: AI-Powered Operations + Production Hardening

| Feature | Owner | Weeks | Notes |
|---------|-------|-------|-------|
| Vector DB (Pinecone/Weaviate) | NEXUS + FORGE | 1 | Semantic search for complaints |
| Smart Complaint Routing | FORGE | 1.5 | Auto-route by similarity |
| Auto-Categorization | FORGE | 1.5 | ML classify complaint type |
| Chatbot Tier 1 (FAQ) | FORGE | 1.5 | Reduce manual support load |
| Response Suggestions | FORGE | 1 | AI draft replies (human review) |
| Load Balancing | GRID | 1 | Multi-instance ready |
| Blue-Green Deployment | GRID | 1 | Zero-downtime updates |
| UAT + Security Audit | PULSE + CIPHER | 2 | Final validation, penetration test |
| **Phase 3 Launch + Monitoring** | GRID + PULSE | 1 | Production go-live |

**Deliverable**: Intelligence layer v4.0 — AI-assisted ops, production-hardened

---

## 🆕 NEW FEATURES (3 Locked Features)

### Feature 1: Supervisor Digital Signature
- **What**: Supervisors sign Arahan Kerja using gesture/touch on mobile
- **Where**: Lantikan penyelia stage (Tahap 3: Planning)
- **Tech**: HTML5 Canvas + Signature Pad library
- **Storage**: PNG images in `/assets/signatures/` + audit trail in DB
- **Display**: Show in PDF Arahan Kerja + full complaint view
- **Security**: Audit trail (IP, timestamp, supervisor ID)
- **Phase**: 1 (Core)
- **Doc**: [FEATURE_SUPERVISOR_SIGNATURE.md](FEATURE_SUPERVISOR_SIGNATURE.md)

### Feature 2: 3-Photo Capture for Complaints
- **What**: Users capture 3 photos of damage area during complaint submission
- **Where**: Form aduan inisiatif (Langkah 3B: new step)
- **Tech**: Mobile camera (HTML5 `getUserMedia()`) + fallback file input
- **Compression**: Auto-compress to JPEG (< 500KB per photo)
- **Storage**: Files in `/assets/photos/complaints/` + filenames in `wr.foto1/2/3`
- **Display**: Preview in form, show in PDF report + full view
- **Features**: Capture, delete, retake, offline capability
- **Phase**: 1 (Core)
- **Doc**: [FEATURE_COMPLAINT_PHOTO_CAPTURE.md](FEATURE_COMPLAINT_PHOTO_CAPTURE.md)

### Feature 3: Enhanced Workflow (6-Stage Complaint Lifecycle)
- **What**: Formalized workflow from intake → closure with status transitions
- **Stages**: Intake (R) → Review (R) → Planning (I3→I) → Execution (HP) → Completion (Com) → Closure (FINAL)
- **Features**: Status transitions, permissions matrix, notification points, SLA tracking
- **Storage**: Audit trail in `wr_supervisor_signatures` + approval history
- **Display**: Complaint view shows full history + status timeline
- **Phase**: 1 (Core)
- **Doc**: [WORKFLOW_INTAKE_TO_CLOSURE.md](WORKFLOW_INTAKE_TO_CLOSURE.md)

---

## 📋 ACTION ITEMS (LOCKED)

### PRE-LAUNCH: Week 1 Setup

| # | Task | Owner | Deadline | Dependencies | Status |
|---|------|-------|----------|--------------|--------|
| 1 | Setup project repo & branch strategy | NEXUS + GRID | 2026-05-20 | None | 🔵 Pending |
| 2 | Create API specification (OpenAPI 3.0) | NEXUS | 2026-05-20 | None | 🔵 Pending |
| 3 | Design system framework (Figma) | PIXEL | 2026-05-27 | None | 🔵 Pending |
| 4 | ORM migration detailed plan | NEXUS | 2026-05-20 | None | 🔵 Pending |
| 5 | Security audit checklist + PDPA review | CIPHER | 2026-05-20 | None | 🔵 Pending |
| 6 | Testing framework setup (Jest, Playwright) | PULSE | 2026-05-20 | None | 🔵 Pending |
| 7 | Stakeholder kickoff (UiTM IT, facilities) | DIBA + ORACLE | 2026-05-22 | None | 🔵 Pending |
| 8 | Phase 1 sprint backlog + task breakdown | DIBA | 2026-05-22 | Tasks 1-6 | 🔵 Pending |

---

### PHASE 1: WEEKS 1-6 (Core Upgrade)

#### Sprint 1-2: Backend (Weeks 1-2)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P1-1 | API: Complaint CRUD endpoints | NEXUS | 2026-05-27 | 🔵 Pending |
| P1-2 | API: Status transition endpoints | NEXUS | 2026-05-27 | 🔵 Pending |
| P1-3 | API: Supervisor appointment endpoint | NEXUS | 2026-05-27 | 🔵 Pending |
| P1-4 | API: Digital signature endpoint | NEXUS | 2026-06-03 | 🔵 Pending |
| P1-5 | API: Photo upload endpoint | NEXUS | 2026-06-03 | 🔵 Pending |
| P1-6 | ORM: Setup Eloquent + migrations | NEXUS | 2026-05-27 | 🔵 Pending |
| P1-7 | Auth: JWT implementation + refresh tokens | CIPHER | 2026-06-03 | 🔵 Pending |
| P1-8 | Sanitization: Centralized input validation | CIPHER | 2026-06-03 | 🔵 Pending |

#### Sprint 3-4: Frontend (Weeks 3-4)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P1-9 | Design System: Tailwind setup + components | PIXEL | 2026-06-10 | 🔵 Pending |
| P1-10 | Dashboard: KPI cards + real-time data | PIXEL | 2026-06-17 | 🔵 Pending |
| P1-11 | Mobile Responsive: All pages optimized | PIXEL | 2026-06-17 | 🔵 Pending |
| P1-12 | Photo Capture: Camera + file input UI | PIXEL | 2026-06-10 | 🔵 Pending |
| P1-13 | Signature Pad: Canvas + gesture capture | PIXEL | 2026-06-10 | 🔵 Pending |
| P1-14 | Form Aduan: Integrate photos (3-capture) | PIXEL | 2026-06-17 | 🔵 Pending |
| P1-15 | Lantikan Penyelia: Integrate signatures | PIXEL | 2026-06-17 | 🔵 Pending |

#### Sprint 5: Infrastructure (Weeks 5)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P1-16 | Docker: Containerize PHP + Apache | GRID | 2026-06-24 | 🔵 Pending |
| P1-17 | Docker: Setup MSSQL connection (Doctrine) | GRID | 2026-06-24 | 🔵 Pending |
| P1-18 | CI/CD: GitHub Actions basic pipeline | GRID | 2026-06-24 | 🔵 Pending |

#### Sprint 6: Testing & Deployment (Week 6)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P1-19 | Unit Tests: Backend API (70% coverage) | PULSE + NEXUS | 2026-07-01 | 🔵 Pending |
| P1-20 | Integration Tests: API + database | PULSE | 2026-07-01 | 🔵 Pending |
| P1-21 | UAT: With UiTM facilities team (8-10 users) | PULSE + DIBA | 2026-07-01 | 🔵 Pending |
| P1-22 | Bug fixing & regression testing | PULSE | 2026-07-08 | 🔵 Pending |
| P1-23 | **PHASE 1 LAUNCH: v2.0 to Production** | GRID + PULSE | **2026-07-08** | 🔵 Pending |

---

### PHASE 2: WEEKS 7-14 (Advanced Features)

#### Sprint 7-8: Efficiency Layer (Weeks 7-8)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P2-1 | Queue System: Redis/RabbitMQ setup | NEXUS + GRID | 2026-07-22 | 🔵 Pending |
| P2-2 | Queue Jobs: Push notifications async | NEXUS | 2026-07-29 | 🔵 Pending |
| P2-3 | Queue Jobs: Email notifications async | NEXUS | 2026-07-29 | 🔵 Pending |
| P2-4 | Cache Layer: Redis for dashboard | NEXUS + GRID | 2026-07-22 | 🔵 Pending |
| P2-5 | Cache: Pagination + aggregates | NEXUS | 2026-07-29 | 🔵 Pending |

#### Sprint 9-10: Compliance & Observability (Weeks 9-10)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P2-6 | Audit Logging: Who/what/when/IP tracking | CIPHER | 2026-08-05 | 🔵 Pending |
| P2-7 | PDPA Compliance: Data retention policy | CIPHER | 2026-08-05 | 🔵 Pending |
| P2-8 | Secrets Manager: Vault integration | CIPHER + GRID | 2026-08-12 | 🔵 Pending |
| P2-9 | Monitoring: Prometheus scrape setup | GRID | 2026-08-05 | 🔵 Pending |
| P2-10 | Monitoring: Grafana dashboards | GRID | 2026-08-12 | 🔵 Pending |
| P2-11 | CI/CD: Full pipeline (test + deploy) | GRID | 2026-08-12 | 🔵 Pending |

#### Sprint 11: UX Polish (Week 11)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P2-12 | Dark Mode: Implementation + toggle | PIXEL | 2026-08-19 | 🔵 Pending |
| P2-13 | Onboarding: Tutorial flow for new staff | PIXEL | 2026-08-19 | 🔵 Pending |
| P2-14 | Workflow Customization: Approval chain UI | NEXUS + PIXEL | 2026-08-26 | 🔵 Pending |

#### Sprint 12: Testing & Deployment (Week 12-13)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P2-15 | Integration Tests: Full API suite | PULSE | 2026-08-26 | 🔵 Pending |
| P2-16 | Performance Testing: Load test + optimization | PULSE | 2026-09-02 | 🔵 Pending |
| P2-17 | UAT: Full system test with UiTM | PULSE + DIBA | 2026-09-02 | 🔵 Pending |
| P2-18 | Bug fixing & compliance check | PULSE + CIPHER | 2026-09-09 | 🔵 Pending |
| P2-19 | **PHASE 2 LAUNCH: v3.0 to Production** | GRID + PULSE | **2026-09-09** | 🔵 Pending |

---

### PHASE 3: WEEKS 15-18 (Intelligence & Scale)

#### Sprint 13: AI Models (Week 15)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P3-1 | Vector DB: Pinecone setup + embeddings | NEXUS + FORGE | 2026-09-16 | 🔵 Pending |
| P3-2 | Smart Routing: Similarity matching model | FORGE | 2026-09-23 | 🔵 Pending |
| P3-3 | Auto-Categorization: Text classification model | FORGE | 2026-09-23 | 🔵 Pending |

#### Sprint 14: AI Features (Week 16-17)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P3-4 | Chatbot: FAQ tier-1 implementation | FORGE | 2026-09-30 | 🔵 Pending |
| P3-5 | Response Suggestions: Draft replies UI | FORGE + PIXEL | 2026-09-30 | 🔵 Pending |
| P3-6 | Load Balancing: Multi-instance config | GRID | 2026-09-30 | 🔵 Pending |
| P3-7 | Blue-Green Deployment: Zero-downtime setup | GRID | 2026-10-07 | 🔵 Pending |

#### Sprint 15: Testing & Go-Live (Week 18)

| # | Task | Owner | Deadline | Status |
|---|------|-------|----------|--------|
| P3-8 | Security Audit: Full penetration test | CIPHER | 2026-10-07 | 🔵 Pending |
| P3-9 | UAT: Final validation with UiTM | PULSE | 2026-10-14 | 🔵 Pending |
| P3-10 | **PHASE 3 LAUNCH: v4.0 to Production** | GRID + PULSE | **2026-10-14** | 🔵 Pending |

---

## 🎯 SUCCESS METRICS

### Phase 1 (Week 7)
- ✅ API functional (all CRUD endpoints working)
- ✅ Dashboard loads < 2s (after caching Phase 2)
- ✅ All 70% unit tests passing
- ✅ Mobile responsive (320px - 1920px)
- ✅ 0 critical security issues (CIPHER audit pass)
- ✅ Photo capture works (Android + iOS)
- ✅ Signature capture works (Android + iOS)

### Phase 2 (Week 15)
- ✅ Dashboard loads < 500ms (with Redis cache)
- ✅ 100% API integration tests passing
- ✅ Audit logging captures all user actions
- ✅ PDPA compliance checklist complete
- ✅ CI/CD pipeline auto-test + deploy
- ✅ 0 data loss (backups automated)

### Phase 3 (Week 18)
- ✅ AI models trained (routing, categorization)
- ✅ Chatbot handles 30% of FAQs (reduce support load)
- ✅ Smart routing accuracy ≥ 85%
- ✅ Zero-downtime deployment working
- ✅ Average response time < 200ms
- ✅ 99.5% uptime SLA

---

## 🚨 RISKS & MITIGATION

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| DB migration bugs | High | Medium | Phase 1 extensive testing, rollback plan |
| Scope creep on Phase 1 | High | High | Strict feature freeze after Week 2, DIBA enforces |
| MSSQL compatibility issues | Medium | Low | Test with ODBC, fallback to PDO_ODBC if needed |
| UiTM staff training time | Medium | Medium | Early onboarding (Phase 2), video tutorials |
| Team capacity constraints | Medium | Medium | FORGE available for Phase 3 support |
| AI model accuracy low | Low | Medium | Phased rollout, human review required |

---

## 💰 RESOURCE ALLOCATION

### Team (10 Staff):
- **NEXUS** (CTO): 100% allocated Weeks 1-10 (API, ORM, cache, AI integration)
- **FORGE** (AI Eng): 50% Weeks 1-10, 100% Weeks 15-18 (AI models)
- **PIXEL** (Design): 100% Weeks 1-8, 50% Weeks 9-14 (UX, onboarding)
- **CIPHER** (Security): 100% Weeks 1-2, 50% ongoing (audit, PDPA, vault)
- **GRID** (DevOps): 50% Weeks 1-6, 100% Weeks 7-14, 50% Weeks 15-18
- **PULSE** (QA): 100% Weeks 1-6, 70% Weeks 7-14, 100% Weeks 15-18
- **LENS, ORACLE, ECHO, SAGE**: As needed (10-20% each)

### Infrastructure:
- XAMPP / PHP 8.2 (local dev)
- GitHub repo + Actions (CI/CD)
- Docker (containerization)
- Redis (caching)
- Pinecone / Weaviate (vector DB, Phase 3)

### Budget Estimate:
- Development: ~400 engineer-weeks (10 staff × 18 weeks × 50% average utilization = ~90 weeks effort)
- Infrastructure: ~$500/month (Redis, Vector DB, monitoring)
- Testing tools: ~$0 (open-source)

---

## 📅 TIMELINE GANTT (Summary)

```
PHASE 1: Core Upgrade (Weeks 1-6)
├─ Backend API + Security ─────────────────────
├─ Frontend + Mobile  ─────────────────────
├─ Infrastructure (Docker)  ─────
└─ Testing + UAT  ────────
LAUNCH: 2026-07-08 (v2.0)

PHASE 2: Advanced (Weeks 7-14)
├─ Queue System + Cache  ──────────
├─ Audit + Compliance  ──────────
├─ Monitoring + CI/CD  ──────
└─ Testing + UAT  ────────
LAUNCH: 2026-09-09 (v3.0)

PHASE 3: Intelligence (Weeks 15-18)
├─ AI Models Training  ──────
├─ Chatbot + Smart Routing  ────
├─ Load Balancing + Deployment  ──
└─ Security Audit + UAT  ──
LAUNCH: 2026-10-14 (v4.0)
```

---

## ✅ APPROVAL & SIGN-OFF

```
PLAN LOCKED: 2026-05-15

Decision Maker:  Zuex (CEO)
Approved By:     DIBA (HCO)
Tech Lead:       NEXUS (CTO)
Quality Owner:   PULSE (QA Lead)

SIGNATURES:
✓ Zuex, CEO
✓ DIBA, HCO
✓ NEXUS, CTO

LOCKED: This plan is now binding for execution.
No scope changes without explicit Zuex approval.
```

---

## 📞 NEXT STEPS

1. **Week 1 Kickoff** (2026-05-22) — All staff briefed on plan
2. **Set up Infrastructure** — Repo, Docker, GitHub Actions
3. **Sprint Planning** — NEXUS defines Phase 1 sprints
4. **Daily Standups** — 15-min standup, DIBA tracks progress
5. **Weekly Reviews** — Track against action items, adjust if needed

---

**Document Version**: 1.0 FINAL & LOCKED  
**Last Updated**: 2026-05-15  
**Next Review**: After Phase 1 Launch (2026-07-08)
