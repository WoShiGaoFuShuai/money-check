<template>
  <TopNavbar :title="'Expenses'" />

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories />

  <SpendCard
    :date="'today'"
    :spend-sorted="spendStore.spendTodaySorted"
  />
  <template v-if="spendStore.spendYesterdaySorted.length">
    <SpendCard
      :date="'yesterday'"
      :spend-sorted="spendStore.spendYesterdaySorted"
    />
  </template>
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppAccounts from "@/components/AppAccounts.vue"
import AppCalculator from "@/components/calculator/AppCalculator.vue"
import ExpensesCategories from "@/components/expensesView/ExpensesCategories.vue"
import SpendCard from "@/components/SpendCard.vue"
import { useSpendStore } from "@/stores/spend"

const spendStore = useSpendStore()
</script>
<style lang="css" scoped></style>
