import { render, screen } from "@testing-library/vue"
import ButtonNumber from "@/components/calculator/ButtonNumber.vue"
import userEvent from "@testing-library/user-event"

describe("ButtonNumber", () => {
  it("displays corrent number passed as a prop", () => {
    const numPropValue: number = 1

    render(ButtonNumber, {
      props: {
        num: numPropValue
      }
    })

    const button = screen.getByRole("button", {
      name: /1/i
    })

    expect(button.textContent).toBe(numPropValue.toString())
  })

  it("emits sendToParentNumber with correct data to the parent", async () => {
    const numPropValue: number = 11

    const { emitted } = render(ButtonNumber, {
      props: {
        num: numPropValue
      }
    })

    const button = screen.getByRole("button", {
      name: /11/i
    })

    await userEvent.click(button)

    expect(emitted()).toHaveProperty("sendToParentNumber")
    expect((emitted() as { sendToParentNumber: any[] }).sendToParentNumber[0][0]).toBe(numPropValue)
  })
})
