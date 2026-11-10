"use client";

import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: <T extends CartItem>(item: Omit<T, "id">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: () => number;
}

type CartStoreApi = ReturnType<typeof createCartStore>;

function createCartStore() {
  return createStore<CartState>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) =>
          set((state) => ({
            items: [
              ...state.items,
              { ...item, id: nanoid(8) } as unknown as CartItem,
            ],
          })),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          })),
        clear: () => set({ items: [] }),
        total: () => get().items.reduce((sum, i) => sum + i.priceRub, 0),
      }),
      { name: "tbh-cart" },
    ),
  );
}

const CartStoreContext = createContext<CartStoreApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // useState с lazy initializer вместо useRef — создаёт store ровно один
  // раз за жизненный цикл компонента, без обращения к ref.current во
  // время рендера (что новые правила react-hooks помечают как нарушение
  // чистоты рендера, даже для безопасного lazy-init паттерна).
  const [store] = useState(() => createCartStore());

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
}

export function useCartStore<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartStoreContext);
  if (!store) throw new Error("useCartStore must be used within CartProvider");
  return useStore(store, selector);
}
