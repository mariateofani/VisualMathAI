import AIExplainerClient from "@/app/dashboard/explainer/AIExplainerClient";
import BackButton from "@/app/components/BackButton";
import InteractiveMathGraph from "@/app/components/math/InteractiveMathGraph";
import StepByStepSolver from "@/app/components/math/StepByStepSolver";
import RealWorldApplication from "@/app/components/math/RealWorldApplication";

export const metadata = {
  title: "AI Math Explainer | VisualMath AI",
  description:
    "Penjelasan matematika, grafik interaktif, simulasi parameter, solver bertahap, dan contoh penerapan nyata.",
};

export default function ExplainerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <BackButton />

        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            VisualMath AI
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            AI Math Explainer
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Masukkan rumus atau soal matematika untuk memahami konsep,
            visualisasi grafik, simulasi parameter, penyelesaian
            bertahap, dan penerapannya dalam kehidupan nyata.
          </p>
        </header>

        <div className="space-y-6">
          {/* FR-05 */}
          <AIExplainerClient />

          {/* FR-06 + FR-07 */}
          <InteractiveMathGraph />

          {/* FR-08 */}
          <StepByStepSolver />

          {/* FR-09 */}
          <RealWorldApplication />
        </div>
      </div>
    </main>
  );
}