import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { PacksSection } from "@/components/home/packs-section";
import { StatsSection } from "@/components/home/stats-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PacksSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
