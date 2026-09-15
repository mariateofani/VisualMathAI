"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchExercises,
  createExercise,
} from "../services/exerciseApi";

import {
  CreateExerciseInput,
} from "@/types/task";

export const EXERCISE_QUERY_KEY = ["exercises"];

export function useExercisesQuery() {
  return useQuery({
    queryKey: EXERCISE_QUERY_KEY,
    queryFn: fetchExercises,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
}

export function useCreateExerciseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateExerciseInput) =>
      createExercise(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EXERCISE_QUERY_KEY,
      });
    },
  });
}