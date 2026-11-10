"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawPrint, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import { PETS_UNLOCK_PRICE, formatRub, formatUsd } from "@/lib/pricing/calculator";
import type { PetsCartItem } from "@/types";

export default function PetsPage() {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addItem<PetsCartItem>({
      type: "pets",
      titleKey: "cartItems.pets",
      priceRub: PETS_UNLOCK_PRICE,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const features = [
    t.petsPage.feature1,
    t.petsPage.feature2,
    t.petsPage.feature3,
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.services.pets.title}
        title={t.petsPage.title}
        subtitle={t.petsPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-8 sm:p-10">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] border border-relic/30 bg-relic/10 text-relic-bright"
              >
                <PawPrint size={28} strokeWidth={1.5} />
              </motion.div>

              <h2 className="mt-6 font-display text-2xl font-semibold text-bone">
                {t.petsPage.included}
              </h2>

              <ul className="mt-5 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-bone-dim">
                    <Check size={16} className="mt-0.5 shrink-0 text-relic" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 rounded-[var(--radius-md)] border border-line bg-panel-raised p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-2xl font-semibold text-bone">
                  {formatRub(PETS_UNLOCK_PRICE)}{" "}
                  <span className="text-base text-bone-faint">
                    {formatUsd(PETS_UNLOCK_PRICE)}
                  </span>
                </p>
                <Button variant="primary" onClick={handleAddToCart} className="w-full sm:w-auto">
                  {justAdded ? t.common.added : t.common.addToCart}
                </Button>
              </div>
            </div>
          </Reveal>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
