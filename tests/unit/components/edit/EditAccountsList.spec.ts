import { render, screen } from "@testing-library/vue"
import EditAccountsList from "../../../../src/components/edit/EditAccountsList.vue"
import userEvent from "@testing-library/user-event"

const renderEditAccountsList = (props = {}) => {
  return render(EditAccountsList, {
    props: {
      accounts: [
        { title: "acc1", sum: 3.2, currency: "Rp", active: true },
        { title: "acc2", sum: 10, currency: "$", active: false }
      ],
      editItem: {
        iconName: "",
        categoryName: "",
        sum: 0,
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

describe("EditAccountsList", () => {
  describe("when user clicks on X button", () => {
    it("closes edit accounts list", async () => {
      const { emitted } = renderEditAccountsList()

      const closeBtn = screen.getByRole("closeBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("toggleEditAccountsList")
      expect(emitted().toggleEditAccountsList[0]).toEqual([false])
    })

    it("changes choosen account back to default", async () => {
      const props = {
        editItem: {
          account: "acc1",
          currency: "$"
        }
      }
      const { emitted } = renderEditAccountsList(props)

      const closeBtn = screen.getByRole("closeBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("changeChoosenAccount")
      expect(emitted().changeChoosenAccount[0]).toEqual(["acc1", "$"])
    })
  })

  it("renders correct amount of accounts", () => {
    renderEditAccountsList()

    const accListItems = screen.getAllByTestId("acc-list__item")

    expect(accListItems).toHaveLength(2)
  })

  describe("when user clicks on account item", () => {
    it("changes choosen account", async () => {
      const { emitted } = renderEditAccountsList()

      const acc2Text = screen.getByText("acc2")
      const acc2 = acc2Text.parentElement as HTMLElement

      await userEvent.click(acc2)

      expect(emitted()).toHaveProperty("changeChoosenAccount")
      expect(emitted().changeChoosenAccount[0]).toEqual(["acc2", "$"])
    })

    it("shows tick only on choosen account", () => {
      const props = {
        editItem: {
          account: "acc2"
        }
      }
      renderEditAccountsList(props)

      const listItems = screen.getAllByTestId("acc-list__item")
      const firstItem = listItems[0]
      const secondItem = listItems[1]

      const firstItemIcon = firstItem.querySelector('[role="icon__tick"]')
      expect(firstItemIcon).toBeNull()

      const secondItemIcon = secondItem.querySelector('[role="icon__tick"]')
      expect(secondItemIcon).not.toBeNull()
    })

    describe("when user clicks on approve button", () => {
      it("closes window with accounts list", async () => {
        const { emitted } = renderEditAccountsList()

        const approveBtn = screen.getByLabelText("Approve")
        await userEvent.click(approveBtn)

        expect(emitted()).toHaveProperty("toggleEditAccountsList")
        expect(emitted().toggleEditAccountsList[0]).toEqual([false])
      })
    })
  })
})
