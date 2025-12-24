/**
 * Wraps given argument in array if needed.
 *
 * @param {T | T[]} maybeArray Value (might be arra y or a single one).
 * @returns {T[]}
 */
export function asArray<T>(maybeArray: T | T[]): T[] {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray]
}


/**
 * Returns the last element of given array.
 *
 * @param {T[]} array Given array.
 * @returns {T} Last element or undefined (in case of empty array).
 */
export function last<T>(array: T[]): T {
  return array[array.length - 1]
}



/**
 * Split the array into partitions of given size.
 *
 * @param {T[]} array
 * @param {number} partitionSize
 * @returns {T[][]}
 */
export function partition<T>(array: T[], partitionSize: number): T[][] {
  if (partitionSize <= 0) throw new RangeError("Partition size must be positive integer")

  const partitioned: T[][] = [[]]

  array.forEach(item => {
    let currentPartiotion = last(partitioned)
    if (currentPartiotion.length >= partitionSize) {
      currentPartiotion = []
      partitioned.push(currentPartiotion)
    }

    currentPartiotion.push(item)
  })

  return partitioned
}



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
export function partitionBy<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => boolean): [T[], T[]] {
  return array.reduce((buckets, item, index) => {
    if (predicate(item, index, array)) buckets[0].push(item)
    else buckets[1].push(item)
    return buckets
  }, [[], []] as [T[], T[]])
}