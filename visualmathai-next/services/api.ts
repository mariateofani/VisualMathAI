import {
  ExerciseSchema,
  AnswerResultSchema,
  type Exercise,
  type AnswerResult,
} from "@/schemas/exerciseSchema";

import {
  ProgressListSchema,
  type Progress,
} from "@/schemas/progressSchema";

import {
  LoginSchema,
  type LoginInput,
} from "@/schemas/authSchema";

import {
  AnalysisResponseSchema,
  type FormulaInput,
  type AnalysisResponse,
} from "@/schemas/formulaSchema";

/* ============================================================
 * SIMULASI DATABASE KLIEN
 * ============================================================ */

const exerciseDatabase: Exercise[] = [
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
    explanation: "x = -b/2a = 4/2 = 2, lalu substitusi ke fungsi.",
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
  {
    id: "44444444-4444-4444-8444-444444444444",
    question: "Tentukan amplitudo dari y = 3 sin(2x)",
    difficulty: "HIGH",
    options: ["3", "2", "6", "1"],
    correctAnswer: "3",
    topic: "trigonometry",
    explanation: "Amplitudo adalah koefisien di depan sin, yaitu 3.",
  },

  {
  id: "55555555-5555-4555-8555-555555555555",
  question: "Tentukan akar-akar dari x² - 5x + 6 = 0",
  difficulty: "HIGH",
  options: ["2 dan 3", "1 dan 6", "-2 dan -3", "3 dan 4"],
  correctAnswer: "2 dan 3",
  topic: "quadratic",
  explanation: "x² - 5x + 6 = (x - 2)(x - 3), sehingga akar-akarnya adalah 2 dan 3.",
},
{
  id: "66666666-6666-4666-8666-666666666666",
  question: "Jika f(x) = 2x² - 8x + 5, tentukan nilai minimum fungsi.",
  difficulty: "HIGH",
  options: ["-3", "3", "-5", "5"],
  correctAnswer: "-3",
  topic: "quadratic",
  explanation: "Titik minimum berada pada x = 2. Substitusi x = 2 menghasilkan f(2) = -3.",
},
];

export async function analyzeFormulaApi(
  input: FormulaInput
): Promise<AnalysisResponse> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (input.formula.toLowerCase().includes("error")) {
    throw new Error("Layanan AI sedang tidak tersedia. Coba lagi nanti.");
  }

  const difficulty: "LOW" | "MEDIUM" | "HIGH" =
    input.topic === "trigonometry"
      ? "HIGH"
      : input.topic === "quadratic"
      ? "MEDIUM"
      : "LOW";

  const rawResponse = {
    formulaId: crypto.randomUUID(),
    formula: input.formula,

    explanation: `Rumus "${input.formula}" merupakan fungsi ${input.topic}. AI menganalisis bahwa fungsi ini memiliki karakteristik unik berdasarkan koefisien dan variabelnya.`,

    steps: [
      "Identifikasi variabel dan koefisien pada rumus",
      `Tentukan jenis fungsi (${input.topic})`,
      "Plot titik-titik kunci pada bidang kartesius",
      "Analisis perilaku fungsi (naik/turun, titik puncak/amplitudo)",
    ],

    graphData: [0, 1, 4, 9, 16, 25, 36],

    difficulty,

    createdAt: new Date().toISOString(),
  };

  return AnalysisResponseSchema.parse(rawResponse);
}

export async function fetchExercisesApi(
  difficulty?: "LOW" | "MEDIUM" | "HIGH"
): Promise<Exercise[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const filtered = difficulty
    ? exerciseDatabase.filter((e) => e.difficulty === difficulty)
    : exerciseDatabase;

  return filtered.map((item) => ExerciseSchema.parse(item));
}

export async function submitAnswerApi(
  exerciseId: string,
  answer: string
): Promise<AnswerResult> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const exercise = exerciseDatabase.find((e) => e.id === exerciseId);

  if (!exercise) {
    throw new Error("Soal tidak ditemukan.");
  }

  const isCorrect = exercise.correctAnswer === answer;

  let nextDifficulty: "LOW" | "MEDIUM" | "HIGH" = exercise.difficulty;

  if (isCorrect && exercise.difficulty === "LOW") {
    nextDifficulty = "MEDIUM";
  } else if (isCorrect && exercise.difficulty === "MEDIUM") {
    nextDifficulty = "HIGH";
  } else if (!isCorrect && exercise.difficulty === "HIGH") {
    nextDifficulty = "MEDIUM";
  } else if (!isCorrect && exercise.difficulty === "MEDIUM") {
    nextDifficulty = "LOW";
  }

  const feedback = isCorrect
    ? `Benar! ${exercise.explanation ?? ""}`
    : `Salah. Jawaban yang benar: ${exercise.correctAnswer}. ${
        exercise.explanation ?? ""
      }`;

  return AnswerResultSchema.parse({
    isCorrect,
    correctAnswer: exercise.correctAnswer,
    nextDifficulty,
    feedback,
  });
}

export async function fetchProgressApi(): Promise<Progress[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return ProgressListSchema.parse([
    {
      topicId: "topik-linear",
      topicName: "Fungsi Linear",
      mastery: 85,
      totalExercises: 20,
      correctAnswers: 17,
      lastUpdated: new Date().toISOString(),
    },
    {
      topicId: "topik-kuadrat",
      topicName: "Fungsi Kuadrat",
      mastery: 62,
      totalExercises: 18,
      correctAnswers: 11,
      lastUpdated: new Date().toISOString(),
    },
    {
      topicId: "topik-trigonometri",
      topicName: "Trigonometri",
      mastery: 45,
      totalExercises: 15,
      correctAnswers: 7,
      lastUpdated: new Date().toISOString(),
    },
  ]);
}

export async function loginApi(
  input: LoginInput
): Promise<{
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: LoginInput["role"];
  };
}> {
  const validated = LoginSchema.parse(input);

  await new Promise((resolve) => setTimeout(resolve, 700));

  if (validated.password.length < 8) {
    throw new Error("Password minimal 8 karakter.");
  }

  const emailPrefix = validated.email.split("@")[0] ?? "pengguna";

  const displayName =
    emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

  return {
    token: crypto.randomUUID(),

    user: {
      id: crypto.randomUUID(),
      name: displayName,
      email: validated.email,
      role: validated.role,
    },
  };
}