"use client";

import { CreditCard, MessageCircle, ShoppingBag, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { revealItemVariants } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com";
const FUNPAY_URL = process.env.NEXT_PUBLIC_FUNPAY_URL ?? "https://funpay.com";
const DONATIONALERTS_URL =
  process.env.NEXT_PUBLIC_DONATIONALERTS_URL ?? "https://donationalerts.com";

export default function ContactsPage() {
  const { t } = useI18n();

  const cards = [
    {
      id: "discord",
      icon: MessageCircle,
      label: t.contactsPage.discordLabel,
      hint: t.contactsPage.discordHint,
      href: DISCORD_URL,
      variant: "discord" as const,
      accent: "#5865F2",
    },
    {
      id: "funpay",
      icon: ShoppingBag,
      label: t.contactsPage.funpayLabel,
      hint: t.contactsPage.funpayHint,
      href: FUNPAY_URL,
      variant: "funpay" as const,
      accent: "#c9a227",
    },
    {
      id: "donationalerts",
      icon: CreditCard,
      label: t.contactsPage.donationalertsLabel,
      hint: t.contactsPage.donationalertsHint,
      href: DONATIONALERTS_URL,
      variant: "donationalerts" as const,
      accent: "#FF7426",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.nav.contacts}
        title={t.contactsPage.title}
        subtitle={t.contactsPage.subtitle}
      />

      <section className="py-16">
        <Container className="max-w-4xl">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <motion.a
                key={card.id}
                variants={revealItemVariants}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-line"
                  style={{ color: card.accent }}
                >
                  <card.icon size={22} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-bone">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm text-bone-dim">{card.hint}</p>
                </div>
                <Button variant={card.variant} className="mt-1 w-fit">
                  {card.label}
                </Button>
              </motion.a>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-panel-raised p-6">
              <Clock size={20} className="shrink-0 text-relic" />
              <div>
                <p className="text-sm text-bone-dim">
                  {t.contactsPage.responseTime}
                </p>
                <p className="font-mono text-lg font-semibold text-bone">
                  {t.contactsPage.responseTimeValue}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
