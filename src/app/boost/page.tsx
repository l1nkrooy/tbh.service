"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { DifficultyTabs } from "@/components/configurator/difficulty-tabs";
import { BoostStageMap } from "@/components/configurator/boost-stage-map";
import { CartSummaryPanel } from "@/components/cart/cart-summary-panel";
import { Reveal } from "@/components/motion/reveal";
import { calcBoostPrice, formatRub, formatUsd } from "@/lib/pricing/calculator";
import type { BoostCartItem, BoostSelection, Difficulty } from "@/types";

const DIFFICULTY_ACCENT: Record<Difficulty, string> = {
  normal: "#4f7a52",
  nightmare: "#6753a3",
  hell: "#c43544",
  torment: "#9c2531",
};

const DIFFICULTY_ORDER: Difficulty[] = ["normal", "nightmare", "hell", "torment"];

function globalPosition(s: BoostSelection): number {
  const diffIndex = DIFFICULTY_ORDER.indexOf(s.difficulty);
  return diffIndex * 30 + (s.act - 1) * 10 + s.stage;
}

export default function BoostPage() {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);

  const [hasStartingPoint, setHasStartingPoint] = useState(false);

  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [act, setAct] = useState<1 | 2 | 3>(1);
  const [stage, setStage] = useState(1);

  const [fromDifficulty, setFromDifficulty] = useState<Difficulty>("normal");
  const [fromAct, setFromAct] = useState<1 | 2 | 3>(1);
  const [fromStage, setFromStage] = useState(1);

  const [justAdded, setJustAdded] = useState(false);

  const accent = DIFFICULTY_ACCENT[difficulty];
  const fromAccent = DIFFICULTY_ACCENT[fromDifficulty];

  const targetSelection: BoostSelection = { difficulty, act, stage };
  const fromSelection: BoostSelection = {
    difficulty: fromDifficulty,
    act: fromAct,
    stage: fromStage,
  };

  const isFromBeyondTarget =
    hasStartingPoint && globalPosition(fromSelection) >= globalPosition(targetSelection);

  const price = calcBoostPrice(
    targetSelection,
    hasStartingPoint ? fromSelection : undefined,
  );

  function handleDifficultyChange(d: Difficulty) {
    setDifficulty(d);
    setAct(1);
    setStage(1);
  }

  function handleFromDifficultyChange(d: Difficulty) {
    setFromDifficulty(d);
    setFromAct(1);
    setFromStage(1);
  }

  function handleAddToCart() {
    if (isFromBeyondTarget) return;
    addItem<BoostCartItem>({
      type: "boost",
      titleKey: "cartItems.boost",
      priceRub: price,
      selection: targetSelection,
      fromSelection: hasStartingPoint ? fromSelection : undefined,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  const difficultyLabels = {
    normal: t.boostPage.normal,
    nightmare: t.boostPage.nightmare,
    hell: t.boostPage.hell,
    torment: t.boostPage.torment,
  };

  return (
    <>
      <PageHeader
        eyebrow={t.nav.boost}
        title={t.boostPage.title}
        subtitle={t.boostPage.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <Reveal>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-bone">
                      {t.boostPage.hasProgressTitle}
                    </p>
                    <p className="mt-1 text-xs text-bone-faint">
                      {t.boostPage.hasProgressHint}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasStartingPoint}
                    onChange={(e) => setHasStartingPoint(e.target.checked)}
                    className="h-5 w-5 rounded border-line bg-panel-raised accent-relic"
                  />
                </label>
              </div>
            </Reveal>

            {hasStartingPoint && (
              <Reveal>
                <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                  <p className="mb-3 text-sm text-bone-dim">
                    {t.boostPage.currentProgressLabel}
                  </p>
                  <DifficultyTabs
                    value={fromDifficulty}
                    onChange={handleFromDifficultyChange}
                    labels={difficultyLabels}
                  />

                  <p className="mt-6 mb-3 text-sm text-bone-dim">{t.boostPage.act}</p>
                  <div className="flex gap-2">
                    {([1, 2, 3] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setFromAct(a);
                          setFromStage(1);
                        }}
                        className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border font-mono text-sm transition-all duration-300 cursor-pointer ${
                          fromAct === a
                            ? "border-transparent text-ash"
                            : "border-line text-bone-dim hover:border-bone-faint"
                        }`}
                        style={fromAct === a ? { background: fromAccent } : undefined}
                      >
                        {a}
                      </button>
                    ))}
                  </div>

                  <p className="mt-6 mb-4 text-sm text-bone-dim">{t.boostPage.stage}</p>
                  <BoostStageMap
                    act={fromAct}
                    stage={fromStage}
                    onSelectStage={setFromStage}
                    accent={fromAccent}
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                <p className="mb-3 text-sm text-bone-dim">
                  {hasStartingPoint ? t.boostPage.targetProgressLabel : t.boostPage.difficulty}
                </p>
                <DifficultyTabs
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  labels={difficultyLabels}
                />

                <p className="mt-7 mb-4 text-sm text-bone-dim">{t.boostPage.act}</p>
                <div className="flex gap-2">
                  {([1, 2, 3] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAct(a);
                        setStage(1);
                      }}
                      className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border font-mono text-sm transition-all duration-300 cursor-pointer ${
                        act === a
                          ? "border-transparent text-ash"
                          : "border-line text-bone-dim hover:border-bone-faint"
                      }`}
                      style={act === a ? { background: accent } : undefined}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <p className="mt-7 mb-4 text-sm text-bone-dim">
                  {t.boostPage.stage}
                </p>
                <BoostStageMap
                  act={act}
                  stage={stage}
                  onSelectStage={setStage}
                  accent={accent}
                />
              </div>
            </Reveal>

            {isFromBeyondTarget && (
              <div className="rounded-[var(--radius-lg)] border border-blood/40 bg-blood-dim/20 p-5 text-sm text-blood-bright">
                {t.boostPage.invalidRangeError}
              </div>
            )}

            <Reveal delay={0.2}>
              <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                <p className="mb-4 text-sm text-bone-dim">
                  {t.boostPage.progressLabel}
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: accent }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(((act - 1) * 10 + stage) / 30) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm text-bone-dim">{t.common.price}</p>
                <p className="font-mono text-2xl font-semibold text-bone">
                  {formatRub(price)}{" "}
                  <span className="text-base text-bone-faint">{formatUsd(price)}</span>
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={isFromBeyondTarget}
                className="w-full sm:w-auto"
              >
                {justAdded ? t.common.added : t.common.addToCart}
              </Button>
            </motion.div>
          </div>

          <div>
            <CartSummaryPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
