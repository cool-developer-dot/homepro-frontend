/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useMemo, useState } from "react";
import { Star, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAverageRating, type ServiceReview } from "@/lib/services-data";
import { useAuthContext } from "@/context/AuthProvider";

type Props = {
  reviews: ServiceReview[];
  // UI-only anti-spam guard; in production pass the real bookingId to prevent multiple reviews per booking.
  reviewKey: string;
  initialHasReviewed?: boolean;
};

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Please write at least 10 characters").max(500, "Comment is too long"),
});

type ReviewValues = z.infer<typeof reviewSchema>;

function safeGetReviewedFlag(reviewKey: string) {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(`homepro_reviewed_${reviewKey}`);
  } catch {
    return null;
  }
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : ""}`}
        />
      ))}
    </div>
  );
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Select star rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= shown;
        return (
          <button
            key={starIndex}
            type="button"
            className="p-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ring-offset-2 ring-offset-white"
            onMouseEnter={() => setHover(starIndex)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(starIndex)}
            aria-label={`${starIndex} star`}
            role="radio"
            aria-checked={value === starIndex}
          >
            <Star className={`h-5 w-5 transition ${filled ? "fill-current text-amber-500" : "text-amber-300"}`} />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-semibold text-slate-700">{value ? `${value}/5` : "Rate"}</span>
    </div>
  );
}

export default function RatingsReviews({
  reviews,
  reviewKey,
  initialHasReviewed = false,
}: Props) {
  const { user } = useAuthContext();
  const [localReviews, setLocalReviews] = useState<ServiceReview[]>([]);

  const allReviews = useMemo(() => [...reviews, ...localReviews], [reviews, localReviews]);
  const average = useMemo(() => getAverageRating(allReviews), [allReviews]);

  const [hasReviewed, setHasReviewed] = useState<boolean>(() => {
    if (initialHasReviewed) return true;
    return Boolean(safeGetReviewedFlag(reviewKey));
  });

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0 as unknown as number,
      comment: "",
    },
    mode: "onTouched",
  });

  const rating = watch("rating");

  const onSubmit = async (values: ReviewValues) => {
    if (!user) return;
    setSubmitting(true);
    try {
      // TODO: Replace with backend API call later.
      await new Promise((r) => setTimeout(r, 600));

      const now = new Date();
      const newReview: ServiceReview = {
        id: `local_${now.getTime()}`,
        userName: user.fullName || user.email.split("@")[0] || "User",
        rating: values.rating,
        comment: values.comment.trim(),
        date: now.toISOString().slice(0, 10),
      };

      setLocalReviews((prev) => [newReview, ...prev]);
      reset({ rating: 0 as unknown as number, comment: "" });
      setHasReviewed(true);
      try {
        window.localStorage.setItem(`homepro_reviewed_${reviewKey}`, "1");
      } catch {
        // ignore
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-50 ring-1 ring-amber-100 p-3">
              <p className="text-2xl font-extrabold text-slate-900">{average.toFixed(1)}</p>
              <p className="text-xs font-semibold text-slate-600">Average</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Ratings & Reviews</h3>
              <p className="text-sm text-slate-600">{allReviews.length} reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StarDisplay rating={Math.round(average)} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 sm:p-5">
              <h4 className="text-base font-semibold text-slate-900">Leave a review</h4>
              <p className="text-sm text-slate-600 mt-1">
                Your feedback helps others book with confidence.
              </p>

              {!user ? (
                <div className="mt-4 rounded-xl bg-white ring-1 ring-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">Sign in to review</p>
                  <p className="text-sm text-slate-600 mt-1">We’ll show your name and rating once submitted.</p>
                </div>
              ) : hasReviewed ? (
                <div className="mt-4 rounded-xl bg-white ring-1 ring-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">Thanks!</p>
                  <p className="text-sm text-slate-600 mt-1">You’ve already reviewed this booking.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Star rating</label>
                    <div className="mt-2">
                      <StarInput
                        value={rating || 0}
                        onChange={(next) => setValue("rating", next, { shouldValidate: true })}
                      />
                    </div>
                    {errors.rating ? (
                      <p className="mt-1 text-xs text-rose-600">{errors.rating.message}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Your comment</label>
                    <textarea
                      {...register("comment")}
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="Share what went well (or what could be improved)..."
                      disabled={submitting}
                    />
                    {errors.comment ? (
                      <p className="mt-1 text-xs text-rose-600">{errors.comment.message}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {submitting ? "Submitting..." : "Submit review"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-7">
            {allReviews.length === 0 ? (
              <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-900">No reviews yet</p>
                <p className="text-sm text-slate-600 mt-1">Be the first to share your experience.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allReviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 sm:p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{review.userName}</p>
                        <StarDisplay rating={review.rating} />
                      </div>
                      <time className="text-xs text-slate-500 shrink-0">
                        {new Date(review.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{review.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

