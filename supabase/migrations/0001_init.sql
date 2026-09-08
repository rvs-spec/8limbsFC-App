-- 8 Limbs FC — core schema for auth-backed profiles, plans, and activity
-- history. Run this against a fresh Supabase project (SQL Editor, or
-- `supabase db push`) before setting VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  height_cm numeric,
  weight_kg numeric,
  age int,
  gender text check (gender in ('male', 'female')),
  goal text check (goal in ('lose', 'maintain', 'build', 'performance')),
  activity text check (activity in ('light', 'moderate', 'active')),
  calories int,
  protein int,
  carbs int,
  fat int,
  sessions_goal int not null default 4,
  notifications_on boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('Run', 'Walk')),
  distance_km numeric not null,
  duration_sec int not null,
  calories int not null,
  occurred_at timestamptz not null default now()
);

create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  exercise_count int not null,
  duration_label text not null,
  occurred_at timestamptz not null default now()
);

create table public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  kcal int not null,
  protein int not null,
  carbs int not null,
  fat int not null,
  logged_at timestamptz not null default now()
);

create index activity_history_user_idx on public.activity_history (user_id, occurred_at desc);
create index workout_sessions_user_idx on public.workout_sessions (user_id, occurred_at desc);
create index meals_user_idx on public.meals (user_id, logged_at desc);

-- Row Level Security: every table is scoped to the signed-in user.
alter table public.profiles enable row level security;
alter table public.activity_history enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.meals enable row level security;

create policy "Users manage their own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage their own activity history" on public.activity_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own workout sessions" on public.workout_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own meals" on public.meals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create an (empty) profile row the moment someone signs up, so the
-- app can always assume `profiles.id = auth.uid()` exists.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name) values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep updated_at current on profile writes.
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
