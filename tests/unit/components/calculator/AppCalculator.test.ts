import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"
import { setActivePinia } from "pinia"
// import AppCalculator from "@/components/calculator/AppCalculator.vue"
import AppCalculator from "../../../../src/components/calculator/AppCalculator.vue"
import userEvent from "@testing-library/user-event"
import { useCalculatorStore } from "../../../../src/stores/calculator"
// import { useCalculatorStore } from "@/stores/calculator.ts"

describe("AppCalculator", () => {
  beforeEach(() => {
    const pinia = createTestingPinia()
    setActivePinia(pinia)
  })

  // describe("when we first open the app", () => {
  //   it("displays 0 at the display bar", () => {
  //     const calculatorStore = useCalculatorStore()

  //     render(AppCalculator, {
  //       global: {
  //         stubs: {
  //           FontAwesomeIcon: true
  //         }
  //       }
  //     })

  //     const display = screen.getByRole("display")
  //     expect(display.textContent).toBe("0")
  //   })

  //   it("doesnt show equal button", () => {
  //     render(AppCalculator, {
  //       global: {
  //         stubs: {
  //           FontAwesomeIcon: true
  //         }
  //       }
  //     })
  //     const equalButton = screen.queryByRole("equalButton")

  //     expect(equalButton).not.toBeInTheDocument()
  //   })
  // })

  // describe("when we press on the number", () => {
  it.only("displays the number that was pressed", async () => {
    render(AppCalculator, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const num2 = screen.getByRole("num2")
    await userEvent.click(num2)

    const outputBeforeOperator = screen.getByRole("outputBeforeOperator")
    expect(outputBeforeOperator.textContent).toEqual("2")
  })
  // })

  // describe("when we have 2 outputs", () => {
  //   it("displays equal button", async () => {
  //     render(AppCalculator)

  //     const num1 = screen.getByRole("num1")
  //     const num2 = screen.getByRole("num2")
  //     const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")

  //     await userEvent.click(num1)
  //     await userEvent.click(buttonOperatorPlus)
  //     await userEvent.click(num2)

  //     const equalButton = screen.getByRole("equalButton")
  //     expect(equalButton).toBeInTheDocument()
  //   })

  //   // describe("and when we press equal button", () => {
  //   //   it("the result should be shown in the display bar", async () => {
  //   //     render(AppCalculator)

  //   //     const num1 = screen.getByRole("num1")
  //   //     const num2 = screen.getByRole("num2")
  //   //     const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")

  //   //     await userEvent.click(num1)
  //   //     await userEvent.click(buttonOperatorPlus)
  //   //     await userEvent.click(num2)

  //   //     const equalButton = screen.getByRole("equalButton")
  //   //     await userEvent.click(equalButton)

  //   //     const display = screen.getByRole("display")
  //   //     const result = parseInt(num1.textContent ?? "0") + parseInt(num2.textContent ?? "0")
  //   //     expect(display.textContent).toBe(result.toString())
  //   //   })
  //   // })
  // })

  // describe("when we press on the equal button and results is 0", () => {
  //   describe("and we press on another number", () => {
  //     it("displays pressed number insted of 0", async () => {
  //       render(AppCalculator)

  //       const num1 = screen.getByRole("num1")
  //       const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //       await userEvent.click(num1)
  //       await userEvent.click(buttonOperatorMinus)
  //       await userEvent.click(num1)

  //       const equalButton = screen.getByRole("equalButton")
  //       await userEvent.click(equalButton)

  //       const display = screen.getByRole("display")
  //       const result = parseInt(num1.textContent ?? "0") - parseInt(num1.textContent ?? "0")
  //       expect(display.textContent).toBe(result.toString())

  //       await userEvent.click(num1)
  //       expect(display.textContent).toBe(parseInt(num1.textContent ?? "0").toString())
  //     })
  //   })
  // })

  // describe("when output after operator is 0 and we press another button", () => {
  //   it("displays pressed number insted of 0", async () => {
  //     render(AppCalculator)

  //     const num1 = screen.getByRole("num1")
  //     const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
  //     const num0 = screen.getByRole("num0")

  //     await userEvent.click(num1)
  //     await userEvent.click(buttonOperatorMinus)
  //     await userEvent.click(num0)
  //     await userEvent.click(num1)

  //     const outputAfterOperator = screen.getByRole("outputAfterOperator")
  //     expect(outputAfterOperator.textContent).toBe(parseInt(num1.textContent ?? "0").toString())
  //   })
  // })

  // describe("when we add . to the outputs", () => {
  //   describe("when the output before operator is 0 by default", () => {
  //     it("should add . to it, so the result of output before operator will be 0.", async () => {
  //       render(AppCalculator)

  //       const dot = screen.getByRole("dot")
  //       await userEvent.click(dot)

  //       const outputBeforeOperator = screen.getByRole("outputBeforeOperator")
  //       expect(outputBeforeOperator.textContent).toEqual("0.")
  //     })
  //   })

  //   // describe("and when the output after operator is not showing and user presses dot", () => {
  //   //   it("should add . to it, so the result of output after operator will be 0.", async () => {
  //   //     render(AppCalculator)

  //   //     const num1 = screen.getByRole("num1")
  //   //     const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //   //     await userEvent.click(num1)
  //   //     await userEvent.click(buttonOperatorMinus)

  //   //     let outputAfterOperator = screen.getByRole("outputAfterOperator")
  //   //     expect(outputAfterOperator.textContent?.length).toEqual(0)

  //   //     const dot = screen.getByRole("dot")
  //   //     await userEvent.click(dot)

  //   //     outputAfterOperator = screen.getByRole("outputAfterOperator")
  //   //     expect(outputAfterOperator.textContent).toBe("0.")
  //   //   })
  //   // })

  //   // describe("clearField Function", () => {
  //   //   describe("when user clicks on C button while display is on default value of 0", () => {
  //   //     it("should keep 0 into display bar", async () => {
  //   //       render(AppCalculator)

  //   //       const resetButton = screen.getByRole("resetButton")
  //   //       await userEvent.click(resetButton)

  //   //       const outputBeforeOperator = screen.getByRole("outputBeforeOperator")
  //   //       expect(outputBeforeOperator.textContent).toEqual("0")
  //   //     })

  //   //     // describe("when user clicks on C button while display has output before operator, operator and output after operator", () => {
  //   //     //   it("display bar should shows 0", async () => {
  //   //     //     render(AppCalculator)

  //   //     //     const num1 = screen.getByRole("num1")
  //   //     //     const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //   //     //     await userEvent.click(num1)
  //   //     //     await userEvent.click(buttonOperatorMinus)
  //   //     //     await userEvent.click(num1)

  //   //     //     const resetButton = screen.getByRole("resetButton")
  //   //     //     await userEvent.click(resetButton)

  //   //     //     const display = screen.getByRole("display")
  //   //     //     expect(display.textContent).toBe("0")
  //   //     //   })

  //   //     //   it("should hide button equal", async () => {
  //   //     //     render(AppCalculator)

  //   //     //     const num1 = screen.getByRole("num1")
  //   //     //     const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //   //     //     await userEvent.click(num1)
  //   //     //     await userEvent.click(buttonOperatorMinus)
  //   //     //     await userEvent.click(num1)

  //   //     //     let equalButton = screen.getByRole("equalButton")
  //   //     //     expect(equalButton).toBeInTheDocument()

  //   //     //     const resetButton = screen.getByRole("resetButton")
  //   //     //     await userEvent.click(resetButton)

  //   //     //     equalButton = screen.queryByRole("equalButton")!
  //   //     //     expect(equalButton).not.toBeInTheDocument()
  //   //     //   })
  //   //     // })
  //   //   })
  //   // })

  //   // describe("changeCurrentOperator", () => {
  //   //   describe("when we press on the operator", () => {
  //   //     it("shows correct operator", async () => {
  //   //       render(AppCalculator)

  //   //       const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
  //   //       await userEvent.click(buttonOperatorMinus)

  //   //       const currentOperator = screen.getByRole("currentOperator")
  //   //       expect(currentOperator.textContent).toEqual(currentOperator.textContent)
  //   //     })

  //   //     it("doesnt show equal button", async () => {
  //   //       render(AppCalculator)

  //   //       const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //   //       await userEvent.click(buttonOperatorMinus)
  //   //       const equalButton = screen.queryByRole("equalButton")
  //   //       expect(equalButton).not.toBeInTheDocument()
  //   //     })
  //   //   })

  //   //   // describe("when user already pressed operator and decided to press another one", () => {
  //   //   //   it("should change previous operator to the new one", async () => {
  //   //   //     render(AppCalculator)

  //   //   //     const num1 = screen.getByRole("num1")
  //   //   //     const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

  //   //   //     await userEvent.click(num1)
  //   //   //     await userEvent.click(buttonOperatorMinus)

  //   //   //     let currentOperator = screen.getByRole("currentOperator")
  //   //   //     expect(currentOperator.textContent).toBe("-")

  //   //   //     const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")
  //   //   //     await userEvent.click(buttonOperatorPlus)

  //   //   //     currentOperator = screen.getByRole("currentOperator")
  //   //   //     expect(currentOperator.textContent).toBe("+")
  //   //   //   })
  //   //   // })
  //   // })
  // })
})
