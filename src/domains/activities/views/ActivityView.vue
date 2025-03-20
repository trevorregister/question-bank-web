<template>
  <div class="activity-container">
    <LoadingSpinner v-if="isLoading" />
    <div class="row flex flex-center" v-else>
      <ActivityStickyHeader class="q-mb-lg" />
      <div
        class="col-12 q-ma-sm"
        v-for="(question, index) in activityQuestions"
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
import { useRoute } from "vue-router"

interface ActivityQuestion extends Question {
  parent: string
}
const activityQuestions = ref<ActivityQuestion[]>([])
const activityProgress = ref(null)
const isLoading = ref(true)

const route = useRoute()

const activityId = route.params.activityId as string

onMounted(async () => {
  const activity = await client.activities.get(activityId)
  activity.sections.forEach((section) =>
    section.questions.forEach((question) =>
      activityQuestions.value.push(question),
    ),
  )
  activityProgress.value = {
    totalPoints: activityQuestions.value.reduce(
      (totalPoints, question) => totalPoints + question.pointValue,
      0,
    ),
    currentPoints: 3, //placeholder
    totalQuestions: activityQuestions.value.length,
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
