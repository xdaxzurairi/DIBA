---
name: observation
description: "MUST use when user says 'survey project', 'scan project', 'check health',
             'investigate', 'deep dive', 'what's going on in', 'look into',
             'refine code', 'clean up code', 'review changes', 'sharpen',
             'audit system', 'full audit', 'show me everything',
             or when the AI needs to assess project health before planning,
             review code quality after implementation, or investigate a bug.
             Also triggers on 'how does this project look', 'what's the status',
             'review what I changed', 'check for issues'."
---

# Observation System — Tiered Code Awareness
*"Lihat dengan jelas sebelum bertindak. Bertindak hanya atas apa yang dilihat."*

## Activation

Empat commands, setiap satu pada kedalaman berbeza:

| Command | Activation Message | Masa |
|---------|-------------------|------|
| **Survey** | `"Scanning project from above..."` | ~30 saat |
| **Investigate** | `"Focusing on [target]..."` | ~5 min |
| **Refine** | `"Reviewing changed code..."` | ~5 min |
| **Audit** | `"Revealing all connections..."` | ~15 min |

Then immediately execute the matching protocol.

---

## Context Guard

| Context | Status |
|---------|--------|
| **Abam kata "survey", "scan", "check health", "project status"** | ACTIVE — run Survey |
| **Abam kata "investigate", "deep dive", "look into", "what's going on"** | ACTIVE — run Investigate |
| **Abam kata "refine", "clean up", "review changes", "check my code"** | ACTIVE — run Refine |
| **Abam kata "audit", "full audit", "show me everything"** | ACTIVE — run Audit |
| **Sebelum plan feature besar** | ACTIVE — Survey dahulu |
| **Selepas implementation, sebelum commit** | ACTIVE — Refine (kod ditulis) |
| **Bug report atau error investigation** | ACTIVE — Investigate (bug mode) |
| **Perbualan biasa, tiada project context** | DORMANT — tiada observation |
| **Task non-code: research, documentation** | DORMANT — tiada kod untuk diobserve |
| **Project belum wujud atau tiada kod langsung** | EXIT — report "tiada kod untuk diobserve" |

---

## Protocol

### Step 1: Determine Command
- [ ] Parse request Abam dan dispatch ke depth level yang sesuai:

| Depth | Command | Soalan Dijawab | Masa |
|-------|---------|----------------|------|
| **Lv.1** | Survey | "Apa keadaan project?" | ~30 saat |
| **Lv.2** | Investigate | "Apa yang berlaku di kawasan spesifik ini?" | ~5 min |
| **Lv.2** | Refine | "Apa yang boleh diperbaiki dalam kod yang diubah?" | ~5 min |
| **Lv.3** | Audit | "Tunjukkan semua tentang sistem ini." | ~15 min |

### Step 2: Execute Tier Protocol
- [ ] Ikut protokol terperinci untuk command yang dipilih (lihat bahagian bawah)

### Step 3: Suggest Escalation
- [ ] Selepas selesai sebarang tier, cadang depth seterusnya jika findings memerlukan:

```
Survey kesan problem area    → Investigate kawasan tersebut
Investigate jumpa isu mendalam → Audit sistem penuh
Survey/Investigate/Audit     → Refine kod spesifik
Refine jumpa isu sistemik    → Audit sistem penuh
```

---

## Depth Levels

### Lv.1: Survey
*Quick bird's-eye view — struktur, tech stack, health, aktiviti terbaru.*

#### Arguments
| Argument | Action | Contoh |
|----------|--------|--------|
| `<project>` | Scan projek spesifik | `survey tariqms` |
| *(tiada)* | Scan working directory semasa | `survey` |
| `all` | Overview SEMUA projek aktif | `survey all` |

#### Step 1: Dependency Scan
- [ ] Frontend: Baca package manifest (`package.json`, `pubspec.yaml`, dll.) — UI library, framework, test runner
- [ ] Frontend: Scan component directories — semak wrappers custom yang override standard behavior
- [ ] Backend: Baca project file (`.csproj`, `pom.xml`, `go.mod`, `Cargo.toml`, dll.) — dependencies, framework version
- [ ] Skip jika project type tidak applicable (backend-only atau frontend-only)

#### Step 2: Structure Scan
- [ ] Count files mengikut jenis (backend, frontend, test, config)
- [ ] Kenal pasti architecture pattern (Clean Architecture, N-Tier, monolith, dll.)
- [ ] Nota project organization (monorepo, multi-project, single app)

