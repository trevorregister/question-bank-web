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
  import { useRouter } from 'vue-router'
  import FormBody from '../../../shared/components/FormBody.vue'
  import FormAction from '../../../shared/components/FormAction.vue'
  import FormInput from '../../../shared/components/FormInput.vue'
  import useUserStore from '../../../stores/userStore'
  
  const email = ref('')
  const password = ref('')

  const router = useRouter()
  const userStore = useUserStore()
  
  const handleSubmit = async () => {
    const user = await client.users.loginEmailPassword({
      email: email.value,
      password: password.value
    })

    if(user){
      userStore.setId(user.id)
      userStore.setRole(user.role)
      console.log(userStore.getId(), userStore.getRole())
      router.push({name: 'banks'})
    }
  }
  </script>
  
  <style scoped>
  </style>
  