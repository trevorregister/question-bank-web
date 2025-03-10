<template>
    <!-- this is probably going to end up being a /bank/:bankId view -->
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
            <div class="row flex flex-center">
                <q-btn 
                    class="new-question-button"
                    @click="addNewQuestion" 
                    label="+New Question" 
                    :disabled="isNewQuestionsDisabled"
                    :title="isNewQuestionsDisabled ? 'Enabled when pending question is saved' : ''" 
                    outline
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestionEditor from '../domains/questions/components/QuestionEditor.vue'
import randomId from './utils/randomId'
import { PendingQuestion, Question } from './types'
import { ref, computed, onMounted } from 'vue'
import client from './api-client'
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

const handlePendingQuestionSaved = ({tempId, newQuestion}: {tempId: string, newQuestion: Question}) => {
    questions.value.push(newQuestion)
    pendingQuestions.value = pendingQuestions.value.filter(q => q.tempId !== tempId)
}
const handleExistingQuestionSaved = (updatedQuestion: Question) => {
  const outdatedQuestionIndex = questions.value.findIndex(q => q.id === updatedQuestion.id )
  questions.value[outdatedQuestionIndex] = updatedQuestion
}
const pendingQuestions = ref<PendingQuestion[]>([])
const questions = ref<Question[]>([])
onMounted(async () => {
  questions.value = await client.banks.getQuestions('67c4ca846db8f49f2e98ab51')
})
</script>

<style scoped lang="scss">
.new-question-button {
  color: $primary
}
</style>
