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
      it("subtracts sum from the active account", () => {
        const calculatorStore = useCalculatorStore()
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "acc1", sum: 0, active: true, currency: "$" },
          { title: "acc2", sum: 0, active: false, currency: "$" }
        ]
        calculatorStore.outputBeforeOperator = "100"

        const activeAccountSumBefore = accountsStore.getterActiveAccount?.sum ?? 0

        accountsStore.subtractSumActiveAccount()
        const result = activeAccountSumBefore - parseInt(calculatorStore.outputBeforeOperator)

        expect(accountsStore.getterActiveAccount?.sum).toEqual(result)
      })

      describe("when outputBeforeOperatorNum is negative number", () => {
        it("should return false", async () => {
          const accountsStore = useAccountsStore()
          const calculatorStore = useCalculatorStore()
          calculatorStore.outputBeforeOperator = "-1"
          calculatorStore.outputAfterOperator = ""

          const result = await accountsStore.subtractSumActiveAccount()

          expect(result).toBe(false)
        })
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

    describe("addCurrency", () => {
      it("receives currency and pushes it to the store currencies", () => {
        const accountsStore = useAccountsStore()
        accountsStore.currencies = []

        const newCurrency = { currency: "a", symbol: "b" }
        accountsStore.addCurrency(newCurrency)

        expect(accountsStore.currencies).toStrictEqual([newCurrency])
      })
    })

    describe("deleteCurrency", () => {
      it("receives index and deletes currency with this index", () => {
        const accountsStore = useAccountsStore()
        accountsStore.currencies = []

        const newCurrency1 = { currency: "first", symbol: "b" }
        const newCurrency2 = { currency: "second", symbol: "b" }
        accountsStore.addCurrency(newCurrency1)
        accountsStore.addCurrency(newCurrency2)

        accountsStore.deleteCurrency(0)

        expect(accountsStore.currencies).toStrictEqual([newCurrency2])
      })
    })

    describe("editCurrency", () => {
      it("receives new currency info and changes it with old one", () => {
        const accountsStore = useAccountsStore()
        accountsStore.currencies = []
        const newCurrency1 = { currency: "first", symbol: "b" }
        accountsStore.addCurrency(newCurrency1)

        const newCurrency = { currency: "a", symbol: "a" }
        accountsStore.editCurrency(0, newCurrency)

        expect(accountsStore.currencies).toStrictEqual([newCurrency])
      })
    })
  })
})
