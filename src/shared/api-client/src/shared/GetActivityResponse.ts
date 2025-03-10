export default interface GetActivityResponse {
    id: string
    prompt: string
    variables: {
        id: string
        type: string
        min: number
        max: number
        step: number
        label: string
    }[]
    conditions: {
        id: string
        expression: string
        isCorrect: boolean
        feedback: string
    }
    pointValue: number
    owner: string
    type: string
    isArchived: boolean
    isDeleted: boolean
    tags: string[]
}