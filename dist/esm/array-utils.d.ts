/**
 * Wraps given argument in array if needed.
 *
 * @param {T | T[]} maybeArray Value (might be arra y or a single one).
 * @returns {T[]}
 */
export declare function asArray<T>(maybeArray: T | T[]): T[];
/**
 * Returns the last element of given array.
 *
 * @param {T[]} array Given array.
 * @returns {T} Last element or undefined (in case of empty array).
 */
export declare function last<T>(array: T[]): T;
/**
 * Split the array into partitions of given size.
 *
 * @param {T[]} array
 * @param {number} partitionSize
 * @returns {T[][]}
 */
export declare function partition<T>(array: T[], partitionSize: number): T[][];
/**
 * Splits the array into 2 buckets:
 * - Left bucket contains all elements where the `predicate()` returned `true`;
 * - Right bucket contains all elements where the `predicate()` returned `false`.
 *
 * @param {T[]} array Given array.
 * @param {(item?: T, index?: number, arr?: T[]) => boolean} predicate A method that is applied to each element.
 *                                                                  If returns true, the element appears in the left bucket, otherwise in the right one.
 * @returns {[T[], T[]]}
 */
export declare function partitionBy<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => boolean): [T[], T[]];
//# sourceMappingURL=array-utils.d.ts.map