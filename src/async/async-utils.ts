import { AsyncResult, BatchTask } from "./types"


export class AsyncBatch<T = any> {
  private readonly batchSize: number
  private readonly taskTimeout: number
  private readonly batchTimeout: number

  private currentBatch: BatchTask<T>[] = []
  private readonly batches: BatchTask<T>[][] = [this.currentBatch]


  constructor({
    batchSize = 10,
    taskTimeout = Number.POSITIVE_INFINITY,
    batchTimeout = Number.POSITIVE_INFINITY,
  }: {
    batchSize?: number,
    taskTimeout?: number,
    batchTimeout?: number,
  } = {}) {
    if (batchSize <= 0) throw new RangeError("The `batchSize` value must be positive integer")

    this.batchSize = batchSize
    this.taskTimeout = taskTimeout
    this.batchTimeout = batchTimeout
  }


  add(...tasks: Array<() => Promise<T>>) {
    tasks.forEach(task => {
      if (this.currentBatch.length >= this.batchSize) {
        this.currentBatch = []
        this.batches.push(this.currentBatch)
      }

      const counter = {
        batch: this.batches.length - 1,
        task: this.currentBatch.length, // `push` takes place after this
        batchSize: this.batchSize,
      }
      this.currentBatch.push(
        () => task()
          .then(r => ({ error: null, result: r, ...counter }))
          .catch(e => ({ error: e, result: null as T, ...counter }))
      )
    })
  }


  async run(): Promise<AsyncResult<T>[][]> {
    const results: AsyncResult<T>[][] = []

    for (const batch of this.batches) {
      results.push(
        await Promise.all(batch.map(task => task()))
      )
    }

    return results
  }
}
