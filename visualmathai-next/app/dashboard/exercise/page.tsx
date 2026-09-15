import type { Metadata } from "next";
import ExerciseClient from "./ExerciseClient";

export const metadata: Metadata = {
  title: "Latihan Adaptif | VisualMath AI",
  description:
    "Latihan matematika adaptif berdasarkan tingkat kesulitan untuk membantu meningkatkan pemahaman mahasiswa.",
};

export default function ExercisePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Latihan Adaptif
        </h1>

        <p className="mt-2 text-slate-600">
          Kerjakan soal matematika dengan tingkat kesulitan yang
          menyesuaikan kemampuan belajar.
        </p>
      </div>

      <ExerciseClient />
    </section>
  );
}