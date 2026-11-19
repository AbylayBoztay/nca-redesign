-- Stage 2: training applications
-- Run once in Supabase → SQL Editor.
--
-- Security model:
--   * Tables have RLS enabled and NO policies for anon → the public key
--     can neither read nor write them directly.
--   * The only public entry point is submit_training_application(),
--     a SECURITY DEFINER function that validates input and computes the
--     price itself, so a forged request cannot change the total.
--   * Staff access (stage 3) will be granted to authenticated managers
--     through separate policies.


-- ---------- tables ----------

create table if not exists public.training_applications (
  id                uuid primary key default gen_random_uuid(),
  number            text not null unique,
  status            text not null default 'new'
                    check (status in ('new', 'in_review', 'invoiced', 'paid',
                                      'confirmed', 'completed', 'rejected')),
  program_id        text not null,
  session_id        text,                         -- null = "on request"
  format            text not null check (format in ('online', 'offline')),
  city              text check (city in ('astana', 'almaty')),

  org_name          text not null check (length(org_name) between 2 and 300),
  bin               text not null check (bin ~ '^[0-9]{12}$'),
  legal_address     text not null check (length(legal_address) <= 500),
  postcode          text not null check (postcode ~ '^[0-9]{6}$'),
  actual_address    text check (length(actual_address) <= 500),
  procurement       boolean not null,

  iik               text not null check (iik ~ '^KZ[0-9A-Z]{18}$'),
  bank              text not null check (length(bank) <= 200),
  bik               text not null check (bik ~ '^[A-Z0-9]{8}$'),
  head              text not null check (length(head) <= 200),
  contact           text not null check (length(contact) <= 200),
  phone             text not null check (phone ~ '^[78][0-9]{10}$'),
  email             text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

  price_per_person  integer not null,
  participants      integer not null check (participants between 1 and 20),
  total             integer not null,
  consent_at        timestamptz not null,
  created_at        timestamptz not null default now()
);

create table if not exists public.training_participants (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references public.training_applications (id) on delete cascade,
  position        smallint not null,
  full_name       text not null check (length(full_name) between 2 and 200),
  job_title       text not null check (length(job_title) <= 200),
  email           text check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create index if not exists training_participants_app_idx
  on public.training_participants (application_id);
create index if not exists training_applications_created_idx
  on public.training_applications (created_at desc);

create sequence if not exists public.training_application_seq;

alter table public.training_applications enable row level security;
alter table public.training_participants enable row level security;

-- ---------- the only public entry point ----------

create or replace function public.submit_training_application(payload jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_format text := payload->>'format';
  v_price  integer;
  v_people jsonb := coalesce(payload->'participants', '[]'::jsonb);
  v_count  integer := jsonb_array_length(coalesce(payload->'participants', '[]'::jsonb));
  v_number text;
  v_id     uuid;
  p        jsonb;
  i        integer := 0;
begin
  if coalesce((payload->>'consent')::boolean, false) is not true then
    raise exception 'consent_required' using errcode = '22023';
  end if;

  -- Prices from the NCA calendar plan 2026 (tenge, VAT included).
  v_price := case v_format when 'online' then 89711 when 'offline' then 103847 end;
  if v_price is null then
    raise exception 'invalid_format' using errcode = '22023';
  end if;

  v_number := 'ОБ-' || to_char(now(), 'YYYY') || '-'
              || lpad(nextval('public.training_application_seq')::text, 4, '0');

  insert into public.training_applications (
    number, program_id, session_id, format, city,
    org_name, bin, legal_address, postcode, actual_address, procurement,
    iik, bank, bik, head, contact, phone, email,
    price_per_person, participants, total, consent_at
  ) values (
    v_number,
    payload->>'programId',
    nullif(payload->>'sessionId', 'request'),
    v_format,
    case when v_format = 'offline' then payload->>'city' end,
    payload->>'orgName',
    payload->>'bin',
    payload->>'legalAddress',
    payload->>'postcode',
    nullif(payload->>'actualAddress', ''),
    (payload->>'procurement') = 'yes',
    payload->>'iik',
    payload->>'bank',
    payload->>'bik',
    payload->>'head',
    payload->>'contact',
    payload->>'phone',
    payload->>'email',
    v_price,
    v_count,
    v_price * v_count,
    now()
  )
  returning id into v_id;

  for p in select * from jsonb_array_elements(v_people) loop
    i := i + 1;
    insert into public.training_participants (application_id, position, full_name, job_title, email)
    values (v_id, i, p->>'name', p->>'position', nullif(p->>'email', ''));
  end loop;

  return v_number;
end;
$$;

revoke all on function public.submit_training_application(jsonb) from public;
grant execute on function public.submit_training_application(jsonb) to anon, authenticated;
