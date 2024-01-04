<template>
  <TopNavbar
    :title="'Accounts'"
    :right-icons="[
      { icon: 'fa-solid fa-check', handler: approveEditAccountsList, label: 'Approve' }
    ]"
  >
    <template #left-icons>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        role="closeBtn"
        @click="closeEditAccountsList"
      />
    </template>
  </TopNavbar>

  <div class="acc-list__wrapper">
    <ul class="acc-list__items">
      <li
        v-for="(account, i) in props.accounts"
        :key="i"
        class="acc-list__item"
        data-testId="acc-list__item"
        @click="changeChoosenAccount(account.title, account.currency)"
      >
        <div class="acc-list__item-left">{{ account.title }}</div>

        <div class="acc-list__item-right">
          <span> {{ account.sum }} </span>
          <span class="acc-list__item-currency">{{ account.currency }}</span>
          <font-awesome-icon
            v-if="account.title === props.editItem?.account"
            icon="fa-solid fa-check"
            role="icon__tick"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import type { Account, SpendCardInfo } from "@/stores/accounts"
import type { PropType } from "vue"

const emit = defineEmits(["changeChoosenAccount", "toggleEditAccountsList"])

const props = defineProps({
  accounts: {
    type: Array as () => Account[],
    required: true
  },
  editItem: {
    type: Object as PropType<SpendCardInfo | null>,
    required: true
  }
})

const firstChoosenAccount = props.editItem?.account ?? null
const firstChoosenAccountCurrency = props.editItem?.currency ?? ""

const changeChoosenAccount = (accountTitle: string, accountCurrency: string) => {
  emit("changeChoosenAccount", accountTitle, accountCurrency)
}

const closeEditAccountsList = () => {
  if (firstChoosenAccount) {
    changeChoosenAccount(firstChoosenAccount, firstChoosenAccountCurrency)
  }
  emit("toggleEditAccountsList", false)
}

const approveEditAccountsList = () => {
  emit("toggleEditAccountsList", false)
}
</script>
<style lang="css">
.acc-list__wrapper {
  padding: 56px 16px 0 16px;
}

.acc-list__item {
  display: flex;
  justify-content: space-between;
}

.acc-list__item-currency {
  margin-right: 8px;
}
</style>
