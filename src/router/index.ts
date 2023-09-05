import { createRouter, createWebHistory } from "vue-router"

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
    }
  ]
})

export default router
