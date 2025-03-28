import { defineStore } from "pinia"
import { ActivityResponse } from "../shared/types"

const useUserStore = defineStore("user", () => {
  //setters
  const setId = (userId: string) => {
    localStorage.setItem("id", userId)
  }
  const setRole = (userRole: string) => {
    localStorage.setItem("role", userRole)
  }
  const setActivityResponse = (activityResponse: ActivityResponse) => {
    localStorage.setItem(
      activityResponse.activityCode,
      JSON.stringify(activityResponse),
    )
  }
  //getters
  const getId = () => {
    return localStorage.getItem("id")
  }
  const getRole = () => {
    return localStorage.getItem("role")
  }
  const getActivityResponse = (
    activityCode: string,
  ): ActivityResponse | null => {
    const response = localStorage.getItem(activityCode)
    return response ? JSON.parse(response) : null
  }
  //actions
  const logout = () => {
    localStorage.clear()
  }
  return {
    setId,
    setRole,
    setActivityResponse,
    getId,
    getRole,
    getActivityResponse,
    logout,
  }
})

export default useUserStore
