<template>
  <div
    :class="`feedback-panel ${submissionStyling} flex row q-ma-sm q-pa-sm bg-grey-3 text-body2`"
  >
    <div class="col-md-3 col-sm-12 col-xs-12">
      <span v-if="submissionCount > 0" class="q-ma-sm">
        <span v-if="answerResponse.isCorrect">
          <CorrectCheck />
        </span>
        <span v-else>
          <IncorrectX />
        </span>
      </span>
      <span class="score-display"
        ><strong>Score:</strong> {{ answerResponse.pointValue }} /
        {{ maxPoints }}</span
      >
    </div>
    <div class="col-md-9 col-sm-12 col-xs-12 flex justify-end">
      <span v-html="answerResponse.feedback" class="q-ma-sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CorrectCheck from "./CorrectCheck.vue"
import IncorrectX from "./IncorrectX.vue"
import { computed } from "vue"

const props = defineProps<{
  answerResponse: { feedback: string; isCorrect: boolean; pointValue: number }
  maxPoints: number
  submissionCount: number
}>()

const submissionStyling = computed(() => {
  if (props.submissionCount === 0) {
    return ""
  } else {
    return props.answerResponse.isCorrect ? "__correct" : "__incorrect"
  }
})
</script>

<style lang="scss">
.feedback-panel {
  min-height: 3rem;
  align-items: center;
  &.__correct {
    border: 2px solid $positive;
  }
  &.__incorrect {
    border: 2px solid $negative;
  }
}
.score-display {
  align-items: center;
}
</style>
