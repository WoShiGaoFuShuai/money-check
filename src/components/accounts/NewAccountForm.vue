<template>
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
          :all-currency="props.currencies"
          @emit-selected-item="receiveSelectedItem"
        />
      </div>
    </div>

    <AppError :error="errorMsg" />

    <div class="newAccount__button-wrapper">
      <font-awesome-icon
        class="btn__primary"
        icon="fa-solid fa-check"
        role="addNewAccountBtn"
        @click="addNewAccount"
      />

      <font-awesome-icon
        class="btn__primary"
        icon="fa-solid fa-xmark"
        role="closeNewAccountBtn"
        @click="cancelAddingNewAccount"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import NewAccountsCurrencySelect from "@/components/accounts/NewAccountsCurrencySelect.vue"
import AppError from "@/components/shared/AppError.vue"
import { ref } from "vue"
import type { Currency } from "@/stores/accounts"

const emit = defineEmits(["hideNewAccountModal", "accountsStoreAddNewAcc"])

const props = defineProps({
  currencies: {
    type: Array as () => Currency[],
    required: true
  }
})

const accountNameInput = ref("")
const accountBalanceInput = ref(0)
const receivedCurrencySymbol = ref("")
const errorMsg = ref<string>("")

// change account balance + -
const changeAccountBalance = () => {
  if (accountBalanceInput.value !== 0) {
    accountBalanceInput.value = -accountBalanceInput.value
  }
  return
}

const receiveSelectedItem = (currencySymbol: string) => {
  receivedCurrencySymbol.value = currencySymbol
}

const cancelAddingNewAccount = () => {
  emit("hideNewAccountModal")
}

const addNewAccount = () => {
  if (accountNameInput.value.trim().length) {
    const newAccount = {
      title: accountNameInput.value,
      sum: accountBalanceInput.value,
      currency: receivedCurrencySymbol.value,
      active: false
    }
    emit("accountsStoreAddNewAcc", newAccount)

    accountNameInput.value = ""
    accountBalanceInput.value = 0
    receivedCurrencySymbol.value = ""
    errorMsg.value = ""
  } else {
    errorMsg.value = " Please fill out all inputs"
  }
}
</script>
<style lang="css" scoped>
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
