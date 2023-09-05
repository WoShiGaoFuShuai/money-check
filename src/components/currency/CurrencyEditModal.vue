<template>
  <div class="edit__modal-wrapper">
    <div class="edit__modal-form__wrapper">
      <div class="edit__form newAccount__newCurrency-form">
        <div class="edit__form-title">
          <p class="edit__form-title__text">Editing</p>
        </div>
        <div class="form__item">
          <label
            class="form__label-title"
            for="currency"
            >Currency</label
          >
          <input
            id="currency"
            v-model.lazy="currencyInput"
            type="text"
            class="form__input"
            placeholder="name for currency"
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
            v-model.lazy="currencySymbolInput"
            type="text"
            class="form__input"
            placeholder="symbol for currency"
          />
        </div>

        <div class="error">Please, fill out all inputs</div>
      </div>
      <div class="button__wrapper">
        <button
          class="button__primary button__padding buttom__primary--margin"
          @click="saveEditCurrency"
        >
          <font-awesome-icon icon="fa-solid fa-check" />
        </button>
        <button
          class="button__primary button__padding"
          @click="close"
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

const props = defineProps({
  initialCurrencyName: {
    type: String as () => string,
    required: true
  },
  initialCurrencySymbol: {
    type: String as () => string,
    required: true
  },
  initialCurrencyIndex: {
    type: Number as () => number,
    required: true
  }
})

const emit = defineEmits(["close"])

const currencyInput = ref(props.initialCurrencyName)
const currencySymbolInput = ref(props.initialCurrencySymbol)
const accountsStore = useAccountsStore()

const close = () => {
  emit("close")
}

//save edited currency to the store
const saveEditCurrency = () => {
  const newCurrency = {
    currency: currencyInput.value,
    symbol: currencySymbolInput.value
  }

  accountsStore.editCurrency(props.initialCurrencyIndex, newCurrency)
  emit("close")
}
</script>
<style lang="css" scoped>
.edit__modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 24px 16px;
}

.edit__modal-form__wrapper {
  background: white;
  box-shadow: 0px 0px 58px rgba(58, 134, 255, 0.7);
  border-radius: 12px;
}

.edit__form {
  display: flex;
  flex-direction: column;
}

.newAccount__newCurrency-form {
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

.error {
  display: none;
  text-align: center;
  color: var(--error-text);
}

.edit__form-title {
  text-align: center;
  margin-bottom: 16px;
}

.edit__form-title__text {
  font-weight: 700;
}

.button__padding {
  padding: 4px 8px;
}
</style>
