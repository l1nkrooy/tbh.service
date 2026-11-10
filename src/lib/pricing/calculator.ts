import type {
  BoostSelection,
  CharacterClass,
  Difficulty,
  SelectedCharacter,
} from "@/types";
import { GOLD_TIERS } from "@/data/packs";

/**
 * ============================================================================
 * ЦЕНТРАЛЬНЫЙ МОДУЛЬ ЦЕНООБРАЗОВАНИЯ
 * ============================================================================
 * Все цены в рублях, целые числа. Формулы подобраны так, чтобы:
 *  - цена росла нелинейно с уровнем (более высокие уровни дороже за пункt,
 *    т.к. требуют больше времени и фарма опыта в игре);
 *  - DLC-персонажи (Hunter, Slayer) стоят дороже базовых процентов на 20%,
 *    т.к. требуют дополнительной разблокировки;
 *  - буст по сложностям масштабируется явным множителем сложности;
 *  - чем больше персонажей выбрано одновременно, тем чуть выгоднее
 *    цена за единицу (оптовая скидка), что соответствует логике
 *    реальных буст-сервисов.
 * ============================================================================
 */

// ---- Прокачка персонажей --------------------------------------------------

/** Базовая цена за уровень прокачки одного персонажа. */
const CHAR_LEVEL_BASE_PRICE = 2.2; // руб за уровень в линейной части
const CHAR_LEVEL_CURVE_START = 50; // после этого уровня цена за пункт растёт
const CHAR_LEVEL_CURVE_MULT = 1.045; // прогрессия на повышенных уровнях
const DLC_CHARACTER_SURCHARGE = 1.2; // +20% для Hunter/Slayer
const SKILL_POINTS_UNLOCK_PRICE = 19; // фиксированная доплата за персонажа

/** Множитель скидки при количестве одновременно прокачиваемых персонажей. */
function multiCharacterDiscount(count: number): number {
  if (count >= 5) return 0.85;
  if (count >= 4) return 0.9;
  if (count >= 3) return 0.94;
  if (count >= 2) return 0.97;
  return 1;
}

/** Цена прокачки одного персонажа с уровня 1 до заданного уровня. */
export function calcCharacterLevelPrice(
  classId: CharacterClass,
  level: number,
  isDLC: boolean,
): number {
  const lvl = Math.max(1, Math.min(101, Math.round(level)));
  let price = 0;

  const linearLevels = Math.min(lvl, CHAR_LEVEL_CURVE_START);
  price += linearLevels * CHAR_LEVEL_BASE_PRICE;

  if (lvl > CHAR_LEVEL_CURVE_START) {
    const extraLevels = lvl - CHAR_LEVEL_CURVE_START;
    for (let i = 1; i <= extraLevels; i++) {
      price += CHAR_LEVEL_BASE_PRICE * Math.pow(CHAR_LEVEL_CURVE_MULT, i);
    }
  }

  if (isDLC) price *= DLC_CHARACTER_SURCHARGE;

  return Math.round(price);
}

export function calcCharactersTotalPrice(
  characters: SelectedCharacter[],
  isDLCMap: Record<CharacterClass, boolean>,
): number {
  if (characters.length === 0) return 0;

  const subtotal = characters.reduce((sum, c) => {
    const base = calcCharacterLevelPrice(
      c.classId,
      c.level,
      isDLCMap[c.classId],
    );
    const skillBonus = c.unlockSkillPoints ? SKILL_POINTS_UNLOCK_PRICE : 0;
    return sum + base + skillBonus;
  }, 0);

  const discount = multiCharacterDiscount(characters.length);
  return Math.round(subtotal * discount);
}

// ---- Прокачка Куба ---------------------------------------------------------

const CUBE_LEVEL_BASE_PRICE = 3.2;
const CUBE_CURVE_START = 40;
const CUBE_CURVE_MULT = 1.05;

export function calcCubePrice(level: number): number {
  const lvl = Math.max(1, Math.min(100, Math.round(level)));
  let price = 0;

  const linearLevels = Math.min(lvl, CUBE_CURVE_START);
  price += linearLevels * CUBE_LEVEL_BASE_PRICE;

  if (lvl > CUBE_CURVE_START) {
    const extraLevels = lvl - CUBE_CURVE_START;
    for (let i = 1; i <= extraLevels; i++) {
      price += CUBE_LEVEL_BASE_PRICE * Math.pow(CUBE_CURVE_MULT, i);
    }
  }

  return Math.round(price);
}

