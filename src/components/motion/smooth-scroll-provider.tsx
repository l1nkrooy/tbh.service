"use client";

import { ReactLenis } from "lenis/react";

/**
 * Глобальный провайдер плавного скролла (Lenis).
 * root="true" означает, что Lenis управляет скроллом всего документа,
 * без оборачивания в дополнительный div-контейнер.
 * Уважает prefers-reduced-motion через syncTouch/anchors отключение —
 * базовое CSS-правило в globals.css дополнительно глушит анимации.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
