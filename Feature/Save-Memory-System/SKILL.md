# 💾 Save Memory System — Skill Plugin

## Skill Name
Save Memory

## Trigger Words
- `"save"` / `"save memory"` / `"save progress"` / `"update memory"`
- `"ingat"` / `"simpan"` / `"ingat ni"`
- Important information detected passively (Lv.2 auto-detect)

## Activation Condition
Fires on explicit command. Also fires passively when memory-worthy signals are detected in conversation (Lv.2).

## Behavior

### Step 1 — Identify What to Save
- Check current conversation for important information
- Identify new preferences, decisions, context, or references worth preserving
- Determine which memory files need updating

### Step 2 — Update Memory Files

Save to the appropriate memory file based on type:

| Type | Content | File |
|------|---------|------|
| `user` | Role, expertise, preferences | `memory/user_*.md` |
| `feedback` | Corrections and confirmed approaches | `memory/feedback_*.md` |
| `project` | Decisions, goals, constraints | `memory/project_*.md` |
| `reference` | External systems, paths, URLs | `memory/reference_*.md` |

Rules:
- Only save genuinely important information — not every conversation detail
- Append or update — never overwrite without reason
- Check if information already exists before creating a new file

### Step 3 — Confirm
Display a brief summary of what was saved and which files were updated.

## Auto-Detect Protocol (Lv.2)

Passively monitor conversation for memory-worthy moments:

| Signal | Example | Memory Type |
|--------|---------|-------------|
| New preference stated | `"saya prefer X cara ini"` | `feedback` |
| Approach confirmed effective | `"yes perfect, keep doing that"` | `feedback` |
| Approach rejected/corrected | `"no, jangan buat macam tu"` | `feedback` |
| User role/expertise mentioned | `"saya baru mula belajar X"` | `user` |
| Important project decision | `"kita guna pendekatan Y"` | `project` |
| New external reference | `"check Linear untuk ticket"` | `reference` |

Auto-detect rules:
- [ ] When signal detected, check if already saved
- [ ] If new/different: save immediately (for clear `feedback` and `user` signals)
- [ ] If ambiguous: ask once `"Nak saya simpan ini ke memory?"` — do not save without knowing
- [ ] Never save trivial or temporary information

What NOT to auto-save:
- Current task details (temporary)
- Information derivable from code or git history
- Information already in memory

## Staleness Audit (Lv.3)

When memory is loaded or skill is called, check for potentially stale memories:

| Memory Type | Stale Threshold | How to Check |
|-------------|----------------|-------------|
| `project` referencing specific files | > 30 days | Verify file still exists |
| `feedback` referencing specific workflows | > 60 days | Still relevant? |
| `reference` with URL or path | Every session | Path still valid? |
| `user` about expertise/role | > 90 days | Still accurate? |

Audit protocol:
- [ ] Check memory file dates on session start or when skill is called
- [ ] Flag memories past threshold:

```
Memory mungkin lapuk:
- project_eworks.md (18 hari) — reference fail `filter_builder.php` baris 42
  Verify: fail masih wujud + baris masih sama?
```

- [ ] Do not auto-delete — ask user to verify or remove
- [ ] If verified → update memory with new date
- [ ] If removed → delete file from memory folder

Not subject to audit:
- `feedback` memories about communication style (stable)
- `user` memories about identity/role (stable)

## Companion Skills
- Session-Briefing-System → brief surfaces key memories at session start
- DIBA-Recall-System → deep recall reads from saved memory files

## Level History
- **Lv.1** — Base: save conversation insights to memory files on command, confirm what was saved. (Origin: Memory persistence protocol DIBA, xdaxzurairi)
- **Lv.2** — Smart Auto-Detect: passively monitor conversation for memory-worthy signals — auto-save clear signals, ask for ambiguous ones. Prevents important context from being lost when user forgets to save. (Origin: Upgrade batch, 2026-04-20)
- **Lv.3** — Staleness Audit: flag memories that reference specific files/paths past age threshold — verify before acting on potentially outdated claims. Prevents memory from describing code that no longer exists. (Origin: Pattern of stale memory referencing refactored code, 2026-04-28)
