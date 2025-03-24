<template>
  <div v-for="flash in flashes" :key="flash.id" class="flex flex-center">
    <Flash
      :message="flash.message"
      :type="flash.type"
      :id="flash.id"
      @dismiss="removeFlash(flash.id)"
    />
  </div>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue"
import Flash from "./Flash.vue"
import randomId from "../utils/randomId"
import { AxiosError, AxiosResponse } from "axios"

interface ApiError extends AxiosError {
  response?: AxiosResponse<{ code: number; message: string }>
}
export interface Flash {
  success: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
  apiError: (error: ApiError | unknown) => void
}
type FlashType = "success" | "warning" | "error"
const FLASH_REMOVE_TIMEOUT = 3000

const flashes = ref<{ id: string; message: string; type: FlashType }[]>([])
const addFlash = (message: string, type: FlashType, id: string) => {
  flashes.value.push({
    message: message,
    type: type,
    id: id,
  })
  setTimeout(() => removeFlash(id), FLASH_REMOVE_TIMEOUT)
}

const removeFlash = (id: string) => {
  flashes.value = flashes.value.filter((flash) => flash.id !== id)
}
const success = (message: string): void => {
  addFlash(message, "success", randomId())
}
const warning = (message: string): void => {
  addFlash(message, "warning", randomId())
}
const error = (message: string): void => {
  addFlash(message, "error", randomId())
}
const apiError = (error: ApiError | any) => {
  if (error?.response?.data?.message) {
    addFlash(error.response?.data?.message ?? "Error", "error", randomId())
  } else {
    addFlash("unknown error", "error", randomId())
  }
}

const methods: Flash = {
  success: success,
  warning: warning,
  error: error,
  apiError: apiError,
}
provide("$flash", methods)
</script>

<style lang="scss"></style>
