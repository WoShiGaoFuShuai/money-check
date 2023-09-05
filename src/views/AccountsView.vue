<template>
  <div class="accountsView__wrapper">
    <TopNavbar
      :title="'Accounts'"
      :right-icons="[
        { icon: 'fa solid fa-pencil', handler: showEditIcon },
        { icon: 'fa solid fa-plus', handler: showNewAccount }
      ]"
    />

    <div class="nav-top">
      <nav>
        <ul class="nav-top__ul">
          <li>
            <font-awesome-icon icon="fa-solid fa-credit-card" />
          </li>

          <li>
            <font-awesome-icon icon="fa-solid fa-repeat" />
          </li>
        </ul>
      </nav>
    </div>

    <div class="accounts-list">
      <ul>
        <li
          v-for="account in accountsStore.accounts"
          :key="account.title"
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
        </li>
      </ul>
    </div>
    <NewAccount
      v-if="isNewAccountVisible"
      @hide-new-account-modal="isNewAccountVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NewAccount from "@/components/accounts/NewAccount.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref } from "vue"

const accountsStore = useAccountsStore()

const isNewAccountVisible = ref(false)

const showNewAccount = () => {
  isNewAccountVisible.value = !isNewAccountVisible.value
}

const showEditIcon = () => {
  console.log("edit")
}
</script>
<style lang="css" scoped>
.accountsView__wrapper {
  position: relative;
}
.nav-top {
  background-color: var(--grey-primary);
  padding: 48px 4px 4px 4px;
}

.nav-top__ul {
  display: flex;
  justify-content: space-around;
}

.accounts-list {
  padding: 8px;
}

.accouts-list__li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.account-amount__amount {
  color: var(--green-primary);
}
</style>
