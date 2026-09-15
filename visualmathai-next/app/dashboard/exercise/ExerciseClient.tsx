"use client";

import { useState } from "react";
import { fetchExercisesApi, submitAnswerApi } from "@/services/api";
import type { Exercise } from "@/schemas/exerciseSchema";
import { useExercisesQuery } from "../../hooks/useExercisesQuery";

export default function ExerciseClient() {
  const exercisesQuery = useExercisesQuery();
  const { data: exercises } = useExercisesQuery();
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

  function startExercise() {
    setError("");
    setFeedback("");
    setAnswer("");
    setNextDifficulty(null);

    if (exercisesQuery.isLoading) {
      return;
    }

    if (exercisesQuery.isError) {
      setError(
        exercisesQuery.error instanceof Error
          ? exercisesQuery.error.message
          : "Gagal mengambil soal.",
      );
      return;
    }

    async function handleSubmit() {
      if (!exercise || !answer.trim()) {
        setError("Silakan pilih jawaban terlebih dahulu.");
        return;
      }

      setError("");
      setFeedback("");
      setChecking(true);

      try {
        const result = await submitAnswerApi(exercise.id, answer);

        setFeedback(result.feedback);
        setNextDifficulty(result.nextDifficulty);
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

    const exercises = exercisesQuery.data ?? [];

    if (exercises.length === 0) {
      setError("Belum ada latihan yang tersedia.");
      return;
    }

    setExercise(exercises[0]);
    setUsedExerciseIds([exercises[0].id]);
  }

  async function handleSubmit() {
    if (!exercise || !answer.trim()) {
      setError("Silakan pilih jawaban terlebih dahulu.");
      return;
    }

    setError("");
    setFeedback("");
    setChecking(true);

    try {
      const result = await submitAnswerApi(exercise.id, answer);

      setFeedback(result.feedback);
      setNextDifficulty(result.nextDifficulty);
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
    <div className="space-y-6">
      {exercisesQuery.isLoading && (
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="h-8 w-3/4 rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded bg-slate-200" />
          </div>
        </div>
      )}
      {!exercise && (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-2xl font-bold text-slate-900">Siap Berlatih?</h2>

          <p className="mt-3 text-slate-600">
            Mulai latihan untuk mendapatkan soal matematika adaptif.
          </p>

          <button
            type="button"
            onClick={startExercise}
            disabled={loading}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memuat Soal..." : "Mulai Latihan"}
          </button>
        </div>
      )}

      {exercisesQuery.isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {exercisesQuery.error instanceof Error
            ? exercisesQuery.error.message
            : "Gagal mengambil data latihan."}
        </div>
      )}

            {exercisesQuery.isSuccess &&
        exercisesQuery.data.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <h2 className="text-xl font-bold text-slate-900">
              Belum Ada Latihan
            </h2>

            <p className="mt-2 text-slate-600">
              Saat ini belum tersedia soal matematika untuk dikerjakan.
            </p>
          </div>
        )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {exercise && (
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {exercise.difficulty}
            </span>

            <span className="text-sm text-slate-500">{exercise.topic}</span>
          </div>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            {exercise.question}
          </h2>

          <div className="mt-6 space-y-3">
            {exercise.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answer === option}
                  onChange={(event) => setAnswer(event.target.value)}
                />

                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={checking}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checking ? "Memeriksa..." : "Periksa Jawaban"}
          </button>
        </div>
      )}

      {feedback && exercise && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Feedback</h2>

          <p className="mt-3 text-slate-700">{feedback}</p>

          <button
            type="button"
            onClick={nextQuestion}
            disabled={checking || !nextDifficulty}
            className="mt-5 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checking ? "Memuat..." : "Soal Berikutnya"}
          </button>
        </div>
      )}
    </div>
  );
}
