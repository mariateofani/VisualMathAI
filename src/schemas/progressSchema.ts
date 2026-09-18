import { z } from "zod";

export const ProgressSchema = z.object({
  topicId: z.string(),
  topicName: z.string(),
  mastery: z.number().min(0).max(100),
  totalExercises: z.number().int().nonnegative(),
  correctAnswers: z.number().int().nonnegative(),
  lastUpdated: z.string(),
});

export const ProgressListSchema = z.array(ProgressSchema);

export type Progress = z.infer<typeof ProgressSchema>;
