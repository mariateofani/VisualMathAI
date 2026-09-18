import { NextResponse } from "next/server";
import {
  ProgressListSchema,
} from "@/schemas/progressSchema";

const progressData = [
  {
    topicId: "linear",
    topicName: "Fungsi Linear",
    mastery: 86,
    totalExercises: 12,
    correctAnswers: 10,
    lastUpdated: new Date().toISOString(),
  },
  {
    topicId: "quadratic",
    topicName: "Fungsi Kuadrat",
    mastery: 72,
    totalExercises: 10,
    correctAnswers: 7,
    lastUpdated: new Date().toISOString(),
  },
  {
    topicId: "trigonometry",
    topicName: "Trigonometri",
    mastery: 58,
    totalExercises: 8,
    correctAnswers: 5,
    lastUpdated: new Date().toISOString(),
  },
];

export async function GET() {
  const validated = ProgressListSchema.parse(progressData);

  return NextResponse.json(validated);
}