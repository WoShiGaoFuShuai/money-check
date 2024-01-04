import { createRouter, createWebHistory } from "vue-router"
import { ref } from "vue"

export const previousRoute = ref<string | null>(null)

const routes = [
  {
    path: "/",
    name: "expenses",
    component: () => import("@/views/ExpensesView.vue")
  },
  {
    path: "/expenses/editing-transaction/:timestamp?",
    name: "editing-transaction-expenses",
    component: () => import("@/views/EditingTransactionView.vue"),
    meta: { source: "expenses" }
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
    path: "/income/editing-transaction/:timestamp?",
    name: "editing-transaction-income",
    component: () => import("@/views/EditingTransactionView.vue"),
    meta: { source: "income" }
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
  },
  {
    path: "/editing-transaction/:timestamp?",
    name: "editing-transaction",
    component: () => import("@/views/EditingTransactionView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  previousRoute.value = from.name
  next()
})

export { routes }
export default router
