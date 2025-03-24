<template>
  <LoadingSpinner v-if="isLoading" />
  <QuestionDisplay v-else-if="question" :question="question" />
</template>

<script setup lang="ts">
import { Question } from "../../../shared/types"
import { ref, onBeforeMount } from "vue"
import QuestionDisplay from "../components/QuestionDisplay.vue"
import { useRoute } from "vue-router"
import client from "../../../shared/api-client"
import LoadingSpinner from "../../../shared/global/LoadingSpinner.vue"

const question = ref<Question | null>(null)
const route = useRoute()
const questionId = route.params.questionId as string
const isLoading = ref(true)

onBeforeMount(async () => {
  const data = await client.questions.getQuestion(questionId)
  question.value = data
  isLoading.value = false
})
</script>

<style scoped lang="scss"></style>
