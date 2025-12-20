import { describe, test, expect, beforeAll, afterAll, jest } from "@jest/globals"
import { type SpiedFunction } from "jest-mock"
import { random, randomString, withProbability } from "@rom98m/utils"

describe("random-utils", () => {
  let spyOnRandom: SpiedFunction<() => number>
  const randomReturn = .25

  beforeAll(() => {
    spyOnRandom = jest.spyOn(Math, "random")
    spyOnRandom.mockReturnValue(randomReturn)
  })

  afterAll(() => {
    spyOnRandom.mockRestore()
  })


  describe("random()", () => {
    const testCases = [
      { input: [1, 1000], expected: 250 },
      { input: [1000, 1], expected: 250 },
      { input: [-1000, 0], expected: -750 },
      { input: [1000], expected: 250 },
      { input: [-4], expected: -3 },
    ] as Array<{ input: number[], expected: number }>

    describe(`should return ${randomReturn * 100}th % of the range if \`random() == ${randomReturn}\``, () => {
      testCases.forEach(({ input, expected }) => {
        test(`random(${input[0]}, ${input[1]}) => ${expected}`, () => {
          expect(random(...input as [number, number])).toBe(expected)
        })
      })
    })
  })


  describe("withProbability()", () => {
    test("should return `true` if `random() < :given`", () => {
      expect(withProbability(50)).toBe(true)
    })

    test("should return `false` if `random() > :given`", () => {
      expect(withProbability(1)).toBe(false)
    })
  })


  describe("randomString()", () => {
    test(`should repeated chars at ${randomReturn * 100}th % of given string if \`random() == ${randomReturn}\``, () => {
      const dict = "012_456789AB"
      expect(randomString(5, dict)).toBe("_____")
    })
  })
})
