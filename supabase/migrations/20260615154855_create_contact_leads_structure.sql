create extension if not exists pgcrypto with schema extensions;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  consent boolean not null default false,
  source text not null default 'website',
  status text not null default 'new',
  ip_hash text,
  user_agent text,
  referrer text,
  metadata jsonb not null default '{}'::jsonb,
  email_notification_status text not null default 'not_configured',
  email_notification_error text,
  crm_provider text,
  crm_external_id text,
  crm_synced_at timestamptz,
  created_at timestamptz not null default now(),
  constraint leads_name_length check (char_length(btrim(name)) >= 2 and char_length(name) <= 160),
  constraint leads_email_format check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and char_length(email) <= 254
  ),
  constraint leads_phone_length check (phone is null or char_length(phone) <= 60),
  constraint leads_company_length check (company is null or char_length(company) <= 180),
  constraint leads_message_length check (char_length(btrim(message)) >= 5 and char_length(message) <= 5000),
  constraint leads_source_length check (char_length(source) <= 80),
  constraint leads_status_allowed check (status in ('new', 'contacted', 'qualified', 'archived')),
  constraint leads_ip_hash_length check (ip_hash is null or char_length(ip_hash) = 64),
  constraint leads_user_agent_length check (user_agent is null or char_length(user_agent) <= 500),
  constraint leads_referrer_length check (referrer is null or char_length(referrer) <= 1000),
  constraint leads_email_notification_status_allowed check (
    email_notification_status in ('not_configured', 'pending', 'sent', 'failed')
  ),
  constraint leads_email_notification_error_length check (
    email_notification_error is null or char_length(email_notification_error) <= 1000
  ),
  constraint leads_crm_provider_length check (crm_provider is null or char_length(crm_provider) <= 80),
  constraint leads_crm_external_id_length check (
    crm_external_id is null or char_length(crm_external_id) <= 180
  )
);

comment on table public.leads is 'Website contact form submissions. Source of truth for CRM and notifications.';
comment on column public.leads.ip_hash is 'SHA-256 hash of requester IP using server-side salt; never store raw IP here.';
comment on column public.leads.metadata is 'Future-safe non-sensitive metadata for conversion analytics and CRM handoff.';

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);
create index leads_status_created_at_idx on public.leads (status, created_at desc);
create index leads_crm_sync_idx on public.leads (crm_provider, crm_synced_at)
where crm_provider is not null;

create table public.contact_rate_limits (
  ip_hash text primary key,
  window_start timestamptz not null default now(),
  request_count integer not null default 0,
  last_request_at timestamptz not null default now(),
  constraint contact_rate_limits_ip_hash_length check (char_length(ip_hash) = 64),
  constraint contact_rate_limits_request_count_positive check (request_count >= 0)
);

comment on table public.contact_rate_limits is 'Atomic server-side rate limit buckets for contact form submissions.';

alter table public.leads enable row level security;
alter table public.contact_rate_limits enable row level security;

create or replace function public.check_contact_rate_limit(
  p_ip_hash text,
  p_limit integer default 5,
  p_window_seconds integer default 600
)
returns table (
  allowed boolean,
  remaining integer,
  reset_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_bucket public.contact_rate_limits%rowtype;
  now_value timestamptz := now();
  window_interval interval := make_interval(secs => p_window_seconds);
begin
  if p_ip_hash is null or char_length(p_ip_hash) <> 64 then
    raise exception 'Invalid IP hash';
  end if;

  insert into public.contact_rate_limits as limits (
    ip_hash,
    window_start,
    request_count,
    last_request_at
  )
  values (
    p_ip_hash,
    now_value,
    1,
    now_value
  )
  on conflict (ip_hash) do update
  set
    window_start = case
      when limits.window_start <= now_value - window_interval then now_value
      else limits.window_start
    end,
    request_count = case
      when limits.window_start <= now_value - window_interval then 1
      else limits.request_count + 1
    end,
    last_request_at = now_value
  returning
    limits.ip_hash,
    limits.window_start,
    limits.request_count,
    limits.last_request_at
  into current_bucket;

  allowed := current_bucket.request_count <= p_limit;
  remaining := greatest(p_limit - current_bucket.request_count, 0);
  reset_at := current_bucket.window_start + window_interval;

  return next;
end;
$$;

revoke all on table public.leads from anon, authenticated;
revoke all on table public.contact_rate_limits from anon, authenticated;

grant select, insert, update on table public.leads to service_role;
grant select, insert, update on table public.contact_rate_limits to service_role;

revoke execute on function public.check_contact_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_contact_rate_limit(text, integer, integer) to service_role;

do $$
begin
  if exists (
    select 1
    from pg_proc
    join pg_namespace on pg_namespace.oid = pg_proc.pronamespace
    where pg_namespace.nspname = 'public'
      and pg_proc.proname = 'rls_auto_enable'
      and pg_get_function_identity_arguments(pg_proc.oid) = ''
  ) then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
