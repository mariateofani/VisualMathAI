import BackButton from "@/app/components/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Materi & Soal | VisualMath AI",
};

const materials = [
  {
    id: 1,
    title: "Fungsi Linear",
    topic: "linear",
    questions: 8,
  },
  {
    id: 2,
    title: "Fungsi Kuadrat",
    topic: "quadratic",
    questions: 10,
  },
  {
    id: 3,
    title: "Trigonometri",
    topic: "trigonometry",
    questions: 12,
  },
];

export default function DosenMateriPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <BackButton />
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Dosen
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Manajemen Materi & Soal
        </h1>
      </header>

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Daftar materi dan soal
            </caption>

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Materi
                </th>

                <th className="px-6 py-4 font-semibold">
                  Topik
                </th>

                <th className="px-6 py-4 font-semibold">
                  Jumlah Soal
                </th>

                <th className="px-6 py-4 font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {materials.map((material) => (
                <tr
                  key={material.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {material.title}
                  </td>

                  <td className="px-6 py-4">
                    {material.topic}
                  </td>

                  <td className="px-6 py-4">
                    {material.questions}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-2 hover:bg-slate-50"
                    >
                      Kelola
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}