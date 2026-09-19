"use client";

import { useMemo, useState } from "react";

type SolverStep = {
  number: number;
  title: string;
  expression: string;
  explanation: string;
};

function parseLinearEquation(input: string): {
  a: number;
  b: number;
  c: number;
} | null {
  const normalized = input
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(",", ".");

  const match = normalized.match(
    /^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)=([+-]?\d*\.?\d*)$/,
  );

  if (!match) {
    return null;
  }

  const aText = match[1];
  const bText = match[2];
  const cText = match[3];

  if (aText === undefined || bText === undefined || cText === undefined) {
    return null;
  }

  const a =
    aText === "" || aText === "+"
      ? 1
      : aText === "-"
        ? -1
        : Number(aText);

  const b =
    bText === "" ? 0 : Number(bText);

  const c = Number(cText);

  if (
    !Number.isFinite(a) ||
    !Number.isFinite(b) ||
    !Number.isFinite(c) ||
    a === 0
  ) {
    return null;
  }

  return { a, b, c };
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2);
}

function buildSteps(
  a: number,
  b: number,
  c: number,
): SolverStep[] {
  const steps: SolverStep[] = [];

  steps.push({
    number: 1,
    title: "Identifikasi persamaan",
    expression: `${formatNumber(a)}x ${
      b >= 0 ? "+" : "-"
    } ${formatNumber(Math.abs(b))} = ${formatNumber(c)}`,
    explanation:
      "Kita mulai dengan mengidentifikasi koefisien x, konstanta, dan nilai di ruas kanan.",
  });

  const movedConstant = c - b;

  steps.push({
    number: 2,
    title: "Pindahkan konstanta",
    expression: `${formatNumber(a)}x = ${formatNumber(movedConstant)}`,
    explanation:
      "Konstanta pada ruas kiri dipindahkan ke ruas kanan dengan operasi lawan, sehingga b dikurangkan dari kedua ruas.",
  });

  const solution = movedConstant / a;

  steps.push({
    number: 3,
    title: "Bagi dengan koefisien x",
    expression: `x = ${formatNumber(movedConstant)} ÷ ${formatNumber(a)}`,
    explanation:
      "Kedua ruas dibagi dengan koefisien x agar variabel x berdiri sendiri.",
  });

  steps.push({
    number: 4,
    title: "Hasil akhir",
    expression: `x = ${formatNumber(solution)}`,
    explanation:
      "Nilai x diperoleh setelah pembagian kedua ruas dengan koefisien x.",
  });

  return steps;
}

export default function StepByStepSolver() {
  const [input, setInput] = useState("2x + 3 = 11");

  const parsed = useMemo(
    () => parseLinearEquation(input),
    [input],
  );

  const steps = useMemo(() => {
    if (!parsed) {
      return [];
    }

    return buildSteps(parsed.a, parsed.b, parsed.c);
  }, [parsed]);

  return (
    <section
      aria-labelledby="solver-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="mb-1 text-sm font-semibold text-emerald-600">
          FR-08
        </p>

        <h2
          id="solver-title"
          className="text-xl font-bold text-slate-900"
        >
          Step-by-step Solver
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Masukkan persamaan linear sederhana untuk melihat proses
          penyelesaian secara bertahap beserta alasan setiap langkah.
        </p>
      </div>

      <label
        htmlFor="solver-input"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        Persamaan
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="solver-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Contoh: 2x + 3 = 11"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => {
            setInput("2x + 3 = 11");
          }}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Contoh
        </button>
      </div>

      {!parsed && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          Format belum dikenali. Gunakan format seperti:
          <strong className="ml-1 font-mono">
            2x + 3 = 11
          </strong>
        </div>
      )}

      {parsed && (
        <ol className="mt-6 space-y-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-xl border border-slate-200 p-4"
            >
              <div className="flex gap-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700"
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-900">
                    {step.expression}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.explanation}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}