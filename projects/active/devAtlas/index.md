# DevAtlas SaaS — Project Plan

**Status:** Planning
**Tarikh dicipta:** 2026-06-04
**Lokasi kod semasa:** `C:/Users/BSM/XDIBAX/wita/`

---

## Visi

DevAtlas sebagai platform SaaS Freemium — developer launchpad untuk frontend frameworks dan AI courses. Free tier terbuka, Pro tier untuk kuasa penuh.

## Model Bisnes

| Tier | Harga | Feature |
|---|---|---|
| Free | $0 | Browse frameworks, quiz, AI courses, 1 saved comparison |
| Pro | $9/bulan | Unlimited saved, team workspace, PWA export custom, API access |
| Team | $29/bulan | 5 seats, shared comparisons, priority support |

---

## Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Billing | Stripe |
| Deploy | Vercel |
| Domain | TBD (Abam decide) |

---

## Prerequisites (Belum Setup)

- [ ] Supabase account — supabase.com
- [ ] Vercel account — vercel.com
- [ ] Stripe account — stripe.com (boleh test mode dulu)
- [ ] Domain untuk DevAtlas

---

## Fasa Pelaksanaan

### Fasa 1 — Foundation (~3 hari)
- [ ] Init Next.js 14 project (App Router)
- [ ] Migrate `data.js` → TypeScript types + API routes
- [ ] Setup Supabase project + Auth (email/Google OAuth)
- [ ] Migrate static pages ke Next.js pages
- [ ] Deploy ke Vercel (preview URL)

### Fasa 2 — Tier Gating (~2 hari)
- [ ] DB schema: `users`, `subscriptions`, `saved_comparisons`
- [ ] Free vs Pro gate logic (middleware)
- [ ] User dashboard (`/dashboard`)
- [ ] Save comparison feature (Free: 1, Pro: unlimited)

### Fasa 3 — Billing (~2 hari)
- [ ] Stripe products setup (Pro, Team)
- [ ] Checkout flow (`/pricing` page)
- [ ] Webhook: subscription created/cancelled → update DB
- [ ] Customer portal (manage subscription)

### Fasa 4 — Pro Features (~3 hari)
- [ ] Team workspace (invite, shared saved)
- [ ] Custom PWA export (download zip dengan branding custom)
- [ ] API access (`/api/v1/frameworks`, `/api/v1/quiz`)
- [ ] API key management dashboard

---

## DB Schema (Draft)

```sql
-- users (auto dari Supabase Auth)
-- extended profile
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT,
  tier TEXT DEFAULT 'free', -- 'free' | 'pro' | 'team'
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE saved_comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  frameworks TEXT[], -- array of framework IDs
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE team_workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id),
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE team_members (
  workspace_id UUID REFERENCES team_workspaces(id),
  user_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'member',
  PRIMARY KEY (workspace_id, user_id)
);
```

---

## Next Step (Bila Ready)

1. Abam setup 3 accounts (Supabase, Vercel, Stripe)
2. Abam confirm domain
3. DIBA start Fasa 1 — `npx create-next-app@latest devAtlas`

---

## Follow-ups Terbuka

- Domain belum ditentukan
- Harga Pro/Team belum final (boleh adjust)
- Bahasa UI: English sahaja atau ada toggle Melayu?
