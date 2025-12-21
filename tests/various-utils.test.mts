import { describe, test, expect, jest } from "@jest/globals";
import { times } from "@rom98m/utils"

describe("various-utils", () => {
  test("should run task 5 times", () => {
    const action = jest.fn()
    for (const x of times(5)) action(x)

    expect(action.mock.calls).toHaveLength(5)
    expect(action.mock.calls[0][0]).toBe(0) // call #1; 1st arg
    expect(action.mock.calls[4][0]).toBe(4) // call #5; 1st arg
  })
})
