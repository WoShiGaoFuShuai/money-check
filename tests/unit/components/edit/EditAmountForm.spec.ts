import { render, screen } from "@testing-library/vue"
import EditAmountForm from "../../../../src/components/edit/EditAmountForm.vue"
import userEvent from "@testing-library/user-event"

const renderEditAmountForm = (props = {}) => {
  return render(EditAmountForm, {
    props: {
      editItem: {
        iconName: "",
        categoryName: "",
        sum: 1,
        timestamp: 1,
        account: "",
        currency: ""
      },
      ...props
    },
    global: {
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}
describe("EditAmountForm", () => {
  describe("approveEditAmountForm", () => {
    describe("when user clicks on approve button", () => {
      it("shows error 'New amount field is empty' if field is empty", async () => {
        const { emitted } = renderEditAmountForm()

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.clear(inputAmount)

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        const errorText = screen.getByTestId("error__text")
        expect(errorText.textContent).toEqual("New amount field is empty")
        expect(emitted()).not.toHaveProperty("editAmountConfirm")
      })

      it("shows error 'New amount can not be negative' if the number in input is < 0 ", async () => {
        const { emitted } = renderEditAmountForm()

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "-5")

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        const errorText = screen.getByTestId("error__text")
        expect(errorText.textContent).toEqual("New amount can not be negative")
        expect(emitted()).not.toHaveProperty("editAmountConfirm")
      })

      it("shows error 'Current and New numbers are the same' if number in new amount input and in current amount are the same", async () => {
        const { emitted } = renderEditAmountForm()

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "1")

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        const errorText = screen.getByTestId("error__text")
        expect(errorText.textContent).toEqual("Current and New numbers are the same")
        expect(emitted()).not.toHaveProperty("editAmountConfirm")
      })

      it("shows error 'New number can not be 0' if number in new amount input is equal 0", async () => {
        const { emitted } = renderEditAmountForm()

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "0")

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        const errorText = screen.getByTestId("error__text")
        expect(errorText.textContent).toEqual("New number can not be 0")
        expect(emitted()).not.toHaveProperty("editAmountConfirm")
      })

      describe("and when number in new amount input is bigger than current amount", () => {
        it("closes edit amount window and applies new amount", async () => {
          const { emitted } = renderEditAmountForm()

          const inputAmount = screen.getByRole("input__amount")
          await userEvent.type(inputAmount, "2")

          const approveBtn = screen.getByLabelText("Approve")
          await userEvent.click(approveBtn)

          expect(emitted()).toHaveProperty("editAmountConfirm")
          expect(emitted().editAmountConfirm[0]).toEqual([2])
        })
      })

      it("closes edit amount window if valid amount is entered", async () => {
        const { emitted } = renderEditAmountForm()

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "2")

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        expect(emitted()).toHaveProperty("editAmountConfirm")
        expect(emitted().editAmountConfirm[0]).toEqual([2])
      })
    })
  })

  describe("when user clicks on close button", () => {
    it("closes edit amount window", async () => {
      const { emitted } = renderEditAmountForm()

      const closeBtn = screen.getByRole("closeBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("toggleEditAmountForm")
      expect(emitted().toggleEditAmountForm[0]).toEqual([false])
    })
  })

  it("removes leading zero from the input value", async () => {
    renderEditAmountForm()

    const inputAmount = screen.getByRole("input__amount") as HTMLInputElement
    await userEvent.type(inputAmount, "0123")

    expect(inputAmount.value).toBe("123")
  })

  describe("computed differeneAmount", () => {
    describe("when user enters new amount bigger than current amount", () => {
      it("calculates difference and displays ___ more", async () => {
        const props = {
          editItem: {
            sum: 10
          }
        }
        renderEditAmountForm(props)

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "15")

        const result = screen.getByTestId("amount__difference")

        expect(result.textContent).toEqual("5 more")
      })
    })

    describe("when user enters new amount less than current amount", () => {
      it("calculates difference and displays ___ less", async () => {
        const props = {
          editItem: {
            sum: 10
          }
        }
        renderEditAmountForm(props)

        const inputAmount = screen.getByRole("input__amount")
        await userEvent.type(inputAmount, "3")

        const result = screen.getByTestId("amount__difference")

        expect(result.textContent).toEqual("7 less")
      })
    })
  })
})
