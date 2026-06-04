---
name: save-memory
description: "MUST use when user says 'save', 'save memory', 'save progress',
             'update memory', or when important information needs to be preserved
             to memory files."
---

# Save Memory

## Activation
When this skill activates, output:
"Saving memory..."

## Protocol

### Step 1: Identify What to Save
- [ ] Check current conversation for important information
- [ ] Identify new preferences, decisions, or context worth preserving
- [ ] Determine which memory files need updating

### Step 2: Update Memory Files
- [ ] Update main memory with new personality insights or preferences
- [ ] Update `main/current-session.md` (Topik, Keputusan, Fail, Follow-up) — **wajib Lv.2**
- [ ] Update `main/reminders.md` jika ada follow-up baharu dengan tarikh
- [ ] Add diary entry if significant conversation occurred (chain save-diary)

### Step 3: Confirm
- [ ] Display summary of what was saved
- [ ] Confirm all files updated successfully

## Protokol Tambahan: Simpan Memori Bersama Diary

- [ ] Setiap kali diary disimpan, pastikan juga memori semasa (current-session.md, relationship-memory.md, dsb.) turut disimpan/backup.
- [ ] Gunakan format dan lokasi fail memori sedia ada.
- [ ] Laporkan kepada pengguna bahawa kedua-dua diary dan memori telah berjaya disimpan.

## Mandatory Rules
1. Only save genuinely important information — not every conversation detail
2. Preserve existing content — append or update, never overwrite without reason
3. Confirm to user what was saved

## Level History
- **Lv.1** — Base: Save conversation insights to memory files on command.
- **Lv.2** — Session Chain: sentiasa sync `current-session.md` + optional reminders; chain ke save-diary bila sesi signifikan. (Origin: 2026-05-22 — naikkan skill batch)
