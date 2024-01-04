import { render, screen } from "@testing-library/vue"
import CategoryItems from "../../../../src/components/category/CategoryItems.vue"
import userEvent from "@testing-library/user-event"

const renderCategoryItems = (props = {}) => {
  return render(CategoryItems, {
    props: {
      categories: [
        { iconName: "", categoryName: "" },
        { iconName: "", categoryName: "" }
      ],
      ...props
    },
    global: {
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}

describe("CategoryItems", () => {
  it("renders items from categories", () => {
    renderCategoryItems()

    const categories = screen.getAllByTestId("category__item")

    expect(categories).toHaveLength(2)
  })

  describe("when user clicks on the category while editing transaction", () => {
    it("changes category to a new one", async () => {
      const props = {
        categories: [{ iconName: "", categoryName: "category" }]
      }
      const { emitted } = renderCategoryItems(props)

      const category = screen.getByTestId("category__item")

      await userEvent.click(category)

      expect(emitted()).toHaveProperty("chooseCategoryName")
      expect(emitted().chooseCategoryName[0]).toStrictEqual(["category"])
    })
  })
})
