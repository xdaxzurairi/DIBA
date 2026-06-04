# 🏗️ GRID Infrastructure & Observability Plan
## ruangniaga Project | 8-Week Implementation

**Owner:** GRID (DevOps Lead)  
**Status:** 🟡 Ready for Execution  
**Dates:** 2026-05-20 — 2026-07-15  
**Priority:** 🔴 CRITICAL — Foundation  

---

## 📌 Mission Statement

Establish production-grade **infrastructure, logging, metrics, and alerting** for ruangniaga so that:
- **All team members have visibility** into system health in real-time
- **Issues are detected automatically** before users are impacted
- **Infrastructure is reproducible** and version-controlled
- **Incidents are responded to quickly** with clear runbooks

---

## 🎯 Success Criteria

- [ ] **Logging**: Centralized logging stack capturing all application + infrastructure logs
- [ ] **Metrics**: Prometheus collecting application + system metrics
- [ ] **Visualization**: Grafana dashboard showing 5 key metrics (real-time)
- [ ] **Alerting**: Alert rules firing for critical events (uptime, errors, latency)
- [ ] **IaC**: Infrastructure defined in Terraform/CloudFormation
- [ ] **CI/CD**: Automated deployment pipeline (test → build → stage → prod)
- [ ] **Documentation**: Runbooks for common incidents
- [ ] **Uptime**: System stability baseline established (>99% target)

---

## 📊 Phase Breakdown

### **PHASE 1: Foundation (Weeks 1-2) — May 20-31**

#### Goal: Visibility + Observability Stack Online

**Week 1: Logging Infrastructure**
- [ ] **G1.1** — Select and deploy logging stack
  - Option A: ELK (Elasticsearch + Logstash + Kibana) — if self-hosted
  - Option B: Loki + Promtail (lighter, Grafana-native) — recommended for startups
  - Option C: Managed (Datadog, Splunk, New Relic) — if budget allows
  - **Recommendation for ruangniaga:** Loki + Promtail (cost-effective, Grafana integration)
  
- [ ] **G1.2** — Deploy log aggregation
  - Set up Promtail agents on all servers
  - Route all application logs to Loki
  - Configure retention policy (30 days minimum)
  - Test: verify logs flowing within 24 hours

- [ ] **G1.3** — Docker Compose for local dev logging
  - Add Loki service to docker-compose.yml
  - Developers can test logging locally before production

**Week 2: Metrics Infrastructure**
- [ ] **G1.4** — Deploy Prometheus
  - Install Prometheus server (scrape interval: 15s)
  - Configure targets: application, databases, load balancers
  - Set up service discovery (if microservices)
  - Retention: 15 days minimum

- [ ] **G1.5** — Export application metrics
  - Add Prometheus client library to application
  - Export key metrics: request count, latency, errors, database queries
  - Test: verify metrics appearing in Prometheus UI

- [ ] **G1.6** — Connect Prometheus to Grafana
  - Add Prometheus as datasource in Grafana
  - Create basic dashboard (template provided below)

**Deliverables Week 1-2:**
- Loki instance + Promtail configured
- Prometheus scraping application metrics
- Grafana connected to both Loki + Prometheus
- Documentation: "How to view logs" + "How to add custom metrics"

---

### **PHASE 2: Dashboards & Alerting (Weeks 3-4) — Jun 1-14**

#### Goal: Real-time Visibility + Automated Alerts

**Week 3: Dashboards**
- [ ] **G2.1** — Build KPI Dashboard (5 key metrics)
  ```
  Dashboard: "ruangniaga Health Overview"
  
  Row 1 - Uptime & Availability
  ├─ Uptime % (target: >99%)
  ├─ Active Users (real-time count)
  ├─ Error Rate % (target: <0.5%)
  └─ Page Load Time (p95, target: <2s)
  
  Row 2 - System Health
  ├─ Request Latency (p50/p95)
  ├─ Database Query Time (p95)
  ├─ Memory Usage %
  └─ Disk Usage %
  
  Row 3 - Business Metrics
  ├─ Transactions/min
  ├─ Failed Transactions
  ├─ API Response Time
  └─ Background Job Duration
  ```

