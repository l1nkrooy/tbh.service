"use client";

import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getTerms } from "@/data/terms";

export default function TermsPage() {
  const { t, locale } = useI18n();
  const sections = getTerms(locale);

  return (
    <>
      <PageHeader eyebrow={t.nav.terms} title={t.termsPage.title} />

      <section className="py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-bone-faint">
              {t.termsPage.lastUpdated}: 27.06.2026
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            {sections.map((section, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.3)}>
                <h2 className="font-display text-xl font-semibold text-bone">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-bone-dim">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
