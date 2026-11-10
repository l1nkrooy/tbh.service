"use client";

import { useState } from "react";
import { GitBranch, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import {
  calcCharTreeServicePrice,
  calcTalentTreeServicePrice,
  formatGoldShort,
  formatRub,
  formatUsd,
} from "@/lib/pricing/calculator";
import type { CharTreeCartItem, TalentTreeCartItem } from "@/types";

export default function ExtraServicesPage() {
  const { t, locale } = useI18n();
  const addItem = useCartStore((s) => s.addItem);

  const [goldInput, setGoldInput] = useState("");
  const [characterCount, setCharacterCount] = useState(1);
  const [addedTalent, setAddedTalent] = useState(false);
  const [addedChar, setAddedChar] = useState(false);

  const goldAmount = Number(goldInput.replace(/\D/g, "")) || 0;
  const talentPrice = goldAmount > 0 ? calcTalentTreeServicePrice(goldAmount) : 0;
  const charTreePrice = calcCharTreeServicePrice(characterCount);

  function handleAddTalentTree() {
    if (goldAmount <= 0) return;
    addItem<TalentTreeCartItem>({
      type: "talent-tree",
      titleKey: "cartItems.talentTree",
      priceRub: talentPrice,
      goldAmount,
    });
    setAddedTalent(true);
    setGoldInput("");
    setTimeout(() => setAddedTalent(false), 2000);
  }

  function handleAddCharTree() {
    addItem<CharTreeCartItem>({
      type: "char-tree",
      titleKey: "cartItems.charTree",
      priceRub: charTreePrice,
      characterCount,
    });
    setAddedChar(true);
    setTimeout(() => setAddedChar(false), 2000);
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.services}
        title={t.extraServicesPage.title}
        subtitle={t.extraServicesPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-relic/30 bg-relic/10 text-relic-bright">
                  <GitBranch size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-bone">
                  {t.extraServicesPage.talentTreeTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {t.extraServicesPage.talentTreeDescription}
                </p>

                <label className="mt-5 block text-sm text-bone-dim">
                  {t.extraServicesPage.talentTreeGoldLabel}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="100 000 000"
                  value={goldInput}
                  onChange={(e) => setGoldInput(e.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-3 font-mono text-bone outline-none transition-colors focus:border-relic"
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    {goldAmount > 0 && (
                      <p className="text-xs text-bone-faint">
                        {formatGoldShort(goldAmount, locale)}
                      </p>
                    )}
                    <p className="font-mono text-xl font-semibold text-bone">
                      {formatRub(talentPrice)}{" "}
                      <span className="text-sm text-bone-faint">
                        {formatUsd(talentPrice)}
                      </span>
                    </p>
                  </div>
                  <Button variant="primary" onClick={handleAddTalentTree} className="w-full sm:w-auto">
                    {addedTalent ? t.common.added : t.common.addToCart}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-arcane/30 bg-arcane/10 text-arcane-bright">
                  <Sparkles size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-bone">
                  {t.extraServicesPage.charTreeTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {t.extraServicesPage.charTreeDescription}
                </p>

                <label className="mt-5 block text-sm text-bone-dim">
                  {t.extraServicesPage.charTreeCountLabel}
                </label>
                <div className="mt-2 flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCharacterCount(n)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-all cursor-pointer ${
                        characterCount === n
                          ? "border-arcane-bright bg-arcane/20 text-bone"
                          : "border-line text-bone-dim hover:border-bone-faint"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-xl font-semibold text-bone">
                    {formatRub(charTreePrice)}{" "}
                    <span className="text-sm text-bone-faint">
                      {formatUsd(charTreePrice)}
                    </span>
                  </p>
                  <Button variant="primary" onClick={handleAddCharTree} className="w-full sm:w-auto">
                    {addedChar ? t.common.added : t.common.addToCart}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
