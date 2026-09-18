import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Dosen | VisualMath AI",
  description:
    "Dashboard dosen untuk memantau pembelajaran mahasiswa.",
};

export default function DosenPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Dashboard Dosen
        </h1>

        <p className="mt-2 text-slate-600">
          Pantau progres mahasiswa dan kelola pembelajaran.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Jumlah Mahasiswa"
          value="32"
        />

        <StatCard
          title="Rata-rata Nilai"
          value="82%"
        />

        <StatCard
          title="Materi Tersulit"
          value="Trigonometri"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MenuCard
          href="/dosen/materi"
          title="Manajemen Materi & Soal"
          description="Kelola materi dan soal latihan."
        />

        <MenuCard
          href="/dosen/kelas"
          title="Manajemen Kelas"
          description="Kelola kelas dan anggota mahasiswa."
        />

        <MenuCard
          href="/dosen/progress"
          title="Progres Mahasiswa"
          description="Lihat nilai dan progres mahasiswa."
        />
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
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </article>
  );
}

function MenuCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </Link>
  );
}