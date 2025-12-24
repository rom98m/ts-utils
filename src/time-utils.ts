/**
 * Returns a Promise which resolves after given time.
 *
 * @param {number} ms Time (milliseconds).
 * @returns
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


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
export function debounce(fn: (...args: any[]) => void, intervalMs: number): typeof fn {
  let lastInvoked = 0
  let timeoutId: NodeJS.Timeout
  let invokeFn: VoidFunction

  return ((...debounceArgs: any[]) => {
    const now = Date.now()
    const timeToNextRun = lastInvoked + intervalMs - now

    invokeFn = () => {
      lastInvoked = Date.now()
      fn(...debounceArgs)
    }

    if (timeoutId != undefined) clearTimeout(timeoutId)
    if (timeToNextRun > 0) {
      timeoutId = setTimeout(invokeFn, timeToNextRun)
    } else invokeFn()
  }) as typeof fn
}
