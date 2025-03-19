import QuestionPreviewView from "../domains/questions/views/QuestionPreviewView.vue"
const questions = [
  {
    path: "/questions/:questionId/preview",
    name: "question-preview",
    component: QuestionPreviewView,
  },
]
export default questions
