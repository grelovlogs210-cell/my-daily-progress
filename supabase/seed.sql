insert into public.profiles (id, email, name)
select
  users.id,
  users.email,
  coalesce(users.raw_user_meta_data->>'name', split_part(users.email, '@', 1))
from auth.users as users
on conflict (id) do nothing;

insert into public.daily_goals (user_id)
select users.id
from auth.users as users
on conflict (user_id, date) do nothing;

do $$
declare
  target_user uuid;
begin
  for target_user in select id from auth.users loop
    perform public.seed_default_habits_for_user(target_user);
  end loop;
end;
$$;
