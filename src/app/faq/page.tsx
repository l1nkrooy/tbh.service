"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup } from "@/components/motion/reveal";
import { FAQAccordionItem } from "@/components/faq/faq-accordion-item";
import { getFAQ } from "@/data/faq";
import { Button } from "@/components/ui/button";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com";

export default function FAQPage() {
  const { t, locale } = useI18n();
  const faqItems = getFAQ(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        eyebrow={t.nav.faq}
        title={t.faqPage.title}
        subtitle={t.faqPage.subtitle}
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <RevealGroup>
            {faqItems.map((item, i) => (
              <FAQAccordionItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </RevealGroup>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-panel p-8 text-center">
            <p className="text-bone-dim">{t.faqPage.subtitle}</p>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="discord">{t.hero.ctaDiscord}</Button>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
