---
name: auto-idle-save-recall
description: "MUST use when session idle for 20 min, or when user says 'hi diba'. Triggers auto-save diary on idle, and auto-recall last session if greeted."
---

# Auto Idle Save & Recall — DIBA Skill
*Auto-save diary jika idle, auto-recall bila disapa*

## Activation

- Aktif jika tiada aktiviti selama 20 minit (idle session)
- Aktif jika pengguna tulis 'hi diba' atau sapaan serupa

## Context Guard

| Context | Status |
|---------|--------|
| **Idle 20 minit** | ACTIVE — auto-save diary |
| **User greet: 'hi diba'** | ACTIVE — recall last session |
| **Aktiviti aktif <20 minit** | DORMANT |
| **Bukan sapaan** | DORMANT |

## Protocol

### Step 1: Idle Auto-Save
- [ ] Jika tiada aktiviti selama 20 minit, auto-save diary harian
- [ ] Gunakan format dan lokasi diary semasa (current/YYYY-MM-DD.md)
- [ ] Rekod ringkasan aktiviti terakhir sebelum idle

### Step 2: Recall on Greet
- [ ] Jika pengguna tulis 'hi diba', cari dan recall entri diary terakhir
- [ ] Paparkan ringkasan naratif sesi terakhir kepada pengguna

### Step 3: Confirm
- [ ] Papar notifikasi auto-save atau recall kepada pengguna
- [ ] Laporkan tindakan yang telah dibuat

## Mandatory Rules
1. Jangan pernah overwrite entri diary lama — hanya append.
2. Jangan recall jika tiada entri diary terakhir.
3. Sentiasa utamakan privasi dan tidak paparkan maklumat sensitif tanpa kebenaran.
