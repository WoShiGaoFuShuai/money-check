import { render, screen } from "@testing-library/vue"
import CurrencyEditModal from "../../../../src/components/currency/CurrencyEditModal.vue"
import userEvent from "@testing-library/user-event"
import { createPinia, setActivePinia } from "pinia"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { vi } from "vitest"

describe("CurrencyEditModal", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderCurrencyEditModal = (props = {}) => {
    return render(CurrencyEditModal, {
      props: {
        initialCurrencyName: "a",
        initialCurrencySymbol: "$",
        initialCurrencyIndex: 0,
        ...props
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it("shows information about currency which will be edited in inputs", () => {
    renderCurrencyEditModal()

    const currencyInput = screen.getByRole("currencyInput") as HTMLInputElement
    const currencySymbolInput = screen.getByRole("currencySymbolInput") as HTMLInputElement

    expect(currencyInput.value).toBe("a")
    expect(currencySymbolInput.value).toBe("$")
  })

  describe("close", () => {
    describe("when user clicks on close button", () => {
      it("closes the modal", async () => {
        const { emitted } = renderCurrencyEditModal()

        const closeBtn = screen.getByRole("closeBtn")
        await userEvent.click(closeBtn)

        expect(emitted()).toHaveProperty("close")
      })
    })
  })

  describe("saveEditCurrency", () => {
    describe("when user clicks on tick button", () => {
      it("edits current currency with new data", async () => {
        const editCurrencyMock = vi.fn()
        const accountsStore = useAccountsStore()
        accountsStore.editCurrency = editCurrencyMock

        const props = {
          initialCurrencyIndex: 0
        }
        renderCurrencyEditModal(props)
        const currencyInput = screen.getByRole("currencyInput") as HTMLInputElement
        const currencySymbolInput = screen.getByRole("currencySymbolInput") as HTMLInputElement

        await userEvent.clear(currencyInput)
        await userEvent.clear(currencySymbolInput)

        await userEvent.type(currencyInput, "USD")
        await userEvent.type(currencySymbolInput, "$")

        const saveEditCurrencyBtn = screen.getByRole("saveEditCurrencyBtn")
        await userEvent.click(saveEditCurrencyBtn)

        const newCurrency = {
          currency: currencyInput.value,
          symbol: currencySymbolInput.value
        }

        expect(editCurrencyMock).toHaveBeenCalledWith(props.initialCurrencyIndex, newCurrency)
      })
    })
  })
})
