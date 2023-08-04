<template>
  <TopNavbar :title="'Expenses'" />

  <AppAccounts />

  <AppCalculator />
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppAccounts from "@/components/AppAccounts.vue"
import AppCalculator from "@/components/calculator/Appcalculator.vue"
</script>
<style lang="css"></style>
