import QuestionPreviewView from "../domains/questions/views/QuestionPreviewView.vue"
const questions = [
  {
    path: "/questions/:questionId/preview",
    name: "question-preview",
    component: QuestionPreviewView,
    props: true,
  },
]
export default questions
