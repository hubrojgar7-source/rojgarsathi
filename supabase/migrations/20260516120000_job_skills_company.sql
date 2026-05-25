alter table public.jobs
  add column if not exists skills text,
  add column if not exists company_description text;

comment on column public.jobs.skills is 'Comma-separated skills required for the role.';
comment on column public.jobs.company_description is 'About the hiring company or team.';
