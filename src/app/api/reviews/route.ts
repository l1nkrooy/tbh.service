import { NextResponse } from "next/server";
import { createReviewSchema } from "@/lib/validation";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * GET /api/reviews
 * Возвращает только опубликованные отзывы (is_published = true),
 * отсортированные по дате создания.
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, author_name, rating, text, service_label, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json(
        { error: "Failed to load reviews" },
        { status: 500 },
      );
    }

    return NextResponse.json({ reviews: data });
  } catch (err) {
    console.error("Unexpected error fetching reviews:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/reviews
 * Принимает новый отзыв от посетителя сайта. Отзыв сохраняется с
 * is_published = false и не отображается публично до модерации.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { authorName, rating, text, serviceLabel } = parsed.data;

  try {
    const supabase = await createSupabaseServiceClient();
    const { error } = await supabase.from("reviews").insert({
      author_name: authorName,
      rating,
      text,
      service_label: serviceLabel ?? null,
      is_published: false,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error submitting review:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
