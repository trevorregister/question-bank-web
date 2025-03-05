import { createRouter, createWebHistory } from 'vue-router'
import CreateAccountPage from '../domains/users/pages/CreateAccountPage.vue'
//const publicPages = ['/login', '/create-account', '/about', '/test']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //routes: [...root, ...teams, ...shifts, ...users],
  routes: [
    {
        path: '/create-account',
        name: 'create-account',
        component: CreateAccountPage
    }
  ]
})

/* router.beforeEach((to) => {
  const userStore = useUserStore()
  const authRequired = !publicPages.includes(to.path)

  if (!userStore.isAuthenticated && authRequired) {
    return '/login'
  }
}) */

export default router
