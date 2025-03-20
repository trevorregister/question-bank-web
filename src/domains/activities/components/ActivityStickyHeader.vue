<template>
  <q-header class="activity-sticky-header" :class="{ scrolled: isScrolled }">
    <q-toolbar>
      <div class="text-body2 q-pr-lg">Points:</div>
      <div class="text-body2">Progress:</div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped lang="scss">
.activity-sticky-header {
  position: sticky;
  width: 100%;
  z-index: 100000;
  background-color: $secondary;
  transition: box-shadow 0.3s ease;
  border-radius: 5px;
  top: 100px; //Offset from AppHeader
}

.scrolled {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
