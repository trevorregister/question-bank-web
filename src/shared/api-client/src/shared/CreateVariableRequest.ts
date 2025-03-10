export default interface CreateVariableRequest {
    questionId: string
    type: string
    min: number
    max: number
    step: number
    label: string
}