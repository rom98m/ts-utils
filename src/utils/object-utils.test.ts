import { omit, pick } from "./object-utils"

describe("object-utils.ts", () => {
  const example = { name: "R", isPrivate: false, tags: ["t"] }

  test("pick()", () => {
    expect(pick(example, "name")).toEqual({ name: "R" })
    expect(pick(example, "unknown" as any)).toEqual({})
  })

  test("omit", () => {
    expect(omit(example, ["name", "isPrivate"])).toEqual({ tags: ["t"] })
    expect(omit(example, "unknown" as any)).toEqual(example)
  })
})
