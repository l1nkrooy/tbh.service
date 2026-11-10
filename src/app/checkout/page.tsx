"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, ShoppingBag, Trash2, CreditCard } from "lucide-react";
import { toPng } from "html-to-image";
import { useI18n } from "@/lib/i18n/context";
import { useCartStore } from "@/lib/store/cart-store";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { OrderReceiptCard } from "@/components/cart/order-receipt-card";
import { cartItemLabel } from "@/lib/cart-item-label";
import { formatRub, formatUsd } from "@/lib/pricing/calculator";
import type { PaymentChannel } from "@/types";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.com";
const FUNPAY_URL = process.env.NEXT_PUBLIC_FUNPAY_URL ?? "https://funpay.com";
const DONATIONALERTS_URL =
  process.env.NEXT_PUBLIC_DONATIONALERTS_URL ?? "https://donationalerts.com";

export default function CheckoutPage() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.priceRub, 0);

  const receiptRef = useRef<HTMLDivElement>(null);
  const [contactNote, setContactNote] = useState("");
  const [submitting, setSubmitting] = useState<PaymentChannel | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [snapshot, setSnapshot] = useState<{
    items: typeof items;
    total: number;
  } | null>(null);

  const receiptItems = snapshot?.items ?? items;
  const receiptTotal = snapshot?.total ?? total;

  const orderDate = new Date().toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    { day: "2-digit", month: "long", year: "numeric" },
  );

  function buildOrderText(num: string): string {
    const lines = [
      `Hero Service — заказ ${num}`,
      "",
      ...items.map(
        (item) => `• ${cartItemLabel(item, t, locale)} — ${formatRub(item.priceRub)}`,
      ),
      "",
      `${t.checkout.totalLabel}: ${formatRub(total)}`,
    ];
    if (contactNote.trim()) {
      lines.push("", `${t.checkout.contactNoteLabel}: ${contactNote.trim()}`);
    }
    return lines.join("\n");
  }

  async function handleCheckout(channel: PaymentChannel) {
    if (items.length === 0 || submitting) return;
    setSubmitting(channel);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalRub: total,
          locale,
          paymentChannel: channel,
          contactNote: contactNote.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();
      const num: string = data.order.order_number;
      setOrderNumber(num);
      setSnapshot({ items, total });

      // Копируем текст заказа в буфер обмена
      try {
        await navigator.clipboard.writeText(buildOrderText(num));
        setCopiedNotice(true);
        setTimeout(() => setCopiedNotice(false), 3000);
      } catch {
        // Буфер обмена может быть недоступен (например, без HTTPS) — не критично
      }

      clearCart();

      const channelUrls: Record<PaymentChannel, string> = {
        discord: DISCORD_URL,
        funpay: FUNPAY_URL,
        donationalerts: DONATIONALERTS_URL,
      };
      const url = channelUrls[channel];
      window.open(url, "_blank", "noopener,noreferrer");

      router.push(`/order/${data.order.id}`);
    } catch (err) {
      console.error(err);
      setSubmitting(null);
    }
  }

  async function handleDownloadImage() {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 2,
        backgroundColor: "#0a0a0d",
      });
      const link = document.createElement("a");
      link.download = `hero-service-order-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate order image:", err);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.cart}
        title={t.checkout.title}
        subtitle={t.checkout.subtitle}
      />

      <section className="py-16">
        <Container>
          {items.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-panel py-20 text-center">
                <ShoppingBag size={36} className="text-bone-faint" />
                <p className="text-bone-dim">{t.checkout.emptyCartRedirect}</p>
                <Link href="/services">
                  <Button variant="secondary">{t.checkout.backToServices}</Button>
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
              <Reveal>
                <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                  <h2 className="font-display text-xl font-semibold text-bone">
                    {t.checkout.yourOrder}
                  </h2>

                  <ul className="mt-5 space-y-2">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-panel-raised px-4 py-3"
                        >
                          <span className="text-sm text-bone">
                            {cartItemLabel(item, t, locale)}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-bone-dim">
                              {formatRub(item.priceRub)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-bone-faint transition-colors hover:text-blood-bright cursor-pointer"
                              aria-label={t.configurator.removeItem}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <label className="mt-6 block text-sm text-bone-dim">
                    {t.checkout.contactNoteLabel}
                  </label>
                  <textarea
                    value={contactNote}
                    onChange={(e) => setContactNote(e.target.value)}
                    placeholder={t.checkout.contactNotePlaceholder}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-relic"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-bone-dim">{t.checkout.totalLabel}</span>
                    <span className="text-right font-mono">
                      <span className="text-3xl font-semibold text-bone">
                        {formatRub(total)}
                      </span>
                      <span className="ml-2 text-sm text-bone-faint">
                        {formatUsd(total)}
                      </span>
                    </span>
                  </div>

                  <div className="mt-7 space-y-3">
                    <Button
                      variant="discord"
                      className="w-full"
                      disabled={submitting !== null}
                      onClick={() => handleCheckout("discord")}
                    >
                      <MessageCircle size={16} />
                      {submitting === "discord"
                        ? t.checkout.submitting
                        : t.checkout.openDiscord}
                    </Button>
                    <Button
                      variant="funpay"
                      className="w-full"
                      disabled={submitting !== null}
                      onClick={() => handleCheckout("funpay")}
                    >
                      <ShoppingBag size={16} />
                      {submitting === "funpay"
                        ? t.checkout.submitting
                        : t.checkout.openFunpay}
                    </Button>
                    <Button
                      variant="donationalerts"
                      className="w-full"
                      disabled={submitting !== null}
                      onClick={() => handleCheckout("donationalerts")}
                    >
                      <CreditCard size={16} />
                      {submitting === "donationalerts"
                        ? t.checkout.submitting
                        : t.checkout.openDonationAlerts}
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleDownloadImage}
                    >
                      <Download size={16} />
                      {t.checkout.downloadImage}
                    </Button>
                  </div>

                  <p className="mt-4 text-center text-xs text-bone-faint">
                    {t.checkout.downloadImageHint}
                  </p>

                  <p className="mt-5 text-xs leading-relaxed text-bone-faint">
                    {t.checkout.altPaymentNotice}
                  </p>

                  <AnimatePresence>
                    {copiedNotice && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-[var(--radius-sm)] bg-sage/15 px-3 py-2 text-center text-xs text-sage"
                      >
                        {t.checkout.copiedToClipboard}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          )}
        </Container>
      </section>

      {/* Скрытый узел для генерации PNG-картинки заказа */}
      <div className="fixed -left-[9999px] -top-[9999px]" aria-hidden="true">
        <OrderReceiptCard
          ref={receiptRef}
          orderNumber={orderNumber ?? "TBH-PREVIEW"}
          items={receiptItems}
          total={receiptTotal}
          t={t}
          locale={locale}
          date={orderDate}
        />
      </div>
    </>
  );
}
