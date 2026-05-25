-- User-submitted reviews for the landing page

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text,
  author_name text not null,
  author_role text,
  rating smallint not null,
  body text not null,
  created_at timestamptz not null default now(),
  constraint reviews_rating_check check (rating >= 1 and rating <= 5),
  constraint reviews_body_len check (char_length(body) >= 10 and char_length(body) <= 2000),
  constraint reviews_name_len check (char_length(author_name) >= 2 and char_length(author_name) <= 80),
  constraint reviews_role_len check (author_role is null or char_length(author_role) <= 120)
);

create index if not exists reviews_created_idx on public.reviews (created_at desc);

alter table public.reviews enable row level security;

drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews
  for select to anon, authenticated
  using (true);

comment on table public.reviews is 'Landing page testimonials; inserts via server action + service role.';
