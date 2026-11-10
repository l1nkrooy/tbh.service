"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup } from "@/components/motion/reveal";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewForm } from "@/components/reviews/review-form";

interface ReviewItem {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  service_label: string | null;
  created_at: string;
}

export default function ReviewsPage() {
  const { t, locale } = useI18n();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setReviews(data.reviews ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "long",
    });
  }

  return (
    <>
      <PageHeader
        eyebrow={t.nav.reviews}
        title={t.reviews.title}
        subtitle={t.reviews.subtitle}
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {!loading && reviews.length === 0 && (
              <p className="text-bone-dim">{t.reviews.noReviewsYet}</p>
            )}
            <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {reviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  authorName={r.author_name}
                  rating={r.rating}
                  text={r.text}
                  serviceLabel={r.service_label}
                  date={formatDate(r.created_at)}
                />
              ))}
            </RevealGroup>
          </div>

          <div className="lg:sticky lg:top-24">
            <ReviewForm />
          </div>
        </Container>
      </section>
    </>
  );
}
