"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface LevelSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  accent?: string;
  className?: string;
}

/**
 * Кастомный слайдер уровня — используется на страницах прокачки персонажей,
 * Куба и буста. Нативный range input спрятан для accessibility/клавиатуры,
 * визуальный трек и ручка нарисованы отдельно для премиального вида.
 */
export function LevelSlider({
  value,
  min,
  max,
  onChange,
  label,
  accent = "var(--color-relic)",
  className,
}: LevelSliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-3 flex items-center justify-between">
          <label htmlFor={id} className="text-sm text-bone-dim">
            {label}
          </label>
          <span
            className="font-mono text-lg font-semibold tabular-nums"
            style={{ color: accent }}
          >
            {value}
          </span>
        </div>
      )}

      <div className="relative flex h-10 items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-line" />
        <motion.div
          className="absolute left-0 h-1.5 rounded-full"
          style={{ width: `${percent}%`, background: accent }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <motion.div
          className="absolute h-5 w-5 -translate-x-1/2 rounded-full border-2 shadow-md"
          style={{
            left: `${percent}%`,
            background: "var(--color-bone)",
            borderColor: accent,
          }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </div>

      <div className="mt-1 flex justify-between font-mono text-[11px] text-bone-faint">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
