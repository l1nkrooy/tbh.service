"use client";

import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { formatGoldShort, formatRub, formatUsd } from "@/lib/pricing/calculator";
import { revealItemVariants } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/types";

export function GoldTierCard({
  amount,
  priceRub,
  locale,
  selected,
  onSelect,
}: {
  amount: number;
  priceRub: number;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      variants={revealItemVariants}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border p-6 text-left transition-all duration-300",
        selected
          ? "border-relic bg-relic-dim/20"
          : "border-line bg-panel hover:border-bone-faint",
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border transition-colors duration-300",
          selected
            ? "border-relic/40 bg-relic/10 text-relic-bright"
            : "border-line bg-panel-raised text-bone-dim",
        )}
      >
        <Coins size={20} strokeWidth={1.6} />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold text-bone">
          {formatGoldShort(amount, locale)}
        </p>
        <p className="mt-1 font-mono text-sm text-bone-dim">
          {formatRub(priceRub)}{" "}
          <span className="text-bone-faint">{formatUsd(priceRub)}</span>
        </p>
      </div>
    </motion.button>
  );
}
