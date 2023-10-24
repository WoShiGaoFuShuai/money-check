<template>
  <TopNavbar
    :bg-color="getCSSVariableValue('--green-primary')"
    :title="'Income'"
  />

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories :mode="'income'" />

  <SpendCard
    :date="'today'"
    :mode="'Earned'"
    :spend-sorted="earnStore.earnTodaySorted"
  />
  <template v-if="earnStore.earnYesterdaySorted.length">
    <SpendCard
      :date="'yesterday'"
      :mode="'Earned'"
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

const earnStore = useEarnStore()

const getCSSVariableValue = (variableName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
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
