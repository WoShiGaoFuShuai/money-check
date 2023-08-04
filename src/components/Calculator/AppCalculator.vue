<template>
  <div
    role="calculator"
    class="calculator"
  >
    <div
      class="display"
      role="display"
    >
      <span role="outputBeforeOperator">{{ outputBeforeOperator || "0" }}</span>
      <span
        v-show="currentOperator"
        class="currentOperator"
        role="currentOperator"
        >{{ currentOperator }}</span
      >
      <span role="outputAfterOperator">{{ outputAfterOperator }}</span>
      <button
        v-if="outputAfterOperator !== ''"
        role="equalButton"
        class="equal"
        @click="equalButtonHandler"
      >
        =
      </button>
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
      class="clear"
      role="resetButton"
      @click="clearField"
    >
      C
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"
import ButtonNumber from "@/components/calculator/ButtonNumber.vue"
import ButtonOperator from "@/components/calculator/ButtonOperator.vue"

const outputBeforeOperator: Ref<string> = ref("")
const outputAfterOperator: Ref<string> = ref("")
const currentOperator: Ref<string | null> = ref(null)

const clearField = () => {
  outputBeforeOperator.value = ""
  outputAfterOperator.value = ""
  currentOperator.value = null
}

const getNumber = (number: number): void => {
  if (currentOperator.value === null) {
    outputBeforeOperator.value =
      outputBeforeOperator.value === "0" ? `${number}` : `${outputBeforeOperator.value}${number}`
  } else {
    outputAfterOperator.value =
      outputAfterOperator.value === "0" ? `${number}` : `${outputAfterOperator.value}${number}`
  }
}

const getDot = () => {
  if (currentOperator.value === null) {
    if (!outputBeforeOperator.value.includes(".") && outputBeforeOperator.value.length > 0) {
      outputBeforeOperator.value += "."
    } else if (
      !outputBeforeOperator.value.includes(".") &&
      outputBeforeOperator.value.length === 0
    ) {
      outputBeforeOperator.value += "0."
    }
  } else {
    if (!outputAfterOperator.value.includes(".") && outputAfterOperator.value.length > 0) {
      outputAfterOperator.value += "."
    } else if (!outputAfterOperator.value.includes(".") && outputAfterOperator.value.length === 0) {
      outputAfterOperator.value += "0."
    }
  }
}

const changeCurrentOperator = (operator: string) => {
  currentOperator.value = operator
}

const equalButtonHandler = () => {
  if (outputAfterOperator.value !== "") {
    const result = eval(
      `${outputBeforeOperator.value} ${currentOperator.value} ${outputAfterOperator.value}`
    )

    outputBeforeOperator.value = result.toString()
    outputAfterOperator.value = ""
    currentOperator.value = null
  }
}
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
}

.equal {
  position: absolute;
  top: 1px;
  right: 8px;
}

.currentOperator {
  padding: 0 12px;
}
</style>
