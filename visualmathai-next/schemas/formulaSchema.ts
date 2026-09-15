import { z } from "zod";

export const TopicEnum = z.enum(
  ["linear", "quadratic", "trigonometry"],
  {
    message: "Topik tidak valid",
  }
);

export const DifficultyEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const FormulaSchema = z.object({
  formula: z
    .string({ message: "Rumus wajib diisi" })
    .min(3, "Rumus minimal 3 karakter")
    .max(200, "Rumus maksimal 200 karakter")
    .regex(
      /^[a-zA-Z0-9\s+\-*/^().=,]+$/,
      "Format rumus tidak valid (hanya karakter matematika standar)"
    ),
  topic: TopicEnum,
});

export const AnalysisResponseSchema = z.object({
  formulaId: z.string().uuid("Format ID rumus tidak valid"),
  formula: z.string(),
  explanation: z.string().min(10, "Penjelasan terlalu pendek"),
  steps: z.array(z.string()).min(1, "Minimal 1 langkah penyelesaian"),
  graphData: z.array(z.number()).min(2, "Data grafik minimal 2 titik"),
  difficulty: DifficultyEnum,
  createdAt: z.string().datetime("Format tanggal tidak valid"),
});

export type FormulaInput = z.infer<typeof FormulaSchema>;
export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;