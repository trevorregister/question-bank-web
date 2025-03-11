<template>
    <div class="row">
        <div class="col">
            <div class="row q-mb-sm" v-for="question in questions">
                <QuestionEditor 
                    :question="question"
                    @existing-question-saved="handleExistingQuestionSaved"
                />
            </div>
            <div class="row q-mb-sm" v-for="question in pendingQuestions">
                <QuestionEditor 
                    @pending-question-saved="handlePendingQuestionSaved" 
                    :question="question"
                />
            </div>
            <div class="row flex flex-center" v-if="!isLoading">
                <BaseButton
                    @click="addNewQuestion" 
                    label="+New Question" 
                    :disabled="isNewQuestionsDisabled"
                    :title="isNewQuestionsDisabled ? 'Enabled when pending question is saved' : ''" 
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestionEditor from '../../questions/components/QuestionEditor.vue'
import randomId from '../../../shared/utils/randomId'
import { BankWithQuestions, PendingQuestion, Question } from '../../../shared/types'
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import client from '../../../shared/api-client'

const pendingQuestions = ref<PendingQuestion[]>([])
const questions = ref<Question[]>([])
const bank = ref<BankWithQuestions>(null)
const isLoading = ref(true)

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
        type: "numerical"
    })
}
const isNewQuestionsDisabled = computed(() =>pendingQuestions.value.length > 0)

const handlePendingQuestionSaved = async ({tempId, newQuestion}: {tempId: string, newQuestion: Question}) => {
    questions.value.push(newQuestion)
    pendingQuestions.value = pendingQuestions.value.filter(q => q.tempId !== tempId)
    await client.banks.addQuestions({bankId: bankId, questionIdArray: [newQuestion.id]})
}
const handleExistingQuestionSaved = (updatedQuestion: Question) => {
  const outdatedQuestionIndex = questions.value.findIndex(q => q.id === updatedQuestion.id )
  questions.value[outdatedQuestionIndex] = updatedQuestion
}

onBeforeMount(async () => {
    bank.value = await client.banks.getBank(bankId)
    if(bank.value){
        questions.value = bank.value.questions
    }
    isLoading.value = false
})
</script>

<style scoped lang="scss">
.new-question-button {
  color: $primary
}
</style>
