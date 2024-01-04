import { render, screen } from "@testing-library/vue"
import AppError from "../../../../src/components/shared/AppError.vue"

const renderAppError = (props = {}) => {
  render(AppError, {
    props: {
      error: "",
      mb: 0,
      ...props
    }
  })
}

describe("AppError", () => {
  it("displays error text", () => {
    const props = {
      error: "Error Text"
    }

    renderAppError(props)

    const errorText = screen.getByTestId("error__text")
    expect(errorText.textContent).toEqual(props.error)
  })

  it("applies margin-bottom from props", () => {
    const props = {
      mb: 10
    }

    renderAppError(props)

    const errorText = screen.getByTestId("error__text")

    expect(errorText).toHaveStyle(`margin-bottom: ${props.mb}px`)
  })
})
