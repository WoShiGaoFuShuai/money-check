import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/accounts",
      name: "accounts",
      component: () => import("@/views/AccountsView.vue")
    },
    {
      path: "/expenses",
      name: "expenses",
      component: () => import("@/views/ExpensesView.vue")
    },
    {
      path: "/income",
      name: "income",
      component: () => import("@/views/IncomeView.vue")
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/CategoriesView.vue")
    }
  ]
})

export default router
