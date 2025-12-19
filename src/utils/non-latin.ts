const translitMap: { [nonCyr: string]: string } = {
  "й": "y",   "ц": "ts",  "у": "u",   "к": "k",   "е": "e",   "н": "n",   "г": "g",  "ш": "sh",  "щ": "sch", "з": "z",   "х": "h",    "ї": "yi",
  "ф": "f",   "і": "i",   "в": "v",   "а": "a",   "п": "p",   "р": "r",   "о": "o",  "л": "l",   "д": "d",   "ж": "zh",  "є": "ye",
  "я": "ya",  "ч": "ch",  "с": "s",   "м": "m",   "и": "y",   "т": "t",   "ь": "",   "б": "b",   "ю": "yu",
}

export function toLatin(str: string) {
  return str
    .split('')
    .map(char => translitMap[char] || char)
    .join("")
}

export function isCyrillic(char: string) {
  return char.toLowerCase() in translitMap
}

export function isLatin(char: string) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
}
