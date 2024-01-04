import { render, screen } from "@testing-library/vue"
import ConfirmationDelete from "../../../../src/components/shared/ConfirmationDelete.vue"
import userEvent from "@testing-library/user-event"

describe("ConfirmationDelete", () => {
  describe("when user clicks on OK button", () => {
    it("emits 'confirm' to parent", async () => {
      const { emitted } = render(ConfirmationDelete)

      expect(emitted()).not.toHaveProperty("confirm")

      const confirmBtn = screen.getByRole("confirmBtn")
      await userEvent.click(confirmBtn)

      expect(emitted()).toHaveProperty("confirm")
    })
  })

  describe("when user clicks on Cancel button", () => {
    it("emits 'cancel' to parent", async () => {
      const { emitted } = render(ConfirmationDelete)

      expect(emitted()).not.toHaveProperty("cancel")

      const cancelBtn = screen.getByRole("cancelBtn")
      await userEvent.click(cancelBtn)

      expect(emitted()).toHaveProperty("cancel")
    })
  })
})
