import { Calc } from "calc-js"

export function performOperation(left: number, right: number, operator: string): number {
  try {
    switch (operator) {
      case "+":
        return new Calc(left).sum(right).finish()

      case "-":
        return new Calc(left).minus(right).finish()
      case "/": {
        // return new Calc(left).divide(right).finish()
        return Math.round((left / right) * 100) / 100
      }
      case "*":
        return new Calc(left).multiply(right).finish()
      default:
        console.log("ERROR! Some problem with operator!")
        return NaN
    }
  } catch (e) {
    console.error("Error during calculation:", error.message)
    return NaN
  }
}
