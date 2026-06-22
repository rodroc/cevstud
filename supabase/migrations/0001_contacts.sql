create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

-- Public site may INSERT via anon key; only service role may SELECT.
create policy "anon can insert" on public.contacts
  for insert to anon with check (true);

-- No anon SELECT policy → /admin must use the service-role key server-side.
