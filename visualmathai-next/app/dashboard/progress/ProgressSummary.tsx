import { fetchProgressApi } from "@/services/api";

export default async function ProgressSummary() {
  try {
    const progress = await fetchProgressApi();

    if (progress.length === 0) {
      return (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-slate-900">
            Belum Ada Data Progres
          </h2>

          <p className="mt-2 text-slate-600">
            Mulai mengerjakan latihan untuk melihat progres belajar.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              Total Topik
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {progress.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              Total Latihan
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {progress.reduce(
                (total, item) => total + item.totalExercises,
                0
              )}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">
              Jawaban Benar
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {progress.reduce(
                (total, item) => total + item.correctAnswers,
                0
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">
            Penguasaan Materi
          </h2>

          <div className="mt-6 space-y-6">
            {progress.map((item) => (
              <div key={item.topicId}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-700">
                    {item.topicName}
                  </span>

                  <span className="text-sm font-semibold text-blue-600">
                    {item.mastery}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${item.mastery}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>
                    Benar: {item.correctAnswers}
                  </span>

                  <span>
                    Total: {item.totalExercises}
                  </span>

                  <span>
                    Update: {item.lastUpdated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Gagal Memuat Progres
        </h2>

        <p className="mt-2 text-sm text-red-700">
          Data progres tidak dapat dimuat. Silakan coba lagi.
        </p>
      </div>
    );
  }
}