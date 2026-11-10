"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { formatGoldShort, formatRub, formatUsd } from "@/lib/pricing/calculator";
import { revealItemVariants } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { PackDef } from "@/types";
import { cn } from "@/lib/utils/cn";

export function PackCard({
  pack,
  index,
}: {
  pack: PackDef;
  index: number;
}) {
  const { t, locale } = useI18n();
  const isFeatured = index === 1;

  const features = [
    `${t.charactersPage.title}: ${t.common.level} ${pack.characterLevel}`,
    `${formatGoldShort(pack.goldAmount, locale)} ${t.services.gold.title.toLowerCase()}`,
    `${t.cubePage.title}: ${t.common.level} ${pack.cubeLevel}`,
    ...(pack.unlocksAllDLCPets ? [t.petsPage.title] : []),
    ...(pack.bonusStatPoints ? [t.charactersPage.skillPointsLabel] : []),
  ];

  return (
    <motion.div
      variants={revealItemVariants}
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-lg)] border p-8 transition-all duration-500 hover:-translate-y-1.5",
        isFeatured
          ? "border-relic/50 bg-gradient-to-b from-relic-dim/40 to-panel shadow-[var(--shadow-glow-relic)]"
          : "border-line bg-panel",
      )}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-8 flex items-center gap-1.5 rounded-full bg-relic px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-ash">
          <Sparkle size={11} />
          {t.packsPage.mostPopular}
        </span>
      )}

      <h3 className="font-display text-lg text-bone">
        {t.packsPage.names[pack.id as "pack-1" | "pack-2" | "pack-3"]}
      </h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold text-bone">
          {formatRub(pack.priceRub)}
        </span>
        <span className="font-mono text-sm text-bone-faint">
          {formatUsd(pack.priceRub)}
        </span>
      </div>

      <ul className="mt-7 flex-1 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-bone-dim">
            <Check
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: pack.accent }}
            />
            {feature}
          </li>
        ))}
      </ul>

      <Link href={`/packs/${pack.id}`} className="mt-8">
        <Button
          variant={isFeatured ? "primary" : "secondary"}
          className="w-full"
        >
          {t.packsPage.selectPack}
        </Button>
      </Link>
    </motion.div>
  );
}
