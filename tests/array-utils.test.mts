import { describe, test, expect } from "@jest/globals"
import { asArray, last, partition, partitionBy } from "@rom98m/utils"

describe("array-utlis", () => {
  describe("asArray()", () => {
    test("should wrap non-array into array and leave the array untouched", () => {
      expect(asArray(5)).toEqual([5])
      const arr = [{}]
      expect(asArray(arr)).toBe(arr)
    })
  })


  describe("last()", () => {
    test("should return last value of the array", () => {
      expect(last([1, 2, 5])).toBe(5)
      expect(last([])).toBe(undefined)
    })
  })


  describe("partition()", () => {
    test("should split the array into chunks of given size", () => {
      const arr = "0123456789".split("").map(n => parseInt(n, 10))
      expect(partition(arr, 3)).toEqual([
        [0, 1, 2,],
        [3, 4, 5,],
        [6, 7, 8,],
        [9,],
      ])
    })

    test("should throuw if invalid partitionSize", () => {
      expect(() => partition([], -1)).toThrow()
    })
  })


  describe("partitionBy()", () => {
    const arr = "0123456789".split("").map(n => parseInt(n, 10))

    test("should split the array into even-odd", () => {
      expect(partitionBy(arr, n => n % 2 === 0)).toEqual([
        [0, 2, 4, 6, 8,],
        [1, 3, 5, 7, 9,],
      ])
    })

    test("should split the array taking index and original array reference into accounting", () => {
      const split = partitionBy(arr, (_, idx, originalArr) => {
        if (originalArr !== arr) throw new ReferenceError("Original array should be referenced as 3rd argument of the predicate")
        return idx % 3 === 0
      })
      expect(split).toEqual([
        [0, 3, 6, 9,],
        [1, 2, 4, 5, 7, 8,],
      ])
    })
  })
})
