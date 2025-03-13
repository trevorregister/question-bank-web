import { AxiosInstance } from "axios"
import GetQuestionResponse from "./shared/GetQuestionResponse"

interface GetBankResponse {
  id: string
  owner: string
  name: string
  description: string
  isDeleted: boolean
  isArchived: boolean
  questions: string[]
}

interface GetBankWithQuestionsResponse {
  id: string
  owner: string
  name: string
  description: string
  isDeleted: boolean
  isArchived: boolean
  questions: GetQuestionResponse[]
}

interface CreateBankRequest {
  name: string
  description: string
}

interface AddRemoveQuestionsToBankRequest {
  bankId: string
  questionIdArray: string[]
}

export default class Banks {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  async create({
    name,
    description,
  }: CreateBankRequest): Promise<GetBankResponse> {
    const { data } = await this.client.post("/banks", {
      name: name,
      description: description,
    })
    return data
  }

  async getBank(bankId: string): Promise<GetBankWithQuestionsResponse> {
    const { data } = await this.client.get(`/banks/${bankId}`)
    return data
  }

  async getMyBanks(ownerId: string): Promise<GetBankResponse[]> {
    const { data } = await this.client.get(`/banks/owner/${ownerId}`)
    return data
  }

  async getQuestions(bankId: string): Promise<GetQuestionResponse[]> {
    const { data } = await this.client.get(`/banks/${bankId}/questions`)
    return data
  }

  async addQuestions({
    bankId,
    questionIdArray,
  }: AddRemoveQuestionsToBankRequest): Promise<GetBankResponse> {
    const { data } = await this.client.patch(`/banks/${bankId}/questions/add`, {
      questionIdArray: questionIdArray,
    })
    return data
  }

  async removeQuestions({
    bankId,
    questionIdArray,
  }: AddRemoveQuestionsToBankRequest): Promise<GetBankResponse> {
    const { data } = await this.client.patch(`/banks/${bankId}/questions/add`, {
      questionIdArray: questionIdArray,
    })
    return data
  }

  async deleteBank(bankId: string): Promise<GetBankResponse> {
    const { data } = await this.client.delete(`/banks/${bankId}`)
    return data
  }
}