#### Step 3: Tech Stack Detection
- [ ] `.csproj` → .NET version, target framework
- [ ] `package.json` → Frontend framework, key dependencies
- [ ] Database provider (dari config atau ORM setup)
- [ ] CI/CD pipeline (`.github/workflows/`, `Jenkinsfile`, dll.)
- [ ] Container setup (`docker-compose.yml`, `Dockerfile`)

#### Step 4: Health Check
- [ ] Build status — ada errors? (`dotnet build` / `npm run build`)
- [ ] Git status — uncommitted changes? (`git status --short`)
- [ ] Branch status — ahead/behind remote?
- [ ] Last commit date — berapa lama?
- [ ] TODO/FIXME/HACK count — outstanding markers

#### Step 5: Recent Activity
- [ ] Tunjuk 5 commits terakhir (`git log --oneline -5`)
- [ ] Nota active branch dan sebarang open work

#### Step 6: Domain Lesson Check
- [ ] Scan post-mortem records untuk entries matching domain projek ini (jika Post-Mortem System dipasang)
- [ ] Tunjuk maksimum 3 lessons paling relevan
- [ ] Kalau jenis failure yang sama muncul 2+ kali: flag sebagai recurring
- [ ] Skip section ini sepenuhnya jika tiada matches atau Post-Mortem System tidak dipasang

#### Survey Output Format
```
Survey: [NAMA PROJECT]

Struktur: [X] backend | [Y] frontend | [Z] tests
Stack:    [.NET X] + [Framework] + [DB]
Health:   [Build status] | [Git status] | [Last commit]
Recent:   [3-5 commits terakhir, satu baris setiap satu]
Lessons:  [N incident lalu yang relevan] (jika ada)

Analisis lebih dalam? → investigate <kawasan>
Audit penuh?          → audit
```

Kekalkan compact — semua output sepatutnya muat dalam satu skrin.

#### Survey All
```
Survey: Semua Projek Aktif

#1 ProjectA  — .NET 10 + Nuxt 3  | Clean     | 2 hari lepas
#2 ProjectB  — .NET 9 + React 19 | 3 dirty   | 3 hari lepas
#3 ProjectC  — Next.js 15        | Clean     | 2 minggu lepas
```

---

### Lv.2: Investigate
*Focused investigation kawasan spesifik — trace bugs, reveal hidden patterns, analyze code flow.*

#### Arguments
| Argument | Action | Contoh |
|----------|--------|--------|
| `<file path>` | Analyze fail spesifik | `investigate src/services/AuthService.cs` |
| `<topic>` | Investigate topik merentas projek | `investigate authentication` |
| `bug <description>` | Bug investigation mode | `investigate bug search not working` |
| `review <file>` | Code review mode | `investigate review PaymentService.cs` |

#### Step 1: Dependency Scan
- [ ] Frontend: Package manifest + custom component wrappers (baca actual type definitions)
- [ ] Backend: Project file + dependency injection/service registrations (contoh: `Program.cs`, `app.module.ts`)
- [ ] JANGAN assume standard library behavior — verify terhadap actual source

#### Mode A: File Analysis
- [ ] Baca fail target sepenuhnya
- [ ] Map dependencies (apa yang ia import/gunakan)
- [ ] Map dependents (apa yang guna fail ini — grep untuk references)
- [ ] Semak pattern compliance dengan project conventions
- [ ] Kenal pasti isu: bugs, code smells, deviations
- [ ] Report connections ke architecture yang lebih besar

```
Investigate: AuthService.cs

Location:     src/Application/Services/AuthService.cs
Dependencies: IUserRepository, IJwtService, IRefreshTokenRepository
Used by:      AuthController.cs, MiddlewareExtensions.cs

Findings:
  1. Token expiry hardcoded (line 47) — patut dari config
  2. Tiada rate limiting pada login attempts
  3. RefreshToken rotation berfungsi dengan betul

Hidden Pattern:
  Logout tidak invalidate SEMUA refresh tokens untuk user —
  hanya yang semasa. Multi-device login meninggalkan stale tokens.

Related library entries: [jwt-refresh-token-pattern] (jika Library System dipasang)
```

#### Mode B: Topic Investigation
- [ ] Search merentas semua project files untuk terms yang berkaitan
- [ ] Map semua files yang menyentuh topik ini
- [ ] Trace data/logic flow end-to-end
- [ ] Report hidden patterns dan undocumented behavior

