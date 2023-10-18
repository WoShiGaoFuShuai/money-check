<template>
  <div
    class="exchangeRate__wrapper"
    @click="close"
  >
    <form
      class="exchangeRate__form"
      @click.stop
      @submit.prevent="handleSubmit"
    >
      <div class="exchangeRate__top-wrapper">
        <div class="exchangeRate__top-item">
          <label
            class="exchangeRate__currency"
            for="first"
          >
            {{ props.debitAccount.currency }}
          </label>
          <input
            id="first"
            v-model="firstAmountInput"
            type="number"
            class="exchangeRate__top-item__input"
            placeholder="transfer amount"
            required
            role="debitInput"
          />
        </div>

        <div class="exchangeRate__top-item">
          <label
            class="exchangeRate__currency"
            for="second"
          >
            {{ props.creditAccount.currency }}
          </label>
          <input
            id="second"
            v-model="secondAmountInput"
            type="number"
            class="exchangeRate__top-item__input"
            placeholder="will be credited"
            required
            role="creditInput"
          />
        </div>
      </div>

      <div class="exchangeRate__bottom-wrapper">
        <p class="exchangeRate__bottom-title">Exchange rate</p>
        <div class="exchangeRate__bottom-item">
          <label
            for="exchange__first"
            class="exchangeRate__currency-left"
            >1 <span>{{ props.debitAccount.currency }}</span> =</label
          >
          <input
            id="exchange__first"
            v-model="firstExchangeRateInput"
            type="text"
            class="exchangeRate__bottom-item__input"
            role="firstExchangeRateInput"
          />
          <span class="exchangeRate__currency-right"> {{ props.creditAccount.currency }} </span>
        </div>

        <div class="exchangeRate__bottom-item">
          <label
            for="exchange__second"
            class="exchangeRate__currency-left"
            >1 <span>{{ props.creditAccount.currency }}</span> =</label
          >
          <input
            id="exchange__second"
            v-model="secondExchangeRateInput"
            type="text"
            class="exchangeRate__bottom-item__input"
            role="secondExchangeRateInput"
          />
          <span class="exchangeRate__currency-right"> {{ props.debitAccount.currency }} </span>
        </div>
      </div>

      <div class="exchangeRate__btns">
        <button
          type="button"
          class="exchangeRate__btns-item btn__primary-form"
          role="closeButton"
          @click="close"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>

        <button
          type="submit"
          class="exchangeRate__btns-item btn__primary-form"
          role="submitButton"
        >
          <font-awesome-icon icon="fa-solid fa-check" />
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref, type Ref, computed, watch } from "vue"
import type { Account } from "@/stores/accounts"

const emit = defineEmits(["closeTransferExchangeRate", "submitTransferWithDifferentCurrency"])

const props = defineProps({
  debitAccount: {
    type: Object as () => Account,
    required: true
  },
  creditAccount: {
    type: Object as () => Account,
    required: true
  }
})

const firstAmountInput: Ref<null | number> = ref(null)
const secondAmountInput: Ref<null | number> = ref(null)
const firstExchangeRateInput: Ref<null | number> = ref(null)
const secondExchangeRateInput: Ref<null | number> = ref(null)

const exchangeRateFirst = computed(() => {
  if (
    firstAmountInput.value !== null &&
    firstAmountInput.value > 0 &&
    secondAmountInput.value !== null &&
    secondAmountInput.value > 0
  ) {
    const res = (secondAmountInput.value / firstAmountInput.value).toFixed(7)
    return Number(res)
  }

  return null
})

const exchangeRateSecond = computed(() => {
  if (
    firstAmountInput.value !== null &&
    firstAmountInput.value > 0 &&
    secondAmountInput.value !== null &&
    secondAmountInput.value > 0
  ) {
    const res = (firstAmountInput.value / secondAmountInput.value).toFixed(7)
    return Number(res)
  }

  return null
})

const handleSubmit = () => {
  const dataDebitCredit = {
    debitAmount: firstAmountInput.value,
    creditAmount: secondAmountInput.value
  }

  emit("submitTransferWithDifferentCurrency", dataDebitCredit)
  emit("closeTransferExchangeRate")
}

watch(exchangeRateFirst, (newVal) => {
  firstExchangeRateInput.value = newVal
})

watch(exchangeRateSecond, (newVal) => {
  secondExchangeRateInput.value = newVal
})

const close = () => {
  emit("closeTransferExchangeRate")
}
</script>
<style lang="css" scoped>
.exchangeRate__wrapper {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
}

.exchangeRate__form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 3px 3px 24px 10px rgba(0, 0, 0, 0.3);

  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
}

.exchangeRate__top-wrapper,
.exchangeRate__bottom-wrapper {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.exchangeRate__top-item,
.exchangeRate__bottom-item {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.exchangeRate__currency,
.exchangeRate__currency-left {
  max-width: 50px;
  width: 100%;
  display: inline-block;
  text-align: center;
}

.exchangeRate__currency-left {
  max-width: 60px;
  margin-right: 4px;
}

.exchangeRate__top-item__input,
.exchangeRate__bottom-item__input {
  background-color: var(--blue-secondary);
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 4px;
}

.exchangeRate__bottom-item__input {
  margin-right: 4px;
}

.exchangeRate__top-item__input:focus,
.exchangeRate__bottom-item__input:focus {
  outline: 1px solid var(--blue-primary);
}

.exchangeRate__bottom-title {
  text-align: center;
  font-size: 14px;
  margin-bottom: 12px;
}

.exchangeRate__currency-right {
  max-width: 40px;
  width: 100%;
}

.exchangeRate__btns {
  max-width: 200px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
