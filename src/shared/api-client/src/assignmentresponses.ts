import {  AxiosInstance } from "axios"

interface AssignmentResponseVariable {
    id: string
    value: number
    label: string
}

interface AssignmentResponseResponse {
    question: string
    content: string
    score: number
    isCorrect: boolean | null
}

interface GetResponseForStudentResponse {
    id: string
    assignment: string
    owner: string
    variables: AssignmentResponseVariable[]
    responses: AssignmentResponseResponse[]

}

interface SubmitResponsesRequest {
    responseId: string
    responses: {
        question: string
        content: string
    }[]
}

export default class AssignmentResponses {
    readonly client: AxiosInstance

    constructor(client: AxiosInstance){
        this.client = client
    }

    async getForStudent(responseId: string): Promise<GetResponseForStudentResponse>{
        const { data } = await this.client.get(`/responses/${responseId}`)
        return data

    }

    async submitResponsesToQuestions({responseId, responses}: SubmitResponsesRequest): Promise<GetResponseForStudentResponse>{
        const { data } = await this.client.patch(`/responses/${responseId}/submit-responses`, {responses: responses})
        return data
    }
}