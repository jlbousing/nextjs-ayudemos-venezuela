-- Run this if you already created the profiles table without phone.
alter table public.profiles
  add column if not exists phone text;

update public.profiles
set phone = ''
where phone is null;

alter table public.profiles
  alter column phone set not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );
  return new;
end;
$$;
