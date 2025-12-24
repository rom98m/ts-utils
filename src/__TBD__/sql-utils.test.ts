import { mergeSqlData, objectToSqlInsertStatement, objectToSqlSelectStatement, objectToSqlUpdateStatement } from "./sql-utils"

describe("db.ts", () => {
  const example = { name: "R", isPrivate: false, tags: ["qwe", "asdf"] }
  const expectedParams = { $name: "R", $isPrivate: 0, $tags: `["qwe","asdf"]` }

  test("objectToSqlInsertStatement()", () => {
    const { fields, values, params } = objectToSqlInsertStatement(example)
    expect(fields).toEqual(["name", "is_private", "tags"])
    expect(values).toEqual(["$name", "$isPrivate", "$tags"])
    expect(params).toEqual(expectedParams)
  })

  test("objectToSqlUpdateStatement()", () => {
    const { fields, params } = objectToSqlUpdateStatement(example)
    expect(fields).toEqual(["name = $name", "is_private = $isPrivate", "tags = $tags"])
    expect(params).toEqual(expectedParams)
  })

  test("objectToSqlSelectStatement()", () => {
    const { fields } = objectToSqlSelectStatement(example, "tbl")
    expect(fields).toEqual([`tbl.name AS "name"`, `tbl.is_private AS "isPrivate"`, `tbl.tags AS "tags"`])
  })

  test("mergeSqlData()", () => {
    const stencil = { name: "", isPrivate: false, tags: [] }
    mergeSqlData(stencil, { name: "R", isPrivate: 0, tags: `["qwe","asdf"]` })
    expect(stencil).toEqual(example)
  })
})
