import { NextResponse } from "next/server";
import {
  ExerciseSchema,
  CreateExerciseSchema,
} from "@/types/task";

const exercises = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    question: "Berapa gradien dari y = 3x + 5?",
    difficulty: "LOW",
    options: ["3", "5", "-3", "1/3"],
    correctAnswer: "3",
    topic: "linear",
    explanation: "Gradien adalah koefisien dari x, yaitu 3.",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    question: "Tentukan titik puncak dari y = x² - 4x + 3",
    difficulty: "MEDIUM",
    options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(4, 3)"],
    correctAnswer: "(2, -1)",
    topic: "quadratic",
    explanation:
      "x = -b/2a = 4/2 = 2, lalu substitusi ke fungsi.",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    question: "Berapa nilai sin(30°)?",
    difficulty: "LOW",
    options: ["1/2", "√2/2", "√3/2", "1"],
    correctAnswer: "1/2",
    topic: "trigonometry",
    explanation: "Nilai sin(30°) = 0.5 = 1/2.",
  },
];

export async function GET() {
  return NextResponse.json(
    exercises.map((exercise) => ExerciseSchema.parse(exercise))
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  const validation = CreateExerciseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Data latihan tidak valid.",
      },
      { status: 400 }
    );
  }

  const newExercise = {
    id: crypto.randomUUID(),
    ...validation.data,
  };

  return NextResponse.json(
    ExerciseSchema.parse(newExercise),
    { status: 201 }
  );
}