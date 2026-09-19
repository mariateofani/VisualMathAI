import type { Metadata } from "next";
import BackButton from "@/app/components/BackButton";

export const metadata: Metadata = {
  title: "Progres Mahasiswa | VisualMath AI",
};

const students = [
  {
    id: 1,
    name: "Mahasiswa 01",
    score: 92,
    mastery: 90,
  },
  {
    id: 2,
    name: "Mahasiswa 02",
    score: 84,
    mastery: 78,
  },
  {
    id: 3,
    name: "Mahasiswa 03",
    score: 76,
    mastery: 70,
  },
];

export default function DosenProgressPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <BackButton />
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Dosen
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Progres Mahasiswa
        </h1>
      </header>

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Progres mahasiswa
            </caption>

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4">Mahasiswa</th>
                <th className="px-6 py-4">Nilai</th>
                <th className="px-6 py-4">Penguasaan</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {student.name}
                  </td>

                  <td className="px-6 py-4">
                    {student.score}
                  </td>

                  <td className="px-6 py-4">
                    {student.mastery}%
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