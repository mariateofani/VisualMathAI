import { NextResponse } from "next/server";
import {
  RecommendationListSchema,
} from "@/schemas/recommendationSchema";

const recommendations = [
  {
    id: "77777777-7777-4777-8777-777777777777",
    topic: "trigonometry",
    title: "Ulangi Konsep Dasar Trigonometri",
    reason:
      "Penguasaan topik trigonometri masih berada di bawah topik lainnya.",
    mastery: 58,
    priority: "HIGH",
  },
  {
    id: "88888888-8888-4888-8888-888888888888",
    topic: "quadratic",
    title: "Latihan Fungsi Kuadrat",
    reason:
      "Tambahkan latihan fungsi kuadrat untuk meningkatkan penguasaan konsep.",
    mastery: 72,
    priority: "MEDIUM",
  },
  {
    id: "99999999-9999-4999-8999-999999999999",
    topic: "linear",
    title: "Review Fungsi Linear",
    reason:
      "Review singkat dapat mempertahankan tingkat penguasaan materi.",
    mastery: 86,
    priority: "LOW",
  },
];

export async function GET() {
  const validated =
    RecommendationListSchema.parse(recommendations);

  return NextResponse.json(validated);
}