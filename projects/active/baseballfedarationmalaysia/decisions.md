# BFM — Decision Log
*Append-only record of keputusan penting projek Baseball Federation Malaysia*

---

## 2026-07-01 — BFM ialah Client Project

**Context:** Meeting kickoff BFM — perlu clarify sama ada BFM projek client atau internal, kerana ini tentukan hosting/domain plan dan boundary scope.

**Decision:** BFM disahkan sebagai **client project** (bukan internal XDIBAX).

**Rationale:** Status client bermakna hosting/domain, data (`app/data.js`), dan scope kerja perlu ikut keperluan client — bukan default infra internal XDIBAX. Threat model (CIPHER) dan deploy plan (GRID) perlu selaras dengan standard penghantaran client, bukan eksperimen internal.

---

## 2026-07-01 — Stack: React 18 + Babel CDN (Zero-Build)

**Context:** Projek BFM diterima dalam bentuk static HTML — tiada build pipeline, tiada package.json.

**Decision:** Kekalkan stack sedia ada — React 18 UMD + ReactDOM + Babel Standalone via CDN. Tiada migration ke Vite/Next.js buat masa ini.

**Rationale:** Mengubah stack bermakna scope creep yang tidak diminta client. Zero-build approach membolehkan client host di mana-mana static server tanpa setup tambahan.

---

## 2026-07-01 — Folder Dipindah: Downloads → XDIBAX

**Context:** Folder asal berada di `C:/Users/BSM/Downloads/baseballfedarationmalaysia/`.

**Decision:** Pindahkan ke `C:/Users/BSM/XDIBAX/baseballfedarationmalaysia/` supaya berada dalam workspace utama XDIBAX.

**Rationale:** Semua projek aktif diuruskan dalam XDIBAX — memudahkan git tracking, memory core access, dan konsistensi path dalam registry.

---
