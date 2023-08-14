import { createPinia, setActivePinia } from "pinia"
import { useAccountsStore } from "../../../src/stores/accounts"
import { useCalculatorStore } from "../../../src/stores/calculator"

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("state", () => {
    it("has 4 accounts at the beginning", () => {
      const store = useAccountsStore()
      expect(store.accounts).toHaveLength(4)
    })
  })

  describe("actions", () => {
    it("adds sum to the active account", () => {
      const calculatorStore = useCalculatorStore()
      const accountsStore = useAccountsStore()
      calculatorStore.outputBeforeOperator = "100"

      const activeAccountSumBefore = accountsStore.getterActiveAccount?.sum ?? 0

      accountsStore.addSumToActiveAccount()
      const result = activeAccountSumBefore + parseInt(calculatorStore.outputBeforeOperator)

      expect(accountsStore.getterActiveAccount?.sum).toEqual(result)
    })
  })
})
