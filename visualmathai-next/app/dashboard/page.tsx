export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            VisualMath AI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Dashboard Mahasiswa
          </h1>

          <p className="mt-2 text-slate-600">
            Kelola pembelajaran matematika dan pantau progres belajar Anda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Materi Dikuasai</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Latihan Selesai</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">28</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Rata-rata Nilai</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">86%</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Streak</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">7 Hari</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a
            href="/dashboard/explainer"
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              AI Math Explainer
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Dapatkan penjelasan matematika dengan bantuan AI.
            </p>
          </a>

          <a
            href="/dashboard/exercise"
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Latihan Adaptif
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Kerjakan latihan berdasarkan tingkat kemampuan.
            </p>
          </a>

          <a
            href="/dashboard/progress"
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Progres Belajar
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Lihat perkembangan dan riwayat pembelajaran.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}