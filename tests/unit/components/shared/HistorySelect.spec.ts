import { render, screen, fireEvent } from "@testing-library/vue"
import HistorySelect from "../../../../src/components/shared/HistorySelect.vue"

describe("HistorySelect", () => {
  const renderHistorySelect = (props = {}) => {
    const allMonth = ["January 2023", "February 2023", "March 2023"]
    return render(HistorySelect, {
      props: {
        allMonth,
        ...props
      }
    })
  }

  describe("currentMonthYear", () => {
    it("displays options from props", async () => {
      const props = {
        allMonth: ["April 2023", "May 2023", "June 2023"]
      }
      renderHistorySelect(props)

      props.allMonth.forEach((monthYear) => {
        expect(screen.getByText(monthYear)).toBeInTheDocument()
      })
    })
  })

  it("emits newSelectedItem event on selection change", async () => {
    const { emitted } = renderHistorySelect()

    const select = screen.getByRole("history-select")
    await fireEvent.update(select, "February 2023")

    expect(emitted().newSelectedItem[0]).toEqual(["February 2023"])
  })
})
