import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Kelas | VisualMath AI",
};

const classes = [
  {
    id: "KLS-001",
    name: "Matematika Dasar A",
    members: 24,
  },
  {
    id: "KLS-002",
    name: "Matematika Dasar B",
    members: 18,
  },
  {
    id: "KLS-003",
    name: "Matematika Dasar C",
    members: 21,
  },
];

export default function DosenKelasPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Dosen
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manajemen Kelas
          </h1>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Tambah Kelas
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {classes.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-medium text-slate-500">
              {item.id}
            </p>

            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {item.name}
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              {item.members} mahasiswa
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
            >
              Kelola Anggota
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}