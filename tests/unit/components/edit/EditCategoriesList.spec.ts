import { render, screen } from "@testing-library/vue"
import EditCategoriesList from "../../../../src/components/edit/EditCategoriesList.vue"
import userEvent from "@testing-library/user-event"

const renderEditCategoriesList = () => {
  return render(EditCategoriesList, {
    global: {
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}

describe("EditCategoriesList", () => {
  describe("when user click on close button", () => {
    it("closes edit categories list window", async () => {
      const { emitted } = renderEditCategoriesList()

      const closeBtn = screen.getByRole("closeBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("toggleEditCategoriesList")
      expect(emitted().toggleEditCategoriesList[0]).toEqual([false])
    })
  })
})
