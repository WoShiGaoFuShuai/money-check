<template>
  <TopNavbar
    :title="'Expenses'"
    :right-icons="[{ icon: 'fa-solid fa-chart-pie', path: path, handler: navigateToPath }]"
  >
    <template #left-icons>
      <router-link :to="{ name: 'categories', query: { from: Mode.EXPENSES } }">
        <font-awesome-icon icon="fa-solid fa-list" />
      </router-link>
    </template>
  </TopNavbar>

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories :mode="Mode.EXPENSES" />

  <SpendCard
    :date="'today'"
    :mode="'Spent'"
    :editing-route-name="'editing-transaction-expenses'"
    :spend-sorted="spendStore.spendTodaySorted"
  />
  <template v-if="spendStore.spendYesterdaySorted.length">
    <SpendCard
      :date="'yesterday'"
      :mode="'Spent'"
      :editing-route-name="'editing-transaction-expenses'"
      :spend-sorted="spendStore.spendYesterdaySorted"
    />
  </template>

  <div class="history__link">
    <router-link
      class="history__link-item"
      :to="{ name: 'history' }"
      >History</router-link
    >
  </div>
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppAccounts from "@/components/accounts/AppAccounts.vue"
import AppCalculator from "@/components/calculator/AppCalculator.vue"
import ExpensesCategories from "@/components/expensesView/ExpensesCategories.vue"
import SpendCard from "@/components/spendCard/SpendCard.vue"
import { useSpendStore } from "@/stores/spend"
import { Mode } from "@/components/expensesView/enums"
import { useRouter } from "vue-router"

const spendStore = useSpendStore()

const path = "total-report"
const router = useRouter()

const navigateToPath = () => {
  router.push({ name: path })
}
</script>
<style lang="css" scoped>
.history__link {
  text-align: center;
}
.history__link-item {
  padding-bottom: 60px;
  text-decoration: none;
  color: var(--blue-primary);
}
</style>
