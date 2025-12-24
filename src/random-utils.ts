/**
 * Returns random int from the interval `[min(from, to) .. max(from, to))`.
 *
 * @param {number} from
 * @param {number?} [to] Optional. If omitted consider `random(0, from)`.
 * @returns {number}
 */
export function random(from: number, to?: number): number {
  if (to == undefined) {
    to = from
    from = 0
  }
  [from, to] = [Math.min(from, to), Math.max(from, to)]

  return Math.floor(Math.random() * (to - from)) + from
}


/**
 * Picks a random value from given array. Works against string as well, picking random character.
 *
 * @param {T[] | string} arrayLike
 * @returns {T | string}
 */
export function pickRandom<T>(arrayLike: T[] | string): typeof arrayLike extends T[] ? T : string {
  return arrayLike[random(arrayLike.length)] as typeof arrayLike extends T[] ? T : string
}


/**
 * Return `true` with given % of probability.
 *
 * @param {number} probability Probability percentage (0..100).
 * @returns {boolean}
 */
export function withProbability(probability: number): boolean {
  return Math.random() < probability / 100
}


export const dictionary = {
  englishLower: "abcdefghijklmnopqrstuvwxyz",
  englishUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "1234567890",
}


/**
 * Generates random string of given length.
 *
 * @param {number} length
 * @param {string?} [chars] Optional. Define the chars dictionary for generation.
*                           If omitted, lower English (`a`..`z`) letter are used.
 * @returns {string}
 */
export function randomString(length: number, chars = dictionary.englishLower): string {
  let result = ""
  for (let i = 0; i < length; i++) result += pickRandom(chars)
  return result
}


