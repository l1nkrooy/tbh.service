import { NextResponse } from "next/server";
import { createOrderSchema } from "@/lib/validation";
import { generateOrderNumber } from "@/lib/order-number";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * POST /api/orders
 * Создаёт заказ в Supabase. Использует service-role клиент, так как
 * генерация order_number и финальная проверка total_rub происходят
 * на сервере (клиент не может подделать сумму заказа).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { items, totalRub, locale, paymentChannel, contactNote } = parsed.data;

  // Пересчитываем сумму на сервере из items, чтобы не доверять totalRub
  // от клиента напрямую — это контрольная сумма.
  const recalculatedTotal = items.reduce((sum, item) => sum + item.priceRub, 0);
  if (recalculatedTotal !== totalRub) {
    return NextResponse.json(
      { error: "Total mismatch", expected: recalculatedTotal },
      { status: 400 },
    );
  }

  const orderNumber = generateOrderNumber();

  try {
    const supabase = await createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        items,
        total_rub: totalRub,
        locale,
        payment_channel: paymentChannel,
        contact_note: contactNote ?? null,
      })
      .select("id, order_number, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error creating order:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
