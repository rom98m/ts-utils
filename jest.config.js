const { createDefaultPreset } = require("ts-jest")

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
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
