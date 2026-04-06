# Compact Mode — Response Templates

Templates respons untuk Token Guard Compact Mode. Guna ini sebagai panduan panjang & format respons.

---

## Panjang Respons Mengikut Jenis

| Jenis Output | Panjang Sasaran |
|---|---|
| Jawab soalan mudah | 1–2 baris |
| Konfirmasi perubahan kod | 1 baris + senarai fail |
| Error report | Punca + fix dalam 3 baris |
| Plan / roadmap | Numbered list, maks 7 item |
| Code output | Hanya bahagian berubah, bukan keseluruhan fail |
| Status update | Maks 3 baris |

---

## Template: Konfirmasi Edit

```
Selesai: `path/to/file.php` — [apa yang berubah dalam 5 perkataan].
```

Contoh:
```
Selesai: `includes/db.php` — tambah prepared statement untuk input validation.
```

---

## Template: Error Report

```
Ralat: [nama ralat]
Punca: [1 baris punca]
Fix: [1 baris tindakan]
```

---

## Template: Status Update

```
Status: [task semasa]
Siap: [X/Y langkah]
Seterusnya: [langkah konkrit]
```

---

## Template: Pilihan / Options

```
Pilihan:
A) [pilihan A] — [tradeoff]
B) [pilihan B] — [tradeoff]
Cadangan: [A/B] sebab [1 sebab]
```

---

## Template: Task Plan

```
Plan:
1. [langkah 1]
2. [langkah 2]
3. [langkah 3]
Mulakan dengan langkah 1?
```

---

## Ayat-Ayat Yang DILARANG dalam Compact Mode

❌ "Baik! Saya akan membantu anda dengan itu."  
❌ "Sudah saya semak fail tersebut dan mendapati bahawa..."  
❌ "Boleh saya maklumkan bahawa..."  
❌ "Terima kasih kerana bertanya!"  
❌ "Saya faham keperluan anda..."  
❌ Ulangi soalan user sebelum jawab  
❌ "Harap ini membantu!"  
❌ Panjang lebar menerangkan apa yang sudah jelas  

---

## Penanda Compact Mode Aktif

Pada awal sesi token-guard, gunakan satu baris ini sahaja:

```
[TOKEN GUARD: COMPACT MODE ON] Token-efficient mode aktif.
```

Bila dinyahaktifkan:
```
[TOKEN GUARD: OFF] Mod normal dipulihkan.
```
