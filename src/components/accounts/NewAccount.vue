<template>
  <div class="newAccount__wrapper">
    <TopNavbar
      :title="'New Account'"
      :right-icons="[{ icon: 'fa solid fa-pencil' }, { icon: 'fa solid fa-plus' }]"
    />

    <NewAccountForm
      :currencies="accountsStore.currencies"
      role="NewAccountFormComponent"
      @hide-new-account-modal="hideNewAccountModal"
      @accounts-store-add-new-acc="addNewAccount"
    />

    <template v-if="errorMsg.length">
      <AppError
        class="error__wrapper"
        :error="errorMsg"
      />
    </template>

    <h3 class="new__account-text">
      Can't find the currency you need?
      <br />
      <router-link
        class="link"
        :to="{ name: 'settings' }"
      >
        <span class="settings"> Go to Settings </span>
      </router-link>
    </h3>
  </div>
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NewAccountForm from "@/components/accounts/NewAccountForm.vue"
import { useAccountsStore } from "@/stores/accounts"
import AppError from "@/components/shared/AppError.vue"
import type { Account } from "@/stores/accounts"
import { ref } from "vue"

const emit = defineEmits(["hideNewAccountModal"])

const accountsStore = useAccountsStore()

const hideNewAccountModal = () => {
  emit("hideNewAccountModal")
}

//add new account
const addNewAccount = (newAccount: Account) => {
  try {
    accountsStore.addNewAccount(newAccount)
    errorMsg.value = ""
    hideNewAccountModal()
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = error.message
    }
  }
}

const errorMsg = ref<string>("")
</script>
<style lang="css" scoped>
.newAccount__wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100vh;
}

.settings {
  color: var(--blue-primary);
}

.new__account-text {
  margin-top: 32px;
  text-align: center;
}

.link {
  text-decoration: none;
}

.error__wrapper {
  margin-top: 16px;
}
</style>
