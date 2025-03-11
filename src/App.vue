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
    <AppFooter/>
  </q-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './shared/components/AppHeader.vue'
import AppFooter from './shared/components/AppFooter.vue'
import ModalProvider from './shared/modals/components/ModalProvider.vue'

</script>

<style lang="scss">
#content-container {
  max-width: 1200px;
  width: 100%;
}
</style>
