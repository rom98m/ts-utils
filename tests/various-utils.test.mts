import { describe, test, expect, jest } from "@jest/globals";
import { times } from "@rom98m/utils"

describe("various-utils", () => {
  describe("times()", () => {
    test("should run task 5 times using for-of syntax", () => {
      const action = jest.fn()
      for (const x of times(5)) action(x)

      expect(action.mock.calls).toHaveLength(5)
      expect(action.mock.calls[0][0]).toBe(0) // call #1; 1st arg
      expect(action.mock.calls[4][0]).toBe(4) // call #5; 1st arg
    })

    test("should run task 5 times using .do()", () => {
      const action = jest.fn()
      times(5).do(action)

      expect(action.mock.calls).toHaveLength(5)
      expect(action.mock.calls[0][0]).toBe(0) // call #1; 1st arg
      expect(action.mock.calls[4][0]).toBe(4) // call #5; 1st arg
    })

    test("should not run the task more than 5 times", () => {
      const action = jest.fn()
      const t1 = times(5)
      const t2 = times(5)

      // Exhaust iterators
      for (const _ of t1) {}
      t2.do(() => null)

      for (const i of t1) action(i)
      expect(action).not.toHaveBeenCalled()
      t1.do(action)
      expect(action).not.toHaveBeenCalled()

      for (const i of t2) action(i)
      expect(action).not.toHaveBeenCalled()
      t2.do(action)
      expect(action).not.toHaveBeenCalled()
    })
  })
})
