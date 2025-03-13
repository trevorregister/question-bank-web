<template>
    <q-banner
        dense
        rounded
        :class="`flash-banner q-pa-sm q-mb-sm text-body2 bg-${flashType(type)} text-white`"
        inline-actions
    >
      <div class="row">
        <div class="col flex justify-start">
          {{ message }}
        </div>
        <div class="col flex justify-end">
          <BaseButton flat label="Dismiss" @click="dismiss" class="text-white"/>
        </div>
      </div>
    </q-banner>
</template>

<script setup lang="ts">
defineProps<{message: string, type: string, id: string}>()
const emit = defineEmits(['dismiss'])
const flashType = (type: string): string => {
    switch(type){
        case 'success':
            return 'positive'
        case 'warning':
            return 'warning'
        case 'error':
            return 'negative'
    }
}
const dismiss = () => {
  emit('dismiss')
}
</script>

<style lang="scss">
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.flash-banner {
  animation: fadeIn 0.75s ease-in;
  position: fixed;
  width: 75%;
  z-index: 9999;
}

</style>