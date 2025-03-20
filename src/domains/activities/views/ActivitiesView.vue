<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="activities-container" v-else>
    <div class="row">
      <div class="col-12 q-ma-sm" v-for="activity in activities">
        <ActivityCard
          :activity="activity"
          @delete-activity="handleDeleteActivity(activity.id)"
        />
      </div>
    </div>
    <div class="row q-pa-sm">
      <div class="col flex flex-center">
        <BaseButton label="Create New Activity" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import client from "../../../shared/api-client"
import { ref, onMounted } from "vue"
import useUserStore from "../../../stores/userStore"
import { Activity } from "../../../shared/types"
import LoadingSpinner from "../../../shared/global/LoadingSpinner.vue"
import ActivityCard from "../components/ActivityCard.vue"
import { inject } from "vue"
import { Flash } from "../../../shared/components/FlashProvider.vue"

const flash = inject<Flash>("$flash")
const isLoading = ref(true)
const activities = ref<Activity[]>([])

const userStore = useUserStore()

const handleDeleteActivity = async (id: string) => {
  activities.value = activities.value.filter((a) => a.id !== id)
  //TODO api call for delete activity
}
const load = async () => {
  try {
    activities.value = await client.activities.getMyActivities(
      userStore.getId(),
    )
  } catch (err) {
    flash.apiError(err)
  }
}
onMounted(async () => {
  await load()
  isLoading.value = false
})
</script>

<style lang="scss">
.activities-container {
  width: 50%;
}
</style>
