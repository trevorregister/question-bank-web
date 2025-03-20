<template>
  <div class="activity-container">
    <LoadingSpinner v-if="isLoading" />
    <div class="row flex flex-center" v-else>
      <!--  <ActivityStickyHeader class="q-mb-lg" /> -->
      <div
        class="col-12 q-ma-sm"
        v-for="(section, index) in activity.sections"
        :key="section.id"
      >
        <ActivitySection :section="section" :sectionNumber="index + 1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import client from "../../../shared/api-client"
import LoadingSpinner from "../../../shared/global/LoadingSpinner.vue"
import ActivitySection from "../components/ActivitySection.vue"
import ActivityStickyHeader from "../components/ActivityStickyHeader.vue"
import { useRoute } from "vue-router"
import { Activity, ActivityQuestion } from "../../../shared/types"

const activity = ref<Activity>(null)
const activityQuestions = ref<ActivityQuestion[]>([])
const activityProgress = ref(null)
const isLoading = ref(true)

const route = useRoute()

const activityId = route.params.activityId as string

onMounted(async () => {
  activity.value = await client.activities.get(activityId)
  activity.value.sections.forEach((section) =>
    section.questions.forEach((question) =>
      activityQuestions.value.push(question),
    ),
  )
  /*   activityProgress.value = {
    totalPoints: activityQuestions.value.reduce(
      (totalPoints, question) => totalPoints + question.pointValue,
      0,
    ),
    currentPoints: 3, //placeholder
    totalQuestions: activityQuestions.value.length,
    questionsAnswered: 2, //placeholder
  } */
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.activity-container {
  width: 50%;
}
</style>
