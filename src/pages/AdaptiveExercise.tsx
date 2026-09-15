import { useState } from "react";
import { fetchExercisesApi, submitAnswerApi } from "@/services/api";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Badge from "@/components/Badge";

type Exercise = {
  id: string;
  question: string;
  difficulty: "LOW" | "MEDIUM" | "HIGH";
  options: string[];
  correctAnswer: string;
  topic: "linear" | "quadratic" | "trigonometry";
  explanation?: string;
};

type AdaptiveExerciseProps = {
  onBack: () => void;
};

export default function AdaptiveExercise({ onBack }: AdaptiveExerciseProps) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [usedExerciseIds, setUsedExerciseIds] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [nextDifficulty, setNextDifficulty] = useState<
    "LOW" | "MEDIUM" | "HIGH" | null
  >(null);

  async function startExercise() {
    setError("");
    setFeedback("");
    setAnswer("");
    setLoading(true);

    try {
      const exercises = await fetchExercisesApi();

      if (exercises.length === 0) {
        setError("Belum ada latihan yang tersedia.");
        return;
      }

      setExercise(exercises[0]);
      setUsedExerciseIds([exercises[0].id]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengambil latihan.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function checkAnswer() {
    if (!exercise) return;

    setError("");
    setFeedback("");
    setNextDifficulty(null);
    setChecking(true);

    try {
      const result = await submitAnswerApi(exercise.id, answer);

      if (result.isCorrect) {
        setFeedback(`Jawaban benar! ${result.feedback}`);
        setNextDifficulty(result.nextDifficulty);
      } else {
        setFeedback(`Jawaban belum tepat. ${result.feedback}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal memeriksa jawaban.");
      }
    } finally {
      setChecking(false);
    }
  }

  async function nextQuestion() {
    if (!exercise || !nextDifficulty) return;

    setError("");
    setFeedback("");
    setChecking(true);

    try {
      const exercises = await fetchExercisesApi(nextDifficulty);

      const nextExercise = exercises.find(
        (item) => item.id !== exercise.id && !usedExerciseIds.includes(item.id),
      );

      if (nextExercise) {
        setExercise(nextExercise);
        setUsedExerciseIds((prev) => [...prev, nextExercise.id]);
        setAnswer("");
        setFeedback("");
        setNextDifficulty(null);
      } else {
        setError("Semua soal pada tingkat kesulitan ini sudah dikerjakan.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengambil soal berikutnya.");
      }
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg bg-white shadow text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          ← Kembali ke Dashboard
        </button>

        <Card className="mb-6">
          <h1 className="text-3xl font-bold text-brand-700">Latihan Adaptif</h1>

          <p className="text-gray-600 mt-2">
            Kerjakan latihan matematika dengan tingkat kesulitan yang
            menyesuaikan kemampuan.
          </p>
        </Card>

        {!exercise && (
          <Card>
            <div className="text-center">
              <div className="text-5xl mb-4">📝</div>

              <h2 className="text-xl font-bold text-gray-800">
                Siap untuk latihan?
              </h2>

              <p className="text-gray-600 mt-2 mb-5">
                Klik tombol di bawah untuk mendapatkan soal.
              </p>

              <Button type="button" onClick={startExercise} disabled={loading}>
                {loading ? "Memuat soal..." : "Mulai Latihan"}
              </Button>
            </div>
          </Card>
        )}

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {exercise && (
          <Card>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Soal Latihan</h2>

              <Badge
                variant={
                  exercise.difficulty === "HIGH"
                    ? "warning"
                    : exercise.difficulty === "LOW"
                      ? "success"
                      : "default"
                }
              >
                {exercise.difficulty}
              </Badge>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 mb-5">
              <p className="text-lg font-semibold text-gray-800">
                {exercise.question}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Jawaban"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Masukkan jawaban..."
              />

              <Button
                type="button"
                onClick={checkAnswer}
                disabled={checking || !answer.trim()}
              >
                {checking ? "Memeriksa..." : "Periksa Jawaban"}
              </Button>
            </div>

            {feedback && (
              <div className="mt-5 rounded-lg bg-brand-50 p-4 text-brand-700">
                {feedback}
              </div>
            )}

            {feedback && nextDifficulty && (
              <Button
                type="button"
                onClick={nextQuestion}
                disabled={checking}
                className="mt-4"
              >
                {checking ? "Memuat..." : "Soal Berikutnya →"}
              </Button>
            )}
          </Card>
        )}
      </div>
    </main>
  );
}
