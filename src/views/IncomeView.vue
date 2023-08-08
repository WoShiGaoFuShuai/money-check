<template>
  <TopNavbar
    :bg-color="getCSSVariableValue('--green-primary')"
    :title="'Income'"
  />

  <AppAccounts />
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppAccounts from "@/components/AppAccounts.vue"

const getCSSVariableValue = (variableName: string) => {
  // Read the value of the CSS variable using JavaScript
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}
</script>
<style lang="css" scoped></style>
