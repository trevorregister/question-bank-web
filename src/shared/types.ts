export interface Variable {
  id: string
  label: string
  type: string
  min: number
  max: number
  step: number
}
export interface Condition {
  id: string
  expression: string
  isCorrect: boolean
  feedback: string
}
export interface Question {
  id: string
  parent?: string
  prompt: string
  variables: Variable[]
  conditions: Condition[]
  pointValue: number
  owner: string
  isArchived: boolean
  isDeleted: boolean
  type: string
}

export interface Bank {
  id: string
  name: string
  description: string
  isArchived: boolean
  isDeleted: boolean
  questions: string[]
}

export interface BankWithQuestions {
  id: string
  name: string
  description: string
  isArchived: boolean
  isDeleted: boolean
  questions: Question[]
}

export interface ActivityQuestion extends Question {
  parent: string
}
export interface ActivitySection {
  id: string
  name: string
  summary: string
  sectionIndex: number
  questions: ActivityQuestion[]
}
export interface Activity {
  id: string
  name: string
  owner: string
  sections: ActivitySection[]
  isArchived: boolean
  tags: string[]
  questionCount: number
}

export interface PendingQuestion extends Omit<Question, "id" | "parent"> {
  tempId: string
}
