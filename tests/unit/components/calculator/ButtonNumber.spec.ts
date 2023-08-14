import { render, screen } from "@testing-library/vue"
import ButtonNumber from "../../../../src/components/calculator/ButtonNumber.vue"
import userEvent from "@testing-library/user-event"

describe("ButtonNumber", () => {
  const renderButtonNumber = (props = {}) => {
    return render(ButtonNumber, {
      props: {
        num: 1,
        ...props
      }
    })
  }

  it("displays corrent number passed as a prop", () => {
    const props = {
      num: 1 as number
    }
    renderButtonNumber(props)

    const button = screen.getByRole("button", {
      name: /1/i
    })

    expect(button.textContent).toBe(props.num.toString())
  })

  it("emits sendToParentNumber with correct data to the parent", async () => {
    const props = {
      num: 11 as number
    }
    const { emitted } = renderButtonNumber(props)

    const button = screen.getByRole("button", {
      name: /11/i
    })

    await userEvent.click(button)

    expect(emitted()).toHaveProperty("sendToParentNumber")
    expect((emitted() as { sendToParentNumber: any[] }).sendToParentNumber[0][0]).toBe(props.num)
  })
})
