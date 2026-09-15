import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-blue-600"
          >
            VisualMath AI
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/explainer"
              className="text-slate-600 hover:text-blue-600"
            >
              AI Explainer
            </Link>

            <Link
              href="/dashboard/exercise"
              className="text-slate-600 hover:text-blue-600"
            >
              Latihan
            </Link>

            <Link
              href="/dashboard/progress"
              className="text-slate-600 hover:text-blue-600"
            >
              Progres
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Keluar
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}