import { render, screen } from "@testing-library/vue"
import { setActivePinia, createPinia } from "pinia"
import AppCalculator from "../../../../src/components/calculator/AppCalculator.vue"
import userEvent from "@testing-library/user-event"

describe("AppCalculator", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderAppCalculator = () => {
    render(AppCalculator, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it("displays the number that was pressed", async () => {
    renderAppCalculator()

    const num2 = screen.getByRole("num2")
    await userEvent.click(num2)

    const outputBeforeOperator = screen.getByRole("outputBeforeOperator")
    expect(outputBeforeOperator.textContent).toBe(num2?.textContent?.toString())
  })

  describe("when we have 2 outputs", () => {
    it("displays equal button", async () => {
      renderAppCalculator()

      const num1 = screen.getByRole("num1")
      const num2 = screen.getByRole("num2")
      const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")

      await userEvent.click(num1)
      await userEvent.click(buttonOperatorPlus)
      await userEvent.click(num2)

      const equalButton = screen.getByRole("equalButton")
      expect(equalButton).toBeInTheDocument()
    })

    describe("and when we press equal button", () => {
      it("the result should be shown in the display bar", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num1")
        const num2 = screen.getByRole("num2")
        const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")

        await userEvent.click(num1)
        await userEvent.click(buttonOperatorPlus)
        await userEvent.click(num2)

        const equalButton = screen.getByRole("equalButton")
        await userEvent.click(equalButton)

        const display = screen.getByRole("display")
        const result = parseInt(num1.textContent ?? "0") + parseInt(num2.textContent ?? "0")
        expect(display.textContent).toBe(result.toString())
      })
    })
  })

  describe("when the result after calculaltion is 0", () => {
    describe("and we press on another number", () => {
      it("displays pressed number insted of 0", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num1")
        const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

        await userEvent.click(num1)
        await userEvent.click(buttonOperatorMinus)
        await userEvent.click(num1)

        const equalButton = screen.getByRole("equalButton")
        await userEvent.click(equalButton)

        const display = screen.getByRole("display")
        const result = parseInt(num1.textContent ?? "0") - parseInt(num1.textContent ?? "0")
        expect(display.textContent).toBe(result.toString())

        await userEvent.click(num1)
        expect(display.textContent).toBe(parseInt(num1.textContent ?? "0").toString())
      })
    })
  })

  describe("when output after operator is 0 and we press another button", () => {
    it("displays pressed number insted of 0", async () => {
      renderAppCalculator()

      const num1 = screen.getByRole("num1")
      const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
      const num0 = screen.getByRole("num0")

      await userEvent.click(num1)
      await userEvent.click(buttonOperatorMinus)
      await userEvent.click(num0)
      await userEvent.click(num1)

      const outputAfterOperator = screen.getByRole("outputAfterOperator")
      expect(outputAfterOperator.textContent).toBe(parseInt(num1.textContent ?? "0").toString())
    })
  })

  describe("when we add . to the outputs", () => {
    describe("when display bar shows nothing (default state)", () => {
      it("should add . to the output before operator, so the result of output before operator will be 0.", async () => {
        renderAppCalculator()

        const dot = screen.getByRole("dot")
        await userEvent.click(dot)

        const outputBeforeOperator = screen.getByRole("outputBeforeOperator")
        expect(outputBeforeOperator.textContent).toEqual("0.")
      })
    })

    describe("and when the output after operator is not displayed and user presses dot", () => {
      it("should add . to it, so the result of output after operator will be 0.", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num1")
        const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

        await userEvent.click(num1)
        await userEvent.click(buttonOperatorMinus)

        let outputAfterOperator = screen.getByRole("outputAfterOperator")
        expect(outputAfterOperator.textContent?.length).toEqual(0)

        const dot = screen.getByRole("dot")
        await userEvent.click(dot)

        outputAfterOperator = screen.getByRole("outputAfterOperator")
        expect(outputAfterOperator.textContent).toBe("0.")
      })
    })
  })

  describe("clearField Function", () => {
    describe("while display bar has nothing to display (default state)", () => {
      it("should hide the reset button (X)", () => {
        renderAppCalculator()
        const resetButton = screen.queryByRole("resetButton")
        expect(resetButton).not.toBeInTheDocument()
      })
    })

    describe("while display bar has 1st output", () => {
      it("should show the reset button (X)", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num2")
        await userEvent.click(num1)

        const resetButton = screen.getByRole("resetButton")
        expect(resetButton).toBeInTheDocument()
      })

      describe("and it has an operator", () => {
        it("should show the reset button (X)", async () => {
          renderAppCalculator()

          const num1 = screen.getByRole("num2")
          const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
          await userEvent.click(num1)
          await userEvent.click(buttonOperatorMinus)

          const resetButton = screen.getByRole("resetButton")
          expect(resetButton).toBeInTheDocument()
        })

        describe("and we press on the reset button (X)", () => {
          it("should clear everything and display bar should have nothing to display", async () => {
            renderAppCalculator()

            const num1 = screen.getByRole("num2")
            const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
            await userEvent.click(num1)
            await userEvent.click(buttonOperatorMinus)

            const resetButton = screen.getByRole("resetButton")
            await userEvent.click(resetButton)

            const display = screen.getByRole("display")
            expect(display.textContent).toBe("")
          })
        })

        describe("and it has 2nd output", () => {
          it("should hide the reset button (X)", async () => {
            renderAppCalculator()

            const num1 = screen.getByRole("num2")
            const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
            await userEvent.click(num1)
            await userEvent.click(buttonOperatorMinus)
            await userEvent.click(num1)

            const resetButton = screen.queryByRole("resetButton")
            expect(resetButton).not.toBeInTheDocument()
          })
        })
      })
    })

    describe("while display has output before operator, operator and output after operator", () => {
      it("should hide the reset button (X)", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num1")
        const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

        await userEvent.click(num1)
        await userEvent.click(buttonOperatorMinus)
        await userEvent.click(num1)

        const resetButton = screen.queryByRole("resetButton")
        await userEvent.click(resetButton!)

        expect(resetButton).not.toBeInTheDocument()
      })
    })
  })

  describe("changeCurrentOperator", () => {
    describe("when there is nothing on the display we press on the operator", () => {
      it("does not show operator", async () => {
        renderAppCalculator()

        const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")
        await userEvent.click(buttonOperatorMinus)

        const currentOperator = screen.queryByRole("currentOperator")
        expect(currentOperator).not.toBeInTheDocument()
      })

      it("doesnt show equal button", async () => {
        renderAppCalculator()

        const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

        await userEvent.click(buttonOperatorMinus)
        const equalButton = screen.queryByRole("equalButton")
        expect(equalButton).not.toBeInTheDocument()
      })
    })

    describe("when there is a number displaying into the display bar with operator", () => {
      describe("and we decided to press another operator", () => {
        it("should change previous operator to the new one", async () => {
          renderAppCalculator()

          const num1 = screen.getByRole("num1")
          const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

          await userEvent.click(num1)
          await userEvent.click(buttonOperatorMinus)

          let currentOperator = screen.getByRole("currentOperator")
          expect(currentOperator.textContent).toBe("-")

          const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")
          await userEvent.click(buttonOperatorPlus)

          currentOperator = screen.getByRole("currentOperator")
          expect(currentOperator.textContent).toBe("+")
        })
      })
    })

    describe("when there are 2 outpust displaying into the display bar with operator", () => {
      describe("and we decided to press another operator", () => {
        it("should change previous operator to the new one", async () => {
          renderAppCalculator()

          const num1 = screen.getByRole("num1")
          const buttonOperatorMinus = screen.getByRole("buttonOperatorMinus")

          await userEvent.click(num1)
          await userEvent.click(buttonOperatorMinus)
          await userEvent.click(num1)

          let currentOperator = screen.getByRole("currentOperator")
          expect(currentOperator.textContent).toBe("-")

          const buttonOperatorPlus = screen.getByRole("buttonOperatorPlus")
          await userEvent.click(buttonOperatorPlus)

          currentOperator = screen.getByRole("currentOperator")
          expect(currentOperator.textContent).toBe("+")
        })
      })
    })
  })

  describe("deleteButton", () => {
    describe("when we have 1 output", () => {
      it("deletes 1 number per click", async () => {
        renderAppCalculator()

        const num1 = screen.getByRole("num1")
        const num2 = screen.getByRole("num2")
        await userEvent.click(num1)
        await userEvent.click(num2)

        const deleteButton = screen.getByRole("deleteButton")
        await userEvent.click(deleteButton)

        const display = screen.getByRole("display")
        expect(display.textContent).toBe(num1.textContent?.toString())
      })

      describe("if there is number such as 1,2,3,4 ", () => {
        it("deletes the number and display bar has nothing to show (default value)", async () => {
          renderAppCalculator()

          const num1 = screen.getByRole("num1")
          await userEvent.click(num1)

          const deleteButton = screen.getByRole("deleteButton")
          await userEvent.click(deleteButton)

          const display = screen.getByRole("display")
          expect(display.textContent).toBe("")

          const equalButton = screen.queryByRole("equalButton")
          expect(equalButton).not.toBeInTheDocument()

          const resetButton = screen.queryByRole("resetButton")
          expect(resetButton).not.toBeInTheDocument()
        })
      })
    })
  })
})
