import { AxiosInstance } from "axios"

interface GetUserResponse {
  id: string
  firstName: string
  lastName: string
  role: "teacher" | "admin" | "student"
  email: string
}

interface CreateUserRequest {
  firstName: string
  lastName: string
  role: "teacher" | "student"
  email: string
  password: string
}

interface CreateUserResponse {
  id: string
  role: string
}

interface LoginEmailPasswordRequest {
  email: string
  password: string
}

interface LoginResponse {
  id: string
  role: string
}
export default class Users {
  private client: AxiosInstance
  constructor(client: AxiosInstance) {
    this.client = client
  }
  async getUser(id: string): Promise<GetUserResponse> {
    const { data } = await this.client.get(`/users/${id}`)
    return data
  }
  async loginEmailPassword({
    email,
    password,
  }: LoginEmailPasswordRequest): Promise<LoginResponse> {
    const { data } = await this.client.post("/users/login/email-password", {
      email: email,
      password: password,
    })
    return data
  }
  async createUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const { data } = await this.client.post("/users", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    })
    return data
  }
  async logoutUser(): Promise<void> {
    const { data } = await this.client.post("users/logout", {})
    return data
  }
}
