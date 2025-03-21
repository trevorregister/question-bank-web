import GetQuestionResponse from "./GetQuestionResponse"

interface ActivityQuestion extends GetQuestionResponse {
  parent: string
}

export default interface GetActivityResponse {
  id: string
  name: string
  owner: string
  sections: {
    id: string
    name: string
    questions: ActivityQuestion[]
    summary: string
    sectionIndex: number
  }[]
  tags: string[]
  questionCount: number
  isArchived: boolean
}
