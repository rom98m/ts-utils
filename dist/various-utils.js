/**
 * Return an iterable that runs given number of times.
 * Use for:
 * ```
 * for (const x of times(5)) {
 *   // Do some code here
 * }
 * ```
 *
 * @param {number} n
 * @returns
 */
export function* times(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}
