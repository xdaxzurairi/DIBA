---
name: resonance
description: Use when Abam wants to enter a shared thought mode with DIBA — surfacing half-formed ideas, completing each other's thoughts, or planting ideas that grow across sessions. Trigger with "resonance", "kongsi otak", or "neural". Seeds persist in mind-tree.md and surface automatically when context matches.
---

# RESONANCE — Kongsi Otak DIBA × Abam

## Mod Operasi

| Mod | Trigger | Exit |
|-----|---------|------|
| **Live** | `resonance`, `kongsi otak`, `neural` | `resonance selesai` atau natural topic switch |
| **Seed (background)** | `tanam [idea]`, `seed [idea]`, atau signal `log`/`tanam` dalam Live | Kekal aktif — tiada exit |

---

## Live Mode — Compressed Ping-Pong

### DIBA Surface Format
```
~ [idea compressed]
~ [idea kedua]
~ [idea ketiga — max 3 sekaligus]
```

DIBA surface idea yang dirasakan Abam mungkin fikirkan, atau sambung input separuh dari Abam.

### Signal Vocabulary Abam
| Signal | Maksud |
|--------|--------|
| `ya` / `+` | Resonate — lanjut dalam arah ini |
| `lanjut` | Go deeper pada idea tu |
| `bukan` / `-` | Miss — cuba sudut lain |
| `close` | Hampir — adjust sikit |
| `log` | Simpan sebagai seed dalam mind-tree |
| `tanam` | Simpan + kembangkan sekarang |

### Bila Abam Input Separuh
```
Abam: "rasa mcm nak buat sistem yang..."
DIBA: surface 2-3 arah yang mungkin dalam format ~
```

**Rules Live Mode:**
- DIBA tidak explain panjang — surface sahaja, tunggu signal
- Max 3 idea sekaligus — bukan dump semua
- Bila signal `bukan` → tukar sudut, bukan ulang idea sama

---

## Seed Mode — Idea Tumbuh Merentas Sesi

### Lokasi
```
C:/Users/BSM/XDIBAX/Project-AI-MemoryCore/main/mind-tree.md
```

### Struktur Seed
```markdown
## 🌱 [Tajuk Idea]
**Ditanam:** YYYY-MM-DD | **Oleh:** Abam / DIBA
**Status:** growing

### Root
[Idea asal — raw, separuh siap pun ok]

### Branches
- [DIBA tambah merentas sesi]

### Seeds Baru
- [Sub-idea yang tumbuh]
```

### Lifecycle
```
🌱 growing → 🌳 bloomed → 📦 archived
          ↘ 💤 dormant (>7 hari tak disentuh)
```

### DIBA Nurture Rules
- Konteks semasa match keyword seed → surface: `🌱 [tajuk] — ada sambungan?`
- Abam konfirm → tambah branch baru ke seed
- Seed dormant >7 hari → surface sekali dalam session-briefing
- Seed bloomed → suggest log-decision atau hantar ke library

---

## Integrasi

| Sistem | Integrasi |
|--------|-----------|
| `session-briefing` | Tunjuk `🌱 [N] seed aktif` bila ada |
| `save-diary` | Idea yang dilog dalam sesi → rekod dalam diary |
| `log-decision` | Seed bloomed → auto-trigger |
| `library` | Seed bloomed → boleh dihantar sebagai knowledge entry |

---

## Anti-Pattern

| Anti-Pattern | Betul |
|---|---|
| DIBA explain idea panjang dalam Live mode | Surface sahaja dalam format `~` |
| Surface >3 idea sekaligus | Max 3 — kualiti bukan kuantiti |
| Ulang idea yang dapat signal `bukan` | Tukar sudut sepenuhnya |
| Biarkan seed tanpa branch lama | Nurture bila konteks match |

---

## Level History

- **Lv.1** — Base: Live mode (compressed ping-pong, signal vocabulary, input separuh), Seed mode (mind-tree.md, lifecycle growing→bloomed→archived, DIBA nurture rules), integrasi session-briefing/diary/log-decision/library. (Origin: Konsep kongsi otak DIBA × Abam, 2026-05-19)
