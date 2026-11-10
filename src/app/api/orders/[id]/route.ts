import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * GET /api/orders/[id]
 * Возвращает заказ по его внутреннему uuid. Используется страницей
 * подтверждения заказа сразу после оформления (клиент получает id
 * из ответа POST /api/orders и сразу запрашивает полные данные при
 * необходимости, либо просто использует то, что уже есть в памяти).
 * Доступ через service-role клиент, так как публичный SELECT в RLS
 * отключён — заказ не должен быть доступен по перебору id посторонним.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(id)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  try {
    const supabase = await createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  } catch (err) {
    console.error("Unexpected error fetching order:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
