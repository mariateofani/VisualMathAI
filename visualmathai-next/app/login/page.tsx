import type { Metadata } from "next";
import LoginFormClient from "./LoginFormClient";

export const metadata: Metadata = {
  title: "Login | VisualMath AI",
  description: "Masuk ke akun VisualMath AI untuk mulai belajar matematika.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              VisualMath AI
            </h1>

            <p className="mt-2 text-slate-600">
              Masuk untuk melanjutkan pembelajaran
            </p>
          </div>

          <LoginFormClient />

          <p className="mt-6 text-center text-sm text-slate-500">
            Demo login VisualMath AI
          </p>
        </div>
      </section>
    </main>
  );
}