-- Perfiles de talento para personas desempleadas que buscan reubicación laboral.

create table if not exists public.talent_profiles (
  id uuid primary key default gen_random_uuid(),
  profession text not null check (char_length(trim(profession)) >= 2),
  experience text not null check (char_length(trim(experience)) >= 10),
  description text not null check (char_length(trim(description)) >= 20),
  previous_workplace text not null check (char_length(trim(previous_workplace)) >= 2),
  skills text not null check (char_length(trim(skills)) >= 3),
  linkedin_url text,
  social_links text,
  created_by uuid not null unique references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists talent_profiles_created_at_idx
  on public.talent_profiles (created_at desc);

alter table public.talent_profiles enable row level security;

create policy "Talent profiles are visible to everyone"
  on public.talent_profiles for select
  using (true);

create policy "Authenticated users can create their talent profile"
  on public.talent_profiles for insert
  with check (auth.uid() = created_by);

create policy "Owners can update their talent profile"
  on public.talent_profiles for update
  using (auth.uid() = created_by);

create policy "Owners can delete their talent profile"
  on public.talent_profiles for delete
  using (auth.uid() = created_by);
