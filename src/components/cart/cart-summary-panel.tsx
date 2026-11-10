"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { formatRub, formatUsd } from "@/lib/pricing/calculator";
import { Button } from "@/components/ui/button";
import { cartItemLabel } from "@/lib/cart-item-label";

/**
 * Sticky-панель "Ваш заказ", закреплённая в правой колонке на страницах
 * конфигуратора (характеристики, куб, буст, золото, доп. услуги).
 * Отражает состояние корзины в реальном времени.
 */
export function CartSummaryPanel() {
  const { t, locale } = useI18n();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = items.reduce((sum, i) => sum + i.priceRub, 0);

  return (
    <div className="sticky top-24 rounded-[var(--radius-lg)] border border-line bg-panel p-6">
      <div className="flex items-center gap-2.5">
        <ShoppingBag size={18} className="text-relic" />
        <h3 className="font-display text-lg font-semibold text-bone">
          {t.configurator.summaryTitle}
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 py-6 text-center">
          <p className="text-sm text-bone-dim">{t.configurator.emptyCart}</p>
          <p className="mt-1 text-xs text-bone-faint">
            {t.configurator.emptyCartHint}
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-5 max-h-[360px] space-y-2 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start justify-between gap-3 rounded-[var(--radius-sm)] bg-panel-raised px-3 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-bone">
                      {cartItemLabel(item, t, locale)}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-bone-faint">
                      {formatRub(item.priceRub)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-bone-faint transition-colors hover:text-blood-bright cursor-pointer"
                    aria-label={t.configurator.removeItem}
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm text-bone-dim">{t.common.total}</span>
            <motion.span
              key={total}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="text-right font-mono"
            >
              <span className="text-2xl font-semibold text-bone">
                {formatRub(total)}
              </span>
              <span className="ml-2 text-sm text-bone-faint">
                {formatUsd(total)}
              </span>
            </motion.span>
          </div>

          <Link href="/checkout" className="mt-5 block">
            <Button variant="primary" className="w-full">
              {t.configurator.proceedToCheckout}
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
