-- ============================================================================
-- Hero Service — начальная схема базы данных Supabase (PostgreSQL)
-- ============================================================================
-- Применение:
--   1. Откройте проект на supabase.com -> SQL Editor -> New query
--   2. Вставьте содержимое этого файла целиком и нажмите Run
-- Либо через Supabase CLI:
--   supabase db push
-- ============================================================================

-- Расширение для генерации UUID (включено по умолчанию в большинстве проектов
-- Supabase, но указываем явно для надёжности)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Таблица заказов
-- ----------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  items jsonb not null,
  total_rub integer not null check (total_rub >= 0),
  locale text not null default 'ru' check (locale in ('ru', 'en')),
  payment_channel text not null check (payment_channel in ('discord', 'funpay', 'donationalerts')),
  status text not null default 'new' check (status in ('new', 'in_progress', 'completed', 'cancelled')),
  contact_note text,
  created_at timestamptz not null default now()
);

comment on table public.orders is 'Заказы, оформленные через конфигуратор сайта';
comment on column public.orders.items is 'Массив позиций корзины в формате CartItem[] (см. src/types/index.ts)';
comment on column public.orders.order_number is 'Человекочитаемый номер заказа, напр. TBH-240626-XK4P';

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

-- Разрешаем анонимную вставку заказа (любой посетитель сайта может оформить
-- заказ без регистрации — таково требование проекта "без регистрации").
create policy "Anyone can insert an order"
  on public.orders for insert
  to anon
  with check (true);

-- Публичное чтение заказов запрещено: заказ можно посмотреть только зная
-- его order_number, что реализуется через серверный route handler
-- с service-role ключом (см. src/app/api/orders/[id]/route.ts),
-- а не через прямой публичный SELECT.
-- Если нужно разрешить чтение собственного заказа по id со стороны клиента,
-- раскомментируйте политику ниже:
-- create policy "Anyone can read an order by id"
--   on public.orders for select
--   to anon
--   using (true);

-- ----------------------------------------------------------------------------
-- Таблица отзывов
-- ----------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(author_name) between 1 and 80),
  rating smallint not null check (rating between 1 and 5),
  text text not null check (char_length(text) between 1 and 2000),
  service_label text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.reviews is 'Отзывы клиентов, проходят модерацию перед публикацией (is_published)';

create index if not exists reviews_published_idx on public.reviews (is_published, created_at desc);

alter table public.reviews enable row level security;

-- Любой может отправить отзыв (попадает на модерацию, is_published = false)
create policy "Anyone can submit a review"
  on public.reviews for insert
  to anon
  with check (is_published = false);

-- Публично видны только опубликованные отзывы
create policy "Anyone can read published reviews"
  on public.reviews for select
  to anon
  using (is_published = true);

-- ----------------------------------------------------------------------------
-- Сидовые данные: несколько примеров отзывов для демонстрации интерфейса
-- (опубликованы сразу, is_published = true)
-- ----------------------------------------------------------------------------
insert into public.reviews (author_name, rating, text, service_label, is_published, created_at)
values
  ('Денис К.', 5, 'Заказывал второй пак, всё сделали за ночь, скинули скрины каждого этапа. Никаких проблем с аккаунтом.', 'Пак №2', true, now() - interval '12 days'),
  ('Алина', 5, 'Прокачала Rangers и Sorcerer до 80 уровня, отдельно куб — конфигуратор удобный, сразу видно итоговую цену.', 'Прокачка персонажей', true, now() - interval '9 days'),
  ('Максим', 4, 'Буст до Hell 3-1 прошёл быстрее, чем ожидал. Из минусов — пришлось подождать пару часов в очереди вечером.', 'Буст по этажам', true, now() - interval '6 days'),
  ('Игорь Т.', 5, 'Купил золото 10 млрд, пришло в течение часа. Удобно, что оплата гибкая — рассчитались через Steam.', 'Золото', true, now() - interval '3 days')
on conflict do nothing;
