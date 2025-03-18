import { defineStore } from "pinia"
import { ref } from "vue"
import { Question } from "../shared/types"

const useQuestionPreviewStore = defineStore("questionPreview", () => {
  const setQuestion = (question: Question) => {
    localStorage.setItem("previewQuestion", JSON.stringify(question))
  }
  const getQuestion = () => {
    return JSON.parse(localStorage.getItem("previewQuestion") ?? "")
  }
  return {
    setQuestion,
    getQuestion,
  }
})

export default useQuestionPreviewStore
