"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords } from "lucide-react";

/**
 * Премиальный loading screen, показывается при первой загрузке сайта.
 * Скрывается после монтирования + минимальной задержки (чтобы избежать
 * резкого "мигания" на быстрых соединениях) и навсегда запоминает,
 * что показ уже состоялся в этой сессии (sessionStorage), чтобы не
 * повторяться при навигации между страницами.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Намеренный useEffect: sessionStorage недоступен на сервере, поэтому
  // решение "показывать ли загрузочный экран в этой сессии" можно
  // принять только на клиенте после монтирования. Сервер всегда рендерит
  // экран загрузки видимым (visible=true по умолчанию), а клиент решает,
  // нужно ли его сразу скрыть — иначе пришлось бы рисковать hydration
  // mismatch, пытаясь угадать состояние sessionStorage в lazy initializer.
  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem("tbh-loaded");
    if (alreadyShown) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      setShouldRender(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("tbh-loaded", "1");
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ash"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] bg-blood-dim text-relic-bright"
            >
              <motion.div
                className="absolute inset-0 rounded-[var(--radius-md)]"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(196,53,68,0.4)",
                    "0 0 28px rgba(196,53,68,0.4)",
                    "0 0 0px rgba(196,53,68,0.4)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <Swords size={28} strokeWidth={1.5} />
            </motion.div>

            <div className="h-px w-32 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-relic"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
