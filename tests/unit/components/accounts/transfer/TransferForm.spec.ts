import { screen, render } from "@testing-library/vue"
import TransferForm from "../../../../../src/components/accounts/transfer/TransferForm.vue"
import userEvent from "@testing-library/user-event"
import { nextTick } from "vue"
import type { TransferInfoForm } from "../../../../../src/components/accounts/transfer/TransferForm.vue"

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

describe("TransferForm", () => {
  const renderTransferForm = (props = {}) => {
    return render(TransferForm, {
      props: {
        isSameCurrency: true,
        ...props
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }
  describe("when we first open component", () => {
    it("displays today date in input", async () => {
      renderTransferForm()

      await nextTick()

      const dateInput = screen.getByRole("dateInput") as HTMLInputElement
      const today = new Date()
      expect(dateInput.value).toBe(formatDate(today))
    })
  })

  describe("when user presses on amount input", () => {
    describe("when credit and debit accounts have same currency", () => {
      it("does not show exchangeRate window", async () => {
        const props = {
          isSameCurrency: true
        }
        const { emitted } = renderTransferForm(props)

        const amountInput = screen.getByRole("amountInput") as HTMLElement
        await userEvent.click(amountInput)

        expect(emitted()).not.toHaveProperty("showExchangeRate")
      })
    })

    describe("when credit and debit accounts have different currency", () => {
      it("shows exchangeRate window", async () => {
        const props = {
          isSameCurrency: false
        }
        const { emitted } = renderTransferForm(props)

        const amountInput = screen.getByRole("amountInput") as HTMLElement
        await userEvent.click(amountInput)

        expect(emitted()).toHaveProperty("showExchangeRate")
      })
    })
  })

  describe("when user submits transfer", () => {
    describe("when amount is empty field", () => {
      it("does not create transfer", async () => {
        const { emitted } = renderTransferForm()

        const submitButton = screen.getByRole("submitButton")
        await userEvent.click(submitButton)

        expect(emitted()).not.toHaveProperty("submitTransfer")
      })
    })

    describe("when amount is not empty", () => {
      it("creates object and passes it with emit", async () => {
        const { emitted } = renderTransferForm()
        await nextTick()
        const today = new Date()
        const formattedDate = formatDate(today)
        const date = new Date(formattedDate)
        const timestamp = date.getTime()

        const amountInput = screen.getByRole("amountInput") as HTMLInputElement
        await userEvent.type(amountInput, "1")
        const amoutInputValue = Number(amountInput.value)

        const submitButton = screen.getByRole("submitButton")
        await userEvent.click(submitButton)

        expect(emitted()).toHaveProperty("submitTransfer")

        const submitTransferArray = emitted().submitTransfer as Array<[any, TransferInfoForm]>
        const emittedObject = submitTransferArray[0][1]
        expect(emittedObject).toEqual(
          expect.objectContaining({
            timestamp,
            note: "",
            amount: amoutInputValue,
            createdTime: expect.any(Number)
          })
        )
      })
    })
  })
})
