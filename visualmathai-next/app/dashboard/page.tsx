import type { Metadata } from "next";
import RecommendationSection from "../components/RecommendationSection";

export const metadata: Metadata = {
  title: "Dashboard Mahasiswa | VisualMath AI",
  description:
    "Dashboard pembelajaran matematika mahasiswa VisualMath AI.",
};

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Dashboard Mahasiswa
        </h1>

        <p className="mt-2 text-slate-600">
          Pantau progres belajar, latihan, dan rekomendasi
          materi matematika.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Materi Dikuasai"
          value="12"
        />

        <StatCard
          title="Latihan Selesai"
          value="28"
        />

        <StatCard
          title="Rata-rata Nilai"
          value="86%"
        />

        <StatCard
          title="Streak"
          value="7 Hari"
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <DashboardLink
          href="/dashboard/explainer"
          title="AI Math Explainer"
          description="Analisis dan pahami rumus matematika."
        />

        <DashboardLink
          href="/dashboard/exercise"
          title="Latihan Adaptif"
          description="Kerjakan soal sesuai tingkat kemampuan."
        />

        <DashboardLink
          href="/dashboard/progress"
          title="Progres & Riwayat"
          description="Lihat perkembangan dan hasil belajar."
        />
      </div>

      <div className="mt-8">
        <RecommendationSection />
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </article>
  );
}

function DashboardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </a>
  );
}