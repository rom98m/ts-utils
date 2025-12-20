/**
 * Returns random int from the interval `[min(from, to) .. max(from, to))`.
 *
 * @param {number} from
 * @param {number?} to Optional. If omitted consider `random(0, from)`.
 * @returns {number}
 */
export declare function random(from: number, to?: number): number;
/**
 * Picks a random value from given array. Works against string as well, picking random character.
 *
 * @param {T[] | string} array
 * @returns {T | string}
 */
export declare function pickRandom<T>(array: T[] | string): typeof array extends T[] ? T : string;
/**
 * Return `true` with given % of probability.
 *
 * @param {number} probability Probability percentage (0..100).
 * @returns {boolean}
 */
export declare function withProbability(probability: number): boolean;
export declare const dictionary: {
    englishLower: string;
    englishUpper: string;
    numbers: string;
};
/**
 * Generates random string of given length.
 *
 * @param {number} length
 * @param {string?} chars Optional. Define the chars dictionary for generation.
*                         If omitted, lower English (`a`..`z`) letter are used.
 * @returns {string}
 */
export declare function randomString(length: number, chars?: string): string;
//# sourceMappingURL=random-utils.d.ts.map