<template>
  <div class="accounts-wrapper">
    <div
      class="accounts-item"
      v-for="account in accountStore.accounts"
      :key="account.title"
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
<style lang="css">
.accounts-wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.accounts-item {
  min-width: 150px;
  /* width: 100%; */
  flex: 1 1 auto;
  text-align: center;
}
</style>
