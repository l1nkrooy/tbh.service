"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number; // % позиции
  size: number;
  duration: number;
  delay: number;
  drift: number; // горизонтальное смещение при подъёме
  riseDistance: number; // дистанция подъёма частицы вверх
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 80,
    riseDistance: 400 + Math.random() * 300,
  }));
}

/**
 * Поле плавающих частиц-угольков для Hero-сцены.
 * Чисто декоративный CSS/SVG эффект — лёгкий по производительности
 * (transform-only анимации), без canvas/webgl.
 *
 * ВАЖНО: частицы используют Math.random() для случайных параметров,
 * поэтому генерация выполняется ИСКЛЮЧИТЕЛЬНО на клиенте после
 * монтирования (useEffect), а не во время рендера или в lazy useState
 * initializer. И сервер, и первый клиентский рендер показывают пустой
 * контейнер — это устраняет hydration mismatch, так как случайные
 * числа никогда не участвуют в SSR-выводе. Частицы появляются спустя
 * доли секунды после монтирования, что незаметно для декоративного
 * фонового эффекта.
 */
export function EmberParticles({
  count = 24,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Намеренно: Math.random() не может участвовать в SSR-выводе без
  // hydration mismatch, поэтому частицы генерируются строго на клиенте
  // после монтирования, а не во время рендера.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generateParticles(count));
  }, [count]);

  return (
    <div className={className} aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "var(--color-relic-bright)"
                : "var(--color-blood-bright)",
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            y: [0, -p.riseDistance],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
