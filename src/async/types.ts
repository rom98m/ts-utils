export type AsyncResult<T> = {
  error: null | string | object
  result: T
  batch: number
  task: number
  batchSize: number
}


export type BatchTask<T> = () => Promise<AsyncResult<T>>
