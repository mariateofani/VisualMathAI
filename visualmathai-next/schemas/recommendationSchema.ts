import { z } from "zod";

export const RecommendationSchema = z.object({
  id: z.string().uuid(),
  topic: z.enum(["linear", "quadratic", "trigonometry"]),
  title: z.string().min(3),
  reason: z.string().min(10),
  mastery: z.number().min(0).max(100),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const RecommendationListSchema = z.array(
  RecommendationSchema,
);

export type Recommendation = z.infer<
  typeof RecommendationSchema
>;