"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

interface StatDef {
  value: number;
  suffix: string;
  labelRu: string;
  labelEn: string;
}

const STATS: StatDef[] = [
  { value: 1200, suffix: "+", labelRu: "выполненных заказов", labelEn: "completed orders" },
  { value: 15, suffix: "", labelRu: "минут средний ответ", labelEn: "min average response" },
  { value: 0, suffix: "", labelRu: "блокировок аккаунтов", labelEn: "account bans" },
  { value: 98, suffix: "%", labelRu: "клиентов возвращаются", labelEn: "returning clients" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { locale, t } = useI18n();

  return (
    <section className="relative py-16">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-wider text-bone-faint">
            {t.home.statsTitle}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl font-semibold text-bone sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-bone-dim">
                {locale === "ru" ? stat.labelRu : stat.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
