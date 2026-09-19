import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Admin | VisualMath AI",
  description:
    "Dashboard administrasi VisualMath AI.",
};

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Dashboard Admin
        </h1>

        <p className="mt-2 text-slate-600">
          Ringkasan status sistem dan administrasi aplikasi.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total User" value="128" />
        <StatCard title="Mahasiswa" value="100" />
        <StatCard title="Dosen" value="25" />
        <StatCard title="Admin" value="3" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/users"
          className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Manajemen Pengguna & Role
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Kelola akun pengguna dan role sistem.
          </p>
        </Link>

        <Link
          href="/admin/ai"
          className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Konfigurasi AI
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Kelola parameter layanan AI.
          </p>
        </Link>
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