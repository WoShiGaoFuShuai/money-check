import { screen, render } from "@testing-library/vue"
import TransferExchangeRate from "../../../../../src/components/accounts/transfer/TransferExchangeRate.vue"
import userEvent from "@testing-library/user-event"

describe("TransferExchangeRate", () => {
  const renderTransferExchangeRate = () => {
    return render(TransferExchangeRate, {
      props: {
        debitAccount: { title: "a", sum: 1, currency: "$", active: true },
        creditAccount: { title: "b", sum: 2, currency: "Rp", active: false }
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  describe("when user enters transfer amount", () => {
    it("exchange rate in firstExchangeRateInput does not calculate", async () => {
      renderTransferExchangeRate()

      const debitInput = screen.getByRole("debitInput") as HTMLInputElement
      await userEvent.type(debitInput, "1")

      const firstExchangeRateInput = screen.getByRole("firstExchangeRateInput") as HTMLInputElement
      expect(firstExchangeRateInput.value).toBe("")
    })

    describe("when credited amount is 0", () => {
      it("exchange rate in firstExchangeRateInput does not calculate", async () => {
        renderTransferExchangeRate()

        const debitInput = screen.getByRole("debitInput") as HTMLInputElement
        await userEvent.type(debitInput, "1")
        const creditInput = screen.getByRole("creditInput") as HTMLInputElement
        await userEvent.type(creditInput, "0")

        const firstExchangeRateInput = screen.getByRole(
          "firstExchangeRateInput"
        ) as HTMLInputElement
        expect(firstExchangeRateInput.value).toBe("")
      })
    })
  })

  describe("when user enters credited amount", () => {
    it("exchange rate in secondExchangeRateInput does not calculate", async () => {
      renderTransferExchangeRate()

      const creditInput = screen.getByRole("creditInput") as HTMLInputElement
      await userEvent.type(creditInput, "1")

      const secondExchangeRateInput = screen.getByRole(
        "secondExchangeRateInput"
      ) as HTMLInputElement
      expect(secondExchangeRateInput.value).toBe("")
    })

    describe("when transfer amount is 0", () => {
      it("exchange rate in secondExchangeRateInput does not calculate", async () => {
        renderTransferExchangeRate()

        const debitInput = screen.getByRole("debitInput") as HTMLInputElement
        await userEvent.type(debitInput, "0")
        const creditInput = screen.getByRole("creditInput") as HTMLInputElement
        await userEvent.type(creditInput, "1")

        const secondExchangeRateInput = screen.getByRole(
          "secondExchangeRateInput"
        ) as HTMLInputElement
        expect(secondExchangeRateInput.value).toBe("")
      })
    })
  })

  describe("when user enters transfer and credited amount and both of them are not 0", () => {
    it("calculates exchange rate in both inputs", async () => {
      renderTransferExchangeRate()

      const debitInput = screen.getByRole("debitInput") as HTMLInputElement
      await userEvent.type(debitInput, "15")
      const creditInput = screen.getByRole("creditInput") as HTMLInputElement
      await userEvent.type(creditInput, "5")

      const firstExchangeRateInput = screen.getByRole("firstExchangeRateInput") as HTMLInputElement
      const secondExchangeRateInput = screen.getByRole(
        "secondExchangeRateInput"
      ) as HTMLInputElement

      const result1 = 5 / 15
      const result2 = 15 / 5

      expect(firstExchangeRateInput.value).toBe(result1.toFixed(7))
      expect(secondExchangeRateInput.value).toBe(result2.toString())
    })
  })

  describe("when user clicks on close button", () => {
    it("closes TransferExchangeRate", async () => {
      const { emitted } = renderTransferExchangeRate()

      const closeButton = screen.getByRole("closeButton")
      await userEvent.click(closeButton)

      expect(emitted()).toHaveProperty("closeTransferExchangeRate")
    })
  })

  describe("when user clicks on submit button", () => {
    describe("but inputs are not filled", () => {
      it("does not create transfer", async () => {
        const { emitted } = renderTransferExchangeRate()

        const submitButton = screen.getByRole("submitButton")
        await userEvent.click(submitButton)

        expect(emitted()).not.toHaveProperty("submitTransferWithDifferentCurrency")
      })
    })

    describe("but inputs are filled", () => {
      it("does not create transfer", async () => {
        const { emitted } = renderTransferExchangeRate()

        const debitInput = screen.getByRole("debitInput") as HTMLInputElement
        await userEvent.type(debitInput, "1")
        const creditInput = screen.getByRole("creditInput") as HTMLInputElement
        await userEvent.type(creditInput, "1")
        const submitButton = screen.getByRole("submitButton")
        await userEvent.click(submitButton)

        expect(emitted()).toHaveProperty("submitTransferWithDifferentCurrency")
      })
    })
  })
})
