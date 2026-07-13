---
name: auto-link-image-library
description: "Sambungkan output image-prompt ke library, log keputusan, dan trigger anchor bila scope berubah."
version: 0.1
level: 2
---

# Auto‑Link Image‑Library (Lv 2)

## Activation
- Dipanggil secara automatik selepas skill `image-prompt` selesai menghasilkan fail gambar.

## Protocol
1. **Capture output** – terima path gambar yang dihasilkan oleh `image-prompt`.
2. **Register to library** – panggil skill `library` dengan metadata:
   - `name`: nama fail atau tajuk gambar
   - `tags`: auto‑generate dari context (ambil `anchor` context jika ada)
   - `size`: ukuran fail
   - `context`: konteks semasa (dari `anchor` atau `session‑briefing`)
3. **Log decision** – tambahkan entri ke `log-decision` dengan:
   - `severity`: Low
   - `action`: "Register image to library"
4. **Re‑anchor check** – jika metadata `context` menunjukkan modul luar **IN SCOPE**, trigger `anchor` dengan `re‑anchor` dan set new scope.
5. **Return confirmation** – balas teks ringkas dalam Bahasa Melayu, < 50 perkataan.

## Mandatory Rules
- Semua respons dalam Bahasa Melayu.
- Tidak menggunakan emoji melainkan diminta.
- Jika pendaftaran ke library gagal, balas "Gagal daftar gambar, semak permission" dan jangan ubah fail lain.
- Pastikan output tidak melebihi 100 perkataan.
- Ikut `code-sharp` standard bila ada perubahan kod.

## Dependencies
- `image-prompt`
- `library`
- `log-decision`
- `anchor`

## Example Usage
```json
{
  "skill": "auto-link-image-library",
  "input": {
    "imagePath": "assets/hero.png",
    "context": "UI Landing Page"
  }
}
```

*Output*: "Gambar `hero.png` berjaya didaftarkan ke library dengan tag `UI Landing Page`."

---
*Last updated: 2026‑07‑03*