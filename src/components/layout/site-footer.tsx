import { Container } from "@/components/ui/container";
import { FooterContent } from "./footer-content";

/**
 * Footer — серверный компонент-обёртка. Перевод и интерактивность
 * вынесены в клиентский FooterContent, чтобы сам footer оставался простым.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel/40">
      <Container className="py-16">
        <FooterContent />
      </Container>
    </footer>
  );
}
