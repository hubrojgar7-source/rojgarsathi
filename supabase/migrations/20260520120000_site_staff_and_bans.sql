-- Staff roles (admin / manager) and banned users

create table if not exists public.site_staff (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique,
  email text not null,
  display_name text,
  role text not null,
  invited_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_staff_role_check check (role in ('admin', 'manager')),
  constraint site_staff_email_len check (char_length(email) >= 3 and char_length(email) <= 320)
);

create unique index if not exists site_staff_email_lower_idx on public.site_staff (lower(email));

create table if not exists public.banned_users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  reason text,
  banned_by text not null,
  created_at timestamptz not null default now()
);

create index if not exists banned_users_clerk_idx on public.banned_users (clerk_user_id);

alter table public.site_staff enable row level security;
alter table public.banned_users enable row level security;

drop policy if exists "site_staff_no_public" on public.site_staff;
create policy "site_staff_no_public" on public.site_staff
  for all to anon, authenticated using (false) with check (false);

drop policy if exists "banned_users_no_public" on public.banned_users;
create policy "banned_users_no_public" on public.banned_users
  for all to anon, authenticated using (false) with check (false);

comment on table public.site_staff is 'Dashboard access: admin (full) or manager (limited).';
comment on table public.banned_users is 'Users blocked from the site; managed via admin panel.';
