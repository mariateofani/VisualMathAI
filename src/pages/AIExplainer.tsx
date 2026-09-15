import { useState } from "react";
import { analyzeFormulaApi } from "@/services/api";
import { FormulaSchema } from "@/schemas/formulaSchema";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Badge from "@/components/Badge";

type AIExplainerProps = {
  onBack: () => void;
};

export default function AIExplainer({ onBack }: AIExplainerProps) {
  const [formula, setFormula] = useState("");
  const [topic, setTopic] = useState<"linear" | "quadratic" | "trigonometry">(
    "linear",
  );

  const [analysis, setAnalysis] = useState<null | {
    formulaId: string;
    formula: string;
    explanation: string;
    steps: string[];
    graphData: number[];
    difficulty: "LOW" | "MEDIUM" | "HIGH";
    createdAt: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setAnalysis(null);

    try {
      const input = {
        formula: formula.trim(),
        topic,
      };

      const validation = FormulaSchema.safeParse(input);

      if (!validation.success) {
        const firstError =
          validation.error.issues[0]?.message || "Input rumus tidak valid.";

        setError(firstError);
        return;
      }

      setLoading(true);

      const result = await analyzeFormulaApi(validation.data);

      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat menganalisis rumus.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg bg-white shadow text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          ← Kembali ke Dashboard
        </button>

        <Card className="mb-6">
          <h1 className="text-3xl font-bold text-brand-700">
            AI Math Explainer
          </h1>

          <p className="text-gray-600 mt-2">
            Masukkan rumus matematika untuk mendapatkan penjelasan langkah demi
            langkah.
          </p>
        </Card>

        <Card>
          <form onSubmit={handleAnalyze} className="space-y-5">
            <Input
              label="Rumus Matematika"
              value={formula}
              onChange={(event) => {
                setFormula(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="Contoh: y = 3x + 5"
              aria-invalid={Boolean(error)}
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Topik
              </label>

              <select
                value={topic}
                onChange={(event) =>
                  setTopic(
                    event.target.value as
                      | "linear"
                      | "quadratic"
                      | "trigonometry",
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="linear">Linear</option>
                <option value="quadratic">Kuadrat</option>
                <option value="trigonometry">Trigonometri</option>
              </select>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Menganalisis..." : "Analisis Rumus"}
            </Button>
          </form>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700"
            >
              <p className="font-semibold">⚠️ Validasi gagal</p>

              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
        </Card>

        {analysis && (
          <Card className="mt-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Hasil Analisis
              </h2>

              <Badge
                variant={
                  analysis.difficulty === "HIGH"
                    ? "warning"
                    : analysis.difficulty === "LOW"
                      ? "success"
                      : "default"
                }
              >
                {analysis.difficulty}
              </Badge>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">Rumus</p>

                <p className="text-lg font-semibold text-gray-800">
                  {analysis.formula}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Penjelasan</p>

                <p className="text-gray-700 mt-1">{analysis.explanation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Langkah Penyelesaian
                </p>

                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {analysis.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
