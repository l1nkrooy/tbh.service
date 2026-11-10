"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="flex min-h-screen items-center justify-center bg-[#0a0a0d] text-[#ebe7df]">
        <Container className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
          <p className="mt-2 text-sm text-[#9c98a3]">
            Попробуйте обновить страницу или вернуться на главную.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="secondary" onClick={() => reset()}>
              Попробовать снова
            </Button>
            <Link href="/">
              <Button variant="primary">На главную</Button>
            </Link>
          </div>
        </Container>
      </body>
    </html>
  );
}
