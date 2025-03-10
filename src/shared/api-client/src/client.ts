import axios from 'axios'
import type { AxiosInstance } from 'axios'
import Users from './users'
import Classes from './classes'
import Assignments from './assignments'
import Activities from './activities'
import Banks from './banks'
import Questions from './questions'
import AssignmentResponses from './assignmentresponses'
interface ClientConfig {
    baseURL: string,
    headers: any,
    withCredentials: boolean
}
export default class Client {
    readonly users: Users
    readonly classes: Classes
    readonly assignments: Assignments
    readonly activities: Activities
    readonly banks: Banks
    readonly questions: Questions
    readonly responses: AssignmentResponses

    private instance: AxiosInstance
    constructor(config: ClientConfig){
        this.instance = axios.create(config)
        this.users = new Users(this.instance)
        this.classes = new Classes(this.instance)
        this.assignments = new Assignments(this.instance)
        this.activities = new Activities(this.instance)
        this.banks = new Banks(this.instance)
        this.questions = new Questions(this.instance)
        this.responses = new AssignmentResponses(this.instance)
    }
/* 
    async get<T>(url: string): Promise<T>{
        const response: AxiosResponse = await this.instance.get(url)
        return response.data
    } */
}