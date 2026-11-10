"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, Swords } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { cn } from "@/lib/utils/cn";

const PRIMARY_NAV_LINKS = [
  { href: "/services", key: "services" as const },
  { href: "/packs", key: "packs" as const },
  { href: "/characters", key: "characters" as const },
  { href: "/gold", key: "gold" as const },
  { href: "/cube", key: "cube" as const },
  { href: "/boost", key: "boost" as const },
];

const ALL_NAV_LINKS = [
  { href: "/", key: "home" as const },
  ...PRIMARY_NAV_LINKS,
  { href: "/reviews", key: "reviews" as const },
  { href: "/faq", key: "faq" as const },
  { href: "/terms", key: "terms" as const },
  { href: "/contacts", key: "contacts" as const },
];

export function SiteHeader() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const itemCount = useCartStore((s) => s.items.length);

  // Закрываем мобильное меню при навигации на новую страницу.
  // Паттерн "adjusting state during render" (см. react.dev) — безопаснее
  // и быстрее эффекта, так как не вызывает лишний цикл рендера.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "glass-panel border-b border-line/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-bone group shrink-0"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-blood-dim text-relic-bright transition-transform duration-300 group-hover:rotate-[-6deg]">
            <Swords size={18} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Hero<span className="text-relic">.</span>Service
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "text-bone"
                    : "text-bone-dim hover:text-bone",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-panel-raised"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>

          <Link
            href="/checkout"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone-dim transition-colors hover:text-bone hover:border-bone-faint"
            aria-label={t.nav.cart}
          >
            <ShoppingBag size={17} strokeWidth={1.75} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blood px-1 font-mono text-[10px] font-medium text-bone"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line glass-panel lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {ALL_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-bone-dim transition-colors hover:bg-panel hover:text-bone"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-end border-t border-line pt-4">
                <LanguageSwitch />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
