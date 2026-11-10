// ============================================================================
// Центральные типы данных проекта Task Bar Hero Services
// ============================================================================

export type Locale = "ru" | "en";

export type Difficulty = "normal" | "nightmare" | "hell" | "torment";

export type CharacterClass =
  | "knight"
  | "priest"
  | "sorcerer"
  | "ranger"
  | "hunter"
  | "slayer";

export interface CharacterDef {
  id: CharacterClass;
  isDLC: boolean;
  /** базовая роль персонажа, используется только для подписи в UI */
  role: "tank" | "support" | "mage" | "archer" | "berserker" | "assassin";
  colorAccent: string; // hex, акцент карточки персонажа
  image: string; // путь к собственной иллюстрации (не арт игры)
}

export interface SelectedCharacter {
  classId: CharacterClass;
  level: number; // 1..101
  unlockSkillPoints: boolean;
}

export interface ActDef {
  act: 1 | 2 | 3;
  /** конечные стейджи в этом акте, 1..9, 10 = босс */
  maxStage: 10;
}

export interface BoostSelection {
  difficulty: Difficulty;
  act: 1 | 2 | 3;
  stage: number; // 1..10
}

// ----------------------------------------------------------------------------
// Корзина / конфигуратор
// ----------------------------------------------------------------------------

export type CartItemType =
  | "pack"
  | "gold"
  | "characters"
  | "cube"
  | "boost"
  | "pets"
  | "talent-tree"
  | "char-tree";

export interface CartItemBase {
  id: string; // уникальный id строки корзины (nanoid)
  type: CartItemType;
  priceRub: number; // итоговая цена позиции в рублях
  titleKey: string; // ключ перевода названия
}

export interface PackCartItem extends CartItemBase {
  type: "pack";
  packId: string;
  includeBoost: boolean;
}

export interface GoldCartItem extends CartItemBase {
  type: "gold";
  amount: number;
}

export interface CharactersCartItem extends CartItemBase {
  type: "characters";
  characters: SelectedCharacter[];
}

export interface CubeCartItem extends CartItemBase {
  type: "cube";
  level: number; // 1..100
}

export interface BoostCartItem extends CartItemBase {
  type: "boost";
  selection: BoostSelection;
  /** Текущая точка прогресса игрока, если буст считается не с нуля. */
  fromSelection?: BoostSelection;
}

export interface PetsCartItem extends CartItemBase {
  type: "pets";
}

export interface TalentTreeCartItem extends CartItemBase {
  type: "talent-tree";
  goldAmount: number;
}

export interface CharTreeCartItem extends CartItemBase {
  type: "char-tree";
  characterCount: number;
}

export type CartItem =
  | PackCartItem
  | GoldCartItem
  | CharactersCartItem
  | CubeCartItem
  | BoostCartItem
  | PetsCartItem
  | TalentTreeCartItem
  | CharTreeCartItem;

// ----------------------------------------------------------------------------
// Заказы (Supabase)
// ----------------------------------------------------------------------------

export type OrderStatus = "new" | "in_progress" | "completed" | "cancelled";
export type PaymentChannel = "discord" | "funpay" | "donationalerts";

export interface OrderRecord {
  id: string;
  order_number: string; // человекочитаемый номер, напр. TBH-240626-XK4P
  items: CartItem[];
  total_rub: number;
  locale: Locale;
  payment_channel: PaymentChannel;
  status: OrderStatus;
  contact_note: string | null;
  created_at: string;
}

export interface ReviewRecord {
  id: string;
  author_name: string;
  rating: number; // 1..5
  text: string;
  service_label: string | null;
  created_at: string;
  is_published: boolean;
}

// ----------------------------------------------------------------------------
// Паки
// ----------------------------------------------------------------------------

export interface PackDef {
  id: string;
  priceRub: number;
  goldAmount: number;
  characterLevel: number;
  cubeLevel: number;
  unlocksAllDLCPets: boolean;
  bonusStatPoints: boolean;
  optionalBoost?: BoostSelection;
  accent: string;
}
