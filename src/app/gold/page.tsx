"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { GoldTierCard } from "@/components/configurator/gold-tier-card";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { RevealGroup } from "@/components/motion/reveal";
import { GOLD_TIERS } from "@/data/packs";
import { calcGoldPrice, formatGoldShort, formatRub } from "@/lib/pricing/calculator";
import type { GoldCartItem } from "@/types";

const MIN_GOLD_AMOUNT = 1_000_000; // 1 миллион — минимальный заказ
const MAX_GOLD_AMOUNT = 1_000_000_000_000; // 1 триллион — максимальный заказ

export default function GoldPage() {
  const { t, locale } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const customNumeric = Number(customAmount.replace(/\D/g, "")) || 0;
  const isCustomTooLow = customNumeric > 0 && customNumeric < MIN_GOLD_AMOUNT;
  const isCustomTooHigh = customNumeric > MAX_GOLD_AMOUNT;
  const customIsValid = customNumeric > 0 && !isCustomTooLow && !isCustomTooHigh;

  const activeAmount = customIsValid ? customNumeric : selectedAmount;
  const price = activeAmount ? calcGoldPrice(activeAmount) : 0;

  function handleSelectTier(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handleAddToCart() {
    if (!activeAmount) return;
    addItem<GoldCartItem>({
      type: "gold",
      titleKey: "cartItems.gold",
      priceRub: price,
      amount: activeAmount,
    });
    setJustAdded(true);
    setSelectedAmount(null);
    setCustomAmount("");
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.gold}
        title={t.goldPage.title}
        subtitle={t.goldPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {GOLD_TIERS.map((tier) => (
                <GoldTierCard
                  key={tier.amount}
                  amount={tier.amount}
                  priceRub={tier.priceRub}
                  locale={locale}
                  selected={selectedAmount === tier.amount}
                  onSelect={() => handleSelectTier(tier.amount)}
                />
              ))}
            </RevealGroup>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-line bg-panel p-6">
              <label className="text-sm text-bone-dim">
                {t.goldPage.customAmount}
              </label>
              <p className="mt-1 text-xs text-bone-faint">
                {t.goldPage.customAmountLimits
                  .replace("{min}", formatGoldShort(MIN_GOLD_AMOUNT, locale))
                  .replace("{max}", formatGoldShort(MAX_GOLD_AMOUNT, locale))}
              </p>
              <input
                type="text"
                inputMode="numeric"
                placeholder="500 000 000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-2.5 w-full rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-3 font-mono text-bone outline-none transition-colors focus:border-relic"
              />
              {customNumeric > 0 && customIsValid && (
                <p className="mt-2 text-sm text-bone-faint">
                  {formatGoldShort(customNumeric, locale)} ≈ {formatRub(calcGoldPrice(customNumeric))}
                </p>
              )}
              {isCustomTooLow && (
                <p className="mt-2 text-sm text-blood-bright">
                  {t.goldPage.minAmountError.replace(
                    "{min}",
                    formatGoldShort(MIN_GOLD_AMOUNT, locale),
                  )}
                </p>
              )}
              {isCustomTooHigh && (
                <p className="mt-2 text-sm text-blood-bright">
                  {t.goldPage.maxAmountError.replace(
                    "{max}",
                    formatGoldShort(MAX_GOLD_AMOUNT, locale),
                  )}
                </p>
              )}
            </div>

            {activeAmount ? (
              <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-relic/40 bg-relic-dim/20 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-bone-dim">
                    {formatGoldShort(activeAmount, locale)}
                  </p>
                  <p className="font-mono text-2xl font-semibold text-bone">
                    {formatRub(price)}
                  </p>
                </div>
                <Button variant="primary" onClick={handleAddToCart} className="w-full sm:w-auto">
                  {justAdded ? t.common.added : t.common.addToCart}
                </Button>
              </div>
            ) : null}
          </div>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
