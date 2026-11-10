import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase-клиент для использования в клиентских компонентах ("use client").
 * Использует публичный анонимный ключ — безопасен для браузера благодаря
 * политикам Row Level Security (RLS), описанным в supabase/migrations.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
