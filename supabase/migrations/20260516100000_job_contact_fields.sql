alter table public.jobs
  add column if not exists contact_phone text,
  add column if not exists contact_whatsapp text;

comment on column public.jobs.contact_phone is 'Poster phone for applicants (tel: link).';
comment on column public.jobs.contact_whatsapp is 'Poster WhatsApp number or link for applicants.';
