create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  goal_type text not null default 'weight_loss',
  current_weight_kg numeric(6,2) default 120,
  target_weight_kg numeric(6,2) default 100,
  height_cm numeric(5,2) default 190,
  birth_date date,
  sex text,
  activity_level text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  kcal_target integer not null default 2400,
  protein_g_target integer not null default 180,
  carbs_g_target integer not null default 255,
  fat_g_target integer not null default 84,
  fiber_g_target integer not null default 34,
  water_ml_target integer not null default 4000,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, date)
);

create table if not exists public.food_analysis_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  input_type text not null,
  status text not null default 'queued',
  input_text text,
  image_path text,
  model text,
  raw_response jsonb,
  normalized_result jsonb,
  error_message text,
  cost_estimate numeric(10,4),
  created_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz
);

create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  analysis_job_id uuid references public.food_analysis_jobs(id) on delete set null,
  title text not null,
  meal_type text,
  source text not null default 'manual',
  image_url text,
  image_path text,
  eaten_at timestamptz not null default timezone('utc', now()),
  total_kcal integer not null default 0,
  total_protein_g numeric(8,2) not null default 0,
  total_carbs_g numeric(8,2) not null default 0,
  total_fat_g numeric(8,2) not null default 0,
  total_fiber_g numeric(8,2) not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.meal_items (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references public.meals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  portion_label text,
  portion_grams numeric(8,2),
  quantity numeric(8,2) not null default 1,
  kcal integer not null default 0,
  protein_g numeric(8,2) not null default 0,
  carbs_g numeric(8,2) not null default 0,
  fat_g numeric(8,2) not null default 0,
  fiber_g numeric(8,2) not null default 0,
  confidence numeric(5,2),
  source text not null default 'manual',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon text,
  unit text,
  target_value numeric(10,2),
  frequency text not null default 'daily',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, name)
);

create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  habit_id uuid not null references public.habits(id) on delete cascade,
  date date not null default current_date,
  value numeric(10,2),
  completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (habit_id, date)
);

create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  weight_kg numeric(6,2) not null,
  body_fat_pct numeric(5,2),
  waist_cm numeric(6,2),
  note text,
  logged_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.water_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount_ml integer not null,
  logged_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  default_unit text,
  calories_formula text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete set null,
  duration_min integer not null default 0,
  distance_km numeric(8,2),
  sets integer,
  reps integer,
  weight_kg numeric(8,2),
  calories_burned integer not null default 0,
  notes text,
  logged_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_daily_goals_user_id on public.daily_goals(user_id);
