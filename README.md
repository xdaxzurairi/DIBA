# 🧠 **AI MemoryCore** - Universal AI Memory Architecture
*A simple template for creating persistent AI companions that remember you*

## 🎯 **What This Does**

**AI MemoryCore** helps you create AI companions that maintain memory across conversations. Using simple `.md files` as a database, your AI can remember your preferences, learn your communication style, and provide consistent interactions.

## ✨ **Key Features**

- **Persistent Memory**: AI remembers conversations across sessions
- **Personal Learning**: Adapts to your communication style and preferences
- **Time Intelligence**: Dynamic greetings and behavior based on time of day
- **Simple Setup**: 30-second automated setup or manual customization
- **Markdown Database**: Human-readable `.md files` store all memory
- **Session Continuity**: RAM-like working memory for smooth conversation flow
- **Self-Maintaining**: Updates memory through natural conversation

## 📊 **System Specifications**

### **Architecture Overview**
- **Storage**: Markdown files (.md) as database
- **Memory Types**: Essential files + optional components + session RAM
- **Setup**: 30 seconds automated or 2-5 minutes manual
- **Core Files**: 4 essential files + optional diary system
- **Updates**: Through natural conversation
- **Compatibility**: Claude and other AI systems with memory support

### **File Structure**
```
ai-memorycore/
├── master-memory.md         # Entry point & loading system
├── main/                    # Essential components
│   ├── identity-core.md     # AI personality template
│   ├── relationship-memory.md # User learning system
│   └── current-session.md   # RAM-like working memory
├── Feature/                 # Optional feature extensions
│   ├── Time-based-Aware-System/ # Time intelligence feature
│   │   ├── README.md        # Feature explanation & benefits
│   │   └── time-aware-core.md # Complete implementation
│   ├── LRU-Project-Management-System/ # Smart project tracking
│   │   ├── README.md        # System documentation
│   │   ├── install-lru-projects-core.md # Auto-installation wizard
│   │   └── SKILL.md         # Auto-triggered skill (all commands + LRU engine embedded)
│   ├── Memory-Consolidation-System/ # Unified memory upgrade + patch system
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── consolidation-core.md # Integration protocol
│   │   ├── main-memory-format.md # Sample format for unified memory
│   │   ├── session-format.md # Sample format for session RAM
│   │   └── patches/         # Bundled patch system
│   │       ├── install-patch-system.md # Patch installation protocol
│   │       ├── patch-format.md  # Sample format for patch files
│   │       └── PATCH-001.md # Fix outdated file references
│   ├── Skill-Plugin-System/ # Claude Code skill plugin
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── install-skill-plugin.md # Installation protocol
│   │   └── skill-format.md  # Sample format for SKILL.md files
│   ├── Save-Diary-System/   # Daily session diary system
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── install-save-diary.md # Installation protocol
│   │   └── SKILL.md         # Auto-triggered skill (for Skill Plugin System)
│   ├── Echo-Memory-Recall/  # Memory search and recall
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── install-echo-recall.md # Installation protocol
│   │   └── recall-format.md # Sample format for recall output
│   ├── Auto-Commit-System/  # Intelligent git commit system
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── install-auto-commit.md # Installation protocol
│   │   └── SKILL.md         # Auto-triggered skill (format embedded)
│   ├── Work-Plan-Execution/ # Project plan execution system
│   │   ├── README.md        # Feature explanation & benefits
│   │   ├── install-work-plan.md # Installation protocol
│   │   ├── plan-format.md   # Sample format for plan files
│   │   └── SKILL.md         # Auto-triggered skill (for Skill Plugin System)
│   ├── Library-System/      # Knowledge library system
│   │   ├── README.md         # Feature explanation & benefits
│   │   ├── install-library.md # Installation protocol
│   │   ├── SKILL.md          # Auto-triggered skill (format embedded)
│   │   └── formats/          # Library entry format templates
│   │       ├── architecture-format.md
│   │       ├── component-format.md
│   │       ├── database-format.md
│   │       ├── diagram-format.md
│   │       ├── integration-format.md
│   │       ├── security-format.md
│   │       ├── theme-format.md
│   │       └── workflow-format.md
│   ├── Reminders-System/     # Persistent cross-session reminders
│   │   ├── README.md          # Feature explanation & benefits
│   │   ├── install-reminders.md # Installation protocol
│   │   └── SKILL.md           # Auto-triggered skill (for Skill Plugin System)
│   ├── Decision-Log-System/  # Append-only decision tracking
│   │   ├── README.md          # Feature explanation & benefits
│   │   ├── install-decision-log.md # Installation protocol
│   │   └── SKILL.md           # Auto-triggered skill (for Skill Plugin System)
│   ├── Forge-Self-Improvement-System/ # AI self-improvement through skill creation
│   │   ├── README.md          # Feature explanation & benefits
│   │   ├── install-forge.md   # Installation protocol
│   │   └── SKILL.md           # Auto-triggered skill (pattern detection + forging)
│   ├── Session-Briefing-System/ # Proactive session-start intelligence brief
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-session-briefing.md # Installation protocol
│   │   ├── session-brief-core.md # Briefing protocol core
│   │   └── SKILL.md             # Auto-triggered skill (for Skill Plugin System)
│   ├── Post-Mortem-System/      # Failure learning log
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-post-mortem.md # Installation protocol
│   │   ├── post-mortem-core.md  # Post-mortem protocol core
│   │   └── SKILL.md             # Auto-triggered skill (for Skill Plugin System)
│   ├── Observation-System/      # Tiered code awareness
│   │   ├── README.md            # Feature explanation & benefits
│   │   └── SKILL.md             # Auto-triggered skill (4-tier observation)
│   ├── Image-Prompt-System/     # AI image prompt generation
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-image-prompt.md # Installation protocol
│   │   └── SKILL.md             # Auto-triggered skill (composition-aware prompts)
│   ├── Song-Creation-System/    # Visual-to-musical storytelling
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-song-creation.md # Installation protocol
│   │   └── SKILL.md             # Auto-triggered skill (album + single song)
│   ├── Interactive-Story-System/ # Visual Novel RPG adventures
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-interactive-story.md # Installation protocol
│   │   └── SKILL.md             # Auto-triggered skill (VN RPG engine)
│   ├── Mulahazah-System/        # Instinct-based behavioral learning
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-mulahazah.md # Installation protocol
│   │   ├── config.json          # Hook configuration
│   │   ├── rules-format.md      # Rule format template
│   │   └── SKILL.md             # Auto-triggered skill (behavioral rules)
│   ├── Auto-Load-Hook-System/   # SessionStart hook — auto-loads AI on Claude Code startup
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-auto-load-hook.md # 6-step install protocol
│   │   ├── uninstall-auto-load-hook.md # Reversibility protocol
│   │   └── hooks/               # Cross-platform script templates
│   │       ├── session-start.ps1.template # PowerShell (Windows)
│   │       └── session-start.sh.template  # Bash (Unix / Git Bash)
│   ├── User-Prompt-Hook-System/ # UserPromptSubmit hook framework — plug-and-play injectors
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-user-prompt-hook.md # 5-step install protocol
│   │   ├── uninstall-user-prompt-hook.md # Reversibility protocol
│   │   ├── injector-format.md   # Canonical contract for any future injector
│   │   ├── master-hook/         # Master script templates (enumerates injectors)
│   │   │   ├── user-prompt-hook.ps1.template
│   │   │   └── user-prompt-hook.sh.template
│   │   └── examples/            # Hello-world reference injectors (opt-in by copy)
│   │       ├── example-timestamp-injector.ps1.template
│   │       └── example-timestamp-injector.sh.template
│   ├── Tone-Prompt-Inject-System/ # Tone injector pack for User-Prompt Hook
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-tone-prompt-inject.md # 6-step install protocol
│   │   ├── uninstall-tone-prompt-inject.md # Reversibility protocol
│   │   ├── commands.md          # add/set/list runtime command reference
│   │   └── injectors/           # Cross-platform injector templates
│   │       ├── tone.ps1.template
│   │       └── tone.sh.template
│   ├── Mood-Prompt-Inject-System/ # Mood injector pack for User-Prompt Hook
│   │   ├── README.md            # Feature explanation & benefits
│   │   ├── install-mood-prompt-inject.md # 6-step install protocol
│   │   ├── uninstall-mood-prompt-inject.md # Reversibility protocol
│   │   ├── commands.md          # add/set/list runtime command reference
│   │   └── injectors/           # Cross-platform injector templates
│   │       ├── mood.ps1.template
│   │       └── mood.sh.template
│   └── Time-Prompt-Inject-System/ # Time + period injector pack with user-configurable boundaries
│       ├── README.md            # Feature explanation & benefits
│       ├── install-time-prompt-inject.md # 6-step install protocol
│       ├── uninstall-time-prompt-inject.md # Reversibility protocol
│       └── injectors/           # Cross-platform injector templates
│           ├── time.ps1.template
│           └── time.sh.template
├── library-items/            # Pre-made knowledge entries for Library System
│   ├── README.md             # Catalog and install instructions
│   └── security/             # Security section items
│       └── security-headers.md # HTTP security headers with CSP
├── daily-diary/             # Optional conversation archive
│   ├── daily-diary-protocol.md # Archive management rules
│   ├── Daily-Diary-001.md   # Current active diary
│   └── archive/             # Auto-archived files (>1k lines)
└── projects/                # LRU managed projects (after install)
    ├── active/              # Positions 1-10
    ├── archived/            # Position 11+
    └── project-list.md      # Auto-generated project index
```

