"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { locale } = useI18n();

  const title = locale === "ru" ? "Страница не найдена" : "Page not found";
  const subtitle =
    locale === "ru"
      ? "Похоже, этот этаж ещё не открыт"
      : "Looks like this floor hasn't been unlocked yet";
  const cta = locale === "ru" ? "На главную" : "Back home";

  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] bg-blood-dim text-relic-bright"
        >
          <Swords size={28} strokeWidth={1.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-mono text-6xl font-semibold text-bone-faint"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 font-display text-2xl font-semibold text-bone"
        >
          {title}
        </motion.h1>
        <p className="mt-2 text-bone-dim">{subtitle}</p>

        <Link href="/" className="mt-8">
          <Button variant="primary">{cta}</Button>
        </Link>
      </Container>
    </section>
  );
}
