import { createRouter, createWebHistory } from "vue-router"
import useUserStore from "../stores/userStore"
import CreateAccountPage from "../domains/users/pages/CreateAccountPage.vue"
import LoginPage from "../domains/users/pages/LoginPage.vue"
import Playground from "../shared/Playground.vue"
import banks from "./banks"
import questions from "./questions"
import activities from "./activities"

const publicPages = ["/login", "/create-account", "/about", "/test"]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //routes: [...root, ...teams, ...shifts, ...users],
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccountPage,
    },
    {
      path: "/playground",
      name: "playground",
      component: Playground,
    },
    ...banks,
    ...questions,
    ...activities,
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const authRequired = !publicPages.includes(to.path)

  if (!userStore.getId() && authRequired) {
    return "/login"
  }
})

export default router