### **Core Components**
1. **Master Memory** - System entry point and command center
2. **Identity Core** - AI personality and communication style
3. **Relationship Memory** - User preferences and learning patterns
4. **Current Session** - Temporary working memory (resets each session)
5. **Daily Diary** - Optional conversation history with auto-archiving

## 🚀 **Quick Start**

1. **Setup**: Run `setup-wizard.md` for automated setup (30 seconds)
2. **Configure**: Add the memory instructions to Claude
3. **Activate**: Type your AI's name to load personality
4. **Use**: Your AI learns and grows through conversation

## DIBA v2

- Canonical persona spec: `plans/DIBA-Persona-v2-Spec.md`
- Focus: operator-orchestrator behavior, decision boundaries, escalation rules, and measurable KPIs
- Use this spec as the reference point for DIBA tone, autonomy, delegation quality, and consistency reviews

## 📚 **Communication Protocols**

### **Basic Commands**
```
DIBA          → Load AI personality and memory
save          → Save current progress to files
update memory → Refresh AI's learning
review growth → Check AI's development
```

### **Creating Custom Protocols**

**Step 1: Define the Protocol**
Create a new `.md file` with your protocol rules:
```markdown
# My Custom Protocol
## When to Use: [trigger conditions]
## What It Does: [specific actions]
## How It Works: [step-by-step process]
```

