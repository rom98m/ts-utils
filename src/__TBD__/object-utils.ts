export function omit<T = any>(obj: T, keys: keyof T | Array<keyof T>): Partial<T> {
  return pickOmit(obj, Array.isArray(keys) ? keys : [keys], "omit")
}

export function pick<T = any>(obj: T, keys: keyof T | Array<keyof T>): Partial<T> {
  return pickOmit(obj, Array.isArray(keys) ? keys : [keys], "pick")
}

function pickOmit<T = any>(obj: T, keys: Array<keyof T>, action: "pick" | "omit"): Partial<T> {
  const $keys = new Set(keys)
  return Array
    .from(Object.entries(obj as any))
    .filter(([key]) => action === "pick"
      ? $keys.has(key as keyof T)
      : !$keys.has(key as keyof T)
    )
    .reduce<Partial<T>>((accum, [key, value]) => {
      (accum as any)[key] = value
      return accum
    }, {})
}
