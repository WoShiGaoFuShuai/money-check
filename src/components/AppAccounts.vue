<template>
  <div class="accounts-wrapper">
    <div
      v-for="account in accountStore.accounts"
      :key="account.title"
      class="accounts-item"
      :class="{ 'active-account': account.active }"
      data-testid="accounts-item"
    >
      <div>
        {{ account.title }}
      </div>
      <div>
        {{ account.sum }}
      </div>
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
}

.accounts-item {
  min-width: 120px;
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
