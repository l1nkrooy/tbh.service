"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { revealItemVariants } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

interface ServiceCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  accent?: string;
  className?: string;
}

export function ServiceCard({
  href,
  icon: Icon,
  title,
  description,
  ctaLabel,
  accent = "var(--color-relic)",
  className,
}: ServiceCardProps) {
  return (
    <motion.div variants={revealItemVariants} className={cn("h-full", className)}>
      <Link
        href={href}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border border-line bg-panel p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-bone-faint"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        {/* Свечение на hover, привязанное к акцентному цвету карточки */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: accent }}
        />

        <div>
          <div
            className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-line bg-panel-raised text-bone transition-colors duration-300"
            style={{ color: accent }}
          >
            <Icon size={22} strokeWidth={1.6} />
          </div>

          <h3 className="mt-5 font-display text-base text-bone">
            {title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-bone-dim">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-bone-dim transition-colors duration-300 group-hover:text-bone">
          {ctaLabel}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </motion.div>
  );
}
