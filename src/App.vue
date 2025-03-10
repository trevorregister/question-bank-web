<template>
  <q-layout view="hHh lpR fFf" class="q-pa-lg">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
<!--    suppresses vue warnings until i have actual pages     
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" /> -->
        <q-route-tab label="Page One" />
        <q-route-tab label="Page Two" />
        <q-route-tab label="Page Three" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="flex justify-center">
        <router-view/>
      </div>
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

</script>

<style lang="scss">
#content-container {
  max-width: 1200px;
  width: 100%;
}
</style>
