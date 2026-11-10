"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, ShoppingBag, CreditCard } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cartItemLabel } from "@/lib/cart-item-label";
import { formatRub } from "@/lib/pricing/calculator";
import type { CartItem, PaymentChannel } from "@/types";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com";
const FUNPAY_URL = process.env.NEXT_PUBLIC_FUNPAY_URL ?? "https://funpay.com";
const DONATIONALERTS_URL =
  process.env.NEXT_PUBLIC_DONATIONALERTS_URL ?? "https://donationalerts.com";

const CHANNEL_CONFIG: Record<
  PaymentChannel,
  { url: string; icon: typeof MessageCircle; labelKey: "openDiscord" | "openFunpay" | "openDonationAlerts" }
> = {
  discord: { url: DISCORD_URL, icon: MessageCircle, labelKey: "openDiscord" },
  funpay: { url: FUNPAY_URL, icon: ShoppingBag, labelKey: "openFunpay" },
  donationalerts: {
    url: DONATIONALERTS_URL,
    icon: CreditCard,
    labelKey: "openDonationAlerts",
  },
};

interface OrderData {
  id: string;
  order_number: string;
  items: CartItem[];
  total_rub: number;
  payment_channel: PaymentChannel;
  created_at: string;
}

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        if (!cancelled) setOrder(data.order);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  return (
    <section className="flex min-h-[80vh] items-center py-32">
      <Container className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-[var(--radius-lg)] border border-line bg-panel p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage"
          >
            <CheckCircle2 size={32} strokeWidth={1.5} />
          </motion.div>

          <h1 className="mt-6 font-display text-2xl font-semibold text-bone">
            {t.checkout.orderCreated}
          </h1>
          <p className="mt-2 text-sm text-bone-dim">
            {t.checkout.orderCreatedHint}
          </p>

          {loading && (
            <p className="mt-8 text-sm text-bone-faint">{t.common.loading}…</p>
          )}

          {error && !loading && (
            <p className="mt-8 text-sm text-bone-faint">—</p>
          )}

          {order && !loading && (
            <>
              <div className="mt-7 rounded-[var(--radius-md)] border border-line bg-panel-raised p-5 text-left">
                <p className="font-mono text-xs uppercase tracking-wider text-bone-faint">
                  {t.checkout.orderNumber}
                </p>
                <p className="mt-1 font-mono text-xl font-semibold text-relic-bright">
                  {order.order_number}
                </p>

                <div className="mt-4 space-y-2 border-t border-line pt-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-bone-dim"
                    >
                      <span>{cartItemLabel(item, t, locale)}</span>
                      <span className="font-mono">{formatRub(item.priceRub)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-line pt-4">
                  <span className="text-sm text-bone-dim">{t.checkout.totalLabel}</span>
                  <span className="font-mono text-lg font-semibold text-bone">
                    {formatRub(order.total_rub)}
                  </span>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                {(() => {
                  const config = CHANNEL_CONFIG[order.payment_channel];
                  const Icon = config.icon;
                  return (
                    <a href={config.url} target="_blank" rel="noopener noreferrer">
                      <Button variant={order.payment_channel} className="w-full">
                        <Icon size={16} />
                        {t.checkout[config.labelKey]}
                      </Button>
                    </a>
                  );
                })()}
                <Link href="/services">
                  <Button variant="ghost" className="w-full">
                    {t.checkout.backToServices}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
