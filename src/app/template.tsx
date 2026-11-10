"use client";

import { motion } from "framer-motion";

/**
 * template.tsx перерендеривается Next.js при каждой навигации (в отличие
 * от layout.tsx), что позволяет проиграть fade/slide-анимацию появления
 * контента страницы при переходе по сайту — лёгкий, не отвлекающий эффект.
 */
export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
