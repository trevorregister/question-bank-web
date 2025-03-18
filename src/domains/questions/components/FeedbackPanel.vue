<template>
  <div class="feedback-panel flex row q-ma-sm q-pa-sm bg-grey-3 text-body2">
    <div class="col-lg-6 col-xs-12">
      Score: {{ answerResponse.pointValue }} / {{ maxPoints }}
    </div>
    <div class="col-lg-6 col-xs-12" v-html="answerResponse.feedback" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  answerResponse: { feedback: string; isCorrect: boolean; pointValue: number }
  maxPoints: number
}>()
</script>

<style lang="scss">
.feedback-panel {
  min-height: 3rem;
  align-items: center;
  border: 2px solid $secondary;
}
</style>
