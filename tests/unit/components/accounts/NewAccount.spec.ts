import { mount } from "@vue/test-utils"
import NewAccount from "../../../../src/components/accounts/NewAccount.vue"
import NewAccountForm from "../../../../src/components/accounts/NewAccountForm.vue"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { vi } from "vitest"

// Mocking the store
const mockStore = {
  currencies: [], // Mocked currencies
  addNewAccount: vi.fn()
}

describe("NewAccount.vue", () => {
  it("", () => {})
  // let wrapper
  // beforeEach(() => {
  //   // Provide the mock store via the global.mocks option
  //   wrapper = mount(NewAccount, {
  //     global: {
  //       mocks: {
  //         accountsStore: mockStore
  //       }
  //     }
  //   })
  // })
  // it("calls addNewAccount when NewAccountForm emits accounts-store-add-new-acc", async () => {
  //   const mockAccount = { id: "1", name: "Test Account" }
  //   await wrapper.findComponent(NewAccountForm).vm.$emit("accounts-store-add-new-acc", mockAccount)
  //   expect(mockStore.addNewAccount).toHaveBeenCalledWith(mockAccount)
  // })
  // it("calls hideNewAccountModal when NewAccountForm emits hide-new-account-modal", () => {
  //   wrapper.findComponent(NewAccountForm).vm.$emit("hide-new-account-modal")
  //   // Now you'd need to verify that `hideNewAccountModal` has been called
  //   // This might require setting up additional mocking or spies
  // })
})
