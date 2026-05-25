-- Rojgar Sathi: job board tables + RLS (Clerk on app server, service role for writes)
-- Applied to hosted project via Supabase MCP; keep this file for history / CLI replay.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null references public.profiles (clerk_user_id) on delete cascade,
  poster_display_name text,
  title text not null,
  description text not null,
  company_name text not null default '',
  location text not null default '',
  job_type text not null default 'full-time',
  is_remote boolean not null default false,
  salary_text text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint jobs_title_len check (char_length(title) <= 200),
  constraint jobs_desc_len check (char_length(description) <= 20000),
  constraint jobs_status_check check (status in ('draft', 'published', 'closed'))
);

create index if not exists jobs_status_created_idx on public.jobs (status, created_at desc);

alter table public.profiles enable row level security;
alter table public.jobs enable row level security;

drop policy if exists "profiles_no_anon_access" on public.profiles;
create policy "profiles_no_anon_access" on public.profiles
  for all to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "jobs_public_read" on public.jobs;
create policy "jobs_public_read" on public.jobs
  for select to anon, authenticated
  using (status = 'published');

comment on table public.profiles is 'Clerk users; maintained via server with service role.';
comment on table public.jobs is 'Listings; inserts/updates via server + Clerk + service role.';
