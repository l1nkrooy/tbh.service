"use client";

import { motion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Направление появления */
  from?: "bottom" | "left" | "right" | "fade";
  /** Дистанция смещения в px */
  distance?: number;
}

const directionOffset: Record<
  NonNullable<RevealProps["from"]>,
  { x?: number; y?: number }
> = {
  bottom: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  fade: {},
};

/**
 * Универсальный компонент плавного появления при попадании в viewport.
 * Используется почти на каждой секции сайта — единая "подпись" motion-языка.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  distance,
}: RevealProps) {
  const offset = directionOffset[from];
  const dist = distance ?? 28;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x !== undefined ? (offset.x > 0 ? dist : -dist) : 0,
      y: offset.y !== undefined ? dist : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Контейнер для эффекта "stagger" — дети появляются по очереди */
export function RevealGroup({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
