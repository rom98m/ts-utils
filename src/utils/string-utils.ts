import type { PostMetadata } from "/src/types"
import { isCyrillic, isLatin, toLatin } from "/src/utils/non-latin"

/**
 * Split given string into 2 at given index.
 * Negative index means "from the tail".
 * E.g.:
 * ```
 * splitAt("data12", 4) => ["data", "12"]
 * splitAt("data12", -2) => ["data", "12"]
 * ```
 * @param str
 * @param index
 */
export function splitAt(str: string, index: number): [string, string] {
  if (index === 0) return ["", str]
  return index > 0
    ? [str.slice(0, index), str.slice(index)]
    : [str.slice(0, str.length + index), str.slice(index)]
}

// { locale: 'en', pluralCategories: [ 'one', 'other' ] }
const pluEn = new Intl.PluralRules("en")

// { locale: 'uk', pluralCategories: [ 'few', 'many', 'one', 'other' ] }
const pluUk = new Intl.PluralRules("uk")

export function pluralize(
  num: number,
  word: string,
  { one, other }: { one?: string, other?: string } = {}
) {
  const cat = pluEn.select(num)
  if (cat === "one") return `${num} ${one || word}`
  return `${num} ${other || (word + "s")}`
}

export function pluralizeUk(
  num: number,
  word: string,
  { one, few, many, other }: { one?: string, few?: string, many?: string, other?: string } = {}
) {
  const cat = pluUk.select(num)
  if (cat === "one") return `${num} ${one || word}`
  if (cat === "few") return `${num} ${few || (word + "и")}`
  if (cat === "many") return `${num} ${many || (word + "ів")}`
  return `${num} ${other || (word + "ів")}`
}

export function toUrlSafeString(str: string) {
  return toLatin(str.toLowerCase())
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

export function fullPostUrl(post: { id: number, title: string }) {
  return `/post/${post.id}/${toUrlSafeString(post.title)}`
}

/** String -> Number || 0 */
export function toNumber(str: unknown) {
  return parseInt(str as string, 10) || 0
}

const capsRe = /[A-Z]/

export function toSnakeCase(str: string): string {
  return Array.prototype
    .map.call(str, (char, i) => {
      if (!capsRe.test(char)) return char
      return (i > 0 ? "_" : "") + char.toLowerCase()
    })
    .join("")
}

export function detectLang(input: string): PostMetadata["lang"] {
  let en = 0
  let uk = 0
  for (const char of input) {
    if (isLatin(char)) en++
    else if (isCyrillic(char)) uk++
  }

  if ((en + uk) === 0) return "en"

  const enPart = en / (en + uk)
  return enPart > .75 ? "en" : "uk"
}

export function parseLangParam(lang?: string) {
  return lang?.toLowerCase() === "uk" ? "uk" : "en"
}

export function buildUrl(
  path: string,
  params: {
    lang?: "en" | "uk",
    tag?: string,
    page?: number,
  } = {}
) {
  const url = new URL(path, "http://_")
  for (const [key, value] of Object.entries(params)) {
    if (value == undefined) continue
    if (key === "lang" && value !== "uk") continue
    url.searchParams.set(key, value.toString())
  }

  return url
    .toString()
    .replace(url.origin, "")
}
