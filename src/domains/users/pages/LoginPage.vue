<template>
    <div class="row">
      <div class="column">
        <div class="row justify-center">
          <form-body header="Login">
            <form-input label="Email" v-model="email"/>
            <form-input label="Password" type="password" v-model="password"/>
            <form-action label="Submit" type="submit" @submit="handleSubmit"/>
          </form-body>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import client from '../../../shared/api-client'
  import { ref } from 'vue'
  import FormBody from '../../../shared/components/FormBody.vue'
  import FormAction from '../../../shared/components/FormAction.vue'
  import FormInput from '../../../shared/components/FormInput.vue'
  
  const email = ref('')
  const password = ref('')
  
  const handleSubmit = async () => {
    const user = await client.users.loginEmailPassword({
      email: email.value,
      password: password.value
    })
  }
  </script>
  
  <style scoped>
  </style>
  