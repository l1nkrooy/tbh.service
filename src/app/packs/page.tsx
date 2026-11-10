"use client";

import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup } from "@/components/motion/reveal";
import { PackCard } from "@/components/home/pack-card";
import { PACKS } from "@/data/packs";

export default function PacksPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.nav.packs}
        title={t.packsPage.title}
        subtitle={t.packsPage.subtitle}
      />

      <section className="py-16">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PACKS.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
