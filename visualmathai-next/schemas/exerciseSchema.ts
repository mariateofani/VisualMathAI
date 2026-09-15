import { z } from "zod";
import { DifficultyEnum, TopicEnum } from "./formulaSchema";

export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  question: z.string().min(5, "Soal minimal 5 karakter"),
  difficulty: DifficultyEnum,
  options: z.array(z.string()).min(2, "Minimal 2 pilihan jawaban"),
  correctAnswer: z.string(),
  topic: TopicEnum,
  explanation: z.string().optional(),
});

export const AnswerResultSchema = z.object({
  isCorrect: z.boolean(),
  correctAnswer: z.string(),
  nextDifficulty: DifficultyEnum,
  feedback: z.string(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;
export type AnswerResult = z.infer<typeof AnswerResultSchema>;
