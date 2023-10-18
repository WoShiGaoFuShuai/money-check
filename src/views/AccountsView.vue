<template>
  <div class="accountsView__wrapper">
    <TopNavbar
      :title="'Accounts'"
      :right-icons="[
        { icon: 'fa solid fa-pencil', handler: showEditIcon },
        { icon: 'fa solid fa-plus', handler: showNewAccount }
      ]"
    />

    <NavTop :links="links" />

    <AccountsList
      :edit-mode="editMode"
      :accounts="accountsStore.accounts"
      @show-edit-current-account="showEditCurrentAccount"
    />
    <NewAccount
      v-if="isNewAccountVisible"
      @hide-new-account-modal="isNewAccountVisible = false"
    />

    <EditCurrentAccount
      v-if="isShowEditCurrentAccount"
      :account-to-edit="accountToEdit"
      @hide-edit-current-account="isShowEditCurrentAccount = false"
    />
  </div>
</template>

<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NewAccount from "@/components/accounts/NewAccount.vue"
import AccountsList from "@/components/accounts/AccountsList.vue"
import EditCurrentAccount from "@/components/accounts/EditCurrentAccount.vue"
import NavTop from "@/components/shared/NavTop.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref, reactive } from "vue"

export interface AccountToEdit {
  sum: number
  title: string
  symbol: string
  index: number
}

export interface NavTopPropLinks {
  icon: string
  linkName: string
}

const links: NavTopPropLinks[] = [
  { icon: "fa-solid fa-credit-card", linkName: "accounts" },
  { icon: "fa-solid fa-repeat", linkName: "transfers" }
]

const accountsStore = useAccountsStore()

const isNewAccountVisible = ref(false)

const showNewAccount = () => {
  isNewAccountVisible.value = true
}

const showEditIcon = () => {
  editMode.value = !editMode.value
}

//edit mode
const editMode = ref(false)

const isShowEditCurrentAccount = ref(false)
const accountToEdit = reactive({
  sum: 0,
  symbol: "",
  title: "",
  index: 0
})

const showEditCurrentAccount = (account: AccountToEdit) => {
  Object.assign(accountToEdit, account)
  isShowEditCurrentAccount.value = true
}
</script>
<style lang="css" scoped>
.accountsView__wrapper {
  position: relative;
}
</style>
