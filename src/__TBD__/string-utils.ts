/**
 * Split given string into two chunks at given index.
 * Negative index means splitting from the tail.
 * E.g.:
 * ```
 * splitAt("data12", 4) => ["data", "12"]
 * splitAt("data12", -2) => ["data", "12"]
 * ```
 *
 * @param {string} str Given string.
 * @param {number} index A position to split at.
 * @returns {[string, string]} A tuple of two chunks.
 */
export function splitAt(str: string, index: number): [string, string] {
  if (index === 0) return ["", str]
  return index > 0
    ? [str.slice(0, index), str.slice(index)]
    : [str.slice(0, str.length + index), str.slice(index)]
}


const aCode = ("A").charCodeAt(0)
const zCode = ("Z").charCodeAt(0)


export function toSnakeCase(str: string): string {
  let result = ""
  for (const char of str) {
    if (char.charCodeAt(0) <= aCode || char.charCodeAt(0) >= zCode) {
      result += char
    } else {
      result +=
    }
  }
  return Array.prototype
    .map.call(str, (char, i) => {
      if (!capsRe.test(char)) return char
      return (i > 0 ? "_" : "") + char.toLowerCase()
    })
    .join("")
}
