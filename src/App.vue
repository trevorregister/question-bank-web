<template>
  <q-layout view="hHh lpR fFf" class="q-pa-lg">
    <AppHeader/>
    <q-page-container>
      <ModalProvider>
        <div class="flex justify-center">
          <router-view/>
        </div>
      </ModalProvider>
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './shared/components/AppHeader.vue'
import ModalProvider from './shared/modals/ModalProvider.vue'

</script>

<style lang="scss">
#content-container {
  max-width: 1200px;
  width: 100%;
}
</style>
