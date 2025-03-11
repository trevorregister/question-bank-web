import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

const useUserStore = defineStore('user', () => {
    const id: Ref<string> = ref('')
    const role: Ref<string> = ref('')
    //setters
    const setId = (userId: string) => {
        id.value = userId
    }
    const setRole = (userRole: string) => {
        role.value = userRole
    }
    //getters
    const getId = () => {
        return id.value
    }
    const getRole = () => {
        return role.value
    }

    return {
        setId,
        setRole,
        getId,
        getRole
    }
})

export default useUserStore