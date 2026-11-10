"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="relative flex items-center rounded-full border border-line bg-panel p-0.5 text-xs font-mono">
      {(["ru", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "relative z-10 rounded-full px-3 py-1.5 uppercase tracking-wide transition-colors duration-300 cursor-pointer",
            locale === l ? "text-ash" : "text-bone-dim hover:text-bone",
          )}
        >
          {locale === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 -z-10 rounded-full bg-relic"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}
