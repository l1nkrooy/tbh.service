"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/types";
import { dictionaries, type Dict } from "./dictionaries";

const STORAGE_KEY = "tbh-locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = "ru",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Намеренный useEffect: localStorage/navigator.language недоступны на
  // сервере, поэтому язык, сохранённый ранее (или язык браузера), можно
  // узнать только после гидрации на клиенте. Это синхронизация с внешним
  // хранилищем при монтировании — канонический случай использования
  // эффекта. Lazy useState initializer здесь не подходит: его результат
  // должен совпадать на сервере и при первом клиентском рендере, чтобы
  // не вызвать hydration mismatch, а localStorage синхронно недоступен
  // на сервере по определению.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ru" || stored === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    } else {
      const browserLang = window.navigator.language?.toLowerCase() ?? "";
      setLocaleState(browserLang.startsWith("ru") ? "ru" : "en");
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
