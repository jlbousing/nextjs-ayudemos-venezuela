-- Allow volunteers to join initiatives themselves.
create policy "Volunteers can join initiatives"
  on public.initiative_volunteers for insert
  with check (auth.uid() = volunteer_id);
