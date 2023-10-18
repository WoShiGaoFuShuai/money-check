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

    describe("editAccount", () => {
      it("receives editedAccount and replaces new info from it with old account info", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "acc1", sum: 3.2, currency: "Rp", active: true },
          { title: "acc2", sum: 10, currency: "$", active: false }
        ]

        const account = { title: "new", sum: 1, currency: "Y" }
        const index = 1

        accountsStore.editAccount(account, index)

        expect(accountsStore.accounts[index]).toEqual({
          title: "new",
          sum: 1,
          currency: "Y",
          active: false
        })
      })
    })

    describe("deleteAccount", () => {
      it("deletes account with correct index", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "acc1", sum: 3.2, currency: "Rp", active: true },
          { title: "acc2", sum: 10, currency: "$", active: false }
        ]

        accountsStore.deleteAccount(1)

        expect(accountsStore.accounts).toEqual([
          { title: "acc1", sum: 3.2, currency: "Rp", active: true }
        ])
      })
    })

    describe("addNewAccount", () => {
      it("adds new account ", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "acc1", sum: 3.2, currency: "Rp", active: true },
          { title: "acc2", sum: 10, currency: "$", active: false }
        ]

        const newAccount = {
          title: "new",
          sum: 9,
          currency: "Q",
          active: false
        }

        accountsStore.addNewAccount(newAccount)

        expect(accountsStore.accounts).toHaveLength(3)
        expect(accountsStore.accounts[accountsStore.accounts.length - 1]).toEqual(newAccount)
      })
    })

    describe("transfer", () => {
      it("should subtract from debit acc and should add to credit acc correct amount", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "credit", sum: 10, currency: "$", active: true },
          { title: "debit", sum: 12, currency: "$", active: false }
        ]

        const debitAccIndex = 0
        const creditAccIndex = 1
        const amount = 5
        accountsStore.transfer(debitAccIndex, creditAccIndex, amount)

        expect(accountsStore.accounts[debitAccIndex].sum).toEqual(5)
        expect(accountsStore.accounts[creditAccIndex].sum).toEqual(17)
      })
    })

    describe("transferWithDifferentCurrency", () => {
      it("receives different amounts for credit and debit accs and subtracts and adds amount to the accounts", () => {
        const accountsStore = useAccountsStore()
        accountsStore.accounts = [
          { title: "credit", sum: 10, currency: "$", active: true },
          { title: "debit", sum: 12, currency: "Rp", active: false }
        ]

        const debitAccIndex = 0
        const creditAccIndex = 1
        const debitAmount = 3
        const creditAmount = 6

        accountsStore.transferWithDifferentCurrency(
          debitAccIndex,
          creditAccIndex,
          debitAmount,
          creditAmount
        )

        expect(accountsStore.accounts[debitAccIndex].sum).toEqual(7)
        expect(accountsStore.accounts[creditAccIndex].sum).toEqual(18)
      })
    })
  })
})
