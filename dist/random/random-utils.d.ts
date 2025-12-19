/**
 * Returns random int from the interval `[min(from, to) .. max(from, to))`.
 *
 * @param {number} from
 * @param {number?} to Optional. If omitted consider `random(0, from)`.
 * @returns {number}
 */
export declare function random(from: number, to?: number): number;
/**
 * Picks a random value from given array.
 *
 * @param {T[]} array
 * @returns {T}
 */
export declare function pickRandom<T>(array: T[] | string): typeof array extends T[] ? T : string;
/**
 * Return `true` with given % of probability.
 *
 * @param {number} probability Probability percentage (0..100)
 * @returns {boolean}
 */
export declare function withProbability(probability: number): boolean;
export declare const dictionary: {
    readonly englishLower: "abcdefghijklmnopqrstuvwxyz";
    readonly englishUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    readonly numbers: "1234567890";
};
/**
 * Generates random string of given length.
 *
 * @param {number} length
 * @param {string?} chars Optional. Define the chars dictionary for generation.
*                         If omitted, lower English (`a`..`z`) letter are used.
 * @returns {string}
 */
export declare function randomString(length: number, chars?: "abcdefghijklmnopqrstuvwxyz"): string;
//# sourceMappingURL=random-utils.d.ts.map