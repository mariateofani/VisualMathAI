"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/authSchema";

export default function LoginFormClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<
    "MAHASISWA" | "DOSEN" | "ADMIN"
  >("MAHASISWA");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const validation = LoginSchema.safeParse({
      email,
      password,
      role,
    });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message ??
          "Data login tidak valid."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Login gagal.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="nama@email.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Minimal 8 karakter"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Role
        </label>

        <select
          id="role"
          name="role"
          value={role}
          onChange={(event) =>
            setRole(
              event.target.value as
                | "MAHASISWA"
                | "DOSEN"
                | "ADMIN"
            )
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="MAHASISWA">Mahasiswa</option>
          <option value="DOSEN">Dosen</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Memproses..." : "Login"}
      </button>
    </form>
  );
}