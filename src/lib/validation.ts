import { z } from "zod";

/**
 * Схема валидации тела запроса для создания заказа (POST /api/orders).
 * Используется на сервере для строгой проверки данных, пришедших от
 * клиента, прежде чем записывать их в Supabase.
 */
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum([
          "pack",
          "gold",
          "characters",
          "cube",
          "boost",
          "pets",
          "talent-tree",
          "char-tree",
        ]),
        priceRub: z.number().int().nonnegative(),
        titleKey: z.string(),
      }).passthrough(),
    )
    .min(1, "Корзина не может быть пустой"),
  totalRub: z.number().int().nonnegative(),
  locale: z.enum(["ru", "en"]),
  paymentChannel: z.enum(["discord", "funpay", "donationalerts"]),
  contactNote: z.string().max(500).optional().nullable(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const createReviewSchema = z.object({
  authorName: z.string().min(1).max(80),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1).max(2000),
  serviceLabel: z.string().max(120).optional().nullable(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
