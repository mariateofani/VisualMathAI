import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil | VisualMath AI",
  description:
    "Kelola informasi profil pengguna VisualMath AI.",
};

const profile = {
  name: "Mahasiswa VisualMath",
  email: "mahasiswa@visualmath.ai",
  role: "MAHASISWA",
  institution: "Universitas Sebelas Maret",
};

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          VisualMath AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Profil
        </h1>

        <p className="mt-2 text-slate-600">
          Informasi akun dan profil pengguna.
        </p>
      </header>

      <div className="rounded-2xl bg-white p-6 shadow">
        <dl className="divide-y divide-slate-200">
          <div className="grid gap-2 py-4 sm:grid-cols-3">
            <dt className="font-medium text-slate-500">
              Nama
            </dt>
            <dd className="sm:col-span-2 text-slate-900">
              {profile.name}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-3">
            <dt className="font-medium text-slate-500">
              Email
            </dt>
            <dd className="sm:col-span-2 text-slate-900">
              {profile.email}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-3">
            <dt className="font-medium text-slate-500">
              Role
            </dt>
            <dd className="sm:col-span-2 text-slate-900">
              {profile.role}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-3">
            <dt className="font-medium text-slate-500">
              Institusi
            </dt>
            <dd className="sm:col-span-2 text-slate-900">
              {profile.institution}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}