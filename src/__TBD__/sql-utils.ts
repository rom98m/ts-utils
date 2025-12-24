import { toSnakeCase } from "/src/utils/string-utils"

function valueToParamValue(value: any): any {
  if (typeof value === "boolean") return value ? 1 : 0
  else if (typeof value === "object") return JSON.stringify(value)

  return value
}

/**
 * Returns the placeholders to be used with the INSERT query:
 *     const query = `INSERT INTO posts (title, is_private) VALUES ($title, $isPrivate)`
 *     //                                ^^^^^^^^^^^^^^^^^          ^^^^^^^^^^^^^^^^^^
 *     //                                fields                     values
 *     await sql(query, params)
 *     //               ^^^^^^
 *     //               respecting the SQLite
 *     //               peculiarities (e.g., bool => 0|1)
 */
export function objectToSqlInsertStatement(
  obj: Record<string, any>
): { fields: string[], values: string[], params: Record<string, any> } {
  const fields = [] as string[]
  const values = [] as string[]
  const params = {} as Record<string, any>

  for (const [field, value] of Object.entries(obj)) {
    fields.push(toSnakeCase(field))
    values.push("$" + field)
    params["$" + field] = valueToParamValue(value)
  }
  return { fields, values, params }
}

/**
 * Returns the placeholders to be used with the UPDATE query:
 *     const query = `UPDATE posts SET title = $title, is_private = $isPrivate`
 *     //                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     //                               fields
 *     await sql(query, params)
 *     //               ^^^^^^
 *     //               respecting the SQLite
 *     //               peculiarities (e.g., bool => 0|1)
 */
export function objectToSqlUpdateStatement(
  obj: Record<string, any>
): { fields: string[], params: Record<string, any> } {
  const fields = [] as string[]
  const params = {} as Record<string, any>

  for (const [field, value] of Object.entries(obj)) {
    fields.push(`${toSnakeCase(field)} = ${"$" + field}`)
    params["$" + field] = valueToParamValue(value)
  }
  return { fields, params }
}

/**
 * Returns the placeholders to be used with the SELECT query:
 *     const query = `SELECT posts.title AS "title", posts.is_private AS "isPrivate" FROM posts
 *     //                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     //                    fields
 *     await sql(query, params)
 *     //               ^^^^^^
 *     //               respecting the SQLite
 *     //               peculiarities (e.g., bool => 0|1)
 */
export function objectToSqlSelectStatement(
  obj: Record<string, any>,
  table?: string
): { fields: string[] } {
  const fields = [] as string[]

  for (const [field, value] of Object.entries(obj)) {
    let sqlField = table ? (table + ".") : ""
    sqlField += toSnakeCase(field) + " AS "
    sqlField += `"${field}"`
    fields.push(sqlField)
  }

  return { fields }
}

/**
 * After the SELECT query is done, merges the result into the original destination.
 * Think
 *     const obj = { name: "", isPrivate: false }
 *     const { fields } = objectToSqlSelectStatement(obj, "posts")
 *     const query = `SELECT ${fields.join(", ")} FROM posts WHERE id = $id`
 *     const [row] = await sql(query, { $id: 1 })
 *     mergeSqlData(obj, row)
 * @param dest
 * @param sqlSource
 */
export function mergeSqlData<T = any>(dest: T, sqlSource: Partial<{ [key in keyof T]: any }>) {
  for (const [key, value] of Object.entries(sqlSource)) {
    if (typeof (dest as any)[key] === "boolean") (dest as any)[key] = !!value
    else if (typeof (dest as any)[key] === "object") (dest as any)[key] = JSON.parse(value as string)
    else (dest as any)[key] = value
  }
  return dest
}

export function mergeFields(fields: string[]): string {
  return fields.join(", ")
}