- [ ] **G2.2** — Create service-specific dashboards
  - Dashboard: "API Service Health"
  - Dashboard: "Database Performance"
  - Dashboard: "Cache Hit Rate"
  - (Tailor to ruangniaga's architecture)

- [ ] **G2.3** — Access control + sharing
  - Create read-only view for stakeholders (PMs, executives)
  - Document: how to embed dashboard in war room displays

**Week 4: Alerting**
- [ ] **G2.4** — Define alert rules
  ```
  CRITICAL Alerts (wake up on-call):
  ├─ Uptime < 95% for 5 min
  ├─ Error Rate > 5% for 5 min
  ├─ API Latency p95 > 5s for 10 min
  ├─ Database CPU > 90% for 10 min
  └─ Disk Space < 10% free
  
  HIGH Alerts (email + Slack):
  ├─ Error Rate > 1% for 5 min
  ├─ API Latency p95 > 2s for 10 min
  ├─ Memory > 80% for 5 min
  └─ Slow database queries > 5s
  
  INFO Alerts (Slack only):
  ├─ Deployment started/completed
  ├─ Backup completed successfully
  └─ Health check failures
  ```

- [ ] **G2.5** — Setup alert channels
  - PagerDuty or OpsGenie for on-call rotations
  - Slack integration for team notifications
  - Email for critical alerts
  - SMS/Phone for P0 incidents

- [ ] **G2.6** — Incident response playbook
  - Document common alerts + response steps
  - Example: "Error Rate Spike — What to Check?"
  - Runbook: escalation procedures

**Deliverables Week 3-4:**
- Live KPI dashboard in Grafana (5 key metrics)
- Alert rules configured and firing
- PagerDuty/Slack integration working
- Incident response runbook (v1)

---

### **PHASE 3: Infrastructure as Code (Weeks 5-6) — Jun 15-28**

#### Goal: Reproducible, Version-Controlled Infrastructure

**Week 5: IaC Foundation**
- [ ] **G3.1** — Choose IaC tool
  - Option A: **Terraform** (cloud-agnostic) — recommended
  - Option B: CloudFormation (AWS-only)
  - Option C: Pulumi (if using Go/Python)
  - **Recommendation:** Terraform

- [ ] **G3.2** — Codify current infrastructure
  ```
  terraform/
  ├─ main.tf (provider + backend)
  ├─ variables.tf (inputs)
  ├─ outputs.tf (outputs)
  ├─ vpc.tf (networking)
  ├─ compute.tf (EC2/instances)
  ├─ database.tf (RDS/databases)
  ├─ storage.tf (S3/volumes)
  └─ monitoring.tf (Prometheus/Grafana infrastructure)
  ```

- [ ] **G3.3** — Set up Terraform state management
  - Remote state backend (S3 + DynamoDB for AWS, GCS for GCP)
  - State locking to prevent concurrent modifications
  - State encryption at rest

- [ ] **G3.4** — Version control + CI/CD for infrastructure
  - Git repo structure: infrastructure as code
  - `terraform plan` in PR comments (terraform cloud)
  - Approval workflow: only reviewed TF changes merge

**Week 6: IaC Deployment**
- [ ] **G3.5** — Migrate current infrastructure to Terraform
  - Document existing resources
  - Import into Terraform state
  - Validate no changes detected

- [ ] **G3.6** — Add monitoring infrastructure to IaC
  - Prometheus/Grafana servers as Terraform modules
  - Logging infrastructure (Loki) as modules
  - Alerting rules versioned in git

- [ ] **G3.7** — Disaster recovery via IaC
  - Test: destroy infrastructure, rebuild from Terraform
  - Verify all services come up correctly
  - Document recovery procedure

**Deliverables Week 5-6:**
- Terraform configuration for all infrastructure
- Git repo with infrastructure code + review process
- Remote state backend configured
- Tested recovery procedure

---

### **PHASE 4: CI/CD Pipeline (Weeks 7-8) — Jun 29-Jul 15**

#### Goal: Automated, Reliable Deployments

**Week 7: CI Pipeline**
- [ ] **G4.1** — Choose CI/CD platform
  - Option A: GitHub Actions (if using GitHub)
  - Option B: GitLab CI (if using GitLab)
  - Option C: Jenkins (self-hosted)
  - **Recommendation:** GitHub Actions

- [ ] **G4.2** — Build CI pipeline
  ```
  Pipeline stages:
  1. Trigger: on PR + push to main
  2. Checkout: clone code
  3. Test: run unit + integration tests
  4. Lint: code quality checks (ESLint, SonarQube)
  5. Build: docker build + push to registry
  6. Security scan: CVE scanning (Snyk, Trivy)
  7. Report: post results to PR
  ```

- [ ] **G4.3** — Artifact management
  - Docker registry (ECR, Docker Hub, GCR)
  - Semantic versioning for images (v1.2.3)
  - Automated tagging (git hash, branch, timestamp)

**Week 8: CD Pipeline**
- [ ] **G4.4** — Build deployment pipeline
  ```
  Deployment stages:
  1. Approval: manual gate (required reviewers)
  2. Staging: deploy to staging environment
  3. Smoke tests: verify deployment
  4. Production: canary/blue-green deployment
  5. Validation: health checks + metrics validation
  6. Rollback: automatic if health checks fail
  ```

- [ ] **G4.5** — Environment management
  - Development (auto-deploy)
  - Staging (manual promotion)
  - Production (blue-green, 0-downtime)
  - Configuration management (secrets, env vars)

- [ ] **G4.6** — Rollback & recovery
  - Document rollback procedure
  - Automated rollback on failed health checks
  - Test: practice rollback scenario

- [ ] **G4.7** — Post-deployment monitoring
  - Deploy hooks: trigger Grafana alerts
  - Deployment tracking in dashboard
  - Release notes + deployment communication

**Deliverables Week 7-8:**
- Full CI/CD pipeline (test → build → deploy)
- Automated deployments to staging
- Blue-green deployment to production
- Deployment documentation + runbooks

---

## 🛠️ Technology Stack Recommendation

### **For ruangniaga (Typical Setup)**

| Component | Tool | Reason |
|-----------|------|--------|
| **Cloud** | AWS / GCP / Azure | Choose based on existing setup |
| **Logging** | Loki + Promtail | Lightweight, Grafana-native |
| **Metrics** | Prometheus | Industry standard, cost-effective |
| **Visualization** | Grafana | Unified dashboard, open-source |
| **Alerting** | Prometheus Alertmanager + PagerDuty | Reliable, escalation support |
| **IaC** | Terraform | Cloud-agnostic, widely adopted |
| **Container Registry** | ECR / GCR / Docker Hub | Cloud-native |
| **CI/CD** | GitHub Actions / GitLab CI | Native to git platform |
| **On-call** | PagerDuty or Opsgenie | Incident management |

### **Cost Estimate (Monthly)**

```
Logging (Loki):           ~$50-100   (self-hosted on existing infrastructure)
Metrics (Prometheus):     ~$0        (self-hosted, included in infrastructure)
Grafana:                  ~$50-200   (self-hosted or Grafana Cloud)
PagerDuty:                ~$50-200   (if on-call rotation needed)
Cloud Infrastructure:     [existing] (add small VMs if not already running)
─────────────────────────────────────
Total:                    ~$150-550/month (can be optimized)
```

---

## 📋 Implementation Checklist

### Pre-Implementation
- [ ] Confirm ruangniaga's current infrastructure (cloud provider, architecture)
- [ ] Identify all application services + dependencies
- [ ] List all servers/instances running
- [ ] Decide on self-hosted vs managed tools

### Week 1-2 (Logging + Metrics)
- [ ] Deploy Loki + Promtail
- [ ] Deploy Prometheus + Grafana
- [ ] Configure application to export metrics
- [ ] Verify logs flowing to Loki
- [ ] Verify metrics flowing to Prometheus

### Week 3-4 (Dashboards + Alerts)
- [ ] Build KPI dashboard (5 metrics)
- [ ] Define alert rules
- [ ] Set up alert channels (Slack, PagerDuty)
- [ ] Create incident runbooks
- [ ] Team training: "How to use dashboard"

### Week 5-6 (IaC)
- [ ] Write Terraform configs for all infrastructure
- [ ] Test: destroy + rebuild infrastructure
- [ ] Set up git workflow for infrastructure changes
- [ ] Document: how to deploy via Terraform

### Week 7-8 (CI/CD)
- [ ] Build CI pipeline (test + build)
- [ ] Build CD pipeline (staging + production)
- [ ] Test blue-green deployment
- [ ] Document: deployment procedures
- [ ] Team training: "How to deploy"

---

## 📅 Weekly Milestones

| Week | Milestone | Owner | Status |
|------|-----------|-------|--------|
| 1-2 | Logging + Metrics online | GRID | 🔜 |
| 3-4 | KPI Dashboard + Alerts live | GRID | 🔜 |
| 5-6 | Infrastructure as Code | GRID | 🔜 |
| 7-8 | CI/CD Pipeline automated | GRID | 🔜 |

---

## 👥 Dependencies & Handoffs

| Phase | Needs From | Action |
|-------|-----------|--------|
| 1-2 | DevOps infra access | Provision logging/metrics VMs |
| 3-4 | Application team | Implement Prometheus client library |
| 5-6 | All teams | Audit current infrastructure |
| 7-8 | CI/CD platform (GitHub/GitLab) | Provision repository + secrets |

---

## 🔄 Success Metrics (After Implementation)

- **Logging**: 100% of application logs captured, <5s latency
- **Metrics**: 95%+ uptime of Prometheus + Grafana
- **Alerts**: P0 alerts fire <1 min after issue, <1 false positive per week
- **IaC**: 100% of infrastructure version-controlled, 0 manual changes
- **CI/CD**: 100% of deployments via pipeline, 0 manual deploys
- **Team Adoption**: >90% of team uses dashboard weekly

---

## 📚 Documentation to Create

- [ ] **Setup Guide**: "How to deploy monitoring stack locally"
- [ ] **Dashboard Guide**: "How to read the KPI dashboard"
- [ ] **Alert Guide**: "What each alert means + how to respond"
- [ ] **Incident Runbook**: "Step-by-step response to common incidents"
- [ ] **Terraform Guide**: "How to add new infrastructure"
- [ ] **Deployment Guide**: "How to deploy to production"

---

## 🚀 Next Steps (For Zuex)

1. **Confirm Infrastructure**: What cloud provider? What's currently running?
2. **Allocate Resources**: Do we have a DevOps engineer or will Zuex lead this?
3. **Timeline Adjustment**: 8 weeks feasible or need acceleration?
4. **Tool Selection**: Any existing tools we should integrate with?
5. **Kickoff**: Schedule GRID briefing + team kickoff meeting

---

**Status:** 🟡 Ready for Execution  
**Created:** 2026-05-15  
**By:** DIBA (Orchestrated)  
**For:** Zuex (ruangniaga Project)

---

*"Infrastructure quality = uptime + visibility. When you can't see it, you can't fix it."* — GRID


---
*See also: [[projects/active/ruangniaga|ruangniaga]] · [[company/staff/GRID|GRID]] · [[main/decisions|decisions]]*
