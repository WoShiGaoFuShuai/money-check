<template>
  <TopNavbar :title="'Expenses'" />

  <AppAccounts />

  <AppCalculator />

  <ExpensesCategories />
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppAccounts from "@/components/AppAccounts.vue"
import AppCalculator from "@/components/calculator/AppCalculator.vue"
import ExpensesCategories from "@/components/expensesView/ExpensesCategories.vue"
</script>
<style lang="css" scoped></style>
