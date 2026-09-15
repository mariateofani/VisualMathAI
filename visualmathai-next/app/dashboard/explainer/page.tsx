import type { Metadata } from "next";
import AIExplainerClient from "./AIExplainerClient";

export const metadata: Metadata = {
  title: "AI Math Explainer | VisualMath AI",
  description:
    "Jelaskan dan pahami konsep matematika dengan bantuan AI VisualMath.",
};

export default function ExplainerPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          AI Math Explainer
        </h1>

        <p className="mt-2 text-slate-600">
          Masukkan rumus atau konsep matematika untuk mendapatkan
          penjelasan yang lebih mudah dipahami.
        </p>
      </div>

      <AIExplainerClient />
    </section>
  );
}