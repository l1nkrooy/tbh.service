"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { EmberScrollDivider } from "@/components/motion/ember-scroll-divider";
import { PackCard } from "@/components/home/pack-card";
import { PACKS } from "@/data/packs";

export function PacksSection() {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-24">
      <EmberScrollDivider className="absolute inset-x-0 top-0 h-px w-full bg-line" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-relic">
              {t.nav.packs}
            </p>
            <h2 className="mt-3 max-w-lg text-balance font-display text-xl text-bone sm:text-2xl lg:text-3xl">
              {t.home.packsTitle}
            </h2>
            <p className="mt-4 max-w-md text-bone-dim">
              {t.home.packsSubtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/packs"
              className="text-sm font-medium text-bone-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              {t.home.viewAllPacks} →
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PACKS.map((pack, i) => (
            <PackCard key={pack.id} pack={pack} index={i} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
