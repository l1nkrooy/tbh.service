"use client";

import { useMemo, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Sparkle, TrendingDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import { PACKS } from "@/data/packs";
import { BASE_CHARACTERS } from "@/data/characters";
import {
  calcCharacterLevelPrice,
  calcCubePrice,
  calcGoldPrice,
  calcBoostPrice,
  formatGoldShort,
  formatRub,
  formatUsd,
  PETS_UNLOCK_PRICE,
} from "@/lib/pricing/calculator";
import type { PackCartItem } from "@/types";

export default function PackDetailPage() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const [includeBoost, setIncludeBoost] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  const pack = PACKS.find((p) => p.id === params.slug);

  // Расчёт "честной" стоимости компонентов по отдельности для сравнения
  const individualTotal = useMemo(() => {
    if (!pack) return 0;
    const charactersCost =
      BASE_CHARACTERS.reduce(
        (sum, c) => sum + calcCharacterLevelPrice(c, pack.characterLevel, false),
        0,
      ) * 0.85; // применяем максимальную оптовую скидку за 4 персонажа сразу
    const cubeCost = calcCubePrice(pack.cubeLevel);
    const goldCost = calcGoldPrice(pack.goldAmount);
    const petsCost = pack.unlocksAllDLCPets ? PETS_UNLOCK_PRICE : 0;
    const boostCost =
      includeBoost && pack.optionalBoost ? calcBoostPrice(pack.optionalBoost) : 0;
    return Math.round(charactersCost + cubeCost + goldCost + petsCost + boostCost);
  }, [pack, includeBoost]);

  if (!pack) {
    notFound();
    return null;
  }

  const confirmedPack = pack;

  const finalPrice =
    pack.priceRub + (includeBoost && pack.optionalBoost ? Math.round(pack.priceRub * 0.18) : 0);
  const savings = Math.max(0, individualTotal - finalPrice);
  const savingsPercent =
    individualTotal > 0 ? Math.round((savings / individualTotal) * 100) : 0;

  const includedFeatures = [
    `${t.charactersPage.title} — ${t.common.level} ${pack.characterLevel} (Knight, Priest, Sorcerer, Ranger)`,
    `${formatGoldShort(pack.goldAmount, locale)} ${t.services.gold.title.toLowerCase()}`,
    `${t.cubePage.title} — ${t.common.level} ${pack.cubeLevel}`,
    ...(pack.unlocksAllDLCPets ? [t.petsPage.title] : []),
    ...(pack.bonusStatPoints ? [t.charactersPage.skillPointsLabel] : []),
  ];

  function handleAddToCart() {
    addItem<PackCartItem>({
      type: "pack",
      titleKey: "cartItems.pack",
      priceRub: finalPrice,
      packId: confirmedPack.id,
      includeBoost,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const boostLabel = pack.optionalBoost
    ? `${t.boostPage[pack.optionalBoost.difficulty]} ${pack.optionalBoost.act}-${pack.optionalBoost.stage}`
    : "";

  const packName = t.packsPage.names[confirmedPack.id as "pack-1" | "pack-2" | "pack-3"];

  return (
    <>
      <PageHeader
        eyebrow={t.packsPage.title}
        title={packName}
        subtitle={t.packsPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-8">
                <div className="flex items-center gap-2">
                  <Sparkle size={16} style={{ color: pack.accent }} />
                  <h2 className="font-display text-base text-bone">
                    {t.packsPage.includesTitle}
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {includedFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-bone-dim">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: pack.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {pack.optionalBoost && (
                  <div className="mt-6 rounded-[var(--radius-md)] border border-line bg-panel-raised p-5">
                    <label className="flex cursor-pointer items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-bone">
                          {t.packsPage.optionalTitle}: {t.boostPage.title}
                        </p>
                        <p className="mt-1 text-xs text-bone-faint">{boostLabel}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeBoost}
                        onChange={(e) => setIncludeBoost(e.target.checked)}
                        className="h-5 w-5 rounded border-line bg-panel accent-relic"
                      />
                    </label>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-8">
                <div className="flex items-center gap-2">
                  <TrendingDown size={16} className="text-sage" />
                  <h2 className="font-display text-base text-bone">
                    {t.packsPage.compareTitle}
                  </h2>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-bone-dim">{t.packsPage.compareIndividual}</span>
                    <span className="font-mono text-bone-faint line-through">
                      {formatRub(individualTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-bone-dim">{t.packsPage.comparePack}</span>
                    <span className="font-mono font-semibold text-bone">
                      {formatRub(finalPrice)}
                    </span>
                  </div>
                  <div className="ember-divider" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-sage">
                      {t.packsPage.youSave}
                    </span>
                    <span className="font-mono text-base font-semibold text-sage">
                      {formatRub(savings)} ({savingsPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 rounded-[var(--radius-lg)] border p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: `${pack.accent}66`, background: `${pack.accent}14` }}
            >
              <p className="font-mono text-3xl font-semibold text-bone">
                {formatRub(finalPrice)}{" "}
                <span className="text-lg text-bone-faint">{formatUsd(finalPrice)}</span>
              </p>
              <Button variant="primary" onClick={handleAddToCart} className="w-full sm:w-auto">
                {justAdded ? t.common.added : t.common.addToCart}
              </Button>
            </motion.div>
          </div>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
