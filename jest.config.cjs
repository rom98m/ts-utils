const { createDefaultPreset } = require("ts-jest")

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
    "\\.(t|j)s$": ["ts-jest", { useESM: true }]
  },
  moduleNameMapper: {
    "^@rom98m/utils$": "<rootDir>/dist/index.js",
    "^/$": "<rootDir>/dist/index.js",
  }
};

// /** @type {import("ts-jest").JestConfigWithTsJest} */
// module.exports = {
//   moduleNameMapper: {
//     "^/(.*)$": "<rootDir>/$1",
//   },
//   testEnvironment: "node",
//   transform: {
//     "\\.ts$": ["ts-jest", { useESM: true }]
//   },
//   transformIgnorePatterns: ['<rootDir>/node_modules/'],
// };
