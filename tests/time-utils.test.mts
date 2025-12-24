import { describe, test, jest, expect, beforeEach, afterEach } from "@jest/globals"
import { wait, debounce } from "@rom98m/utils"

describe("time-utlis", () => {
  describe("wait()", () => {
    test("should wait", () => {
      const before = Date.now()
      const waiIntervalMs = 5
      return wait(waiIntervalMs)
      .then(() => {
        const after = Date.now()
        expect(after - before).toBeGreaterThanOrEqual(waiIntervalMs)
      })
    })
  })


  describe("debounce()", () => {
    beforeEach(() => { jest.useFakeTimers() })
    afterEach(() => { jest.useRealTimers() })

    test("should debounce", () => {
      const mockedFn = jest.fn()
      const debounced = debounce(mockedFn, 100)

      debounced("1: invoked")
      debounced("2: skipped")
      setTimeout(() => debounced("3: skipped"), 1)
      setTimeout(() => debounced("4: invoked"), 10)
      setTimeout(() => debounced("5: invoked"), 500)

      jest.runAllTimers()
      expect(mockedFn.mock.calls.length).toBe(3)
      expect(mockedFn.mock.calls[0][0]).toBe("1: invoked")
      expect(mockedFn.mock.calls[1][0]).toBe("4: invoked")
      expect(mockedFn.mock.calls[2][0]).toBe("5: invoked")
    })
  })
})