create table if not exists public.reviews (
  id text primary key,
  name text not null check (char_length(trim(name)) between 1 and 80),
  bike_name text not null check (char_length(trim(bike_name)) between 1 and 120),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

grant select, insert on public.reviews to anon, authenticated;

drop policy if exists "Reviews are publicly readable" on public.reviews;
create policy "Reviews are publicly readable"
  on public.reviews for select
  to anon, authenticated
  using (true);

drop policy if exists "Visitors can submit reviews" on public.reviews;
create policy "Visitors can submit reviews"
  on public.reviews for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 80
    and char_length(trim(bike_name)) between 1 and 120
    and rating between 1 and 5
    and char_length(trim(comment)) between 1 and 1000
  );
