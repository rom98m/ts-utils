import { describe, test, expect, beforeEach } from "@jest/globals";
import { AsyncBatch, times } from "@rom98m/utils"

describe("async-utils", () => {
  describe("AsyncBatch", () => {
    test("should run async tasks in batches", () => {
      const batch = new AsyncBatch({ batchSize: 2 })
      for (const x of times(5)) {
        batch.add(() => Promise.resolve(x))
      }

      return batch
      .run()
      .then(res => {
        expect(res).toEqual([
          [
            { batch: 0, task: 0, result: 0, error: undefined },
            { batch: 0, task: 1, result: 1, error: undefined },
          ],
          [
            { batch: 1, task: 0, result: 2, error: undefined },
            { batch: 1, task: 1, result: 3, error: undefined },
          ],
          [
            { batch: 2, task: 0, result: 4, error: undefined },
          ],
        ])
      })
    })


    test("should reflect correct batch state", () => {
      const batch = new AsyncBatch()
      batch.add(() => Promise.resolve(10))

      expect(batch.isRunning).toBe(false)
      expect(batch.isFinished).toBe(false)

      expect(batch.totalTasks).toBe(1)

      const run = batch.run()

      expect(batch.isRunning).toBe(true)
      expect(batch.isFinished).toBe(false)

      return run
      .then(() => {
        expect(batch.isRunning).toBe(false)
        expect(batch.isFinished).toBe(true)
      })
    })


    test("should finish the batch even if task fail", () => {
      const batch = new AsyncBatch()
      batch.add(() => Promise.reject("REJECTED"))
      batch.add(() => Promise.resolve(10))

      return batch
      .run()
      .then(res => {
        expect(res).toEqual([[
          { batch: 0, task: 0, result: undefined, error: "REJECTED" },
          { batch: 0, task: 1, result: 10, error: undefined },
        ]])
      })
    })


    test("should throw when trying to add to a running or finished batch", () => {
      const batch = new AsyncBatch()
      batch.add(() => Promise.resolve(10))

      const run = batch.run()
      expect(() => batch.add(() => Promise.resolve())).toThrow()

      return run.then(() => {
        expect(() => batch.add(() => Promise.resolve())).toThrow()
        expect(() => batch.run()).toThrow()
      }).then(() => {
      })
    })
  })
})
