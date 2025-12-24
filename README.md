# Various TS utils


## Installation

```shell
npm install --save @rom98m/utils
```


## Usage

The utils are shipped as ESM files:

```ts
import { AsyncBatch } from "@rom98m/utils"

const batch = new AsyncBatch({ batchSize: 10 })
for (let i = 0; i <= 1e4; i++) {
  batch.add(() => fetch(`https://some.site/post?id=${i}`))
}
batch
  .run()
  .then(res => /* ... */)
  .catch(err => /* ... */)
```


## Array utils

### `asArray(maybeArray: T | T[]) => T[]`

Wraps given argument in array if needed.
```ts
/**
 * @param {T | T[]} maybeArray Value (might be arra y or a single one).
 * @returns {T[]}
 */
```
```
asArray(5)        // => [5]
asArray([5])      // => [5] // left as is
```


### `last<T>(array: T[]) => T`

Returns the last element of given array.
```ts
/**
 * @param {T[]} array Given array.
 * @returns {T} Last element or undefined (in case of empty array).
 */
```
```
last([1, 2, 3])     // => 3
last("fdsa")        // => "a"
```


### `partition<T>(array: T[], partitionSize: number): T[][]`


Split the array into partitions of given size.
```ts
/**
 * @param {T[]} array
 * @param {number} partitionSize
 * @returns {T[][]}
 */
```
```
partition([1, 2, 3, 4, 5], 2)       // => [[1, 2],  [3, 4],  [5]]
```


### `partitionBy<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => boolean): [T[], T[]]`

Splits the array into 2 buckets:
- Left bucket contains all elements where the `predicate()` returned `true`;
- Right bucket contains all elements where the `predicate()` returned `false`.

```ts
/**
 * @param {T[]} array Given array.
 * @param {(item: T, index: number, arr: T[]) => boolean} predicate A method that is applied to each element.
 *                                                                  If returns true, the element appears in the left bucket,
 *                                                                  otherwise in the right one.
 * @returns {[T[], T[]]}
 */
```
```
partitionBy([1, 2, 4, 5, 5], n => n % 2 === 0)      // => [[2, 4],  [1, 3, 5]]
```


## Async utils

### `class AsyncBatch<T = any>`

A container for async tasks that should be run in batches.
For instance, 1000 requests to a remote server:
- running them sequentially is too slow;
- running them all at once can overwhelm/DoS the server.

But running (for instance) a sequence of 40 batches of 25 simultanious requests
might be a good balance:
```ts
parallel(25_requests)
  .then(() => parallel(25_requests))
  .then(() => parallel(25_requests))
  // ...
  .then(() => parallel(25_requests))
```


### Constructor

#### `new AsyncBatch({ batchSize = 10 })`

Creates a new container for async tasks.
```ts
/**
 * @param {object?} [param={}] Configuration of the task container.
 * @param {number} [param.batchSize=10] The size of the batch
 *                                      (number of task to run simultaneously).
 */
```
```
const batch = new AsyncBatch({ batchSize: 5 })
const batch = new AsyncBatch()
```


### Instance fileds and methods

#### Status flags (readonly):
- **`.isRunning: boolean`**
- **`.isFinished: boolean`**
- **`.totalTasks: number`** returns the total number of tasks added

#### `.results: AsyncResult<T>[][]`
Readonly. \
Keeps the refetence to the array of results. \
Useful when results are referenced outside the `.run().then(res => {/* ... */})`.

> ⚠️ **Watch out!** \
> The array is filled dynamically upon task execution (during the `run()` routine). \
> Make sure to reference the `.results` _after_ the `.run()` is finished.


#### `.add(...tasks: Array<() => Promise<T>>)`

Add given tasks to the container.
```ts
/**
 * @param {...() => Promise<T>} tasks Tasks to add.
 * @returns {AsyncBatch} The instance of the AsyncBatch (`this`) to make the method chainable.
 * @throws When trying to add the task to a running or finished batch.
 */
```
```
batch
  .add(() => fetch(/* ... */))
  .add(() => fetch(/* ... */))

