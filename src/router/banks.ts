import BankView from "../domains/banks/views/BankView.vue"
import BanksView from "../domains/banks/views/BanksView.vue"
import QuestionPreviewView from "../domains/questions/views/QuestionPreviewView.vue"
const banks = [
  {
    path: "/banks",
    name: "banks",
    component: BanksView,
  },
  {
    path: "/banks/:bankId",
    name: "bank",
    component: BankView,
    props: true,
  },
  {
    path: "/banks/question-preview",
    name: "question-preview",
    component: QuestionPreviewView,
  },
]
export default banks
