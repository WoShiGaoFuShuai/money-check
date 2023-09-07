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
      @hideEditCurrentAccount="isShowEditCurrentAccount = false"
    />
  </div>
</template>

<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NewAccount from "@/components/accounts/NewAccount.vue"
import AccountsList from "@/components/accounts/AccountsList.vue"
import EditCurrentAccount from "@/components/accounts/EditCurrentAccount.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref, reactive } from "vue"

export interface AccountToEdit {
  sum: number
  title: string
  symbol: string
  index: number
}

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
.nav-top {
  background-color: var(--grey-primary);
  padding: 48px 4px 4px 4px;
}

.nav-top__ul {
  display: flex;
  justify-content: space-around;
}
</style>
