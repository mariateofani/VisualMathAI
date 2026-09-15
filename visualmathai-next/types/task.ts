import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  question: z.string().min(5),
  difficulty: z.enum(["LOW", "MEDIUM", "HIGH"]),
  options: z.array(z.string()).min(2),
  correctAnswer: z.string(),
  topic: z.enum(["linear", "quadratic", "trigonometry"]),
  explanation: z.string().min(5),
});

export const CreateExerciseSchema = ExerciseSchema.omit({
  id: true,
});

export type Exercise = z.infer<typeof ExerciseSchema>;
export type CreateExerciseInput = z.infer<
  typeof CreateExerciseSchema
>;