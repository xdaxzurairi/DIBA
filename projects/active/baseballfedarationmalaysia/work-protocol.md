# Work Protocol

## Cara Kerja Projek
- Anggap projek ini sebagai zero-build static app: tiada npm, tiada bundler, tiada transpile pipeline selain Babel standalone dalam browser.
- Entry point utama ialah `Baseball Federation Malaysia.html`; semua modul frontend dimuat dari folder `app/`.
- Kekalkan penggunaan React function components, hooks global dari `React`, dan store global `BFM`.
- Sebarang teks baru perlu konsisten BM/EN kerana i18n disimpan dalam `app/data.js`.
- Reuse primitive sedia ada dari `app/ui.jsx` sebelum menambah komponen baru.
- Kekalkan path asset relatif (`assets/...`) dan elakkan andaian tentang routing server-side.

## Konvensyen Kod
- Fail JSX guna komen seksyen besar `/* ---------- ... ---------- */` atau banner header.
- Styling cenderung hybrid: utility class dalam CSS + inline style untuk variasi komponen.
- Persistence pengguna guna `localStorage`; key penting semasa: `bfm_prefs` dan store BFM dalam data layer.
