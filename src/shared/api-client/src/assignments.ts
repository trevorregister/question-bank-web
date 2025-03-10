import { AxiosInstance } from 'axios'

interface CreateAssignmentRequest {
    activity: string
    klass: string
    startDate: Date
    dueDate: Date
}

interface GetAssignmentResponse {
    id: string
    activity: string
    klass: string
    startDate: string
    dueDate: string
    owner: string
}

interface GetResponseForAssignmentResponse{
    id: string
    assignment: string
    owner: string
    variables: {
        id: string, 
        value: number, 
        label: string
    }[]
    responses: {
        question: string, 
        content: string, 
        score: number, 
        isCorrect: boolean | null
    }[]
    totalScore: number
}


export default class Assignments {
    private client: AxiosInstance
    constructor(client: AxiosInstance){
        this.client = client
    }

    async create({activity, klass, startDate, dueDate}: CreateAssignmentRequest): Promise<GetAssignmentResponse>{
        const payload = {activity: activity, klass: klass, startDate: startDate, dueDate: dueDate}
        const { data } = await this.client.post('/assignments', payload)
        return data
    }

    async delete(id: string): Promise<void>{
        return await this.client.delete(`/assignments/${id}`)
    }

    async getResponses(assignmentId: string): Promise<GetResponseForAssignmentResponse[]>{
        const { data } = await this.client.get(`/assignments/${assignmentId}/responses`)
        return data
    }
}