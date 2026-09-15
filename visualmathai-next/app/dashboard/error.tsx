"use client";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900">
          Terjadi Kesalahan
        </h2>

        <p className="mt-3 text-slate-600">
          Dashboard tidak dapat dimuat. Silakan coba lagi.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}