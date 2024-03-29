import { render, screen } from "@testing-library/vue"
import userEvent from "@testing-library/user-event"
import NewAccountsCurrencySelect from "../../../../src/components/accounts/NewAccountsCurrencySelect.vue"

describe("NewAccountsCurrencySelect", () => {
  it('emits "emitSelectedItem" event with the selected symbol', async () => {
    const allCurrency = [
      { currency: "USD", symbol: "$" },
      { currency: "EUR", symbol: "€" }
    ]

    const { emitted } = render(NewAccountsCurrencySelect, {
      props: {
        allCurrency
      }
    })

    const selectElement = screen.getByRole("history-select") as HTMLSelectElement

    await userEvent.selectOptions(selectElement, "EUR")

    expect(emitted().emitSelectedItem).toHaveLength(2)
    const emittedValue = emitted().emitSelectedItem[1] as string
    expect(emittedValue).toEqual(["€"])
  })

  it("emits emitSelectedItem when first loaded", () => {
    const allCurrency = [
      { currency: "USD", symbol: "$" },
      { currency: "EUR", symbol: "€" }
    ]

    const { emitted } = render(NewAccountsCurrencySelect, {
      props: {
        allCurrency
      }
    })

    expect(emitted()).toHaveProperty("emitSelectedItem")
    expect(emitted().emitSelectedItem[0]).toEqual(["$"])
  })
})
