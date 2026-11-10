"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Ember divider" — фирменная тонкая линия-разделитель между секциями,
 * по которой при скролле страницы пробегает светящаяся точка-уголёк
 * (визуальная отсылка к прогрессу по этажам в игре).
 * Анимация выполнена через GSAP ScrollTrigger — связывает позицию точки
 * напрямую со scroll-прогрессом элемента в видимой области, что даёт
 * более точный контроль, чем декларативные хуки Framer Motion для
 * этого специфичного scrubbing-эффекта.
 */
export function EmberScrollDivider({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const dot = dotRef.current;
    if (!container || !dot) return;

    const tween = gsap.fromTo(
      dot,
      { left: "0%", opacity: 0 },
      {
        left: "100%",
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "relative h-px w-full bg-line"}
      aria-hidden="true"
    >
      <span
        ref={dotRef}
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-relic-bright"
        style={{ boxShadow: "0 0 12px var(--color-relic-bright)" }}
      />
    </div>
  );
}
