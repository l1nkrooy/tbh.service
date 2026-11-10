"use client";

import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface BoostStageMapProps {
  act: 1 | 2 | 3;
  stage: number;
  onSelectStage: (stage: number) => void;
  accent: string;
}

/**
 * Визуализация этажей внутри акта (1..10, где 10 — босс),
 * стилизована по мотивам карты "Portal" из Task Bar Hero,
 * но как собственная минималистичная узловая диаграмма.
 */
export function BoostStageMap({
  act,
  stage,
  onSelectStage,
  accent,
}: BoostStageMapProps) {
  const stages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {stages.map((s) => {
        const isBoss = s === 10;
        const isActive = s === stage;
        const isCleared = s < stage;

        return (
          <motion.button
            key={s}
            type="button"
            onClick={() => onSelectStage(s)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-full border font-mono text-sm font-medium transition-all duration-300",
              isActive
                ? "border-transparent text-ash"
                : isCleared
                  ? "border-line bg-panel-raised text-bone-dim"
                  : "border-line bg-panel text-bone-faint hover:border-bone-faint",
            )}
            style={isActive ? { background: accent } : undefined}
          >
            {isBoss ? <Skull size={16} /> : `${act}-${s}`}
            {isActive && (
              <motion.span
                layoutId="boost-stage-ring"
                className="absolute -inset-1.5 rounded-full border-2"
                style={{ borderColor: accent }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
