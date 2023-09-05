import { render, screen } from "@testing-library/vue"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { createPinia, setActivePinia } from "pinia"
import { RouterLinkStub } from "@vue/test-utils"
import NewAccount from "../../../../src/components/accounts/NewAccount.vue"
import { useAccountsStore } from "../../../../src/stores/accounts"

describe("NewAccount", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderNewAccount = () => {
    render(NewAccount, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  describe("when we first open the window newAccount", () => {
    it("balance is 0", () => {
      renderNewAccount()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement

      expect(accountBalanceInput.value).toBe("0")
    }),
      it("name is empty", () => {
        renderNewAccount()

        const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement

        expect(accountNameInput.value).toBe("")
      })
  })

  describe("when we click on +- button", () => {
    it("should change balance value to opposite", async () => {
      renderNewAccount()
      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement

      await userEvent.type(accountBalanceInput, "2")

      expect(accountBalanceInput.value).toBe("2")

      const btn = screen.getByRole("changeAccountBalanceBtn")
      await userEvent.click(btn)

      expect(accountBalanceInput.value).toBe("-2")
    })

    describe("when balance is 0", () => {
      it("should keep 0 in balance input", async () => {
        renderNewAccount()

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
    it("creates a new account if inputs are valid", async () => {
      const addNewAccountSpy = vi.spyOn(useAccountsStore(), "addNewAccount")

      renderNewAccount()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement
      const addNewAccountBtn = screen.getByRole("addNewAccountBtn")

      await userEvent.type(accountNameInput, "New Account")
      await userEvent.type(accountBalanceInput, "100")
      await userEvent.click(addNewAccountBtn)

      expect(addNewAccountSpy).toHaveBeenCalled()
    })

    it("does not create a new account if the accountNameInput input is empty", async () => {
      const addNewAccountSpy = vi.spyOn(useAccountsStore(), "addNewAccount")

      renderNewAccount()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      const addNewAccountBtn = screen.getByRole("addNewAccountBtn")

      await userEvent.type(accountBalanceInput, "100")
      await userEvent.click(addNewAccountBtn)

      expect(addNewAccountSpy).not.toBeCalled()
    })
  })
})
