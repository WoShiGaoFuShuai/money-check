import { getDayLabel } from "../../../src/helpers/getDayLabel"

describe("getDayLabel", () => {
  it('shows "today" when timestamp was created today', () => {
    const today = new Date()
    const timestamp = today.getTime()
    expect(getDayLabel(timestamp)).toBe("Today")
  })

  it('shows "yesterday" when timestamp was created 1 day ago', () => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000
    const timestamp = today.getTime() - oneDay

    expect(getDayLabel(timestamp)).toBe("Yesterday")
  })

  describe("if timestamp was neither created today nor tomorrow", () => {
    it("shows day and month of the timestamp", () => {
      // 26th of December 2023
      const timestamp = 1703590014442

      expect(getDayLabel(timestamp)).toBe("26 December")
    })
  })
})
