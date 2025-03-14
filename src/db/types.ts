import { ObjectId } from "bson"

export type UserRole = "teacher" | "admin" | "student"
export type VariableType = "random" | "matrix"
export type QuestionType = "numerical" | "multiple-choice"

export interface DbUser {
  _id: ObjectId
  email: string
  firstName: string
  lastName: string
  hash: string
  role: UserRole
}
export interface DbVariable {
  id: string
  label: string
  min: number
  max: number
  step: number
  type: VariableType
}
export interface DbCondition {
  id: string
  expression: string
  isCorrect: boolean
  feedback: string
}
export interface DbQuestion {
  _id: ObjectId
  owner: ObjectId
  prompt: string
  variables: DbVariable[]
  conditions: DbCondition[]
  pointValue: number
  type: QuestionType
  isArchived: boolean
  isDeleted: boolean
}
export interface DbBank {
  _id: ObjectId
  owner: ObjectId
  name: string
  description: string
  questions: ObjectId[]
  isArchived: boolean
  isDeleted: boolean
}
