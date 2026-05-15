# eWorks Upgrade — ACTION ITEMS CHECKLIST
**Status**: 🔴 NOT STARTED (Due: Week 1 Completion)  
**Lock Date**: 2026-05-15 | **Execution Starts**: 2026-05-20

---

## 🚀 WEEK 1 SETUP (5 tasks, DUE 2026-05-20)

### Critical Path (Must Complete Before Phase 1 Dev Starts)

- [ ] **1. Setup project repo & branch strategy** (NEXUS + GRID)
  - [ ] Create GitHub org repo `xdibax/eWorks-PWA-v2`
  - [ ] Setup branch strategy (main, develop, feature/*)
  - [ ] Add collaborators (all 10 staff)
  - [ ] Configure webhook for CI/CD
  - **DUE**: 2026-05-20 EOD

- [ ] **2. Create API specification (OpenAPI 3.0)** (NEXUS)
  - [ ] Document all REST endpoints (CRUD, status, signatures, photos)
  - [ ] Define request/response schemas
  - [ ] Share with team for review
  - **DUE**: 2026-05-20 EOD

- [ ] **3. ORM migration detailed plan** (NEXUS)
  - [ ] Analyze current PDO usage
  - [ ] Plan Eloquent schema migrations
  - [ ] Identify dependencies/breaking changes
  - [ ] Test migration locally
  - **DUE**: 2026-05-20 EOD

- [ ] **4. Design system framework (Figma)** (PIXEL)
  - [ ] Create Figma workspace
  - [ ] Setup Tailwind design tokens
  - [ ] Build base components (button, input, card, etc.)
  - [ ] Share with NEXUS for frontend integration
  - **DUE**: 2026-05-27 EOD

- [ ] **5. Security audit checklist + PDPA review** (CIPHER)
  - [ ] Create PDPA compliance checklist (based on existing system)
  - [ ] List security requirements (JWT, input validation, secrets, etc.)
  - [ ] Identify gaps in current implementation
  - [ ] Share with team
  - **DUE**: 2026-05-20 EOD

---

## 📋 WEEK 1 SUPPORT TASKS (4 tasks, DUE 2026-05-22)

- [ ] **6. Testing framework setup (Jest, Playwright)** (PULSE)
  - [ ] Setup Jest for unit tests
  - [ ] Setup Playwright for E2E tests
  - [ ] Create test template files
  - [ ] Document testing standards
  - **DUE**: 2026-05-20 EOD

- [ ] **7. UiTM Stakeholder Kickoff** (DIBA + ORACLE)
  - [ ] Schedule meeting with UiTM IT + facilities (2026-05-22)
  - [ ] Present plan & timeline
  - [ ] Get buy-in for Phase 1 launch date
  - [ ] Define UAT scope & participants
  - **DUE**: 2026-05-22 (meeting)

- [ ] **8. Phase 1 sprint backlog + breakdown** (DIBA)
  - [ ] Break down 23 Phase 1 action items into sprints
  - [ ] Assign sprint owners
  - [ ] Create Jira/GitHub issues for each task
  - [ ] Estimate story points
  - **DUE**: 2026-05-22 EOD

---

## 🎯 CRITICAL MILESTONES (Must-Have by Date)

| Milestone | Date | Owner | Status |
|-----------|------|-------|--------|
| Week 1 setup complete | 2026-05-22 | DIBA | 🔴 Pending |
| API specification finalized | 2026-05-27 | NEXUS | 🔴 Pending |
| API endpoints working | 2026-06-03 | NEXUS | 🔴 Pending |
| Dashboard redesigned | 2026-06-17 | PIXEL | 🔴 Pending |
| Docker containerization done | 2026-06-24 | GRID | 🔴 Pending |
| **PHASE 1 UAT START** | 2026-07-01 | PULSE | 🔴 Pending |
| **PHASE 1 LAUNCH (v2.0)** | **2026-07-08** | GRID + PULSE | 🔴 Pending |
| Phase 2 features start | 2026-07-22 | NEXUS + PIXEL | 🔴 Pending |
| **PHASE 2 LAUNCH (v3.0)** | **2026-09-09** | GRID + PULSE | 🔴 Pending |
| AI models trained | 2026-09-23 | FORGE | 🔴 Pending |
| **PHASE 3 LAUNCH (v4.0)** | **2026-10-14** | GRID + PULSE | 🔴 Pending |

---

## 📊 PROGRESS TRACKING

### Daily Standup Format:
```
What did I complete yesterday?
What will I do today?
What blockers do I have?
Am I on track for this sprint?
```

### Weekly Review (Every Friday):
- [ ] Check action items completion %
- [ ] Review milestones vs actual progress
- [ ] Identify risks early
- [ ] Adjust timeline if needed (with DIBA approval)
- [ ] Log decisions in decisions.md

---

## 🔴 RED FLAGS (Stop & Escalate to Zuex)

If ANY of these occur, immediately notify DIBA + Zuex:

1. **Scope creep detected** — Any feature additions beyond locked plan
2. **Critical bug in Phase 1** — Blocks 2+ team members
3. **Milestone slip > 1 week** — v2.0 launch delayed past 2026-07-08
4. **Key staff unavailable** — NEXUS, PIXEL, or PULSE out for > 1 week
5. **MSSQL compatibility issue** — Cannot migrate ORM to Eloquent
6. **Security vulnerability found** — Any OWASP Top 10 issue
7. **UAT feedback contradicts plan** — > 30% of UiTM users reject design

---

## ✅ DEFINITION OF "DONE"

### For Each Action Item:
- [ ] Code written + reviewed
- [ ] Tests written + passing (70%+ coverage for backend)
- [ ] Documentation updated
- [ ] Merged to develop branch
- [ ] No open comments in PR
- [ ] Verified by owner (NEXUS/PIXEL/CIPHER/GRID/PULSE)

### For Each Sprint:
- [ ] All sprint action items completed
- [ ] Integration tests passing
- [ ] No critical/high bugs open
- [ ] Ready for next sprint

### For Each Phase:
- [ ] All 23/14/10 action items done
- [ ] UAT completed (8+ hours with UiTM)
- [ ] < 3 critical bugs remaining
- [ ] CIPHER audit passed
- [ ] Production deployment successful

---

## 📞 ESCALATION PATH

```
Problem Found
    ↓
Team tries to solve (1-2 days)
    ↓
If NOT solved → Escalate to DIBA
    ↓
DIBA coordinates cross-team solution (1-2 days)
    ↓
If NOT solved → Escalate to Zuex + NEXUS
    ↓
Zuex makes decision
```

---

## 💾 TRACKING DOCUMENTS

**Commit**: All action items + progress tracked in:
- GitHub Issues (technical tasks)
- DIBA project memory (strategic decisions)
- Daily diary (session notes)
- Weekly digest (summary progress)

**Owner**: DIBA (HCO) — Tracks all action items, flags blockers, reports progress

---

**Prepared by**: DIBA  
**Date**: 2026-05-15  
**Status**: 🔒 LOCKED
