-- ============================================================
-- Mushroom Finder App – Core Schema
-- Run this in Supabase SQL Editor to set up all P0 tables.
-- ============================================================

-- 1. Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Mushrooms (catalog of edible species)
create table public.mushrooms (
  id serial primary key,
  name text not null,
  scientific_name text,
  description text,
  image_url text,
  seasons text[] not null default '{}',        -- e.g. {'spring','fall'}
  forest_types text[] not null default '{}',   -- e.g. {'conifer','mixed'}
  public_areas text[] not null default '{}',   -- e.g. {'national_forest','state_park'}
  is_morel boolean default false,
  created_at timestamptz default now()
);

alter table public.mushrooms enable row level security;

create policy "Mushrooms are viewable by everyone"
  on public.mushrooms for select using (true);

-- 3. Spots (mushroom hunting locations)
create table public.spots (
  id serial primary key,
  name text not null,
  description text,
  latitude double precision not null,
  longitude double precision not null,
  season text,
  forest_type text,
  area_type text,                               -- 'national_forest', 'state_park', 'blm', etc.
  data_source text,
  data_updated_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

alter table public.spots enable row level security;

create policy "Spots are viewable by everyone"
  on public.spots for select using (true);

create policy "Authenticated users can create spots"
  on public.spots for insert with check (auth.uid() = created_by);

-- 4. Comments
create table public.comments (
  id serial primary key,
  spot_id integer not null references public.spots(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can create comments"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.comments for delete using (auth.uid() = user_id);

-- 5. Wildfire areas (for morel discovery)
create table public.wildfire_areas (
  id serial primary key,
  fire_name text,
  fire_year integer not null,
  latitude double precision not null,
  longitude double precision not null,
  acres double precision,
  state text default 'WA',
  data_source text,
  data_updated_at timestamptz default now()
);

alter table public.wildfire_areas enable row level security;

create policy "Wildfire areas are viewable by everyone"
  on public.wildfire_areas for select using (true);
