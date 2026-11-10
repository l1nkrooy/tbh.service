"use client";

import Link from "next/link";
import { Swords, MessageCircle, ShoppingBag } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const NAV_COLUMN = [
  { href: "/services", key: "services" as const },
  { href: "/packs", key: "packs" as const },
  { href: "/characters", key: "characters" as const },
  { href: "/gold", key: "gold" as const },
  { href: "/cube", key: "cube" as const },
  { href: "/boost", key: "boost" as const },
];

const LEGAL_COLUMN = [
  { href: "/faq", key: "faq" as const },
  { href: "/terms", key: "terms" as const },
  { href: "/reviews", key: "reviews" as const },
  { href: "/contacts", key: "contacts" as const },
];

export function FooterContent() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <div>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 text-bone">
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-blood-dim text-relic-bright">
              <Swords size={18} strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Hero<span className="text-relic">.</span>Service
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-dim">
            {t.footer.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone-dim transition-colors hover:border-[#5865F2] hover:text-[#5865F2]"
              aria-label="Discord"
            >
              <MessageCircle size={16} strokeWidth={1.75} />
            </a>
            <a
              href="https://funpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone-dim transition-colors hover:border-relic hover:text-relic"
              aria-label="FunPay"
            >
              <ShoppingBag size={16} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-bone-faint">
            {t.footer.navTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_COLUMN.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-bone-faint">
            {t.footer.legalTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_COLUMN.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ember-divider my-10" />

      <div className="flex flex-col gap-4 text-xs text-bone-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Hero Service. {t.footer.rights}.
        </p>
        <p className="max-w-2xl sm:text-right">{t.footer.disclaimer}</p>
      </div>
    </div>
  );
}
