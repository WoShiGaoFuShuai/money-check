<template>
  <div class="newAccount__wrapper">
    <TopNavbar
      :title="'Edit Account'"
      :right-icons="[{ icon: 'fa solid fa-pencil' }, { icon: 'fa solid fa-plus' }]"
    />

    <div class="newAccount__main">
      <div class="newAccount__form">
        <div class="form__item">
          <label
            class="form__label-title"
            for="name"
            >Name</label
          >
          <input
            id="name"
            v-model="accountNameInput"
            type="text"
            class="form__input"
            placeholder="name for account"
            role="accountNameInput"
          />
        </div>

        <div class="form__item">
          <label
            class="form__label-title form__label-title--balance"
            for="balance"
            >Balance
            <span
              class="form__label-title--plusMinus"
              role="changeAccountBalanceBtn"
              @click="changeAccountBalance"
              >+/-</span
            ></label
          >
          <input
            id="balance"
            v-model="accountBalanceInput"
            role="accountBalanceInput"
            type="number"
            class="form__input"
            placeholder="insert amount for account"
          />
        </div>
      </div>

      <div class="newAccount__currency">
        <span class="currency__name">Currency</span>
        <div class="currency__item">
          <NewAccountsCurrencySelect
            :all-currency="accountsStore.currencies"
            :current-symbol="props.accountToEdit.symbol"
            @emit-selected-item="receiveSelectedItem"
          />
        </div>
      </div>

      <AppError :error="error" />

      <div class="newAccount__button-wrapper">
        <font-awesome-icon
          class="btn__primary"
          icon="fa-solid fa-check"
          role="editAccountBtn"
          @click="editAccount"
        />

        <font-awesome-icon
          class="btn__primary"
          icon="fa-solid fa-xmark"
          role="closeAccountBtn"
          @click="cancelEditingAccount"
        />
      </div>
    </div>

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
import NewAccountsCurrencySelect from "@/components/accounts/NewAccountsCurrencySelect.vue"
import { useAccountsStore } from "@/stores/accounts"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import { useTransfersStore } from "@/stores/transfers"
import type { AccountToEdit } from "@/views/AccountsView.vue"
import AppError from "@/components/shared/AppError.vue"
import { ref, onMounted, watch } from "vue"

const emit = defineEmits(["hideEditCurrentAccount"])
const props = defineProps({
  accountToEdit: {
    type: Object as () => AccountToEdit,
    required: true
  }
})

const accountsStore = useAccountsStore()
const spendStore = useSpendStore()
const earnStore = useEarnStore()
const transfersStore = useTransfersStore()

const accountNameInput = ref("")
const accountBalanceInput = ref<number>(0)
const receivedCurrencySymbol = ref("")

//edit account
const editAccount = () => {
  error.value = ""
  if (accountNameInput.value.trim() === "" || accountBalanceInput.value === null) {
    error.value = "Inputs can not be empty"
    return
  }

  if (
    accountNameInput.value.trim() === props.accountToEdit.title.trim() &&
    receivedCurrencySymbol.value === props.accountToEdit.symbol &&
    accountBalanceInput.value === props.accountToEdit.sum
  ) {
    error.value = "New account's information is the same with current account"
    return
  }

  const index = props.accountToEdit.index
  const editAccount = {
    title: accountNameInput.value,
    sum: accountBalanceInput.value,
    currency: receivedCurrencySymbol.value
  }

  accountsStore.editAccount(editAccount, index)
  spendStore.changeAccountAndCurrency(props.accountToEdit.title, editAccount)
  earnStore.changeAccountAndCurrency(props.accountToEdit.title, editAccount)
  transfersStore.changeAccountAndCurrency(props.accountToEdit.title, editAccount)

  emit("hideEditCurrentAccount")
  error.value = ""
}

const cancelEditingAccount = () => {
  emit("hideEditCurrentAccount")
}

const changeAccountBalance = () => {
  if (accountBalanceInput.value !== 0) {
    accountBalanceInput.value = -accountBalanceInput.value
  }
  return
}

const receiveSelectedItem = (currencySymbol: string) => {
  receivedCurrencySymbol.value = currencySymbol
}

const error = ref<string>("")

onMounted(() => {
  accountNameInput.value = props.accountToEdit.title
  accountBalanceInput.value = props.accountToEdit.sum
})

watch(accountBalanceInput, (newValue) => {
  const valueAsString = String(newValue)

  if (valueAsString === "" || newValue === null || isNaN(newValue)) {
    accountBalanceInput.value = 0
  }
})
</script>
<style lang="css" scoped>
.newAccount__wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100vh;
}

.newAccount__main {
  background-color: var(--blue-secondary);
  padding: 64px 8px 8px 8px;
}
.newAccount__form {
  display: flex;
  flex-direction: column;
}

.newAccount__newCurrency-form {
  background-color: var(--blue-secondary);
}

.form__item {
  display: flex;
  margin-bottom: 12px;
}

.form__label-title {
  display: inline-block;
  max-width: 100px;
  width: 100%;
  min-width: 80px;
}

.form__input {
  width: 100%;
  padding: 0 8px;
  border: 0;
  outline: none;
}

.form__label-title--balance {
  display: flex;
}
.form__label-title--plusMinus {
  padding: 0 8px;
}

.newAccount__currency {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.newAccount__button-wrapper {
  text-align: center;
  margin-top: 16px;
}

.btn__primary {
  background-color: var(--blue-primary);
  padding: 8px 12px;
  border-radius: 6px;
}

.btn__primary:first-child {
  margin-right: 16px;
}
</style>
