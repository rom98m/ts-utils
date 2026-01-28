const utils = require("../dist/cjs/index.cjs")
const { assert } = require("node:assert")

assert(utils, "The `utils` should be defined")
assert.equal(typeof utils.times, "function", "The `utils.times` should be a function")
