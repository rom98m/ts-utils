import { humanIntervalDate } from "./date-utils"

describe("date-utils.ts", () => {
  describe("humanIntervalDate()", () => {
    ([
      ["2024-01-01T10:00:00", "2024-01-01T10:00:20", "less than a minute"],
      ["2024-01-01T10:00:00", "2024-01-01T10:00:40", "1 minute"], // round up
      ["2024-01-01T10:00:20", "2024-01-01T10:00:00", "less than a minute"], // ignore order
      ["2024-01-01T10:00", "2024-01-01T10:15", "15 minutes"],
      ["2024-01-01T10:00", "2024-01-01T12:45", "3 hours"],
      ["2024-01-01T10:00", "2024-01-02T10:00", "1 day"],
      ["2024-01-01T10:00", "2024-04-02T10:00", "3 months"],
      ["2024-01-01T10:00", "2022-04-02T10:00", "2 years"],
    ] as Array<[date1: string, date2: string, interval: string]>)
      .forEach(([date1, date2, interval]) => {
        test(`should calculate the interval between "${date1}" and "${date2}"`, () => {
          expect(humanIntervalDate(date1, date2, "en")).toEqual(interval)
        })
      })
  })
})
