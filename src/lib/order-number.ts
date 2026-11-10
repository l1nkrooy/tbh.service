import { customAlphabet } from "nanoid";

const ALPHABET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // без похожих символов (I, O)
const generateSuffix = customAlphabet(ALPHABET, 6);

/**
 * Генерирует человекочитаемый номер заказа вида TBH-240626-XK4P9Q.
 * Дата зашита в номер для удобства сортировки "на глаз" в Discord.
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `TBH-${yy}${mm}${dd}-${generateSuffix()}`;
}
