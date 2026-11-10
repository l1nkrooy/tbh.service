import type { Metadata } from "next";
import "@fontsource/press-start-2p/400.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { LoadingScreen } from "@/components/motion/loading-screen";
import { CartProvider } from "@/lib/store/cart-store";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hero-service.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hero Service", template: "%s — Hero Service" },
  description: "Hero Service",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ash text-bone selection:bg-blood/40 selection:text-bone">
        <LoadingScreen />
        <I18nProvider>
          <CartProvider>
            <SmoothScrollProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </SmoothScrollProvider>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
