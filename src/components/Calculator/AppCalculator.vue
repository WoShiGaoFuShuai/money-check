<template>
  <div
    role="calculator"
    class="calculator"
  >
    <div
      class="display"
      role="display"
    >
      <span role="outputBeforeOperator">{{ calculatorStore.outputBeforeOperator }}</span>
      <span
        v-show="calculatorStore.currentOperator"
        class="currentOperator"
        role="currentOperator"
        >{{ calculatorStore.currentOperator }}</span
      >
      <span role="outputAfterOperator">{{ calculatorStore.outputAfterOperator }}</span>
      <div>
        <button
          v-if="calculatorStore.outputAfterOperator !== ''"
          role="equalButton"
          class="equal"
          @click="equalButtonHandler"
        >
          <font-awesome-icon icon="fa-solid fa-equals" />
        </button>

        <button
          v-if="
            calculatorStore.outputBeforeOperator !== '' &&
            calculatorStore.outputAfterOperator === ''
          "
          class="equal"
          role="resetButton"
          @click="clearField"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </div>
    </div>

    <ButtonOperator
      :operator="'+'"
      role="buttonOperatorPlus"
      @send-current-operator-to-parent="changeCurrentOperator"
    />

    <ButtonNumber
      :num="1"
      role="num1"
      @send-to-parent-number="getNumber"
    />

    <ButtonNumber
      :num="2"
      role="num2"
      @send-to-parent-number="getNumber"
    />

    <ButtonNumber
      :num="3"
      @send-to-parent-number="getNumber"
    />

    <ButtonOperator
      :operator="'-'"
      role="buttonOperatorMinus"
      @send-current-operator-to-parent="changeCurrentOperator"
    />
    <ButtonNumber
      :num="4"
      @send-to-parent-number="getNumber"
    />
    <ButtonNumber
      :num="5"
      @send-to-parent-number="getNumber"
    />
    <ButtonNumber
      :num="6"
      @send-to-parent-number="getNumber"
    />

    <ButtonOperator
      :operator="'*'"
      @send-current-operator-to-parent="changeCurrentOperator"
    />
    <ButtonNumber
      :num="7"
      @send-to-parent-number="getNumber"
    />
    <ButtonNumber
      :num="8"
      @send-to-parent-number="getNumber"
    />
    <ButtonNumber
      :num="9"
      @send-to-parent-number="getNumber"
    />

    <ButtonOperator
      :operator="'/'"
      @send-current-operator-to-parent="changeCurrentOperator"
    />

    <button
      role="dot"
      @click="getDot"
    >
      .
    </button>
    <ButtonNumber
      :num="0"
      role="num0"
      @send-to-parent-number="getNumber"
    />

    <button
      role="deleteButton"
      @click="handleDelete"
    >
      <font-awesome-icon icon="fa-solid fa-delete-left" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue"
import ButtonNumber from "@/components/calculator/ButtonNumber.vue"
import ButtonOperator from "@/components/calculator/ButtonOperator.vue"
import { useCategoriesStore } from "@/stores/categories"
import { useCalculatorStore } from "@/stores/calculator"

const categoriesStore = useCategoriesStore()
const calculatorStore = useCalculatorStore()

const clearField = () => {
  calculatorStore.clearField()
  categoriesStore.changeShowCategoriesExpenses(false)

  const display = document.querySelector(".display")
  display?.classList.remove("display-error")
}

const getNumber = (number: number): void => {
  calculatorStore.getNumber(number)
}

const getDot = () => {
  calculatorStore.getDot()
}

const changeCurrentOperator = (operator: string) => {
  calculatorStore.changeCurrentOperator(operator)
}

const equalButtonHandler = () => {
  calculatorStore.equalButtonHandler()
}

const handleDelete = () => {
  calculatorStore.deleteButtonHandler()
}

watch(
  () => calculatorStore.outputBeforeOperator,
  (newVal: string, oldVal: string) => {
    if (newVal.length && !oldVal.length) {
      categoriesStore.changeShowCategoriesExpenses(true)
    }
  }
)
</script>

<style lang="css" scoped>
.calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 16px;
}

.display {
  position: relative;
  grid-column: 1 / span 4;
  text-align: right;
  padding: 8px;
  font-size: 18px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  min-height: 44px;
}

button {
  grid-column: span 1;
  padding: 8px;
  font-size: 18px;
  background-color: var(--calc-bg-button);
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}

.equal {
  position: absolute;
  top: 3px;
  right: 8px;
  font-size: 16px;
  background-color: transparent;
  border: none;
}

.currentOperator {
  padding: 0 12px;
}

.display-error {
  color: var(--error-text);
}
</style>
