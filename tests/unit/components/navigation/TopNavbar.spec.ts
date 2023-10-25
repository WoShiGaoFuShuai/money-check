import { render, screen } from "@testing-library/vue"
import TopNavbar from "../../../../src/components/navigation/TopNavbar.vue"
import { RouterLinkStub } from "@vue/test-utils"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"

const renderTopNavbar = (props = {}) => {
  render(TopNavbar, {
    props: {
      title: "Title",
      rightIcons: [],
      ...props
    },
    global: {
      stubs: {
        FontAwesomeIcon: true,
        RouterLink: RouterLinkStub
      }
    }
  })
}

describe("TopNavbar", () => {
  describe("when we first open app", () => {
    it("does not render back arrow", () => {
      renderTopNavbar()

      const backArrow = screen.queryByRole("routerLinkBack")
      expect(backArrow).not.toBeInTheDocument()
    })
  })

  it("renders title", () => {
    const props = { title: "Title123" }

    renderTopNavbar(props)
    const title = screen.getByTestId("title")
    expect(title.textContent).toEqual("Title123")
  })

  it("renders correct amount of icons", () => {
    const props = {
      rightIcons: [
        { icon: "fa-solid fa-arrow-left", handler: vi.fn() },
        { icon: "fa-solid fa-arrow-left", handler: vi.fn() }
      ]
    }

    renderTopNavbar(props)

    const rightIcons = screen.getAllByTestId("rightIcon")
    expect(rightIcons.length).toEqual(props.rightIcons.length)
  })

  it("triggers function when we click on icon", async () => {
    const funcStub = vi.fn()
    const props = {
      rightIcons: [{ icon: "fa-solid fa-arrow-left", handler: funcStub }]
    }

    renderTopNavbar(props)

    const icon = screen.getByRole("FAicon")
    await userEvent.click(icon)

    expect(funcStub).toHaveBeenCalled()
  })
})
