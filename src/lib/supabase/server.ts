import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-клиент для использования в серверных компонентах,
 * route handlers (src/app/api/**) и server actions.
 * Работает с cookies для возможной будущей аутентификации,
 * хотя текущий функционал заказов не требует регистрации пользователя.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll вызывается из Server Component — игнорируем,
            // т.к. сессия обновляется через middleware при необходимости.
          }
        },
      },
    },
  );
}

/**
 * Клиент с service-role ключом для серверных операций, которые должны
 * обходить RLS (например, запись заказа без публичного INSERT-доступа
 * для произвольных полей типа order_number). Используется ТОЛЬКО
 * в route handlers, никогда не импортируется в клиентский код.
 */
export async function createSupabaseServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
