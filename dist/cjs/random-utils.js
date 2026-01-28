"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dictionary = void 0;
exports.random = random;
exports.pickRandom = pickRandom;
exports.withProbability = withProbability;
exports.randomString = randomString;
/**
 * Returns random int from the interval `[min(from, to) .. max(from, to))`.
 *
 * @param {number} from
 * @param {number?} [to] Optional. If omitted consider `random(0, from)`.
 * @returns {number}
 */
function random(from, to) {
    if (to == undefined) {
        to = from;
        from = 0;
    }
    [from, to] = [Math.min(from, to), Math.max(from, to)];
    return Math.floor(Math.random() * (to - from)) + from;
}
/**
 * Picks a random value from given array. Works against string as well, picking random character.
 *
 * @param {T[] | string} arrayLike
 * @returns {T | string}
 */
function pickRandom(arrayLike) {
    return arrayLike[random(arrayLike.length)];
}
/**
 * Return `true` with given % of probability.
 *
 * @param {number} probability Probability percentage (0..100).
 * @returns {boolean}
 */
function withProbability(probability) {
    return Math.random() < probability / 100;
}
exports.dictionary = {
    englishLower: "abcdefghijklmnopqrstuvwxyz",
    englishUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
};
/**
 * Generates random string of given length.
 *
 * @param {number} length
 * @param {string?} [chars] Optional. Define the chars dictionary for generation.
*                           If omitted, lower English (`a`..`z`) letter are used.
 * @returns {string}
 */
function randomString(length, chars = exports.dictionary.englishLower) {
    let result = "";
    for (let i = 0; i < length; i++)
        result += pickRandom(chars);
    return result;
}
