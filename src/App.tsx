import { useState } from "react";
import {
  loginApi,
  analyzeFormulaApi,
  fetchExercisesApi,
  fetchProgressApi,
  submitAnswerApi,
} from "@/services/api";
import { LoginSchema } from "@/schemas/authSchema";
import { FormulaSchema } from "@/schemas/formulaSchema";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Badge from "@/components/Badge";
import Dashboard from "@/pages/Dashboard";
import AIExplainer from "@/pages/AIExplainer";
import AdaptiveExercise from "@/pages/AdaptiveExercise";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"MAHASISWA" | "DOSEN" | "ADMIN">(
    "MAHASISWA",
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formula, setFormula] = useState("");
  const [topic, setTopic] = useState<"linear" | "quadratic" | "trigonometry">(
    "linear",
  );

  const [analysis, setAnalysis] = useState<null | {
    formulaId: string;
    formula: string;
    explanation: string;
    steps: string[];
    graphData: number[];
    difficulty: "LOW" | "MEDIUM" | "HIGH";
    createdAt: string;
  }>(null);

  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    role: string;
  }>(null);

  const [page, setPage] = useState<
    | "dashboard"
    | "explainer"
    | "graph"
    | "exercise"
    | "progress"
    | "lecturer"
    | "admin"
  >("dashboard");

  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [exerciseMessage, setExerciseMessage] = useState("");
  const [exerciseError, setExerciseError] = useState("");

  const [progress, setProgress] = useState<
    {
      topicId: string;
      topicName: string;
      mastery: number;
      totalExercises: number;
      correctAnswers: number;
      lastUpdated: string;
    }[]
  >([]);

  const [progressLoading, setProgressLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const input = {
        email,
        password,
        role,
      };

      // Validasi menggunakan Zod
      LoginSchema.parse(input);

      // Memanggil API login
      const result = await loginApi(input);

      console.log("Login berhasil:", result);

      setUser(result.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyzeFormula(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAnalysisError("");
    setAnalysis(null);
    setAnalysisLoading(true);

    try {
      const input = {
        formula,
        topic,
      };

      // Validasi input menggunakan Zod
      FormulaSchema.parse(input);

      // Memanggil API analisis rumus
      const result = await analyzeFormulaApi(input);

      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setAnalysisError(err.message);
      } else {
        setAnalysisError("Terjadi kesalahan saat menganalisis rumus.");
      }
    } finally {
      setAnalysisLoading(false);
    }
  }

  async function loadExercises() {
    setExerciseLoading(true);
    setExerciseError("");
    setExerciseMessage("");

    try {
      const result = await fetchExercisesApi();

      if (result.length > 0) {
        setCurrentExercise(result[0]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setExerciseError(err.message);
      } else {
        setExerciseError("Gagal mengambil soal.");
      }
    } finally {
      setExerciseLoading(false);
    }
  }

  async function handleSubmitAnswer() {
    if (!currentExercise) return;

    setExerciseLoading(true);
    setExerciseError("");
    setExerciseMessage("");

    try {
      const result = await submitAnswerApi(currentExercise.id, answer);

      if (result.isCorrect) {
        setExerciseMessage(
          `🎉 Jawaban benar! Tingkat berikutnya: ${result.nextDifficulty}`,
        );
      } else {
        setExerciseMessage(
          `❌ Jawaban belum tepat. Tingkat berikutnya: ${result.nextDifficulty}`,
        );
      }

      setAnswer("");
    } catch (err) {
      if (err instanceof Error) {
        setExerciseError(err.message);
      } else {
        setExerciseError("Gagal memeriksa jawaban.");
      }
    } finally {
      setExerciseLoading(false);
    }
  }

  async function loadProgress() {
    setProgressLoading(true);

    try {
      const result = await fetchProgressApi();
      setProgress(result);
    } catch (err) {
      console.error("Gagal mengambil progres:", err);
    } finally {
      setProgressLoading(false);
    }
  }

  if (user && page === "dashboard") {
  return (
    <Dashboard
      userName={user.name}
      userRole={user.role}
      onNavigate={setPage}
      onLogout={() => setUser(null)}
    />
  );
}

if (user && page === "explainer") {
  return (
    <AIExplainer
      onBack={() => setPage("dashboard")}
    />
  );
}

if (user && page === "exercise") {
  return (
    <AdaptiveExercise
      onBack={() => setPage("dashboard")}
    />
  );
}
  if (user && user.role === "DOSEN" && page === "lecturer") {
    return (
      <main className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  Dashboard Dosen
                </h1>
                <p className="mt-1 text-gray-600">
                  Selamat datang, {user.name} 👋
                </p>
              </div>

              <button
                onClick={() => setPage("dashboard")}
                className="px-4 py-2 rounded-lg bg-gray-100 font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                ← Dashboard
              </button>
            </div>
          </div>

          {/* Menu Dosen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-xl font-bold text-gray-800">
                Materi Pembelajaran
              </h2>
              <p className="mt-2 text-gray-600">
                Kelola dan siapkan materi matematika untuk mahasiswa.
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data materi (demo)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-gray-800">Latihan Soal</h2>
              <p className="mt-2 text-gray-600">
                Membuat dan mengelola latihan matematika.
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data latihan (demo)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-xl font-bold text-gray-800">
                Monitoring Mahasiswa
              </h2>
              <p className="mt-2 text-gray-600">
                Melihat perkembangan dan hasil belajar mahasiswa.
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data monitoring (demo)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-xl font-bold text-gray-800">Profil Dosen</h2>
              <p className="mt-2 text-gray-600">Nama: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (user && user.role === "ADMIN" && page === "admin") {
    return (
      <main className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Admin */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  Dashboard Admin
                </h1>

                <p className="mt-1 text-gray-600">
                  Selamat datang, {user.name} 👋
                </p>
              </div>

              <button
                onClick={() => setPage("dashboard")}
                className="px-4 py-2 rounded-lg bg-gray-100 font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                ← Dashboard
              </button>
            </div>
          </div>

          {/* Menu Admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kelola Pengguna */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">👥</div>

              <h2 className="text-xl font-bold text-gray-800">
                Kelola Pengguna
              </h2>

              <p className="mt-2 text-gray-600">
                Mengelola data pengguna mahasiswa dan dosen.
              </p>

              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data pengguna (demo)
              </p>
            </div>

            {/* Kelola Materi */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📚</div>

              <h2 className="text-xl font-bold text-gray-800">Kelola Materi</h2>

              <p className="mt-2 text-gray-600">
                Mengelola materi pembelajaran matematika.
              </p>

              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data materi (demo)
              </p>
            </div>

            {/* Monitoring Sistem */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>

              <h2 className="text-xl font-bold text-gray-800">
                Monitoring Sistem
              </h2>

              <p className="mt-2 text-gray-600">
                Melihat aktivitas dan perkembangan sistem pembelajaran.
              </p>

              <p className="mt-4 text-sm font-semibold text-brand-600">
                Data monitoring (demo)
              </p>
            </div>

            {/* Laporan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-4xl mb-4">📄</div>

              <h2 className="text-xl font-bold text-gray-800">Laporan</h2>

              <p className="mt-2 text-gray-600">
                Melihat dan mengelola laporan sistem.
              </p>

              <p className="mt-4 text-sm font-semibold text-brand-600">
                Laporan (demo)
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (user) {
    // =========================
    // HALAMAN AI MATH EXPLAINER
    // =========================
    if (page === "explainer") {
      return (
        <main className="min-h-screen bg-brand-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  VisualMath AI
                </h1>

                <p className="text-gray-600 mt-1">AI Math Explainer</p>
              </div>

              <button
                onClick={() => setPage("dashboard")}
                className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
              >
                ← Kembali
              </button>
            </div>

            {/* AI Math Explainer */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-brand-700">
                  AI Math Explainer
                </h2>

                <p className="mt-2 text-gray-600">
                  Masukkan rumus matematika untuk mendapatkan penjelasan dan
                  langkah penyelesaian.
                </p>
              </div>

              <form onSubmit={handleAnalyzeFormula} className="space-y-5">
                {/* Rumus */}
                <div>
                  <label
                    htmlFor="formula"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Rumus
                  </label>

                  <input
                    id="formula"
                    type="text"
                    value={formula}
                    onChange={(event) => setFormula(event.target.value)}
                    placeholder="Contoh: x^2 + 2x + 1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                  />
                </div>

                {/* Topik */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Topik Matematika
                  </label>

                  <select
                    id="topic"
                    value={topic}
                    onChange={(event) =>
                      setTopic(
                        event.target.value as
                          | "linear"
                          | "quadratic"
                          | "trigonometry",
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="linear">Linear</option>
                    <option value="quadratic">Kuadrat</option>
                    <option value="trigonometry">Trigonometri</option>
                  </select>
                </div>

                {/* Error */}
                {analysisError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {analysisError}
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={analysisLoading}
                  className="w-full rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analysisLoading ? "Menganalisis..." : "Analisis Rumus"}
                </button>
              </form>

              {/* Hasil Analisis */}
              {analysis && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Hasil Analisis
                  </h3>

                  <div className="rounded-lg bg-brand-50 p-4 mb-4">
                    <p className="text-sm text-gray-500">Rumus</p>

                    <p className="text-lg font-semibold text-brand-700">
                      {analysis.formula}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 mb-4">
                    <p className="text-sm text-gray-500">Tingkat Kesulitan</p>
                    <Badge
                      variant={
                        analysis.difficulty === "HIGH"
                          ? "warning"
                          : analysis.difficulty === "LOW"
                            ? "success"
                            : "default"
                      }
                    >
                      {analysis.difficulty}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">Penjelasan</h4>

                    <p className="text-gray-600 leading-relaxed">
                      {analysis.explanation}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">
                      Langkah Penyelesaian
                    </h4>

                    <ol className="space-y-3">
                      {analysis.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </span>

                          <p className="text-gray-600 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      );
    }

    // =========================
    // HALAMAN GRAFIK INTERAKTIF
    // =========================
    if (page === "progress") {
      return (
        <main className="min-h-screen bg-brand-50 p-6">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setPage("dashboard")}
              className="mb-6 text-brand-600 font-semibold hover:text-brand-700"
            >
              ← Kembali ke Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-brand-700">
                📊 Progres Belajar
              </h1>

              <p className="mt-2 text-gray-600">
                Pantau perkembangan belajar matematika kamu.
              </p>

              {progressLoading ? (
                <p className="mt-8 text-gray-600">Memuat progres...</p>
              ) : (
                <div className="mt-8 space-y-6">
                  {progress.map((item) => (
                    <div key={item.topicId}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{item.topicName}</span>

                        <span className="font-semibold text-brand-600">
                          {item.mastery}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-brand-600 h-4 rounded-full transition-all"
                          style={{ width: `${item.mastery}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      );
    }

    if (page === "graph") {
      const graphValues = analysis?.graphData ?? [0, 1, 4, 9, 16, 25, 36];

      return (
        <main className="min-h-screen bg-brand-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  VisualMath AI
                </h1>

                <p className="text-gray-600 mt-1">Grafik Interaktif</p>
              </div>

              <button
                onClick={() => setPage("dashboard")}
                className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
              >
                ← Kembali
              </button>
            </div>

            {/* Konten */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Grafik Interaktif
                </h2>

                <p className="mt-2 text-gray-600">
                  Visualisasi data matematika berdasarkan hasil analisis rumus.
                </p>
              </div>

              {/* Grafik sederhana */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-6">
                  Visualisasi Data
                </h3>

                <div className="flex items-end gap-4 h-64 border-l-2 border-b-2 border-gray-300 px-6">
                  {graphValues.map((value, index) => {
                    const maxValue = Math.max(...graphValues, 1);

                    const height = (value / maxValue) * 200;

                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center justify-end h-full"
                      >
                        <span className="text-sm font-semibold text-brand-700 mb-2">
                          {value}
                        </span>

                        <div
                          className="w-full max-w-12 bg-brand-600 rounded-t-lg"
                          style={{
                            height: `${height}px`,
                          }}
                        />

                        <span className="text-xs text-gray-500 mt-2">
                          x={index}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-3">Data Grafik</h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    {graphValues.map((value, index) => (
                      <span key={index}>
                        ({index}, {value}){" "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }

    // =========================
    // HALAMAN LATIHAN ADAPTIF
    // =========================
    if (page === "exercise") {
      return (
        <main className="min-h-screen bg-brand-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  VisualMath AI
                </h1>

                <p className="text-gray-600 mt-1">Latihan Adaptif</p>
              </div>

              <button
                onClick={() => setPage("dashboard")}
                className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
              >
                ← Kembali
              </button>
            </div>

            {/* Konten */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Latihan Adaptif
                </h2>

                <p className="mt-2 text-gray-600">
                  Kerjakan soal matematika dan tingkat kesulitan akan
                  menyesuaikan kemampuanmu.
                </p>
              </div>

              {/* Tombol mulai */}
              {!currentExercise && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-5">
                    Siap untuk menguji kemampuan matematika kamu?
                  </p>

                  <button
                    onClick={loadExercises}
                    disabled={exerciseLoading}
                    className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                  >
                    {exerciseLoading ? "Memuat soal..." : "Mulai Latihan"}
                  </button>
                </div>
              )}

              {/* Error */}
              {exerciseError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 mb-5">
                  {exerciseError}
                </div>
              )}

              {/* Soal */}
              {currentExercise && (
                <div>
                  {/* Info soal */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
                      {currentExercise.difficulty}
                    </span>

                    <span className="text-sm text-gray-500">Soal 1</span>
                  </div>

                  {/* Pertanyaan */}
                  <div className="rounded-xl bg-gray-50 p-6 mb-6">
                    <p className="text-sm text-gray-500 mb-2">Pertanyaan</p>

                    <h3 className="text-xl font-bold text-gray-800">
                      {currentExercise.question}
                    </h3>
                  </div>

                  {/* Jawaban */}
                  <div className="mb-5">
                    <label
                      htmlFor="answer"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Jawaban
                    </label>

                    <input
                      id="answer"
                      type="text"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      placeholder="Masukkan jawaban kamu"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                    />
                  </div>

                  {/* Pesan hasil */}
                  {exerciseMessage && (
                    <div className="rounded-lg bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-700 mb-5">
                      {exerciseMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={exerciseLoading || answer.trim() === ""}
                    className="w-full rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {exerciseLoading ? "Memeriksa..." : "Periksa Jawaban"}
                  </button>
                  {feedback && (
                    <div className="mt-4 rounded-lg bg-brand-50 p-4 text-brand-700">
                      {feedback}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      );
    }

    // =========================
    // HALAMAN DASHBOARD
    // =========================
    return (
      <main className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Dashboard */}
          <header className="bg-white rounded-2xl shadow-lg p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Logo dan identitas */}
              <div>
                <h1 className="text-3xl font-bold text-brand-700">
                  VisualMath AI
                </h1>

                <p className="text-gray-600 mt-1">
                  Selamat datang, {user.name} 👋
                </p>
              </div>

              {/* Navigasi dan Logout */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPage("dashboard")}
                  className="px-4 py-2 rounded-lg font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition"
                >
                  Dashboard
                </button>

                <div className="hidden sm:block px-3 py-2 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {user.role}
                  </p>
                </div>

                <Button variant="secondary" onClick={() => setUser(null)}>
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Judul */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

            <p className="text-gray-600 mt-1">
              Pilih fitur yang ingin kamu gunakan.
            </p>
          </div>

          {/* TOMBOL ADMIN */}
          {user.role === "ADMIN" && (
            <button
              onClick={() => setPage("admin")}
              className="mb-6 w-full text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">⚙️</div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Dashboard Admin
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Kelola pengguna, materi, monitoring, dan laporan.
                  </p>
                </div>
              </div>
            </button>
          )}

          {/* TOMBOL DOSEN */}
          {user.role === "DOSEN" && (
            <button
              onClick={() => setPage("lecturer")}
              className="mb-6 w-full text-left bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">👨‍🏫</div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Dashboard Dosen
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Kelola materi, latihan, dan monitoring mahasiswa.
                  </p>
                </div>
              </div>
            </button>
          )}

          {/* Menu Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Math Explainer */}
            <Card className="group text-left cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
              <button
                onClick={() => setPage("explainer")}
                className="w-full text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-3xl">
                  🧠
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-800">
                  AI Math Explainer
                </h3>

                <p className="mt-2 text-gray-600">
                  Masukkan rumus matematika dan dapatkan penjelasan, langkah
                  penyelesaian, serta tingkat kesulitan.
                </p>

                <p className="mt-4 font-semibold text-brand-600">
                  Mulai Belajar →
                </p>
              </button>
            </Card>

            {/* Grafik Interaktif */}
            <button
              onClick={() => setPage("graph")}
              className="group text-left bg-white rounded-2xl shadow-lg p-6 border border-transparent hover:border-brand-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-3xl">
                  📈
                </div>

                <span className="text-brand-600 opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Grafik Interaktif
              </h3>

              <p className="mt-2 text-gray-600">
                Visualisasikan data dan hasil matematika dalam bentuk grafik
                yang lebih mudah dipahami.
              </p>

              <p className="mt-4 font-semibold text-brand-600">
                Lihat Grafik →
              </p>
            </button>

            {/* Latihan Adaptif */}
            <button
              onClick={() => {
                setCurrentExercise(null);
                setAnswer("");
                setFeedback("");
                setExerciseError("");
                setPage("exercise");
              }}
              className="group text-left bg-white rounded-2xl shadow-lg p-6 border border-transparent hover:border-brand-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-3xl">
                  📝
                </div>

                <span className="text-brand-600 opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Latihan Adaptif
              </h3>

              <p className="mt-2 text-gray-600">
                Kerjakan soal matematika dan dapatkan latihan dengan tingkat
                kesulitan yang menyesuaikan kemampuan.
              </p>

              <p className="mt-4 font-semibold text-brand-600">
                Mulai Latihan →
              </p>
            </button>

            {/* Progres Belajar */}
            <button
              onClick={() => {
                loadProgress();
                setPage("progress");
              }}
              className="group text-left bg-white rounded-2xl shadow-lg p-6 border border-transparent hover:border-brand-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-3xl">
                  📊
                </div>

                <span className="text-brand-600 opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Progres Belajar
              </h3>

              <p className="mt-2 text-gray-600">
                Lihat perkembangan dan tingkat penguasaan materi matematika yang
                telah dipelajari.
              </p>

              <p className="mt-4 font-semibold text-brand-600">
                Lihat Progres →
              </p>
            </button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-brand-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-700">VisualMath AI</h1>

          <p className="mt-2 text-gray-600">
            Masuk untuk mulai belajar matematika
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as "MAHASISWA" | "DOSEN" | "ADMIN")
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            >
              <option value="MAHASISWA">Mahasiswa</option>
              <option value="DOSEN">Dosen</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Button */}
          <Button type="submit" className="w-full">
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <button className="font-semibold text-brand-600 hover:text-brand-700">
            Daftar
          </button>
        </p>
      </div>

      <div className="fixed bottom-4 center-4 text-gray-500 text-sm">
        {/* Footer */}
      <footer className="mt-8 bg-white rounded-2xl shadow-lg p-5 text-center">
        <p className="text-sm text-gray-600">© 2026 VisualMath AI</p>

        <p className="text-xs text-gray-500 mt-1">
          Platform pembelajaran matematika berbasis AI dan visualisasi
          interaktif.
        </p>
      </footer>
      </div>
    </main>
  );
}

export default App;
