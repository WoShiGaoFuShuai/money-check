import { createPinia, setActivePinia } from "pinia"
import { useCalculatorStore } from "../../../src/stores/calculator"

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("actions", () => {
    describe("getNumber", () => {
      it("changes outputBeforeOperator", () => {
        const num = 2
        const calculatorStore = useCalculatorStore()
        calculatorStore.getNumber(num)
        expect(calculatorStore.outputBeforeOperator).toBe(num.toString())
      })
    })

    describe("clearField", () => {
      it("clears the field", () => {
        const calculatorStore = useCalculatorStore()

        calculatorStore.outputBeforeOperator = "11"
        calculatorStore.outputAfterOperator = "2"
        calculatorStore.currentOperator = "+"

        calculatorStore.clearField()

        expect(calculatorStore.outputBeforeOperator).toBe("")
        expect(calculatorStore.outputAfterOperator).toBe("")
        expect(calculatorStore.currentOperator).toBe(null)
      })
    })

    describe("getDot", () => {
      describe("when we do not have current operator", () => {
        describe("and first number already exists on the display bar & and it has no dot", () => {
          it("adds dot to the first number", () => {
            const calculatorStore = useCalculatorStore()
            calculatorStore.currentOperator = null
            calculatorStore.outputBeforeOperator = "1"

            calculatorStore.getDot()
            expect(calculatorStore.outputBeforeOperator).toBe("1.")
          })
        })

        describe("there is nothing on display bar", () => {
          it("adds number 0 with a dot", () => {
            const calculatorStore = useCalculatorStore()
            calculatorStore.outputBeforeOperator = ""

            calculatorStore.getDot()
            expect(calculatorStore.outputBeforeOperator).toBe("0.")
          })
        })
      })

      describe("when we have current operator", () => {
        describe("and the second number already exists on the display bar & and it has no dot", () => {
          it("adds dot to the second number", () => {
            const calculatorStore = useCalculatorStore()
            calculatorStore.outputBeforeOperator = "5"
            calculatorStore.currentOperator = "+"
            calculatorStore.outputAfterOperator = "1"

            calculatorStore.getDot()
            expect(calculatorStore.outputAfterOperator).toBe("1.")
          })
        })

        describe("and the second number is not on the display bar", () => {
          it("adds 0 and dot to the second number", () => {
            const calculatorStore = useCalculatorStore()
            calculatorStore.outputBeforeOperator = "5"
            calculatorStore.currentOperator = "+"
            calculatorStore.outputAfterOperator = ""

            calculatorStore.getDot()
            expect(calculatorStore.outputAfterOperator).toBe("0.")
          })
        })
      })
    })
  })
})
