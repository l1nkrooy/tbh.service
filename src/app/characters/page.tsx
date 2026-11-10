"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { LevelSlider } from "@/components/configurator/level-slider";
import { CharacterPickerCard } from "@/components/configurator/character-picker-card";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import {
  ALL_CHARACTERS,
  CHARACTERS,
  MAX_CHARACTER_LEVEL,
  MAX_SELECTABLE_CHARACTERS,
} from "@/data/characters";
import {
  calcCharactersTotalPrice,
  calcCharacterLevelPrice,
  formatRub,
  formatUsd,
} from "@/lib/pricing/calculator";
import type { CharacterClass, CharactersCartItem, SelectedCharacter } from "@/types";

export default function CharactersPage() {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const [selected, setSelected] = useState<SelectedCharacter[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const isDLCMap = useMemo(
    () =>
      Object.fromEntries(
        ALL_CHARACTERS.map((c) => [c, CHARACTERS[c].isDLC]),
      ) as Record<CharacterClass, boolean>,
    [],
  );

  function toggleCharacter(classId: CharacterClass) {
    setSelected((prev) => {
      const exists = prev.find((c) => c.classId === classId);
      if (exists) {
        return prev.filter((c) => c.classId !== classId);
      }
      if (prev.length >= MAX_SELECTABLE_CHARACTERS) return prev;
      return [...prev, { classId, level: 30, unlockSkillPoints: false }];
    });
  }

  function updateLevel(classId: CharacterClass, level: number) {
    setSelected((prev) =>
      prev.map((c) => (c.classId === classId ? { ...c, level } : c)),
    );
  }

  function toggleSkillPoints(classId: CharacterClass) {
    setSelected((prev) =>
      prev.map((c) =>
        c.classId === classId
          ? { ...c, unlockSkillPoints: !c.unlockSkillPoints }
          : c,
      ),
    );
  }

  const totalPrice = calcCharactersTotalPrice(selected, isDLCMap);

  function handleAddToCart() {
    if (selected.length === 0) return;
    addItem<CharactersCartItem>({
      type: "characters",
      titleKey: "cartItems.characters",
      priceRub: totalPrice,
      characters: selected,
    });
    setJustAdded(true);
    setSelected([]);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.characters}
        title={t.charactersPage.title}
        subtitle={t.charactersPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-bone">
                  {t.charactersPage.selectClass}
                </h2>
                <span className="font-mono text-sm text-bone-faint">
                  {selected.length} / {MAX_SELECTABLE_CHARACTERS}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {ALL_CHARACTERS.map((classId) => {
                  const def = CHARACTERS[classId];
                  const isSelected = selected.some(
                    (c) => c.classId === classId,
                  );
                  return (
                    <CharacterPickerCard
                      key={classId}
                      character={def}
                      name={t.charactersPage.classNames[classId]}
                      selected={isSelected}
                      disabled={selected.length >= MAX_SELECTABLE_CHARACTERS}
                      dlcLabel={
                        def.isDLC ? t.charactersPage.dlcNotice : undefined
                      }
                      onToggle={() => toggleCharacter(classId)}
                    />
                  );
                })}
              </div>
            </Reveal>

            <div className="mt-10 space-y-4">
              <AnimatePresence>
                {selected.map((char) => {
                  const def = CHARACTERS[char.classId];
                  const price = calcCharacterLevelPrice(
                    char.classId,
                    char.level,
                    def.isDLC,
                  );
                  return (
                    <motion.div
                      key={char.classId}
                      initial={{ opacity: 0, y: 12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-panel p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: def.colorAccent }}
                          />
                          <span className="font-display text-lg font-semibold text-bone">
                            {t.charactersPage.classNames[char.classId]}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-bone-dim">
                          {formatRub(price)}
                        </span>
                      </div>

                      <LevelSlider
                        className="mt-5"
                        label={t.charactersPage.levelLabel}
                        value={char.level}
                        min={1}
                        max={MAX_CHARACTER_LEVEL}
                        accent={def.colorAccent}
                        onChange={(v) => updateLevel(char.classId, v)}
                      />

                      <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-bone-dim">
                        <input
                          type="checkbox"
                          checked={char.unlockSkillPoints}
                          onChange={() => toggleSkillPoints(char.classId)}
                          className="h-4 w-4 rounded border-line bg-panel-raised accent-relic"
                        />
                        {t.charactersPage.skillPointsLabel}
                        <span className="text-bone-faint">
                          ({t.common.optional})
                        </span>
                      </label>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-relic/40 bg-relic-dim/20 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm text-bone-dim">
                    {t.charactersPage.pricePerCharacter}
                  </p>
                  <p className="font-mono text-2xl font-semibold text-bone">
                    {formatRub(totalPrice)}{" "}
                    <span className="text-base text-bone-faint">
                      {formatUsd(totalPrice)}
                    </span>
                  </p>
                </div>
                <Button variant="primary" onClick={handleAddToCart} className="w-full sm:w-auto">
                  {justAdded ? t.common.added : t.charactersPage.addAllToCart}
                </Button>
              </motion.div>
            )}
          </div>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