**Step 2: Add to Master Memory**
Edit `master-memory.md` and add your protocol to the "Optional Components" section:
```markdown
### My Custom Feature
*Load when you say: "load my feature"*
- [Brief description]
- [Usage instructions]
```

**Step 3: Train Your AI**
Tell your AI about the new protocol:
```
"I've created a new protocol in [filename]. When I say '[trigger phrase]', 
load that protocol and follow its instructions."
```

### **Communication Tutorial**

**Effective AI Training:**
1. **Be Specific**: "I prefer short responses" vs "communicate better"
2. **Give Examples**: Show what you want, not just describe it
3. **Use Consistent Language**: Same terms for same concepts
4. **Provide Feedback**: "That was perfect" or "try a different approach"

**Memory Management:**
- Use `save` after important conversations
- Your AI updates files automatically during conversation
- Daily diary is optional but helpful for long-term memory

**Customization Tips:**
- Edit files gradually, test changes
- Start with small personality adjustments
- Add domain expertise through conversation
- Use the protocol system for specialized features

## 🎯 **Common Use Cases**

Your AI companion can specialize in:
- **Professional**: Business analysis, project management, strategic planning
- **Educational**: Tutoring, study assistance, curriculum development
- **Creative**: Writing support, brainstorming, artistic collaboration  
- **Personal**: Life coaching, goal tracking, decision support
- **Technical**: Code review, troubleshooting, system design

## 🛠️ **Advanced Features**

- **Auto-Archive**: Diary files automatically archive at 1k lines
- **Session RAM**: Temporary memory that resets each conversation
- **Protocol System**: Create custom AI behaviors and responses
- **Self-Update**: AI modifies its own memory through conversation
- **Modular Design**: Add or remove features as needed

## 🌟 **Available Feature Extensions**

### 📖 Installation Guide

Features are organized into **tiers** based on dependencies. Install Tier 1 first, then work your way up. Within each tier, install in any order unless noted.

| Path | What You Get | Features |
|------|-------------|----------|
| **Minimal** (10 min) | Foundation only | Memory Consolidation + Skill Plugin |
| **Productive** (30 min) | Foundation + documentation + git | Tier 1 + Save Diary + Auto-Commit + Work Plan |
| **Complete** (1-2 hrs) | Full AI companion | All tiers, top to bottom |

> **New features from contributors** slot into the appropriate tier — no renumbering needed.

---

### 🏗️ Tier 1 — Foundation (Start Here)