create index if not exists idx_meals_user_id on public.meals(user_id);
create index if not exists idx_meal_items_user_id on public.meal_items(user_id);
create index if not exists idx_habits_user_id on public.habits(user_id);
create index if not exists idx_habit_logs_user_id on public.habit_logs(user_id);
create index if not exists idx_weight_logs_user_id on public.weight_logs(user_id);
create index if not exists idx_water_logs_user_id on public.water_logs(user_id);
create index if not exists idx_exercises_user_id on public.exercises(user_id);
create index if not exists idx_workout_logs_user_id on public.workout_logs(user_id);
create index if not exists idx_food_analysis_jobs_user_id on public.food_analysis_jobs(user_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists set_meals_updated_at on public.meals;
create trigger set_meals_updated_at before update on public.meals for each row execute procedure public.set_updated_at();
drop trigger if exists set_meal_items_updated_at on public.meal_items;
create trigger set_meal_items_updated_at before update on public.meal_items for each row execute procedure public.set_updated_at();
drop trigger if exists set_habits_updated_at on public.habits;
create trigger set_habits_updated_at before update on public.habits for each row execute procedure public.set_updated_at();
drop trigger if exists set_habit_logs_updated_at on public.habit_logs;
create trigger set_habit_logs_updated_at before update on public.habit_logs for each row execute procedure public.set_updated_at();
drop trigger if exists set_weight_logs_updated_at on public.weight_logs;
create trigger set_weight_logs_updated_at before update on public.weight_logs for each row execute procedure public.set_updated_at();
drop trigger if exists set_water_logs_updated_at on public.water_logs;
create trigger set_water_logs_updated_at before update on public.water_logs for each row execute procedure public.set_updated_at();
drop trigger if exists set_exercises_updated_at on public.exercises;
create trigger set_exercises_updated_at before update on public.exercises for each row execute procedure public.set_updated_at();
drop trigger if exists set_workout_logs_updated_at on public.workout_logs;
create trigger set_workout_logs_updated_at before update on public.workout_logs for each row execute procedure public.set_updated_at();

create or replace function public.seed_default_habits_for_user(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.habits (user_id, name, icon, unit, target_value, frequency)
  values
    (target_user_id, 'Beber agua', 'droplets', 'L', 4, 'daily'),
    (target_user_id, 'Treinar', 'dumbbell', 'sessao', 1, 'daily'),
    (target_user_id, 'Dormir cedo', 'moon', 'vez', 1, 'daily'),
    (target_user_id, 'Caminhar', 'footprints', 'min', 45, 'daily'),
    (target_user_id, 'Estudar', 'book-open', 'bloco', 1, 'daily'),
    (target_user_id, 'Nao pedir besteira', 'utensils-crossed', 'dia', 1, 'daily')
  on conflict (user_id, name) do nothing;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.daily_goals (user_id)
  values (new.id)
  on conflict (user_id, date) do nothing;

  perform public.seed_default_habits_for_user(new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.daily_goals enable row level security;
alter table public.meals enable row level security;
alter table public.meal_items enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.weight_logs enable row level security;
alter table public.water_logs enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_logs enable row level security;
alter table public.food_analysis_jobs enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid());
create policy "profiles_insert_own" on public.profiles for insert with check (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_delete_own" on public.profiles for delete using (id = auth.uid());

drop policy if exists "daily_goals_select_own" on public.daily_goals;
drop policy if exists "daily_goals_insert_own" on public.daily_goals;
drop policy if exists "daily_goals_update_own" on public.daily_goals;
drop policy if exists "daily_goals_delete_own" on public.daily_goals;
create policy "daily_goals_select_own" on public.daily_goals for select using (user_id = auth.uid());
create policy "daily_goals_insert_own" on public.daily_goals for insert with check (user_id = auth.uid());
create policy "daily_goals_update_own" on public.daily_goals for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "daily_goals_delete_own" on public.daily_goals for delete using (user_id = auth.uid());

drop policy if exists "meals_select_own" on public.meals;
drop policy if exists "meals_insert_own" on public.meals;
drop policy if exists "meals_update_own" on public.meals;
drop policy if exists "meals_delete_own" on public.meals;
create policy "meals_select_own" on public.meals for select using (user_id = auth.uid());
create policy "meals_insert_own" on public.meals for insert with check (user_id = auth.uid());
create policy "meals_update_own" on public.meals for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "meals_delete_own" on public.meals for delete using (user_id = auth.uid());

drop policy if exists "meal_items_select_own" on public.meal_items;
drop policy if exists "meal_items_insert_own" on public.meal_items;
drop policy if exists "meal_items_update_own" on public.meal_items;
drop policy if exists "meal_items_delete_own" on public.meal_items;
create policy "meal_items_select_own" on public.meal_items for select using (user_id = auth.uid());
create policy "meal_items_insert_own" on public.meal_items for insert with check (user_id = auth.uid());
create policy "meal_items_update_own" on public.meal_items for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "meal_items_delete_own" on public.meal_items for delete using (user_id = auth.uid());

drop policy if exists "habits_select_own" on public.habits;
drop policy if exists "habits_insert_own" on public.habits;
drop policy if exists "habits_update_own" on public.habits;
drop policy if exists "habits_delete_own" on public.habits;
create policy "habits_select_own" on public.habits for select using (user_id = auth.uid());
create policy "habits_insert_own" on public.habits for insert with check (user_id = auth.uid());
create policy "habits_update_own" on public.habits for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "habits_delete_own" on public.habits for delete using (user_id = auth.uid());

drop policy if exists "habit_logs_select_own" on public.habit_logs;
drop policy if exists "habit_logs_insert_own" on public.habit_logs;
drop policy if exists "habit_logs_update_own" on public.habit_logs;
drop policy if exists "habit_logs_delete_own" on public.habit_logs;
create policy "habit_logs_select_own" on public.habit_logs for select using (user_id = auth.uid());
create policy "habit_logs_insert_own" on public.habit_logs for insert with check (user_id = auth.uid());
create policy "habit_logs_update_own" on public.habit_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "habit_logs_delete_own" on public.habit_logs for delete using (user_id = auth.uid());

drop policy if exists "weight_logs_select_own" on public.weight_logs;
drop policy if exists "weight_logs_insert_own" on public.weight_logs;
drop policy if exists "weight_logs_update_own" on public.weight_logs;
drop policy if exists "weight_logs_delete_own" on public.weight_logs;
create policy "weight_logs_select_own" on public.weight_logs for select using (user_id = auth.uid());
create policy "weight_logs_insert_own" on public.weight_logs for insert with check (user_id = auth.uid());
create policy "weight_logs_update_own" on public.weight_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "weight_logs_delete_own" on public.weight_logs for delete using (user_id = auth.uid());

drop policy if exists "water_logs_select_own" on public.water_logs;
drop policy if exists "water_logs_insert_own" on public.water_logs;
drop policy if exists "water_logs_update_own" on public.water_logs;
drop policy if exists "water_logs_delete_own" on public.water_logs;
create policy "water_logs_select_own" on public.water_logs for select using (user_id = auth.uid());
create policy "water_logs_insert_own" on public.water_logs for insert with check (user_id = auth.uid());
create policy "water_logs_update_own" on public.water_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "water_logs_delete_own" on public.water_logs for delete using (user_id = auth.uid());

drop policy if exists "exercises_select_own" on public.exercises;
drop policy if exists "exercises_insert_own" on public.exercises;
drop policy if exists "exercises_update_own" on public.exercises;
drop policy if exists "exercises_delete_own" on public.exercises;
create policy "exercises_select_own" on public.exercises for select using (user_id = auth.uid());
create policy "exercises_insert_own" on public.exercises for insert with check (user_id = auth.uid());
create policy "exercises_update_own" on public.exercises for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "exercises_delete_own" on public.exercises for delete using (user_id = auth.uid());

drop policy if exists "workout_logs_select_own" on public.workout_logs;
drop policy if exists "workout_logs_insert_own" on public.workout_logs;
drop policy if exists "workout_logs_update_own" on public.workout_logs;
drop policy if exists "workout_logs_delete_own" on public.workout_logs;
create policy "workout_logs_select_own" on public.workout_logs for select using (user_id = auth.uid());
create policy "workout_logs_insert_own" on public.workout_logs for insert with check (user_id = auth.uid());
create policy "workout_logs_update_own" on public.workout_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "workout_logs_delete_own" on public.workout_logs for delete using (user_id = auth.uid());

drop policy if exists "food_analysis_jobs_select_own" on public.food_analysis_jobs;
drop policy if exists "food_analysis_jobs_insert_own" on public.food_analysis_jobs;
drop policy if exists "food_analysis_jobs_update_own" on public.food_analysis_jobs;
drop policy if exists "food_analysis_jobs_delete_own" on public.food_analysis_jobs;
create policy "food_analysis_jobs_select_own" on public.food_analysis_jobs for select using (user_id = auth.uid());
create policy "food_analysis_jobs_insert_own" on public.food_analysis_jobs for insert with check (user_id = auth.uid());
create policy "food_analysis_jobs_update_own" on public.food_analysis_jobs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "food_analysis_jobs_delete_own" on public.food_analysis_jobs for delete using (user_id = auth.uid());
