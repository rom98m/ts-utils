const { createDefaultPreset } = require("ts-jest")

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".mts"],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    // The `tests/**/*.mts` use "real life imports":
    // > import { ... } from "@rom98m/utils"
    // It should be remapped to compiled files
    "^@rom98m/utils$": "<rootDir>/dist/index.js",
    "^/$": "<rootDir>/dist/index.js",
  }
};
