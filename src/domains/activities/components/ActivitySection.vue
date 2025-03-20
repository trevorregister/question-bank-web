<template>
  <CollapsePanel :label="`Section ${sectionNumber}: ${section.name}`">
    <div
      class="q-pa-md q-ma-md text-body2 bg-secondary rounded-borders text-white"
    >
      {{ section.summary }}
    </div>
    <div
      class="col-12 q-mb-sm q-pa-md"
      v-for="(question, index) in section.questions"
      :key="question.id"
    >
      <QuestionDisplay
        :question="question"
        :questionNumber="index + 1"
        flat
        bordered
      />
    </div>
  </CollapsePanel>
</template>

<script setup lang="ts">
import CollapsePanel from "../../../shared/components/CollapsePanel.vue"
import QuestionDisplay from "../../questions/components/QuestionDisplay.vue"
import { ActivitySection } from "../../../shared/types"

defineProps<{ section: ActivitySection; sectionNumber: number }>()
</script>

<style lang="scss"></style>
