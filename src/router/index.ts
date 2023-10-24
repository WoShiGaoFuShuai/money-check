import { createRouter, createWebHistory } from "vue-router"
import { ref } from "vue"

export const previousRoute = ref<string | null>(null)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "expenses",
      component: () => import("@/views/ExpensesView.vue")
    },
    {
      path: "/accounts",
      name: "accounts",
      component: () => import("@/views/AccountsView.vue")
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
    },
    {
      path: "/history",
      name: "history",
      component: () => import("@/views/HistoryView.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue")
    },
    {
      path: "/transfers",
      name: "transfers",
      component: () => import("@/views/TransfersView.vue")
    },
    {
      path: "/transfers-history",
      name: "transfers-history",
      component: () => import("@/views/TrasnfersHistoryView.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {
  previousRoute.value = from.name
  next()
})
export default router
