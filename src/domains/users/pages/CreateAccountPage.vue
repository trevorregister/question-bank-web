<template>
  <div class="row">
    <div class="column">
      <div class="row justify-center">
        <form-body header="Create Account">
          <form-input label="First Name" v-model="firstName"/>
          <form-input label="Last Name" v-model="lastName"/>
          <form-input label="Email" v-model="email"/>
          <form-input label="Password" type="password" v-model="password"/>
          <div class="row q-mb-md">
            <p class="q-mt-sm text-body1" style="min-width: 130px;">I am a</p>
              <q-option-group
                v-model="role"
                :options="roleOptions"
                inline 
              />
          </div>
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const role = ref<'teacher' | 'student'>()
const password = ref('')
const roleOptions = [
  {
    label: "Teacher",
    value: 'teacher'
  },
  {
    label: "Student",
    value: 'student'
  }
]

const handleSubmit = async () => {
  const user = await client.users.createUser({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    role: role.value ?? 'student',
    password: password.value
  })
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
