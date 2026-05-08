# Meeting — 2026-04-23 (DIBA Hub)

**Agenda**: DIBA Hub Fasa 2 — Approach & Implementation Strategy
**Chair**: DIBA (COO)
**Agents Hadir**: DEV, SECURITY, RESEARCH, DATA, OPS, QA, DESIGN, DOC, PM, STRATEGY

---

## Input Agents

**DEV** — Option B (HTML panel), zero compile, siap dalam sejam. Flag: Extension penuh perlukan vsce + install manual.

**DESIGN** — Tailwind CDN konsisten dengan pwa_eworks. Flag: CSP restriction dalam Webview — whitelist CDN.

**SECURITY** — Tiada isu CLI Fasa 1. Flag: Path absolute, jangan expose ke network.

**RESEARCH** — vis-network.js untuk Screen Map, Sortable.js drag-drop. Flag: D3.js terlalu heavy.

**OPS** — Store data di local path sahaja, elak latency UNC.

**QA** — CLI pass semua commands. Flag: Test edge case projek kosong, ID duplikasi.

**DATA** — Schema OK untuk skala semasa. Cadang `lastWorked` per-projek.

**PM** — Scope Fasa 2: Kanban + Progress + Sidebar. Screen Map → Fasa 3.

**DOC** — README.md selepas Fasa 2 siap.

**STRATEGY** — Lean approach betul. Proven value dulu, evolve kemudian.

---

## Keputusan

| Perkara | Keputusan |
|---------|-----------|
| Webview approach | Option B — HTML panel mudah |
| CSS | Tailwind CDN |
| Drag-drop | Sortable.js |
| Screen Map | vis-network.js (Fasa 3) |
| Scope Fasa 2 | Kanban + Progress + Sidebar |

## Action Items

- [x] `webview/index.html` — Kanban panel
- [x] `server.js` — HTTP + SSE + fs.watch
- [x] `diary-sync.js` — Follow-ups → auto-create tasks
- [x] `save-diary` skill — auto-run sync selepas diary
- [ ] Test edge cases — QA
- [ ] README.md — DOC
