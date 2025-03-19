<template>
  <QuestionDisplay :question="question" />
</template>

<script setup lang="ts">
import { Question } from "../../../shared/types"
import { ref, onBeforeMount } from "vue"
import useQuestionPreviewStore from "../../../stores/questionPreviewStore"
import QuestionDisplay from "../components/QuestionDisplay.vue"

const question = ref<Question>()
const questionPreviewStore = useQuestionPreviewStore()

onBeforeMount(() => {
  question.value = questionPreviewStore.getQuestion()
})
</script>

<style scoped lang="scss"></style>
