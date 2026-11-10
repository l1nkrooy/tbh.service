"use client";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(156,37,49,0.10), transparent 70%)",
        }}
      />
      <Container className="relative z-10">
        <Reveal>
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-wider text-relic">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 max-w-2xl text-balance font-display text-xl text-bone sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-lg text-balance text-bone-dim">
              {subtitle}
            </p>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
