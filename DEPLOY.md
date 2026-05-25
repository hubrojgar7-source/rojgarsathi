# Deploy Rojgar Sathi on Vercel

## Prerequisites

- GitHub repo: [hubrojgar7-source/rojgarsathi](https://github.com/hubrojgar7-source/rojgarsathi)
- [Clerk](https://dashboard.clerk.com) application (production keys)
- [Supabase](https://supabase.com/dashboard) project with migrations applied

## 1. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import `hubrojgar7-source/rojgarsathi`.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` (default).
5. Output: default (Next.js App Router).

## 2. Environment variables

In **Project → Settings → Environment Variables**, add every variable from `.env.example` for **Production** (and Preview if you use preview deployments):

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk → API Keys |
| `CLERK_SECRET_KEY` | Yes | Server / proxy |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Yes | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Yes | `/` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Publishable / anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server only — admin & bans |
| `ADMIN_CLERK_USER_IDS` | Optional | Comma-separated Clerk user IDs for first admin |
| `ADMIN_EMAILS` | Optional | Comma-separated emails for first admin |

Save variables, then **Redeploy** so the build picks them up.

## 3. Clerk production domain

After the first deploy, copy your Vercel URL (e.g. `https://rojgarsathi.vercel.app`).

In Clerk → **Domains**, add:

- Your Vercel production hostname
- `https://your-domain.com` if you add a custom domain later

## 4. Verify deployment

- Homepage loads with jobs (if Supabase has data)
- Sign in / Sign up work
- Post a job (signed in)
- `/admin` (staff account only)

## 5. Common issues

| Symptom | Fix |
|---------|-----|
| `MIDDLEWARE_INVOCATION_FAILED` / proxy error | Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, redeploy |
| Sign-in page says “unavailable” | Clerk publishable key missing at build/runtime |
| No jobs on homepage | Supabase URL/anon key wrong, or no published jobs in DB |
| Admin 500 | `SUPABASE_SERVICE_ROLE_KEY` missing; add staff via `ADMIN_EMAILS` / `ADMIN_CLERK_USER_IDS` |

## Local production check

```bash
npm run build
npm run start
```
