<template>
  <TopNavbar :title="'Expenses'" />

  <AppAccounts />

  <AppCalculator />
</template>
<script setup lang="ts">
import TopNavbar from "@/components/Navigation/TopNavbar.vue"
import AppAccounts from "@/components/AppAccounts.vue"
import AppCalculator from "@/components/Calculator/AppCalculator.vue"
</script>
<style lang="css"></style>
