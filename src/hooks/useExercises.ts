import { useState } from "react";

import {
  fetchExercisesApi,
  submitAnswerApi,
} from "@/services/api";

import type {
  Exercise,
  AnswerResult,
} from "@/schemas/exerciseSchema";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const loadExercises = async (
    difficulty?: "LOW" | "MEDIUM" | "HIGH"
  ) => {
    const data = await fetchExercisesApi(difficulty);
    setExercises(data);
  };

  const submitAnswer = async (
    exerciseId: string,
    answer: string
  ): Promise<AnswerResult> => {
    return await submitAnswerApi(exerciseId, answer);
  };

  return {
    exercises,
    loadExercises,
    submitAnswer,
  };
}