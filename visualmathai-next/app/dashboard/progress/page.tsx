import type { Metadata } from "next";
import { Suspense } from "react";
import ProgressSummary from "./ProgressSummary";

export const metadata: Metadata = {
  title: "Progres Belajar | VisualMath AI",
  description:
    "Lihat perkembangan dan pencapaian belajar matematika di VisualMath AI.",
};

function ProgressLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>

      <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Progres Belajar
        </h1>

        <p className="mt-2 text-slate-600">
          Pantau perkembangan belajar dan pencapaian matematika Anda.
        </p>
      </div>

      <Suspense fallback={<ProgressLoading />}>
        <ProgressSummary />
      </Suspense>
    </section>
  );
}