import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
    //setters
    const setId = (userId: string) => {
        localStorage.setItem('id', userId)
    }
    const setRole = (userRole: string) => {
        localStorage.setItem('role', userRole)
    }
    //getters
    const getId = () => {
        return localStorage.getItem('id')
    }
    const getRole = () => {
        return localStorage.getItem('role')
    }
    return {
        setId,
        setRole,
        getId,
        getRole,
    }
})

export default useUserStore