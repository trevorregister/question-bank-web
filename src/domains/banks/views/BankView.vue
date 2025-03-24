<template>
  <div class="row">
    <div class="col">
      <div
        class="row q-mb-sm flex flex-center"
        v-for="question in questions"
        :key="question.id"
      >
        <QuestionEditor
          :question="question"
          @existing-question-saved="handleExistingQuestionSaved"
          @delete-question="handleDeleteQuestion"
        />
      </div>
      <div
        class="row q-mb-sm flex flex-center"
        v-for="question in pendingQuestions"
      >
        <QuestionEditor
          @pending-question-saved="handlePendingQuestionSaved"
          :question="question"
        />
      </div>
      <div class="row flex flex-center" v-if="!isLoading">
        <BaseButton
          @click="addNewQuestion"
          label="Create New Question"
          :disabled="isNewQuestionsDisabled"
          :title="
            isNewQuestionsDisabled
              ? 'Enabled when pending question is saved'
              : ''
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionEditor from "../../questions/components/QuestionEditor.vue"
import randomId from "../../../shared/utils/randomId"
import {
  BankWithQuestions,
  PendingQuestion,
  Question,
} from "../../../shared/types"
import { ref, inject, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import client from "../../../shared/api-client"
import { Flash } from "../../../shared/components/FlashProvider.vue"

const pendingQuestions = ref<PendingQuestion[]>([])
const questions = ref<Question[]>([])
const bank = ref<BankWithQuestions>()
const isLoading = ref(true)

const flash = inject<Flash>("$flash")!
const route = useRoute()
const bankId = route.params.bankId as string

const addNewQuestion = () => {
  pendingQuestions.value.push({
    tempId: randomId(),
    prompt: "",
    variables: [],
    conditions: [],
    pointValue: 0,
    isArchived: false,
    isDeleted: false,
    owner: "",
    type: "numerical",
  })
}
const isNewQuestionsDisabled = computed(() => pendingQuestions.value.length > 0)

const handlePendingQuestionSaved = async ({
  tempId,
  newQuestion,
}: {
  tempId: string
  newQuestion: Question
}) => {
  try {
    questions.value.push(newQuestion)
    pendingQuestions.value = pendingQuestions.value.filter(
      (q) => q.tempId !== tempId,
    )
    await client.banks.addQuestions({
      bankId: bankId,
      questionIdArray: [newQuestion.id],
    })
    flash.success("New question created")
  } catch (err) {
    flash.apiError(err)
  }
}
const handleExistingQuestionSaved = (updatedQuestion: Question) => {
  try {
    const outdatedQuestionIndex = questions.value.findIndex(
      (q) => q.id === updatedQuestion.id,
    )
    questions.value[outdatedQuestionIndex] = updatedQuestion
    flash.success("Question saved")
  } catch (err) {
    flash.apiError(err)
  }
}
const handleDeleteQuestion = async (question: Question) => {
  try {
    questions.value = questions.value.filter((q) => q.id !== question.id)
    flash.success("Question deleted")
    await client.questions.delete(question.id)
  } catch (err) {
    flash.apiError(err)
  }
}

onMounted(async () => {
  try {
    bank.value = await client.banks.getBank(bankId)
    if (bank.value) {
      questions.value = bank.value.questions
    }
    isLoading.value = false
  } catch (err) {
    flash.apiError(err)
  }
})
</script>

<style scoped lang="scss"></style>
