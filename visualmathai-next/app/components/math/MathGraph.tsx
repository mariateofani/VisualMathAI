"use client";

import { useMemo } from "react";

type GraphType = "linear" | "quadratic" | "trigonometric";

type MathGraphProps = {
  type: GraphType;
  a: number;
  b: number;
  c: number;
};

type Point = {
  x: number;
  y: number;
};

const WIDTH = 720;
const HEIGHT = 360;

const PADDING = {
  left: 58,
  right: 24,
  top: 24,
  bottom: 42,
};

const X_MIN = -10;
const X_MAX = 10;
const Y_MIN = -10;
const Y_MAX = 10;

function evaluateFunction(
  type: GraphType,
  x: number,
  a: number,
  b: number,
  c: number,
): number {
  switch (type) {
    case "linear":
      return a * x + b;

    case "quadratic":
      return a * x * x + b * x + c;

    case "trigonometric":
      return a * Math.sin(b * x) + c;

    default:
      return 0;
  }
}

function toSvgX(x: number): number {
  const graphWidth = WIDTH - PADDING.left - PADDING.right;

  return (
    PADDING.left +
    ((x - X_MIN) / (X_MAX - X_MIN)) * graphWidth
  );
}

function toSvgY(y: number): number {
  const graphHeight = HEIGHT - PADDING.top - PADDING.bottom;

  return (
    HEIGHT -
    PADDING.bottom -
    ((y - Y_MIN) / (Y_MAX - Y_MIN)) * graphHeight
  );
}

function buildPath(points: Point[]): string {
  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";

      return `${command} ${toSvgX(point.x).toFixed(2)} ${toSvgY(point.y).toFixed(2)}`;
    })
    .join(" ");
}

export default function MathGraph({
  type,
  a,
  b,
  c,
}: MathGraphProps) {
  const points = useMemo(() => {
    const result: Point[] = [];

    const step = 0.1;

    for (let x = X_MIN; x <= X_MAX; x += step) {
      const y = evaluateFunction(type, x, a, b, c);

      if (Number.isFinite(y) && Math.abs(y) <= 100) {
        result.push({ x, y });
      }
    }

    return result;
  }, [type, a, b, c]);

  const path = buildPath(points);

  const xAxisY = toSvgY(0);
  const yAxisX = toSvgX(0);

  const gridLines = [];

  for (let x = X_MIN; x <= X_MAX; x += 1) {
    gridLines.push(
      <line
        key={`vertical-${x}`}
        x1={toSvgX(x)}
        y1={PADDING.top}
        x2={toSvgX(x)}
        y2={HEIGHT - PADDING.bottom}
        stroke="#e2e8f0"
        strokeWidth={x === 0 ? 0 : 1}
      />,
    );
  }

  for (let y = Y_MIN; y <= Y_MAX; y += 1) {
    gridLines.push(
      <line
        key={`horizontal-${y}`}
        x1={PADDING.left}
        y1={toSvgY(y)}
        x2={WIDTH - PADDING.right}
        y2={toSvgY(y)}
        stroke="#e2e8f0"
        strokeWidth={y === 0 ? 0 : 1}
      />,
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-3">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto min-w-160 w-full"
        role="img"
        aria-label={`Grafik fungsi ${type}`}
      >
        {gridLines}

        {/* X axis */}
        <line
          x1={PADDING.left}
          y1={xAxisY}
          x2={WIDTH - PADDING.right}
          y2={xAxisY}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Y axis */}
        <line
          x1={yAxisX}
          y1={PADDING.top}
          x2={yAxisX}
          y2={HEIGHT - PADDING.bottom}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* X labels */}
        {[-10, -5, 0, 5, 10].map((value) => (
          <text
            key={`xlabel-${value}`}
            x={toSvgX(value)}
            y={xAxisY + 24}
            textAnchor="middle"
            className="fill-slate-500 text-[11px]"
          >
            {value}
          </text>
        ))}

        {/* Y labels */}
        {[-10, -5, 0, 5, 10].map((value) => (
          <text
            key={`ylabel-${value}`}
            x={yAxisX - 10}
            y={toSvgY(value) + 4}
            textAnchor="end"
            className="fill-slate-500 text-[11px]"
          >
            {value}
          </text>
        ))}

        {/* Function */}
        <path
          d={path}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x={WIDTH - PADDING.right}
          y={xAxisY - 10}
          textAnchor="end"
          className="fill-slate-600 text-xs"
        >
          x
        </text>

        <text
          x={yAxisX + 10}
          y={PADDING.top + 12}
          className="fill-slate-600 text-xs"
        >
          y
        </text>
      </svg>
    </div>
  );
}