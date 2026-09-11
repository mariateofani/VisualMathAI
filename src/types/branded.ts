type Brand<T, B extends string> = T & { readonly __brand: B }

export type StudentId = Brand<string, "StudentId">
export type LecturerId = Brand<string, "LecturerId">
export type AdminId = Brand<string, "AdminId">
export type FormulaId = Brand<string, "FormulaId">
export type ExerciseId = Brand<string, "ExerciseId">
export type TopicId = Brand<string, "TopicId">
export type ProgressId = Brand<string, "ProgressId">

export const createStudentId = (v: string): StudentId => v as StudentId
export const createLecturerId = (v: string): LecturerId => v as LecturerId
export const createAdminId = (v: string): AdminId => v as AdminId
export const createFormulaId = (v: string): FormulaId => v as FormulaId
export const createExerciseId = (v: string): ExerciseId => v as ExerciseId
export const createTopicId = (v: string): TopicId => v as TopicId
export const createProgressId = (v: string): ProgressId => v as ProgressId