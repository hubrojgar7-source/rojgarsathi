alter table public.jobs
  add column if not exists category_id text;

create index if not exists jobs_category_id_idx on public.jobs (category_id)
  where category_id is not null;

comment on column public.jobs.category_id is 'Browse category id from JOB_CATEGORIES (e.g. hotel-hospitality).';
