import { render, screen } from "@testing-library/vue"
import CurrencyAddNewModal from "../../../../src/components/currency/CurrencyAddNewModal.vue"
import userEvent from "@testing-library/user-event"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"

describe("CurrencyAddNewModal", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderCurrencyAddNewModal = () => {
    return render(CurrencyAddNewModal, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  describe("when first opens", () => {
    it("should display currency & symbol inputs empty", () => {
      renderCurrencyAddNewModal()

      const currencyInput = screen.getByRole("currencyInput") as HTMLInputElement
      const currencySymbolInput = screen.getByRole("currencySymbolInput") as HTMLInputElement

      expect(currencyInput.value).toBe("")
      expect(currencySymbolInput.value).toBe("")
    })
  })

  describe("addNewCurrency", () => {
    describe("when currency input or symbol input is empty", () => {
      it("should not emit", async () => {
        const { emitted } = renderCurrencyAddNewModal()

        const addNewCurrencyBtn = screen.getByRole("addNewCurrencyBtn")
        await userEvent.click(addNewCurrencyBtn)

        expect(emitted()).not.toHaveProperty("close")
      })
    })

    describe("when currency and symbol inputs are not empty", () => {
      it("should emit close", async () => {
        const { emitted } = renderCurrencyAddNewModal()

        const currencyInput = screen.getByRole("currencyInput") as HTMLInputElement
        const currencySymbolInput = screen.getByRole("currencySymbolInput") as HTMLInputElement

        await userEvent.type(currencyInput, "a")
        await userEvent.type(currencySymbolInput, "b")

        const addNewCurrencyBtn = screen.getByRole("addNewCurrencyBtn")
        await userEvent.click(addNewCurrencyBtn)

        expect(emitted()).toHaveProperty("close")
      })

      it("should add new currency", async () => {
        const accountsStore = useAccountsStore()
        const addCurrencyMock = vi.fn()
        accountsStore.addCurrency = addCurrencyMock

        renderCurrencyAddNewModal()
        const currencyInput = screen.getByRole("currencyInput") as HTMLInputElement
        const currencySymbolInput = screen.getByRole("currencySymbolInput") as HTMLInputElement

        await userEvent.type(currencyInput, "a")
        await userEvent.type(currencySymbolInput, "b")

        const newCurrency = {
          currency: "a",
          symbol: "b"
        }

        const addNewCurrencyBtn = screen.getByRole("addNewCurrencyBtn")
        await userEvent.click(addNewCurrencyBtn)

        expect(addCurrencyMock).toHaveBeenCalledWith(newCurrency)
      })
    })

    describe("close", () => {
      describe("when user clicks on close button", () => {
        it("closes the modal", async () => {
          const { emitted } = renderCurrencyAddNewModal()

          const closeBtn = screen.getByRole("closeBtn")
          await userEvent.click(closeBtn)

          expect(emitted()).toHaveProperty("close")
        })
      })
    })
  })
})
