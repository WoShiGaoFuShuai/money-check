<template>
  <TopNavbar
    :bg-color="getCSSVariableValue('--green-primary')"
    :right-icons="[{ icon: 'fa-solid fa-chart-pie', path: path, handler: navigateToPath }]"
    :title="'Income'"
  >
    <template #left-icons>
      <router-link :to="{ name: 'categories', query: { from: Mode.INCOME } }">
        <font-awesome-icon icon="fa-solid fa-list" />
      </router-link>
    </template>
  </TopNavbar>

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories :mode="Mode.INCOME" />

  <SpendCard
    :date="'today'"
    :mode="'Earned'"
    :editing-route-name="'editing-transaction-income'"
    :spend-sorted="earnStore.earnTodaySorted"
  />
  <template v-if="earnStore.earnYesterdaySorted.length">
    <SpendCard
      :date="'yesterday'"
      :mode="'Earned'"
      :editing-route-name="'editing-transaction-income'"
      :spend-sorted="earnStore.earnYesterdaySorted"
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
import { useEarnStore } from "@/stores/earn"
import { Mode } from "@/components/expensesView/enums"
import { useRouter } from "vue-router"

const earnStore = useEarnStore()
const router = useRouter()

const getCSSVariableValue = (variableName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}

const path = "total-report"

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
