create policy "leads_deny_anon_authenticated"
on public.leads
for all
to anon, authenticated
using (false)
with check (false);

create policy "contact_rate_limits_deny_anon_authenticated"
on public.contact_rate_limits
for all
to anon, authenticated
using (false)
with check (false);
