import {
  RecommendationListSchema,
  type Recommendation,
} from "@/schemas/recommendationSchema";

export async function fetchRecommendations(): Promise<
  Recommendation[]
> {
  const response = await fetch("/api/recommendations");

  if (!response.ok) {
    throw new Error("Gagal mengambil rekomendasi.");
  }

  const rawData: unknown = await response.json();

  return RecommendationListSchema.parse(rawData);
}