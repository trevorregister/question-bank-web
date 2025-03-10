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
    variables: Variable[] | []
    conditions: Condition[] | []
    pointValue: number
    owner: string
    isArchived: boolean
    isDeleted: boolean
    type: string
}

export interface PendingQuestion extends Omit<Question, 'id' | 'parent'>{
    tempId: string
}