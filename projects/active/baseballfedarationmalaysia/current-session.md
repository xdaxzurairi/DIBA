# Current Session Recap

**Tarikh:** 2026-06-04
**Projek:** Baseball Federation Malaysia / BFM 2026

## Ringkasan
- Workspace ini ialah aplikasi frontend statik tanpa build step, dimulakan dari `Baseball Federation Malaysia.html`.
- Stack semasa guna React 18 UMD + ReactDOM + Babel standalone melalui CDN.
- Modul UI dipecah kepada `app/ui.jsx`, `app/landing.jsx`, `app/browse.jsx`, `app/dashboard.jsx`, dan `app/app.jsx`.
- Data, seed, i18n BM/EN, dan localStorage store dipusatkan dalam `app/data.js`.
- Gaya visual utama ada dalam `app/styles.css` dengan identiti sporty bertema field green/clay/cream.

## Fail Teras
- `Baseball Federation Malaysia.html`
- `app/app.jsx`
- `app/ui.jsx`
- `app/data.js`
- `app/landing.jsx`
- `app/styles.css`

## Nota Operasi
- Tiada `package.json`, `README`, atau config bundler dikesan.
- Perubahan perlu ikut corak zero-build: edit HTML, JSX Babel, CSS, dan asset secara terus.
