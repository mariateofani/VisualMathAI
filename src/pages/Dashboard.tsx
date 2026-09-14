type DashboardProps = {
  userName: string;
  userRole: string;
  onNavigate: (
    page: "dashboard" | "explainer" | "graph" | "exercise" | "progress"
  ) => void;
  onLogout: () => void;
};

export default function Dashboard({
  userName,
  userRole,
  onNavigate,
  onLogout,
}: DashboardProps) {
  return (
    <main className="min-h-screen bg-brand-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-700">
                VisualMath AI
              </h1>

              <p className="text-gray-600 mt-1">
                Selamat datang, {userName} 👋
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-semibold text-gray-700">
                  {userRole}
                </p>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-gray-100 font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Menu Utama */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Menu Utama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* AI Math Explainer */}
            <button
              type="button"
              onClick={() => onNavigate("explainer")}
              className="text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">🤖</div>

              <h3 className="text-xl font-bold text-brand-700">
                AI Math Explainer
              </h3>

              <p className="text-gray-600 mt-2">
                Masukkan rumus matematika dan dapatkan penjelasan
                langkah demi langkah dari AI.
              </p>
            </button>

            {/* Grafik Interaktif */}
            <button
              type="button"
              onClick={() => onNavigate("graph")}
              className="text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">📈</div>

              <h3 className="text-xl font-bold text-brand-700">
                Grafik Interaktif
              </h3>

              <p className="text-gray-600 mt-2">
                Lihat visualisasi data matematika dalam bentuk grafik
                interaktif.
              </p>
            </button>

            {/* Latihan Adaptif */}
            <button
              type="button"
              onClick={() => onNavigate("exercise")}
              className="text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">📝</div>

              <h3 className="text-xl font-bold text-brand-700">
                Latihan Adaptif
              </h3>

              <p className="text-gray-600 mt-2">
                Kerjakan latihan matematika dengan tingkat kesulitan
                yang menyesuaikan kemampuan.
              </p>
            </button>

            {/* Progres Belajar */}
            <button
              type="button"
              onClick={() => onNavigate("progress")}
              className="text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">📊</div>

              <h3 className="text-xl font-bold text-brand-700">
                Progres Belajar
              </h3>

              <p className="text-gray-600 mt-2">
                Pantau perkembangan belajar dan tingkat penguasaan
                materi matematika.
              </p>
            </button>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 bg-white rounded-2xl shadow-lg p-5 text-center">
          <p className="text-sm text-gray-600">
            © 2026 VisualMath AI
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Platform pembelajaran matematika berbasis AI dan visualisasi
            interaktif.
          </p>
        </footer>

      </div>
    </main>
  );
}
