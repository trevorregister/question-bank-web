<template>
  <QuestionDisplay :question="question" />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { Question } from "./types"
import QuestionDisplay from "../domains/questions/components/QuestionDisplay.vue"
const question: Question = {
  id: "67d702c06d30686eec87e815",
  prompt:
    "This is <strong>a question prompt</strong>. It has <i>variables</i>&nbsp;like <gvar class='var-pnt07vl8a9h'>{{distance}}</gvar>m and <gvar class='var-j2i13id0kpi'>{{time}}</gvar>s",
  variables: [
    {
      id: "pnt07vl8a9h",
      type: "random",
      min: 1,
      max: 100,
      step: 0.1,
      label: "distance",
    },
    {
      id: "j2i13id0kpi",
      type: "random",
      min: 0.5,
      max: 20,
      step: 0.5,
      label: "time",
    },
  ],
  conditions: [
    {
      id: "bxq0ezuvqxn",
      expression: "distance/time",
      isCorrect: true,
      feedback:
        "well <b>done</b>. You've done an excellent job of determing the speed given the distance and time.",
    },
    {
      id: "bxq0ezu4qxz",
      expression: "time/distance",
      isCorrect: false,
      feedback: "<b>wrong</b>",
    },
  ],
  pointValue: 5,
  owner: "67c4ca846db8f49f2e98aaba",
  type: "numerical",
  isArchived: false,
  isDeleted: false,
}
onMounted(() => {})
</script>

<style scoped lang="scss"></style>
