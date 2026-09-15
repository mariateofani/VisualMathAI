import {
  Exercise,
  ExerciseSchema,
} from "@/types/task";

const EXERCISE_API_URL = "/api/exercises";

export async function fetchExercises(): Promise<Exercise[]> {
  const response = await fetch(EXERCISE_API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data latihan.");
  }

  const rawData: unknown = await response.json();

  return ExerciseSchema.array().parse(rawData);
}

export async function createExercise(
  input: Omit<Exercise, "id">
): Promise<Exercise> {
  const response = await fetch(EXERCISE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Gagal menambahkan latihan.");
  }

  const rawData: unknown = await response.json();

  return ExerciseSchema.parse(rawData);
}