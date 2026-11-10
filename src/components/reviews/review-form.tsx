"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";

const reviewFormSchema = z.object({
  authorName: z.string().min(1).max(80),
  rating: z.number().int().min(1).max(5),
  serviceLabel: z.string().max(120).optional(),
  text: z.string().min(10).max(2000),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export function ReviewForm() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 5, authorName: "", serviceLabel: "", text: "" },
  });

  async function onSubmit(values: ReviewFormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-panel p-7">
      <h3 className="font-display text-xl font-semibold text-bone">
        {t.reviews.leaveReview}
      </h3>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 rounded-[var(--radius-md)] bg-sage/15 px-4 py-3 text-sm text-sage"
          >
            {t.reviews.formSubmitted}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-sm text-bone-dim">{t.reviews.formName}</label>
              <input
                {...register("authorName")}
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-2.5 text-sm text-bone outline-none focus:border-relic"
              />
              {errors.authorName && (
                <p className="mt-1 text-xs text-blood-bright">
                  {errors.authorName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-bone-dim">{t.reviews.ratingLabel}</label>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => field.onChange(n)}
                        className="cursor-pointer"
                      >
                        <Star
                          size={22}
                          className={
                            n <= field.value
                              ? "fill-relic text-relic"
                              : "text-line transition-colors hover:text-bone-faint"
                          }
                        />
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            <div>
              <label className="text-sm text-bone-dim">{t.reviews.formService}</label>
              <input
                {...register("serviceLabel")}
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-2.5 text-sm text-bone outline-none focus:border-relic"
              />
            </div>

            <div>
              <label className="text-sm text-bone-dim">{t.reviews.formText}</label>
              <textarea
                {...register("text")}
                rows={4}
                className="mt-1.5 w-full resize-none rounded-[var(--radius-md)] border border-line bg-panel-raised px-4 py-2.5 text-sm text-bone outline-none focus:border-relic"
              />
              {errors.text && (
                <p className="mt-1 text-xs text-blood-bright">{errors.text.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={submitting}
            >
              {t.reviews.formSubmit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
