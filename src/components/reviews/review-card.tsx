"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { revealItemVariants } from "@/components/motion/reveal";

interface ReviewCardProps {
  authorName: string;
  rating: number;
  text: string;
  serviceLabel: string | null;
  date: string;
}

export function ReviewCard({
  authorName,
  rating,
  text,
  serviceLabel,
  date,
}: ReviewCardProps) {
  return (
    <motion.div
      variants={revealItemVariants}
      className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-panel p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-raised font-display text-sm font-semibold text-bone">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-bone">{authorName}</p>
            <p className="text-xs text-bone-faint">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={13}
              className={i < rating ? "fill-relic text-relic" : "text-line"}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-bone-dim">{text}</p>

      {serviceLabel && (
        <span className="mt-4 inline-flex w-fit rounded-full border border-line px-2.5 py-1 text-[11px] text-bone-faint">
          {serviceLabel}
        </span>
      )}
    </motion.div>
  );
}
