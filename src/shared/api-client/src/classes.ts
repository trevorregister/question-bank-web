import { AxiosInstance } from "axios"

interface CreateClassResponse {
  id: string
  name: string
  owner: string
  roster: []
  droppedStudents: []
  joinCode: string
  isArchived: false
}

interface RosteredStudent {
  student: string
  joinDate: string
}

interface DroppedStudent {
  student: string
  dropDate: string
}

interface GetClassResponse {
  id: string
  name: string
  owner: string
  roster: RosteredStudent[]
  droppedStudents: DroppedStudent[]
  joinCode: string
  isArchived: false
}

interface DropStudentRequest {
  studentId: string
  classId: string
}

export default class Classes {
  private client: AxiosInstance
  constructor(client: AxiosInstance) {
    this.client = client
  }

  async joinClass(joinCode: string): Promise<string> {
    const { data } = await this.client.post("/classes/join", {
      joinCode: joinCode,
    })
    return data
  }

  async create(name: string): Promise<CreateClassResponse> {
    const { data } = await this.client.post("/classes", { name: name })
    return data
  }

  async archive(id: string): Promise<void> {
    return await this.client.patch(`/classes/${id}/archive`)
  }

  async unarchive(id: string): Promise<void> {
    return await this.client.patch(`/classes/${id}/unarchive`)
  }

  async getById(id: string): Promise<GetClassResponse> {
    const { data } = await this.client.get(`/classes/${id}`)
    return data
  }

  async getMyClasses(ownerId: string): Promise<GetClassResponse[]> {
    const { data } = await this.client.get(`/classes/owner/${ownerId}`)
    return data
  }

  async dropStudent({ classId, studentId }: DropStudentRequest): Promise<void> {
    return await this.client.patch(`/classes/${classId}/drop-student`, {
      studentId: studentId,
    })
  }
}
