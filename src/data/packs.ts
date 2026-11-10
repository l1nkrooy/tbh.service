import type { PackDef } from "@/types";

/**
 * Товары "Золото". Цена растёт нелинейно — крупные объёмы дают скидку
 * за единицу, что характерно для буст-услуг.
 */
export interface GoldTier {
  amount: number;
  priceRub: number;
}

export const GOLD_TIERS: GoldTier[] = [
  { amount: 1_000_000, priceRub: 18 },
  { amount: 10_000_000, priceRub: 38 },
  { amount: 100_000_000, priceRub: 98 },
  { amount: 1_000_000_000, priceRub: 238 },
  { amount: 10_000_000_000, priceRub: 640 },
  { amount: 100_000_000_000, priceRub: 1_380 },
];

/**
 * Три готовых пака услуг, цены сбалансированы как 299 / 999 / 2990
 * с учётом резкого роста объёма контента в каждом следующем паке.
 */
export const PACKS: PackDef[] = [
  {
    id: "pack-1",
    priceRub: 299,
    goldAmount: 200_000_000,
    characterLevel: 30,
    cubeLevel: 30,
    unlocksAllDLCPets: false,
    bonusStatPoints: false,
    accent: "#A33636",
    optionalBoost: { difficulty: "nightmare", act: 1, stage: 1 },
  },
  {
    id: "pack-2",
    priceRub: 499,
    goldAmount: 1_000_000_000,
    characterLevel: 60,
    cubeLevel: 60,
    unlocksAllDLCPets: false,
    bonusStatPoints: false,
    accent: "#C9A227",
    optionalBoost: { difficulty: "hell", act: 3, stage: 1 },
  },
  {
    id: "pack-3",
    priceRub: 999,
    goldAmount: 50_000_000_000,
    characterLevel: 101,
    cubeLevel: 100,
    unlocksAllDLCPets: true,
    bonusStatPoints: true,
    accent: "#5B4A8A",
    optionalBoost: { difficulty: "torment", act: 3, stage: 9 },
  },
];
