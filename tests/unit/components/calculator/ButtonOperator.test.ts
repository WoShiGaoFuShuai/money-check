import { render, screen } from "@testing-library/vue"
import ButtonOperator from "@/components/calculator/ButtonOperator.vue"
import userEvent from "@testing-library/user-event"
// import ButtonOperator from "../../../../src/components/calculator/ButtonOperator.vue"

describe("ButtonOperator", () => {
  it("displays corrent operator passed as a prop", () => {
    const propOperator: string = "+"

    render(ButtonOperator, {
      props: {
        operator: propOperator
      }
    })

    const button = screen.getByRole("button", { name: /\+/i })
    expect(button.textContent).toBe(propOperator)
  })

  it("emits sendCurrentOperatorToParent with correct data to the parent", async () => {
    const propOperator: string = "*"

    const { emitted } = render(ButtonOperator, {
      props: {
        operator: propOperator
      }
    })

    const button = screen.getByRole("button", { name: /\*/i })

    await userEvent.click(button)
    expect(emitted()).toHaveProperty("sendCurrentOperatorToParent")
    expect(
      (emitted() as { sendCurrentOperatorToParent: any[] }).sendCurrentOperatorToParent[0][0]
    ).toBe(propOperator)
  })
})
