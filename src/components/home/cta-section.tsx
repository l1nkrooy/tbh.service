"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { EmberParticles } from "@/components/motion/ember-particles";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(156,37,49,0.12), transparent 70%)",
        }}
      />
      <EmberParticles count={10} className="pointer-events-none absolute inset-0 overflow-hidden" />

      <Container className="relative z-10 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-xl text-bone sm:text-2xl lg:text-3xl">
            {t.home.ctaSectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-bone-dim">
            {t.home.ctaSectionSubtitle}
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/services">
              <Button variant="primary" size="lg">
                {t.home.ctaSectionButton}
              </Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
