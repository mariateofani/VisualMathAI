export type FormulaAnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success"
      data: {
        formulaId: string
        formula: string
        explanation: string
        steps: string[]
        graphData: number[]
        difficulty: "LOW" | "MEDIUM" | "HIGH"
        timestamp: number
      }
    }
  | { status: "error"; message: string; errorCode: string }

export type ExerciseState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success"
      exercise: {
        id: string
        question: string
        difficulty: "LOW" | "MEDIUM" | "HIGH"
        options: string[]
        topic: "linear" | "quadratic" | "trigonometry"
      }
      userAnswer: string | null
      isCorrect: boolean | null
      feedback: string | null
    }
  | { status: "error"; message: string }

export type AuthState =
  | { status: "unauthenticated" }
  | { status: "authenticating" }
  | {
      status: "authenticated"
      user: {
        id: string
        name: string
        email: string
        role: "MAHASISWA" | "DOSEN" | "ADMIN"
      }
      token: string
    }

export type ProgressState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ProgressItem[] }
  | { status: "error"; message: string }

export interface ProgressItem {
  topicId: string
  topicName: string
  mastery: number
  totalExercises: number
  correctAnswers: number
  lastUpdated: string
}