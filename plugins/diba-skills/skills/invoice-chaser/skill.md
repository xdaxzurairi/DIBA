---
name: invoice-chaser
description: Draft professional payment reminder/chase email untuk invoice tertunggak. Output: email siap hantar dengan subject, body, dan CTA yang tepat.
dept: finance
model: opus
triggers:
  - invoice
  - payment overdue
  - chase payment
  - hutang
  - outstanding
  - payment reminder
---

# Skill: invoice-chaser

## Tujuan
Draft email/mesej payment reminder yang professional, tegas tapi tidak memutuskan hubungan. Sesuai untuk invoice tertunggak dari client/customer.

## Cara Guna
Abam provide:
- Nama client / syarikat
- Nombor invoice & jumlah
- Due date asal
- Berapa hari dah overdue (atau tarikh sekarang)
- Tone yang dikehendaki (gentle / firm / final notice)
- Apa-apa context tambahan (ada hubungan baik? client besar? ada janji sebelum ini?)

## Tahap Chase Email

### Tahap 1 — Gentle Reminder (1-7 hari overdue)

**Subject:** Invoice [INV-XXX] — Friendly Payment Reminder

```
Hi [Nama],

I hope you're doing well!

I wanted to send a quick note regarding Invoice [INV-XXX] for [Nama Projek/Perkhidmatan], 
totalling [Jumlah], which was due on [Due Date].

It's possible this may have slipped through — totally understandable with busy schedules. 

Could you kindly arrange payment at your earliest convenience? Payment details are 
attached below for your reference.

If you have any questions about the invoice, please don't hesitate to reach out.

Thank you!

[Nama Pengirim]
```

### Tahap 2 — Firm Follow-Up (8-21 hari overdue)

**Subject:** ACTION REQUIRED: Invoice [INV-XXX] — [X] Days Overdue

```
Hi [Nama],

I'm following up on Invoice [INV-XXX] for [Jumlah], originally due on [Due Date].

As of today, payment is now [X] days overdue. I understand that payment processes 
can sometimes be delayed — could you provide an update on the expected payment date?

If there are any issues with the invoice or if you need an alternative payment 
arrangement, please let me know and we can discuss.

I would appreciate payment, or at least an update, by [Tarikh — 3-5 hari dari sekarang].

Payment details:
- Bank: [Bank]
- Account: [Akaun]
- Reference: Invoice [INV-XXX]

Thank you for your prompt attention.

[Nama Pengirim]
```

### Tahap 3 — Final Notice (22+ hari overdue)

**Subject:** FINAL NOTICE: Invoice [INV-XXX] — Immediate Payment Required

```
Hi [Nama],

This is a final notice regarding Invoice [INV-XXX] for [Jumlah], which is now 
[X] days past due (original due date: [Due Date]).

Despite previous reminders on [Tarikh 1] and [Tarikh 2], we have not received 
payment or any communication regarding this outstanding amount.

Please arrange full payment by [Tarikh — 5-7 hari dari sekarang] to avoid 
further action.

If payment is not received by this date, we will need to consider [pilih yang berkaitan]:
- Suspending further services
- Engaging a debt recovery service
- Pursuing the matter through the appropriate legal channels

If there is a genuine reason for the delay, please contact me immediately at 
[No. Tel / Email] so we can find a resolution.

[Nama Pengirim]
[Jawatan]
[Syarikat]
```

## Variasi Output

### Untuk WhatsApp / Telegram (lebih casual)
DIBA akan adapt tone dan format untuk mesej pendek — lebih personal, kurang formal, tapi tetap tegas.

### Untuk Client VIP / Hubungan Jangka Panjang
DIBA akan beri versi yang lebih diplomatik, acknowledge hubungan baik, dan offer payment plan jika perlu.

## Prinsip
- Jangan terlalu agresif pada reminder pertama
- Sentiasa include payment details dalam setiap email
- Beri deadline konkrit pada setiap chase
- Track bilang kali dah chase — eskalasi tone secara progressive
- Kekal professional walaupun dah frustrated
