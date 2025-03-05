<template>
  <div class="row">
    <div class="column">
      <div class="row">
        <q-btn @click="login" class="q-ma-lg">Login</q-btn>
        <q-btn @click=getUser class="q-ma-lg" label="Get User"/>
      </div>
      <div class="row justify-center">
        <form-body>
          <form-input label="First Name" v-model="firstName"/>
          <form-input label="Last Name" v-model="lastName"/>
          <form-input label="Email" v-model="email"/>
          <form-action label="Submit" type="submit" @submit="handleSubmit"/>
        </form-body>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import client from '../../../shared/api-client'
import { ref, onMounted } from 'vue'
import FormBody from '../../../shared/components/FormBody.vue'
import FormAction from '../../../shared/components/FormAction.vue'
import FormInput from '../../../shared/components/FormInput.vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')

const login = async() => {
  const loginReq = await client.users.loginEmailPassword({email: "teacher1@asdf.com", password: "asdf"})
  console.log(loginReq)
}

const handleSubmit = () => {
  console.log(firstName.value, lastName.value, email.value)
}

const getUser = async(): Promise<any> => {
  const userReq = await client.users.getUser("67c4ca846db8f49f2e98aaba")
  console.log(userReq)
}
onMounted(async () => {
  const questions = await client.questions.getQuestionsByOwner("67c4ca846db8f49f2e98aaba")
 // console.log(questions)
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
