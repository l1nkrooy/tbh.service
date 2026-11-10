-- ============================================================================
-- Миграция 0002: добавление способа оплаты DonationAlerts
-- ============================================================================
-- Применяется только если вы уже выполнили 0001_init.sql ранее (то есть
-- таблица orders уже существует в вашем проекте Supabase). Если вы
-- разворачиваете проект с нуля, в этой миграции уже учтено через
-- обновлённый 0001_init.sql — выполнять 0002 отдельно не нужно.
-- ============================================================================

alter table public.orders drop constraint if exists orders_payment_channel_check;

alter table public.orders
  add constraint orders_payment_channel_check
  check (payment_channel in ('discord', 'funpay', 'donationalerts'));
