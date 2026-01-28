/**
 * Returns a Promise which resolves after given time.
 *
 * @param {number} ms Time (milliseconds).
 * @returns {Promise<void>}
 */
export declare function wait(ms: number): Promise<void>;
/**
 * Ensures that given function is invoked not too often.
 * Think of eliminating "noisy" calls:
 * ```
 *   interval
 *   :      :      :      :      :      :      :
 * --:------:------:------:------:------:------:--> time
 *   :      :      :      :      :      :      :
 *   A B  C : D E F:G     H    I :      :    J :    normal (noisy) function calls
 *   :      :      :      :      :      :      :
 *   A      C      F      H      I      :    J :    debounced calls
 *   :      :      :      :      :      :      :
 * ```
 *
 * @param {(...args: any[]) => void} fn (Repeatable) action to debounce.
 * @param {number} intervalMs Minimal interval between consecutive calls.
 * @returns {(...args: any[]) => void} Debounced function.
 */
export declare function debounce(fn: (...args: any[]) => void, intervalMs: number): typeof fn;
//# sourceMappingURL=time-utils.d.ts.map