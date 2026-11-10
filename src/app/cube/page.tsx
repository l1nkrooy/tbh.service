"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { LevelSlider } from "@/components/configurator/level-slider";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import { MAX_CUBE_LEVEL } from "@/data/characters";
import { calcCubePrice, formatRub, formatUsd } from "@/lib/pricing/calculator";
import type { CubeCartItem } from "@/types";

export default function CubePage() {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const [level, setLevel] = useState(30);
  const [justAdded, setJustAdded] = useState(false);

  const price = calcCubePrice(level);

  function handleAddToCart() {
    addItem<CubeCartItem>({
      type: "cube",
      titleKey: "cartItems.cube",
      priceRub: price,
      level,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.cube}
        title={t.cubePage.title}
        subtitle={t.cubePage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] border border-arcane/40 bg-arcane/10 text-arcane-bright"
                >
                  <Box size={28} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-bone-faint">
                    {t.cubePage.maxLevel}: {MAX_CUBE_LEVEL}
                  </p>
                  <p className="font-display text-2xl font-semibold text-bone">
                    {t.cubePage.title}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <LevelSlider
                  label={t.cubePage.currentLevel}
                  value={level}
                  min={1}
                  max={MAX_CUBE_LEVEL}
                  accent="var(--color-arcane-bright)"
                  onChange={setLevel}
                />
              </div>

              <div className="mt-10 flex flex-col gap-4 rounded-[var(--radius-md)] border border-line bg-panel-raised p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-bone-dim">{t.common.price}</p>
                  <p className="font-mono text-2xl font-semibold text-bone">
                    {formatRub(price)}{" "}
                    <span className="text-base text-bone-faint">{formatUsd(price)}</span>
                  </p>
                </div>
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
