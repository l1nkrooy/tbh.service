import type { CharacterClass, CharacterDef } from "@/types";

/**
 * Определения классов персонажей Task Bar Hero.
 * Цветовые акценты и роли взяты из визуального стиля игры.
 *
 * Иллюстрации — PNG-файлы с прозрачным фоном, размещаются вручную
 * в public/images/characters/ под именем класса (knight.png, priest.png,
 * sorcerer.png, ranger.png, hunter.png, slayer.png). Пока файл не загружен,
 * next/image покажет alt-текст/пустую область — это ожидаемо.
 */
export const CHARACTERS: Record<CharacterClass, CharacterDef> = {
  knight: {
    id: "knight",
    isDLC: false,
    role: "tank",
    colorAccent: "#A33636",
    image: "/images/characters/knight.png",
  },
  priest: {
    id: "priest",
    isDLC: false,
    role: "support",
    colorAccent: "#C9A227",
    image: "/images/characters/priest.png",
  },
  sorcerer: {
    id: "sorcerer",
    isDLC: false,
    role: "mage",
    colorAccent: "#5B4A8A",
    image: "/images/characters/sorcerer.png",
  },
  ranger: {
    id: "ranger",
    isDLC: false,
    role: "archer",
    colorAccent: "#4F7A52",
    image: "/images/characters/ranger.png",
  },
  hunter: {
    id: "hunter",
    isDLC: true,
    role: "berserker",
    colorAccent: "#8A5A33",
    image: "/images/characters/hunter.png",
  },
  slayer: {
    id: "slayer",
    isDLC: true,
    role: "assassin",
    colorAccent: "#3B3B45",
    image: "/images/characters/slayer.png",
  },
};

export const BASE_CHARACTERS: CharacterClass[] = [
  "knight",
  "priest",
  "sorcerer",
  "ranger",
];

export const DLC_CHARACTERS: CharacterClass[] = ["hunter", "slayer"];

export const ALL_CHARACTERS: CharacterClass[] = [
  ...BASE_CHARACTERS,
  ...DLC_CHARACTERS,
];

export const MAX_CHARACTER_LEVEL = 101;
export const MAX_CUBE_LEVEL = 100;
export const MAX_SELECTABLE_CHARACTERS = 5;
