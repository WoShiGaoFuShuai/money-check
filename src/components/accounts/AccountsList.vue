<template>
  <div class="accounts-list">
    <ul>
      <li
        v-for="(account, index) in props.accounts"
        :key="account.title"
        role="accouts-list__li"
        class="accouts-list__li"
      >
        <div class="accounts-list__account-name">
          <span class="account-name__name">{{ account.title }}</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount"
            >{{ account.sum }} <span>{{ account.currency }}</span></span
          >
        </div>

        <div
          v-if="props.editMode"
          role="editModeButtons"
          class="accounts-list__edit"
        >
          <font-awesome-icon
            icon="fa-solid fa-pencil"
            class="icon icon__edit"
            role="pencilIcon"
            @click="showEditCurrentAccount(account.sum, account.currency, account.title, index)"
          />

          <font-awesome-icon
            icon="fa-solid fa-trash"
            class="icon icon__del"
            role="deleteIcon"
            @click="deleteAccount(index)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Account } from "@/stores/accounts"
import { useAccountsStore } from "@/stores/accounts"

const emit = defineEmits(["showEditCurrentAccount"])

const props = defineProps({
  accounts: {
    type: Array as () => Account[],
    required: true
  },
  editMode: {
    type: Boolean,
    required: true
  }
})

const accountsStore = useAccountsStore()

const showEditCurrentAccount = (sum: number, symbol: string, title: string, index: number) => {
  const accountToEdit = {
    sum,
    symbol,
    title,
    index
  }
  emit("showEditCurrentAccount", accountToEdit)
}

const deleteAccount = (i: number) => {
  accountsStore.deleteAccount(i)
}
</script>
<style lang="css" scoped>
.accounts-list {
  padding: 8px;
}

.accouts-list__li {
  display: flex;
  margin-bottom: 12px;
}

.accounts-list__account-amount {
  max-width: 100px;
  width: 100%;
  text-align: end;
  margin-left: auto;
}

.account-amount__amount {
  color: var(--green-primary);
}

.accounts-list__edit {
  margin-left: 24px;
}

.icon__edit {
  margin-right: 16px;
}
</style>
