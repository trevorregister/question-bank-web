import { AxiosInstance } from "axios"
import GetQuestionResponse from "./shared/GetQuestionResponse"

interface GetBankResponse {
    id: string
    owner: string
    name: string
    isDeleted: boolean
    isArchived: boolean
    questions: string[]
}

interface AddRemoveQuestionsToBankRequest {
    bankId: string
    questionIdArray: string[]
}

export default class Banks {
    private client: AxiosInstance

    constructor(client: AxiosInstance){
        this.client = client
    }

    async create(name: string): Promise<GetBankResponse>{
        const { data } = await this.client.post('/banks', {name: name})
        return data
    }

    async getMyBanks(ownerId: string): Promise<GetBankResponse[]>{
        const { data } = await this.client.get(`/banks/owner/${ownerId}`)
        return data
    }

    async getQuestions(bankId: string): Promise<GetQuestionResponse[]>{
        const { data } = await this.client.get(`/banks/${bankId}/questions`)
        return data
    }

    async addQuestions({bankId, questionIdArray}: AddRemoveQuestionsToBankRequest): Promise<GetBankResponse>{
        const { data } = await this.client.patch(`/banks/${bankId}/questions/add`, {questionIdArray: questionIdArray})
        return data
    }

    async removeQuestions({bankId, questionIdArray}: AddRemoveQuestionsToBankRequest): Promise<GetBankResponse>{
        const { data } = await this.client.patch(`/banks/${bankId}/questions/add`, {questionIdArray: questionIdArray})
        return data
    }

    async deleteBank(bankId: string): Promise<GetBankResponse>{
        const { data } = await this.client.delete(`/banks/${bankId}`)
        return data
    }
}