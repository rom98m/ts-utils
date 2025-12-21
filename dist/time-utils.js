/**
 * Returns a Promise which resolves after given time.
 *
 * @param {number} ms Time (milliseconds).
 * @returns
 */
export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