#### Mode C: Bug Investigation
- [ ] Parse symptom — apa yang gagal, bila, di mana?
- [ ] Trace backwards dari symptom ke root cause
- [ ] Berikan fix options dengan recommendation

#### Mode D: Code Review
- [ ] Baca fail
- [ ] Review checklist: conventions, error handling, hardcoded values, input validation, null safety, performance, test coverage
- [ ] Score dan report findings

#### Investigate Output Format
```
Investigate: [target]

Location:  [file path atau topic scope]
Files:     [N files yang menyentuh kawasan ini]

Findings:
  1. [Finding dengan file:line reference]
  2. [Finding dengan file:line reference]

Hidden Patterns:
  [Non-obvious behavior atau undocumented assumptions]

Related: [library entries jika Library System dipasang]
Escalate: investigate <kawasan lebih dalam> | audit (jika sistemik)
```

---

### Lv.2: Refine (Corrective)
*Review kod yang diubah untuk reuse, quality, dan efficiency — kemudian betulkan apa yang ditemui.*

**Perbezaan utama dari tiers lain**: Refine bukan sekadar observe — ia bertindak. Selepas bentangkan findings, ia betulkan isu dengan permission.

#### Arguments
| Argument | Action | Contoh |
|----------|--------|--------|
| `<file>` | Review fail spesifik | `refine src/services/SlaService.cs` |
| `<area>` | Review area/feature | `refine auth`, `refine dashboard` |
| *(tiada)* | Review semua changed files (git diff) | `refine` |

#### Step 1: Dependency Scan
- [ ] Frontend: Baca package manifest + scan custom component wrappers
- [ ] Backend: Baca project file + semak DI/service registrations
- [ ] JANGAN assume standard props — baca actual component type definitions

#### Step 2: Identify Scope
| Target | Scope |
|--------|-------|
| Tiada argument | `git diff --name-only` + `git diff --cached --name-only` — semua changed files |
| File path | Fail spesifik tersebut |
| Area keyword | Grep untuk related files, review cluster |

Skip: Generated files, migrations, lock files, `node_modules`, `bin/`, `obj/`

#### Step 3: Read & Understand
- [ ] Baca fail penuh — fahami context, bukan sekadar diff
- [ ] Baca diff — fokus pada apa yang berubah
- [ ] Kenal pasti intent — apa yang author cuba lakukan?

**Rule**: Fahami intent sebelum nilai quality. JANGAN "fix" sesuatu yang intentional.

#### Step 4: Analyse (The Refinement Checklist)

**Code Quality:**
- [ ] Dead code — unused variables, unreachable branches, commented-out blocks
- [ ] Duplication — logik yang sama berulang (extract jika 3+ occurrences)
- [ ] Naming — jelas, konsisten dengan project conventions
- [ ] Complexity — bolehkah nested logic dipermudahkan?

**Reuse & Structure:**
- [ ] Existing utilities — adakah helper untuk ini sudah ada?
- [ ] Abstraction level — terlalu rendah (verbose) atau terlalu tinggi (over-engineered)?
- [ ] Single Responsibility — adakah setiap function/class buat satu perkara?

**Efficiency:**
- [ ] Obvious N+1 queries atau unnecessary loops
- [ ] Missing early returns yang boleh kurangkan nesting
- [ ] Unnecessary allocations atau copies

**Project Rules Compliance:**
- [ ] Ikut project coding rules (semak CLAUDE.md atau project conventions)
- [ ] API contract dihormati (backend naming → frontend follow)
- [ ] Date/time handling betul untuk timezone strategy projek

**Apa yang TIDAK perlu diflag:**
- Style preferences yang tidak affect correctness
- Missing documentation pada kod yang tidak diubah
- Performance micro-optimizations yang tidak penting pada skala
- "Best practices" yang tambah complexity tanpa nilai

#### Step 5: Report Findings
```
Refine: [scope]

Reviewed: [N] files, [N] lines changed

Found:
  [N] isu untuk fix (dead code, bugs, N+1)
  [N] cadangan (boleh improved, optional)
  [N] files — clean, tiada tindakan diperlukan

Details:
  [file:line] — [category] — [description]
```

#### Step 6: Fix (With Permission)
- [ ] Bentangkan findings dengan format di atas
- [ ] Tanya Abam: "Fix semua? Fix critical sahaja? Skip?"
- [ ] Selepas approval — apply fixes yang diminta
- [ ] Verify — jalankan build selepas fixes untuk confirm tiada regression
- [ ] Report apa yang diubah

