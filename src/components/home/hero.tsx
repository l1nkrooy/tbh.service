"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { EmberParticles } from "@/components/motion/ember-particles";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com";
const FUNPAY_URL = process.env.NEXT_PUBLIC_FUNPAY_URL ?? "https://funpay.com";

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Параллакс при скролле: сцена уходит вверх и тает чуть быстрее текста
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fogY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Лёгкий параллакс по движению мыши — фон слегка "плывёт" за курсором
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const bgX = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const vignette = useMotionTemplate`radial-gradient(ellipse 75% 65% at 32% 45%, transparent 25%, #0a0a0d 92%)`;

  function handleScrollHint() {
    const next = sectionRef.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-ash"
    >
      {/* Фоновая сцена: авторское изображение рыцаря под кровавой луной,
          с лёгким параллаксом по скроллу и движению мыши. */}
      <motion.div
        style={{ y: sceneY, x: bgX, translateY: bgY, scale: sceneScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/knight-bg.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[80%_center] md:object-[72%_center] lg:object-center"
        />
      </motion.div>

      {/* Радиальные подсветки атмосферы поверх фото для единства с общей
          цветовой палитрой сайта */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 15%, rgba(196,53,68,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(103,83,163,0.08), transparent 60%)",
        }}
      />

      {/* Туман — несколько слоёв размытых эллипсов, мягко плавающих */}
      <motion.div
        style={{ y: fogY }}
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -left-1/4 bottom-0 h-64 w-[70%] rounded-full bg-panel/50 blur-3xl"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-72 w-[80%] rounded-full bg-blood-dim/30 blur-3xl"
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <EmberParticles
        count={20}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      {/* Виньетка: затемняет правый край фото и низ экрана для глубины
          и читаемости текста, оставляя левую часть (где текст) светлее */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: vignette }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ash/85 via-ash/35 to-transparent lg:from-ash/55 lg:via-ash/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ash via-ash/40 to-transparent lg:h-1/3" />

      {/* Контент */}
      <Container className="relative z-10 flex h-full flex-col justify-center pt-20">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-bone-dim backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-relic shadow-[0_0_8px_var(--color-relic)]" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-2xl text-bone sm:text-3xl lg:text-4xl"
          >
            {t.hero.title}{" "}
            <span className="text-gradient-relic">
              {t.hero.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-md text-balance text-lg leading-relaxed text-bone-dim"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/services">
              <Button variant="primary" size="lg">
                {t.hero.ctaPrimary}
              </Button>
            </Link>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="discord" size="lg">
                {t.hero.ctaDiscord}
              </Button>
            </a>
            <a href={FUNPAY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="funpay" size="lg">
                {t.hero.ctaFunpay}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* Индикатор прокрутки */}
      <motion.button
        onClick={handleScrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone-faint transition-colors hover:text-bone-dim cursor-pointer sm:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-wider">
          {t.hero.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  );
}
