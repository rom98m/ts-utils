type AsyncResult<T> = {
  error: undefined | string | object
  result: T
  batch: number
  task: number
}


type BatchTask<T> = () => Promise<AsyncResult<T>>


export class AsyncBatch<T = any> {
  public readonly batchSize: number
  private readonly batches: BatchTask<T>[][] = [[]]
  private _isRunning = false
  private _isFinished = false
  private _totalTasks = 0
  private readonly _results: AsyncResult<T>[][] = []


  constructor({ batchSize = 10 }: { batchSize?: number } = {}) {
    if (batchSize <= 0) throw new RangeError("The `batchSize` value must be positive integer")

    this.batchSize = batchSize
  }


  public get isRunning() { return this._isRunning }
  public get isFinished() { return this._isFinished }
  public get totalTasks() { return this._totalTasks }
  public get results() { return this._results }


  add(...tasks: Array<() => Promise<T>>) {
    if (this._isRunning || this._isFinished) {
      throw new Error("Cannot add tast to a running or finished batch")
    }

    tasks.forEach(task => {
      let lastBatch = this.batches[this.batches.length - 1]
      if (lastBatch.length >= this.batchSize) {
        lastBatch = []
        this.batches.push(lastBatch)
      }

      const counter = {
        batch: this.batches.length - 1,
        task: lastBatch.length, // `push` takes place after this, hence task no. should be +1'ed
      }
      lastBatch.push(
        () => task()
          .then(r => ({ error: undefined, result: r, ...counter }))
          .catch(e => ({ error: e, result: undefined as T, ...counter }))
      )
      this._totalTasks++
    })

    return this
  }


  run(): Promise<AsyncResult<T>[][]> {
    if (this._isRunning || this._isFinished) {
      throw new Error(`Cannot re-run the ${this._isRunning ? "running" : "finished"} batch`)
    }
    this._isRunning = true

    // This wrapper allows using simple `async/awiat` approach AND fail fast in case of running/finished batch.
    // The `async run()` _always_ rerturn the Promise which fails by aforementioned conditions.
    // The `run()` can fail fast _before_ returnign any Promise.
    return (async () => {
      for (const batch of this.batches) {
        this._results.push(
          await Promise.all(batch.map(task => task()))
        )
      }

      this._isRunning = false
      this._isFinished = true

      return this._results
    })()
  }
}