// ---- Золото ------------------------------------------------------------

export function calcGoldPrice(amount: number): number {
  // Точное совпадение с тиром
  const exact = GOLD_TIERS.find((t) => t.amount === amount);
  if (exact) return exact.priceRub;

  // Интерполяция между ближайшими тирами для произвольных сумм
  const sorted = [...GOLD_TIERS].sort((a, b) => a.amount - b.amount);
  if (amount <= sorted[0].amount) {
    return Math.round((amount / sorted[0].amount) * sorted[0].priceRub);
  }
  const last = sorted[sorted.length - 1];
  if (amount >= last.amount) {
    return Math.round((amount / last.amount) * last.priceRub);
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const lo = sorted[i];
    const hi = sorted[i + 1];
    if (amount >= lo.amount && amount <= hi.amount) {
      const ratio = (amount - lo.amount) / (hi.amount - lo.amount);
      return Math.round(lo.priceRub + ratio * (hi.priceRub - lo.priceRub));
    }
  }
  return 0;
}

// ---- Буст по этажам / сложности --------------------------------------------

const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  normal: 1,
  nightmare: 1.6,
  hell: 2.4,
  torment: 3.5,
};

const DIFFICULTY_ORDER: Difficulty[] = [
  "normal",
  "nightmare",
  "hell",
  "torment",
];

const STAGE_BASE_PRICE = 5.5; // цена за один пройденный этаж на Normal
const ACT_COUNT = 3;
const STAGES_PER_ACT = 10;
const STAGES_PER_DIFFICULTY = ACT_COUNT * STAGES_PER_ACT; // 30

/** Порядковый номер этажа от 1 до 30 внутри одной сложности. */
function stageWithinDifficulty(act: 1 | 2 | 3, stage: number): number {
  return (act - 1) * STAGES_PER_ACT + stage;
}

/**
 * Абсолютная "глобальная позиция" прогресса от 0 (самое начало игры,
 * Normal 1-1 не пройден) до 120 (Torment 3-10 пройден полностью).
 * Используется как единая числовая шкала для сравнения любых двух точек
 * прогресса вне зависимости от того, находятся ли они в одной сложности
 * или нужно пересечь границу между сложностями.
 */
function globalProgressPosition(selection: BoostSelection): number {
  const difficultyIndex = DIFFICULTY_ORDER.indexOf(selection.difficulty);
  const withinDifficulty = stageWithinDifficulty(selection.act, selection.stage);
  return difficultyIndex * STAGES_PER_DIFFICULTY + withinDifficulty;
}

/**
 * "Честная" стоимость прохождения от самого начала игры (Normal 1-1)
 * до указанной точки selection включительно. Это вспомогательная
 * функция — публичный calcBoostPrice использует разницу между двумя
 * такими значениями, что и даёт корректную стоимость отрезка пути.
 */
function calcAbsoluteBoostPrice(selection: BoostSelection): number {
  const targetGlobalStage = stageWithinDifficulty(selection.act, selection.stage);
  const difficultyIndex = DIFFICULTY_ORDER.indexOf(selection.difficulty);
  let total = 0;

  for (let i = 0; i < difficultyIndex; i++) {
    const diff = DIFFICULTY_ORDER[i];
    total +=
      ACT_COUNT * STAGES_PER_ACT * STAGE_BASE_PRICE * DIFFICULTY_MULTIPLIER[diff];
  }

  total +=
    targetGlobalStage * STAGE_BASE_PRICE * DIFFICULTY_MULTIPLIER[selection.difficulty];

  // Боссы (этаж %10===0) считаем тяжелее: +25% к стоимости этого этажа
  const isBossStage = selection.stage === STAGES_PER_ACT;
  if (isBossStage) {
    total += STAGE_BASE_PRICE * DIFFICULTY_MULTIPLIER[selection.difficulty] * 0.25;
  }

  return total;
}

/**
 * Стоимость буста от точки "from" (текущий прогресс игрока) до точки "to"
 * (желаемая цель), не включая повторную оплату уже пройденного пути.
 * Если from не указан, считается полная стоимость от самого начала игры —
 * это сохраняет обратную совместимость с прежним поведением калькулятора.
 */
