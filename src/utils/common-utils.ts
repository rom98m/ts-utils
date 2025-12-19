export function debounce(fn: () => void, intervalMs: number) {
  let lastInvoked = 0
  let timeoutId = null as NodeJS.Timeout | null

  return () => {
    const now = Date.now()
    if (now - lastInvoked < intervalMs) {
      timeoutId && clearTimeout(timeoutId)
      timeoutId = setTimeout(fn, intervalMs)
    } else {
      fn()
      lastInvoked = now
    }
  }
}
