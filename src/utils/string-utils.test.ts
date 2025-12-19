import { buildUrl, detectLang, pluralize, splitAt, toNumber, toSnakeCase, toUrlSafeString } from "./string-utils"

describe("string-utils.ts", () => {
  describe("splitAt()", () => {
    const original = "asdf"

    test("should split in the middle", () => {
      expect(splitAt(original, 2)).toEqual(["as", "df"])
    })

    test("should split at the head/tail", () => {
      expect(splitAt(original, 0)).toEqual(["", "asdf"])
      expect(splitAt(original, 4)).toEqual(["asdf", ""])
    })

    test("should treat indices >> than input.length", () => {
      expect(splitAt(original, 100)).toEqual(["asdf", ""])
    })

    test("should treat negative indices", () => {
      expect(splitAt(original, -1)).toEqual(["asd", "f"])
      expect(splitAt(original, -4)).toEqual(["", "asdf"])
      expect(splitAt(original, -10)).toEqual(["", "asdf"])
    })
  })

  describe("pluralize()", () => {
    test("should pluralize", () => {
      expect(pluralize(1, "day")).toEqual("1 day")
      expect(pluralize(10, "day")).toEqual("10 days")
      expect(
        pluralize(1, "person", { other: "people" })
      ).toEqual("1 person")
      expect(
        pluralize(10, "person", { other: "people" })
      ).toEqual("10 people")
    })
  })

  describe("toUrlSafeString()", () => {
    test("should convert the text to URL-safe string", () => {
      const title = "Йосип Жадан і собáки Ď↑;__\t\n123test"
      expect(toUrlSafeString(title)).toEqual("yosyp_zhadan_i_sob_ky_123test")
    })
  })

  describe("toNumber()", () => {
    test("should convert NaN => 0", () => {
      expect(toNumber("asdf")).toEqual(0)
    })
  })

  describe("toSnakeCase()", () => {
    test("should convert to snake_case", () => {
      expect(toSnakeCase("testMeAgain123")).toBe("test_me_again123")
      expect(toSnakeCase("TestMe")).toBe("test_me")
    })
  })

  describe("detectLang()", () => {
    test("should detect EN and UK", () => {
      expect(detectLang(`
        # Heading
        Some text
      `)).toBe("en")
      expect(detectLang(`
      # Заголовок
      > [!panel.important]
      > <span>Текст 99 __:^&</span>
      `)).toBe("uk")
    })
  })

  describe("buildUrl()", () => {
    test(`should build the URL ignoring "en" and missing args`, () => {
      expect(buildUrl("posts", { lang: "en" }))
        .toBe("/posts")

      expect(buildUrl("posts", { lang: "uk", tag: "t", page: 4 }))
        .toBe("/posts?lang=uk&tag=t&page=4")
    })
  })
})
