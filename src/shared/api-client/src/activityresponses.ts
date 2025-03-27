import { AxiosInstance } from "axios"

interface ActivityResponseVariable {
  id: string
  value: number
  label: string
}

interface ActivityResponseResponse {
  question: string
  content: number
  score: number
  isCorrect: boolean | null
}

interface CreateActivityResponseRequest {
  activityCode: string
  student: string
}

interface GetActivityResponseResponse {
  id: string
  activity: string
  teacher: string
  student: string
  totalScore: number
  variables: ActivityResponseVariable[]
  responses: ActivityResponseResponse[]
}

export default class ActivityResponses {
  readonly client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  async create({
    activityCode,
    student,
  }: CreateActivityResponseRequest): Promise<GetActivityResponseResponse> {
    const { data } = await this.client.post(
      `/responses/activityCode=${activityCode}`,
      { student: student },
    )
    return data
  }

  async get(activityResponseId: string): Promise<GetActivityResponseResponse> {
    const { data } = await this.client.get(`/responses/${activityResponseId}`)
    return data
  }
}
