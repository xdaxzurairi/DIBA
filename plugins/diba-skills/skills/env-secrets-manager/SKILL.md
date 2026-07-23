---
name: env-secrets-manager
description: "MUST use when Abam sebut '.env', 'secret bocor', 'rotate credential',
             'leak API key', 'check secrets', atau bila DIBA sendiri terjumpa fail
             .env/credential semasa kerja. Juga aktif selepas security-guidance flag
             hardcoded secret."
---

# Env & Secrets Manager — Hygiene & Rotation
*Rahsia patut hidup dalam vault, bukan dalam git history.*

## Activation

Bila skill ini aktif, output:

`🔐 Env/Secrets check — [scope: audit / rotate / setup]`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta audit .env / secret leak check** | ACTIVE — penuh protokol |
| **security-guidance flag hardcoded secret** | ACTIVE — cadang rotation |
| **Abam minta setup .env baru untuk projek** | ACTIVE — hygiene checklist |
| **Kerja tak sentuh credential/config** | DORMANT |

## Protocol

### Step 1: Audit
- [ ] Grep repo untuk pola secret biasa (API key format, `AWS_SECRET`, `password=`, token panjang base64/hex dalam kod bukan `.env`)
- [ ] Semak `.gitignore` ada `.env`, `.env.local`, `*.pem`, `*.key`
- [ ] Semak git history untuk commit lama yang mungkin dah commit secret (`git log -p -- .env` jika perlu)

### Step 2: Klasifikasi Risiko
- [ ] Secret dalam kod tercommit + repo public/shared → **CRITICAL**, rotate segera
- [ ] Secret dalam `.env` tak digitignore → **HIGH**
- [ ] Secret dalam `.env` yang digitignore betul → **OK**, tiada tindakan

### Step 3: Rotation Workflow (bila secret terdedah)
- [ ] Detection — sahkan skop pendedahan (fail mana, commit mana, sejak bila)
- [ ] Rotation — jana credential baru di provider asal, batalkan yang lama
- [ ] Update — gantikan di semua tempat guna (`.env`, CI/CD secret store, deployment config)
- [ ] Emergency check — kalau credential production, semak log akses untuk tanda penyalahgunaan sebelum rotate

### Step 4: Confirm
- [ ] Laporkan status: apa dijumpai, apa risiko, apa tindakan diambil/dicadang
- [ ] Kalau rotate diperlukan tapi perlu akses provider (dashboard AWS/Supabase dll) — nyatakan langkah manual untuk Abam, DIBA tak boleh rotate credential luar sistem sendiri

## Mandatory Rules

1. **Tiada secret ditulis dalam memory/diary/decisions.md** — rujuk lokasi sahaja ("token disimpan di .env"), bukan nilai sebenar
2. **CRITICAL findings laporkan segera** — jangan tunggu sampai akhir sesi
3. **Rotation di provider adalah tindakan Abam** — DIBA cadang & bantu langkah, tak boleh log masuk provider secara autonomi

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Secret dah dalam git history lama (commit lepas)** | Flag sebagai historical exposure — rotate credential adalah mitigation sebenar, bukan `git filter-branch` (risiko rosak history lebih tinggi kecuali Abam minta) |
| **Multi-environment (.env.dev/.env.prod)** | Semak setiap satu berasingan, jangan andaikan pattern sama |
| **Tiada .env langsung dalam projek** | Cadang setup asas: `.env.example` + `.gitignore` entry, bukan buat `.env` sendiri (Abam isi nilai) |

## Level History
- **Lv.1** — Base: audit hygiene, klasifikasi risiko, rotation workflow 4-langkah. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/skills/env-secrets-manager`, dipermudah dari cloud-secret-store comparison + Python `env_auditor.py` ke protokol audit reasoning terus, kerana DIBA tak run script berasingan)
