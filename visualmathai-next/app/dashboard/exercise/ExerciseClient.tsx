"use client";

import { useState } from "react";
import {
  fetchExercisesApi,
  submitAnswerApi,
} from "@/services/api";
import type { Exercise } from "@/schemas/exerciseSchema";
import { useExercisesQuery } from "../../hooks/useExercisesQuery";

type Difficulty =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export default function ExerciseClient() {
  const exercisesQuery =
    useExercisesQuery();

  const [exercise, setExercise] =
    useState<Exercise | null>(null);

  const [usedExerciseIds, setUsedExerciseIds] =
    useState<string[]>([]);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [error, setError] =
    useState("");

  const [checking, setChecking] =
    useState(false);

  const [nextDifficulty, setNextDifficulty] =
    useState<Difficulty | null>(null);

  function startExercise() {
    setError("");
    setFeedback("");
    setAnswer("");
    setNextDifficulty(null);

    const exercises =
      exercisesQuery.data ?? [];

    if (exercises.length === 0) {
      setError(
        "Belum ada latihan yang tersedia.",
      );
      return;
    }

    const firstExercise =
      exercises[0];

    if (!firstExercise) {
      setError(
        "Soal latihan tidak tersedia.",
      );
      return;
    }

    setExercise(firstExercise);

    setUsedExerciseIds([
      firstExercise.id,
    ]);
  }

  async function handleSubmit() {
    if (!exercise) {
      setError(
        "Belum ada soal yang dipilih.",
      );
      return;
    }

    if (!answer.trim()) {
      setError(
        "Silakan pilih jawaban terlebih dahulu.",
      );
      return;
    }

    setError("");
    setFeedback("");
    setChecking(true);

    try {
      const result =
        await submitAnswerApi(
          exercise.id,
          answer,
        );

      setFeedback(result.feedback);
      setNextDifficulty(
        result.nextDifficulty,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memeriksa jawaban.",
      );
    } finally {
      setChecking(false);
    }
  }

  async function nextQuestion() {
    if (
      !exercise ||
      !nextDifficulty
    ) {
      return;
    }

    setError("");
    setFeedback("");
    setChecking(true);

    try {
      const exercises =
        await fetchExercisesApi(
          nextDifficulty,
        );

      const nextExercise =
        exercises.find(
          (item) =>
            item.id !== exercise.id &&
            !usedExerciseIds.includes(
              item.id,
            ),
        );

      if (!nextExercise) {
        setError(
          "Semua soal pada tingkat kesulitan ini sudah dikerjakan.",
        );
        return;
      }

      setExercise(nextExercise);

      setUsedExerciseIds(
        (previous) => [
          ...previous,
          nextExercise.id,
        ],
      );

      setAnswer("");
      setFeedback("");
      setNextDifficulty(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil soal berikutnya.",
      );
    } finally {
      setChecking(false);
    }
  }

  if (exercisesQuery.isLoading) {
    return (
      <div
        role="status"
        className="rounded-2xl bg-white p-8 shadow"
      >
        Memuat latihan...
      </div>
    );
  }

  if (exercisesQuery.isError) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"
      >
        {exercisesQuery.error instanceof Error
          ? exercisesQuery.error.message
          : "Gagal mengambil data latihan."}
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <h2 className="text-2xl font-bold text-slate-900">
          Siap Berlatih?
        </h2>

        <p className="mt-3 text-slate-600">
          Mulai latihan untuk mendapatkan soal
          matematika adaptif.
        </p>

        <button
          type="button"
          onClick={startExercise}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Mulai Latihan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <article className="rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {exercise.difficulty}
          </span>

          <span className="text-sm text-slate-500">
            {exercise.topic}
          </span>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-slate-900">
          {exercise.question}
        </h2>

        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">
            Pilihan jawaban
          </legend>

          {exercise.options.map(
            (option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={
                    answer === option
                  }
                  onChange={() =>
                    setAnswer(option)
                  }
                />

                <span>{option}</span>
              </label>
            ),
          )}
        </fieldset>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={checking}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {checking
            ? "Memeriksa..."
            : "Periksa Jawaban"}
        </button>
      </article>

      {feedback && (
        <article className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Hasil
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            {feedback}
          </p>

          {nextDifficulty && (
            <button
              type="button"
              onClick={nextQuestion}
              disabled={checking}
              className="mt-5 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              Soal Berikutnya
              {" — "}
              {nextDifficulty}
            </button>
          )}
        </article>
      )}
    </div>
  );
}