<template>
  <h2>{{ init }}</h2>

  <q-card class="q-pa-md bg-primary text-white">
    <p>
      Edit
    </p>
  </q-card>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
import client from 'question-bank-api-client'
import { ref, onMounted } from 'vue'
const init = ref('init')

onMounted(async () => {
  const update = await client.client.get('/')
  init.value = update.data
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
