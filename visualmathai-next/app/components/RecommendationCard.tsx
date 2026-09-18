"use client";

import type { Recommendation } from "@/schemas/recommendationSchema";

type Props = {
  recommendation: Recommendation;
};

export default function RecommendationCard({
  recommendation,
}: Props) {
  return (
    <article
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-label={`Rekomendasi ${recommendation.title}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {recommendation.topic}
        </span>

        <span className="text-xs font-medium text-slate-500">
          Prioritas {recommendation.priority}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {recommendation.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {recommendation.reason}
      </p>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Penguasaan</span>
          <span>{recommendation.mastery}%</span>
        </div>

        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={recommendation.mastery}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Penguasaan ${recommendation.topic}`}
        >
          <div
            className="h-full rounded-full bg-blue-600"
            style={{
              width: `${recommendation.mastery}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}