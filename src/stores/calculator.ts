import { defineStore } from "pinia"
import { ref } from "vue"
import type { Ref } from "vue"
import { Calc } from "calc-js"
import { useCategoriesStore } from "@/stores/categories"

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    outputBeforeOperator: ref("") as Ref<string>,
    outputAfterOperator: ref("") as Ref<string>,
    currentOperator: ref(null) as Ref<string | null>
  }),
  actions: {
    clearField() {
      this.outputBeforeOperator = ""
      this.outputAfterOperator = ""
      this.currentOperator = null
    },
    getNumber(number: number) {
      if (this.currentOperator === null) {
        this.outputBeforeOperator =
          this.outputBeforeOperator === "0" ? `${number}` : `${this.outputBeforeOperator}${number}`
      } else {
        this.outputAfterOperator =
          this.outputAfterOperator === "0" ? `${number}` : `${this.outputAfterOperator}${number}`
      }
    },
    getDot() {
      if (this.currentOperator === null) {
        if (!this.outputBeforeOperator.includes(".") && this.outputBeforeOperator.length > 0) {
          this.outputBeforeOperator += "."
        } else if (
          !this.outputBeforeOperator.includes(".") &&
          this.outputBeforeOperator.length === 0
        ) {
          this.outputBeforeOperator += "0."
        }
      } else {
        if (!this.outputAfterOperator.includes(".") && this.outputAfterOperator.length > 0) {
          this.outputAfterOperator += "."
        } else if (
          !this.outputAfterOperator.includes(".") &&
          this.outputAfterOperator.length === 0
        ) {
          this.outputAfterOperator += "0."
        }
      }
    },
    changeCurrentOperator(operator: string) {
      if (this.outputBeforeOperator !== "") {
        this.currentOperator = operator
      }
    },
    equalButtonHandler() {
      if (this.outputAfterOperator !== "") {
        let numericResult: number = 0

        const outputBeforeOperatorNum: number = parseFloat(this.outputBeforeOperator)
        const outputAfterOperatorNum: number = parseFloat(this.outputAfterOperator)

        switch (this.currentOperator) {
          case "+":
            numericResult = new Calc(outputBeforeOperatorNum).sum(outputAfterOperatorNum).finish()
            break
          case "-":
            numericResult = new Calc(outputBeforeOperatorNum).minus(outputAfterOperatorNum).finish()
            break
          case "/":
            numericResult = new Calc(outputBeforeOperatorNum)
              .divide(outputAfterOperatorNum)
              .finish()
            break
          case "*":
            numericResult = new Calc(outputBeforeOperatorNum)
              .multiply(outputAfterOperatorNum)
              .finish()
            break
          default:
            console.log("ERROR! Some problem with operator!")
        }

        this.outputBeforeOperator = numericResult.toString()
        this.outputAfterOperator = ""
        this.currentOperator = null
      }
    },
    deleteButtonHandler() {
      if (this.currentOperator !== null) {
        if (this.outputAfterOperator.length) {
          this.outputAfterOperator = this.outputAfterOperator.slice(0, -1)
        } else if (!this.outputAfterOperator.length) {
          this.currentOperator = null
        }
      } else if (this.currentOperator === null) {
        this.outputBeforeOperator = this.outputBeforeOperator.slice(0, -1)
        if (this.outputBeforeOperator.length < 1) {
          const categoriesStore = useCategoriesStore()
          categoriesStore.changeShowCategoriesExpenses(false)
        }
      }
    }
  }
})
