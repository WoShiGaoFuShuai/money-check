<template>
  <div class="addNewCurrency__modal-wrapper">
    <div class="addNewCurrency__modal-form__wrapper">
      <div class="addNewCurrency__form addNewCurrency__newCurrency-form">
        <div class="addNewCurrency__form-title">
          <p class="addNewCurrency__form-title__text">New currency</p>
        </div>
        <div class="form__item">
          <label
            class="form__label-title"
            for="currency"
            >Currency</label
          >
          <input
            id="currency"
            v-model="currencyInput"
            type="text"
            class="form__input"
            placeholder="name for currency"
            role="currencyInput"
          />
        </div>

        <div class="form__item">
          <label
            class="form__label-title form__label-title--balance"
            for="symbol"
            >Symbol
          </label>
          <input
            id="symbol"
            v-model="currencySymbolInput"
            type="text"
            class="form__input"
            placeholder="symbol for currency"
            role="currencySymbolInput"
          />
        </div>

        <div
          class="error"
          role="error"
        >
          Please, fill out all inputs
        </div>
      </div>
      <div class="button__wrapper">
        <button
          class="button__primary button__padding buttom__primary--margin"
          @click="addNewCurrency"
          role="addNewCurrencyBtn"
        >
          <font-awesome-icon icon="fa-solid fa-check" />
        </button>
        <button
          class="button__primary button__padding"
          @click="close"
          role="closeBtn"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useAccountsStore } from "@/stores/accounts"

const emit = defineEmits(["close"])

const currencyInput = ref("")
const currencySymbolInput = ref("")
const accountsStore = useAccountsStore()

//add new currency to the store
const addNewCurrency = () => {
  if (currencyInput.value.trim() && currencySymbolInput.value.trim()) {
    accountsStore.addCurrency({
      currency: currencyInput.value,
      symbol: currencySymbolInput.value
    })

    currencyInput.value = ""
    currencySymbolInput.value = ""
    emit("close")
  } else {
    const errorDiv = document.querySelector(".error") as HTMLElement
    errorDiv.style.display = "block"
  }
}

const close = () => {
  emit("close")
}
</script>
<style lang="css" scoped>
.addNewCurrency__modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 24px 16px;
}

.addNewCurrency__modal-form__wrapper {
  background: white;
  box-shadow: 0px 0px 58px rgba(58, 134, 255, 0.7);
  border-radius: 12px;
}

.addNewCurrency__form {
  display: flex;
  flex-direction: column;
}

.addNewCurrency__newCurrency-form {
  padding: 24px 4px 16px 4px;
  border-radius: 4px;
  color: rgb(58, 134, 255);
}

.form__item {
  display: flex;
  margin-bottom: 8px;
  padding: 8px;
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
  border-radius: 4px;
  border: 1px solid var(--blue-primary);
}

.form__label-title--balance {
  display: flex;
}

.button__wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
}

.button__primary {
  outline: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--blue-primary);
  color: white;
  cursor: pointer;
}

.buttom__primary--margin {
  margin-right: 8px;
}

.button__primary:hover {
  background-color: var(--blue-secondary);
}

.addNewCurrency__form-title {
  text-align: center;
  margin-bottom: 16px;
}
.addNewCurrency__form-title__text {
  font-weight: 700;
}

.button__padding {
  padding: 4px 8px;
}
</style>
