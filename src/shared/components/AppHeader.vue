<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar class="justify-center">
      <q-toolbar-title class="text-center"> GammaFlows </q-toolbar-title>
    </q-toolbar>
    <q-tabs align="center">
      <q-route-tab to="/banks" label="Banks" />
      <q-route-tab to="/activities" label="Activities" />
      <q-btn @click="logout" flat label="Logout" v-if="isAuthenticated" />
    </q-tabs>
  </q-header>
</template>

<script setup lang="ts">
import client from "../api-client"
import { computed } from "vue"
import { useRouter } from "vue-router"
import useUserStore from "../../stores/userStore"

const router = useRouter()
const userStore = useUserStore()
const isAuthenticated = computed(() => !!userStore.getId())

const logout = async () => {
  await client.users.logoutUser()
  userStore.logout()
  router.push("/login")
  window.location.reload()
}
</script>

<style lang="scss"></style>
