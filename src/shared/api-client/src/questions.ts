import { AxiosInstance } from "axios"
import GetQuestionResponse from "./shared/GetQuestionResponse"
/* import GetActivityResponse from "./shared/GetActivityResponse"
import CreateVariableRequest from "./shared/CreateVariableRequest"
import CreateConditionRequest from "./shared/CreateConditionRequest" */

interface Variable {
    id: string
    label: string
    min: number
    max: number
    step: number
    type: string
}

interface Condition {
    id: string
    expression: string
    feedback: string
    isCorrect: boolean
}
interface CreateQuestionRequest {
    prompt: string
    pointValue: number
    type: string,
    variables: Variable[]
    conditions: Condition[]
}

interface CreateQuestionResponse {
    id: string
    prompt: string
    variables: Variable[]
    conditions: Condition[]
    pointValue: number
    owner: string
    isArchived: false
    isDeleted: false
}

/* interface DeleteVariableRequest {
    questionId: string
    variableId: string
}

interface DeleteConditionRequest {
    questionId: string
    conditionId: string
} */

interface UpdateQuestionRequest {
    questionId: string
    payload: {
        prompt?: string
        pointValue?: number
        isArchived?: boolean
        isDeleted?: boolean
        variables?: Variable[]
        conditions?: Condition[]
    }
}

export default class Questions {
    private client: AxiosInstance
    constructor(client: AxiosInstance){
        this.client = client
    }

    async delete(questionId: string): Promise<void>{
        return await this.client.delete(`/questions/${questionId}`)
    }
    async create({prompt, pointValue, type, variables = [], conditions = []}: CreateQuestionRequest): Promise<CreateQuestionResponse>{
        const payload = {prompt: prompt, pointValue: pointValue, type: type, variables: variables, conditions: conditions}
        const { data } = await this.client.post('/questions', payload)
        return await data
    }
    async getQuestionsByOwner(ownerId: string): Promise<GetQuestionResponse[]>{
        const { data } = await this.client.get(`/questions/owner/${ownerId}`)
        return data
    }

    async updateQuestion({questionId, payload}: UpdateQuestionRequest): Promise<GetQuestionResponse>{
        const { data } = await this.client.patch(`/questions/${questionId}`, {payload: payload})
        return data
    }
    /*  DEPRECATED
    async createVariable({questionId, type, min, max, step, label}: CreateVariableRequest): Promise<GetActivityResponse>{
        const payload = {type: type, min: min, max: max, step: step, label: label}
        const { data } = await this.client.post(`/questions/${questionId}/variable`, payload)
        return data
    }

    async createCondition({questionId, expression, isCorrect, feedback}: CreateConditionRequest): Promise<GetActivityResponse>{
        const payload = {expression: expression, isCorrect: isCorrect, feedback: feedback}
        const { data } = await this.client.post(`/questions/${questionId}/condition`, payload)
        return data
    }

    async deleteVariable({questionId, variableId}: DeleteVariableRequest): Promise<GetActivityResponse>{
        const { data } = await this.client.delete(`/questions/${questionId}/variable/${variableId}`)
        return data
    }

    async deleteCondition({questionId, conditionId}: DeleteConditionRequest): Promise<GetActivityResponse>{
        const { data } = await this.client.delete(`/questions/${questionId}/variable/${conditionId}`)
        return data
    } */
}