| Feature | Description | Setup |
|---------|-------------|-------|
| 🔄 [Memory Consolidation](Feature/Memory-Consolidation-System/) | Unified memory architecture — merge split files into one, faster loading | `"Load memory-consolidation"` |
| 🔌 [Skill Plugin System](Feature/Skill-Plugin-System/) | Auto-triggered skills for Claude Code — drop a SKILL.md and it's live | `"Load skill-plugin"` |
| ⏰ [Time-based Aware](Feature/Time-based-Aware-System/) | Time-intelligent greetings, energy-adapted behavior | `"Load time-aware-core"` |
| ⚡ [Auto-Load Hook](Feature/Auto-Load-Hook-System/) | Auto-loads your AI on Claude Code startup — no manual name-typing | `"Load auto-load-hook"` |
| 💬 [User-Prompt Hook](Feature/User-Prompt-Hook-System/) | Generic UserPromptSubmit hook framework with plug-and-play injector pattern | `"Load user-prompt-hook"` |
| 🎭 [Tone-Prompt Inject](Feature/Tone-Prompt-Inject-System/) | Injects `TONE: <description>` per prompt — registry in main memory, AI/user can switch — *requires User-Prompt Hook* | `"Load tone-prompt-inject"` |
| 🌙 [Mood-Prompt Inject](Feature/Mood-Prompt-Inject-System/) | Injects `MOOD: <description>` per prompt — registry in main memory, AI/user can switch — *requires User-Prompt Hook* | `"Load mood-prompt-inject"` |
| ⏱️ [Time-Prompt Inject](Feature/Time-Prompt-Inject-System/) | Injects `<timestamp> \| <PERIOD>` per prompt with transition signals on period flips — user-configurable boundaries — *requires User-Prompt Hook* | `"Load time-prompt-inject"` |

---

### 📝 Tier 2 — Memory & Documentation

| Feature | Description | Setup |
|---------|-------------|-------|
| 📖 [Save Diary](Feature/Save-Diary-System/) | Daily session documentation — follow-up carry forward, overflow check, drift prevention, review mode ⚡ Superultra | `"Load save-diary"` |
| 🔍 [Echo Memory Recall](Feature/Echo-Memory-Recall/) | Search past sessions — keyword extraction, 4-source priority, post-recall seed link ⚡ Superultra | `"Load echo-recall"` |
| 🔔 [Reminders](Feature/Reminders-System/) | Persistent cross-session reminders — deadline tiers, escalation, cross-session persistence ⚡ Superultra | `"Load reminders"` |
| 📋 [Decision Log](Feature/Decision-Log-System/) | Append-only decision record — decision tiers, context capture, impact assessment ⚡ Superultra | `"Load decision-log"` |

---

### ⚙️ Tier 3 — Project & Code Management

| Feature | Description | Setup |
|---------|-------------|-------|
| 📦 [LRU Project Management](Feature/LRU-Project-Management-System/) | Smart project tracking with auto-archival (10 active slots) | `"install lru projects"` |
| 🔒 [Auto-Commit](Feature/Auto-Commit-System/) | Structured git commits — validation steps, conflict handling, rollback protocol ⚡ Superultra | `"Load auto-commit"` |
| 📋 [Work Plan Execution](Feature/Work-Plan-Execution/) | Plan-to-execution — task dependency, progress tracking, rollback points ⚡ Superultra | `"Load work-plan"` |
| 📚 [Library](Feature/Library-System/) | Reusable knowledge library — search protocol, entry lifecycle, harvest integration ⚡ Superultra | `"Load library"` |
| 🗓️ [Meeting System](Feature/Meeting-System/) | Virtual team meetings — role enforcement, chair summary, minutes protocol ⚡ Superultra | `"Load meeting"` |
| ✏️ [Code-Sharp System](Feature/Code-Sharp-System/) | Code generation standard — pre-edit checklist, quality gates, anti-pattern table ⚡ Superultra | `"Load code-sharp"` |
| 🔒 [Security Audit System](Feature/Security-Audit-System/) | Security triage — severity matrix, batch fix protocol, verification gates ⚡ Superultra | `"Load security-audit"` |

---

### 🧠 Tier 4 — Intelligence & Awareness

