/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest/presets/default-esm", // ESM + TS
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".mts"],
  transform: {
    "\.m?ts$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    // The `tests/**/*.mts` use "real life imports":
    // > import { ... } from "@rom98m/utils"
    // It should be remapped to compiled files
    "^@rom98m/utils$": "<rootDir>/dist/index.js",
    "^/$": "<rootDir>/dist/index.js",
  }
};
