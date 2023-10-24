<template>
  <TopNavbar :title="'Expenses'" />

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories />

  <SpendCard
    :date="'today'"
    :mode="'Spent'"
    :spend-sorted="spendStore.spendTodaySorted"
  />
  <template v-if="spendStore.spendYesterdaySorted.length">
    <SpendCard
      :date="'yesterday'"
      :mode="'Spent'"
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

const spendStore = useSpendStore()
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
