import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | VisualMath AI",
};

const users = [
  {
    id: 1,
    name: "Mahasiswa 01",
    email: "mahasiswa01@visualmath.ai",
    role: "MAHASISWA",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Dosen 01",
    email: "dosen01@visualmath.ai",
    role: "DOSEN",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Admin 01",
    email: "admin01@visualmath.ai",
    role: "ADMIN",
    status: "ACTIVE",
  },
];

export default function AdminUsersPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manajemen Pengguna & Role
          </h1>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Tambah Pengguna
        </button>
      </header>

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Daftar pengguna sistem
            </caption>

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">
                    {user.status}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-2 hover:bg-slate-50"
                    >
                      Edit
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