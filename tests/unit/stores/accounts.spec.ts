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
    describe("subtractSumActiveAccount", () => {
      it("subtracts sum to the active account", () => {
        const calculatorStore = useCalculatorStore()
        const accountsStore = useAccountsStore()
        calculatorStore.outputBeforeOperator = "100"

        const activeAccountSumBefore = accountsStore.getterActiveAccount?.sum ?? 0

        accountsStore.subtractSumActiveAccount()
        const result = activeAccountSumBefore - parseInt(calculatorStore.outputBeforeOperator)

        expect(accountsStore.getterActiveAccount?.sum).toEqual(result)
      })
    })

    describe("changeActiveAccount", () => {
      it("changes active account when user clicks on account", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "acc1", sum: 0, active: true, currency: "$" },
          { title: "acc2", sum: 0, active: false, currency: "$" }
        ]

        accountsStore.changeActiveAccount("acc2")

        expect(accountsStore.accounts).toStrictEqual([
          { title: "acc1", sum: 0, active: false, currency: "$" },
          { title: "acc2", sum: 0, active: true, currency: "$" }
        ])
      })
    })
  })
})