import { describe, test, expect } from "@jest/globals"
import { withProbability } from "@rom98m/utils"

describe("random-utils", () => {
  test("should return true", () => {
    console.info(`>>> ${withProbability(30)}`)
    expect(true).toBe(true)
  })
})
