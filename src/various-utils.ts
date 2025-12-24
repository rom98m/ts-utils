type GeneratorWithDo = Generator<number, void, unknown> & {
  do(action: (value: number) => void): void
}

/**
 * Return an iterable that runs given number of times.
 * Use for:
 * ```
 * for (const x of times(5)) {
 *   // Do something
 * }
 * ```
 *
 * Alternative syntax:
 * ```
 * times(5).do(n => console.info(n))
 * ```
 *
 * @param {number} n
 * @returns {Generator<number> & { do(action: (value: number) => void): void }}
 */
export function times(n: number): GeneratorWithDo {
  const iterable = (function* () {
    for (let i = 0; i < n; i++) {
      yield i
    }
  })() as GeneratorWithDo

  iterable.do = (action: (val: number) => void) => {
    for (const i of iterable) {
      action(i)
    }
  }

  return iterable
}
