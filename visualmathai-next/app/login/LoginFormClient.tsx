"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginSchema,
  type Role,
} from "@/schemas/authSchema";

export default function LoginFormClient() {
  const router = useRouter();

  const [email, setEmail] = useState(
    "mahasiswa@visualmath.ai",
  );

  const [password, setPassword] =
    useState("12345678");

  const [role, setRole] =
    useState<Role>("MAHASISWA");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
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
          "Data login tidak valid.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            validation.data,
          ),
        },
      );

      const data: unknown =
        await response.json();

      if (!response.ok) {
        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
        ) {
          throw new Error(data.message);
        }

        throw new Error(
          "Login gagal.",
        );
      }

      if (role === "MAHASISWA") {
        router.push("/dashboard");
      } else if (role === "DOSEN") {
        router.push("/dosen");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login gagal.",
      );
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
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
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
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
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
          value={role}
          onChange={(event) =>
            setRole(
              event.target.value as Role,
            )
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="MAHASISWA">
            Mahasiswa
          </option>

          <option value="DOSEN">
            Dosen
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Memproses..."
          : "Login"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Demo: gunakan password{" "}
        <strong>12345678</strong>.
      </p>
    </form>
  );
}