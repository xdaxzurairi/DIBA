---
name: dependency-auditor
description: "MUST use when Abam minta 'audit dependency', 'check license', 'upgrade
             packages', 'ada vulnerable package tak', atau sebelum upgrade major version
             library dalam projek aktif."
---

# Dependency Auditor — Scan, License, Upgrade Risk
*Tahu apa yang projek bergantung sebelum ia jadi masalah.*

## Activation

Bila skill ini aktif, output:

`📦 Dependency Audit — [nama projek/repo]`

Kemudian jalankan protokol di bawah.

## Context Guard

| Context | Status |
|---------|--------|
| **Abam minta audit dependency/license** | ACTIVE — penuh protokol |
| **Sebelum upgrade major version library** | ACTIVE — upgrade risk sahaja |
| **Kerja tak sentuh package manager (composer/package.json dll)** | DORMANT |

## Protocol

### Step 1: Scan
- [ ] Kenal pasti fail manifest (package.json, composer.json, requirements.txt, go.mod, dll)
- [ ] Senaraikan dependency langsung vs transitif (jika manifest tunjukkan)
- [ ] Nota versi semasa vs versi terkini yang wujud (guna WebSearch/WebFetch jika perlu semak versi terbaru)

### Step 2: License Check
- [ ] Klasifikasikan setiap license: Permissive (MIT/Apache/BSD), Copyleft Kuat (GPL), Copyleft Lemah (LGPL/MPL), Proprietary/Unknown
- [ ] Flag Copyleft Kuat atau Proprietary/Unknown dalam projek client/komersial — risiko compliance

### Step 3: Upgrade Risk Matrix
- [ ] Untuk setiap package yang outdated, label: **Low** (patch version, no breaking change docs), **Medium** (minor version), **High** (major version, breaking changes disebut changelog), **Critical** (ada CVE/known vulnerability tanpa patch semasa)
- [ ] Cadangkan urutan upgrade: Critical dulu → High → Medium → Low

### Step 4: Laporkan
- [ ] Ringkasan: berapa dependency, berapa outdated, berapa berisiko lesen, berapa Critical
- [ ] Senarai actionable: package mana nak upgrade dulu dan kenapa

## Mandatory Rules

1. **Jangan auto-upgrade** — laporkan risiko, Abam yang putuskan bila nak jalankan upgrade sebenar
2. **Vulnerability check tertakluk pada apa yang boleh disahkan** — kalau tiada akses live CVE database, nyatakan "perlu semak manual di [advisory source]", jangan reka status selamat
3. **License flag adalah amaran, bukan blocker** — DIBA nyatakan risiko compliance, keputusan guna/tak guna kekal pada Abam/client

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| **Projek multi-bahasa (contoh: PHP + JS)** | Audit setiap ekosistem berasingan, laporkan sebagai seksyen berasingan |
| **Tiada akses internet/CVE database** | Nyatakan had — audit versi/lesen dari manifest sahaja, vulnerability check "tidak dapat disahkan live" |
| **Dependency tanpa lesen dinyatakan** | Klasifikasi "Unknown — perlu semak manual", jangan andai permissive |

## Level History
- **Lv.1** — Base: scan manifest, klasifikasi lesen, upgrade risk matrix Low/Med/High/Critical. (Origin: 2026-07-23 — port dari `xdaxzurairi/xdibax-skills` `engineering/skills/dependency-auditor`, dipermudah dari offline 8-ekosistem tooling penuh ke protokol audit reasoning-led yang guna WebSearch bila perlu)