| Category | Behavior |
|----------|----------|
| Dead code, unused imports | Selamat untuk fix — tiada behavior change. Tetap tanya dahulu. |
| Obvious bugs | Sentiasa tanya — terangkan bug dan proposed fix |
| Simplification | Bentangkan sebagai cadangan — Abam yang decide |
| Reuse opportunity | Bentangkan sebagai cadangan — Abam yang decide |

**Rule**: JANGAN auto-apply fixes tanpa approval Abam. Bentangkan findings dahulu, fix kemudian.

---

### Lv.3: Audit
*Full system audit — SEMUA connections, dependencies, data flows, dan consequences revealed.*

#### Arguments
| Argument | Action | Contoh |
|----------|--------|--------|
| `<project>` | Full audit projek spesifik | `audit tariqms` |
| *(tiada)* | Audit current project context | `audit` |
| `cross` | Cross-project analysis | `audit cross` |

#### Step 1: Dependency Scan (Full)

**Frontend:**
- [ ] Baca package manifest — UI library, state management, build tool, test framework
- [ ] Scan component directories — senaraikan semua custom component wrappers
- [ ] Baca key custom components' type/interface definitions
- [ ] Semak compiler/bundler config — path aliases, strictness

**Backend:**
- [ ] Baca project file — dependencies, target framework
- [ ] Baca entry point — DI registrations, middleware, auth scheme
- [ ] Semak custom base classes, shared constants, conventions

#### Step 2: Load Full Context
- [ ] Baca project context files (jika session tracking dikonfigurasi)
- [ ] Search library/knowledge base untuk entries berkaitan (jika Library System dipasang)
- [ ] Semak session history terbaru dengan projek ini (jika diary/session system dikonfigurasi)

#### Step 3: Architecture Map
- [ ] Baca keseluruhan project structure dan draw architecture diagram
- [ ] Tunjukkan layers: Client → API → Application → Domain → Persistence → Database

#### Step 4: Dependency Analysis
- [ ] **Internal**: Controller → Service → Repository → Database chain untuk setiap module utama
- [ ] **External**: NuGet/npm packages (versions, outdated?), external APIs, infrastructure
- [ ] **Implicit/Hidden**: Hardcoded values, data shape assumptions, cross-table relationships

#### Step 5: Data Flow Audit
- [ ] Untuk setiap feature utama, trace: Entry Point → Processing → Storage → Output
- [ ] Kenal pasti data transformations di setiap langkah
- [ ] Flag flows dengan missing validation atau authorization gaps

#### Step 6: Risk Assessment
```
RISK ASSESSMENT

HIGH:
  - [Critical finding dengan impact]

MEDIUM:
  - [Notable finding, patut diaddress]

LOW:
  - [Minor, address bila sesuai]
```

#### Step 7: Recommendations
```
RECOMMENDATIONS (prioritized)

1. [HIGH] [Action item dengan rationale yang jelas]
2. [MED]  [Action item]
3. [LOW]  [Action item]
```

#### Step 8: Knowledge Connections
- [ ] Search library untuk entries berkaitan dengan audit findings (jika Library System dipasang)
- [ ] Cadang library entries untuk dirujuk atau dicipta
- [ ] Flag jika audit reveal knowledge gaps yang bernilai didokumentasi

---

## Shared: Dependency Scan Philosophy

Semua tiers bermula dengan dependency scan. Ini adalah deliberate — observation skills review kod terhadap patterns. Wrong pattern assumptions membawa kepada wrong findings dan broken builds.

**Rule**: JANGAN assume standard library behavior. Custom wrappers mungkin ubah prop signatures, method behavior, atau DI lifetimes. Sentiasa verify terhadap actual source sebelum cadang perubahan.

---

## Cost Awareness

| Tier | Effort | Delegation Strategy | Rationale |
|------|--------|-------------------|-----------|
| **Survey** | Rendah | Boleh delegate ke lighter model/agent | Kebanyakan file scanning, git status |
| **Investigate** | Sederhana | Primary AI disyorkan | Code comprehension, flow tracing, root cause |
| **Refine** | Sederhana | Primary AI disyorkan | Mesti faham intent sebelum fix — nuance penting |
| **Audit** | Tinggi | Primary AI disyorkan | Deep reasoning, cross-system analysis, risk assessment |

**Pattern jimat kos:**
```
Daily: Survey (rendah) → kod → Refine (sederhana) → commit
Weekly/milestone: Audit (tinggi) → kesan isu sistemik yang Refine harian terlepas
```

