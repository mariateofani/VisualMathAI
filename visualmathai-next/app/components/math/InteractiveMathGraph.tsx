"use client";

import { useMemo, useState } from "react";
import MathGraph from "./MathGraph";

type GraphType = "linear" | "quadratic" | "trigonometric";

const GRAPH_OPTIONS: Array<{
  value: GraphType;
  label: string;
}> = [
  {
    value: "linear",
    label: "Fungsi Linear",
  },
  {
    value: "quadratic",
    label: "Fungsi Kuadrat",
  },
  {
    value: "trigonometric",
    label: "Trigonometri",
  },
];

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function getEquation(
  type: GraphType,
  a: number,
  b: number,
  c: number,
): string {
  switch (type) {
    case "linear":
      return `y = ${formatNumber(a)}x ${b >= 0 ? "+" : "-"} ${formatNumber(Math.abs(b))}`;

    case "quadratic":
      return `y = ${formatNumber(a)}x² ${
        b >= 0 ? "+" : "-"
      } ${formatNumber(Math.abs(b))}x ${
        c >= 0 ? "+" : "-"
      } ${formatNumber(Math.abs(c))}`;

    case "trigonometric":
      return `y = ${formatNumber(a)} sin(${formatNumber(b)}x) ${
        c >= 0 ? "+" : "-"
      } ${formatNumber(Math.abs(c))}`;

    default:
      return "";
  }
}

export default function InteractiveMathGraph() {
  const [type, setType] = useState<GraphType>("linear");

  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(0);

  const equation = useMemo(
    () => getEquation(type, a, b, c),
    [type, a, b, c],
  );

  function handleTypeChange(nextType: GraphType) {
    setType(nextType);

    if (nextType === "linear") {
      setA(2);
      setB(3);
      setC(0);
    }

    if (nextType === "quadratic") {
      setA(1);
      setB(0);
      setC(-4);
    }

    if (nextType === "trigonometric") {
      setA(2);
      setB(1);
      setC(0);
    }
  }

  return (
    <section
      aria-labelledby="interactive-graph-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="mb-1 text-sm font-semibold text-blue-600">
          FR-06 & FR-07
        </p>

        <h2
          id="interactive-graph-title"
          className="text-xl font-bold text-slate-900"
        >
          Grafik Interaktif & Simulasi Parameter
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Pilih jenis fungsi lalu ubah parameter menggunakan slider.
          Grafik diperbarui secara real-time.
        </p>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {GRAPH_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleTypeChange(option.value)}
            aria-pressed={type === option.value}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              type === option.value
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mb-5 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Persamaan aktif
        </p>

        <p className="mt-2 font-mono text-lg font-bold text-slate-900">
          {equation}
        </p>
      </div>

      <MathGraph
        type={type}
        a={a}
        b={b}
        c={c}
      />

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <ParameterSlider
          label="Parameter a"
          value={a}
          min={-5}
          max={5}
          step={0.5}
          onChange={setA}
        />

        <ParameterSlider
          label="Parameter b"
          value={b}
          min={-5}
          max={5}
          step={0.5}
          onChange={setB}
        />

        <ParameterSlider
          label="Parameter c"
          value={c}
          min={-5}
          max={5}
          step={0.5}
          onChange={setC}
        />
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Simulasi real-time
        </p>

        <p className="mt-1 text-sm text-blue-800">
          Saat nilai parameter digeser, persamaan dan grafik di atas
          langsung dihitung ulang tanpa reload halaman.
        </p>
      </div>
    </section>
  );
}

type ParameterSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: ParameterSliderProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span className="rounded-md bg-white px-2 py-1 font-mono text-xs text-slate-900 shadow-sm">
          {formatNumber(value)}
        </span>
      </span>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        className="w-full accent-blue-600"
        aria-label={label}
      />
    </label>
  );
}