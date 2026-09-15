"use client";

import { useState } from "react";
import { FormulaSchema } from "@/schemas/formulaSchema";
import { analyzeFormulaApi } from "@/services/api";

export default function AIExplainerClient() {
  const [formula, setFormula] = useState("");
  const [topic, setTopic] = useState<"linear" | "quadratic" | "trigonometry">(
    "linear",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleExplain() {
    setError("");
    setResult("");

    const validation = FormulaSchema.safeParse({
      formula: formula.trim(),
      topic,
    });

    if (!validation.success) {
      setError("Silakan masukkan rumus dan pilih topik yang valid.");
      return;
    }

    setLoading(true);

    try {
      const analysis = await analyzeFormulaApi(validation.data);

      setResult(analysis.explanation);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal memproses rumus.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <label
          htmlFor="formula"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Rumus atau konsep matematika
        </label>

        <textarea
          id="formula"
          value={formula}
          onChange={(event) => setFormula(event.target.value)}
          placeholder="Contoh: y = 2x + 3"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <div className="mt-4">
          <label
            htmlFor="topic"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Topik matematika
          </label>

          <select
            id="topic"
            value={topic}
            onChange={(event) =>
              setTopic(
                event.target.value as "linear" | "quadratic" | "trigonometry",
              )
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="linear">Linear</option>
            <option value="quadratic">Kuadrat</option>
            <option value="trigonometry">Trigonometri</option>
          </select>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleExplain}
          disabled={loading}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Menganalisis..." : "Jelaskan dengan AI"}
        </button>
      </div>

      {result && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Hasil Penjelasan
          </h2>

          <p className="mt-3 leading-7 text-slate-700">{result}</p>
        </div>
      )}
    </div>
  );
}
