# eWorks PWA System — Full Feature Upgrade Plan
**Meeting**: 2026-05-15 | **Chair**: DIBA (HCO) | **Decision Maker**: Zuex (CEO)

---

## 🎯 SCOPE CONFIRMATION
**eWorks is UiTM-ONLY system.** No expansion to other clients.
- Remove multi-tenant architecture from Phase 2
- Optimize for UiTM operational excellence
- Focus: performance, security, user experience for single campus ecosystem

---

## 📊 REVISED 3-PHASE PLAN (UiTM-Only)

### **PHASE 1: Core Upgrade (6 weeks)**
Focus: Stability, security, API foundation

| Feature | Owner | Timeline | Purpose |
|---------|-------|----------|---------|
| REST API Layer | NEXUS | 2w | Decouple frontend from backend logic |
| ORM Migration (Eloquent) | NEXUS | 2w | Reduce DB bugs, type safety |
| Session Hardening (JWT) | CIPHER | 1.5w | Secure auth, refresh token rotation |
| Input Validation Layer | CIPHER | 1w | Centralize sanitization, prevent injection |
| Design System (Tailwind) | PIXEL | 2w | Consistent UI components |
| Dashboard Redesign | PIXEL | 2w | Real-time KPI, better UX |
| Mobile Responsive | PIXEL | 2w | Works on all devices |
| Docker Setup | GRID | 1.5w | Containerized deployment |
| Unit Tests (70% coverage) | PULSE + NEXUS | 2w | Parallel with dev |
| **Phase 1 Testing & Deploy** | PULSE + GRID | 1w | UAT, production release |

**Deliverable**: Production-ready v2.0 with stable API, secure auth, modern UI

---

### **PHASE 2: Advanced Features (8 weeks)**
Focus: Operational efficiency, compliance, observability

| Feature | Owner | Timeline | Purpose |
|---------|-------|----------|---------|
| Queue System (Redis) | NEXUS + GRID | 2w | Async jobs (push, email, reports) — faster UX |
| Caching Layer (Redis) | NEXUS + GRID | 1w | 3-5x faster dashboard, pagination |
| Workflow Customization | NEXUS | 2w | UiTM can define approval chains per campus |
| Dark Mode | PIXEL | 1w | Better accessibility, battery saving |
| Onboarding Flow | PIXEL | 1.5w | Guide new staff through system |
| Audit Logging | CIPHER | 1.5w | PDPA compliance — track all user actions |
| Secrets Management (Vault) | CIPHER + GRID | 1w | Secure credential storage |
| CI/CD Pipeline | GRID | 1.5w | Automated tests, deploy on push |
| Monitoring Setup | GRID | 1w | Uptime, latency, error tracking (Prometheus + Grafana) |
| Integration Tests | PULSE | 2w | API + database workflow validation |
| Performance Testing | PULSE | 1.5w | Load test, optimize bottlenecks |
| **Phase 2 Testing & Deploy** | PULSE + GRID | 1w | Full UAT with UiTM, production release |

**Deliverable**: Mature system v3.0 — PDPA-ready, observable, fast, customizable for UiTM workflows

---

### **PHASE 3: Intelligence & Scale (4 weeks)**
Focus: AI-powered features, operational insights

| Feature | Owner | Timeline | Purpose |
|---------|-------|----------|---------|
| Vector DB (Pinecone) | NEXUS + FORGE | 1w | Semantic search, similarity matching |
| Smart Routing | FORGE | 1.5w | Auto-route complaints to right department |
| Auto-categorization | FORGE | 1.5w | ML classify complaint type from text |
| Chatbot Tier 1 (FAQ) | FORGE | 1.5w | Answer common questions, reduce staff workload |
| Response Suggestions | FORGE | 1w | AI draft replies (staff review before send) |
| Load Balancing | GRID | 1w | Multi-instance ready if traffic spikes |
| Blue-Green Deployment | GRID | 1w | Zero-downtime updates |
| UAT & Security Audit | PULSE + CIPHER | 2w | Final validation, penetration test |
| **Phase 3 Launch & Monitoring** | GRID + PULSE | 1w | Production go-live, monitoring active |

**Deliverable**: Intelligence layer v4.0 — AI-assisted operations, production-hardened

---

## 🔄 WORKFLOW (Simplified — UiTM-Only Focus)

```
PHASE 1 (6w)          →  PHASE 2 (8w)          →  PHASE 3 (4w)
Core + Secure         →  Efficient + Compliant  →  Smart + Scalable
API, Auth, UI         →  Queue, Cache, Audit    →  AI, Monitoring
  ↓                         ↓                         ↓
v2.0 Launch          →  v3.0 Full Features      →  v4.0 Intelligence
Stable Foundation        Operational Ready         Production Grade
```

**Timeline**: 18 weeks total | **Go-Live Dates**: Week 7, Week 15, Week 18

---

## 📋 DECISIONS LOCKED

| Decision | Value |
|----------|-------|
| **Scope** | UiTM-only, no multi-tenant |
| **Architecture** | Single-organization optimized |
| **Tech Stack** | PHP (improve) + MSSQL + Redis + Vector DB (optional) |
| **Security Target** | PDPA-compliant + SOC 2 ready |
| **Deployment** | Docker + Kubernetes-ready |
| **Support Level** | 99.5% uptime SLA |

---

## ✅ ACTION ITEMS

| # | Task | Owner | Deadline |
|---|------|-------|----------|
| 1 | Setup project repo & CI/CD scaffolding | NEXUS + GRID | EOW1 |
| 2 | API specification (OpenAPI 3.0) | NEXUS | EOW1 |
| 3 | Design system in Figma | PIXEL | Week 2 |
| 4 | ORM migration detailed plan | NEXUS | EOW1 |
| 5 | Security audit checklist + PDPA review | CIPHER | EOW1 |
| 6 | Testing framework setup (Jest, Playwright) | PULSE | EOW1 |
| 7 | UiTM stakeholder kickoff (facilities, IT) | DIBA + ORACLE | Week 1 |
| 8 | Phase 1 sprint backlog + task breakdown | DIBA | EOW1 |

---

## 🚨 RISKS (UiTM-Specific)

| Risk | Mitigation |
|------|-----------|
| UiTM IT dept resistance to new tech | Early alignment meetings, demonstrate security/compliance |
| Existing data migration issues | Phase 1 extensive testing, parallel run option |
| MSSQL performance bottlenecks | Profile + optimize Week 3-4, add caching Phase 2 |
| Staff training time | Onboarding flow Phase 2, video tutorials |
| Compliance audit delays | CIPHER leads SOC 2 prep Week 1, audit Week 14 |

---

## 📤 SUMMARY FOR ZUEX

✅ **eWorks v2-4 Upgrade Plan Locked** (UiTM-focused, 18 weeks)  
✅ **Phase 1**: Stable, secure foundation (API + modern UX)  
✅ **Phase 2**: Operational readiness (caching, audit, CI/CD)  
✅ **Phase 3**: Intelligence layer (AI routing, smart features)  
✅ **PDPA-ready** by Phase 2 end  
✅ **Zero multi-tenant overhead** — streamlined for UiTM scale  

**Next**: Week 1 team kickoff + stakeholder alignment with UiTM IT.

---

**Prepared by**: DIBA (HCO) | **Date**: 2026-05-15
