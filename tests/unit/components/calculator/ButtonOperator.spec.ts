import { render, screen } from "@testing-library/vue"
import ButtonOperator from "../../../../src/components/calculator/ButtonOperator.vue"
import userEvent from "@testing-library/user-event"

describe("ButtonOperator", () => {
  const renderButtonOperator = (props = {}) => {
    return render(ButtonOperator, {
      props: {
        operator: "+",
        ...props
      }
    })
  }

  it("displays corrent operator passed as a prop", () => {
    const props = {
      operator: "+"
    }
    renderButtonOperator(props)

    const button = screen.getByRole("button", { name: /\+/i })
    expect(button.textContent).toBe(props.operator)
  })

  it("emits sendCurrentOperatorToParent with correct data to the parent", async () => {
    const props = {
      operator: "*"
    }

    const { emitted } = renderButtonOperator(props)

    const button = screen.getByRole("button", { name: /\*/i })

    await userEvent.click(button)
    expect(emitted()).toHaveProperty("sendCurrentOperatorToParent")
    expect(
      (emitted() as { sendCurrentOperatorToParent: any[] }).sendCurrentOperatorToParent[0][0]
    ).toBe(props.operator)
  })
})
