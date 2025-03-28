import { ObjectId } from "bson"

export type UserRole = "teacher" | "admin" | "student"
export type VariableType = "random" | "matrix"
export type QuestionType = "numerical" | "multiple-choice"

export interface DbActivity {
  _id: ObjectId
  name: string
  owner: ObjectId
  sections: DbActivitySection[]
  isArchived: boolean
  tags: string[]
  questionCount: number
  code: string
}
export interface DbActivityQuestion {
  parent: ObjectId
  id: string
  prompt: string
  variables: DbVariable[]
  conditions: DbCondition[]
  pointValue: number
  type: QuestionType
}
export interface DbActivitySection {
  id: string
  name: string
  questions: DbActivityQuestion[]
  summary: string
  sectionIndex: number
}

export interface DbActivityResponse {
  _id: ObjectId
  activity: ObjectId
  activityCode: string
  teacher: ObjectId
  student: string
  variables: DbActivityResponseVariable[]
  responses: DbActivityResponseResponse[]
  totalScore: number
}

export interface DbActivityResponseVariable {
  id: string
  value: number
  label: string
}

export interface DbActivityResponseResponse {
  question: ObjectId
  content: number
  score: number
  isCorrect: boolean | null
}
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
