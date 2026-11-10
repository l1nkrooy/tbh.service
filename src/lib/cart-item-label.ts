import type { CartItem, Locale } from "@/types";
import type { Dict } from "@/lib/i18n/dictionaries";
import { formatGoldShort } from "@/lib/pricing/calculator";

/**
 * Формирует человекочитаемую строку для позиции корзины с ключевыми
 * деталями (уровень, количество персонажей, этаж и т.д.), используется
 * в панели корзины, на странице checkout и в генерируемой PNG-картинке.
 */
export function cartItemLabel(item: CartItem, t: Dict, locale: Locale): string {
  switch (item.type) {
    case "pack": {
      const packName =
        t.packsPage.names[item.packId as "pack-1" | "pack-2" | "pack-3"];
      return packName ?? t.cartItems.pack;
    }
    case "gold":
      return `${t.cartItems.gold}: ${formatGoldShort(item.amount, locale)}`;
    case "characters": {
      const count = item.characters.length;
      const parts = item.characters.map((c) => {
        const className = t.charactersPage.classNames[c.classId];
        const skillSuffix = c.unlockSkillPoints
          ? ` (+${t.charactersPage.skillPointsShort})`
          : "";
        return `${className} ${t.common.level} ${c.level}${skillSuffix}`;
      });
      return `${t.cartItems.characters} (${count}): ${parts.join(", ")}`;
    }
    case "cube":
      return `${t.cartItems.cube}: ${t.common.level} ${item.level}`;
    case "boost": {
      const { difficulty, act, stage } = item.selection;
      const diffLabel = t.boostPage[difficulty];
      const toLabel = `${diffLabel} ${act}-${stage}`;
      if (item.fromSelection) {
        const f = item.fromSelection;
        const fromLabel = `${t.boostPage[f.difficulty]} ${f.act}-${f.stage}`;
        return `${t.cartItems.boost}: ${fromLabel} → ${toLabel}`;
      }
      return `${t.cartItems.boost}: ${toLabel}`;
    }
    case "pets":
      return t.cartItems.pets;
    case "talent-tree":
      return `${t.cartItems.talentTree}: ${formatGoldShort(item.goldAmount, locale)}`;
    case "char-tree":
      return `${t.cartItems.charTree} (${item.characterCount})`;
  }
}
