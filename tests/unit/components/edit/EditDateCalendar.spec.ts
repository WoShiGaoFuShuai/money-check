import { render, screen } from "@testing-library/vue"
import EditDateCalendar from "../../../../src/components/edit/EditDateCalendar.vue"
import userEvent from "@testing-library/user-event"

const renderEditDateCalendar = () => {
  return render(EditDateCalendar, {
    props: {
      editItem: {
        iconName: "",
        categoryName: "",
        sum: 10,
        timestamp: 1,
        account: "",
        currency: ""
      }
    },
    global: {
      stubs: {
        FontAwesomeIcon: true,
        ResizeObserver: true
      }
    }
  })
}

describe("EditDateCalendar", () => {
  describe("when user clicks on confirm button", () => {
    it("edits date and closes edit date calendar window", async () => {
      const { emitted } = renderEditDateCalendar()

      const confirmBtn = screen.getByLabelText("Confirm")
      await userEvent.click(confirmBtn)

      expect(emitted()).toHaveProperty("editDateConfirm")
      expect(emitted().editDateConfirm[0]).toEqual([1])
      expect(emitted()).toHaveProperty("closeEditDateCalendar")
      expect(emitted().closeEditDateCalendar[0]).toEqual([false])
    })
  })

  describe("when user clicks on close button", () => {
    it("closes edit date calendar window", async () => {
      const { emitted } = renderEditDateCalendar()

      const closeBtn = screen.getByRole("closeBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("closeEditDateCalendar")
      expect(emitted().closeEditDateCalendar[0]).toEqual([false])
    })
  })
})
