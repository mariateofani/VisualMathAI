import { useState } from "react";
import type { AnswerResult, Exercise } from "@/schemas/exerciseSchema";
import { fetchExercisesApi, submitAnswerApi } from "@/services/api";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const loadExercises = async (difficulty?: "LOW" | "MEDIUM" | "HIGH") => {
    const data = await fetchExercisesApi(difficulty);
    setExercises(data);
  };

  const submitAnswer = async (exerciseId: string, answer: string): Promise<AnswerResult> => {
    return await submitAnswerApi(exerciseId, answer);
  };

  return {
    exercises,
    loadExercises,
    submitAnswer,
  };
}
