create table if not exists public.admin_allowlist (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;
revoke all on table public.admin_allowlist from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Depois do primeiro login GitHub, substitua pelo UUID da sua conta em Supabase > Authentication > Users:
-- insert into public.admin_allowlist (user_id) values ('SEU_UUID_DO_SUPABASE');