export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          VisualMath AI
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Belajar Matematika dengan
          <span className="block text-blue-600">
            AI dan Visualisasi Interaktif
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Pahami konsep matematika melalui penjelasan AI, grafik interaktif,
          latihan adaptif, dan pemantauan progres belajar.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Mulai Belajar
          </a>

          <a
            href="/dashboard"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </a>
        </div>
      </section>
    </main>
  );
}