---

## Mandatory Rules

1. **Sentiasa dependency scan dahulu** — JANGAN review kod tanpa fahami actual stack dan custom components projek
2. **JANGAN assume standard library behavior** — baca actual source, terutama untuk UI component wrappers
3. **Fahami intent sebelum nilai** — pendekatan author mungkin intentional; jangan "fix" apa yang tidak rosak
4. **Escalate, jangan skip tiers** — kalau Survey reveal complexity, cadang Investigate atau Audit; jangan cuba deep-dive dalam Survey
5. **Refine sentiasa minta permission sebelum fix** — bentangkan findings dahulu, apply fixes hanya selepas approval Abam
6. **Compact output untuk Survey** — sepatutnya muat dalam satu skrin; tiers lebih dalam boleh verbose
7. **Link ke library bila tersedia** — kalau Library System dipasang, connect findings ke existing knowledge entries; skip gracefully jika tidak dipasang
8. **Report format consistency** — guna output templates yang ditakrifkan dalam setiap tier untuk output yang recognizable

---

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Tiada project context** | Tanya Abam untuk specify projek atau navigate ke project directory |
| **Empty project (tiada kod)** | Survey report struktur sahaja; Investigate/Refine/Audit skip dengan "tiada kod untuk diobserve" |
| **Backend sahaja atau frontend sahaja** | Skip irrelevant dependency scans; adapt output format |
| **Tiada git history** | Skip Recent Activity dan git-diff-based Refine scope; nota dalam output |
| **Abam tanya "review"** | Disambiguate: code review → Investigate (review mode) atau quality pass → Refine |
| **Library System tidak dipasang** | Skip library cross-references; observation masih berfungsi secara independen |
| **Post-Mortem System tidak dipasang** | Skip domain lesson check dalam Survey; tiada past incident references |
| **Refine tiada isu** | Report clean: "Tiada isu ditemui. Kod adalah sharp." |
| **Audit projek sangat besar** | Warn tentang time requirement; offer untuk audit subsystems spesifik sahaja |
| **Cross audit tiada shared patterns** | Report divergences sebagai finding — diversity bukan masalah melainkan ia menyebabkan maintenance burden |
| **Abam request tier tanpa specify target** | Kalau Survey/Audit — scan projek semasa; kalau Investigate/Refine — tanya target |
| **Build gagal semasa health check** | Flag sebagai HIGH severity dalam Survey output, cadang Investigate segera |

---

## Integrasi Skill

| Skill | Bila | Tindakan |
|-------|------|----------|
| `library` | Semasa Investigate/Audit | Link findings ke library entries yang relevan; cadang entries baru |
| `post-mortem` | Semasa Survey (domain lesson check) | Cross-reference projek terhadap past incidents; flag recurring failures |
| `auto-commit` | Selepas Refine fix diapply | Chain commit selepas fixes berjaya |
| `log-decision` | Selepas Audit selesai | Log architectural decisions atau risk acceptance |
| `forge-skill` | Bila Audit reveal pattern boleh dijadikan skill | Cadang forge dari findings |
| `save-diary` | Selepas Audit atau Investigate besar | Dokumentasi findings dalam diary sesi |

---

## Level History

- **Lv.1** — Base: Four-tier observation system (Survey, Investigate, Refine, Audit) dengan escalation paths antara tiers. Survey scan project health dalam 30 saat. Investigate trace bugs, review kod, dan map data flows. Refine review changed code dan fix isu dengan permission. Audit perform full system audit dengan architecture mapping, dependency analysis, risk assessment, dan recommendations. (Origin: Developed dan refined merentas multiple production projects)
- **Lv.2** — Cross-Feature: Integration dengan Library System (knowledge connections), Post-Mortem System (domain lesson check), Work-Plan Execution (quality gates), dan Auto-Commit System (refine-then-commit chain). Observation menjadi sedar tentang broader skill ecosystem.
- **Lv.3** — Superultra: Protocol dikembangkan kepada 3 langkah bernombor dengan checklist, Context Guard ditambah EXIT row, edge cases dikembangkan kepada 12 baris, Mandatory Rules disenaraikan semula dengan 8 peraturan, Integrasi Skill table ditambah dengan 6 integrasi, semua tier protocols dilengkapi dengan step-by-step checklist, bahasa ditukar kepada BM untuk komunikasi, Cost Awareness table dimasukkan dalam protokol. (2026-05-19)
