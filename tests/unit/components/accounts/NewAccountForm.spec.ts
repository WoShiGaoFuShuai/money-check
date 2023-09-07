import { render, screen } from "@testing-library/vue"
import NewAccountForm from "../../../../src/components/accounts/NewAccountForm.vue"
import userEvent from "@testing-library/user-event"

const NewAccountsCurrencySelect = {
  props: {
    allCurrency: {
      type: Array,
      default: () => []
    },
    currentSymbol: String
  },
  template: "<div></div>"
}

describe("NewAccountForm", () => {
  const renderNewAccountForm = () => {
    return render(NewAccountForm, {
      props: {
        currencies: [{ currency: "Dollar", symbol: "$" }]
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
          NewAccountsCurrencySelect
        }
      }
    })
  }

  describe("when user first opens the window NewAccountForm", () => {
    it("balance is 0", () => {
      renderNewAccountForm()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement

      expect(accountBalanceInput.value).toBe("0")
    }),
      it("name is empty", () => {
        renderNewAccountForm()

        const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement

        expect(accountNameInput.value).toBe("")
      })
  })

  describe("when we click on +- button", () => {
    it("should change balance value to opposite", async () => {
      renderNewAccountForm()
      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement

      await userEvent.type(accountBalanceInput, "2")

      expect(accountBalanceInput.value).toBe("2")

      const btn = screen.getByRole("changeAccountBalanceBtn")
      await userEvent.click(btn)

      expect(accountBalanceInput.value).toBe("-2")
    })

    describe("when balance is 0", () => {
      it("should keep 0 in balance input", async () => {
        renderNewAccountForm()

        let accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
        expect(accountBalanceInput.value).toBe("0")

        const btn = screen.getByRole("changeAccountBalanceBtn")
        await userEvent.click(btn)

        accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
        expect(accountBalanceInput.value).toBe("0")
      })
    })
  })

  describe("addNewAccount", () => {
    it("emits accountsStoreAddNewAcc if inputs are valid", async () => {
      const { emitted } = renderNewAccountForm()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement
      const addNewAccountBtn = screen.getByRole("addNewAccountBtn")

      await userEvent.type(accountNameInput, "New Account")
      await userEvent.type(accountBalanceInput, "100")
      await userEvent.click(addNewAccountBtn)

      expect(emitted()).toHaveProperty("accountsStoreAddNewAcc")
      const newAccount = {
        title: "New Account",
        sum: 100,
        currency: "",
        active: false
      }
      expect(emitted().accountsStoreAddNewAcc[0]).toEqual([newAccount])
    })

    it("does not emit accountsStoreAddNewAcc if the accountNameInput input is empty", async () => {
      const { emitted } = renderNewAccountForm()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      const addNewAccountBtn = screen.getByRole("addNewAccountBtn")

      await userEvent.type(accountBalanceInput, "100")
      await userEvent.click(addNewAccountBtn)

      expect(emitted()).not.toHaveProperty("accountsStoreAddNewAcc")
    })
  })
})
