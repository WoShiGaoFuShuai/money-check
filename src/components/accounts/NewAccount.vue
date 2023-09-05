<template>
  <div class="newAccount__wrapper">
    <TopNavbar
      :title="'New Account'"
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
            @emit-selected-item="receiveSelectedItem"
          />
        </div>
      </div>

      <div
        class="error"
        role="error"
      >
        Please fill out all inputs
      </div>

      <div class="newAccount__button-wrapper">
        <font-awesome-icon
          class="btn__primary"
          icon="fa-solid fa-check"
          role="addNewAccountBtn"
          @click="addNewAccount"
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
import { ref } from "vue"

const emit = defineEmits(["hideNewAccountModal"])

const accountsStore = useAccountsStore()

const accountNameInput = ref("")
const accountBalanceInput = ref(0)
const receivedCurrencySymbol = ref("")

const receiveSelectedItem = (currencySymbol: string) => {
  receivedCurrencySymbol.value = currencySymbol
}

//add new account
const addNewAccount = () => {
  if (accountNameInput.value.trim().length) {
    const newAccount = {
      title: accountNameInput.value,
      sum: accountBalanceInput.value,
      currency: receivedCurrencySymbol.value,
      active: false
    }
    accountsStore.addNewAccount(newAccount)

    accountNameInput.value = ""
    accountBalanceInput.value = 0
    receivedCurrencySymbol.value = ""

    emit("hideNewAccountModal")
  } else {
    const errorDiv = document.querySelector(".error") as HTMLElement
    errorDiv.style.display = "block"
  }
}

// change account balance + -
const changeAccountBalance = () => {
  if (accountBalanceInput.value !== 0) {
    console.log("123")
    accountBalanceInput.value = -accountBalanceInput.value
  }
  return
}
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

.error {
  display: none;
  margin-top: 8px;
}
</style>
