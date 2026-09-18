"use client";

import RecommendationCard from "./RecommendationCard";
import { useRecommendationsQuery } from "../hooks/useRecommendationsQuery";

export default function RecommendationSection() {
  const query = useRecommendationsQuery();

  return (
    <section aria-labelledby="recommendation-title">
      <div className="mb-4">
        <h2
          id="recommendation-title"
          className="text-2xl font-bold text-slate-900"
        >
          Rekomendasi Materi AI
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Materi yang dapat dipelajari kembali berdasarkan
          progres belajar.
        </p>
      </div>

      {query.isLoading && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          Memuat rekomendasi...
        </div>
      )}

      {query.isError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"
        >
          Gagal mengambil rekomendasi.
        </div>
      )}

      {query.data && (
        <div className="grid gap-4 md:grid-cols-3">
          {query.data.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </section>
  );
}