<template>
  <h2>{{ init }}</h2>

  <q-card class="q-pa-md bg-primary text-white">
    <p>
      Edit
    </p>
  </q-card>
  <q-btn @click="login">Login</q-btn>
  <q-btn @click=getUser label="Get User"/>

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
import client from '../shared/api-client'
import { ref, onMounted } from 'vue'
const init = ref('init')

const login = async() => {
  const loginReq = await client.users.loginEmailPassword({email: "teacher1@asdf.com", password: "asdf"})
  console.log(loginReq)
}

const getUser = async() => {
  const userReq = await client.users.getUser("67c4ca846db8f49f2e98aaba")
  console.log(userReq)
}
onMounted(async () => {

})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
