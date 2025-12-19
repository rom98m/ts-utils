import { describe, test, expect } from "@jest/globals"
import { withProbability } from "@rom98m/utils"

describe("random-utils", () => {
  test("should export `withProbability`", () => {
    expect(typeof withProbability).toBe("function")
  })
})
