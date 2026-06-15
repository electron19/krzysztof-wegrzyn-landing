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

revoke execute on function public.check_contact_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.check_contact_rate_limit(text, integer, integer) to service_role;
