import { createSpendCardInfo } from "../../../src/helpers/createSpendCardInfo"
import { setActivePinia, createPinia } from "pinia"
import { useAccountsStore } from "../../../src/stores/accounts"

describe("createSpendCardInfo", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("returns correct SpendCardInfo when getterActiveAccount is defined", () => {
    const accountStore = useAccountsStore()
    accountStore.accounts = [{ title: "Account 1", sum: 100, currency: "USD", active: true }]

    const categoryInfo = {
      categoryName: "Groceries",
      iconName: "shopping-cart"
    }
    const num = 100

    const expected = {
      sum: 100,
      ...categoryInfo,
      timestamp: expect.any(Number), // Use expect.any(Number) because timestamp is dynamic
      account: "Account 1",
      currency: "USD"
    }

    const result = createSpendCardInfo(categoryInfo, num)
    expect(result).toEqual(expected)
  })

  it("returns null if there is no getterActive account", () => {
    const accountStore = useAccountsStore()
    accountStore.accounts = []

    const categoryInfo = {
      categoryName: "Groceries",
      iconName: "shopping-cart"
    }
    const num = 100

    const expected = {
      sum: 100,
      ...categoryInfo,
      timestamp: expect.any(Number),
      account: null,
      currency: null
    }

    const result = createSpendCardInfo(categoryInfo, num)
    expect(result).toEqual(expected)
  })
})