export function calcBoostPrice(
  to: BoostSelection,
  from?: BoostSelection,
): number {
  const toPrice = calcAbsoluteBoostPrice(to);

  if (!from) {
    return Math.round(toPrice);
  }

  const fromPrice = calcAbsoluteBoostPrice(from);
  const toPosition = globalProgressPosition(to);
  const fromPosition = globalProgressPosition(from);

  // Если выбранная "текущая точка" находится не раньше цели, прогресса
  // нет — стоимость такого заказа равна нулю (не имеет смысла платить).
  if (fromPosition >= toPosition) {
    return 0;
  }

  return Math.round(toPrice - fromPrice);
}

// ---- DLC питомцы -------------------------------------------------------

export const PETS_UNLOCK_PRICE = 89;

// ---- Дополнительные услуги: прокачка деревьев ---------------------------

/** Прокачка дерева талантов за золото пользователя: % от суммы золота. */
const TALENT_TREE_SERVICE_RATE = 0.000_000_06; // руб за 1 золото
const TALENT_TREE_MIN_PRICE = 19;

export function calcTalentTreeServicePrice(goldAmount: number): number {
  const price = goldAmount * TALENT_TREE_SERVICE_RATE;
  return Math.max(TALENT_TREE_MIN_PRICE, Math.round(price));
}

/** Прокачка дерева персонажей за опыт пользователя — фикс. цена за персонажа. */
const CHAR_TREE_SERVICE_PRICE_PER_CHAR = 19;

export function calcCharTreeServicePrice(characterCount: number): number {
  return characterCount * CHAR_TREE_SERVICE_PRICE_PER_CHAR;
}

// ---- Форматирование -----------------------------------------------------

export function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";
}

/**
 * Конвертация рублей в доллары для отображения международным клиентам.
 * Курс намеренно завышен относительно номинального ЦБ-курса (~95-100₽/$)
 * так, чтобы цена в долларах была минимум в 2 раза выше номинальной —
 * это закладывает разницу в способах оплаты для зарубежных клиентов
 * (комиссии платёжных систем, риски конвертации и т.д.), а не является
 * точной финансовой конвертацией.
 *
 * Результат округляется вверх до "красивого" числа: целые доллары до 20
 * округляются вверх до целого; дальше — вверх до ближайших 5, чтобы цены
 * выглядели аккуратно ($8, $15, $40, $120), а не как сырая конвертация
 * ($14.34 -> $15, $7.33 -> $8, $37 -> $40).
 */
const RUB_TO_USD_RATE = 45; // ₽ за $1 — занижен вдвое от реального курса,
// что при делении цены в рублях на это число завышает итог в долларах

export function convertRubToUsdDisplay(rub: number): number {
  const raw = rub / RUB_TO_USD_RATE;

  if (raw <= 0) return 0;
  if (raw <= 20) return Math.ceil(raw);
  if (raw <= 100) return Math.ceil(raw / 5) * 5;
  return Math.ceil(raw / 10) * 10;
}

export function formatUsd(rub: number): string {
  return `$${convertRubToUsdDisplay(rub)}`;
}

/** Цена в обеих валютах для UI: "299 ₽ / $15" */
export function formatDualPrice(rub: number): string {
  return `${formatRub(rub)} / ${formatUsd(rub)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

/** Компактный формат больших чисел золота: 1 000 000 -> "1 млн" / "1M" */
export function formatGoldShort(value: number, locale: "ru" | "en"): string {
  const units =
    locale === "ru"
      ? [
          { v: 1_000_000_000_000, s: "трлн" },
          { v: 1_000_000_000, s: "млрд" },
          { v: 1_000_000, s: "млн" },
          { v: 1_000, s: "тыс" },
        ]
      : [
          { v: 1_000_000_000_000, s: "T" },
          { v: 1_000_000_000, s: "B" },
          { v: 1_000_000, s: "M" },
          { v: 1_000, s: "K" },
        ];

  for (const u of units) {
    if (value >= u.v) {
      const num = value / u.v;
      const rounded = num % 1 === 0 ? num.toString() : num.toFixed(1);
      return locale === "ru" ? `${rounded} ${u.s}` : `${rounded}${u.s}`;
    }
  }
  return value.toString();
}
