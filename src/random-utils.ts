/**
 * Returns random int from the interval `[min(from, to) .. max(from, to))`.
 *
 * @param {number} from
 * @param {number} to Optional; if omitted consider `random(0, from)`.
 * @returns {number}
 */
export function random(from: number, to?: number): number {
  if (to == undefined) {
    to = from
    from = 0
  }
  from = Math.min(from, to)
  to = Math.max(from, to)

  return Math.floor(Math.random() * (to - from)) + from
}


/**
 * Picks a random value from given array.
 *
 * @param {T[]} array
 * @returns {T}
 */
export function pickRandom<T>(array: T[]): T {
  return array[random(array.length)]
}


/**
 * Return `true` with given % of probability.
 *
 * @param {number} probability Probability percentage (0..100)
 * @returns {boolean}
 */
export function withChances(probability: number): boolean {
  return Math.random() < probability / 100
}
