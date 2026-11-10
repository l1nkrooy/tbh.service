"use client";

import { forwardRef } from "react";
import { Swords } from "lucide-react";
import type { CartItem, Locale } from "@/types";
import type { Dict } from "@/lib/i18n/dictionaries";
import { cartItemLabel } from "@/lib/cart-item-label";
import { formatRub, formatUsd } from "@/lib/pricing/calculator";

interface OrderReceiptCardProps {
  orderNumber: string;
  items: CartItem[];
  total: number;
  t: Dict;
  locale: Locale;
  date: string;
}

/**
 * Визуальная "квитанция" заказа, стилизованная под фирменный дизайн сайта.
 * Этот DOM-узел рендерится скрыто на странице checkout и конвертируется
 * в PNG через html-to-image при нажатии "Скачать заказ" — пользователь
 * получает красивую картинку для отправки в Discord.
 */
export const OrderReceiptCard = forwardRef<HTMLDivElement, OrderReceiptCardProps>(
  function OrderReceiptCard({ orderNumber, items, total, t, locale, date }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: 600,
          padding: 40,
          background:
            "linear-gradient(160deg, #14131a 0%, #0a0a0d 100%)",
          color: "#ebe7df",
          fontFamily: "Inter, sans-serif",
          border: "1px solid #26242f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#4a1620",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e0bc4a",
            }}
          >
            <Swords size={18} strokeWidth={1.75} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Hero<span style={{ color: "#c9a227" }}>.</span>Service
          </span>
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid #26242f",
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: 1, color: "#67646f", textTransform: "uppercase", fontFamily: "monospace" }}>
            {t.checkout.orderNumber}
          </p>
          <p style={{ fontSize: 26, fontWeight: 600, fontFamily: "monospace", color: "#e0bc4a", marginTop: 4 }}>
            {orderNumber}
          </p>
          <p style={{ fontSize: 12, color: "#67646f", marginTop: 2 }}>{date}</p>
        </div>

        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 12, color: "#9c98a3", marginBottom: 12 }}>
            {t.checkout.yourOrder}
          </p>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 0",
                borderBottom: "1px solid #1b1a23",
                fontSize: 14,
              }}
            >
              <span style={{ color: "#ebe7df" }}>
                {cartItemLabel(item, t, locale)}
              </span>
              <span style={{ fontFamily: "monospace", color: "#9c98a3", whiteSpace: "nowrap", textAlign: "right" }}>
                {formatRub(item.priceRub)}
                <br />
                <span style={{ fontSize: 11, color: "#67646f" }}>
                  {formatUsd(item.priceRub)}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #26242f",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontSize: 14, color: "#9c98a3" }}>{t.checkout.totalLabel}</span>
          <span style={{ textAlign: "right" }}>
            <span style={{ fontSize: 28, fontWeight: 600, fontFamily: "monospace" }}>
              {formatRub(total)}
            </span>
            <br />
            <span style={{ fontSize: 13, fontFamily: "monospace", color: "#67646f" }}>
              {formatUsd(total)}
            </span>
          </span>
        </div>
      </div>
    );
  },
);
