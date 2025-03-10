export default interface CreateConditionRequest{
    questionId: string
    expression: string
    isCorrect: boolean
    feedback: string
}