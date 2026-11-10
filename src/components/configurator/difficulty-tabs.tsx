"use client";

import { motion } from "framer-motion";
import type { Difficulty } from "@/types";
import { cn } from "@/lib/utils/cn";

const DIFFICULTIES: { id: Difficulty; accent: string }[] = [
  { id: "normal", accent: "#4f7a52" },
  { id: "nightmare", accent: "#6753a3" },
  { id: "hell", accent: "#c43544" },
  { id: "torment", accent: "#9c2531" },
];

export function DifficultyTabs({
  value,
  onChange,
  labels,
}: {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
  labels: Record<Difficulty, string>;
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-full border border-line bg-panel p-1.5">
      {DIFFICULTIES.map((d) => {
        const isActive = d.id === value;
        return (
          <button
            key={d.id}
            onClick={() => onChange(d.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer",
              isActive ? "text-ash" : "text-bone-dim hover:text-bone",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="difficulty-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: d.accent }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {labels[d.id]}
          </button>
        );
      })}
    </div>
  );
}
