import { pluralize, pluralizeUk } from "/src/utils/string-utils"

const monthsEn = [
  "Jan", "Feb",
  "March", "Apr", "May",
  "June", "July", "Aug",
  "Sep", "Oct", "Nov",
  "Dec"
]
const monthsUk = [
  "січня", "лютого",
  "березня", "квітня", "травня",
  "червня", "липня", "серпня",
  "вересня", "жовтня", "листопада",
  "грудня"
]

export const oneSecond = 1000
export const oneMinute = 60 * oneSecond
export const oneHour = 60 * oneMinute
export const oneDay = 24 * oneHour
export const oneMonth = 30 * oneDay
export const oneYear = 365 * oneDay

const oneXNamesEn: { [int: number]: string } = {
  [oneSecond]: "second",
  [oneMinute]: "minute",
  [oneHour]: "hour",
  [oneDay]: "day",
  [oneMonth]: "month",
  [oneYear]: "year",
}
const oneXNamesUk: { [int: number]: { one: string, few: string, many: string, other: string } } = {
  [oneSecond]: { one: "секунду", few: "секунди", many: "секунд", other: "секунд" },
  [oneMinute]: { one: "хвилину", few: "хвилини", many: "хвилин", other: "хвилин" },
  [oneHour]: { one: "годину", few: "години", many: "годин", other: "годин" },
  [oneDay]: { one: "день", few: "дні", many: "днів", other: "днів" },
  [oneMonth]: { one: "місяць", few: "місяці", many: "місяців", other: "місяців" },
  [oneYear]: { one: "рік", few: "роки", many: "років", other: "років" },
}

export function humanIntervalDate(date1: Date | string, date2: Date | string | "now", lang: "en" | "uk"): string {
  if (typeof date1 === "string") date1 = new Date(date1)

  if (date2 === "now") date2 = new Date()
  else if (typeof date2 === "string") date2 = new Date(date2)

  if (date1 > date2) [date2, date1] = [date1, date2]

  let interval = date2.getTime() - date1.getTime()
  for (const unaryInterval of [oneYear, oneMonth, oneDay, oneHour, oneMinute]) {
    const number = Math.round(interval / unaryInterval)
    if (number === 0) continue

    return lang === "uk"
      ? pluralizeUk(number, oneXNamesUk[unaryInterval]["one"], oneXNamesUk[unaryInterval])
      : pluralize(number, oneXNamesEn[unaryInterval])
  }

  return lang === "uk" ? "хвилину" : "less than a minute"
}

export function humanIsoDate(
  date: Date | string,
  format: "full" | "date" | "time" | "time-exact",
  lang: "en" | "uk"
) {
  if (typeof date === "string") date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  if (format === "date") return `${year}-${month.toString(10).padStart(2, "0")}-${day.toString(10).padStart(2, "0")}`

  const hour = date.getHours()
  const minute = date.getMinutes()
  const timeString = `${hour.toString(10).padStart(2, "0")}:${minute.toString(10).padStart(2, "0")}`
  if (format === "time") return timeString
  if (format === "time-exact") return `${timeString}:${date.getSeconds().toString(10).padStart(2, "0")}`

  const months = lang === "en" ? monthsEn : monthsUk
  const dateString = `${day} ${months[month]} ${year}`
  return `${dateString} on ${timeString}`
}

export function isValidDateStr(input: string) {
  const date = new Date(input)
  return !isNaN(date.valueOf())
}
