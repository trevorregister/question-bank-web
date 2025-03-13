<template>
  <div style="display: block;">
    <div class="flex justify-center q-mb-md">
          <form-body header="Login">
            <form-input label="Email" v-model="email"/>
            <form-input label="Password" type="password" v-model="password"/>
            <form-action label="Submit" type="submit" @submit="handleSubmit"/>
          </form-body>
        </div>
        <div class="flex flex-center">
          <router-link
            :to="{path: 'create-account'}">
            <BaseButton flat label="Create New Account" />
          </router-link>
        </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import client from '../../../shared/api-client'
  import { ref, inject } from 'vue'
  import { Flash } from '../../../shared/components/FlashProvider.vue'
  import { useRouter } from 'vue-router'
  import FormBody from '../../../shared/components/FormBody.vue'
  import FormAction from '../../../shared/components/FormAction.vue'
  import FormInput from '../../../shared/components/FormInput.vue'
  import useUserStore from '../../../stores/userStore'
  
  const email = ref('')
  const password = ref('')

  const router = useRouter()
  const userStore = useUserStore()
  const flash = inject<Flash>('$flash')
  
  const handleSubmit = async () => {
    try {
      const user = await client.users.loginEmailPassword({
        email: email.value,
        password: password.value
      })
  
      if(user){
        userStore.setId(user.id)
        userStore.setRole(user.role)
        router.push({name: 'banks'})
      }
    } catch (err) {
      flash.apiError(err)
    }
  }
  </script>
  
  <style scoped>
  </style>
  