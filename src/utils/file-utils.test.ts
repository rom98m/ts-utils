import { deduplicateFileName, parsePath, safeFileName } from "./file-utils"

describe("file-utils.ts", () => {
  describe("parsePath()", () => {
    test("should parse path into baseName and ext", () => {
      expect(parsePath("/home/rom/file.txt")).toEqual({ baseName: "file.txt", ext: ".txt" })
      expect(parsePath("/home/rom/noext")).toEqual({ baseName: "noext", ext: "" })
      expect(parsePath("/home/rom/.dotfile")).toEqual({ baseName: ".dotfile", ext: ".dotfile" })
    })
  })

  describe("deduplicateFileName()", () => {
    ([
      ["file.txt", "file_1.txt"],
      ["/path/file.txt", "/path/file_1.txt"],
      ["/path/file_10.txt", "/path/file_11.txt"],
      ["/path/file-10.txt", "/path/file-11.txt"],
      ["/path/file1.txt", "/path/file1_1.txt"],
    ] as Array<[given: string, expected: string]>).forEach(([given, expected]) => {
      test(`should deduplicate "${given}" -> "${expected}"`, () => {
        expect(deduplicateFileName(given)).toEqual(expected)
      })
    })
  })

  describe("safeFileName()", () => {
    test("should replace heading dot if any", () => {
      expect(safeFileName("/path/file.txt")).toEqual("/path/file.txt")
      expect(safeFileName("/path/.file")).toEqual("/path/_file")
    })
  })
})
