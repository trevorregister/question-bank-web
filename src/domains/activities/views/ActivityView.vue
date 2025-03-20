<template>
  <div class="activity-container">
    <LoadingSpinner v-if="isLoading" />
    <div class="row flex flex-center" v-else>
      <ActivityStickyHeader class="q-mb-lg" />
      <div
        class="col-12 q-ma-sm"
        v-for="(question, index) in questions"
        :key="question.id"
      >
        <QuestionDisplay :question="question" :questionNumber="index + 1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Question } from "../../../shared/types"
import { ref, onMounted } from "vue"
import client from "../../../shared/api-client"
import LoadingSpinner from "../../../shared/global/LoadingSpinner.vue"
import QuestionDisplay from "../../questions/components/QuestionDisplay.vue"
import ActivityStickyHeader from "../components/ActivityStickyHeader.vue"
import useUserStore from "../../../stores/userStore"

const questions = ref<Question[]>(null)
const activityProgress = ref(null)
const isLoading = ref(true)

const userStore = useUserStore()

onMounted(async () => {
  questions.value = await client.questions.getQuestionsByOwner(
    userStore.getId(),
  )
  activityProgress.value = {
    totalPoints: questions.value.reduce(
      (totalPoints, question) => totalPoints + question.pointValue,
      0,
    ),
    currentPoints: 3, //placeholder
    totalQuestions: questions.value.length,
    questionsAnswered: 2, //placeholder
  }
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.activity-container {
  max-width: 70%;
}
</style>
