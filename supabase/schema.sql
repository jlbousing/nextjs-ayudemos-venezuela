-- Run in Supabase → SQL Editor
-- Schema for initiatives, user profiles, and volunteer assignments.

create extension if not exists "pgcrypto";

-- Profiles linked to auth.users (volunteers / app users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Initiatives
create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) >= 3),
  description text not null check (char_length(trim(description)) >= 10),
  status text not null default 'pending'
    check (status in ('pending', 'process', 'completed')),
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Many-to-many: initiative ↔ volunteers
create table if not exists public.initiative_volunteers (
  initiative_id uuid not null references public.initiatives (id) on delete cascade,
  volunteer_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (initiative_id, volunteer_id)
);

create index if not exists initiatives_status_idx on public.initiatives (status);
create index if not exists initiatives_created_at_idx on public.initiatives (created_at desc);

-- Create profile automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.initiatives enable row level security;
alter table public.initiative_volunteers enable row level security;

-- profiles: public read, owner-only update
create policy "Profiles are visible to everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- initiatives: public read, authenticated write
create policy "Initiatives are visible to everyone"
  on public.initiatives for select
  using (true);

create policy "Authenticated users can create initiatives"
  on public.initiatives for insert
  with check (auth.role() = 'authenticated');

create policy "Creators can update their initiatives"
  on public.initiatives for update
  using (auth.uid() = created_by);

create policy "Creators can delete their initiatives"
  on public.initiatives for delete
  using (auth.uid() = created_by);

-- initiative volunteers
create policy "Volunteer assignments are visible to everyone"
  on public.initiative_volunteers for select
  using (true);

create policy "Creators can assign volunteers"
  on public.initiative_volunteers for insert
  with check (
    exists (
      select 1
      from public.initiatives i
      where i.id = initiative_id
        and i.created_by = auth.uid()
    )
  );

create policy "Volunteers can leave or creators can remove them"
  on public.initiative_volunteers for delete
  using (
    auth.uid() = volunteer_id
    or exists (
      select 1
      from public.initiatives i
      where i.id = initiative_id
        and i.created_by = auth.uid()
    )
  );
