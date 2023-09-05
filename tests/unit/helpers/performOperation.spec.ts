import { performOperation } from "../../../src/helpers/performOperation"

describe("performOperation", () => {
  describe("when operator is +", () => {
    it("adds 2 numers together and returns correct result", () => {
      expect(performOperation(1, 2, "+")).toBe(3)
    })
  })

  describe("when operator is -", () => {
    it("subtract 2 numers and returns correct result", () => {
      expect(performOperation(2, 1, "-")).toBe(1)
    })
  })

  describe("when operator is /", () => {
    it("devide 2 numers and returns correct result", () => {
      expect(performOperation(10, 2, "/")).toBe(5)
    })
  })

  describe("when operator is *", () => {
    it("multiplies 2 numers and returns correct result", () => {
      expect(performOperation(10, 2, "*")).toBe(20)
    })
  })

  describe("when operator is unknown", () => {
    it("should handle operator gracefully", () => {
      expect(performOperation(2, 3, "%")).toBe(NaN)
    })
  })
})
