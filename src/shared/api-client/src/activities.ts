import { AxiosInstance } from "axios"
import CreateConditionRequest from "./shared/CreateConditionRequest"
import CreateVariableRequest from "./shared/CreateVariableRequest"
import GetActivityResponse from "./shared/GetActivityResponse"

interface CreateActivityRequest {
  name: string
  sections: {
    name: string
    questions: {
      parent: string
      type: string
      prompt: string
      pointValue: number
      variables: CreateVariableRequest[]
      conditions: CreateConditionRequest[]
    }
    summary: string
    sectionIndex: number
  }[]
  tags?: string[]
}

interface UpdateActivityRequest {
  activityId: string
  name?: string
  sections?: {
    id: string
    name?: string
    summary?: string
    questions?: {
      parent?: string
      type: string
      prompt?: string
      pointValue?: number
      variables?: CreateVariableRequest[]
      conditions?: CreateConditionRequest[]
    }
  }[]
  tags?: string[]
}

export default class Activities {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  async create({
    name,
    sections,
  }: CreateActivityRequest): Promise<GetActivityResponse> {
    const { data } = await this.client.post("/activities", {
      name: name,
      sections: sections,
    })
    return data
  }

  async get(id: string): Promise<GetActivityResponse> {
    const { data } = await this.client.get(`/activities/${id}`)
    return data
  }

  async archive(id: string): Promise<GetActivityResponse> {
    const { data } = await this.client.patch(`/activities/${id}/archive`)
    return data
  }

  async unarchive(id: string): Promise<GetActivityResponse> {
    const { data } = await this.client.patch(`/activities/${id}/unarchive`)
    return data
  }

  async updateActivity({
    activityId,
    name,
    sections,
    tags,
  }: UpdateActivityRequest): Promise<GetActivityResponse> {
    const payload = { name: name, sections: sections, tags: tags }
    const { data } = await this.client.patch(
      `/activities/${activityId}`,
      payload,
    )
    return data
  }
}