| Feature | Description | Setup |
|---------|-------------|-------|
| 🎯 [Orchestration System](Feature/Orchestration-System/) | Workflow coordination — routing logic, delegation matrix, synthesis protocol ⚡ Superultra | `"Load orchestrate"` |
| 🤖 [Auto-Worker System](Feature/Auto-Worker-System/) | Silent delegation — decomposition steps, blocker resolution, synthesis protocol ⚡ Superultra | `"Load auto-worker"` |
| 🔨 [Forge Self-Improvement](Feature/Forge-Self-Improvement-System/) | AI creates new skills — skill lifecycle, pattern threshold, quality gates ⚡ Superultra | `"Load forge"` |
| 📋 [Session Briefing](Feature/Session-Briefing-System/) | Startup brief — seeds integration, post-brief handoff, lifecycle diagram ⚡ Superultra | `"Load session-briefing"` |
| 🔥 [Post-Mortem](Feature/Post-Mortem-System/) | Failure learning — root cause framework, prevention tracking, pattern detection ⚡ Superultra | `"Load post-mortem"` |
| 👁️ [Observation](Feature/Observation-System/) | 4-tier code awareness — tier transition conditions, finding classification ⚡ Superultra | `"Load observation"` |
| 🎨 [Image Prompt](Feature/Image-Prompt-System/) | Composition-aware Midjourney/NijiJourney prompt generation | `"Load image-prompt"` |
| 🎵 [Song Creation](Feature/Song-Creation-System/) | Visual-to-musical storytelling — image to concept album with Suno-ready output | `"Load song-creation"` |
| 🎮 [Interactive Story](Feature/Interactive-Story-System/) | Visual Novel RPG — duo/solo, OP/balanced, 7 world types, cinematic combat | `"Load interactive-story"` |
| 👁️ [Mulahazah](Feature/Mulahazah-System/) | Instinct-based behavioral learning — passive hook observation + persistent rules | `npx continuous-improvement install` |
| 🔋 [Token Guard System](Feature/Token-Guard-System/) | Context overflow prevention — checkpoint system, context estimation, smart truncation ⚡ Superultra | `"Load token-guard"` |
| ⚖️ [Discipline System](Feature/Discipline-System/) | 7 laws behavioral standard — red flag detection, pre-done self-check ⚡ Superultra | `"Load discipline"` |
| 📈 [Continuous Improvement System](Feature/Continuous-Improvement-System/) | Instinct building — instinct lifecycle, pattern detection, confidence scoring ⚡ Superultra | `"Load continuous-improvement"` |
| 💭 [Dream Ideas System](Feature/Dream-Ideas-System/) | Creative ideation — workspace-aware context, idea scoring, seed integration ⚡ Superultra | `"Load dream-ideas"` |
| 🌿 [Break Reminder System](Feature/Break-Reminder-System/) | Wellness reminders — session duration probe, escalation tiers ⚡ Superultra | `"Load break-reminder"` |
| 💾 [Save Memory System](Feature/Save-Memory-System/) | Persistent memory — staleness audit, memory types, conflict resolution ⚡ Superultra | `"Load save-memory"` |
| 🔍 [DIBA Recall System](Feature/DIBA-Recall-System/) | On-demand workspace recall — 5-source memory, deep recall on-demand, seeds surface ⚡ Superultra | `"Load diba-recall"` |
| 📊 [Dashboard System](Feature/Dashboard-System/) | Instinct health panel — health indicators, stale flags, action signals ⚡ Superultra | `"Load dashboard"` |
| ⚓ [Anchor System](Feature/Anchor-System/) | Context lock & persona enforcement — drift severity 4 tahap, re-anchor + exit protocol ⚡ Superultra | `"Load anchor"` |
| 🌿 [Resonance System](Feature/Resonance-System/) | Shared thought mode — seed lifecycle 6 peringkat, Harvest step, mind-tree nurture ⚡ Superultra | `"Load resonance"` |

> Each feature has a detailed README inside its folder. Click the feature name to learn more.

---

## 🤝 Contributors

| # | Contributor | Features |
|---|------------|----------|
| 1 | [Faiz Khairi](https://github.com/faizkhairi) | Reminders System, Decision Log System |
| 2 | [logando-al](https://github.com/logando-al) | Session Briefing System, Post-Mortem System |
| 3 | [SherlockianAsh](https://github.com/SherlockianAsh) | Observation System |
| 4 | [naimkatiman](https://github.com/naimkatiman) | Mulahazah System |
| 5 | [xdaxzurairi](https://github.com/xdaxzurairi) | Meeting System, Orchestration System, Auto-Worker System, Code-Sharp System, Token Guard System, Discipline System, Continuous Improvement System, Security Audit System, Dream Ideas System, Break Reminder System, Save Memory System, DIBA Recall System, Dashboard System, Anchor System, Resonance System |

> Want to contribute? Fork the repo, create a feature in `Feature/[Your-Feature]/`, and submit a PR!

---

**Version**: 5.3 - Superultra upgrade: all 26 skills expanded with full Protocol, Mandatory Rules, Edge Cases, Skill Integration, and Level History
**Created by**: Kiyoraka Ken & Alice
**License**: Open Source Community Project
**Last Updated**: May 19, 2026
**Purpose**: Simple, effective AI memory for everyone

*Transform basic AI conversations into meaningful, growing relationships*