<template>
  <div class="accounts-wrapper">
    <div
      v-for="account in accountStore.accounts"
      :key="account.title"
      class="accounts-item"
      :class="{ 'active-account': account.active }"
      data-testid="accounts-item"
      :role="account.title"
      @click="accountStore.changeActiveAccount(account.title)"
    >
      <div role="account-title">
        {{ account.title }}
      </div>
      <div role="account-sum">{{ account.sum }} {{ account.currency }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts"

const accountStore = useAccountsStore()
</script>
<style lang="css" scoped>
.accounts-wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 48px;
}

.accounts-item {
  width: 120px;
  flex: 1 1 auto;
  text-align: center;
  background-color: var(--blue-secondary);
  border-radius: 8px;
  margin: 4px;
}

.active-account {
  background-color: var(--active);
}
</style>
