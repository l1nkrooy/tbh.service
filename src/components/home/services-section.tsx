"use client";

import {
  Package,
  Coins,
  Users,
  Box,
  Swords,
  PawPrint,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/home/service-card";

export function ServicesSection() {
  const { t } = useI18n();

  const services = [
    {
      id: "packs",
      href: "/packs",
      icon: Package,
      title: t.services.packs.title,
      description: t.services.packs.description,
      accent: "#c43544",
    },
    {
      id: "gold",
      href: "/gold",
      icon: Coins,
      title: t.services.gold.title,
      description: t.services.gold.description,
      accent: "#e0bc4a",
    },
    {
      id: "characters",
      href: "/characters",
      icon: Users,
      title: t.services.characters.title,
      description: t.services.characters.description,
      accent: "#8870c4",
    },
    {
      id: "cube",
      href: "/cube",
      icon: Box,
      title: t.services.cube.title,
      description: t.services.cube.description,
      accent: "#4f7a52",
    },
    {
      id: "boost",
      href: "/boost",
      icon: Swords,
      title: t.services.boost.title,
      description: t.services.boost.description,
      accent: "#c43544",
    },
    {
      id: "pets",
      href: "/pets",
      icon: PawPrint,
      title: t.services.pets.title,
      description: t.services.pets.description,
      accent: "#e0bc4a",
    },
    {
      id: "talent-tree",
      href: "/extra",
      icon: GitBranch,
      title: t.services.talentTree.title,
      description: t.services.talentTree.description,
      accent: "#8870c4",
    },
    {
      id: "char-tree",
      href: "/extra",
      icon: Sparkles,
      title: t.services.charTree.title,
      description: t.services.charTree.description,
      accent: "#4f7a52",
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-relic">
            {t.nav.services}
          </p>
          <h2 className="mt-3 max-w-lg text-balance font-display text-xl text-bone sm:text-2xl lg:text-3xl">
            {t.home.servicesTitle}
          </h2>
          <p className="mt-4 max-w-md text-bone-dim">
            {t.home.servicesSubtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              href={service.href}
              icon={service.icon}
              title={service.title}
              description={service.description}
              ctaLabel={t.home.learnMore}
              accent={service.accent}
            />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