const tasks = postIds.map(id => fetch(`https://some.site/post?id=${id}`))
batch.add(...tasks)
```


#### `run(): Promise<AsyncResult<T>[][]>`

Run all tasks in batches.
```ts
/**
 * @returns {Promise<AsyncResult<T>[][]>} Promise that resolves with all task results
 *                                       combined in sub-arrays (per batch).
 * @throws When trying to run the batch for the 2nd time.
 */
```
```
batch
  .run()
  .then(res => {
    res.flat() // because it's a 2D array of per-batch results
    res.forEach(({ error, result, batch, task }) => {
      console.info(`Batch ${batch}, task ${task}: ${error ? "failed" : "succeeded"}:`, error || result)
    })
  })
  .catch(err => /* ... */)
```


### Auxiliary types

```ts
/**
 * A wrapper for the result of an async task.
 */
type AsyncResult<T> = {
  error: undefined | string | object
  result: T
  batch: number
  task: number
}
```


## Math/Random utils

### `random(from: number, to?: number): number`

Returns random int from the interval `[min(from, to) .. max(from, to))`.
```ts
/**
 * @param {number} from
 * @param {number?} [to] Optional. If omitted consider `random(0, from)`.
 * @returns {number}
 */
```
```
random(-5, 5)
random(5, -5)       // order does not matter
random(5)           // equal to `random(0, 5)`
```


### `pickRandom<T>(array: T[] | string): typeof array extends T[] ? T : string`

Picks a random value from given array. Works against string as well, picking random character.
```ts
/**
 * @param {T[] | string} arrayLike
 * @returns {T | string}
 */
```
```
pickRandom([1, 2, 3, 4, 5])         // => some number
pickRandom("ACBDEF")                // => some char
```


### `withProbability(probability: number): boolean`

Return `true` with given % of probability.
```ts
/**
 * @param {number} probability Probability percentage (0..100).
 * @returns {boolean}
 */
```
```
if (withProbability(25)) turn(withProbability(50) ? "left" : "right")
moveForward()
```



### `randomString(length: number, chars = dictionary.englishLower): string`

Generates random string of given length.
```ts
/**
 * @param {number} length
 * @param {string?} chars Optional. Define the chars dictionary for generation.
*                         If omitted, lower English (`a`..`z`) letter are used.
 * @returns {string}
 */
```
```
randomString(5)
randomString(10, dictionary.englishLower + dictionary.englishUpper + dictionary.numbers)
```


### Auxiliary export: dictionaries for `randomString()`
```ts
export const dictionary = {
  englishLower: "abcdefghijklmnopqrstuvwxyz",
  englishUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "1234567890",
}
```


## Time utils

### `wait(ms: number): Promise<void>`

Returns a Promise which resolves after given time.
```ts
/**
 * @param {number} ms Time (milliseconds).
 * @returns {Promise<void>}
 */
```
```
wait(100).then(() => console.log("After 100ms"))
```


### `debounce(fn: (...args: any[]) => void, intervalMs: number): typeof fn`

Ensures that given function is invoked not too often.
Think of eliminating "noisy" calls:
```
  interval
  :      :      :      :      :      :      :
--:------:------:------:------:------:------:--> time
  :      :      :      :      :      :      :
  A B  C : D E F:G     H    I :      :    J :    normal (noisy) function calls
  :      :      :      :      :      :      :
  A      C      F      H      I      :    J :    debounced calls
  :      :      :      :      :      :      :
```

```ts
/**
 * @param {(...args: any[]) => void} fn (Repeatable) action to debounce.
 * @param {number} intervalMs Minimal interval between consecutive calls.
 * @returns {(...args: any[]) => void} Debounced function.
 */
```
```
const debouncedSend((input) => {
  fetch({ url: "/api/...", method: "POST", data: { input } })
    .then(res => /* ... */)
    .catch(err => /* ... */)
}, 500)

<input type="text" onchange="debouncedSend(this.value)" />
```


## Various/Unsorted utils

### `*times(n: number): Iterable<number>`

Return an iterable that runs given number of times.
```ts
/**
 * @param {number} n
 * @returns {Generator<number> & { do((val: number) => void): void }}
 */
```
```
for (const x of times(5)) {
  // Do something
}

// Alternative syntax:
times(5).do(n => conosle.info(n))
```
