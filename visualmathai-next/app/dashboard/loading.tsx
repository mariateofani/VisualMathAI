export default function DashboardLoading() {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="animate-pulse">
          <div className="h-4 w-32 rounded bg-slate-200" />

          <div className="mt-4 h-10 w-72 rounded bg-slate-200" />

          <div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-32 rounded-xl bg-white shadow" />
            <div className="h-32 rounded-xl bg-white shadow" />
            <div className="h-32 rounded-xl bg-white shadow" />
            <div className="h-32 rounded-xl bg-white shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}